/**
 * Google Sheets MCP Server for NanoClaw
 *
 * Sibling of /add-gdrive-tool, sharing the same "Nanoclaw" folder-sandbox
 * convention but fully independent — no runtime dependency between the two
 * skills. Spreadsheet creation and location use the Drive API v3 (a
 * spreadsheet is just a Drive file); reading/writing cell values and managing
 * tabs use the Sheets API v4. Every tool that references an existing
 * spreadsheetId walks its Drive ancestry and refuses to proceed if it isn't
 * inside the Nanoclaw folder — exactly the same enforcement gdrive-mcp-stdio.ts
 * uses, duplicated here on purpose so either skill installs/removes cleanly
 * on its own.
 *
 * Credentials: raw `fetch()` calls to the real Drive/Sheets APIs. The OneCLI
 * gateway is a transparent HTTPS proxy that injects the real OAuth bearer for
 * connected apps (see container/skills/onecli-gateway/SKILL.md) — no local
 * credential stub files needed.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import fs from 'fs';

const DRIVE_API = 'https://www.googleapis.com/drive/v3';
const SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';
const ROOT_FOLDER_NAME = 'Nanoclaw';
const CACHE_DIR = '/workspace/agent/.gdrive';
const CACHE_FILE = `${CACHE_DIR}/root.json`;
const MAX_LIST_FOLDERS = 50;
const MAX_LIST_RESULTS = 200;
const SPREADSHEET_MIME_TYPE = 'application/vnd.google-apps.spreadsheet';

function log(msg: string): void {
  console.error(`[GSHEETS] ${msg}`);
}

// ---------------------------------------------------------------------------
// HTTP plumbing
// ---------------------------------------------------------------------------

function proxyInit(init: RequestInit = {}): RequestInit {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  return proxy ? ({ ...init, proxy } as RequestInit) : init;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    body: string,
  ) {
    super(`API error ${status}: ${body || '(no body)'}`);
  }
}

async function apiRequest(url: string, init: RequestInit = {}): Promise<any> {
  const res = await fetch(url, proxyInit(init));
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new ApiError(res.status, text);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

function driveRequest(path: string, init: RequestInit = {}): Promise<any> {
  return apiRequest(path.startsWith('http') ? path : `${DRIVE_API}${path}`, init);
}

function sheetsRequest(path: string, init: RequestInit = {}): Promise<any> {
  return apiRequest(`${SHEETS_API}${path}`, init);
}

// ---------------------------------------------------------------------------
// Folder sandbox — same convention as gdrive-mcp-stdio.ts, duplicated so this
// skill has no runtime dependency on /add-gdrive-tool being installed.
// ---------------------------------------------------------------------------

export class ScopeError extends Error {}

export async function assertWithinRoot(
  fileId: string,
  rootId: string,
  getParents: (id: string) => Promise<{ parents?: string[] } | null>,
  maxDepth = 50,
): Promise<void> {
  let currentId = fileId;
  for (let hop = 0; hop <= maxDepth; hop++) {
    if (currentId === rootId) return;
    const meta = await getParents(currentId);
    if (!meta) {
      throw new ScopeError(`Spreadsheet ${fileId} was not found or is not accessible`);
    }
    const parents = meta.parents ?? [];
    if (parents.length === 0) {
      throw new ScopeError(`Spreadsheet ${fileId} is outside the Nanoclaw folder — refusing to operate on it`);
    }
    currentId = parents[0];
  }
  throw new ScopeError(`Ancestry check for ${fileId} exceeded the depth limit (${maxDepth})`);
}

async function assertWithinRootLive(fileId: string, rootId: string): Promise<void> {
  await assertWithinRoot(fileId, rootId, async (id) => {
    try {
      return await driveRequest(`/files/${id}?fields=id,parents,trashed`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) return null;
      throw err;
    }
  });
}

let cachedRootFolderId: string | null = null;

async function resolveRootFolderId(): Promise<string> {
  if (cachedRootFolderId) return cachedRootFolderId;

  try {
    const cached = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    if (cached?.rootFolderId) {
      const meta = await driveRequest(`/files/${cached.rootFolderId}?fields=id,trashed`).catch(() => null);
      if (meta && !meta.trashed) {
        cachedRootFolderId = cached.rootFolderId;
        return cachedRootFolderId!;
      }
    }
  } catch {
    // no cache yet, or it's stale — fall through to resolve/create.
  }

  const q = encodeURIComponent(
    `name='${ROOT_FOLDER_NAME}' and mimeType='application/vnd.google-apps.folder' and 'root' in parents and trashed=false`,
  );
  const found = await driveRequest(`/files?q=${q}&fields=files(id,name)`);
  let rootFolderId: string;
  if (found.files && found.files.length > 0) {
    rootFolderId = found.files[0].id;
    log(`Found existing root folder "${ROOT_FOLDER_NAME}" (${rootFolderId})`);
  } else {
    const created = await driveRequest('/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: ROOT_FOLDER_NAME, mimeType: 'application/vnd.google-apps.folder', parents: ['root'] }),
    });
    rootFolderId = created.id;
    log(`Created root folder "${ROOT_FOLDER_NAME}" (${rootFolderId})`);
  }

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify({ rootFolderId, name: ROOT_FOLDER_NAME }, null, 2));
  cachedRootFolderId = rootFolderId;
  return rootFolderId;
}

// ---------------------------------------------------------------------------
// MCP result helpers
// ---------------------------------------------------------------------------

function textResult(text: string) {
  return { content: [{ type: 'text' as const, text }] };
}

function errorResult(err: unknown) {
  if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
    log(`AUTH ERROR: ${err.message}`);
    return {
      content: [
        {
          type: 'text' as const,
          text: `${err.message}\n\nThis usually means the Google Drive/Sheets app isn't connected in OneCLI, or its OAuth scope doesn't cover this action (Sheets needs the spreadsheets scope in addition to Drive file access). Ask the operator to check the relevant \`onecli apps get --provider <slug>\` (see /add-gsheets-tool's SKILL.md) and reconnect with the right scope if needed.`,
        },
      ],
      isError: true,
    };
  }
  if (err instanceof ScopeError) {
    log(`SCOPE VIOLATION: ${err.message}`);
    return {
      content: [{ type: 'text' as const, text: `Blocked: ${err.message}. This tool only operates on spreadsheets inside the dedicated "Nanoclaw" Drive folder.` }],
      isError: true,
    };
  }
  const message = err instanceof Error ? err.message : String(err);
  log(`ERROR: ${message}`);
  return { content: [{ type: 'text' as const, text: message }], isError: true };
}

// ---------------------------------------------------------------------------
// Tools
// ---------------------------------------------------------------------------

const server = new McpServer({ name: 'gsheets', version: '1.0.0' });

server.tool(
  'gsheets_create',
  'Create a new spreadsheet inside the Nanoclaw Drive folder (or a subfolder you already created there). Returns the spreadsheetId to use with the other gsheets tools.',
  {
    title: z.string(),
    parentFolderId: z.string().optional().describe('Defaults to the Nanoclaw root folder.'),
  },
  async ({ title, parentFolderId }) => {
    try {
      const rootId = await resolveRootFolderId();
      const parent = parentFolderId ?? rootId;
      await assertWithinRootLive(parent, rootId);
      const created = await driveRequest('/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: title, mimeType: SPREADSHEET_MIME_TYPE, parents: [parent] }),
      });
      return textResult(`Created spreadsheet "${title}" (spreadsheetId: ${created.id})`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gsheets_list',
  'List spreadsheets inside the Nanoclaw Drive folder and its subfolders (recursive). Never lists spreadsheets elsewhere in Drive.',
  {},
  async () => {
    try {
      const rootId = await resolveRootFolderId();
      const results: Array<{ id: string; name: string }> = [];
      const queue: string[] = [rootId];
      const visited = new Set<string>();

      while (queue.length > 0 && visited.size < MAX_LIST_FOLDERS && results.length < MAX_LIST_RESULTS) {
        const folderId = queue.shift()!;
        if (visited.has(folderId)) continue;
        visited.add(folderId);
        const q = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
        const data = await driveRequest(`/files?q=${q}&fields=files(id,name,mimeType)`);
        for (const f of data.files ?? []) {
          if (f.mimeType === 'application/vnd.google-apps.folder') queue.push(f.id);
          if (f.mimeType === SPREADSHEET_MIME_TYPE) results.push(f);
        }
      }

      if (results.length === 0) return textResult('No spreadsheets found inside the Nanoclaw folder.');
      return textResult(results.map((f) => `- ${f.name} (${f.id})`).join('\n'));
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gsheets_get_metadata',
  'Get the title and list of tabs (sheet names, IDs, dimensions) for a spreadsheet inside the Nanoclaw folder.',
  { spreadsheetId: z.string() },
  async ({ spreadsheetId }) => {
    try {
      const rootId = await resolveRootFolderId();
      await assertWithinRootLive(spreadsheetId, rootId);
      const data = await sheetsRequest(
        `/${spreadsheetId}?fields=properties.title,sheets.properties(sheetId,title,gridProperties)`,
      );
      const tabs = (data.sheets ?? [])
        .map(
          (s: any) =>
            `- ${s.properties.title} (sheetId: ${s.properties.sheetId}, ${s.properties.gridProperties?.rowCount ?? '?'}x${s.properties.gridProperties?.columnCount ?? '?'})`,
        )
        .join('\n');
      return textResult(`Title: ${data.properties.title}\nTabs:\n${tabs}`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gsheets_read_values',
  'Read a range of cell values from a spreadsheet inside the Nanoclaw folder.',
  {
    spreadsheetId: z.string(),
    range: z.string().describe('A1 notation, e.g. "Sheet1!A1:C10" or just "Sheet1".'),
  },
  async ({ spreadsheetId, range }) => {
    try {
      const rootId = await resolveRootFolderId();
      await assertWithinRootLive(spreadsheetId, rootId);
      const data = await sheetsRequest(`/${spreadsheetId}/values/${encodeURIComponent(range)}`);
      const values: unknown[][] = data.values ?? [];
      if (values.length === 0) return textResult('(empty range)');
      return textResult(values.map((row) => row.join('\t')).join('\n'));
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gsheets_write_values',
  'Overwrite a range of cell values in a spreadsheet inside the Nanoclaw folder.',
  {
    spreadsheetId: z.string(),
    range: z.string().describe('A1 notation, e.g. "Sheet1!A1".'),
    values: z.array(z.array(z.union([z.string(), z.number(), z.boolean()]))).describe('2D array of rows of cell values.'),
  },
  async ({ spreadsheetId, range, values }) => {
    try {
      const rootId = await resolveRootFolderId();
      await assertWithinRootLive(spreadsheetId, rootId);
      await sheetsRequest(`/${spreadsheetId}/values/${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ values }),
      });
      return textResult(`Wrote ${values.length} row(s) to ${range}`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gsheets_append_values',
  'Append rows after the last row of data in a range, in a spreadsheet inside the Nanoclaw folder.',
  {
    spreadsheetId: z.string(),
    range: z.string().describe('A1 notation identifying the table to append after, e.g. "Sheet1!A1".'),
    values: z.array(z.array(z.union([z.string(), z.number(), z.boolean()]))).describe('2D array of rows to append.'),
  },
  async ({ spreadsheetId, range, values }) => {
    try {
      const rootId = await resolveRootFolderId();
      await assertWithinRootLive(spreadsheetId, rootId);
      await sheetsRequest(
        `/${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ values }),
        },
      );
      return textResult(`Appended ${values.length} row(s) after ${range}`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gsheets_add_sheet',
  'Add a new tab (sheet) to a spreadsheet inside the Nanoclaw folder.',
  { spreadsheetId: z.string(), title: z.string() },
  async ({ spreadsheetId, title }) => {
    try {
      const rootId = await resolveRootFolderId();
      await assertWithinRootLive(spreadsheetId, rootId);
      const result = await sheetsRequest(`/${spreadsheetId}:batchUpdate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests: [{ addSheet: { properties: { title } } }] }),
      });
      const sheetId = result.replies?.[0]?.addSheet?.properties?.sheetId;
      return textResult(`Added tab "${title}" (sheetId: ${sheetId})`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gsheets_rename_sheet',
  'Rename an existing tab (sheet) within a spreadsheet inside the Nanoclaw folder.',
  { spreadsheetId: z.string(), sheetId: z.number(), newTitle: z.string() },
  async ({ spreadsheetId, sheetId, newTitle }) => {
    try {
      const rootId = await resolveRootFolderId();
      await assertWithinRootLive(spreadsheetId, rootId);
      await sheetsRequest(`/${spreadsheetId}:batchUpdate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requests: [
            {
              updateSheetProperties: {
                properties: { sheetId, title: newTitle },
                fields: 'title',
              },
            },
          ],
        }),
      });
      return textResult(`Renamed tab ${sheetId} to "${newTitle}"`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

if (import.meta.main) {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

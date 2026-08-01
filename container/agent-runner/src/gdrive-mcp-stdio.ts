/**
 * Google Drive MCP Server for NanoClaw
 *
 * Self-authored (not a third-party package) so the folder-sandboxing rule below
 * is something we control end-to-end, not something we hope an upstream package
 * respects. Every tool call is scoped to a single dedicated Drive folder named
 * "Nanoclaw" (auto-created on first use) and its descendants — anything outside
 * that subtree is rejected before any API call touches it.
 *
 * Credentials: raw `fetch()` calls to the real Drive API. The OneCLI gateway is
 * a transparent HTTPS proxy that injects the real OAuth bearer for connected
 * apps (see container/skills/onecli-gateway/SKILL.md) — no local credential
 * stub files needed, unlike third-party CLIs that build their own OAuth2Client.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

import fs from 'fs';

const DRIVE_API = 'https://www.googleapis.com/drive/v3';
const UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3';
const ROOT_FOLDER_NAME = 'Nanoclaw';
const CACHE_DIR = '/workspace/agent/.gdrive';
const CACHE_FILE = `${CACHE_DIR}/root.json`;
const MAX_SEARCH_FOLDERS = 50;
const MAX_SEARCH_RESULTS = 200;

function log(msg: string): void {
  console.error(`[GDRIVE] ${msg}`);
}

// ---------------------------------------------------------------------------
// HTTP plumbing
// ---------------------------------------------------------------------------

function proxyInit(init: RequestInit = {}): RequestInit {
  const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
  // Bun's fetch accepts a `proxy` field; belt-and-braces alongside the
  // transparent env-var interception the OneCLI gateway already provides.
  return proxy ? ({ ...init, proxy } as RequestInit) : init;
}

export class DriveApiError extends Error {
  constructor(
    public status: number,
    body: string,
  ) {
    super(`Drive API error ${status}: ${body || '(no body)'}`);
  }
}

async function driveRequest(path: string, init: RequestInit = {}): Promise<any> {
  const url = path.startsWith('http') ? path : `${DRIVE_API}${path}`;
  const res = await fetch(url, proxyInit(init));
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new DriveApiError(res.status, text);
  }
  if (res.status === 204) return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function uploadMedia(relativePath: string, content: string, mimeType: string, method: 'POST' | 'PATCH'): Promise<any> {
  const url = `${UPLOAD_API}${relativePath}`;
  const res = await fetch(
    url,
    proxyInit({
      method,
      headers: { 'Content-Type': mimeType },
      body: content,
    }),
  );
  if (!res.ok) throw new DriveApiError(res.status, await res.text().catch(() => ''));
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// ---------------------------------------------------------------------------
// Folder sandbox — the security-critical part
// ---------------------------------------------------------------------------

export class ScopeError extends Error {}

/**
 * Pure ancestry walk, injectable so it can be unit-tested against a fake
 * parent graph without hitting the network. Walks `fileId`'s parent chain
 * until it finds `rootId` (allow) or runs out of parents (reject).
 */
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
      throw new ScopeError(`File ${fileId} was not found or is not accessible`);
    }
    const parents = meta.parents ?? [];
    if (parents.length === 0) {
      throw new ScopeError(`File ${fileId} is outside the Nanoclaw folder — refusing to operate on it`);
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
      if (err instanceof DriveApiError && err.status === 404) return null;
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
  if (err instanceof DriveApiError && (err.status === 401 || err.status === 403)) {
    log(`AUTH ERROR: ${err.message}`);
    return {
      content: [
        {
          type: 'text' as const,
          text: `${err.message}\n\nThis usually means the Google Drive app isn't connected in OneCLI, or its OAuth scope doesn't cover this action. Ask the operator to check \`onecli apps get --provider <drive-provider>\` (see /add-gdrive-tool's SKILL.md for how to find the provider slug) and reconnect with the right scope if needed.`,
        },
      ],
      isError: true,
    };
  }
  if (err instanceof ScopeError) {
    log(`SCOPE VIOLATION: ${err.message}`);
    return {
      content: [{ type: 'text' as const, text: `Blocked: ${err.message}. This tool only operates inside the dedicated "Nanoclaw" Drive folder.` }],
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

const server = new McpServer({ name: 'gdrive', version: '1.0.0' });

server.tool(
  'gdrive_get_root_info',
  'Return the ID and web link of the dedicated "Nanoclaw" Drive folder this agent is sandboxed to. Everything this tool does lives inside this folder.',
  {},
  async () => {
    try {
      const rootId = await resolveRootFolderId();
      const meta = await driveRequest(`/files/${rootId}?fields=id,name,webViewLink`);
      return textResult(`Nanoclaw folder: ${meta.name}\nID: ${meta.id}\nLink: ${meta.webViewLink}`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gdrive_list',
  'List files and folders directly inside a folder within the Nanoclaw Drive folder. Omit folderId to list the Nanoclaw root itself.',
  {
    folderId: z.string().optional().describe('Folder ID to list. Defaults to the Nanoclaw root folder.'),
  },
  async ({ folderId }) => {
    try {
      const rootId = await resolveRootFolderId();
      const target = folderId ?? rootId;
      await assertWithinRootLive(target, rootId);
      const q = encodeURIComponent(`'${target}' in parents and trashed=false`);
      const data = await driveRequest(`/files?q=${q}&fields=files(id,name,mimeType,modifiedTime)&orderBy=folder,name`);
      const files = data.files ?? [];
      if (files.length === 0) return textResult('(empty folder)');
      const lines = files.map(
        (f: any) => `- ${f.mimeType === 'application/vnd.google-apps.folder' ? '[folder]' : '[file]'} ${f.name} (${f.id})`,
      );
      return textResult(lines.join('\n'));
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gdrive_search',
  'Search by name within the Nanoclaw Drive folder and its subfolders (recursive). Never searches the rest of Drive — matches outside this folder do not exist as far as this tool is concerned.',
  {
    query: z.string().describe('Substring to search for in the file name (case-insensitive)'),
  },
  async ({ query }) => {
    try {
      const rootId = await resolveRootFolderId();
      const results: Array<{ id: string; name: string; mimeType: string }> = [];
      const queue: string[] = [rootId];
      const visited = new Set<string>();
      const needle = query.toLowerCase();

      while (queue.length > 0 && visited.size < MAX_SEARCH_FOLDERS && results.length < MAX_SEARCH_RESULTS) {
        const folderId = queue.shift()!;
        if (visited.has(folderId)) continue;
        visited.add(folderId);
        const q = encodeURIComponent(`'${folderId}' in parents and trashed=false`);
        const data = await driveRequest(`/files?q=${q}&fields=files(id,name,mimeType)`);
        for (const f of data.files ?? []) {
          if (f.mimeType === 'application/vnd.google-apps.folder') queue.push(f.id);
          if (f.name.toLowerCase().includes(needle)) results.push(f);
        }
      }

      if (results.length === 0) return textResult('No matches found inside the Nanoclaw folder.');
      return textResult(results.map((f) => `- ${f.name} (${f.id})`).join('\n'));
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gdrive_read_file',
  'Read the text content of a file inside the Nanoclaw folder. Google Docs are exported as plain text; other text-like files are downloaded directly.',
  { fileId: z.string() },
  async ({ fileId }) => {
    try {
      const rootId = await resolveRootFolderId();
      await assertWithinRootLive(fileId, rootId);
      const meta = await driveRequest(`/files/${fileId}?fields=id,name,mimeType`);
      let res: Response;
      if (meta.mimeType === 'application/vnd.google-apps.document') {
        res = await fetch(`${DRIVE_API}/files/${fileId}/export?mimeType=text/plain`, proxyInit());
      } else {
        res = await fetch(`${DRIVE_API}/files/${fileId}?alt=media`, proxyInit());
      }
      if (!res.ok) throw new DriveApiError(res.status, await res.text().catch(() => ''));
      return textResult(await res.text());
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gdrive_create_folder',
  'Create a new subfolder inside the Nanoclaw folder (or inside a folder you already created there).',
  {
    name: z.string(),
    parentFolderId: z.string().optional().describe('Defaults to the Nanoclaw root folder.'),
  },
  async ({ name, parentFolderId }) => {
    try {
      const rootId = await resolveRootFolderId();
      const parent = parentFolderId ?? rootId;
      await assertWithinRootLive(parent, rootId);
      const created = await driveRequest('/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mimeType: 'application/vnd.google-apps.folder', parents: [parent] }),
      });
      return textResult(`Created folder "${name}" (${created.id})`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gdrive_write_file',
  'Create a new text file inside the Nanoclaw folder, or update an existing one (pass fileId to update instead of creating).',
  {
    name: z.string().optional().describe('Required when creating a new file. Ignored when fileId is provided.'),
    content: z.string(),
    mimeType: z.string().optional().describe('Defaults to text/plain.'),
    parentFolderId: z.string().optional().describe('Defaults to the Nanoclaw root folder. Ignored when updating.'),
    fileId: z.string().optional().describe('Provide to update an existing file instead of creating one.'),
  },
  async ({ name, content, mimeType, parentFolderId, fileId }) => {
    try {
      const rootId = await resolveRootFolderId();
      const effectiveMimeType = mimeType ?? 'text/plain';

      if (fileId) {
        await assertWithinRootLive(fileId, rootId);
        await uploadMedia(`/files/${fileId}?uploadType=media`, content, effectiveMimeType, 'PATCH');
        return textResult(`Updated file ${fileId}`);
      }

      if (!name) throw new Error('name is required when creating a new file');
      const parent = parentFolderId ?? rootId;
      await assertWithinRootLive(parent, rootId);
      const created = await driveRequest('/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mimeType: effectiveMimeType, parents: [parent] }),
      });
      await uploadMedia(`/files/${created.id}?uploadType=media`, content, effectiveMimeType, 'PATCH');
      return textResult(`Created file "${name}" (${created.id})`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gdrive_rename',
  'Rename a file or folder inside the Nanoclaw folder.',
  { fileId: z.string(), newName: z.string() },
  async ({ fileId, newName }) => {
    try {
      const rootId = await resolveRootFolderId();
      await assertWithinRootLive(fileId, rootId);
      await driveRequest(`/files/${fileId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      return textResult(`Renamed to "${newName}"`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gdrive_move',
  'Move a file or folder to a different folder. Both the file and the destination must already be inside the Nanoclaw folder.',
  { fileId: z.string(), newParentFolderId: z.string() },
  async ({ fileId, newParentFolderId }) => {
    try {
      const rootId = await resolveRootFolderId();
      await assertWithinRootLive(fileId, rootId);
      await assertWithinRootLive(newParentFolderId, rootId);
      const meta = await driveRequest(`/files/${fileId}?fields=parents`);
      const oldParents = (meta.parents ?? []).join(',');
      await driveRequest(`/files/${fileId}?addParents=${newParentFolderId}&removeParents=${oldParents}`, {
        method: 'PATCH',
      });
      return textResult(`Moved ${fileId} to ${newParentFolderId}`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gdrive_trash',
  "Move a file or folder inside the Nanoclaw folder to the trash (reversible via gdrive_restore). There is no permanent-delete tool by design.",
  { fileId: z.string() },
  async ({ fileId }) => {
    try {
      const rootId = await resolveRootFolderId();
      await assertWithinRootLive(fileId, rootId);
      await driveRequest(`/files/${fileId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trashed: true }),
      });
      return textResult(`Trashed ${fileId}`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

server.tool(
  'gdrive_restore',
  'Restore a previously trashed file or folder inside the Nanoclaw folder.',
  { fileId: z.string() },
  async ({ fileId }) => {
    try {
      const rootId = await resolveRootFolderId();
      await assertWithinRootLive(fileId, rootId);
      await driveRequest(`/files/${fileId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trashed: false }),
      });
      return textResult(`Restored ${fileId}`);
    } catch (err) {
      return errorResult(err);
    }
  },
);

if (import.meta.main) {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

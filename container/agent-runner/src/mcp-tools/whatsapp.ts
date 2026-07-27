/**
 * WhatsApp outbound-only tools: send_whatsapp, list_whatsapp_groups.
 *
 * These bypass the destination/session system entirely — no wiring or
 * messaging_group is involved. The container writes a `kind: 'system'`
 * request to outbound.db and polls inbound.db for the host's response,
 * mirroring the cli_request/cli_response round trip in
 * src/cli/delivery-action.ts (host) and this container's own ncl.ts client
 * (same poll pattern, subprocess form — see cli/ncl.ts).
 *
 * The host (src/modules/whatsapp-send/index.ts) validates the destination
 * against a server-side allowlist and the calling agent group against a
 * server-side gate — this file never sees either and never talks to
 * WhatsApp directly.
 */
import { openInboundDb, getOutboundDb } from '../db/connection.js';
import { writeMessageOut } from '../db/messages-out.js';
import { registerTools } from './server.js';
import type { McpToolDefinition } from './types.js';

function log(msg: string): void {
  console.error(`[mcp-tools] ${msg}`);
}

function generateId(): string {
  return `wa-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function ok(text: string) {
  return { content: [{ type: 'text' as const, text }] };
}

function err(text: string) {
  return { content: [{ type: 'text' as const, text: `Error: ${text}` }], isError: true };
}

const POLL_TIMEOUT_MS = 20_000;
const POLL_INTERVAL_MS = 500;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Write a `kind: 'system'` request and poll for the matching response row
 * the host writes back to inbound.db. Marks the response's processing_ack
 * as completed so host-sweep's stale-container check doesn't wait on a row
 * that was never meant to reach the agent as ordinary chat context (the
 * main poll loop already excludes `kind === 'system'` rows from that path).
 */
async function requestAndWait(
  action: string,
  args: Record<string, unknown>,
  responseType: string,
): Promise<Record<string, unknown> | null> {
  const requestId = generateId();
  writeMessageOut({
    id: requestId,
    kind: 'system',
    content: JSON.stringify({ action, requestId, ...args }),
  });

  const deadline = Date.now() + POLL_TIMEOUT_MS;
  while (Date.now() < deadline) {
    const inDb = openInboundDb();
    try {
      const row = inDb
        .prepare("SELECT id, content FROM messages_in WHERE status = 'pending' AND content LIKE ?")
        .get(`%"requestId":"${requestId}"%`) as { id: string; content: string } | undefined;
      if (row) {
        getOutboundDb()
          .prepare(
            "INSERT OR REPLACE INTO processing_ack (message_id, status, status_changed) VALUES (?, 'completed', ?)",
          )
          .run(row.id, new Date().toISOString());
        const parsed = JSON.parse(row.content) as Record<string, unknown>;
        if (parsed.type === responseType) return parsed;
      }
    } finally {
      inDb.close();
    }
    await sleep(POLL_INTERVAL_MS);
  }
  return null;
}

export const sendWhatsapp: McpToolDefinition = {
  tool: {
    name: 'send_whatsapp',
    description:
      'Send a raw WhatsApp text message to a pre-approved contact or group, bypassing the normal destination/session system entirely (no reply context, no thread). Only works from the one agent group the operator designated for this, and only to numbers/group JIDs already on the server-side allowlist. Fails with a clear error — never silently — if WhatsApp is not connected/authenticated or the destination is not on the allowlist.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        to: {
          type: 'string',
          description:
            'Contact phone number (with or without a leading +) or WhatsApp group JID (e.g. "120363012345678901@g.us" or just the digits).',
        },
        text: { type: 'string', description: 'Message text to send.' },
      },
      required: ['to', 'text'],
    },
  },
  async handler(args) {
    const to = args.to as string;
    const text = args.text as string;
    if (!to) return err('to is required');
    if (!text) return err('text is required');

    const resp = await requestAndWait('send_whatsapp', { to, text }, 'whatsapp_send_result');
    if (!resp) return err('WhatsApp send timed out waiting for host response');
    if (!resp.ok) return err(String(resp.error ?? 'unknown error'));
    log(`send_whatsapp: sent to ${resp.jid}`);
    return ok(`Message sent to WhatsApp ${resp.jid}`);
  },
};

export const listWhatsappGroups: McpToolDefinition = {
  tool: {
    name: 'list_whatsapp_groups',
    description:
      'List the WhatsApp groups visible to the host\'s WhatsApp session (name + JID) — use this to find a group JID to give the operator so they can add it to WHATSAPP_SEND_ALLOWLIST_GROUPS. Only works from the agent group designated for direct WhatsApp sends.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  async handler() {
    const resp = await requestAndWait('list_whatsapp_groups', {}, 'whatsapp_groups_result');
    if (!resp) return err('Listing WhatsApp groups timed out waiting for host response');
    if (!resp.ok) return err(String(resp.error ?? 'unknown error'));
    const groups = (resp.groups as Array<{ name: string; jid: string }>) ?? [];
    if (groups.length === 0) return ok('No WhatsApp groups visible to this session.');
    return ok(groups.map((g) => `${g.name}: ${g.jid}`).join('\n'));
  },
};

registerTools([sendWhatsapp, listWhatsappGroups]);

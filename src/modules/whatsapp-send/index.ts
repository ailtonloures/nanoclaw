/**
 * Direct WhatsApp send — an outbound-only bridge for a designated agent
 * group to push messages to allowlisted WhatsApp contacts/groups WITHOUT
 * any messaging_group/wiring. No inbound WhatsApp traffic is involved here
 * at all; this only calls the live WhatsApp adapter's own deliver/query
 * methods directly (src/channels/whatsapp.ts), the same way the host would
 * for a normal reply, just without the destination/session/wiring checks
 * that a normal chat message goes through in src/delivery.ts.
 *
 * Two system actions, registered as delivery actions and driven by the
 * `send_whatsapp` / `list_whatsapp_groups` MCP tools
 * (container/agent-runner/src/mcp-tools/whatsapp.ts). Both write their
 * result back into the calling session's inbound.db as a `kind: 'system'`
 * response row, mirroring the cli_request/cli_response round trip in
 * src/cli/delivery-action.ts.
 *
 * Both the destination allowlist and the "which agent group may call this"
 * gate are enforced HERE, host-side, from .env — never trust the container.
 */
import type Database from 'better-sqlite3';

import { registerDeliveryAction } from '../../delivery.js';
import { getChannelAdapterExact } from '../../channels/channel-registry.js';
import { insertMessage } from '../../db/session-db.js';
import { readEnvFile } from '../../env.js';
import { unguarded } from '../../guard/index.js';
import { log } from '../../log.js';
import type { Session } from '../../types.js';

const env = readEnvFile([
  'WHATSAPP_SEND_AGENT_GROUP_ID',
  'WHATSAPP_SEND_ALLOWLIST_CONTACTS',
  'WHATSAPP_SEND_ALLOWLIST_GROUPS',
]);

const ALLOWED_AGENT_GROUP_ID = env.WHATSAPP_SEND_AGENT_GROUP_ID || undefined;

/** Strip everything but digits — drops '+', spaces, dashes, and any @domain suffix. */
function toDigits(raw: string): string {
  const beforeAt = raw.includes('@') ? raw.split('@')[0]! : raw;
  return beforeAt.replace(/[^\d]/g, '');
}

function parseAllowlist(raw: string | undefined): Set<string> {
  if (!raw) return new Set();
  return new Set(
    raw
      .split(',')
      .map((s) => toDigits(s.trim()))
      .filter((s) => s.length > 0),
  );
}

const ALLOWED_CONTACTS = parseAllowlist(env.WHATSAPP_SEND_ALLOWLIST_CONTACTS);
const ALLOWED_GROUPS = parseAllowlist(env.WHATSAPP_SEND_ALLOWLIST_GROUPS);

/**
 * Resolve a raw `to` (bare number, +number, full/partial JID) against the
 * two allowlists. Both lists are normalized to bare digit strings, so a
 * contact and a group are told apart purely by which allowlist the digits
 * appear in — not by string shape.
 */
export function resolveAllowedWhatsappJid(to: string): { jid: string } | { error: string } {
  const digits = toDigits(to);
  if (!digits) return { error: `Destino inválido: "${to}"` };
  if (ALLOWED_CONTACTS.has(digits)) return { jid: `${digits}@s.whatsapp.net` };
  if (ALLOWED_GROUPS.has(digits)) return { jid: `${digits}@g.us` };
  return {
    error:
      `Destino não autorizado: "${to}". Adicione o número (WHATSAPP_SEND_ALLOWLIST_CONTACTS) ` +
      `ou o JID do grupo (WHATSAPP_SEND_ALLOWLIST_GROUPS) no .env e reinicie o host.`,
  };
}

function checkGroupAllowed(session: Session): string | undefined {
  if (!ALLOWED_AGENT_GROUP_ID) {
    return (
      'send_whatsapp não está configurado: defina WHATSAPP_SEND_AGENT_GROUP_ID no .env ' +
      'com o id do agent group autorizado a usar esta ferramenta.'
    );
  }
  if (session.agent_group_id !== ALLOWED_AGENT_GROUP_ID) {
    return `Este agent group (${session.agent_group_id}) não está autorizado a usar o envio direto de WhatsApp.`;
  }
  return undefined;
}

function writeResponse(
  inDb: Database.Database,
  requestId: string,
  type: string,
  payload: Record<string, unknown>,
): void {
  insertMessage(inDb, {
    id: `wa-resp-${requestId}`,
    kind: 'system',
    timestamp: new Date().toISOString(),
    platformId: null,
    channelType: null,
    threadId: null,
    content: JSON.stringify({ type, requestId, ...payload }),
    processAfter: null,
    recurrence: null,
    trigger: 0,
  });
}

registerDeliveryAction(
  'send_whatsapp',
  async (content, session, inDb) => {
    const requestId = content.requestId as string;
    const to = content.to as string;
    const text = content.text as string;

    const groupErr = checkGroupAllowed(session);
    if (groupErr) {
      writeResponse(inDb, requestId, 'whatsapp_send_result', { ok: false, error: groupErr });
      return;
    }

    const resolved = resolveAllowedWhatsappJid(to);
    if ('error' in resolved) {
      writeResponse(inDb, requestId, 'whatsapp_send_result', { ok: false, error: resolved.error });
      return;
    }

    const adapter = getChannelAdapterExact('whatsapp');
    if (!adapter) {
      writeResponse(inDb, requestId, 'whatsapp_send_result', {
        ok: false,
        error: 'Adapter do WhatsApp não está registrado/rodando neste host.',
      });
      return;
    }
    if (!adapter.isConnected()) {
      writeResponse(inDb, requestId, 'whatsapp_send_result', {
        ok: false,
        error: 'Sessão do WhatsApp não está conectada/autenticada — mensagem NÃO enviada.',
      });
      return;
    }

    try {
      // noPrefix: this is a direct send to a third party, not a reply in the
      // operator's own self-chat — the shared-number name prefix (whatsapp.ts)
      // has no purpose here and would break "send as me".
      await adapter.deliver(resolved.jid, null, { kind: 'chat', content: { text, noPrefix: true } });
      log.info('Direct WhatsApp send delivered', { agentGroupId: session.agent_group_id, jid: resolved.jid });
      writeResponse(inDb, requestId, 'whatsapp_send_result', { ok: true, jid: resolved.jid });
    } catch (err) {
      writeResponse(inDb, requestId, 'whatsapp_send_result', {
        ok: false,
        error: `Falha ao enviar: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  },
  unguarded('destination is server-side allowlisted (.env) and scoped to one designated agent group'),
);

registerDeliveryAction(
  'list_whatsapp_groups',
  async (content, session, inDb) => {
    const requestId = content.requestId as string;

    const groupErr = checkGroupAllowed(session);
    if (groupErr) {
      writeResponse(inDb, requestId, 'whatsapp_groups_result', { ok: false, error: groupErr });
      return;
    }

    const adapter = getChannelAdapterExact('whatsapp');
    if (!adapter) {
      writeResponse(inDb, requestId, 'whatsapp_groups_result', {
        ok: false,
        error: 'Adapter do WhatsApp não está registrado/rodando neste host.',
      });
      return;
    }
    if (!adapter.isConnected()) {
      writeResponse(inDb, requestId, 'whatsapp_groups_result', {
        ok: false,
        error: 'Sessão do WhatsApp não está conectada/autenticada.',
      });
      return;
    }

    try {
      const groups = (await adapter.syncConversations?.()) ?? [];
      writeResponse(inDb, requestId, 'whatsapp_groups_result', {
        ok: true,
        groups: groups.map((g) => ({ name: g.name, jid: g.platformId })),
      });
    } catch (err) {
      writeResponse(inDb, requestId, 'whatsapp_groups_result', {
        ok: false,
        error: `Falha ao listar grupos: ${err instanceof Error ? err.message : String(err)}`,
      });
    }
  },
  unguarded('read-only WhatsApp group listing, scoped to one designated agent group'),
);

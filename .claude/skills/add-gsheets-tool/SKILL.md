---
name: add-gsheets-tool
description: Add Google Sheets as an MCP tool, sandboxed to a single dedicated "Nanoclaw" Drive folder — every spreadsheet the agent creates or edits lives inside that folder. Self-authored stdio MCP server (no third-party package) using OneCLI-managed OAuth via the transparent gateway proxy. Sibling of /add-gdrive-tool, sharing the same folder convention with no runtime dependency between the two.
---

# Add Google Sheets Tool (folder-sandboxed, OneCLI-native)

This skill wires a **self-authored** stdio MCP server (`gsheets-mcp-stdio.ts`) into selected agent groups, following the exact same pattern as [`/add-gdrive-tool`](../add-gdrive-tool/SKILL.md) — no third-party npm package, because no off-the-shelf Sheets MCP server understands "only ever touch one folder."

**The sandbox, in one sentence:** every spreadsheet this tool creates lives inside a top-level Drive folder literally named `Nanoclaw` (auto-created on first use, shared convention with `/add-gdrive-tool`); every tool call that references an existing `spreadsheetId` walks its Drive parent chain and refuses to proceed if that chain doesn't reach the Nanoclaw folder. There is no "list all spreadsheets in Drive" tool.

**Deliberately a sibling, not a combined skill** (same stance `/add-gcal-tool` takes relative to `/add-gmail-tool`): installs and removes independently of `/add-gdrive-tool`. If both are installed in the same group, they converge on the same `Nanoclaw` folder because each resolves it by name+location the same way and shares the `/workspace/agent/.gdrive/root.json` cache-file convention — not because of a code dependency between them.

Tools exposed (surfaced as `mcp__gsheets__<name>`): `gsheets_create`, `gsheets_list`, `gsheets_get_metadata`, `gsheets_read_values`, `gsheets_write_values`, `gsheets_append_values`, `gsheets_add_sheet`, `gsheets_rename_sheet`.

**Why this pattern:** same OneCLI-native principle as `/add-gdrive-tool` — raw `fetch()` calls to `sheets.googleapis.com` / `www.googleapis.com` get credentials injected transparently by the OneCLI gateway proxy (`container/skills/onecli-gateway/SKILL.md`). No credential stub files, no extra mount, no Dockerfile edit, no image rebuild.

## Phase 1: Pre-flight

### Discover the OneCLI provider slug for Sheets/Drive

There is no fixed provider slug documented anywhere in this repo for Google Drive or Sheets. Find it live:

```bash
onecli apps list | grep -iE 'drive|sheet'
```

Sheets operations need **two things**: the `spreadsheets` scope (for reading/writing values and managing tabs via the Sheets API) and Drive access (to locate/create the file inside the Nanoclaw folder — a spreadsheet is a Drive file). If `onecli apps list` shows a distinct Sheets provider, connect that; if it shows only a Drive provider, connect it with the broadest scope OneCLI offers for it and expect that `spreadsheets`-scope calls may need it reconnected later if they 403.

```bash
onecli apps get --provider <discovered-slug>
```

Expected: `"connection": { "status": "connected" }`.

If not connected, tell the user:

> Open the OneCLI web UI at http://127.0.0.1:10254, go to Apps, connect Google Drive (and Google Sheets if listed separately). Sign in with the Google account you want the agent to act as.

**If this group already has `/add-gdrive-tool` installed and connected**, the same connection should cover the Drive-side calls this skill also makes (folder lookup, spreadsheet creation) — you likely only need to additionally confirm `spreadsheets` scope is present for the Sheets-API calls (`gsheets_read_values`, `gsheets_write_values`, etc.).

### Check agent secret-mode

```bash
onecli agents list
```

If `secretMode` is `all`, you're done. If `selective`, assign the relevant secret(s) using the safe merge pattern (`set-secrets` replaces the entire list — always read first):

```bash
SHEETS_IDS=$(onecli secrets list | jq -r '[.data[] | select(.name | test("(?i)sheet|drive")) | .id] | join(",")')
CURRENT=$(onecli agents secrets --id <agent-id> | jq -r '[.data[]] | join(",")')
MERGED=$(printf '%s' "$CURRENT,$SHEETS_IDS" | tr ',' '\n' | sort -u | paste -sd ',' -)
onecli agents set-secrets --id <agent-id> --secret-ids "$MERGED"
onecli agents secrets --id <agent-id>
```

### Check if already applied

```bash
test -f container/agent-runner/src/gsheets-mcp-stdio.ts && echo "ALREADY APPLIED — skip to Phase 3"
```

## Phase 2: Apply Code Changes

### Copy the skill's source and test into the container tree

```bash
S=.claude/skills/add-gsheets-tool
cp $S/gsheets-mcp-stdio.ts  container/agent-runner/src/gsheets-mcp-stdio.ts
cp $S/gsheets-scope.test.ts container/agent-runner/src/gsheets-scope.test.ts
```

`cp` overwrites in place, so re-running this skill is safe. No Dockerfile edit and no `./container/build.sh` rebuild are needed — `container/agent-runner/src/` is a read-only mount into the running container at `/app/src`, not baked into the image. A container restart in Phase 4 is enough. `@modelcontextprotocol/sdk` and `zod` are already `container/agent-runner/package.json` dependencies.

### Validate

```bash
pnpm exec tsc -p container/agent-runner/tsconfig.json --noEmit
(cd container/agent-runner && bun test src/gsheets-scope.test.ts)
```

Both must be clean. `gsheets-scope.test.ts` exercises the folder-ancestry check against a fake in-memory parent graph.

## Phase 3: Wire Per-Agent-Group

Registration is a runtime write to the central DB (`data/v2.db`), like gmail/gcal — nothing here for a test to structurally guard; verified at runtime in Phase 5.

```bash
ncl groups list
```

For each chosen `<group-id>`:

```bash
ncl groups config add-mcp-server \
  --id <group-id> \
  --name gsheets \
  --command bun \
  --args '["run","/app/src/gsheets-mcp-stdio.ts"]' \
  --env '{}'
```

No `add-mount` step is needed — the only local state this server writes is the same small `Nanoclaw` folder-ID cache `/add-gdrive-tool` uses, at `/workspace/agent/.gdrive/root.json` inside the group's own already-mounted workspace.

## Phase 4: Restart

No rebuild needed (see Phase 2).

```bash
ncl groups restart --id <group-id>
```

Or restart the whole service:

```bash
source setup/lib/install-slug.sh
launchctl kickstart -k gui/$(id -u)/$(launchd_label)  # macOS
systemctl --user restart $(systemd_unit)               # Linux
```

## Phase 5: Verify

### Test from the wired agent

Tell the user:

> Send: **"create a spreadsheet called Budget in my Nanoclaw folder"**, then **"write 'Item' and 'Cost' as headers in row 1"**.
>
> The agent should use `gsheets_create` then `gsheets_write_values`.

### Confirm the sandbox holds

Ask the agent to read/write a `spreadsheetId` from some other real spreadsheet in the user's Drive (outside the Nanoclaw folder). It should get a clear "Blocked: ... outside the Nanoclaw folder" error, not silent success or a generic API error.

### Check logs if the tool isn't working

```bash
tail -100 logs/nanoclaw.log logs/nanoclaw.error.log | grep -iE 'gsheets|mcp'
```

Common signals:
- `ENOENT ... gsheets-mcp-stdio.ts` → file wasn't copied, or container wasn't restarted after Phase 2.
- `401`/`403` from `sheets.googleapis.com` specifically (Drive calls succeed but Sheets calls fail) → the connected app's scope covers Drive but not `spreadsheets`. Reconnect with broader scope in the OneCLI web UI.
- Agent says "I don't have spreadsheet tools" → the `gsheets` MCP server isn't registered in this group, or the container wasn't restarted.
- "Blocked: ... outside the Nanoclaw folder" on a spreadsheet the user expects the agent to edit → by design, same caveat as `/add-gdrive-tool`: this tool only sees spreadsheets whose Drive ancestry includes the Nanoclaw folder.

## Removal

See [REMOVE.md](REMOVE.md). Deletes the copied server + test, unregisters the MCP server per group, and leaves the actual spreadsheets and the `Nanoclaw` folder untouched.

## Notes

- **Why Sheets needs both Drive and Sheets API calls:** creating a spreadsheet and finding/verifying its folder location go through the Drive API (`files.create`/`files.get`, since a spreadsheet is just a Drive file with a special mimeType); reading/writing cell values and managing tabs go through the Sheets API v4, which doesn't expose folder/parent information at all — hence the duplicated ancestry-check logic living in this skill's own copy talking to Drive.
- **Depth-capped ancestry walk:** same 50-hop defensive cap as `/add-gdrive-tool`, for the same reason (pathological/unexpected API responses, not a real limitation).

## Credits & references

- **Credential mechanism:** OneCLI's transparent HTTPS gateway proxy — see `container/skills/onecli-gateway/SKILL.md`.
- **Skill pattern:** registration/lifecycle modeled on [`/add-gmail-tool`](../add-gmail-tool/SKILL.md) and [`/add-gcal-tool`](../add-gcal-tool/SKILL.md); self-authored server code modeled on [`/add-atomic-chat-tool`](../add-atomic-chat-tool/SKILL.md)'s `atomic-chat-mcp-stdio.ts`.
- **Sibling skill:** [`/add-gdrive-tool`](../add-gdrive-tool/SKILL.md) — same folder-sandbox convention, for general Drive file access.

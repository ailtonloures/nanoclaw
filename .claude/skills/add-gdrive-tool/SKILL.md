---
name: add-gdrive-tool
description: Add Google Drive as an MCP tool, sandboxed to a single dedicated "Nanoclaw" Drive folder. Self-authored stdio MCP server (no third-party package) using OneCLI-managed OAuth via the transparent gateway proxy — the agent can never read, write, move, or delete anything outside that folder; every tool call is checked against the folder's ancestry before it runs.
---

# Add Google Drive Tool (folder-sandboxed, OneCLI-native)

This skill wires a **self-authored** stdio MCP server (`gdrive-mcp-stdio.ts`) into selected agent groups. Unlike `/add-gmail-tool` and `/add-gcal-tool`, it does not install a third-party npm package — there's no off-the-shelf Drive MCP server that understands "only ever touch one folder," so that sandboxing logic has to be code we write and control directly.

**The sandbox, in one sentence:** on first use the server finds-or-creates a top-level Drive folder literally named `Nanoclaw`; every tool call that references an existing file or folder ID walks its parent chain and rejects the call outright if that chain doesn't reach the Nanoclaw folder. There is no "search all of Drive" or "list everything" tool — listing and search are always scoped to the Nanoclaw subtree. Deletion is trash-only (reversible); there is no permanent-delete tool.

Tools exposed (surfaced as `mcp__gdrive__<name>`): `gdrive_get_root_info`, `gdrive_list`, `gdrive_search`, `gdrive_read_file`, `gdrive_create_folder`, `gdrive_write_file`, `gdrive_rename`, `gdrive_move`, `gdrive_trash`, `gdrive_restore`.

**Why this pattern:** v2's invariant is that containers never receive raw API keys (CHANGELOG 2.0.0) — same OneCLI-native principle as gmail/gcal. But because we're authoring the server ourselves rather than wrapping a third-party CLI, we skip the credential-stub-file dance entirely: per `container/skills/onecli-gateway/SKILL.md`, raw `fetch()`/`curl` calls to the real Google API host get credentials injected transparently by the OneCLI gateway proxy — stub files are only needed by packages that build their own `OAuth2Client` before making the call. No stub files, no extra mount, no Dockerfile edit, no image rebuild.

## Phase 1: Pre-flight

### Discover the OneCLI provider slug for Google Drive

There is no fixed provider slug documented anywhere for Google Drive (unlike `gmail` / `google-calendar`, which are literal `--provider` values). Find it live:

```bash
onecli apps list | grep -i drive
```

Use whatever slug that returns (e.g. it may be `google-drive`, `gdrive`, or something else entirely — do not guess). Then confirm the connection:

```bash
onecli apps get --provider <discovered-slug>
```

Expected: `"connection": { "status": "connected" }`.

If not connected, tell the user:

> Open the OneCLI web UI at http://127.0.0.1:10254, go to Apps → Google Drive, and click Connect. Sign in with the Google account you want the agent to act as.

**Note on scope:** unlike gmail/gcal, we don't control the OAuth scope OneCLI requests — whatever scope its Google Drive provider definition uses is what you get. If a call later fails with a 403 mentioning insufficient scope, the fix is reconnecting with a broader scope in the OneCLI web UI, not a code change here (the folder-sandbox logic in this skill is enforced in our own code regardless of scope — the scope only affects *whether* Google lets the call through at all, not which folder it's allowed to touch).

### Check agent secret-mode

For each target agent group, confirm OneCLI will inject the Drive token into its container:

```bash
onecli agents list
```

If that agent's `secretMode` is `all`, you're done. If `selective`, explicitly assign the Drive secret using the safe merge pattern (`set-secrets` replaces the entire list — always read first):

```bash
DRIVE_IDS=$(onecli secrets list | jq -r '[.data[] | select(.name | test("(?i)drive")) | .id] | join(",")')
CURRENT=$(onecli agents secrets --id <agent-id> | jq -r '[.data[]] | join(",")')
MERGED=$(printf '%s' "$CURRENT,$DRIVE_IDS" | tr ',' '\n' | sort -u | paste -sd ',' -)
onecli agents set-secrets --id <agent-id> --secret-ids "$MERGED"
onecli agents secrets --id <agent-id>
```

### Check if already applied

```bash
test -f container/agent-runner/src/gdrive-mcp-stdio.ts && echo "ALREADY APPLIED — skip to Phase 3"
```

## Phase 2: Apply Code Changes

### Copy the skill's source and test into the container tree

```bash
S=.claude/skills/add-gdrive-tool
cp $S/gdrive-mcp-stdio.ts  container/agent-runner/src/gdrive-mcp-stdio.ts
cp $S/gdrive-scope.test.ts container/agent-runner/src/gdrive-scope.test.ts
```

`cp` overwrites in place, so re-running this skill (e.g. via `/update-skills`) is safe.

No Dockerfile edit and no `./container/build.sh` rebuild are needed: `container/agent-runner/src/` is a read-only mount into the running container at `/app/src`, not baked into the image (see the "Source is NOT baked in" comment in `container/Dockerfile`). A container restart in Phase 4 is enough for it to appear.

No `@modelcontextprotocol/sdk` or `zod` install is needed either — both are already `container/agent-runner/package.json` dependencies (the shared `nanoclaw` MCP tool bundle already uses them).

### Validate

```bash
pnpm exec tsc -p container/agent-runner/tsconfig.json --noEmit
(cd container/agent-runner && bun test src/gdrive-scope.test.ts)
```

Both must be clean. `gdrive-scope.test.ts` exercises the folder-ancestry check against a fake in-memory parent graph — this is the actual security guarantee behind "the agent can't touch anything outside its folder," so it must pass.

## Phase 3: Wire Per-Agent-Group

Registration is a **runtime write to the central DB** (`data/v2.db`), like gmail/gcal — not a source-tree edit, so there's nothing here for a test to structurally guard; it's verified at runtime in Phase 5 instead.

### List groups, pick which ones get Drive

```bash
ncl groups list
```

### Register the MCP server

For each chosen `<group-id>`:

```bash
ncl groups config add-mcp-server \
  --id <group-id> \
  --name gdrive \
  --command bun \
  --args '["run","/app/src/gdrive-mcp-stdio.ts"]' \
  --env '{}'
```

No `add-mount` step is needed — there's no local credential file to persist (unlike gmail/gcal's `.gmail-mcp` / `.calendar-mcp` mounts). The only local state this server writes is a small cache of the resolved Nanoclaw folder ID, which lives at `/workspace/agent/.gdrive/root.json` inside the group's own already-mounted workspace.

Approval behaviour depends on where you run it: from inside an agent's container, `ncl` write verbs are approval-gated (admin approves before it lands); from a host operator shell with full scope, it executes immediately.

## Phase 4: Restart

No rebuild needed (see Phase 2). Restart the group's container so it picks up the new `container.json`:

```bash
ncl groups restart --id <group-id>
```

Or restart the whole service if applying broadly:

```bash
source setup/lib/install-slug.sh
launchctl kickstart -k gui/$(id -u)/$(launchd_label)  # macOS
systemctl --user restart $(systemd_unit)               # Linux
```

## Phase 5: Verify

### Test from the wired agent

Tell the user:

> In your `<agent-name>` chat, send: **"what's my Nanoclaw drive folder link?"** — the agent should call `gdrive_get_root_info` and create the folder if it doesn't exist yet. Then try **"create a file called notes.txt in my Nanoclaw folder with the text 'hello'"**.

### Confirm the sandbox actually holds

Ask the agent to reference a real file ID from *outside* the Nanoclaw folder (e.g. a file ID copied from some other folder in the user's Drive, via the file's "Get link" menu). The agent should get a clear "Blocked: ... outside the Nanoclaw folder" error from `gdrive_read_file` / `gdrive_move` / etc., not silent success and not a generic API error.

### Check logs if the tool isn't working

```bash
tail -100 logs/nanoclaw.log logs/nanoclaw.error.log | grep -iE 'gdrive|mcp'
```

Common signals:
- `command not found: bun` inside the MCP server args → shouldn't happen (bun is the container's own runtime), but if seen, check the container image is current.
- `ENOENT ... gdrive-mcp-stdio.ts` → the file wasn't copied into `container/agent-runner/src/`, or the container wasn't restarted after Phase 2.
- `401`/`403` from `www.googleapis.com` → OneCLI isn't injecting. Check secret mode (`onecli agents secrets --id <agent-id>`) and that the Drive app is connected (`onecli apps get --provider <slug>`).
- Agent says "I don't have Drive tools" → the `gdrive` MCP server isn't registered in this group (re-run the Phase 3 step and restart), or it's registered but the container wasn't restarted.
- "Blocked: ... outside the Nanoclaw folder" on a file the user expects the agent to see → by design. This tool only sees files it created itself inside the Nanoclaw folder tree; a file the user manually placed elsewhere in Drive (even if later moved into the Nanoclaw folder via the Drive UI) becomes visible the moment its `parents` chain includes the Nanoclaw folder ID — ask the agent to `gdrive_list` the folder again if a manually-added file doesn't show up immediately (Drive API list/search results are not cached beyond a single call, so this is usually a "wrong folder" or "not actually moved yet" issue, not a stale-cache one).

## Removal

See [REMOVE.md](REMOVE.md). Deletes the copied server + test, unregisters the MCP server per group, and leaves the actual `Nanoclaw` Drive folder and its contents untouched — that's the user's data.

## Notes

- **Why no shared module with `/add-gsheets-tool`:** the two skills are deliberately independent siblings (same philosophy as gmail/gcal) — each embeds its own copy of the folder-ancestry check so either one installs and removes cleanly on its own. If both are installed in the same group, they converge on the same `Nanoclaw` folder because they resolve it by name+location independently (and share the `/workspace/agent/.gdrive/root.json` cache-file convention), not because of a code dependency between them.
- **Depth-capped ancestry walk:** `assertWithinRoot` in `gdrive-mcp-stdio.ts` walks at most 50 hops before refusing — real Drive folder trees are never remotely that deep, so this is purely a defensive cap against a pathological or unexpected API response, not a real limitation.
- **This is tool-only.** There is no Drive-as-a-channel (e.g. "watch this folder for new files and route them to the agent") — that would be a separate piece of work.

## Credits & references

- **Credential mechanism:** OneCLI's transparent HTTPS gateway proxy — see `container/skills/onecli-gateway/SKILL.md`.
- **Skill pattern:** registration/lifecycle modeled on [`/add-gmail-tool`](../add-gmail-tool/SKILL.md) and [`/add-gcal-tool`](../add-gcal-tool/SKILL.md); self-authored server code modeled on [`/add-atomic-chat-tool`](../add-atomic-chat-tool/SKILL.md)'s `atomic-chat-mcp-stdio.ts`.
- **Sibling skill:** [`/add-gsheets-tool`](../add-gsheets-tool/SKILL.md) — same folder-sandbox convention, for Google Sheets.

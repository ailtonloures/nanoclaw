# Remove Google Drive Tool

Idempotent — safe to run even if some steps were never applied.

## 1. Delete the copied server and test

```bash
rm -f container/agent-runner/src/gdrive-mcp-stdio.ts \
      container/agent-runner/src/gdrive-scope.test.ts
```

## 2. Unregister the MCP server (per group)

`ncl groups list` shows the groups. For each group that had Drive wired:

```bash
ncl groups config remove-mcp-server --id <group-id> --name gdrive
```

## 3. Restart

No rebuild is needed (the server file lived on the RO source mount, not baked into the image). Just restart the affected group(s), or the whole service:

```bash
source setup/lib/install-slug.sh

# macOS
launchctl kickstart -k gui/$(id -u)/$(launchd_label)

# Linux
systemctl --user restart $(systemd_unit)
```

## 4. (Optional) Clear the cached folder-ID and disconnect

This does **not** touch the actual `Nanoclaw` Drive folder or anything inside it — that's the user's data and is left alone. It only removes the small local cache file that remembers the folder's ID, and optionally revokes the OneCLI connection if nothing else uses it.

```bash
# Per group, from the host (paths are inside each group's mounted workspace):
rm -f groups/<folder>/agent/.gdrive/root.json

# Only if /add-gsheets-tool (or anything else) doesn't also depend on this connection:
onecli apps disconnect --provider <drive-provider-slug>
```

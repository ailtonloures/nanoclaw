# Remove Google Sheets Tool

Idempotent — safe to run even if some steps were never applied.

## 1. Delete the copied server and test

```bash
rm -f container/agent-runner/src/gsheets-mcp-stdio.ts \
      container/agent-runner/src/gsheets-scope.test.ts
```

## 2. Unregister the MCP server (per group)

`ncl groups list` shows the groups. For each group that had Sheets wired:

```bash
ncl groups config remove-mcp-server --id <group-id> --name gsheets
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

This does **not** touch the actual spreadsheets or the `Nanoclaw` Drive folder — that's the user's data and is left alone.

```bash
# Only if /add-gdrive-tool is NOT also installed in this group (it shares the same cache file):
rm -f groups/<folder>/agent/.gdrive/root.json

# Only if nothing else (e.g. /add-gdrive-tool) depends on this connection:
onecli apps disconnect --provider <sheets-or-drive-provider-slug>
```

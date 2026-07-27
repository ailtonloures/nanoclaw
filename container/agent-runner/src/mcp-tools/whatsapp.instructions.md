## Direct WhatsApp send

`mcp__nanoclaw__send_whatsapp({ to, text })` sends a raw WhatsApp text message directly — it bypasses the destinations/session system entirely, so it is NOT a substitute for `send_message`. Use it only when explicitly asked to message someone "on WhatsApp" (or an obvious equivalent). `to` is a contact phone number (with or without `+`) or a WhatsApp group JID (`...@g.us`).

This only works from the one agent group the operator designated for it, and only to numbers/group JIDs already on the server-side allowlist. Every other agent group, and every destination not on the allowlist, gets a clear error back — never a silent no-op. If you get an "unauthorized" or "not connected" error, report it verbatim; do not retry silently or guess at a different destination.

Use `mcp__nanoclaw__list_whatsapp_groups()` to see the groups visible to the WhatsApp session (name + JID) when you or the operator need a group's JID to add to the allowlist.

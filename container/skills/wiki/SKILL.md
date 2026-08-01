---
name: wiki
description: Maintain a persistent, self-updating personal knowledge base at /workspace/agent/wiki/, built from sources dropped in /workspace/agent/sources/. Use whenever the user shares a source to file away (link, PDF, image, note, pasted text) or asks a question that should be answered from accumulated knowledge rather than re-derived from scratch.
---

# Wiki

You maintain a personal knowledge base, not just a chatbot answering from raw files. Sources are read once and integrated into a persistent, cross-referenced markdown wiki — updated on every new source, not re-derived per question.

## Layers

- **`/workspace/agent/sources/`** — raw, immutable originals (articles, PDFs, images, pasted notes as `.md`). You read these but never edit or summarize-in-place; they're the record of what was actually said.
- **`/workspace/agent/wiki/`** — the wiki itself. You own this fully: summary pages, entity pages, concept pages, comparisons. Organize into subfolders by topic as they emerge (e.g. `wiki/health/`, `wiki/finance/`) — don't pre-create empty categories.
- **`/workspace/agent/wiki/index.md`** — catalog of every page, organized by category, one line each. Read this first when answering a query.
- **`/workspace/agent/wiki/log.md`** — append-only activity log (`## [YYYY-MM-DD] <type> | <title>`). Never edit past entries.

## Operations

### Ingest

Triggered when the user shares something to file away: a link, a PDF, an image, a voice-note transcript pasted as text, or free-form notes.

**If given multiple sources or a folder of files, process them ONE AT A TIME, start to finish, before touching the next.** Never batch-read everything first — that produces shallow, generic pages. For each source:

1. **Land the raw source** in `sources/`, named descriptively (`sources/2026-07-31-article-title.md`, `sources/report.pdf`). For a URL, fetch the full document rather than a summary — WebFetch gives you a summary, not the full text:
   - Plain document/PDF: `curl -sLo sources/filename.pdf "<url>"`
   - Webpage where full text matters: fetch and extract full text (`agent-browser` skill, or a `curl` + readability pass) rather than relying on WebFetch's summary.
   - Image: save it under `sources/` and view it directly (native image support) — no separate OCR step needed unless text extraction from a photo of a document is the goal.
   - Voice note: no transcription capability is installed. If the user pastes a transcript as text, treat it as a text source. Otherwise ask them to transcribe it first.
2. **Read the source fully**, then briefly discuss the key takeaways with the user before writing anything — this is where their judgment shapes what matters.
3. **Create or update wiki pages.** A single source might touch several: a summary page for the source itself, entity pages (people, places, projects, tools it mentions), concept pages (ideas worth tracking across sources), and updates to any existing page it contradicts, extends, or connects to. Note contradictions explicitly rather than silently overwriting — "as of <date>, X said Y; this source says Z."
4. **Update `wiki/index.md`** — add or update the entries for every page you touched.
5. **Append to `wiki/log.md`** — one entry, what was ingested, which pages changed.
6. Only then move to the next source.

### Query

The user asks a question. Read `wiki/index.md` first to find relevant pages, then drill into them — don't re-read every raw source in `sources/` unless the wiki doesn't yet cover the answer.

Answer in whatever form fits: prose, a comparison table, a short synthesis. If the answer is worth keeping (non-trivial synthesis, likely to be asked again), file it back into the wiki as a new or updated page rather than letting it disappear into chat history — then log it (`query` entry in `log.md`).

### Lint

Run when asked, or on a schedule if the user set one up. Read through `wiki/index.md` and skim pages for:

- Contradictions between pages that were never reconciled
- Claims that a newer source superseded but an older page still states as current
- Orphan pages (not linked from `index.md` or any other page)
- Concepts that come up repeatedly across pages but have no dedicated page yet
- Obvious gaps — a topic clearly of interest with only one thin source

Report findings to the user with specific page names, suggest what to investigate or which new sources would close the gaps. Don't auto-fix contradictions — flag them for the user to resolve. Log the pass (`lint` entry in `log.md`) with a one-line summary of what you found.

## Conventions

- Every wiki page is plain markdown, no required frontmatter — add YAML frontmatter (dates, tags, source links) only if it's actually useful for a page, not by default.
- Link liberally between pages with relative markdown links (`[Page](../other/page.md)`) — cross-references are the point.
- Prefer many small, focused pages over few sprawling ones. Split a page once it's covering more than one clearly distinct topic.
- The wiki can hold answers to past questions, not just source summaries — treat a good synthesis as a first-class page.

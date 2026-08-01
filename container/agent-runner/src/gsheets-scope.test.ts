/**
 * Unit tests for the folder-sandboxing ancestry walk in gsheets-mcp-stdio.ts.
 * Duplicate of /add-gdrive-tool's gdrive-scope.test.ts by design — this skill
 * embeds its own copy of the ancestry check so it installs/removes
 * independently of /add-gdrive-tool.
 *
 * Uses a fake in-memory parent graph instead of the network.
 */
import { describe, expect, test } from 'bun:test';

import { assertWithinRoot, ScopeError } from './gsheets-mcp-stdio.ts';

const ROOT = 'root-folder-id';

// A small fake Drive tree:
// root-folder-id
//   └── subfolder-a
//         └── sheet-in-subfolder
//   └── sheet-in-root
// (unrelated, outside the sandbox)
// my-drive-root
//   └── other-folder
//         └── sheet-outside
const FAKE_GRAPH: Record<string, { parents?: string[] }> = {
  [ROOT]: { parents: ['my-drive-root'] },
  'subfolder-a': { parents: [ROOT] },
  'sheet-in-subfolder': { parents: ['subfolder-a'] },
  'sheet-in-root': { parents: [ROOT] },
  'other-folder': { parents: ['my-drive-root'] },
  'sheet-outside': { parents: ['other-folder'] },
};

async function fakeGetParents(id: string): Promise<{ parents?: string[] } | null> {
  if (id === 'my-drive-root') return { parents: [] };
  return FAKE_GRAPH[id] ?? null;
}

describe('assertWithinRoot (gsheets)', () => {
  test('allows the root itself', async () => {
    await expect(assertWithinRoot(ROOT, ROOT, fakeGetParents)).resolves.toBeUndefined();
  });

  test('allows a spreadsheet directly in the root', async () => {
    await expect(assertWithinRoot('sheet-in-root', ROOT, fakeGetParents)).resolves.toBeUndefined();
  });

  test('allows a spreadsheet nested in a subfolder of the root', async () => {
    await expect(assertWithinRoot('sheet-in-subfolder', ROOT, fakeGetParents)).resolves.toBeUndefined();
  });

  test('rejects a spreadsheet whose ancestry reaches Drive root without passing through the sandbox', async () => {
    await expect(assertWithinRoot('sheet-outside', ROOT, fakeGetParents)).rejects.toBeInstanceOf(ScopeError);
  });

  test('rejects an unknown/inaccessible spreadsheet id', async () => {
    await expect(assertWithinRoot('does-not-exist', ROOT, fakeGetParents)).rejects.toBeInstanceOf(ScopeError);
  });

  test('rejects once the depth limit is exceeded (pathological/cyclic chain)', async () => {
    const cyclicGraph: Record<string, { parents?: string[] }> = {
      a: { parents: ['b'] },
      b: { parents: ['a'] },
    };
    const getParents = async (id: string) => cyclicGraph[id] ?? null;
    await expect(assertWithinRoot('a', ROOT, getParents, 5)).rejects.toBeInstanceOf(ScopeError);
  });
});

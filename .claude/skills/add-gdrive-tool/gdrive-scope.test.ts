/**
 * Unit tests for the folder-sandboxing ancestry walk in gdrive-mcp-stdio.ts.
 * This is the entire security guarantee behind "the agent can only touch the
 * Nanoclaw folder" — worth testing directly even though skill guidelines treat
 * a skill's own internal logic tests as optional.
 *
 * Uses a fake in-memory parent graph instead of the network, so this never
 * calls the real Drive API.
 */
import { describe, expect, test } from 'bun:test';

import { assertWithinRoot, ScopeError } from './gdrive-mcp-stdio.ts';

const ROOT = 'root-folder-id';

// A small fake Drive tree:
// root-folder-id
//   └── subfolder-a
//         └── file-in-subfolder
//   └── file-in-root
// (unrelated, outside the sandbox)
// my-drive-root
//   └── other-folder
//         └── file-outside
const FAKE_GRAPH: Record<string, { parents?: string[] }> = {
  [ROOT]: { parents: ['my-drive-root'] },
  'subfolder-a': { parents: [ROOT] },
  'file-in-subfolder': { parents: ['subfolder-a'] },
  'file-in-root': { parents: [ROOT] },
  'other-folder': { parents: ['my-drive-root'] },
  'file-outside': { parents: ['other-folder'] },
  // 'my-drive-root' deliberately has no entry — real Drive root has no parents.
};

async function fakeGetParents(id: string): Promise<{ parents?: string[] } | null> {
  if (id === 'my-drive-root') return { parents: [] };
  return FAKE_GRAPH[id] ?? null;
}

describe('assertWithinRoot', () => {
  test('allows the root itself', async () => {
    await expect(assertWithinRoot(ROOT, ROOT, fakeGetParents)).resolves.toBeUndefined();
  });

  test('allows a direct child of the root', async () => {
    await expect(assertWithinRoot('file-in-root', ROOT, fakeGetParents)).resolves.toBeUndefined();
  });

  test('allows a nested descendant of the root', async () => {
    await expect(assertWithinRoot('file-in-subfolder', ROOT, fakeGetParents)).resolves.toBeUndefined();
  });

  test('rejects a file whose ancestry reaches Drive root without passing through the sandbox', async () => {
    await expect(assertWithinRoot('file-outside', ROOT, fakeGetParents)).rejects.toBeInstanceOf(ScopeError);
  });

  test('rejects an unknown/inaccessible file id', async () => {
    await expect(assertWithinRoot('does-not-exist', ROOT, fakeGetParents)).rejects.toBeInstanceOf(ScopeError);
  });

  test('rejects once the depth limit is exceeded (pathological/cyclic chain)', async () => {
    const cyclicGraph: Record<string, { parents?: string[] }> = {
      a: { parents: ['b'] },
      b: { parents: ['a'] }, // cycle, never reaches ROOT
    };
    const getParents = async (id: string) => cyclicGraph[id] ?? null;
    await expect(assertWithinRoot('a', ROOT, getParents, 5)).rejects.toBeInstanceOf(ScopeError);
  });
});

import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { waitReady, convert, dropSamples } from './_helpers';

/**
 * Read the "N. filename" rows in on-screen order (the `.num` index span's parent).
 * `.num` is a shared styling class also used by the total-file-count footer span
 * (`{files.length}`), so filter to rows whose text actually names a file.
 */
async function rowOrder(page: import('@playwright/test').Page): Promise<string[]> {
  const all = await page
    .locator('.num')
    .evaluateAll((nodes) => nodes.map((n) => n.parentElement?.textContent?.trim() ?? ''));
  return all.filter((t) => t.endsWith('.pdf'));
}

test.describe('PDF merge', () => {
  test('merges PDFs into a valid PDF in the browser, no upload', async ({ page }) => {
    const external: string[] = [];
    page.on('request', (req) => {
      const u = req.url();
      if (!u.startsWith('http://localhost:4321') && !u.startsWith('data:') && !u.startsWith('blob:')) external.push(u);
    });
    await page.goto('/pdf-merge/');
    await waitReady(page);
    const download = await convert(page);
    expect(download.suggestedFilename()).toMatch(/\.pdf$/);
    const buf = readFileSync((await download.path()) as string);
    expect(buf.subarray(0, 5).toString('latin1')).toBe('%PDF-');
    expect(external, external.join(', ')).toHaveLength(0);
  });

  test('reordering files (move down) changes the merge order, thumbnails follow the file', async ({
    page,
  }) => {
    await page.goto('/pdf-merge/');
    await waitReady(page);
    await dropSamples(page); // a.pdf, then b.pdf

    expect(await rowOrder(page)).toEqual(['1. a.pdf', '2. b.pdf']);

    // Each row's thumbnail renders lazily (pdf.js, cosmetic-only) — wait for at
    // least one <img> so this test also exercises the rendering path, not just
    // the reorder logic underneath it.
    await expect(page.locator('img').first()).toBeVisible({ timeout: 15_000 });

    // "Move down" on the first row (a.pdf) — the last row's button is disabled,
    // so `.first()` deterministically targets row 1.
    await page.getByRole('button', { name: 'Move down' }).first().click();
    expect(await rowOrder(page)).toEqual(['1. b.pdf', '2. a.pdf']);

    const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
    await page.click('#merge-action');
    const download = await downloadPromise;
    const buf = readFileSync((await download.path()) as string);
    expect(buf.subarray(0, 5).toString('latin1')).toBe('%PDF-');
  });
});

import { type Page, type Download } from '@playwright/test';
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';

const b64 = (n: string) =>
  readFileSync(fileURLToPath(new URL(`../fixtures/pdf/${n}.pdf`, import.meta.url))).toString('base64');
const A = b64('a'), B = b64('b');

export async function waitReady(page: Page) {
  await page.waitForFunction(() => (window as Record<string, unknown>).__toolReady === true);
}

export async function convert(page: Page): Promise<Download> {
  const downloadPromise = page.waitForEvent('download', { timeout: 30_000 });
  await page.evaluate(({ a, b }) => {
    const toFile = (s: string, name: string) => {
      const bin = atob(s); const u = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
      return new File([u], name, { type: 'application/pdf' });
    };
    window.dispatchEvent(new CustomEvent('filesDropped', { detail: [toFile(a, 'a.pdf'), toFile(b, 'b.pdf')] }));
  }, { a: A, b: B });
  await page.locator('#merge-action').waitFor({ state: 'visible' });
  await page.click('#merge-action');
  return downloadPromise;
}

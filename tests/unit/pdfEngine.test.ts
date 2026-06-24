import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { mergePdfs } from '@/utils/pdfEngine';
import { PDFDocument } from 'pdf-lib';

const load = (n: string) =>
  new File([readFileSync(fileURLToPath(new URL(`../fixtures/pdf/${n}.pdf`, import.meta.url)))], `${n}.pdf`, { type: 'application/pdf' });

describe('mergePdfs', () => {
  it('appends all pages in order (2 + 3 = 5)', async () => {
    const blob = await mergePdfs([load('a'), load('b')]);
    expect(blob.type).toBe('application/pdf');
    const out = await PDFDocument.load(new Uint8Array(await blob.arrayBuffer()));
    expect(out.getPageCount()).toBe(5);
  });
  it('reports progress per file', async () => {
    const seen: number[] = [];
    await mergePdfs([load('a'), load('b')], (p) => seen.push(p.index));
    expect(seen).toEqual([0, 1]);
  });
  it('requires at least two PDFs', async () => {
    await expect(mergePdfs([load('a')])).rejects.toThrow();
  });
  it('rejects a non-PDF', async () => {
    await expect(mergePdfs([load('a'), new File([new Uint8Array([1,2,3])], 'x.pdf')])).rejects.toThrow();
  });
});

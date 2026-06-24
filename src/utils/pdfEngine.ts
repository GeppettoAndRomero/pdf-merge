/**
 * Merge multiple PDFs into one, in the browser (pdf-lib, no server).
 * Pages are appended in the given order; the inputs are unchanged. The output opens
 * in any normal PDF reader.
 */
import { PDFDocument } from 'pdf-lib';

async function loadPdf(file: File): Promise<PDFDocument> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  try {
    return await PDFDocument.load(bytes);
  } catch (e) {
    const msg = e instanceof Error ? e.message : '';
    if (/encrypt/i.test(msg)) throw new Error(`"${file.name}" is password-protected (encrypted).`);
    throw new Error(`"${file.name}" is not a readable PDF.`);
  }
}

export interface MergeProgress { index: number; total: number; name: string }

export async function mergePdfs(
  files: File[],
  onProgress?: (p: MergeProgress) => void
): Promise<Blob> {
  if (files.length < 2) throw new Error('Add at least two PDFs to merge.');
  const out = await PDFDocument.create();
  for (let i = 0; i < files.length; i++) {
    onProgress?.({ index: i, total: files.length, name: files[i].name });
    const src = await loadPdf(files[i]);
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  const bytes = await out.save();
  return new Blob([new Uint8Array(bytes)], { type: 'application/pdf' });
}

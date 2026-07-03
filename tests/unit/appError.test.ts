import { describe, it, expect } from 'vitest';
import { AppError, resolveErrorMessage } from '@/utils/appError';
import { ui } from '@/i18n/ui';

describe('resolveErrorMessage', () => {
  it('maps codes to localized strings', () => {
    expect(resolveErrorMessage(new AppError('errNeedTwoPdfs'), ui.en)).toBe(
      'Add at least two PDFs to merge.'
    );
    expect(resolveErrorMessage(new AppError('errNeedTwoPdfs'), ui.ja)).toBe(
      '結合するには PDF を 2 つ以上追加してください。'
    );
  });

  it('substitutes the {name} param', () => {
    expect(resolveErrorMessage(new AppError('errPdfEncrypted', { name: 'a.pdf' }), ui.en)).toBe(
      '"a.pdf" is password-protected (encrypted).'
    );
    expect(resolveErrorMessage(new AppError('errPdfUnreadable', { name: 'b.pdf' }), ui.es)).toBe(
      '«b.pdf» no es un PDF legible.'
    );
  });

  it('falls back to the localized generic message for unknown errors', () => {
    expect(resolveErrorMessage(new Error('Canvas 2D context unavailable'), ui.zh)).toBe(
      ui.zh.errConversionFailed
    );
  });

  it('every locale defines all mapped codes', () => {
    const codes = ['errNeedTwoPdfs', 'errPdfEncrypted', 'errPdfUnreadable', 'errConversionFailed'];
    for (const loc of ['en', 'ja', 'zh', 'de', 'es'] as const)
      for (const c of codes) expect((ui as any)[loc][c], `${loc}.${c}`).toBeTruthy();
  });
});

/**
 * ConversionManager (pdf-merge).
 * 複数の PDF を集め、各ファイルの 1 ページ目サムネイルを表示。順序を決めて 1 つに
 * 結合 → ダウンロード。すべてメインスレッド（サーバー不要）。
 *
 * 役割分担:
 *  - pdf-lib（pdfEngine.ts）… 結合という「機能の本体」。
 *  - pdf.js（pdfThumbnails.ts）… 1 ページ目サムネイルという「見た目の補助」。描画に
 *    失敗した場合はアイコンにフォールバックし、結合そのものは動く。
 */

import { useState, useEffect, useCallback, useRef } from 'preact/hooks';
import { AppCard } from './AppCard';
import { AppButton } from './AppButton';
import { ErrorToast } from './ErrorToast';
import { mergePdfs } from '@/utils/pdfEngine';
import { resolveErrorMessage } from '@/utils/appError';
import { openForThumbnails } from '@/utils/pdfThumbnails';
import { ui } from '@/i18n/ui';

interface ErrorToastItem {
  id: string;
  message: string;
}

interface ConversionManagerProps {
  locale?: string;
}

/** 並べ替えても安定する、ファイル内容に基づくキー（サムネイルのキャッシュ用）。 */
function fileKey(f: File): string {
  return `${f.name}__${f.size}__${f.lastModified}`;
}

export function ConversionManager({ locale = 'en' }: ConversionManagerProps) {
  const t = (ui as any)[locale] ?? ui.en;
  const [files, setFiles] = useState<File[]>([]);
  const [thumbs, setThumbs] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [errorToasts, setErrorToasts] = useState<ErrorToastItem[]>([]);
  const filesRef = useRef<File[]>([]);
  filesRef.current = files;
  const thumbsRef = useRef<Record<string, string>>({});
  thumbsRef.current = thumbs;
  const inflight = useRef<Set<string>>(new Set());

  const showErrorToast = useCallback((message: string) => {
    const id = `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    setErrorToasts((prev) => [...prev, { id, message }]);
  }, []);
  const removeErrorToast = useCallback((id: string) => {
    setErrorToasts((prev) => prev.filter((e) => e.id !== id));
  }, []);

  useEffect(() => {
    (globalThis as Record<string, unknown>).__toolReady = true;
  }, []);

  const addFiles = useCallback(
    (incoming: File[]) => {
      const pdfs = incoming.filter((f) => f.name.toLowerCase().endsWith('.pdf'));
      const rejected = incoming.filter((f) => !f.name.toLowerCase().endsWith('.pdf'));
      if (rejected.length) showErrorToast(t.errUnsupported.replace('{name}', rejected[0].name));
      if (pdfs.length) setFiles((prev) => [...prev, ...pdfs]);
      window.dispatchEvent(new CustomEvent('filesProcessed'));
    },
    [showErrorToast, t]
  );

  useEffect(() => {
    const handler = (e: Event) => addFiles((e as CustomEvent<File[]>).detail);
    window.addEventListener('filesDropped', handler);
    return () => window.removeEventListener('filesDropped', handler);
  }, [addFiles]);

  // 見た目の補助: 未描画のファイルだけ 1 ページ目サムネイルを生成（失敗は無視）。
  useEffect(() => {
    let cancelled = false;
    for (const f of files) {
      const key = fileKey(f);
      if (thumbsRef.current[key] || inflight.current.has(key)) continue;
      inflight.current.add(key);
      (async () => {
        try {
          const doc = await openForThumbnails(f);
          const url = await doc.render(1, 160);
          doc.destroy();
          if (!cancelled) setThumbs((prev) => ({ ...prev, [key]: url }));
        } catch {
          /* サムネイルなし。ファイル名とアイコンで識別できる。 */
        } finally {
          inflight.current.delete(key);
        }
      })();
    }
    return () => {
      cancelled = true;
    };
  }, [files]);

  const move = (i: number, dir: -1 | 1) =>
    setFiles((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  const removeAt = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));
  const clearAll = () => setFiles([]);

  const handleMerge = useCallback(async () => {
    const current = filesRef.current;
    if (current.length < 2 || busy) return;
    setBusy(true);
    try {
      const blob = await mergePdfs(current);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      showErrorToast(resolveErrorMessage(error, t));
    } finally {
      setBusy(false);
    }
  }, [busy, showErrorToast, t]);

  return (
    <div>
      <AppCard>
        <div style="margin-bottom: var(--space-4);">
          <h3 style="margin: 0 0 var(--space-1) 0; font-size: var(--fs-4); font-weight: 600;">
            {t.uploadHeading}
          </h3>
          <p style="margin: 0; font-size: var(--fs-2); color: var(--color-subtle);">
            {t.uploadSubtitle}
          </p>
        </div>

        <div
          style={{
            padding: 'var(--space-6)',
            border: '2px dashed var(--color-border)',
            borderRadius: 'var(--radius-md)',
            background: 'var(--color-surface)',
            textAlign: 'center',
            marginBottom: 'var(--space-4)',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <div style="font-size: 3rem; margin-bottom: var(--space-2);">📑</div>
          <div style="font-size: var(--fs-3); font-weight: 600; margin-bottom: var(--space-2);">
            {t.dropClick}
          </div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle);">{t.dropOr}</div>
          <div style="font-size: var(--fs-1); color: var(--color-subtle); margin-top: var(--space-1);">
            {t.dropSupported}
          </div>
          <input
            id="file-input"
            type="file"
            accept=".pdf,application/pdf"
            multiple
            onChange={(e) => {
              addFiles(Array.from(e.currentTarget.files || []));
              e.currentTarget.value = '';
            }}
            style="display: none;"
          />
        </div>

        {files.length > 0 && (
          <div style="display: flex; flex-direction: column; gap: var(--space-2); margin-bottom: var(--space-4);">
            {files.map((f, i) => {
              const src = thumbs[fileKey(f)];
              return (
                <div
                  key={`${fileKey(f)}-${i}`}
                  style="display: flex; justify-content: space-between; align-items: center; gap: var(--space-3); padding: var(--space-2) var(--space-3); background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius-sm);"
                >
                  <span style="display: flex; align-items: center; gap: var(--space-3); min-width: 0;">
                    <span
                      aria-hidden="true"
                      style={{
                        flexShrink: '0',
                        width: '34px',
                        height: '46px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        border: '1px solid var(--color-border)',
                        borderRadius: '2px',
                        background: 'var(--color-surface)',
                        fontSize: 'var(--fs-3)',
                      }}
                    >
                      {src ? (
                        <img src={src} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      ) : (
                        '📄'
                      )}
                    </span>
                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      <span class="num">{i + 1}.</span> {f.name}
                    </span>
                  </span>
                  <span style="display: flex; gap: var(--space-2); align-items: center; flex-shrink: 0;">
                    <button aria-label={t.moveUp ?? 'Up'} disabled={i === 0} onClick={() => move(i, -1)} style="background:none;border:none;cursor:pointer;color:var(--color-primary);font-size:var(--fs-3);">↑</button>
                    <button aria-label={t.moveDown ?? 'Down'} disabled={i === files.length - 1} onClick={() => move(i, 1)} style="background:none;border:none;cursor:pointer;color:var(--color-primary);font-size:var(--fs-3);">↓</button>
                    <button aria-label={t.removeFile ?? 'Remove'} onClick={() => removeAt(i)} style="background:none;border:none;cursor:pointer;color:var(--color-danger);font-size:var(--fs-3);">×</button>
                  </span>
                </div>
              );
            })}
          </div>
        )}

        <div style="display: flex; justify-content: space-between; align-items: center; gap: var(--space-3);">
          <span style="font-size: var(--fs-2); color: var(--color-subtle);" class="num">{files.length}</span>
          <span style="display: flex; gap: var(--space-2);">
            {files.length > 0 && <AppButton variant="secondary" onClick={clearAll}>{t.clearAll}</AppButton>}
            <button
              id="merge-action"
              onClick={handleMerge}
              disabled={files.length < 2 || busy}
              class="app-button app-button--primary"
            >
              {busy ? (t.merging ?? 'Merging…') : (t.mergeButton ?? 'Merge PDFs')}
            </button>
          </span>
        </div>
      </AppCard>

      {errorToasts.length > 0 && (
        <div className="error-toast-container" aria-label={t.notificationsAria}>
          {errorToasts.map((toast) => (
            <ErrorToast key={toast.id} id={toast.id} message={toast.message} onClose={removeErrorToast} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

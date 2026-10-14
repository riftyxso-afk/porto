"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useT } from "@/i18n/LanguageProvider";
import {
  buildStencil,
  createSignatureRenderer,
  inkParams,
  snapshot,
  type InkParams,
  type SignatureRenderer,
  type Stencil,
} from "./ink";

export type StageState = "empty" | "loading" | "ready" | "error";

interface Props {
  name: string;
  fontFamily: string;
  /** Bumped by the parent to replay the signature without changing the name. */
  replay: number;
  onSigned: (dataUrl: string, params: InkParams) => void;
}

export const MAX_NAME = 28;

// Longer names take longer to sign, but not in proportion, or a long name would
// feel like it was being written in slow motion while the cursor waits.
function signDuration(text: string) {
  return Math.min(1500, 420 + text.trim().length * 46);
}

// easeInOutQuad. A hand leans into the first letters and eases off before the
// last one finishes, and a pen running at a constant rate reads as a machine.
function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function SignatureStage({ name, fontFamily, replay, onSigned }: Props) {
  const t = useT();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<SignatureRenderer | null>(null);
  const stencilRef = useRef<Stencil | null>(null);
  const paramsRef = useRef<InkParams | null>(null);
  const rafRef = useRef(0);
  const signedRef = useRef(false);
  const sizeRef = useRef({ w: 0, h: 0 });

  const [state, setState] = useState<StageState>("loading");

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
  }, []);

  const paint = useCallback((progress: number) => {
    const renderer = rendererRef.current;
    const stencil = stencilRef.current;
    const params = paramsRef.current;
    if (!renderer || !stencil || !params) return;
    renderer.draw(stencil, params, progress);
  }, []);

  // The WebGL context is bound to the canvas once and kept for the life of the
  // page. Rebuilding it on every keystroke would drop the context outright and
  // stall the browser.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: SignatureRenderer | null = null;
    try {
      renderer = createSignatureRenderer(canvas);
    } catch {
      renderer = null;
    }
    if (!renderer) {
      setState("error");
      return;
    }
    rendererRef.current = renderer;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (w === sizeRef.current.w && h === sizeRef.current.h) return false;
      canvas.width = w;
      canvas.height = h;
      sizeRef.current = { w, h };
      return true;
    };

    const measure = new ResizeObserver(() => {
      if (resize()) paint(signedRef.current ? 1 : 0);
    });
    measure.observe(canvas);
    resize();

    return () => {
      measure.disconnect();
      stop();
      renderer?.dispose();
      rendererRef.current = null;
    };
  }, [paint, stop]);

  // Rebuild and replay whenever the name, the font, or the replay key changes.
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      const trimmed = name.trim();
      const canvas = canvasRef.current;

      if (!trimmed) {
        stencilRef.current = null;
        paramsRef.current = null;
        signedRef.current = false;
        stop();
        paint(0);
        setState("empty");
        return;
      }

      // next/font registers the face under a generated family name, so the
      // sheet cannot be laid out until the browser reports it ready. Drawing
      // before then silently falls back to the system serif, and the signature
      // comes out in the wrong hand.
      //
      // The two waits are separate on purpose. load() asks for the one face and
      // rejects if that face is unusable; ready settles once nothing else is
      // pending. Letting the rejection skip the second wait is what left the
      // sheet drawing in serif while the hand was still on the wire.
      try {
        await document.fonts.load(`64px ${fontFamily}`);
      } catch {
        // A face that refuses to load still leaves a readable name, so carry on
        // with whatever the browser offers.
      }
      await document.fonts.ready.catch(() => {});
      if (cancelled || !canvas || !canvas.width || !canvas.height) return;

      const params = inkParams(trimmed);
      const stencil = buildStencil(
        trimmed,
        fontFamily,
        params,
        canvas.width,
        canvas.height,
      );
      if (cancelled) return;

      paramsRef.current = params;
      stencilRef.current = stencil;
      signedRef.current = false;
      setState((s) => (s === "ready" || s === "error" ? s : "loading"));

      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const duration = signDuration(trimmed);

      if (reduce) {
        paint(1);
        signedRef.current = true;
        setState("ready");
        const renderer = rendererRef.current;
        if (renderer) onSigned(snapshot(canvas, stencil, params, renderer), params);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        paint(ease(t));
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
        rafRef.current = 0;
        signedRef.current = true;
        setState("ready");
        const renderer = rendererRef.current;
        if (renderer) onSigned(snapshot(canvas, stencil, params, renderer), params);
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    run();
    return () => {
      cancelled = true;
      stop();
    };
  }, [name, fontFamily, replay, paint, stop, onSigned]);

  // The sheet is laid out against the canvas's pixel size, so a rotated phone
  // would otherwise keep signing at the proportions it started with.
  useEffect(() => {
    const onResize = () => {
      const canvas = canvasRef.current;
      const params = paramsRef.current;
      if (!canvas || !params || !name.trim()) return;
      stencilRef.current = buildStencil(
        name.trim(),
        fontFamily,
        params,
        canvas.width,
        canvas.height,
      );
      paint(signedRef.current ? 1 : 0);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [name, fontFamily, paint]);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#faf8f4] ring-1 ring-zinc-900/10 dark:ring-white/10">
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        role="img"
        aria-label={
          name.trim()
            ? `${t.playground.signatureAlt} ${name.trim()}${t.playground.signatureAltRest}`
            : t.playground.sheetEmpty
        }
      />

      {state === "empty" && (
        <p className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center text-sm text-zinc-600">
          {t.playground.stageEmpty}
        </p>
      )}

      {state === "loading" && (
        <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-zinc-600">
          {t.playground.stageLoading}
        </p>
      )}

      {state === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[#faf8f4] px-6 text-center">
          <p className="text-sm font-medium text-zinc-900">{t.playground.stageErrorTitle}</p>
          <p className="max-w-xs text-xs text-zinc-700">{t.playground.stageErrorBody}</p>
        </div>
      )}
    </div>
  );
}
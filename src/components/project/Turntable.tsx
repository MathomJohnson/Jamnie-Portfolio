"use client";

import { animate } from "motion";
import { useReducedMotion } from "motion/react";
import NextImage from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  angleFromIndex,
  frameIndexFromDrag,
  frameUrl,
  wrapIndex,
} from "@/lib/turntable";

type TurntableProps = {
  frameDir: string;
  frameCount: number;
  framePad?: number;
  frameExt?: string;
  poster: string;
  alt: string;
  sensitivity?: number;
};

const INTENT_PX = 8;
const ASPECT = 360 / 640;

export function Turntable({
  frameDir,
  frameCount,
  framePad = 3,
  frameExt = "webp",
  poster,
  alt,
  sensitivity = 8,
}: TurntableProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadGenRef = useRef(0);
  const indexRef = useRef(0);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    startIndex: number;
    capturing: boolean;
  } | null>(null);
  const hasInteractedRef = useRef(false);
  const nudgedRef = useRef(false);
  const nudgeStopRef = useRef<(() => void) | null>(null);
  const inFlightRef = useRef(false);

  const [status, setStatus] = useState<"loading" | "ready" | "failed">(
    "loading",
  );
  const [loaded, setLoaded] = useState(0);
  const [index, setIndex] = useState(0);
  const [grabbing, setGrabbing] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const angle = angleFromIndex(index, frameCount);

  const draw = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const frame = framesRef.current[frameIndex];
    if (!canvas || !frame) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
  }, []);

  const setFrame = useCallback(
    (next: number) => {
      const wrapped = wrapIndex(next, frameCount);
      indexRef.current = wrapped;
      setIndex(wrapped);
      draw(wrapped);
    },
    [draw, frameCount],
  );

  const loadFrames = useCallback(async () => {
    if (framesRef.current.length === frameCount || inFlightRef.current) {
      return;
    }

    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const gen = ++loadGenRef.current;
    inFlightRef.current = true;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssWidth = root.clientWidth;
    const cssHeight = cssWidth * ASPECT;
    canvas.width = Math.max(1, Math.round(cssWidth * dpr));
    canvas.height = Math.max(1, Math.round(cssHeight * dpr));

    const timeoutId = window.setTimeout(() => {
      if (loadGenRef.current === gen) setTimedOut(true);
    }, 8000);

    try {
      const frames: HTMLImageElement[] = new Array(frameCount);
      let completed = 0;

      await Promise.all(
        Array.from({ length: frameCount }, async (_, i) => {
          const img = new window.Image();
          img.decoding = "async";
          img.src = frameUrl(frameDir, i, framePad, frameExt);
          await img.decode();
          if (loadGenRef.current !== gen) return;
          frames[i] = img;
          completed += 1;
          setLoaded(completed);
        }),
      );

      if (loadGenRef.current !== gen) return;

      framesRef.current = frames;
      setStatus("ready");
      setTimedOut(false);
      draw(indexRef.current);
    } catch {
      if (loadGenRef.current === gen) setStatus("failed");
    } finally {
      if (loadGenRef.current === gen) inFlightRef.current = false;
      window.clearTimeout(timeoutId);
    }
  }, [draw, frameCount, frameDir, frameExt, framePad]);

  // Load as soon as the project page mounts and keep frames until it unmounts,
  // so the slide is ready on first scroll and never reloads on revisit.
  useEffect(() => {
    // All setState calls in loadFrames happen after an await, not synchronously.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadFrames();
    return () => {
      loadGenRef.current += 1;
      inFlightRef.current = false;
      framesRef.current = [];
    };
  }, [loadFrames]);

  useEffect(() => {
    if (status !== "ready" || reduceMotion || nudgedRef.current) return;
    nudgedRef.current = true;

    let stopped = false;
    const controls: { stop: () => void }[] = [];

    const run = async () => {
      const forward = animate(0, 6, {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => {
          if (!stopped && !hasInteractedRef.current) setFrame(Math.round(value));
        },
      });
      controls.push(forward);
      await forward.finished;
      if (stopped || hasInteractedRef.current) return;
      const back = animate(6, 0, {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (value) => {
          if (!stopped && !hasInteractedRef.current) setFrame(Math.round(value));
        },
      });
      controls.push(back);
      await back.finished;
    };

    nudgeStopRef.current = () => {
      stopped = true;
      controls.forEach((control) => control.stop());
    };

    void run();

    return () => {
      nudgeStopRef.current?.();
      nudgeStopRef.current = null;
    };
  }, [reduceMotion, setFrame, status]);

  const markInteracted = () => {
    hasInteractedRef.current = true;
    nudgeStopRef.current?.();
    nudgeStopRef.current = null;
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (status !== "ready") return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startIndex: indexRef.current,
      capturing: false,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;

    if (!drag.capturing) {
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > INTENT_PX) {
        drag.capturing = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        markInteracted();
        setGrabbing(true);
      } else {
        return;
      }
    }

    event.preventDefault();
    setFrame(frameIndexFromDrag(drag.startIndex, dx, sensitivity, frameCount));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (drag.capturing) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // Capture may already have been released.
      }
      setAnnouncement(
        `Rotated ${angleFromIndex(indexRef.current, frameCount)} degrees`,
      );
    }
    dragRef.current = null;
    setGrabbing(false);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (status !== "ready") return;

    let next: number | null = null;
    if (event.key === "ArrowLeft") next = indexRef.current - 1;
    if (event.key === "ArrowRight") next = indexRef.current + 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = frameCount - 1;
    if (next === null) return;

    event.preventDefault();
    event.stopPropagation();
    markInteracted();
    setFrame(next);
    setAnnouncement(
      `Rotated ${angleFromIndex(indexRef.current, frameCount)} degrees`,
    );
  };

  const ready = status === "ready";
  const progress = frameCount === 0 ? 0 : loaded / frameCount;
  const caption =
    (timedOut && !ready) || status === "failed"
      ? "360° view unavailable"
      : status === "loading"
        ? "Loading 360° view"
        : "Drag to rotate";

  return (
    <div ref={rootRef} className="w-full">
      <div
        className={`relative w-full ${grabbing ? "cursor-grabbing" : "cursor-grab"}`}
        style={{ aspectRatio: "16 / 9", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <NextImage
          src={poster}
          alt={ready ? "" : alt}
          fill
          sizes="(max-width: 1440px) 100vw, 1440px"
          className={`object-cover ${ready ? "opacity-0" : "opacity-100"}`}
        />
        <canvas
          ref={canvasRef}
          tabIndex={ready ? 0 : -1}
          role="slider"
          aria-label={alt}
          aria-valuemin={0}
          aria-valuemax={359}
          aria-valuenow={angle}
          aria-valuetext={`Rotated ${angle} degrees`}
          aria-hidden={ready ? undefined : true}
          className={`absolute inset-0 h-full w-full touch-pan-y ${ready ? "opacity-100" : "opacity-0"}`}
          onKeyDown={onKeyDown}
        />
        {status === "loading" && !ready ? (
          <div
            className="pointer-events-none absolute bottom-0 left-0 h-px bg-[var(--irene-accent)]"
            style={{ width: `${Math.round(progress * 100)}%` }}
          />
        ) : null}
        {/* Top-right overlay so it never meets the bottom slide caption; gutter matches SlideCaption. */}
        <p className="pointer-events-none absolute right-0 bottom-full px-6 py-4 font-mono text-[0.625rem] tracking-[0.22em] text-[var(--irene-steel)] uppercase sm:px-12 lg:top-0 lg:bottom-auto lg:px-16 lg:py-6">
          {caption}
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </div>
  );
}

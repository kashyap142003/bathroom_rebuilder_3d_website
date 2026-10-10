"use client";

import React, { useRef, useEffect, useState, useSyncExternalStore, useCallback } from "react";
import Image from "next/image";

const TOTAL_FRAMES = 201;
const FIRST_FRAME_SRC = "/frames/ezgif-frame-001.png";

/**
 * Returns the public path for a zero-based frame index (0..200) -> ezgif-frame-001.png..201.png
 */
export function getFrameUrl(index: number): string {
  const frameNumber = Math.max(1, Math.min(TOTAL_FRAMES, Math.floor(index) + 1));
  return `/frames/ezgif-frame-${String(frameNumber).padStart(3, "0")}.png`;
}

interface BathroomSequenceProps {
  /** Optional container reference to compute scroll progress against */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Optional callback fired when scroll progress updates (0 to 1) */
  onProgress?: (progress: number) => void;
  /** Optional custom CSS classes for canvas container */
  className?: string;
}

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export default function BathroomSequence({
  containerRef,
  onProgress,
  className = "",
}: BathroomSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const internalContainerRef = useRef<HTMLDivElement | null>(null);

  // Animation state refs (mutable, no React re-render per frame tick)
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const lastDrawnFrameRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const dimensionsRef = useRef<{ width: number; height: number; dpr: number }>({
    width: 0,
    height: 0,
    dpr: 1,
  });

  // Image cache and loading queue refs
  const imageCacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const loadingSetRef = useRef<Set<number>>(new Set());
  const activeLoadsCountRef = useRef<number>(0);
  const priorityQueueRef = useRef<number[]>([]);

  const onProgressRef = useRef(onProgress);
  useEffect(() => {
    onProgressRef.current = onProgress;
  }, [onProgress]);

  // State only for initial mount & fallback fade
  const [firstFrameRendered, setFirstFrameRendered] = useState(false);

  // Check prefers-reduced-motion safely
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  /**
   * Cover-fit rendering of a loaded image onto the canvas
   */
  const drawImageCover = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const { width: cssWidth, height: cssHeight, dpr } = dimensionsRef.current;
    if (cssWidth === 0 || cssHeight === 0) return;

    const naturalWidth = img.naturalWidth || 1920;
    const naturalHeight = img.naturalHeight || 1080;

    // Cover math
    const scale = Math.max(cssWidth / naturalWidth, cssHeight / naturalHeight);
    const drawWidth = naturalWidth * scale;
    const drawHeight = naturalHeight * scale;
    const offsetX = (cssWidth - drawWidth) / 2;
    const offsetY = (cssHeight - drawHeight) / 2;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    ctx.restore();
  }, []);

  /**
   * Find nearest available loaded frame in cache to guarantee no blank frames or flicker
   */
  const getNearestLoadedImage = useCallback((targetIndex: number): HTMLImageElement | null => {
    const cache = imageCacheRef.current;
    if (cache.has(targetIndex)) {
      return cache.get(targetIndex)!;
    }

    // Search outwards from targetIndex
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIndex - offset;
      if (prev >= 0 && cache.has(prev)) {
        return cache.get(prev)!;
      }
      const next = targetIndex + offset;
      if (next < TOTAL_FRAMES && cache.has(next)) {
        return cache.get(next)!;
      }
    }

    return null;
  }, []);

  const processQueueRef = useRef<() => void>(() => {});

  /**
   * Queue processor for background frame fetching with concurrency control
   */
  const processQueue = useCallback(() => {
    const MAX_CONCURRENT = 4;
    while (
      activeLoadsCountRef.current < MAX_CONCURRENT &&
      priorityQueueRef.current.length > 0
    ) {
      const index = priorityQueueRef.current.shift()!;
      if (
        imageCacheRef.current.has(index) ||
        loadingSetRef.current.has(index)
      ) {
        continue;
      }

      loadingSetRef.current.add(index);
      activeLoadsCountRef.current++;

      const img = new window.Image();
      img.src = getFrameUrl(index);

      const onDone = () => {
        loadingSetRef.current.delete(index);
        activeLoadsCountRef.current--;
        imageCacheRef.current.set(index, img);
        processQueueRef.current();
      };

      img.onload = () => {
        if (typeof img.decode === "function") {
          img.decode().then(onDone).catch(onDone);
        } else {
          onDone();
        }
      };
      img.onerror = () => {
        loadingSetRef.current.delete(index);
        activeLoadsCountRef.current--;
        processQueueRef.current();
      };
    }
  }, []);

  useEffect(() => {
    processQueueRef.current = processQueue;
  }, [processQueue]);

  /**
   * Request frames around the target position with highest priority
   */
  const prioritizeFrames = useCallback(
    (centerIndex: number) => {
      const needed: number[] = [];
      const cache = imageCacheRef.current;
      const loading = loadingSetRef.current;

      // 1. Immediate neighborhood (-2 to +8 frames around current scroll)
      for (let i = -2; i <= 8; i++) {
        const idx = centerIndex + i;
        if (idx >= 0 && idx < TOTAL_FRAMES && !cache.has(idx) && !loading.has(idx)) {
          needed.push(idx);
        }
      }

      // 2. Medium distance (-10 to +25 frames)
      for (let i = -10; i <= 25; i++) {
        const idx = centerIndex + i;
        if (
          idx >= 0 &&
          idx < TOTAL_FRAMES &&
          !cache.has(idx) &&
          !loading.has(idx) &&
          !needed.includes(idx)
        ) {
          needed.push(idx);
        }
      }

      // 3. Milestones across the entire sequence (every 10 frames)
      for (let idx = 0; idx < TOTAL_FRAMES; idx += 10) {
        if (!cache.has(idx) && !loading.has(idx) && !needed.includes(idx)) {
          needed.push(idx);
        }
      }

      // 4. Fill in remaining frames
      for (let idx = 0; idx < TOTAL_FRAMES; idx++) {
        if (!cache.has(idx) && !loading.has(idx) && !needed.includes(idx)) {
          needed.push(idx);
        }
      }

      priorityQueueRef.current = needed;
      processQueue();
    },
    [processQueue]
  );

  /**
   * Updates canvas backing dimensions to match viewport and devicePixelRatio
   */
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const cssWidth = canvas.clientWidth || window.innerWidth;
    const cssHeight = canvas.clientHeight || window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetWidth = Math.round(cssWidth * dpr);
    const targetHeight = Math.round(cssHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    dimensionsRef.current = { width: cssWidth, height: cssHeight, dpr };

    // Force redraw current frame
    const img = getNearestLoadedImage(Math.round(currentFrameRef.current));
    if (img) {
      drawImageCover(img);
    }
  }, [drawImageCover, getNearestLoadedImage]);

  /**
   * Calculate normalized scroll progress and target frame
   */
  const handleScroll = useCallback(() => {
    const container = containerRef?.current || internalContainerRef.current?.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const scrollableDistance = container.offsetHeight - window.innerHeight;

    let progress = 0;
    if (scrollableDistance > 0) {
      progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
    }

    const target = Math.round(progress * (TOTAL_FRAMES - 1));
    targetFrameRef.current = target;

    onProgressRef.current?.(progress);

    // Prioritize loading frames in this region
    prioritizeFrames(target);
  }, [containerRef, prioritizeFrames]);

  // Load and display Frame 001 immediately on mount
  useEffect(() => {
    updateCanvasDimensions();

    const firstImg = new window.Image();
    firstImg.src = FIRST_FRAME_SRC;

    const handleFirstLoaded = () => {
      imageCacheRef.current.set(0, firstImg);
      drawImageCover(firstImg);
      setFirstFrameRendered(true);
      lastDrawnFrameRef.current = 0;

      // Start preloading upcoming frames
      prioritizeFrames(0);
    };

    firstImg.onload = () => {
      if (typeof firstImg.decode === "function") {
        firstImg.decode().then(handleFirstLoaded).catch(handleFirstLoaded);
      } else {
        handleFirstLoaded();
      }
    };

    // Initial scroll position calculation
    handleScroll();
  }, [drawImageCover, handleScroll, prioritizeFrames, updateCanvasDimensions]);

  // Persistent Animation RAF loop with lerp interpolation
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      if (isVisibleRef.current) {
        const target = targetFrameRef.current;
        const current = currentFrameRef.current;
        const delta = target - current;

        if (reducedMotion) {
          // Snap directly if reduced motion is requested
          currentFrameRef.current = target;
        } else if (Math.abs(delta) > 0.005) {
          // Buttery smooth lerp (factor 0.1 for responsive yet cinematic feel)
          currentFrameRef.current += delta * 0.1;
        } else {
          currentFrameRef.current = target;
        }

        const displayIndex = Math.round(currentFrameRef.current);

        // Only redraw if the displayed frame index changed
        if (displayIndex !== lastDrawnFrameRef.current) {
          const imgToDraw = getNearestLoadedImage(displayIndex);
          if (imgToDraw) {
            drawImageCover(imgToDraw);
            lastDrawnFrameRef.current = displayIndex;
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [drawImageCover, getNearestLoadedImage, reducedMotion]);

  // Scroll and Resize Event Listeners
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateCanvasDimensions, { passive: true });

    // Handle tab visibility changes without erratic frame jumps
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden) {
        // Snap current to target when returning to tab
        currentFrameRef.current = targetFrameRef.current;
        handleScroll();
        updateCanvasDimensions();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateCanvasDimensions);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [handleScroll, updateCanvasDimensions]);

  return (
    <div
      ref={internalContainerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* 
        High-Performance Static Image Fallback:
        Instantly renders frame 001 while canvas initializes, fading out once canvas begins.
      */}
      <Image
        src={FIRST_FRAME_SRC}
        alt="Forma Bath Co. luxury bathroom remodeling sequence"
        fill
        priority
        sizes="100vw"
        className={`object-cover object-center transition-opacity duration-300 ${
          firstFrameRendered ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 
        Native HTML5 Canvas:
        Presents the 201-frame cinematic scroll transformation with devicePixelRatio scaling.
      */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
    </div>
  );
}

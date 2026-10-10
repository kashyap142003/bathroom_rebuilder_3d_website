"use client";

import React, { useRef, useState, useCallback } from "react";
import Link from "next/link";
import BathroomSequence from "./BathroomSequence";

interface PhaseData {
  step: string;
  tag: string;
  title: string;
  highlight: string;
  description: string;
  pills: string[];
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  stats?: { value: string; label1: string; label2: string }[];
}

const PHASES: PhaseData[] = [
  {
    step: "01",
    tag: "BESPOKE BATHROOM REMODELING",
    title: "Transform Your Bathroom",
    highlight: "Into A Space You Love",
    description:
      "Modern architectural design, master craftsmanship, and a seamless turnkey remodeling experience — from initial concept to turnkey completion.",
    pills: [
      "Bespoke 3D Architectural Design",
      "Curated Natural Stone & Millwork",
      "10-Year Craftsmanship Guarantee",
    ],
    ctaLabel: "GET A FREE ESTIMATE",
    ctaHref: "#estimate",
    secondaryCtaLabel: "WATCH TRANSFORMATION",
    secondaryCtaHref: "#work",
  },
  {
    step: "02",
    tag: "THE CRAFT · WATERPROOF PRECISION & MILLWORK",
    title: "Precision Engineering.",
    highlight: "Curated Living Luxury.",
    description:
      "Complete gut renovation with German Schluter® waterproof membranes, handcrafted fluted white oak vanities, and dimmable 2700K ambient halo mirrors — built to outlast decades.",
    pills: [
      "100% Watertight Shower Membranes",
      "Solid Fluted Oak & Soft-Close Blum Hardware",
      "Curbless Walk-in Showers & Linear Drains",
    ],
  },
  {
    step: "03",
    tag: "THE RESULT · DELIVERED IN 3 WEEKS",
    title: "Real Bathrooms.",
    highlight: "Flawless Transformations.",
    description:
      "Delivered on schedule and on budget with zero contractor delays. Over 150 homes elevated into serene, functional daily spa sanctuaries.",
    pills: [
      "Fixed-Price Proposal (No Hidden Fees)",
      "Dedicated On-Site Project Lead",
      "Immaculate Daily Site Protection",
    ],
    ctaLabel: "CLAIM YOUR FREE ESTIMATE",
    ctaHref: "#estimate",
    secondaryCtaLabel: "EXPLORE OUR WORK",
    secondaryCtaHref: "#work",
    stats: [
      { value: "150+", label1: "Bathrooms", label2: "Completed" },
      { value: "100%", label1: "Fixed-Price", label2: "Guarantee" },
      { value: "5.0 ★", label1: "Verified", label2: "Client Rating" },
    ],
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScrollProgress = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      if (href === "#estimate") {
        setTimeout(() => {
          const input = document.getElementById("form-name") as HTMLInputElement | null;
          input?.focus();
        }, 500);
      }
    }
  };

  const jumpToPhase = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const currentScrollY = window.scrollY;
    const containerTop = currentScrollY + rect.top;
    const scrollableDistance = container.offsetHeight - window.innerHeight;

    // Target positions for each of the 3 phases
    const targets = [0.06, 0.48, 0.92];
    const targetY = containerTop + targets[index] * scrollableDistance;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  /**
   * Continuous Opacity Curves for 3 Distinct Phases:
   * Phase 1: 0.00 -> 0.35 (fades out 0.24 -> 0.35)
   * Phase 2: 0.28 -> 0.72 (fades in 0.28 -> 0.38, fades out 0.62 -> 0.72)
   * Phase 3: 0.64 -> 1.00 (fades in 0.64 -> 0.74, stays active to 1.0)
   *
   * Smooth cross-fades ensure uninterrupted continuity and zero blank gap!
   */

  const p1Opacity =
    scrollProgress <= 0.24
      ? 1
      : scrollProgress >= 0.35
      ? 0
      : 1 - (scrollProgress - 0.24) / 0.11;

  const p2Opacity =
    scrollProgress < 0.28 || scrollProgress > 0.72
      ? 0
      : scrollProgress < 0.38
      ? (scrollProgress - 0.28) / 0.1
      : scrollProgress > 0.62
      ? 1 - (scrollProgress - 0.62) / 0.1
      : 1;

  const p3Opacity =
    scrollProgress < 0.64
      ? 0
      : scrollProgress < 0.74
      ? (scrollProgress - 0.64) / 0.1
      : 1;

  const opacities = [p1Opacity, p2Opacity, p3Opacity];

  // Active step index for tracker (0 to 2)
  const activeStep = scrollProgress < 0.32 ? 0 : scrollProgress < 0.68 ? 1 : 2;

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#151311]"
      aria-label="Forma Bath Co. Bathroom Remodeling Interactive Transformation"
    >
      {/* 
        Sticky Viewport Layer:
        Houses the canvas sequence, contrast gradients, 3-act narrative, and progress tracker.
      */}
      <div className="sticky top-0 left-0 w-full h-[100svh] overflow-hidden z-0 bg-[#151311]">
        {/* Canvas Sequence Layer (201 Frames) */}
        <BathroomSequence
          containerRef={containerRef}
          onProgress={handleScrollProgress}
        />

        {/* Contrast Overlays for text legibility */}
        <div
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/90 via-black/55 to-transparent w-full lg:w-[68%]"
          aria-hidden="true"
        />
        <div
          className="absolute top-0 left-0 right-0 h-36 pointer-events-none bg-gradient-to-b from-black/70 via-black/25 to-transparent"
          aria-hidden="true"
        />

        {/* Bottom Gradient Melt into Section 2 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 pointer-events-none bg-gradient-to-t from-[#151311] via-[#151311]/75 to-transparent z-10"
          aria-hidden="true"
        />

        {/* 
          Progress Indicator Timeline (Right Side on Desktop):
          3 Minimal Steps: 01. The Vision, 02. The Craft, 03. The Result
        */}
        <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-6 items-end select-none">
          <div className="flex flex-col items-end gap-1.5 text-right">
            <span className="text-[10px] tracking-[0.25em] font-medium text-[#D8B282] uppercase">
              TRANSFORMATION
            </span>
            <span className="text-xs font-mono text-stone-300">
              {String(activeStep + 1).padStart(2, "0")} / 03
            </span>
          </div>

          <div className="flex flex-col gap-3 items-end">
            {PHASES.map((phase, idx) => {
              const isActive = activeStep === idx;
              return (
                <button
                  key={phase.step}
                  type="button"
                  onClick={() => jumpToPhase(idx)}
                  className="group flex items-center gap-3 text-right focus:outline-none cursor-pointer"
                  aria-label={`Jump to transformation step ${phase.step}`}
                >
                  <span
                    className={`text-[11px] font-medium tracking-wider transition-all duration-300 uppercase ${
                      isActive
                        ? "text-[#D8B282] opacity-100 translate-x-0"
                        : "text-stone-400 opacity-60 group-hover:opacity-100 group-hover:text-stone-200"
                    }`}
                  >
                    {idx === 0
                      ? "The Vision"
                      : idx === 1
                      ? "The Craft"
                      : "The Result"}
                  </span>
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-2.5 h-7 bg-[#D8B282] shadow-sm shadow-[#D8B282]/50"
                        : "w-1.5 h-3 bg-white/25 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile Step Badge */}
        <div className="absolute top-24 right-5 z-30 md:hidden px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D8B282] animate-pulse" />
          <span className="text-[10px] tracking-widest text-stone-200 uppercase font-mono">
            STEP {String(activeStep + 1).padStart(2, "0")} / 03
          </span>
        </div>

        {/* 
          THREE CONTINUOUS NARRATIVE PHASES:
        */}
        {PHASES.map((phase, idx) => {
          const opacity = opacities[idx];
          const isInteractive = opacity > 0.15;

          return (
            <div
              key={phase.step}
              className="absolute inset-0 w-full h-full flex flex-col justify-between z-20"
              style={{
                opacity,
                transform: `translateY(${(1 - Math.min(1, opacity)) * (idx % 2 === 0 ? -16 : 16)}px)`,
                pointerEvents: isInteractive ? "auto" : "none",
                display: opacity <= 0.005 ? "none" : "flex",
              }}
            >
              {/* Main Content Area */}
              <div className="relative z-10 w-full flex-1 flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:pl-[7%] lg:pr-12 pt-28 pb-16 max-w-full">
                <div className="max-w-xl lg:max-w-2xl xl:max-w-[740px] flex flex-col gap-4 sm:gap-5">
                  {/* Category Eyebrow */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
                      {phase.tag}
                    </span>
                    <span
                      className="w-10 sm:w-14 h-[1.5px] bg-[#D8B282]/80 inline-block"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Main Headline */}
                  <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-normal leading-[1.08] tracking-tight text-[#FBF9F5]">
                    {phase.title}
                    <br />
                    <span className="text-[#D8B282]">{phase.highlight}</span>
                  </h1>

                  {/* Supporting Description */}
                  <p className="text-stone-300 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-[500px] font-light">
                    {phase.description}
                  </p>

                  {/* Quality Highlights / Feature Badges */}
                  <div className="flex flex-wrap gap-2 pt-1 max-w-lg">
                    {phase.pills.map((pill, pIdx) => (
                      <span
                        key={pIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs text-stone-200 font-light"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#D8B282]" />
                        <span>{pill}</span>
                      </span>
                    ))}
                  </div>

                  {/* Action CTAs */}
                  {phase.ctaLabel && (
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 pt-3 sm:pt-4">
                      <Link
                        href={phase.ctaHref || "#estimate"}
                        onClick={(e) => handleScrollTo(e, phase.ctaHref || "#estimate")}
                        className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-[#D8B282] hover:bg-[#C9A16E] text-[#1E1B18] text-xs sm:text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-[#D8B282]/30 hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer"
                      >
                        <span>{phase.ctaLabel}</span>
                        <span
                          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </Link>

                      {phase.secondaryCtaLabel && (
                        <Link
                          href={phase.secondaryCtaHref || "#work"}
                          onClick={(e) =>
                            handleScrollTo(e, phase.secondaryCtaHref || "#work")
                          }
                          className="group inline-flex items-center justify-center sm:justify-start gap-3 py-2 text-white/90 hover:text-white transition-colors cursor-pointer"
                        >
                          <span className="w-11 h-11 rounded-full border border-white/35 flex items-center justify-center bg-white/5 backdrop-blur-sm group-hover:border-[#D8B282] group-hover:bg-[#D8B282]/10 transition-all duration-300 shadow-sm">
                            <svg
                              className="w-4 h-4 text-white/90 group-hover:text-[#D8B282] ml-0.5 transition-colors"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                          <span className="text-xs sm:text-[13px] tracking-[0.16em] font-medium uppercase text-white/90 group-hover:text-white transition-colors">
                            {phase.secondaryCtaLabel}
                          </span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Information / Stats Bar */}
              <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:pl-[7%] pb-6 sm:pb-8 lg:pb-10">
                {phase.stats ? (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 lg:gap-10 max-w-3xl">
                    {phase.stats.map((stat, sIdx) => (
                      <React.Fragment key={sIdx}>
                        {sIdx > 0 && (
                          <div
                            className="hidden sm:block w-px h-8 bg-white/15 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <div className="flex items-center gap-3">
                          <span className="font-editorial text-3xl sm:text-4xl text-[#FBF9F5] font-normal tracking-tight">
                            {stat.value}
                          </span>
                          <div className="flex flex-col text-xs text-stone-300/80 font-light leading-tight">
                            <span>{stat.label1}</span>
                            <span>{stat.label2}</span>
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-4 text-xs text-stone-400 font-light">
                    <span className="text-[#D8B282]">✦</span>
                    <span>Scroll to explore the completed transformation</span>
                    <span className="hidden sm:inline text-stone-600">|</span>
                    <span className="hidden sm:inline text-stone-400">
                      Step {phase.step} of 03
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

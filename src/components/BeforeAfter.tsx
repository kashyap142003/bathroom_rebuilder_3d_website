"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface CuratedStyle {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  timeline: string;
  materials: string;
  scope: string;
}

const STYLES: CuratedStyle[] = [
  {
    id: "travertine",
    name: "Travertine Primary Suite",
    subtitle: "Modern Architectural Rebuild",
    image: "/frames/ezgif-frame-201.png",
    timeline: "3–4 Weeks",
    materials: "Honed Roman Travertine, Fluted White Oak, Champagne Bronze",
    scope: "Curbless walk-in shower, wall-hung fixtures, custom backlit halo mirror.",
  },
  {
    id: "japandi",
    name: "Japandi White Oak Bath",
    subtitle: "Organic Minimalism & Warmth",
    image: "/projects/project-japandi.jpg",
    timeline: "4–5 Weeks",
    materials: "Rift-Cut Oak Millwork, Vein-Cut Limestone, Warm Bronze",
    scope: "Double vanity with integrated storage, dual wall faucets, acoustic timber.",
  },
  {
    id: "marble",
    name: "Calacatta Marble Retreat",
    subtitle: "Sculptural Soaking Sanctuary",
    image: "/projects/project-marble.jpg",
    timeline: "5–6 Weeks",
    materials: "Bookmatched Calacatta Slabs, Brushed Brass, Ergonomic Resin",
    scope: "Freestanding soaking tub, floor-mounted filler, ambient cove lighting.",
  },
];

export default function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string>("travertine");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      updatePosition(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX);
  };

  const handleScrollToEstimate = (scope?: string) => {
    if (scope && typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-estimate-scope", {
          detail: {
            projectType:
              scope === "travertine"
                ? "Curbless Walk-In Shower Conversion"
                : scope === "japandi"
                ? "Full Master Bath Rebuild & Millwork"
                : "Architectural Luxury Spa Suite",
            budgetRange:
              scope === "travertine"
                ? "$26,000 – $44,000 (Full Master)"
                : scope === "japandi"
                ? "$26,000 – $44,000 (Full Master)"
                : "$45,000+ (Architectural Spa)",
          },
        })
      );
    }
    const target = document.querySelector("#estimate");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        const input = document.getElementById("form-name") as HTMLInputElement | null;
        input?.focus();
      }, 500);
    }
  };


  return (
    <section
      id="work"
      className="relative w-full py-24 sm:py-32 bg-[#151311] text-[#FBF9F5] scroll-mt-20 border-t border-white/5"
      aria-label="Our Work - Before and After Bathroom Transformations"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
                SELECTED WORK & COMPARISONS
              </span>
              <span className="w-10 h-px bg-[#D8B282]/60" aria-hidden="true" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              From Outdated to Extraordinary.
            </h2>
            <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              Drag the interactive slider below to inspect the spatial transformation. Every project
              is engineered for longevity and finished with custom architectural materials.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleScrollToEstimate("travertine")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8B282] hover:bg-[#C9A16E] text-[#1E1B18] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <span>DISCUSS YOUR SPACE</span>
            <span>→</span>
          </button>
        </div>

        {/* Interactive Before/After Slider Container */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 mb-12">
          <div
            ref={containerRef}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
            className="@container relative w-full h-[360px] sm:h-[480px] md:h-[580px] lg:h-[640px] cursor-ew-resize select-none overflow-hidden touch-none"
            role="region"
            aria-label="Interactive before and after comparison slider"
          >
            {/* AFTER Image (Background full layer) */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src="/frames/ezgif-frame-201.png"
                alt="Forma Bath Co. remodeled bathroom after luxury renovation"
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center pointer-events-none"
              />
              {/* After Label Badge */}
              <div className="absolute top-5 right-5 z-10 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-medium tracking-widest text-[#D8B282] uppercase pointer-events-none">
                AFTER RENOVATION
              </div>
            </div>

            {/* BEFORE Image (Clipped overlay layer) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="absolute inset-0 w-[100cqw] h-full">
                <Image
                  src="/frames/ezgif-frame-001.png"
                  alt="Original bathroom before remodeling"
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover object-center pointer-events-none"
                />
              </div>
              {/* Before Label Badge */}
              <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-medium tracking-widest text-stone-200 uppercase pointer-events-none">
                ORIGINAL BATHROOM
              </div>
            </div>

            {/* Draggable Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white z-20 pointer-events-none shadow-[0_0_12px_rgba(0,0,0,0.8)]"
              style={{ left: `${sliderPos}%` }}
            >
              <div
                onMouseDown={handleMouseDown}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#151311] border-2 border-[#D8B282] shadow-xl flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-105 active:scale-95 transition-transform"
                aria-label="Drag to compare before and after images"
                role="slider"
                aria-valuenow={Math.round(sliderPos)}
                aria-valuemin={0}
                aria-valuemax={100}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "ArrowLeft") setSliderPos((p) => Math.max(0, p - 5));
                  if (e.key === "ArrowRight") setSliderPos((p) => Math.min(100, p + 5));
                }}
              >
                <svg
                  className="w-5 h-5 text-[#D8B282]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 9l-3 3 3 3m8-6l3 3-3 3"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Slider Caption Bar */}
          <div className="p-5 sm:p-6 bg-[#1A1815] border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold tracking-wider text-[#D8B282] uppercase">
                Featured Live Transformation
              </span>
              <h3 className="font-editorial text-lg sm:text-xl text-white font-normal">
                Curbless Walk-In Travertine Suite & Custom Fluted Oak Vanity
              </h3>
            </div>
            <div className="text-xs text-stone-400 font-light flex items-center gap-3">
              <span>Timeline: 3.5 Weeks</span>
              <span>•</span>
              <span>Fixed Price Guarantee</span>
            </div>
          </div>
        </div>

        {/* 
          Curated Architectural Styles Grid:
          Replaces long bloated galleries with 3 clean, direct aesthetic choices.
        */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-[11px] font-semibold tracking-wider text-[#D8B282] uppercase">
                SIGNATURE DESIGN AESTHETICS
              </span>
              <h3 className="font-editorial text-2xl text-white font-normal mt-1">
                Explore Alternative Remodeling Styles
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-light hidden sm:inline">
              Select a style to preview scope & materials
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STYLES.map((style) => {
              const isSelected = selectedStyle === style.id;
              return (
                <div
                  key={style.id}
                  onClick={() => setSelectedStyle(style.id)}
                  className={`group rounded-2xl overflow-hidden bg-[#1A1815] border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "border-[#D8B282] ring-1 ring-[#D8B282]/40 shadow-xl shadow-black/40"
                      : "border-white/10 hover:border-white/25 hover:bg-[#1E1B18]"
                  }`}
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={style.image}
                      alt={style.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                      <span className="text-xs font-medium text-white tracking-wide">
                        {style.timeline} Build
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded-full bg-[#D8B282] text-[#1E1B18] text-[10px] font-bold uppercase tracking-wider">
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-editorial text-xl text-white font-normal mb-1">
                        {style.name}
                      </h4>
                      <p className="text-xs text-[#D8B282] font-light mb-3">
                        {style.subtitle}
                      </p>
                      <p className="text-xs text-stone-300 font-light leading-relaxed mb-4">
                        {style.scope}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 text-[11px] text-stone-400 font-light">
                      <span className="text-stone-300 font-medium">Materials: </span>
                      {style.materials}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStyle(style.id);
                        handleScrollToEstimate(style.id);
                      }}
                      className={`mt-4 w-full py-2.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "bg-[#D8B282] hover:bg-[#C9A16E] text-[#1E1B18]"
                          : "bg-white/5 hover:bg-white/15 text-stone-200"
                      }`}
                    >
                      <span>PLAN THIS DESIGN</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

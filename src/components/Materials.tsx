"use client";

import React, { useState } from "react";
import Image from "next/image";

interface MaterialCategory {
  id: string;
  name: string;
  headline: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
}

const CATEGORIES: MaterialCategory[] = [
  {
    id: "stone-tile",
    name: "Natural Stone & Tile",
    headline: "Honed Roman Travertine & Slabs",
    description:
      "We source cross-cut and vein-cut travertine, limestone, and porcelain slabs that offer natural slip resistance, subtle tactile veining, and enduring thermal mass for heated floors.",
    image: "/frames/ezgif-frame-201.png",
    specs: [
      { label: "Origin & Finish", value: "Honed matte, filled or porous tactile texture" },
      { label: "Moisture Rating", value: "Class 1 impervious with sub-surface sealing" },
      { label: "Installation", value: "Zero-lippage leveling with Schluter waterproofing" },
    ],
  },
  {
    id: "vanity-millwork",
    name: "Cabinetry & Millwork",
    headline: "Rift-Sawn White Oak & Fluted Panels",
    description:
      "Custom architectural cabinetry hand-finished with polyurethane moisture shields. Solid dovetail drawers, soft-close Blum runners, and integrated wire channels keep vanity counters uncluttered.",
    image: "/projects/project-japandi.jpg",
    specs: [
      { label: "Core Construction", value: "Marine-grade birch ply with solid oak veneers" },
      { label: "Hardware", value: "Concealed full-extension soft-close Blumotion" },
      { label: "Countertops", value: "Mitered quartz and natural stone with undermount sinks" },
    ],
  },
  {
    id: "fixtures-hardware",
    name: "Fixtures & Hardware",
    headline: "Brushed Champagne Bronze & Brass",
    description:
      "Architectural plumbing fixtures engineered with solid brass waterways, ceramic disc cartridges, and PVD finishes that resist water spots, oxidation, and tarnishing over decades.",
    image: "/projects/project-spa.jpg",
    specs: [
      { label: "Valve Engineering", value: "Thermostatic dual-function with volume controls" },
      { label: "Finish Quality", value: "PVD bonded coating for lifetime tarnish resistance" },
      { label: "Flow Rate", value: "WaterSense compliant pressure-balanced rainfall" },
    ],
  },
  {
    id: "frameless-glass",
    name: "Architectural Glass",
    headline: "Ultra-Clear Starphire & Low-Iron Glass",
    description:
      "Unlike standard green-tinted float glass, our 3/8\" and 1/2\" low-iron glass provides true color transmission. Coated with factory-baked hydrophobic glass protection for effortless maintenance.",
    image: "/projects/project-marble.jpg",
    specs: [
      { label: "Thickness", value: "10mm (3/8\") to 12mm (1/2\") tempered safety glass" },
      { label: "Clarity", value: "Starphire low-iron with ultra-pure optical transmission" },
      { label: "Coating", value: "Permanently bonded hydrophobic anti-lime treatment" },
    ],
  },
];

export default function Materials() {
  const [activeTab, setActiveTab] = useState(0);
  const activeCategory = CATEGORIES[activeTab];

  return (
    <section
      className="relative w-full py-28 sm:py-36 bg-[#181613] text-[#FBF9F5] border-t border-white/5"
      aria-label="Materials and Architectural Details"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
              CRAFT & INTEGRITY
            </span>
            <span className="w-10 h-px bg-[#D8B282]/60" aria-hidden="true" />
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
            The Details Make the Difference.
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
            We partner with premier quarries, sawmills, and fixture artisans to curate
            surfaces that balance tactile luxury with enduring performance in humid environments.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 pb-2 border-b border-white/10">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all ${
                activeTab === idx
                  ? "bg-[#D8B282] text-[#1E1B18] shadow-md shadow-black/30 font-semibold"
                  : "bg-white/5 text-stone-300 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Material Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-2xl bg-[#1D1A17] border border-white/10 p-6 sm:p-10 shadow-2xl">
          {/* Image Showcase */}
          <div className="lg:col-span-6 relative aspect-[16/11] rounded-xl overflow-hidden border border-white/10 shadow-xl bg-black/40">
            <Image
              src={activeCategory.image}
              alt={activeCategory.headline}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-md bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-medium tracking-wider text-[#D8B282] uppercase">
              {activeCategory.name}
            </div>
          </div>

          {/* Specifications & Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-widest text-[#D8B282] uppercase block mb-1">
                MATERIAL ARCHITECTURE
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal">
                {activeCategory.headline}
              </h3>
              <p className="mt-3 text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                {activeCategory.description}
              </p>
            </div>

            {/* Technical Specs List */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              {activeCategory.specs.map((spec, sIdx) => (
                <div
                  key={sIdx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3 rounded-lg bg-white/5 border border-white/5 text-xs"
                >
                  <span className="text-stone-400 font-medium">{spec.label}</span>
                  <span className="text-stone-200 font-light">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <span className="text-xs text-stone-400 italic">
                * Samples available for hands-on review during your in-home design consultation.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

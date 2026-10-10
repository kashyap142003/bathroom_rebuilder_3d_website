"use client";

import React from "react";
import Link from "next/link";

const PROCESS_STEPS = [
  {
    step: "01",
    title: "In-Home Design & 3D Scan",
    timeline: "Week 01",
    desc: "We visit your home to laser-measure the space, understand your morning routines, and present photo-realistic 3D architectural renders with hand-selected material swatches.",
  },
  {
    step: "02",
    title: "Guaranteed Fixed-Price Quote",
    timeline: "Pre-Build",
    desc: "No ballpark guesses and zero mid-project surprise change orders. You receive an itemized, binding fixed-price contract with defined start and completion dates.",
  },
  {
    step: "03",
    title: "White-Glove Construction",
    timeline: "Weeks 02–04",
    desc: "Our licensed in-house team sets up negative-air dust barriers, protects your floors, and provides daily digital photo updates. Delivered spotless, inspected, and warranted.",
  },
];

const PACKAGES = [
  {
    name: "Guest Bath Refresh",
    range: "$14,000 – $22,000",
    timeline: "2–3 Weeks",
    highlights: [
      "Custom single vanity & stone top",
      "Frameless glass tub/shower surround",
      "Designer plumbing fixtures",
      "Updated tile & waterproof backer",
    ],
  },
  {
    name: "Full Master Remodel",
    featured: true,
    range: "$26,000 – $44,000",
    timeline: "3–4 Weeks",
    highlights: [
      "Curbless walk-in rainfall shower",
      "Custom fluted white oak vanity",
      "Integrated backlit halo mirror",
      "Schluter® waterproof warranty",
      "Electric radiant heated flooring",
    ],
  },
  {
    name: "Architectural Spa Suite",
    range: "$45,000+",
    timeline: "4–6 Weeks",
    highlights: [
      "Complete spatial reconfiguration",
      "Freestanding sculptural soaking tub",
      "Bookmatched marble or travertine slabs",
      "Circadian cove & niche lighting",
      "Custom dual-basin double vanity",
    ],
  },
];

export default function ServicesProcess() {
  return (
    <section
      id="process"
      className="relative w-full py-24 sm:py-32 bg-[#151311] text-[#FBF9F5] border-t border-white/5 scroll-mt-20"
      aria-label="Our Process and Investment Guidelines"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-24">
        {/* Step 1: The 3-Step Process */}
        <div>
          <div className="max-w-2xl mb-12 sm:mb-16">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
                THE REMODELING EXPERIENCE
              </span>
              <span className="w-10 h-px bg-[#D8B282]/60" aria-hidden="true" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              A Transparent, Stress-Free Process.
            </h2>
            <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              We eliminated contractor headaches with a proven 3-phase delivery model designed to
              protect your home, your time, and your budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-8 rounded-2xl bg-[#1A1815] border border-white/10 hover:border-[#D8B282]/40 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-editorial text-3xl text-[#D8B282] font-normal">
                      {step.step}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-stone-300">
                      {step.timeline}
                    </span>
                  </div>
                  <h3 className="font-editorial text-xl sm:text-2xl text-white font-normal mb-3">
                    {step.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#D8B282]">
                  <span>✦</span>
                  <span>Dedicated Project Manager</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step 2: Clear Investment Guidelines */}
        <div id="services" className="scroll-mt-24 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
                  INVESTMENT GUIDELINES
                </span>
                <span className="w-10 h-px bg-[#D8B282]/60" aria-hidden="true" />
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl text-white font-normal leading-tight">
                Honest, Upfront Pricing.
              </h2>
              <p className="mt-3 text-stone-300 text-sm leading-relaxed font-light">
                Every bathroom is custom-tailored, but transparency matters. Here are realistic
                investment brackets based on recent architectural remodels.
              </p>
            </div>

            <Link
              href="#estimate"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8B282] hover:bg-[#C9A16E] text-[#1E1B18] text-xs font-semibold tracking-wider uppercase transition-all shadow-md hover:-translate-y-0.5 shrink-0 self-start md:self-auto"
            >
              <span>GET AN EXACT QUOTE</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                  pkg.featured
                    ? "bg-[#201D19] border-2 border-[#D8B282] shadow-2xl relative"
                    : "bg-[#1A1815] border border-white/10"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D8B282] text-[#1E1B18] text-[10px] font-bold uppercase tracking-wider shadow-md">
                    MOST POPULAR
                  </span>
                )}

                <div>
                  <h3 className="font-editorial text-2xl text-white font-normal mb-1">
                    {pkg.name}
                  </h3>
                  <div className="font-editorial text-3xl text-[#D8B282] font-normal my-3">
                    {pkg.range}
                  </div>
                  <p className="text-xs text-stone-400 font-light mb-6">
                    Typical timeline: <span className="text-stone-200">{pkg.timeline}</span>
                  </p>

                  <div className="space-y-2.5 pt-4 border-t border-white/10">
                    {pkg.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-stone-300 font-light">
                        <span className="text-[#D8B282] shrink-0">✓</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        const projectType =
                          pkg.name === "Guest Bath Refresh"
                            ? "Guest Bath Complete Refresh"
                            : pkg.name === "Full Master Remodel"
                            ? "Full Master Bath Rebuild & Millwork"
                            : "Architectural Luxury Spa Suite";
                        const budgetRange =
                          pkg.name === "Guest Bath Refresh"
                            ? "$14,000 – $22,000 (Guest Refresh)"
                            : pkg.name === "Full Master Remodel"
                            ? "$26,000 – $44,000 (Full Master)"
                            : "$45,000+ (Architectural Spa)";

                        window.dispatchEvent(
                          new CustomEvent("select-estimate-scope", {
                            detail: { projectType, budgetRange },
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
                    }}
                    className={`w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 text-center cursor-pointer ${
                      pkg.featured
                        ? "bg-[#D8B282] hover:bg-[#C9A16E] text-[#1E1B18]"
                        : "bg-white/10 hover:bg-white/20 text-white"
                    }`}
                  >
                    <span>SELECT THIS SCOPE</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

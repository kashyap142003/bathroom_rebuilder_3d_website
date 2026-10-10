"use client";

import React from "react";
import Link from "next/link";

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Consultation",
    subtitle: "Discovery & Space Assessment",
    description:
      "We begin with an in-depth conversation in your home to understand your morning routines, design vision, must-have features, and investment goals.",
    deliverables: [
      "On-site spatial measurement",
      "Style and layout discussion",
      "Initial feasibility review",
    ],
  },
  {
    number: "02",
    title: "Planning & Estimate",
    subtitle: "Schematics & Transparent Budget",
    description:
      "Our design team develops tailored 3D layouts, presents curated tile and finish samples, and provides a clear, itemized proposal with guaranteed scope.",
    deliverables: [
      "Detailed 3D layout renderings",
      "Material and fixture schedule",
      "Transparent cost breakdown",
    ],
  },
  {
    number: "03",
    title: "Remodeling",
    subtitle: "White-Glove Construction",
    description:
      "Our craftsmen execute demolition, plumbing, electrical, tile setting, and millwork. We install protective barriers and send daily progress updates.",
    deliverables: [
      "Clean site containment & air scrubbers",
      "Dedicated lead carpenter on site",
      "Daily digital progress log with photos",
    ],
  },
  {
    number: "04",
    title: "Final Walkthrough",
    subtitle: "Detail Review & Handover",
    description:
      "Together, we inspect every corner, fixture, and surface against our perfection checklist, ensuring your finished bathroom exceeds expectations.",
    deliverables: [
      "Comprehensive punch-list sign-off",
      "Care instructions for natural surfaces",
      "Workmanship warranty package",
    ],
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative w-full py-28 sm:py-36 bg-[#151311] text-[#FBF9F5] border-t border-white/5 scroll-mt-20"
      aria-label="Our Remodeling Process"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-24">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
              OUR PROCESS
            </span>
            <span className="w-10 h-px bg-[#D8B282]/60" aria-hidden="true" />
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
            A Better Renovation Starts Here.
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
            A structured, transparent four-stage journey from initial vision to your
            finished architectural sanctuary. No surprises, no guesswork.
          </p>
        </div>

        {/* Timeline Grid (Horizontal Desktop, Vertical Mobile) */}
        <div className="relative">
          {/* Desktop Connecting Line */}
          <div
            className="hidden lg:block absolute top-[52px] left-[5%] right-[5%] h-px bg-gradient-to-r from-[#D8B282]/20 via-[#D8B282] to-[#D8B282]/20 z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {STEPS.map((step, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#1B1916] border border-white/10 hover:border-[#D8B282]/40 transition-all duration-300 shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Circle */}
                  <div className="w-12 h-12 rounded-full bg-[#151311] border-2 border-[#D8B282] flex items-center justify-center text-sm font-semibold tracking-wider text-[#D8B282] mb-6 shadow-md shadow-black/50">
                    {step.number}
                  </div>

                  <span className="text-[11px] font-semibold tracking-wider text-stone-400 uppercase block mb-1">
                    {step.subtitle}
                  </span>
                  <h3 className="font-editorial text-2xl text-white mb-3 font-normal">
                    {step.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Key Deliverables */}
                <div className="pt-4 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] font-semibold tracking-widest text-[#D8B282] uppercase block">
                    What to Expect:
                  </span>
                  <ul className="space-y-1 text-xs text-stone-400 font-light">
                    {step.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-1.5">
                        <span className="text-[#D8B282]">•</span>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 sm:mt-20 p-8 rounded-2xl bg-[#1D1A17] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-editorial text-xl sm:text-2xl text-white font-normal">
              Ready to take the first step?
            </h4>
            <p className="text-stone-300 text-xs sm:text-sm font-light mt-1">
              Schedule your complimentary in-home design consultation today.
            </p>
          </div>

          <Link
            href="#estimate"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D8B282] hover:bg-[#C9A16E] text-[#1E1B18] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5 shrink-0"
          >
            <span>SCHEDULE CONSULTATION</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

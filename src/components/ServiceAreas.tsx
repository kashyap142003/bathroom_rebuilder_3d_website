"use client";

import React from "react";
import Link from "next/link";

const LOCATIONS = [
  {
    name: "Central Metro & Downtown",
    desc: "Luxury condominiums, historic brownstones, and urban penthouses.",
  },
  {
    name: "Westwood & Highland Hills",
    desc: "Sprawling master bath suites, spa retreats, and custom additions.",
  },
  {
    name: "Riverfront & Lakeside",
    desc: "Curbless walk-in showers, nature-inspired limestone and oak.",
  },
  {
    name: "Historic Heritage District",
    desc: "Period-sensitive renovations respecting architectural character.",
  },
  {
    name: "Eastside & Garden Suburbs",
    desc: "Full family bath overhauls and accessible aging-in-place updates.",
  },
  {
    name: "North Ridge Estates",
    desc: "Expansive primary retreats with freestanding soakers and dual vanities.",
  },
];

export default function ServiceAreas() {
  return (
    <section
      className="relative w-full py-28 sm:py-36 bg-[#181613] text-[#FBF9F5] border-t border-white/5"
      aria-label="Service Areas Covered by Forma Bath Co."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
                LOCAL COVERAGE
              </span>
              <span className="w-10 h-px bg-[#D8B282]/60" aria-hidden="true" />
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              Proudly Serving Your Community.
            </h2>
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
              We provide dedicated, white-glove bathroom remodeling across the greater
              metropolitan region and surrounding residential enclaves. Not sure if your home
              falls within our active service radius? Reach out to confirm availability.
            </p>

            <div className="pt-2">
              <Link
                href="#estimate"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#D8B282] hover:bg-[#C9A16E] text-[#1E1B18] text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:-translate-y-0.5"
              >
                <span>CHECK YOUR LOCATION</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Service Locations Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {LOCATIONS.map((loc, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-[#1D1A17] border border-white/10 hover:border-[#D8B282]/40 transition-colors"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="w-2 h-2 rounded-full bg-[#D8B282]" aria-hidden="true" />
                  <h3 className="font-editorial text-lg sm:text-xl text-white font-medium">
                    {loc.name}
                  </h3>
                </div>
                <p className="text-xs text-stone-400 font-light leading-relaxed pl-4.5">
                  {loc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

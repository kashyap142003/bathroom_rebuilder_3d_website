"use client";

import React from "react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  includes: string[];
  icon: React.ReactNode;
}

const SERVICES: ServiceItem[] = [
  {
    id: "full-remodel",
    title: "Complete Bathroom Remodeling",
    description:
      "Full-scope architectural transformations. We reconfigure layouts, replace outdated plumbing and electrical, install premium tile, and deliver turnkey private retreats.",
    includes: [
      "Spatial layout and 3D architectural planning",
      "Full demolition, rough-in plumbing, and updated wiring",
      "Custom tile, vanity, lighting, and fixture installation",
      "Dedicated project superintendent and daily progress updates",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    id: "walk-in-shower",
    title: "Walk-In Shower Installation",
    description:
      "Transform cramped tubs or outdated enclosures into curbless, frameless glass walk-in showers featuring linear drains, built-in shampoo niches, and thermostatic rain heads.",
    includes: [
      "Curbless zero-threshold entry waterproofing",
      "Starphire ultra-clear frameless tempered glass",
      "Dual showerheads, handheld wands, and body sprays",
      "Integrated recessed shelving with warm LED cove lighting",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
  {
    id: "tub-replacement",
    title: "Bathtub Replacement & Soakers",
    description:
      "Elevate your bathroom with sculptural freestanding soakers, deep cast resin vessels, or functional alcove replacements crafted from enduring, heat-retaining materials.",
    includes: [
      "Sculptural solid surface composite bathtubs",
      "Floor-mounted freestanding brass tub fillers",
      "Alcove tub-to-shower conversion options",
      "Reinforced subfloor engineering and insulation",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
      </svg>
    ),
  },
  {
    id: "vanity-storage",
    title: "Vanity & Storage Upgrades",
    description:
      "Custom floating and furniture-grade vanities tailored to your spatial layout. Featuring solid oak joinery, quartz and marble countertops, soft-close hardware, and hidden power outlets.",
    includes: [
      "Custom rift-sawn white oak and walnut cabinetry",
      "Seamless undermount and vessel sink integrations",
      "Recessed architectural medicine cabinets with defoggers",
      "Appliance drawer organizers with integrated outlets",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16M10 9h4M10 15h4" />
      </svg>
    ),
  },
  {
    id: "tile-flooring",
    title: "Tile & Flooring Installation",
    description:
      "Precision stonework that defines the room. From large-format Roman travertine slabs to intricate herringbone mosaics, backed by Schluter uncoupling membranes and radiant floor heating.",
    includes: [
      "Large-format porcelain, marble, and honed travertine",
      "Schluter-DITRA-HEAT in-floor radiant electric warming",
      "Zero-lip tile leveling and high-grade epoxy grouts",
      "Custom mitered niche corners and shower curbs",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
        />
      </svg>
    ),
  },
  {
    id: "accessible-improvements",
    title: "Accessible Bathroom Improvements",
    description:
      "Universal design that enhances independence without sacrificing luxury. Thoughtful zero-threshold entries, integrated teak shower benches, architectural grab bars, and comfort-height fixtures.",
    includes: [
      "Curbless barrier-free shower transitions",
      "Architectural grab bars matching fixture finishes",
      "Floating teak or solid quartz fold-down benches",
      "Thermostatic scald protection and handheld wands",
    ],
    icon: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative w-full py-28 sm:py-36 bg-[#151311] text-[#FBF9F5] border-t border-white/5 scroll-mt-20"
      aria-label="Bathroom Remodeling Services"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
              OUR EXPERTISE
            </span>
            <span className="w-10 h-px bg-[#D8B282]/60" aria-hidden="true" />
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
            Everything Your Bathroom Needs.
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
            From comprehensive master suite transformations to custom shower conversions,
            our team executes every project with architectural precision and uncompromising
            attention to detail.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group p-8 rounded-2xl bg-[#1B1916] border border-white/10 hover:border-[#D8B282]/40 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D8B282] group-hover:bg-[#D8B282]/10 transition-colors mb-6">
                  {service.icon}
                </div>

                <h3 className="font-editorial text-2xl text-white group-hover:text-[#D8B282] transition-colors mb-3">
                  {service.title}
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Key Inclusions */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <span className="text-[11px] font-semibold tracking-wider text-[#D8B282] uppercase block">
                    What&apos;s Included:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-400 font-light">
                    {service.includes.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#D8B282] shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-8 pt-4 border-t border-white/10">
                <Link
                  href="#estimate"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-white group-hover:text-[#D8B282] uppercase transition-colors"
                >
                  <span>INQUIRE ABOUT THIS SERVICE</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

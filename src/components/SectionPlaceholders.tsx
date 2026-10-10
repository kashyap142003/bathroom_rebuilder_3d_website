"use client";

import React from "react";

export default function SectionPlaceholders() {
  const sections = [
    {
      id: "work",
      title: "Our Work & Transformations",
      subtitle: "Scroll-Driven Interactive Transformation Sequence Coming Soon",
      description:
        "Explore before-and-after bathroom remodels crafted with architectural precision and high-end materials.",
    },
    {
      id: "services",
      title: "Services",
      subtitle: "Full-Scope Remodeling & Custom Fabrication",
      description:
        "From luxury walk-in showers and bespoke vanities to full master bath reconfigurations.",
    },
    {
      id: "process",
      title: "Our Process",
      subtitle: "Seamless Concept to Completion",
      description:
        "Design consultation, architectural planning, 3D visualization, and white-glove construction.",
    },
    {
      id: "reviews",
      title: "Client Reviews",
      subtitle: "Trusted by Discerning Homeowners",
      description:
        "Hear from clients who elevated their homes with Forma Bath Co.'s design and craft.",
    },
    {
      id: "faq",
      title: "Frequently Asked Questions",
      subtitle: "Everything You Need to Know",
      description:
        "Timelines, material selections, permits, and how our complimentary estimate process works.",
    },
    {
      id: "estimate",
      title: "Request a Free Estimate",
      subtitle: "Begin Your Bathroom Transformation",
      description:
        "Speak directly with our design leads to schedule an in-home assessment and receive a tailored proposal.",
    },
  ];

  return (
    <div className="w-full bg-[#151311] border-t border-white/10 text-stone-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 space-y-24">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-24 pt-8 border-t border-white/5 first:border-none"
            aria-label={section.title}
          >
            <div className="max-w-2xl">
              <span className="text-[11px] font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
                {section.subtitle}
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl text-white mt-2 font-normal">
                {section.title}
              </h2>
              <p className="text-stone-400 text-sm mt-2 leading-relaxed">
                {section.description}
              </p>
            </div>
          </section>
        ))}
      </div>

      {/* Footer minimal info */}
      <footer className="border-t border-white/10 py-10 px-6 sm:px-10 text-center text-xs text-stone-500">
        <p className="tracking-widest uppercase font-medium text-stone-400">
          FORMA BATH CO. — LUXURY ARCHITECTURAL BATHROOM REMODELING
        </p>
        <p className="mt-2 text-stone-600">
          © 2026 Forma Bath Co. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

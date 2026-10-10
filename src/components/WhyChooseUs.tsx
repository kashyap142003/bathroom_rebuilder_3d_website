"use client";

import React from "react";
import Image from "next/image";

interface Benefit {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const BENEFITS: Benefit[] = [
  {
    title: "Thoughtful Architectural Planning",
    description:
      "We design bathrooms around real daily movement and practical storage, drafting detailed drawings before construction ever begins.",
    icon: (
      <svg
        className="w-6 h-6 text-[#D8B282]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    title: "Proactive Communication",
    description:
      "You receive clear milestones, dedicated contact points, and regular photo updates so you always know what is happening next.",
    icon: (
      <svg
        className="w-6 h-6 text-[#D8B282]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
  {
    title: "Curated Material Selection",
    description:
      "We help you navigate choices in stone, cabinetry, tile, and plumbing fixtures that withstand humidity, daily wear, and changing trends.",
    icon: (
      <svg
        className="w-6 h-6 text-[#D8B282]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    title: "Organized Project Coordination",
    description:
      "Disciplined trade sequencing ensures plumbers, electricians, and tile artisans arrive in correct order to keep timelines predictable.",
    icon: (
      <svg
        className="w-6 h-6 text-[#D8B282]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Meticulous Finishing Details",
    description:
      "From flush mitered tile corners to laser-leveled vanity cabinets and clean silicone lines, the difference is in the craft.",
    icon: (
      <svg
        className="w-6 h-6 text-[#D8B282]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
    ),
  },
  {
    title: "Clean & Respectful Worksite",
    description:
      "We protect your living areas with dust barrier zippers, floor runners, and active air scrubbers, concluding each day with a broom-clean space.",
    icon: (
      <svg
        className="w-6 h-6 text-[#D8B282]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
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
];

export default function WhyChooseUs() {
  return (
    <section
      className="relative w-full py-28 sm:py-36 bg-[#181613] text-[#FBF9F5] border-t border-white/5"
      aria-label="Why Choose Forma Bath Co."
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Visual Image */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
                  THE FORMA DIFFERENCE
                </span>
                <span className="w-10 h-px bg-[#D8B282]/60" aria-hidden="true" />
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                Quality You Can See.
                <br />
                Care You Can Feel.
              </h2>
              <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                We believe a bathroom renovation should be as stress-free as it is
                transformative. By maintaining focused scheduling and disciplined craftsmanship,
                we treat your home with the dignity it deserves.
              </p>
            </div>

            {/* Architectural Detail Image */}
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/projects/project-japandi.jpg"
                alt="Forma Bath Co. architectural craftsmanship and fluted wood detail"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 text-xs text-stone-300">
                <strong className="text-white block font-medium">Bespoke Millwork & Stone</strong>
                Curated natural materials selected for longevity in moisture environments.
              </div>
            </div>
          </div>

          {/* Right Column: 6 Benefits Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {BENEFITS.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#1D1A17] border border-white/10 hover:border-[#D8B282]/40 transition-all duration-300 shadow-md hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-editorial text-xl text-white mb-2 font-medium">
                  {benefit.title}
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

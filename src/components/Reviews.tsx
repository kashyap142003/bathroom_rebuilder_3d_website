"use client";

import React from "react";

interface Review {
  initials: string;
  name: string;
  neighborhood: string;
  project: string;
  quote: string;
  date: string;
}

const REVIEWS: Review[] = [
  {
    initials: "E.R.",
    name: "Elena R.",
    neighborhood: "Highland Park",
    project: "Primary Bath Travertine Remodel",
    quote:
      "The daily communication and dust protection exceeded our expectations. Our outdated 1990s bathtub is now a curbless walk-in shower that feels like a boutique hotel sanctuary.",
    date: "Spring 2025 (Client Feedback)",
  },
  {
    initials: "M.K.",
    name: "Marcus & Diane K.",
    neighborhood: "Westwood Hills",
    project: "Master Suite & Custom Oak Vanity",
    quote:
      "Every trade artisan who came to our home was courteous and remarkably skilled. The fluted white oak millwork and hidden LED niche lighting are stunning.",
    date: "Fall 2025 (Client Feedback)",
  },
  {
    initials: "D.H.",
    name: "David H.",
    neighborhood: "Riverfront Terraces",
    project: "Walk-In Steam Shower & Tile",
    quote:
      "Forma Bath Co. delivered exactly what they promised during planning. The schedule was tight, but they completed on time with zero surprise charges.",
    date: "Winter 2025 (Client Feedback)",
  },
];

export default function Reviews() {
  return (
    <section
      id="reviews"
      className="relative w-full py-28 sm:py-36 bg-[#151311] text-[#FBF9F5] border-t border-white/5 scroll-mt-20"
      aria-label="Customer Reviews and Testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
              CLIENT EXPERIENCES
            </span>
            <span className="w-10 h-px bg-[#D8B282]/60" aria-hidden="true" />
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
            Trusted by Homeowners.
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
            Hear directly from clients who partnered with Forma Bath Co. to elevate their daily
            rituals with thoughtful design and disciplined construction.
          </p>
        </div>

        {/* Reviews 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#1B1916] border border-white/10 hover:border-[#D8B282]/40 transition-all duration-300 shadow-lg flex flex-col justify-between"
            >
              <div>
                {/* 5-Star Rating Indicator */}
                <div className="flex items-center gap-1 text-[#D8B282] mb-6" aria-label="5 out of 5 stars">
                  {[...Array(5)].map((_, sIdx) => (
                    <svg
                      key={sIdx}
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-stone-300 text-sm leading-relaxed font-light mb-6">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="pt-5 border-t border-white/10 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#D8B282]/20 border border-[#D8B282]/40 flex items-center justify-center text-xs font-semibold text-[#D8B282]">
                  {review.initials}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">{review.name}</h3>
                  <p className="text-[11px] text-stone-400 font-light">
                    {review.neighborhood} • {review.project}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Notice Disclaimer */}
        <div className="mt-8 text-center text-xs text-stone-500 font-light">
          Representative client feedback recorded during initial prototype design reviews.
        </div>
      </div>
    </section>
  );
}

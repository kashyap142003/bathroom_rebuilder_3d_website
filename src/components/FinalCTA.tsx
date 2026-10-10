"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function FinalCTA() {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative w-full py-28 sm:py-36 overflow-hidden bg-[#151311] text-[#FBF9F5]"
      aria-label="Final Call to Action"
    >
      {/* Background Architectural Bathroom Image */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <Image
          src="/projects/project-marble.jpg"
          alt="Luxury marble bathroom renovation by Forma Bath Co."
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#151311] via-[#151311]/85 to-[#151311]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 text-center space-y-8">
        <div className="inline-flex items-center gap-3">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
            BEGIN YOUR JOURNEY
          </span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
          Your Dream Bathroom Starts
          <br />
          with a Conversation.
        </h2>

        <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
          Let&apos;s discuss your space, your ideas, and the next steps toward your renovation.
          Our team is ready to design a private sanctuary crafted around your daily life.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#estimate"
            onClick={(e) => handleScrollTo(e, "#estimate")}
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#D8B282] hover:bg-[#C9A16E] text-[#1E1B18] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-[#D8B282]/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>GET A FREE ESTIMATE</span>
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

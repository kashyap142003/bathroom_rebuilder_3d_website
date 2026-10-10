"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [modalContent, setModalContent] = useState<{ title: string; content: string } | null>(
    null
  );

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openPrivacyModal = () => {
    setModalContent({
      title: "Privacy Policy",
      content:
        "Forma Bath Co. is dedicated to protecting your privacy. Any information submitted via our consultation request form (including name, email, phone number, and project location) is used solely to evaluate your remodeling project, communicate estimates, and coordinate design consultations. We never sell, lease, or distribute your personal details to outside marketing entities. For questions regarding your stored information, contact our privacy officer directly.",
    });
  };

  const openTermsModal = () => {
    setModalContent({
      title: "Terms of Service",
      content:
        "All visual designs, architectural photographs, animations, and copy on this site are property of Forma Bath Co. Estimates provided online or during preliminary discussions represent preliminary budgetary guidelines based on submitted parameters. Formal construction contracts and binding scope schedules are established through our signed Master Renovation Agreement following comprehensive on-site inspections.",
    });
  };

  return (
    <footer
      className="relative w-full bg-[#100E0C] text-stone-300 border-t border-white/10 pt-20 pb-12"
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="#home"
              onClick={(e) => handleScrollTo(e, "#home")}
              className="text-lg sm:text-xl font-medium tracking-[0.22em] text-[#FBF9F5] hover:text-[#D8B282] transition-colors uppercase block select-none"
            >
              FORMA BATH CO.
            </Link>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed max-w-sm">
              Architectural bathroom remodeling and spatial transformations. Dedicated to
              refined craftsmanship, natural materials, and an effortless client experience
              from concept to completion.
            </p>
            <div className="pt-2 text-xs text-stone-500 font-light">
              <span>Licensed & Insured Residential Remodelers (Demo Profile)</span>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-white uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-light">
              {[
                { label: "Home", href: "#home" },
                { label: "Our Work", href: "#work" },
                { label: "Projects", href: "#projects" },
                { label: "Services", href: "#services" },
                { label: "Our Process", href: "#process" },
                { label: "Reviews", href: "#reviews" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleScrollTo(e, item.href)}
                    className="hover:text-[#D8B282] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-white uppercase mb-4">
              Remodeling Services
            </h4>
            <ul className="space-y-2 text-xs font-light">
              {[
                "Complete Bathroom Remodeling",
                "Curbless Walk-In Showers",
                "Freestanding Soaking Tubs",
                "Custom Fluted Oak Vanities",
                "Roman Travertine & Slab Tile",
                "Universal Accessible Design",
              ].map((service, idx) => (
                <li key={idx}>
                  <Link
                    href="#services"
                    onClick={(e) => handleScrollTo(e, "#services")}
                    className="hover:text-[#D8B282] transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Inquiries & Hours (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider text-white uppercase mb-4">
              Design Consultations
            </h4>
            <div className="space-y-2 text-xs text-stone-400 font-light leading-relaxed">
              <p>
                <strong className="text-stone-300 font-medium block">Studio Hours:</strong>
                Monday – Friday: 8:00 AM – 6:00 PM
                <br />
                Saturday: By Appointment Only
              </p>
              <p className="pt-2">
                <strong className="text-stone-300 font-medium block">Inquiries:</strong>
                hello@formabathco.com (Demo)
                <br />
                (555) 382-7491 (Demo)
              </p>
              <div className="pt-3">
                <Link
                  href="#estimate"
                  onClick={(e) => handleScrollTo(e, "#estimate")}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-[#D8B282] uppercase hover:underline"
                >
                  <span>REQUEST IN-HOME ESTIMATE →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-light">
          <p>© 2026 Forma Bath Co. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={openPrivacyModal}
              className="hover:text-stone-300 transition-colors focus:outline-none"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={openTermsModal}
              className="hover:text-stone-300 transition-colors focus:outline-none"
            >
              Terms of Use
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {modalContent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setModalContent(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#181613] rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="font-editorial text-2xl text-white font-normal">
                {modalContent.title}
              </h3>
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="text-stone-400 hover:text-white p-1"
                aria-label="Close legal modal"
              >
                ✕
              </button>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              {modalContent.content}
            </p>
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setModalContent(null)}
                className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

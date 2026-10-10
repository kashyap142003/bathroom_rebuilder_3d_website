"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface HeaderProps {
  onEstimateClick?: () => void;
}

export default function Header({ onEstimateClick }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", active: true },
    { label: "Our Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#services" },
    { label: "Reviews", href: "#estimate" },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#151311]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20 py-3.5"
          : "bg-gradient-to-b from-black/60 via-black/25 to-transparent border-b border-white/10 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand Name (Text-Only, No Logo Icon) */}
        <Link
          href="#home"
          onClick={(e) => handleScrollTo(e, "#home")}
          className="text-lg sm:text-xl font-medium tracking-[0.22em] text-[#FBF9F5] hover:text-[#D8B282] transition-colors uppercase select-none"
          aria-label="Forma Bath Co. Home"
        >
          FORMA BATH CO.
        </Link>

        {/* Center Desktop Navigation */}
        <nav
          className="hidden md:flex items-center gap-7 lg:gap-9"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`text-sm tracking-wide font-normal transition-colors relative py-1 ${
                link.active
                  ? "text-[#FBF9F5] font-medium"
                  : "text-[#FBF9F5]/80 hover:text-[#FBF9F5]"
              }`}
            >
              {link.label}
              {link.active && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D8B282] rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="#estimate"
            onClick={(e) => {
              if (onEstimateClick) {
                e.preventDefault();
                onEstimateClick();
              } else {
                handleScrollTo(e, "#estimate");
              }
            }}
            className="group relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#D8B282] hover:bg-[#C9A16E] text-[#1E1B18] text-xs sm:text-[13px] font-semibold tracking-wider uppercase transition-all duration-300 shadow-md shadow-black/25 hover:shadow-lg hover:shadow-[#D8B282]/25 hover:-translate-y-0.5 active:translate-y-0"
            aria-label="Request a Free Estimate"
          >
            <span>GET A FREE ESTIMATE</span>
            <span
              className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/90 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D8B282]/50"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#151311]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-4" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`text-base font-normal py-2 border-b border-white/5 transition-colors ${
                  link.active
                    ? "text-[#D8B282] font-medium"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="#estimate"
                onClick={(e) => {
                  handleScrollTo(e, "#estimate");
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#D8B282] text-[#1E1B18] text-xs font-semibold tracking-wider uppercase shadow-md text-center"
              >
                GET A FREE ESTIMATE →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

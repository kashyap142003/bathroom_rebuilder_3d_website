"use client";

import React, { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I get a bathroom remodeling estimate?",
    answer:
      "Simply fill out our online estimate form below with a brief description of your project. We'll reach out within one business day to discuss initial ideas and schedule a complimentary in-home design consultation to evaluate your space and provide an itemized proposal.",
  },
  {
    id: "faq-2",
    question: "What information should I prepare before a consultation?",
    answer:
      "Helpful items include inspirational photos of styles you love, a list of functional frustrations with your current bathroom (like insufficient storage or dim lighting), and an approximate investment range you feel comfortable exploring.",
  },
  {
    id: "faq-3",
    question: "Can I choose my own materials and finishes?",
    answer:
      "Absolutely. We collaborate with you on selecting every tile, fixture, slab, and vanity finish. We can guide you through our curated trade showroom partners or integrate selections you have already researched and fallen in love with.",
  },
  {
    id: "faq-4",
    question: "Can an existing bathtub be replaced with a walk-in shower?",
    answer:
      "Yes, tub-to-shower conversions are one of our most frequent projects. We remove the old tub, reconfigure the drain and supply plumbing, apply a continuous Schluter waterproofing membrane, and install a custom curbless or low-profile walk-in shower with frameless glass.",
  },
  {
    id: "faq-5",
    question: "How do you approach project planning and scheduling?",
    answer:
      "Before breaking ground, we order and inspect all long-lead materials (cabinetry, fixtures, and tile) to ensure everything is staged. Once demolition begins, work proceeds continuously with dedicated trades to minimize disruption to your home.",
  },
  {
    id: "faq-6",
    question: "What factors affect the cost of a bathroom remodel?",
    answer:
      "Primary factors include the square footage of the space, whether walls or plumbing stacks are being relocated, the tier of natural stone or tile specified, custom millwork versus semi-custom cabinetry, and specialized electrical features like underfloor heating or steam units.",
  },
  {
    id: "faq-7",
    question: "Which areas do you serve?",
    answer:
      "We serve homeowners across the greater metropolitan area and surrounding neighborhoods, including Central Metro, Westwood Hills, Highland Park, Riverfront, and Eastside suburbs. Submit your ZIP code in our estimate form to verify availability.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full py-28 sm:py-36 bg-[#151311] text-[#FBF9F5] border-t border-white/5 scroll-mt-20"
      aria-label="Frequently Asked Questions"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
              HELP & CLARITY
            </span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
            Questions Before You Begin?
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Answers to common questions about our planning process, timelines, materials, and
            what to expect when partnering with Forma Bath Co.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-[#1B1916] border border-white/10 overflow-hidden transition-colors hover:border-[#D8B282]/30"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#D8B282]/50"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                >
                  <span className="font-editorial text-lg sm:text-xl text-white font-normal pr-2">
                    {faq.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full border border-white/15 flex items-center justify-center shrink-0 text-[#D8B282] transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#D8B282]/10" : ""
                    }`}
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 text-xs sm:text-sm text-stone-300 leading-relaxed font-light border-t border-white/5 animate-in fade-in duration-200"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  zipCode: string;
  budgetRange: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  zipCode?: string;
  general?: string;
}

const PROJECT_TYPES = [
  "Curbless Walk-In Shower Conversion",
  "Full Master Bath Rebuild & Millwork",
  "Guest Bath Complete Refresh",
  "Architectural Luxury Spa Suite",
  "Other / Custom Scope",
];

const BUDGET_OPTIONS = [
  "$14,000 – $22,000 (Guest Refresh)",
  "$26,000 – $44,000 (Full Master)",
  "$45,000+ (Architectural Spa)",
  "Flexible / Guidance Needed",
];

export default function EstimateForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    projectType: PROJECT_TYPES[0],
    zipCode: "",
    budgetRange: BUDGET_OPTIONS[1],
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  React.useEffect(() => {
    const handleScopeSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ projectType?: string; budgetRange?: string }>;
      if (customEvent.detail) {
        setFormData((prev) => ({
          ...prev,
          projectType: customEvent.detail.projectType || prev.projectType,
          budgetRange: customEvent.detail.budgetRange || prev.budgetRange,
        }));
      }
    };
    window.addEventListener("select-estimate-scope", handleScopeSelect);
    return () => window.removeEventListener("select-estimate-scope", handleScopeSelect);
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name.";
    }

    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      newErrors.phone = "Please enter your phone number.";
    }

    if (!formData.zipCode.trim() || formData.zipCode.trim().length < 3) {
      newErrors.zipCode = "Please enter your ZIP or location.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.error || "Unable to submit. Please try again." });
        setIsSubmitting(false);
        return;
      }

      setSubmittedLeadId(data.leadId || "CONFIRMED");
      setIsSubmitting(false);
    } catch {
      setErrors({
        general: "Network connection error. Please try again or call us directly.",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="estimate"
      className="relative w-full py-24 sm:py-32 bg-[#151311] text-[#FBF9F5] border-t border-white/5 scroll-mt-20"
      aria-label="Request a Free Remodeling Estimate"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Trust & Verified Client Proof (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
                  FREE IN-HOME ESTIMATE
                </span>
                <span className="w-10 h-px bg-[#D8B282]/60" aria-hidden="true" />
              </div>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                Plan Your Sanctuary.
              </h2>
              <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                Schedule your complimentary in-home consultation. We review your existing space,
                provide 3D design options, and deliver a guaranteed fixed-price quote.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-xl bg-[#1A1815] border border-white/10 flex items-center gap-4">
                <div className="text-[#D8B282] text-xl">★</div>
                <div>
                  <div className="text-xs font-semibold text-white tracking-wide">
                    5.0 Star Rated (120+ Reviews)
                  </div>
                  <div className="text-[11px] text-stone-400 font-light">
                    Consistently recognized for immaculate sites & punctuality
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#1A1815] border border-white/10 flex items-center gap-4">
                <div className="text-[#D8B282] text-xl">🛡️</div>
                <div>
                  <div className="text-xs font-semibold text-white tracking-wide">
                    10-Year Comprehensive Warranty
                  </div>
                  <div className="text-[11px] text-stone-400 font-light">
                    Schluter® certified waterproof membranes & master plumbing
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Client Testimonial */}
            <div className="p-6 rounded-2xl bg-[#181613] border border-white/5 space-y-3">
              <div className="flex items-center gap-1 text-[#D8B282] text-xs">
                {"★★★★★"}
              </div>
              <blockquote className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed italic">
                &ldquo;Forma Bath Co. delivered exactly what they promised during planning. The
                fluted oak millwork and curbless shower feel like a boutique hotel sanctuary.&rdquo;
              </blockquote>
              <div className="text-[11px] text-stone-400 pt-1 font-medium">
                — Elena R. • Master Travertine Remodel
              </div>
            </div>

            {/* Direct Contact Option */}
            <div className="pt-2 text-xs text-stone-400 font-light">
              <span>Prefer to talk immediately? Call our design director directly: </span>
              <a
                href="tel:5553827491"
                className="text-[#D8B282] font-medium hover:underline inline-block mt-1"
              >
                (555) 382-7491 (Studio Inquiries)
              </a>
            </div>
          </div>

          {/* Right Column: Clean, Frictionless Estimate Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#1A1815] rounded-3xl border border-white/10 p-7 sm:p-10 shadow-2xl">
            {submittedLeadId ? (
              <div className="py-12 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#D8B282]/20 border border-[#D8B282] mx-auto flex items-center justify-center text-2xl text-[#D8B282]">
                  ✓
                </div>
                <h3 className="font-editorial text-3xl text-white font-normal">
                  Thank You, {formData.name.split(" ")[0]}!
                </h3>
                <p className="text-stone-300 text-sm max-w-md mx-auto font-light leading-relaxed">
                  Your estimate inquiry has been confirmed (Ref: #{submittedLeadId.slice(-6).toUpperCase()}).
                  Our senior design consultant will contact you within 24 hours to schedule your
                  in-home consultation.
                </p>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setSubmittedLeadId(null)}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold uppercase tracking-wider text-white transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal mb-1">
                    Request Your Free Consultation
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 font-light">
                    No obligation. Fixed-price proposals guaranteed for 60 days.
                  </p>
                </div>

                {errors.general && (
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-red-200 text-xs">
                    {errors.general}
                  </div>
                )}

                {/* Row 1: Full Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="form-name"
                      className="block text-[11px] font-semibold tracking-wider text-stone-300 uppercase mb-1.5"
                    >
                      Full Name *
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-white/10 text-white text-sm placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-[#D8B282]/50 transition-colors"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="form-email"
                      className="block text-[11px] font-semibold tracking-wider text-stone-300 uppercase mb-1.5"
                    >
                      Email Address *
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      placeholder="e.g. sarah@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-white/10 text-white text-sm placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-[#D8B282]/50 transition-colors"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone & ZIP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="form-phone"
                      className="block text-[11px] font-semibold tracking-wider text-stone-300 uppercase mb-1.5"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="form-phone"
                      type="tel"
                      placeholder="e.g. (555) 234-5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-white/10 text-white text-sm placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-[#D8B282]/50 transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="form-zip"
                      className="block text-[11px] font-semibold tracking-wider text-stone-300 uppercase mb-1.5"
                    >
                      ZIP Code / Neighborhood *
                    </label>
                    <input
                      id="form-zip"
                      type="text"
                      placeholder="e.g. 90210 / Westwood"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-white/10 text-white text-sm placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-[#D8B282]/50 transition-colors"
                    />
                    {errors.zipCode && (
                      <p className="text-red-400 text-[11px] mt-1">{errors.zipCode}</p>
                    )}
                  </div>
                </div>

                {/* Row 3: Project Type & Budget Range */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="form-type"
                      className="block text-[11px] font-semibold tracking-wider text-stone-300 uppercase mb-1.5"
                    >
                      Project Type
                    </label>
                    <select
                      id="form-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D8B282]/50 transition-colors"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-[#141210] text-white">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="form-budget"
                      className="block text-[11px] font-semibold tracking-wider text-stone-300 uppercase mb-1.5"
                    >
                      Estimated Budget Target
                    </label>
                    <select
                      id="form-budget"
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D8B282]/50 transition-colors"
                    >
                      {BUDGET_OPTIONS.map((budget) => (
                        <option key={budget} value={budget} className="bg-[#141210] text-white">
                          {budget}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Optional Notes */}
                <div>
                  <label
                    htmlFor="form-notes"
                    className="block text-[11px] font-semibold tracking-wider text-stone-300 uppercase mb-1.5"
                  >
                    What would you like to achieve? (Optional)
                  </label>
                  <textarea
                    id="form-notes"
                    rows={3}
                    placeholder="e.g. Replace 1990s bathtub with curbless glass shower, add double vanity and heated floor..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-white/10 text-white text-sm placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-[#D8B282]/50 transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#D8B282] hover:bg-[#C9A16E] disabled:bg-stone-700 text-[#1E1B18] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-[#D8B282]/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span>Securing Your Consultation Slot...</span>
                    ) : (
                      <>
                        <span>CLAIM YOUR FREE IN-HOME ESTIMATE</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                  <p className="mt-3 text-center text-[10px] text-stone-500 font-light">
                    Your details are completely confidential. We never sell homeowner information.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

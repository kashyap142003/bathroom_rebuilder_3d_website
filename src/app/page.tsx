import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BeforeAfter from "@/components/BeforeAfter";
import ServicesProcess from "@/components/ServicesProcess";
import EstimateForm from "@/components/EstimateForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#151311] text-[#FBF9F5] selection:bg-[#D8B282]/30 selection:text-white">
      {/* Fixed Translucent Navigation */}
      <Header />

      {/* 
        Section 1: Hero & Continuous 4-Phase Transformation Narrative
        - Phase 1 (0-28%): The Vision & Initial Outdated Bathroom
        - Phase 2 (30-55%): Precision Infrastructure & Waterproof Demolition
        - Phase 3 (55-78%): Artisanal Millwork & Circadian Ambient Lighting
        - Phase 4 (78-100%): The Masterpiece Reveal & Proven Results
        Eliminates the blank scroll gap completely with uninterrupted storytelling.
      */}
      <Hero />

      {/* 
        Section 2: Selected Work & Spatial Transformations
        - Interactive Before-and-After Slider (Frame 001 vs Frame 201)
        - 3 Curated Architectural Style Previews (Travertine, Japandi, Calacatta)
      */}
      <BeforeAfter />

      {/* 
        Section 3: The 3-Step Remodeling Process & Transparent Investment Guides
        - 01. In-Home 3D Design -> 02. Fixed-Price Quote -> 03. 3-Week White-Glove Build
        - Realistic Investment Packages (Guest Refresh, Full Master, Luxury Spa Suite)
      */}
      <ServicesProcess />

      {/* 
        Section 4: Verified Client Trust & Complimentary In-Home Estimate Form
        - 5.0 Star Rating, 10-Year Warranty & Verified Client Testimonials
        - Frictionless 2-Step Lead Form with Instant Confirmation
      */}
      <EstimateForm />

      {/* Section 5: Sleek Architectural Footer */}
      <Footer />
    </main>
  );
}

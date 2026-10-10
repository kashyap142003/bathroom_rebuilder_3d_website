"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  image: string;
  aspect: string;
  description: string;
  scope: string[];
  materials: string[];
  duration: string;
}

const PROJECTS: Project[] = [
  {
    id: "travertine-rebuild",
    title: "The Travertine Primary Suite",
    category: "Full Architectural Remodel",
    location: "Metro Central (Concept Showcase)",
    image: "/frames/ezgif-frame-201.png",
    aspect: "aspect-[16/10]",
    description:
      "A complete gut renovation replacing a dated alcove tub with a seamless curbless walk-in shower, wall-recessed thermostatic controls, custom fluted oak floating vanity, and an illuminated halo mirror.",
    scope: [
      "Curbless Walk-in Glass Shower",
      "Custom Fluted White Oak Floating Vanity",
      "Backlit Halo LED Mirror",
      "Wall-Hung Concealed Tank Toilet",
      "Radiant Heated Travertine Floor",
    ],
    materials: [
      "Honed Roman Travertine Tile",
      "Solid Rift-Cut White Oak",
      "Brushed Champagne Bronze Trim",
      "Ultra-Clear Starphire Glass",
    ],
    duration: "4–5 Weeks Estimated",
  },
  {
    id: "japandi-suite",
    title: "The Japandi Natural Bath",
    category: "Master Bath Reconfiguration",
    location: "Westwood Hills (Concept Showcase)",
    image: "/projects/project-japandi.jpg",
    aspect: "aspect-[16/10]",
    description:
      "Balancing Japanese minimalism and Scandinavian warmth with generous double vessel sinks, organic clay finishes, and integrated architectural niches.",
    scope: [
      "Double Vanity Millwork with Integrated Drawers",
      "Dual Wall-Mounted Bronze Faucets",
      "Full-Length Linear Shower Drain",
      "Illuminated Wall Niches",
    ],
    materials: [
      "Vein-Cut Limestone Slab",
      "Natural Fluted White Oak",
      "Brushed Warm Bronze Fixtures",
      "Limewash Wall Finish",
    ],
    duration: "5–6 Weeks Estimated",
  },
  {
    id: "marble-master",
    title: "The Calacatta Marble Retreat",
    category: "Luxury Suite & Tub Installation",
    location: "Highland Park (Concept Showcase)",
    image: "/projects/project-marble.jpg",
    aspect: "aspect-[16/10]",
    description:
      "An expansive master bath anchored by a sculptural composite resin soaking tub, floor-to-ceiling bookmatched marble slabs, and custom ceiling ambient cove lighting.",
    scope: [
      "Freestanding Ergonomic Soaking Tub",
      "Floor-Mounted Tub Filler",
      "Bookmatched Marble Wall Enclosures",
      "Custom Full-Width Floating Double Vanity",
    ],
    materials: [
      "Calacatta Gold Porcelain Slabs",
      "Brushed Brass Plumbing Fixtures",
      "Fluted Oak Vanity Cabinetry",
      "Integrated Dim-to-Warm LED Coves",
    ],
    duration: "6–7 Weeks Estimated",
  },
  {
    id: "minimalist-spa",
    title: "The Limestone Sanctuary",
    category: "Modern Spa & Steam Shower",
    location: "Riverfront Terraces (Concept Showcase)",
    image: "/projects/project-spa.jpg",
    aspect: "aspect-[16/10]",
    description:
      "A serene minimalist bath with bronze-tinted frameless glass enclosure, floating polished concrete vanity, dual hammered brass vessel basins, and built-in bench seating.",
    scope: [
      "Bronze-Tinted Steam Glass Shower",
      "Integrated Floating Stone Bench",
      "Handcrafted Brass Vessel Sinks",
      "Architectural Recessed Lighting",
    ],
    materials: [
      "Honed Sandstone Slabs",
      "Cast Micro-Concrete Vanity",
      "Antiqued Brass Faucets",
      "Low-Iron Smoked Glass",
    ],
    duration: "5–6 Weeks Estimated",
  },
];

export default function ProjectsGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section
      id="projects"
      className="relative w-full py-28 sm:py-36 bg-[#181613] text-[#FBF9F5] border-t border-white/5 scroll-mt-20"
      aria-label="Featured Bathroom Projects Gallery"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-20">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#D8B282] uppercase">
              PORTFOLIO SHOWCASE
            </span>
            <span className="w-10 h-px bg-[#D8B282]/60" aria-hidden="true" />
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
            Thoughtfully Designed. Beautifully Built.
          </h2>
          <p className="mt-4 text-stone-300 text-sm sm:text-base leading-relaxed font-light max-w-xl">
            A curated showcase of bespoke bathroom renovations. Click any project to view
            architectural specifications, material palettes, and scope details.
          </p>
        </div>

        {/* Projects 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#1D1A17] border border-white/10 hover:border-[#D8B282]/50 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 flex flex-col"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              aria-label={`View details for ${project.title}`}
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-black/30">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-medium tracking-wider text-[#D8B282] uppercase">
                  {project.category}
                </div>
              </div>

              {/* Text Meta Info */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-stone-400 font-light block mb-1">
                    {project.location}
                  </span>
                  <h3 className="font-editorial text-2xl text-white group-hover:text-[#D8B282] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-stone-300 text-xs sm:text-sm line-clamp-2 font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold tracking-wider text-[#D8B282] uppercase">
                  <span>VIEW PROJECT DETAILS</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#181613] rounded-2xl border border-white/15 shadow-2xl p-6 sm:p-8 lg:p-10"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#D8B282]"
              aria-label="Close project details"
            >
              ✕
            </button>

            {/* Modal Image */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 sm:mb-8 border border-white/10">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 850px"
                className="object-cover object-center"
              />
            </div>

            {/* Details Content */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] text-[#D8B282] uppercase block mb-1">
                  {selectedProject.category} • {selectedProject.location}
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal">
                  {selectedProject.title}
                </h3>
                <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              </div>

              {/* Scope & Materials Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-white uppercase mb-3">
                    Scope of Renovation
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-300 font-light">
                    {selectedProject.scope.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#D8B282]">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold tracking-wider text-white uppercase mb-3">
                    Key Materials & Finishes
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-stone-300 font-light">
                    {selectedProject.materials.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#D8B282]">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Action CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-stone-400 font-light">
                  Estimated Timeline:{" "}
                  <strong className="text-white font-medium">
                    {selectedProject.duration}
                  </strong>
                </span>

                <Link
                  href="#estimate"
                  onClick={() => setSelectedProject(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#D8B282] hover:bg-[#C9A16E] text-[#1E1B18] text-xs font-semibold tracking-wider uppercase transition-all shadow-md text-center"
                >
                  <span>INQUIRE ABOUT THIS DESIGN</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

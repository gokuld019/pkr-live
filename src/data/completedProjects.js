// src/data/completedProjects.js
//
// Hardcoded data for DELIVERED / SOLD-OUT projects.
// Deliberately kept slim — a completed-project page only needs enough to
// tell the "this was built and handed over" story, not a full sales kit
// (no floor plans, no unit-wise pricing, no live enquiry funnel).
//
// Once these are ready on the backend, replace with an API fetch of the
// same shape.
//
// slug             → used for the route: /projects/completed/[slug]
// heroImage        → wide hero shot for DESKTOP (3:2 or 16:9 works best)
// heroImageMobile  → portrait/vertical hero shot for MOBILE (9:16 ideal).
//                    Falls back to heroImage if omitted.
// gallery          → 3 supporting images max, keep it tight
// banner           → one wide, text-free "breather" image (2400x800-ish works
//                    well) shown full-bleed near the bottom of the page
// highlights       → 3-4 short lines, not a spec sheet
// stats            → the handful of numbers worth showing on a delivered project

export const completedProjects = [
  {
    slug: "pks-paradise-t-nagar",
    name: "PK's Paradise",
    location: "T Nagar, Chennai",
    tagline: "A landmark address in the heart of T Nagar, fully handed over",
    completedYear: "TODO: add year of completion",
    heroImage: "/completed/pksss.webp",
    heroImageMobile: "/completed/pksmob1.webp",
    gallery: [
      "/completed/pks-paradise/gallery-1.jpg",
      "/completed/pks-paradise/gallery-2.jpg",
      "/completed/pks-paradise/gallery-3.jpg",
    ],
    banner: "/completed/pks-paradise-t-nagar/banner.jpg",
    description:
      "In the heart of T. Nagar, PK’s Paradise brings together the convenience of a well-connected neighbourhood and the comfort of a place to call home. Planned around everyday living, the project is now fully handed over, with every home occupied.",
    stats: [
      { label: "Units", value: "TODO: add unit count" },
      { label: "Unit Types", value: "TODO: e.g. 2 & 3 BHK" },
      { label: "Site Area", value: "TODO: add site area" },
      { label: "Handed Over", value: "TODO: add year" },
    ],
    highlights: [
      "Walking distance to T Nagar's retail and transit hub",
      "100% occupancy since handover",
      "Vaastu-compliant layouts across all units",
    ],
  },
  {
    slug: "premavathy-nagar-maraimalai-nagar",
    name: "Premavathy Nagar",
    location: "Maraimalai Nagar, Chennai",
    tagline: "A settled, green community south of the city",
    completedYear: "TODO: add year of completion",
    heroImage: "/completed/Premvathy.webp",
    heroImageMobile: "/completed/upprem.webp",
    gallery: [
      "/completed/premavathy-nagar/gallery-1.jpg",
      "/completed/premavathy-nagar/gallery-2.jpg",
      "/completed/premavathy-nagar/gallery-3.jpg",
    ],
    banner: "/completed/premavathy-nagar-maraimalai-nagar/banner.jpg",
    description:
      "Located in Maraimalai Nagar, Premavathy Nagar brings together a well-planned residential setting and convenient access to the area’s industrial hubs, schools and transport links. With its wide internal roads and avenue trees, the community is fully developed and home to its residents.",
    stats: [
      { label: "Units", value: "TODO: add unit count" },
      { label: "Unit Types", value: "TODO: e.g. Plots / 2 BHK" },
      { label: "Site Area", value: "TODO: add site area" },
      { label: "Handed Over", value: "TODO: add year" },
    ],
    highlights: [
      "Close to Maraimalai Nagar Railway Station",
      "Wide, tree-lined internal roads",
      "Fully occupied residential community",
    ],
  },
  {
    slug: "little-india",
    name: "Little India",
    location: "TODO: add locality, Chennai",
    tagline: "Compact, efficient homes for first-time buyers",
    completedYear: "TODO: add year of completion",
    heroImage: "/completed/Lit.webp",
    heroImageMobile: "/completed/uplit.webp",
    gallery: [
      "/completed/little-india/gallery-1.jpg",
      "/completed/little-india/gallery-2.jpg",
      "/completed/little-india/gallery-3.jpg",
    ],
    banner: "/completed/little-india/banner.jpg",
    description:
      "Located in Guduvanchery, Little India was developed to make home ownership more accessible through practical 1 and 2 BHK homes designed for everyday needs. With a focus on functional layouts and attainable home ownership, the project is now fully delivered, with every home sold.",
    stats: [
      { label: "Units", value: "TODO: add unit count" },
      { label: "Unit Types", value: "TODO: e.g. 1 & 2 BHK" },
      { label: "Site Area", value: "TODO: add site area" },
      { label: "Handed Over", value: "TODO: add year" },
    ],
    highlights: [
      "Sold out ahead of scheduled handover",
      "Efficient, no-wastage floor layouts",
      "Strong rental demand in the neighbourhood",
    ],
  },
  {
    slug: "aditi-gardenz-sp-koil",
    name: "Aditi Gardenz",
    location: "SP Koil, Chennai",
    tagline: "Garden-facing homes on the SP Koil corridor",
    completedYear: "TODO: add year of completion",
    heroImage: "/completed/ags.webp",
    heroImageMobile: "/completed/agsp.webp",
    gallery: [
      "/completed/aditi-gardenz-sp-koil/gallery-1.jpg",
      "/completed/aditi-gardenz-sp-koil/gallery-2.jpg",
      "/completed/aditi-gardenz-sp-koil/gallery-3.jpg",
    ],
    banner: "/completed/aditi-gardenz-sp-koil/banner.jpg",
    description:
      "Located in S.P. Koil, Aditi Gardenz was planned around comfortable apartment living, with well-ventilated layouts and a landscaped central garden. Designed to make everyday living more pleasant, the project is fully sold, with all homes handed over to their owners.",
    stats: [
      { label: "Units", value: "TODO: add unit count" },
      { label: "Unit Types", value: "TODO: e.g. 2 BHK" },
      { label: "Site Area", value: "TODO: add site area" },
      { label: "Handed Over", value: "TODO: add year" },
    ],
    highlights: [
      "Central landscaped garden shared by all blocks",
      "Good connectivity along the SP Koil corridor",
      "Fully sold and occupied",
    ],
  },
  {
    slug: "aditi-gardenz-veppampattu",
    name: "Aditi Gardenz",
    location: "Veppampattu, Chennai",
    tagline: "The Aditi Gardenz address, this time in Veppampattu",
    completedYear: "TODO: add year of completion",
    heroImage: "/completed/cp6.webp",
    heroImageMobile: "/completed/agvmob.webp",
    gallery: [
      "/completed/aditi-gardenz-veppampattu/gallery-1.jpg",
      "/completed/aditi-gardenz-veppampattu/gallery-2.jpg",
      "/completed/aditi-gardenz-veppampattu/gallery-3.jpg",
    ],
    banner: "/completed/aditi-gardenz-veppampattu/banner.jpg",
    description:
      "Located in Veppampattu, Aditi Gardenz was planned for families seeking comfortable homes in a well-connected suburban setting. With garden-facing homes and a setting away from the city's busy pace, the project is now fully completed, with all homes handed over to their owners.",
    stats: [
      { label: "Units", value: "TODO: add unit count" },
      { label: "Unit Types", value: "TODO: e.g. 2 BHK" },
      { label: "Site Area", value: "TODO: add site area" },
      { label: "Handed Over", value: "TODO: add year" },
    ],
    highlights: [
      "Quiet, low-density surroundings",
      "Landscaped open spaces between blocks",
      "Fully handed over to residents",
    ],
  },
];

export function getCompletedProjectBySlug(slug) {
  return completedProjects.find((p) => p.slug === slug);
}

export function getAllCompletedProjectSlugs() {
  return completedProjects.map((p) => p.slug);
}
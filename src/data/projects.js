// src/data/projects.js
// Hardcoded project data for the frontend-only stage.
// Once the backend is ready, replace this with an API fetch (same shape).

export const projects = [
  {
    slug: "gurudev",
    name: "Gurudev",
    tagline: "Thoughtfully planned homes in the heart of Guduvancheri",
    location: "Guduvancheri, Chennai",
    heroImage: "/gurudevg.jpeg",
    aboutImage: "/gurudevg.jpeg",

    eyebrow: "MORE THAN JUST A HOME",
    heading: ["Designed for a", "Better Way of Life"],
    description:
      "Gurudev is a Stilt + 5 floor residential development in Guduvancheri, Chennai, offering 90 thoughtfully designed apartments across 1BHK and 2BHK layouts. It promises comfortable, affordable urban living with easy access to key parts of Chennai and everyday conveniences close at hand.",
    ctaLabel: "OUR STORY",
    ctaHref: "#our-story",

    overlayWords: ["Live", "Connect", "Belong"],
    overlayAt: "Gurudev",

    stats: [
      { id: "years", value: "77+", label: "YEARS OF TRUST" },
      { id: "projects", value: "120+", label: "LANDMARK PROJECTS" },
      { id: "sqft", value: "7M+", label: "SQ.FT. SPACE DELIVERED" },
      { id: "communities", value: "44+", label: "HAPPY COMMUNITIES" },
    ],

    amenitiesHeading: ["Everyday", "Comforts,", "Exceptional Living"],
    amenitiesDescription:
      "Thoughtfully curated amenities for all age groups, bringing wellness, recreation and community together — because a better life is in the details.",
    amenitiesCtaLabel: "VIEW ALL AMENITIES",
    amenitiesCtaHref: "#amenities",
    amenities: [
      { id: "security", image: "/amenities/amenities.jpeg", title: "24/7 Security", tagline: "Safe & Secure" },
      { id: "power", image: "/amenities/amenities3.jpeg", title: "Power Backup", tagline: "Uninterrupted Living" },
      { id: "parking", image: "/amenities/amenities4.jpeg", title: "Covered Car Parking", tagline: "Convenience First" },
      { id: "play", image: "/amenities/amenities5.jpeg", title: "Children's Play Area", tagline: "Play. Learn. Grow." },
      { id: "garden", image: "/amenities/amenities6.jpeg", title: "Landscaped Garden", tagline: "Breathe. Relax. Reconnect." },
      { id: "rainwater", image: "/amenities/amenities7.jpeg", title: "Rain Water Harvesting", tagline: "Sustainable Living" },
    ],

    floorPlansHeading: ["Homes Tailored", "to Your Needs"],
    floorPlansDescription:
      "Smartly designed 1 & 2 BHK apartments with efficient layouts, abundant natural light and optimal space utilisation.",
    floorPlansCtaLabel: "VIEW ALL PLANS",
    floorPlansCtaHref: "/projects/gurudev/floor-plans",
    floorPlanTabs: ["1 BHK", "2 BHK"],
    floorPlans: [
      {
        id: "1bhk-a",
        image: "/floorplans/1bhk1.webp",
        title: "1 BHK",
        area: "391 Sq.Ft.",
        href: "/floor-plans/gurudev/1bhk-a.pdf",
        features: [
          { icon: "bed", label: "1 Bedroom" },
          { icon: "bath", label: "1 Bathroom" },
          { icon: "living", label: "Living & Dining" },
        ],
      },
      {
        id: "1bhk-b",
        image: "/floorplans/1bhk2.webp",
        title: "1 BHK",
        area: "410 Sq.Ft.",
        href: "/floor-plans/gurudev/1bhk-b.pdf",
        features: [
          { icon: "bed", label: "1 Bedroom" },
          { icon: "bath", label: "1 Bathroom" },
          { icon: "living", label: "Living & Dining" },
        ],
      },
      {
        id: "1bhk-c",
        image: "/floorplans/1bhk3.webp",
        title: "1 BHK",
        area: "460 Sq.Ft.",
        href: "/floor-plans/gurudev/1bhk-c.pdf",
        features: [
          { icon: "bed", label: "1 Bedroom" },
          { icon: "bath", label: "1 Bathroom" },
          { icon: "living", label: "Living & Dining" },
        ],
      },
      {
        id: "2bhk-a",
        image: "/floorplans/2bhk-1.webp",
        title: "2 BHK",
        area: "730 - 732 Sq.Ft.",
        href: "/floor-plans/gurudev/2bhk-a.pdf",
        features: [
          { icon: "bed", label: "2 Bedrooms" },
          { icon: "bath", label: "2 Bathrooms" },
          { icon: "living", label: "Living & Dining" },
        ],
      },
    ],

    galleryHeading: ["A Glimpse", "Into Your", "Tomorrow"],
    galleryCtaHref: "#gallery",
    galleryFilters: ["All", "Exteriors", "Interiors", "Amenities", "Lifestyle"],
    galleryImages: [
      { id: "g1", image: "/gallery.jpeg", category: "Exteriors", size: "large" },
      { id: "g2", image: "/gallery/gallery2.png", category: "Interiors", size: "small" },
      { id: "g3", image: "/gallery/gallery3.jpeg", category: "Amenities", size: "small" },
    ],

    gallery: [
      "/gallery.jpeg",
      "/gallery/gallery2.png",
      "/gallery/gallery3.jpeg",
    ],
    floors: "Stilt + 5",
    totalUnits: 90,
    unitTypes: [
      { type: "1 BHK", count: 70, sizeRange: "391 - 460 sqft" },
      { type: "2 BHK", count: 20, sizeRange: "730 - 732 sqft" },
    ],
    nearbyLandmarks: [
      { name: "Guduvancheri Railway Station", distance: "" },
      { name: "GST Road", distance: "" },
      { name: "Chennai Trade Centre", distance: "" },
    ],
    possession: "TODO: add possession/completion date",
    reraId: "TODO: add RERA ID",
    brochureUrl: "/brochures/gurudev.pdf",
    quickFacts: [
      { label: "Type", value: "1 & 2 BHK Apartments" },
      { label: "Units", value: "90" },
      { label: "Floors", value: "Stilt + 5" },
      { label: "Unit Size Range", value: "391 Sq.ft. - 732 Sq.ft." },
    ],
    locationHeading: ["Well Connected", "for a Brighter You"],
    locationDescription: "Strategically located in Guduvancheri, Gurudev keeps you close to schools, workplaces, healthcare and everyday conveniences.",
    locationMapUrl: "https://maps.google.com/?q=Gurudev+Guduvancheri",
    locationMapImage: "",
    locationMapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4277621863025!2d80.1935429!3d13.008409499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52674983f048c3%3A0xf9655e7ba417a69f!2sArchana%20Castle%2C%20Ramapuram%2C%20Parangi%20Malai%2C%20St.Thomas%20Mount%2C%20Tamil%20Nadu%20600016!5e0!3m2!1sen!2sin!4v1789026981810!5m2!1sen!2sin",
    locationLandmarks: [
      { label: "Schools", distance: "2 - 5 km" },
      { label: "Hospitals", distance: "2 - 6 km" },
      { label: "IT Corridors (OMR)", distance: "18 km" },
      { label: "Railway Station", distance: "3 km" },
      { label: "Bus Stand", distance: "3 km" },
      { label: "Airport", distance: "18 km" },
    ],

    // --- 360 Virtual Tour section data ---
    tourEyebrow: "EXPLORE BEFORE YOU BELONG",
    tourHeading: ["Experience Gurudev", "in 360°"],
    tourDescription:
      "Take a virtual tour and explore the spaces, views and lifestyle that await you. Get a real feel of Gurudev from anywhere, anytime.",
    tourCtaLabel: "Start 360° Tour",
    tourImage: "/tour/gurudev-360-cover.jpg",
    tourUrl: "https://example.com/gurudev-360-tour",
    tourTagline: ["See it,", "Feel it,", "Live it."],
  },
  {
    slug: "privana",
    name: "Project Name TBD",
    tagline: "TODO: tagline",
    location: "TODO: location",
    heroImage: "/projects/privana/hero.jpg",
    aboutImage: "/projects/privana/hero.jpg",

    eyebrow: "MORE THAN JUST A HOME",
    heading: ["Designed for a", "Better Way of Life"],
    description: "TODO: description",
    ctaLabel: "OUR STORY",
    ctaHref: "#our-story",
    overlayWords: ["Live", "Connect", "Belong"],
    overlayAt: "Privana",

    stats: [
      { id: "years", value: "77+", label: "YEARS OF TRUST" },
      { id: "projects", value: "120+", label: "LANDMARK PROJECTS" },
      { id: "sqft", value: "7M+", label: "SQ.FT. SPACE DELIVERED" },
      { id: "communities", value: "44+", label: "HAPPY COMMUNITIES" },
    ],

    amenitiesHeading: ["Everyday", "Comforts,", "Exceptional Living"],
    amenitiesDescription: "TODO: amenities description",
    amenitiesCtaLabel: "VIEW ALL AMENITIES",
    amenitiesCtaHref: "#amenities",
    amenities: [],

    floorPlansHeading: ["Homes Tailored", "to Your Needs"],
    floorPlansDescription: "TODO: floor plans description",
    floorPlansCtaLabel: "VIEW ALL PLANS",
    floorPlansCtaHref: "#floor-plans",
    floorPlanTabs: ["2 BHK", "3 BHK"],
    floorPlans: [],

    galleryHeading: ["A Glimpse", "Into Your", "Tomorrow"],
    galleryCtaHref: "#gallery",
    galleryFilters: ["All", "Exteriors", "Interiors", "Amenities", "Lifestyle"],
    galleryImages: [],

    gallery: [],
    floors: "TODO",
    totalUnits: 0,
    unitTypes: [],
    nearbyLandmarks: [],
    possession: "TODO",
    reraId: "TODO",
    brochureUrl: "",
    quickFacts: [
      { label: "Type", value: "TODO" },
      { label: "Units", value: "TODO" },
      { label: "Floors", value: "TODO" },
      { label: "Unit Size Range", value: "TODO" },
    ],

    tourEyebrow: "",
    tourHeading: [],
    tourDescription: "",
    tourCtaLabel: "",
    tourImage: "",
    tourUrl: "",
    tourTagline: [],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
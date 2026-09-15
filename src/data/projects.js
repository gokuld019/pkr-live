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
    aboutImage: "/abb.png",

    eyebrow: "MORE THAN JUST A HOME",
    heading: ["Designed for a", "Better Way of Life"],
    description:
      "Located in the Guduvancheri neighbourhood of the South-Eastern Suburbs of Chennai, Gurudev is a residential community consisting of 90 thoughtfully crafted apartments for a living experience that is a class apart. Gurudev offers a serene, high-quality lifestyle in perfect harmony with your preferences and expectations, with a choice of one and two bedroom homes.",
    ctaLabel: "OUR STORY",
    ctaHref: "#our-story",

    overlayWords: ["Live", "Connect", "Belong"],
    overlayAt: "Gurudev",

    salientFeatures: [
      "Elegantly crafted 90 apartments",
      "Stilt + 5 floors design structure",
      "100% vaastu compliant homes with zero dead space",
      "Surrounded by prominent IT/ITES companies, schools, colleges and hospitals",
    ],

    stats: [
      { id: "years", value: "77+", label: "YEARS OF TRUST" },
      { id: "projects", value: "120+", label: "LANDMARK PROJECTS" },
      { id: "sqft", value: "7M+", label: "SQ.FT. SPACE DELIVERED" },
      { id: "communities", value: "44+", label: "HAPPY COMMUNITIES" },
    ],

    amenitiesHeading: ["An Uncompromising", "Life", "at Gurudev"],
    amenitiesDescription:
      "Decked with the choicest and most enchanting of amenities, your home at Gurudev is a touch above the expected — a place where thoughtful features bring comfort and warmth to everyday living.",
    amenitiesCtaLabel: "VIEW ALL AMENITIES",
    amenitiesCtaHref: "#amenities",
    amenities: [
      { id: "shops", image: "/amenities/amenities2.png", title: "Shops", tagline: "Everyday Convenience" },
      { id: "security", image: "/amenities/amenities.png", title: "Security Cabin with CCTV", tagline: "Safe & Secure" },
      { id: "play", image: "/amenities/amenities3.png", title: "Children's Play Area", tagline: "Play. Learn. Grow." },
      { id: "walking", image: "/amenities/amenities4.png", title: "Walking Track", tagline: "Move. Breathe. Recharge." },
      { id: "park", image: "/amenities/amenities5.png", title: "Park", tagline: "Green & Relaxing" },
      { id: "avenue", image: "/amenities/amenities6.png", title: "Avenue Trees", tagline: "Shaded, Landscaped Paths" },
      { id: "elevator", image: "/amenities/amenities7.png", title: "Elevator", tagline: "Effortless Access" },
      { id: "stp", image: "/amenities/amenities8.png", title: "Sewage Treatment Plant (STP)", tagline: "Sustainable Living" },
      { id: "parking", image: "/amenities/amenities9.png", title: "Car Parking", tagline: "Covered & Convenient" },
    ],

    floorPlansHeading: ["Homes Tailored", "to Your Needs"],
    floorPlansDescription:
      "Smartly designed 1 & 2 BHK apartments with efficient layouts, abundant natural light and optimal space utilisation — available as both East and West facing units.",
    floorPlansCtaLabel: "VIEW ALL PLANS",
    floorPlansCtaHref: "/projects/gurudev/floor-plans",
    floorPlanTabs: ["1 BHK", "2 BHK"],
    floorPlans: [
      {
        id: "1bhk-flat3",
        image: "/floorplans/1bhk1.webp",
        title: "1 BHK + 1T · West Facing",
        area: "425 Sq.Ft.",
        href: "/floor-plans/gurudev/flat-3.pdf",
        features: [
          { icon: "bed", label: "1 Bedroom" },
          { icon: "bath", label: "1 Toilet" },
          { icon: "living", label: "Living Room / Kitchen" },
        ],
      },
      {
        id: "1bhk-flat4",
        image: "/floorplans/1bhk2.webp",
        title: "1 BHK + 1T · West Facing",
        area: "419 Sq.Ft.",
        href: "/floor-plans/gurudev/flat-4.pdf",
        features: [
          { icon: "bed", label: "1 Bedroom" },
          { icon: "bath", label: "1 Toilet" },
          { icon: "living", label: "Living Room / Kitchen" },
        ],
      },
      {
        id: "1bhk-flat5",
        image: "/floorplans/1bhk3.webp",
        title: "1 BHK + 1T · West Facing",
        area: "491 Sq.Ft.",
        href: "/floor-plans/gurudev/flat-5.pdf",
        features: [
          { icon: "bed", label: "1 Bedroom" },
          { icon: "bath", label: "1 Toilet" },
          { icon: "living", label: "Living Room / Kitchen" },
        ],
      },
      {
        id: "1bhk-flat6",
        image: "/floorplans/1bhk1.webp",
        title: "1 BHK + 1T · West Facing",
        area: "391 Sq.Ft.",
        href: "/floor-plans/gurudev/flat-6.pdf",
        features: [
          { icon: "bed", label: "1 Bedroom" },
          { icon: "bath", label: "1 Toilet" },
          { icon: "living", label: "Living Room / Kitchen" },
        ],
      },
      {
        id: "1bhk-flat8",
        image: "/floorplans/1bhk2.webp",
        title: "1 BHK + 1T · East Facing",
        area: "460 Sq.Ft.",
        href: "/floor-plans/gurudev/flat-8.pdf",
        features: [
          { icon: "bed", label: "1 Bedroom" },
          { icon: "bath", label: "1 Toilet" },
          { icon: "living", label: "Living Room / Kitchen" },
        ],
      },
      {
        id: "1bhk-flat9",
        image: "/floorplans/1bhk3.webp",
        title: "1 BHK + 1T · East Facing",
        area: "440 Sq.Ft.",
        href: "/floor-plans/gurudev/flat-9.pdf",
        features: [
          { icon: "bed", label: "1 Bedroom" },
          { icon: "bath", label: "1 Toilet" },
          { icon: "living", label: "Living Room / Kitchen" },
        ],
      },
      {
        id: "2bhk-flat1",
        image: "/floorplans/2bhk-1.webp",
        title: "2 BHK + 2T · East Facing",
        area: "730 Sq.Ft.",
        href: "/floor-plans/gurudev/flat-1.pdf",
        features: [
          { icon: "bed", label: "2 Bedrooms" },
          { icon: "bath", label: "2 Toilets" },
          { icon: "living", label: "Living cum Dining" },
        ],
      },
      {
        id: "2bhk-flat2",
        image: "/floorplans/2bhk-1.webp",
        title: "2 BHK + 2T · East Facing",
        area: "732 Sq.Ft.",
        href: "/floor-plans/gurudev/flat-2.pdf",
        features: [
          { icon: "bed", label: "2 Bedrooms" },
          { icon: "bath", label: "2 Toilets" },
          { icon: "living", label: "Living cum Dining" },
        ],
      },
      {
        id: "2bhk-flat10",
        image: "/floorplans/2bhk-1.webp",
        title: "2 BHK + 2T · West Facing",
        area: "730 Sq.Ft.",
        href: "/floor-plans/gurudev/flat-10.pdf",
        features: [
          { icon: "bed", label: "2 Bedrooms" },
          { icon: "bath", label: "2 Toilets" },
          { icon: "living", label: "Living cum Dining" },
        ],
      },
      {
        id: "2bhk-flat11",
        image: "/floorplans/2bhk-1.webp",
        title: "2 BHK + 2T · West Facing",
        area: "732 Sq.Ft.",
        href: "/floor-plans/gurudev/flat-11.pdf",
        features: [
          { icon: "bed", label: "2 Bedrooms" },
          { icon: "bath", label: "2 Toilets" },
          { icon: "living", label: "Living cum Dining" },
        ],
      },
    ],

    galleryHeading: ["A Glimpse", "Into Your", "Tomorrow"],
    galleryCtaHref: "#gallery",
    galleryFilters: ["All", "Exteriors", "Interiors", "Amenities", "Lifestyle"],
    galleryImages: [
      { id: "g1", image: "/gurudev1.png", title: "Aerial View", category: "Exteriors", size: "large" },
      { id: "g2", image: "/gurudev2.png", title: "Elevation View — Block A", category: "Exteriors", size: "small" },
      { id: "g3", image: "/gurudev3.png", category: "Amenities", size: "small" },
    ],

    gallery: ["/gallery.jpeg", "/gallery/gallery2.png", "/gallery/gallery3.jpeg"],
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

    // --- Specifications (from brochure) ---
    specifications: [
      {
        title: "Structure",
        items: [
          { label: "Structural system", value: "RCC Framed Structure designed for seismic compliance (Zone 3)" },
          { label: "Masonry", value: "200 mm for external walls, 100 mm for internal walls" },
          { label: "Floor-Floor height (incl. slab)", value: "3000 mm" },
          { label: "ATT", value: "Anti-termite treatment will be done" },
        ],
      },
      {
        title: "Wall Finish",
        items: [
          { label: "Internal walls", value: "Living, Dining, Bedrooms, Kitchen, Utility & lobby finished with 2 coat putty, 1 coat primer, 2 coats emulsion paint" },
          { label: "Exterior walls", value: "1 coat primer and 2 coats emulsion paint as per architect design" },
          { label: "Bathroom", value: "Glazed ceramic tile up to false ceiling height (300 x 600 mm), above finished with primer" },
          { label: "Kitchen", value: "Ceramic wall tile 300 x 600 mm for 600 mm above counter top" },
          { label: "Toilet ceiling", value: "Grid type false ceiling" },
        ],
      },
      {
        title: "Floor Finish with Skirting",
        items: [
          { label: "Foyer, Living, Dining, Bedrooms & Kitchen", value: "Vitrified tiles 600 x 600 mm" },
          { label: "Bathroom", value: "Anti-skid ceramic tiles 300 x 300 mm" },
          { label: "Balcony", value: "Anti-skid ceramic tiles 300 x 300 mm" },
        ],
      },
      {
        title: "Kitchen & Dining",
        items: [
          { label: "Kitchen", value: "Granite slab platform, 600 mm wide, 800 mm from finished floor level" },
          { label: "Electrical point", value: "For chimney & water purifier" },
          { label: "CP Fitting", value: "Pull out tap of Indian Standard / Parryware or equivalent" },
          { label: "Sink", value: "Quartz single bowl with drain board" },
        ],
      },
      {
        title: "Balcony",
        items: [{ label: "Handrail", value: "MS handrail as per architect's design" }],
      },
      {
        title: "Bathrooms",
        items: [
          { label: "Sanitary Fixture", value: "Indian Standard / Parryware or equivalent" },
          { label: "CP fittings", value: "Indian Standard / Parryware or equivalent" },
          { label: "Bathrooms", value: "Floor mounted WC with cistern, health faucet, single lever diverter" },
        ],
      },
      {
        title: "Joinery",
        items: [
          { label: "Main Door", value: "3'6\" x 7'0\" teak wood frame & laminated shutters with architrave, magnetic catcher, tower bolt" },
          { label: "Bedroom doors", value: "Engineered door frame, double side laminated shutters (3'0\" x 7'0\"), Godrej/equivalent locks" },
          { label: "Bathroom door", value: "Engineered door frame with WPC shutters (2'6\" x 7'0\"), thumb turn lock with tower bolt" },
        ],
      },
      {
        title: "Windows",
        items: [
          { label: "Windows", value: "Powder coated aluminum or UPVC, sliding shutter, plain glass, MS grills on inner side" },
          { label: "French doors", value: "Powder coated aluminum frame with toughened glass, no grills" },
          { label: "Ventilators", value: "Powder coated aluminum, fixed/adjustable louvered/openable shutter" },
        ],
      },
      {
        title: "Electrical Points",
        items: [
          { label: "Power Supply", value: "3 phase power supply connection" },
          { label: "Safety Device", value: "MCB & ELCB (Earth Leakage Circuit Breaker)" },
          { label: "Switches & Sockets", value: "Anchor Roma / Schneider / ABB or equivalent" },
          { label: "Wires", value: "FRLS copper wire, KEI / Polycab or equivalent" },
          { label: "TV & Telephone", value: "Point in living room" },
          { label: "Mobile Charging Dock", value: "Provided in living room" },
          { label: "Split A/C", value: "Point provided in living & all bedrooms" },
        ],
      },
      {
        title: "Common Features",
        items: [
          { label: "Lift", value: "6-passenger automatic elevator" },
          { label: "Name board", value: "Apartment owner name provided in stilt" },
          { label: "Lift Fascia & Lobby", value: "Detailed with tiles, Granite jambs, designer tile flooring in all floors" },
          { label: "Lobby & Corridor", value: "Stilt floor granite flooring, typical floors with tiles" },
          { label: "Staircase floor", value: "Stilt floor granite, typical floors Kota / Shahbadth / Tile" },
          { label: "Staircase handrail", value: "MS handrail with enamel paint on all floors" },
          { label: "Stilt Flooring", value: "Paver block flooring with car park numbers marked in paint" },
          { label: "Terrace floor", value: "Cooling weathering tiles" },
        ],
      },
      {
        title: "Outdoor Features",
        items: [
          { label: "Water storage", value: "UG sump with WTP (as per water test report)" },
          { label: "Rain water harvest", value: "Rain water harvesting site" },
          { label: "STP", value: "Centralized Sewage Treatment plant" },
          { label: "Safety", value: "CCTV surveillance at pivotal locations in stilt" },
          { label: "Well defined driveway", value: "Interlocking paver block all-round with demarcated driveway" },
          { label: "Security", value: "Security booth at the entrance" },
          { label: "Compound wall", value: "Perimeter fenced, 1500 mm height, with entry gates" },
          { label: "Landscape", value: "Suitable landscape at appropriate places" },
          { label: "Driveway", value: "Convex mirror for safe turning in driveway" },
        ],
      },
    ],

    locationHeading: ["Well Connected", "for a Brighter You"],
    locationDescription:
      "Gurudev gives you the gift of time by offering apartments near Guduvancheri Railway Station, with superior connectivity. Living near MEPZ, Siruseri IT Park and Mahindra World City lets you strike the right work-life balance.",
    locationMapUrl: "https://maps.google.com/?q=Gurudev+Guduvancheri",
    locationMapImage: "",
    locationMapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4277621863025!2d80.1935429!3d13.008409499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52674983f048c3%3A0xf9655e7ba417a69f!2sArchana%20Castle%2C%20Ramapuram%2C%20Parangi%20Malai%2C%20St.Thomas%20Mount%2C%20Tamil%20Nadu%20600016!5e0!3m2!1sen!2sin!4v1789026981810!5m2!1sen!2sin",
    locationLandmarks: [
      { label: "Guduvancheri (GST Road)", distance: "5 mins" },
      { label: "Urapakkam", distance: "10 mins" },
      { label: "Vandalur", distance: "10 mins" },
      { label: "Perungalathur", distance: "15 mins" },
      { label: "OMR - Thiruporur", distance: "15 mins" },
      { label: "Tambaram", distance: "20 mins" },
    ],
    nearbyColleges: [
      { label: "Apollo Arts & Science College", distance: "8 mins" },
      { label: "SRM University", distance: "8 mins" },
      { label: "Shri Sathya Sai Medical College", distance: "10 mins" },
      { label: "Crescent Engineering College", distance: "12 mins" },
      { label: "Tagore Engineering College", distance: "14 mins" },
      { label: "Peri Institute of Technology", distance: "15 mins" },
      { label: "VIT University", distance: "20 mins" },
    ],
    nearbySchools: [
      { label: "Velammal Vidhyashram CBSE", distance: "2 mins" },
      { label: "Eden Kidspark", distance: "3 mins" },
      { label: "SRI MA Vidyalaya CBSE", distance: "3 mins" },
      { label: "SRM Public School CBSE", distance: "5 mins" },
      { label: "Akshra Mandir Primary School", distance: "5 mins" },
      { label: "St Johns Matric School", distance: "8 mins" },
      { label: "PSBB Millennium School CBSE", distance: "10 mins" },
    ],

    // --- 360 Virtual Tour section data ---
    tourEyebrow: "EXPLORE BEFORE YOU BELONG",
    tourHeading: ["Experience Gurudev", "in 360°"],
    tourDescription:
      "Take a virtual tour and explore the spaces, views and lifestyle that await you. Get a real feel of Gurudev from anywhere, anytime.",
    tourCtaLabel: "Start 360° Tour",
    tourImage: "/360.png",
    tourUrl: "https://example.com/gurudev-360-tour",
    tourTagline: ["See it,", "Feel it,", "Live it."],

    corporateOffice: {
      lines: ["Flat A10, Archana Castle, 4/23 Patrick Church Road,", "St. Thomas Mount, Chennai 600016"],
      phone: "95 43 63 33 33",
      website: "www.pkrestates.com",
    },
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

    salientFeatures: [],

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

    specifications: [],
    nearbyColleges: [],
    nearbySchools: [],

    tourEyebrow: "",
    tourHeading: [],
    tourDescription: "",
    tourCtaLabel: "",
    tourImage: "",
    tourUrl: "",
    tourTagline: [],

    corporateOffice: null,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
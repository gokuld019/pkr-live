// src/data/projects.js
// Hardcoded project data for the frontend-only stage.
// Once the backend is ready, replace this with an API fetch (same shape).
//
// 360° TOUR IMAGES (per project):
//   tourThumbnail → preview image shown on the page (any normal image, e.g. 16:9 / 3:2)
//   tour360Image  → true equirectangular (2:1) panorama used inside the 360° viewer
//
// MASTER PLAN TABS (per project):
//   video → short thumbnail video shown as preview on the tab & main card
//   image → full-resolution plan image opened in the lightbox on click
//
// AMENITIES (per project):
//   amenitiesEyebrow     → small uppercase label above the heading
//   amenitiesHeading     → [line 1, line 2 (highlighted in navy)]
//   amenitiesDescription → paragraph under the heading
//   amenities[].description / tags → shown in the amenity detail card
//
// BROCHURE:
//   brochureUrl → path to the PDF in /public. Set to null to hide the
//                 "Download Brochure" button for that project.

export const projects = [
  {
    slug: "gurudev",
    name: "Gurudev",
    tagline: "Thoughtfully planned homes in the heart of Guduvancheri",
    location: "Guduvancheri, Chennai",
    heroImage: "/ggg.jpeg",
    heroImageMobile: "/gurudevmob.jpeg",
    aboutImage: "/g.png",

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
      { id: "projects", value: "90+", label: "LANDMARK PROJECTS" },
      { id: "sqft", value: "7M+", label: "SQ.FT. SPACE DELIVERED" },
      { id: "communities", value: "44+", label: "HAPPY COMMUNITIES" },
    ],

    // ---------- Amenities (Gurudev) ----------
    amenitiesEyebrow: "LIFE AT GURUDEV",
    amenitiesHeading: ["An Uncompromising", "Life at Gurudev"],
    amenitiesDescription:
      "Decked with the choicest and most enchanting of amenities, your home at Gurudev is a touch above the expected — a place where thoughtful features bring comfort and warmth to everyday living.",
    amenitiesCtaLabel: "VIEW ALL AMENITIES",
    amenitiesCtaHref: "#amenities",
    amenities: [
      {
        id: "shops",
        image: "/amenities/amenities2.png",
        title: "Shops",
        tagline: "Everyday Convenience",
        description:
          "Convenient retail spaces bring everyday essentials closer, making daily errands easier for residents.",
        tags: ["Daily Essentials", "Walkable", "Time Saving"],
      },
      {
        id: "security",
        image: "/amenities/amenities.png",
        title: "Security Cabin with CCTV",
        tagline: "Safe & Secure",
        description:
          "CCTV monitored security creates confidence and added peace of mind for residents, day and night.",
        tags: ["Manned Entry", "CCTV Coverage", "Peace of Mind"],
      },
      {
        id: "play",
        image: "/amenities/amenities3.png",
        title: "Children's Play Area",
        tagline: "Play. Learn. Grow.",
        description:
          "A cheerful play space lets children explore, stay active and create happy memories together.",
        tags: ["Safe Play", "Open Air", "Kid Friendly"],
      },
      {
        id: "walking",
        image: "/amenities/amenities4.png",
        title: "Walking Track",
        tagline: "Move. Breathe. Recharge.",
        description:
          "A dedicated walking path encourages refreshing mornings, relaxed evenings and healthier everyday routines.",
        tags: ["Daily Fitness", "Well Laid", "Open Air"],
      },
      {
        id: "park",
        image: "/amenities/amenities5.png",
        title: "Park",
        tagline: "Green & Relaxing",
        description:
          "A peaceful green space offers fresh air, quiet moments and relaxing outdoor time close by.",
        tags: ["Green Space", "Relaxing", "Family Time"],
      },
      {
        id: "avenue",
        image: "/amenities/amenities6.png",
        title: "Avenue Trees",
        tagline: "Shaded, Landscaped Paths",
        description:
          "Lush avenue trees provide shade, freshness and a naturally welcoming feel throughout the community.",
        tags: ["Shaded Paths", "Fresh Air", "Landscaped"],
      },
      {
        id: "elevator",
        image: "/amenities/amenities7.png",
        title: "Elevator",
        tagline: "Effortless Access",
        description:
          "Effortless vertical access brings everyday convenience, comfort and smooth movement for every resident.",
        tags: ["6 Passenger", "Automatic", "All Floors"],
      },
      {
        id: "stp",
        image: "/amenities/amenities8.png",
        title: "Sewage Treatment Plant (STP)",
        tagline: "Sustainable Living",
        description:
          "Responsible wastewater management supports a cleaner, greener and healthier community for everyone each day.",
        tags: ["Eco Friendly", "Centralised", "Sustainable"],
      },
      {
        id: "parking",
        image: "/amenities/amenities9.png",
        title: "Car Parking",
        tagline: "Covered & Convenient",
        description:
          "Convenient parking spaces make arrivals and departures simple, smooth and stress free every day..",
        tags: ["Stilt Parking", "Numbered Slots", "Secure"],
      },
    ],

    floorPlansHeading: ["Homes Tailored", "to Your Needs"],
    floorPlansDescription:
      "Smartly designed 1 & 2 BHK apartments with efficient layouts, abundant natural light and optimal space utilisation.",
    floorPlansCtaLabel: "VIEW ALL PLANS",
    floorPlansCtaHref: "#floor-plans",

    // ---------- Nested Block structure (flat-number based, same as Privana) ----------
    floorPlanBlocks: [
      {
        id: "gurudev-block-a",
        label: "Gurudev",
        tag: "Ready to Move",
        tabs: ["1 BHK", "2 BHK"],
        plans: [
          // ============================
          // 1 BHK + 1T
          // ============================
          {
            id: "g-1bhk-103",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T1.jpeg",
            title: "1 BHK + 1T · Unit 103",
            type: "1 BHK",
            area: "425 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-3.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-104",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T2.jpeg",
            title: "1 BHK + 1T · Unit 104",
            type: "1 BHK",
            area: "419 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-4.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-105",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T3.jpeg",
            title: "1 BHK + 1T · Unit 105",
            type: "1 BHK",
            area: "491 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-5.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-106",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T4.jpeg",
            title: "1 BHK + 1T · Unit 106",
            type: "1 BHK",
            area: "391 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-6.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-107",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T5.jpeg",
            title: "1 BHK + 1T · Unit 107",
            type: "1 BHK",
            area: "408 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-7.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-108",
            image: "/floorplans/gurudev/1bhk1t/1bhk -1T6.jpeg",
            title: "1 BHK + 1T · Unit 108",
            type: "1 BHK",
            area: "460 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-8.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-109",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T7.jpeg",
            title: "1 BHK + 1T · Unit 109",
            type: "1 BHK",
            area: "440 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-9.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-112",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T8.jpeg",
            title: "1 BHK + 1T · Unit 112",
            type: "1 BHK",
            area: "425 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-10.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-113",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T9.jpeg",
            title: "1 BHK + 1T · Unit 113",
            type: "1 BHK",
            area: "419 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-11.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-114",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T10.jpeg",
            title: "1 BHK + 1T · Unit 114",
            type: "1 BHK",
            area: "491 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-12.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-115",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T11.jpeg",
            title: "1 BHK + 1T · Unit 115",
            type: "1 BHK",
            area: "391 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-13.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-116",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T12.jpeg",
            title: "1 BHK + 1T · Unit 116",
            type: "1 BHK",
            area: "408 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-14.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-117",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T13.jpeg",
            title: "1 BHK + 1T · Unit 117",
            type: "1 BHK",
            area: "460 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-15.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-118",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T14.jpeg",
            title: "1 BHK + 1T · Unit 118",
            type: "1 BHK",
            area: "440 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-16.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-203",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T15.jpeg",
            title: "1 BHK + 1T · Unit 203",
            type: "1 BHK",
            area: "425 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-17.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-204",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T16.jpeg",
            title: "1 BHK + 1T · Unit 204",
            type: "1 BHK",
            area: "419 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-18.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-205",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T17.jpeg",
            title: "1 BHK + 1T · Unit 205",
            type: "1 BHK",
            area: "491 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-19.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "g-1bhk-206",
            image: "/floorplans/gurudev/1bhk1t/1bhk-1T18.jpeg",
            title: "1 BHK + 1T · Unit 206",
            type: "1 BHK",
            area: "391 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-20.pdf",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },

          // ============================
          // 2 BHK + 2T
          // ============================
          {
            id: "g-2bhk-101",
            image: "/floorplans/gurudev/2bhk2t/2bhk-2T.jpeg",
            title: "2 BHK + 2T · Unit 101",
            type: "2 BHK",
            area: "730 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-1.pdf",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "g-2bhk-102",
            image: "/floorplans/gurudev/2bhk2t/2bhk-2T.jpeg",
            title: "2 BHK + 2T · Unit 102",
            type: "2 BHK",
            area: "730 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-2.pdf",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "g-2bhk-110",
            image: "/floorplans/gurudev/2bhk2t/2bhk-2T2.jpeg",
            title: "2 BHK + 2T · Unit 110",
            type: "2 BHK",
            area: "732 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-1.pdf",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "g-2bhk-111",
            image: "/floorplans/gurudev/2bhk2t/2bhk-2T2.jpeg",
            title: "2 BHK + 2T · Unit 111",
            type: "2 BHK",
            area: "732 Sq.Ft.",
            href: "/floor-plans/gurudev/flat-2.pdf",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
        ],
      },
    ],

    // ---------- Plot Sizes & Pricing (Gurudev — from price list) ----------
    plotPricingEyebrow: "INVEST WITH CONFIDENCE",
    plotPricingHeading: ["Unit Sizes", "& Pricing"],
    plotPricingDescription:
      "Complete, transparent pricing for every home at Gurudev — covering all 90 apartments across stilt + 5 floors. Final price includes car park, registration, and GST.",
    plotPricingCtaHeading: ["A Brighter", "Tomorrow Awaits"],
    plotPricingCtaText: "Secure your slice of a better lifestyle today.",
    plotPricingCtaImage: "/plot.png",
    plotPricingTabs: [
      { id: "all", label: "All Units" },
      { id: "1bhk", label: "1 BHK" },
      { id: "2bhk", label: "2 BHK" },
      { id: "east", label: "East Facing" },
      { id: "west", label: "West Facing" },
      { id: "sold", label: "Sold Out" },
      { id: "unsold", label: "Available" },
    ],
    plotPricing: [
      // Block A · 1st Floor
      { id: "101", flatNo: "101", block: "Block A", floor: "1st Floor", type: "2 BHK + 2T", facing: "East", status: "Sold", sqft: 730, uds: 359, basePrice: 3796000, otherCharges: 219000, ebStp: 200000, floorRise: 0, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4365000, reg: 270630, gst: 43650, finalTotal: 4679280, categories: ["2bhk", "east", "sold"] },
      { id: "102", flatNo: "102", block: "Block A", floor: "1st Floor", type: "2 BHK + 2T", facing: "East", status: "Sold", sqft: 730, uds: 359, basePrice: 3796000, otherCharges: 219000, ebStp: 200000, floorRise: 0, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4365000, reg: 270630, gst: 43650, finalTotal: 4679280, categories: ["2bhk", "east", "sold"] },
      { id: "103", flatNo: "103", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 425, uds: 209, basePrice: 2210000, otherCharges: 127500, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2487500, reg: 154225, gst: 24875, finalTotal: 2666600, categories: ["1bhk", "west", "unsold"] },
      { id: "104", flatNo: "104", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 419, uds: 206, basePrice: 2178800, otherCharges: 125700, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2479500, reg: 153729, gst: 24795, finalTotal: 2658024, categories: ["1bhk", "west", "unsold"] },
      { id: "105", flatNo: "105", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 491, uds: 241, basePrice: 2553200, otherCharges: 147300, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2875500, reg: 178281, gst: 28755, finalTotal: 3082536, categories: ["1bhk", "west", "unsold"] },
      { id: "106", flatNo: "106", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 391, uds: 192, basePrice: 2033200, otherCharges: 117300, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2325500, reg: 144181, gst: 23255, finalTotal: 2492936, categories: ["1bhk", "west", "unsold"] },
      { id: "107", flatNo: "107", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 408, uds: 200, basePrice: 2121600, otherCharges: 122400, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2419000, reg: 149978, gst: 24190, finalTotal: 2593168, categories: ["1bhk", "west", "unsold"] },
      { id: "108", flatNo: "108", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "East", status: "Sold", sqft: 460, uds: 226, basePrice: 2392000, otherCharges: 138000, ebStp: 150000, floorRise: 0, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2680000, reg: 166160, gst: 26800, finalTotal: 2872960, categories: ["1bhk", "east", "sold"] },
      { id: "109", flatNo: "109", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "East", status: "Sold", sqft: 440, uds: 216, basePrice: 2288000, otherCharges: 132000, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2570000, reg: 159340, gst: 25700, finalTotal: 2755040, categories: ["1bhk", "east", "sold"] },
      { id: "110", flatNo: "110", block: "Block A", floor: "1st Floor", type: "2 BHK + 2T", facing: "West", status: "Sold", sqft: 732, uds: 359, basePrice: 3806400, otherCharges: 219600, ebStp: 200000, floorRise: 0, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4376000, reg: 271312, gst: 43760, finalTotal: 4691072, categories: ["2bhk", "west", "sold"] },
      { id: "111", flatNo: "111", block: "Block A", floor: "1st Floor", type: "2 BHK + 2T", facing: "West", status: "Sold", sqft: 732, uds: 359, basePrice: 3806400, otherCharges: 219600, ebStp: 200000, floorRise: 0, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4376000, reg: 271312, gst: 43760, finalTotal: 4691072, categories: ["2bhk", "west", "sold"] },
      { id: "112", flatNo: "112", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "East", status: "Sold", sqft: 425, uds: 208, basePrice: 2210000, otherCharges: 127500, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2487500, reg: 154225, gst: 24875, finalTotal: 2666600, categories: ["1bhk", "east", "sold"] },
      { id: "113", flatNo: "113", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 419, uds: 206, basePrice: 2178800, otherCharges: 125700, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2479500, reg: 153729, gst: 24795, finalTotal: 2658024, categories: ["1bhk", "east", "unsold"] },
      { id: "114", flatNo: "114", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "East", status: "Sold", sqft: 491, uds: 241, basePrice: 2553200, otherCharges: 147300, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2875500, reg: 178281, gst: 28755, finalTotal: 3082536, categories: ["1bhk", "east", "sold"] },
      { id: "115", flatNo: "115", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 391, uds: 192, basePrice: 2033200, otherCharges: 117300, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2325500, reg: 144181, gst: 23255, finalTotal: 2492936, categories: ["1bhk", "east", "unsold"] },
      { id: "116", flatNo: "116", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 408, uds: 200, basePrice: 2121600, otherCharges: 122400, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2419000, reg: 149978, gst: 24190, finalTotal: 2593168, categories: ["1bhk", "east", "unsold"] },
      { id: "117", flatNo: "117", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "West", status: "Sold", sqft: 460, uds: 226, basePrice: 2392000, otherCharges: 138000, ebStp: 150000, floorRise: 0, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2705000, reg: 167710, gst: 27050, finalTotal: 2899760, categories: ["1bhk", "west", "sold"] },
      { id: "118", flatNo: "118", block: "Block A", floor: "1st Floor", type: "1 BHK + 1T", facing: "West", status: "Sold", sqft: 440, uds: 216, basePrice: 2288000, otherCharges: 132000, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2595000, reg: 160890, gst: 25950, finalTotal: 2781840, categories: ["1bhk", "west", "sold"] },
      // Block A · 2nd Floor
      { id: "201", flatNo: "201", block: "Block A", floor: "2nd Floor", type: "2 BHK + 2T", facing: "East", status: "Unsold", sqft: 730, uds: 359, basePrice: 3796000, otherCharges: 219000, ebStp: 200000, floorRise: 0, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4365000, reg: 270630, gst: 43650, finalTotal: 4679280, categories: ["2bhk", "east", "unsold"] },
      { id: "202", flatNo: "202", block: "Block A", floor: "2nd Floor", type: "2 BHK + 2T", facing: "East", status: "Sold", sqft: 730, uds: 359, basePrice: 3796000, otherCharges: 219000, ebStp: 200000, floorRise: 0, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4365000, reg: 270630, gst: 43650, finalTotal: 4679280, categories: ["2bhk", "east", "sold"] },
      { id: "203", flatNo: "203", block: "Block A", floor: "2nd Floor", type: "1 BHK + 1T", facing: "West", status: "Sold", sqft: 425, uds: 209, basePrice: 2210000, otherCharges: 127500, ebStp: 150000, floorRise: 150000, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2637500, reg: 163525, gst: 26375, finalTotal: 2827400, categories: ["1bhk", "west", "sold"] },
      { id: "204", flatNo: "204", block: "Block A", floor: "2nd Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 419, uds: 206, basePrice: 2178800, otherCharges: 125700, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2479500, reg: 153729, gst: 24795, finalTotal: 2658024, categories: ["1bhk", "west", "unsold"] },
      { id: "205", flatNo: "205", block: "Block A", floor: "2nd Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 491, uds: 241, basePrice: 2553200, otherCharges: 147300, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2875500, reg: 178281, gst: 28755, finalTotal: 3082536, categories: ["1bhk", "west", "unsold"] },
      { id: "206", flatNo: "206", block: "Block A", floor: "2nd Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 391, uds: 192, basePrice: 2033200, otherCharges: 117300, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2325500, reg: 144181, gst: 23255, finalTotal: 2492936, categories: ["1bhk", "west", "unsold"] },
      { id: "207", flatNo: "207", block: "Block A", floor: "2nd Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 408, uds: 200, basePrice: 2121600, otherCharges: 122400, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2419000, reg: 149978, gst: 24190, finalTotal: 2593168, categories: ["1bhk", "west", "unsold"] },
      { id: "208", flatNo: "208", block: "Block A", floor: "2nd Floor", type: "1 BHK + 1T", facing: "East", status: "Sold", sqft: 460, uds: 226, basePrice: 2392000, otherCharges: 138000, ebStp: 150000, floorRise: 0, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2680000, reg: 166160, gst: 26800, finalTotal: 2872960, categories: ["1bhk", "east", "sold"] },
      { id: "209", flatNo: "209", block: "Block A", floor: "2nd Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 440, uds: 216, basePrice: 2288000, otherCharges: 132000, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2595000, reg: 160890, gst: 25950, finalTotal: 2781840, categories: ["1bhk", "east", "unsold"] },
      { id: "210", flatNo: "210", block: "Block A", floor: "2nd Floor", type: "2 BHK + 2T", facing: "West", status: "Sold", sqft: 732, uds: 359, basePrice: 3806400, otherCharges: 219600, ebStp: 200000, floorRise: 0, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4376000, reg: 271312, gst: 43760, finalTotal: 4691072, categories: ["2bhk", "west", "sold"] },
      { id: "211", flatNo: "211", block: "Block A", floor: "2nd Floor", type: "2 BHK + 2T", facing: "West", status: "Sold", sqft: 732, uds: 359, basePrice: 3806400, otherCharges: 219600, ebStp: 200000, floorRise: 0, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4376000, reg: 271312, gst: 43760, finalTotal: 4691072, categories: ["2bhk", "west", "sold"] },
      // Block A · 4th Floor
      { id: "403", flatNo: "403", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 425, uds: 209, basePrice: 2210000, otherCharges: 127500, ebStp: 150000, floorRise: 0, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2487500, reg: 154225, gst: 24875, finalTotal: 2666600, categories: ["1bhk", "west", "unsold"] },
      { id: "404", flatNo: "404", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 419, uds: 206, basePrice: 2178800, otherCharges: 125700, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2479500, reg: 153729, gst: 24795, finalTotal: 2658024, categories: ["1bhk", "west", "unsold"] },
      { id: "405", flatNo: "405", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 491, uds: 241, basePrice: 2553200, otherCharges: 147300, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2875500, reg: 178281, gst: 28755, finalTotal: 3082536, categories: ["1bhk", "west", "unsold"] },
      { id: "406", flatNo: "406", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 391, uds: 192, basePrice: 2033200, otherCharges: 117300, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2325500, reg: 144181, gst: 23255, finalTotal: 2492936, categories: ["1bhk", "west", "unsold"] },
      { id: "407", flatNo: "407", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 408, uds: 200, basePrice: 2121600, otherCharges: 122400, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2419000, reg: 149978, gst: 24190, finalTotal: 2593168, categories: ["1bhk", "west", "unsold"] },
      { id: "408", flatNo: "408", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "East", status: "Sold", sqft: 460, uds: 226, basePrice: 2392000, otherCharges: 138000, ebStp: 150000, floorRise: 0, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2680000, reg: 166160, gst: 26800, finalTotal: 2872960, categories: ["1bhk", "east", "sold"] },
      { id: "409", flatNo: "409", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 440, uds: 216, basePrice: 2288000, otherCharges: 132000, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2570000, reg: 159340, gst: 25700, finalTotal: 2755040, categories: ["1bhk", "east", "unsold"] },
      { id: "410", flatNo: "410", block: "Block A", floor: "4th Floor", type: "2 BHK + 2T", facing: "West", status: "Unsold", sqft: 732, uds: 359, basePrice: 3806400, otherCharges: 219600, ebStp: 200000, floorRise: 0, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4376000, reg: 271312, gst: 43760, finalTotal: 4691072, categories: ["2bhk", "west", "unsold"] },
      { id: "411", flatNo: "411", block: "Block A", floor: "4th Floor", type: "2 BHK + 2T", facing: "West", status: "Unsold", sqft: 732, uds: 359, basePrice: 3806400, otherCharges: 219600, ebStp: 200000, floorRise: 0, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4376000, reg: 271312, gst: 43760, finalTotal: 4691072, categories: ["2bhk", "west", "unsold"] },
      { id: "412", flatNo: "412", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "East", status: "Sold", sqft: 425, uds: 208, basePrice: 2210000, otherCharges: 127500, ebStp: 150000, floorRise: 0, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2512500, reg: 155775, gst: 25125, finalTotal: 2693400, categories: ["1bhk", "east", "sold"] },
      { id: "413", flatNo: "413", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 419, uds: 206, basePrice: 2178800, otherCharges: 125700, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2479500, reg: 153729, gst: 24795, finalTotal: 2658024, categories: ["1bhk", "east", "unsold"] },
      { id: "414", flatNo: "414", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 491, uds: 241, basePrice: 2553200, otherCharges: 147300, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2875500, reg: 178281, gst: 28755, finalTotal: 3082536, categories: ["1bhk", "east", "unsold"] },
      { id: "415", flatNo: "415", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 391, uds: 192, basePrice: 2033200, otherCharges: 117300, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2325500, reg: 144181, gst: 23255, finalTotal: 2492936, categories: ["1bhk", "east", "unsold"] },
      { id: "416", flatNo: "416", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 408, uds: 200, basePrice: 2121600, otherCharges: 122400, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2419000, reg: 149978, gst: 24190, finalTotal: 2593168, categories: ["1bhk", "east", "unsold"] },
      { id: "417", flatNo: "417", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "West", status: "Sold", sqft: 460, uds: 226, basePrice: 2392000, otherCharges: 138000, ebStp: 150000, floorRise: 0, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2705000, reg: 167710, gst: 27050, finalTotal: 2899760, categories: ["1bhk", "west", "sold"] },
      { id: "418", flatNo: "418", block: "Block A", floor: "4th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 440, uds: 216, basePrice: 2288000, otherCharges: 132000, ebStp: 150000, floorRise: 0, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2595000, reg: 160890, gst: 25950, finalTotal: 2781840, categories: ["1bhk", "west", "unsold"] },
      // Block A · 5th Floor
      { id: "501", flatNo: "501", block: "Block A", floor: "5th Floor", type: "2 BHK + 2T", facing: "East", status: "Unsold", sqft: 730, uds: 359, basePrice: 3796000, otherCharges: 219000, ebStp: 200000, floorRise: 500000, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4865000, reg: 301630, gst: 48650, finalTotal: 5215280, categories: ["2bhk", "east", "unsold"] },
      { id: "502", flatNo: "502", block: "Block A", floor: "5th Floor", type: "2 BHK + 2T", facing: "East", status: "Unsold", sqft: 730, uds: 359, basePrice: 3796000, otherCharges: 219000, ebStp: 200000, floorRise: 500000, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4865000, reg: 301630, gst: 48650, finalTotal: 5215280, categories: ["2bhk", "east", "unsold"] },
      { id: "503", flatNo: "503", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 425, uds: 209, basePrice: 2210000, otherCharges: 127500, ebStp: 150000, floorRise: 300000, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2812500, reg: 174375, gst: 28125, finalTotal: 3015000, categories: ["1bhk", "west", "unsold"] },
      { id: "504", flatNo: "504", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 419, uds: 206, basePrice: 2178800, otherCharges: 125700, ebStp: 150000, floorRise: 300000, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2779500, reg: 172329, gst: 27795, finalTotal: 2979624, categories: ["1bhk", "west", "unsold"] },
      { id: "505", flatNo: "505", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 491, uds: 241, basePrice: 2553200, otherCharges: 147300, ebStp: 150000, floorRise: 300000, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 3175500, reg: 196881, gst: 31755, finalTotal: 3404136, categories: ["1bhk", "west", "unsold"] },
      { id: "506", flatNo: "506", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 391, uds: 192, basePrice: 2033200, otherCharges: 117300, ebStp: 150000, floorRise: 300000, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2625500, reg: 162781, gst: 26255, finalTotal: 2814536, categories: ["1bhk", "west", "unsold"] },
      { id: "507", flatNo: "507", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 408, uds: 200, basePrice: 2121600, otherCharges: 122400, ebStp: 150000, floorRise: 300000, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2719000, reg: 168578, gst: 27190, finalTotal: 2914768, categories: ["1bhk", "west", "unsold"] },
      { id: "508", flatNo: "508", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 460, uds: 226, basePrice: 2392000, otherCharges: 138000, ebStp: 150000, floorRise: 300000, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 3005000, reg: 186310, gst: 30050, finalTotal: 3221360, categories: ["1bhk", "east", "unsold"] },
      { id: "509", flatNo: "509", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "East", status: "Sold", sqft: 440, uds: 216, basePrice: 2288000, otherCharges: 132000, ebStp: 150000, floorRise: 300000, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2895000, reg: 179490, gst: 28950, finalTotal: 3103440, categories: ["1bhk", "east", "sold"] },
      { id: "510", flatNo: "510", block: "Block A", floor: "5th Floor", type: "2 BHK + 2T", facing: "West", status: "Unsold", sqft: 732, uds: 359, basePrice: 3806400, otherCharges: 219600, ebStp: 200000, floorRise: 500000, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4876000, reg: 302312, gst: 48760, finalTotal: 5227072, categories: ["2bhk", "west", "unsold"] },
      { id: "511", flatNo: "511", block: "Block A", floor: "5th Floor", type: "2 BHK + 2T", facing: "West", status: "Unsold", sqft: 732, uds: 359, basePrice: 3806400, otherCharges: 219600, ebStp: 200000, floorRise: 500000, carParkType: "Covered", carParkPrice: 150000, twParkType: "Open", twParkPrice: 0, total: 4876000, reg: 302312, gst: 48760, finalTotal: 5227072, categories: ["2bhk", "west", "unsold"] },
      { id: "512", flatNo: "512", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 425, uds: 208, basePrice: 2210000, otherCharges: 127500, ebStp: 150000, floorRise: 300000, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 0, total: 2812500, reg: 174375, gst: 28125, finalTotal: 3015000, categories: ["1bhk", "east", "unsold"] },
      { id: "513", flatNo: "513", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 419, uds: 206, basePrice: 2178800, otherCharges: 125700, ebStp: 150000, floorRise: 300000, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2779500, reg: 172329, gst: 27795, finalTotal: 2979624, categories: ["1bhk", "east", "unsold"] },
      { id: "514", flatNo: "514", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 491, uds: 241, basePrice: 2553200, otherCharges: 147300, ebStp: 150000, floorRise: 300000, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 3175500, reg: 196881, gst: 31755, finalTotal: 3404136, categories: ["1bhk", "east", "unsold"] },
      { id: "515", flatNo: "515", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 391, uds: 192, basePrice: 2033200, otherCharges: 117300, ebStp: 150000, floorRise: 300000, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2625500, reg: 162781, gst: 26255, finalTotal: 2814536, categories: ["1bhk", "east", "unsold"] },
      { id: "516", flatNo: "516", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "East", status: "Unsold", sqft: 408, uds: 200, basePrice: 2121600, otherCharges: 122400, ebStp: 150000, floorRise: 300000, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2719000, reg: 168578, gst: 27190, finalTotal: 2914768, categories: ["1bhk", "east", "unsold"] },
      { id: "517", flatNo: "517", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 460, uds: 226, basePrice: 2392000, otherCharges: 138000, ebStp: 150000, floorRise: 300000, carParkType: "Covered", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 3005000, reg: 186310, gst: 30050, finalTotal: 3221360, categories: ["1bhk", "west", "unsold"] },
      { id: "518", flatNo: "518", block: "Block A", floor: "5th Floor", type: "1 BHK + 1T", facing: "West", status: "Unsold", sqft: 440, uds: 216, basePrice: 2288000, otherCharges: 132000, ebStp: 150000, floorRise: 300000, carParkType: "", carParkPrice: 0, twParkType: "Covered", twParkPrice: 25000, total: 2895000, reg: 179490, gst: 28950, finalTotal: 3103440, categories: ["1bhk", "west", "unsold"] },
    ],

    // Fallback flat tabs (used only if floorPlanBlocks is removed)
    floorPlanTabs: [],
    floorPlans: [],

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

    // ---------- Brochure (shown after the enquiry form is submitted) ----------
    // File must exist at: public/brochures/gurudev.pdf
    brochureUrl: "/brochures/gurudev.pdf",

    // ---------- Gurudev-specific Quick Facts (6 cards) ----------
    quickFacts: [
      { label: "Type",              value: "1 & 2 BHK Apartments",         icon: "type" },
      { label: "Development Size",  value: "11.57 Acres",                  icon: "size" },
      { label: "No. of Units",      value: "90",                           icon: "units" },
      { label: "Price / Sq.Ft",     value: "₹ 6199 per / Sq.Ft",           icon: "price" },
      { label: "Floors",            value: "Stilt + 5",                    icon: "floors" },
      { label: "RERA Number",       value: "TN/01/Building/0041/2023 | Dtd. 20/01/2023",       icon: "rera" },
    ],

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
      { title: "Balcony", items: [{ label: "Handrail", value: "MS handrail as per architect's design" }] },
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
    // ✅ UPDATED: New Google Maps embed URL for Gurudev
    locationMapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.429674817847!2d80.08094917585561!3d12.815487918280196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f7ad0f45d7c3%3A0xfafdd8623a0ace37!2spkr%20estates%20GURUDEV!5e0!3m2!1sen!2sin!4v1790074260318!5m2!1sen!2sin",
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

    // ---------- 360 Cinematic Tour ----------
    tourEyebrow: "EXPLORE BEFORE YOU BELONG",
    tourHeading: ["Experience Gurudev", "in 360°"],
    tourDescription:
      "Take a virtual tour and explore the spaces, views and lifestyle that await you. Get a real feel of Gurudev from anywhere, anytime.",
    tourCtaLabel: "Start 360° Tour",
    tourThumbnail: "/gurudevthumb.png",
    tour360Image: "/360.png",
    tourUrl: "https://example.com/gurudev-360-tour",
    tourTagline: ["See it,", "Feel it,", "Live it."],

    corporateOffice: {
      lines: ["Flat A10, Archana Castle, 4/23 Patrick Church Road,", "St. Thomas Mount, Chennai 600016"],
      phone: "95 43 63 33 33",
      website: "www.pkrestates.com",
    },
  },

  // ============================================================
  // PRIVANA
  // ============================================================
  {
    slug: "privana",
    name: "Privana",
    tagline: "Modern living, thoughtfully designed for the way you live today",
    location: "Chennai, Tamil Nadu",
    heroImage: "/upprivana.jpeg",
    heroImageMobile: "/priv.png",
    aboutImage: "/privabout.png",

    eyebrow: "MORE THAN JUST A HOME",
    heading: ["Designed for a", "Better Way of Life"],
    description:
      "Privana brings together contemporary architecture, premium finishes and a thoughtfully curated set of amenities in one refined residential address. Every home is planned around natural light, cross ventilation and efficient layouts, giving you more usable space and a calmer everyday rhythm.",
    ctaLabel: "OUR STORY",
    ctaHref: "#our-story",
    overlayWords: ["Live", "Connect", "Belong"],
    overlayAt: "Privana",

    salientFeatures: [
      "Thoughtfully designed Studio, 1 & 2 BHK homes",
      "Multiple blocks with dedicated unit types",
      "Vaastu-compliant layouts with abundant natural light",
      "Close to schools, IT parks, hospitals and retail",
    ],

    stats: [
      { id: "years", value: "77+", label: "YEARS OF TRUST" },
      { id: "projects", value: "120+", label: "LANDMARK PROJECTS" },
      { id: "sqft", value: "7M+", label: "SQ.FT. SPACE DELIVERED" },
      { id: "communities", value: "44+", label: "HAPPY COMMUNITIES" },
    ],

    // ---------- Amenities (Privana) ----------
    amenitiesEyebrow: "LIFE AT PRIVANA",
    amenitiesHeading: ["Everyday Comforts,", "Exceptional Living"],
    amenitiesDescription:
      "At Privana, every amenity is designed to make daily life easier and more enjoyable — from landscaped green spaces to a full suite of community facilities for every age group.",
    amenitiesCtaLabel: "VIEW ALL AMENITIES",
    amenitiesCtaHref: "#amenities",
    amenities: [
      {
        id: "Outdoor Movie Nights",
        image: "/amenities/privana6.png",
        title: "Outdoor Movie Nights",
        tagline: "Stories Under The Stars",
        description:
          "An open-air screening area where residents gather under the stars to enjoy movies, fostering a warm and connected community spirit.",
        tags: ["Entertainment", "Community", "Open Air"],
      },
      {
        id: "Banquet Hall",
        image: "/amenities/privana1.png",
        title: "Banquet Hall",
        tagline: "Celebrate In Style",
        description:
          "A sophisticated and spacious venue designed to host memorable celebrations, from grand weddings to intimate gatherings, with elegance and ease.",
        tags: ["Events", "Celebrations", "Elegant"],
      },
      {
        id: "club",
        image: "/amenities/privana2.png",
        title: "Club House",
        tagline: "Gather & Celebrate",
        description:
          "A dedicated indoor space for leisure and fun, featuring games like billiards and chess for residents to unwind and connect.",
        tags: ["Events", "Community", "Social"],
      },
      {
        id: "Gym",
        image: "/amenities/privana3.png",
        title: "Gym",
        tagline: "Stay Fit, Stay Strong",
        description:
          "A fully-equipped space designed to help you stay active, build strength, and reach your fitness goals without leaving the community.",
        tags: ["Fitness", "Strength", "Wellness"],
      },
      {
        id: "Kids' Play Area",
        image: "/amenities/privana4.png",
        title: "Kids' Play Area",
        tagline: "Play. Learn. Grow.",
        description:
          "A vibrant, safe, and thoughtfully designed indoor space where children can explore, imagine, and play freely.",
        tags: ["Safe Play", "Kid Friendly", "Fun"],
      },
      {
        id: "Elevators",
        image: "/amenities/privana5.png",
        title: "Elevators",
        tagline: "Effortless Access",
        description:
          "High-speed, spacious elevators ensuring smooth and effortless access to every floor, making daily commutes comfortable for all residents.",
        tags: ["Convenience", "Safety", "Accessibility"],
      },
      {
        id: "Basketball Court",
        image: "/amenities/privana7.png",
        title: "Basketball Court",
        tagline: "Shoot Hoops & Stay Active",
        description:
          "A well-maintained outdoor court for residents to shoot hoops, stay active, and enjoy friendly matches with neighbours.",
        tags: ["Sports", "Active Lifestyle", "Outdoor"],
      },
    ],

    floorPlansHeading: ["Homes Tailored", "to Your Needs"],
    floorPlansDescription:
      "Choose from a range of thoughtfully designed layouts across multiple blocks — from efficient studios to spacious 2 BHK homes, each crafted for comfort and functionality.",
    floorPlansCtaLabel: "VIEW ALL PLANS",
    floorPlansCtaHref: "#floor-plans",

    // ---------- Nested Block structure ----------
    floorPlanBlocks: [
      {
        id: "block-a",
        label: "Block A",
        tag: "Under construction",
        tabs: ["Studio", "1 BHK", "2 BHK", "2 BHK + 2T"],
        plans: [
          // Studio
          {
            id: "a-studio-105",
            image: "/floorplans/privana/studio/A105.webp",
            title: "Studio · Unit A105",
            type: "Studio",
            area: "—",
            href: "#",
            facing: "East",
            features: [
              { icon: "bed", label: "Studio Room" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living / Kitchenette" },
            ],
          },
          {
            id: "a-studio-112",
            image: "/floorplans/privana/studio/A112.webp",
            title: "Studio · Unit A112",
            type: "Studio",
            area: "—",
            href: "#",
            facing: "West",
            features: [
              { icon: "bed", label: "Studio Room" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living / Kitchenette" },
            ],
          },
          {
            id: "a-studio-209-509",
            image: "/floorplans/privana/studio/A209-A509.webp",
            title: "Studio · Units A209–A509",
            type: "Studio",
            area: "—",
            href: "#",
            facing: "South",
            features: [
              { icon: "bed", label: "Studio Room" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living / Kitchenette" },
            ],
          },
          {
            id: "a-studio-216-516",
            image: "/floorplans/privana/studio/A216-A516.webp",
            title: "Studio · Units A216–A516",
            type: "Studio",
            area: "—",
            href: "#",
            facing: "West",
            features: [
              { icon: "bed", label: "Studio Room" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living / Kitchenette" },
            ],
          },

          // 1 BHK
          {
            id: "a-1bhk-106",
            image: "/floorplans/privana/A106.webp",
            title: "1 BHK · Unit A106",
            type: "1 BHK",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "a-1bhk-109",
            image: "/floorplans/privana/A109.webp",
            title: "1 BHK · Unit A109",
            type: "1 BHK",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "a-1bhk-207-507",
            image: "/floorplans/privana/A207-A507.webp",
            title: "1 BHK · Units A207–A507",
            type: "1 BHK",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "a-1bhk-210-510",
            image: "/floorplans/privana/A210-A510.webp",
            title: "1 BHK · Units A210–A510",
            type: "1 BHK",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "a-1bhk-213-513",
            image: "/floorplans/privana/A213-A513.webp",
            title: "1 BHK · Units A213–A513",
            type: "1 BHK",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },

          // 2 BHK
          {
            id: "a-2bhk-107",
            image: "/floorplans/privana/2bhk/A107.webp",
            title: "2 BHK · Unit A107",
            type: "2 BHK",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk-108",
            image: "/floorplans/privana/2bhk/A108.webp",
            title: "2 BHK · Unit A108",
            type: "2 BHK",
            area: "—",
            href: "#",
            facing: "South",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk-110",
            image: "/floorplans/privana/2bhk/A110.webp",
            title: "2 BHK · Unit A110",
            type: "2 BHK",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk-206-506",
            image: "/floorplans/privana/2bhk/A206-A506.webp",
            title: "2 BHK · Units A206–A506",
            type: "2 BHK",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk-211-511",
            image: "/floorplans/privana/2bhk/A211-A511.webp",
            title: "2 BHK · Units A211–A511",
            type: "2 BHK",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk-212-512",
            image: "/floorplans/privana/2bhk/A212-A512.webp",
            title: "2 BHK · Units A212–A512",
            type: "2 BHK",
            area: "—",
            href: "#",
            facing: "South",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk-214-514",
            image: "/floorplans/privana/2bhk/A214-A514.webp",
            title: "2 BHK · Units A214–A514",
            type: "2 BHK",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },

          // 2 BHK + 2T
          {
            id: "a-2bhk2t-101-501",
            image: "/floorplans/privana/2bhk 2t/A101-A501.webp",
            title: "2 BHK + 2T · Units A101–A501",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "East",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-102-502",
            image: "/floorplans/privana/2bhk 2t/A102-A502.webp",
            title: "2 BHK + 2T · Units A102–A502",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "East",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-103",
            image: "/floorplans/privana/2bhk 2t/A103.webp",
            title: "2 BHK + 2T · Unit A103",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "East",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-104-504",
            image: "/floorplans/privana/2bhk 2t/A104-A504.webp",
            title: "2 BHK + 2T · Units A104–A504",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "East",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-111",
            image: "/floorplans/privana/2bhk 2t/A111.webp",
            title: "2 BHK + 2T · Unit A111",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "South",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-113",
            image: "/floorplans/privana/2bhk 2t/A113.webp",
            title: "2 BHK + 2T · Unit A113",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-203-503",
            image: "/floorplans/privana/2bhk 2t/A203-503.webp",
            title: "2 BHK + 2T · Units A203–A503",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "East",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-205",
            image: "/floorplans/privana/2bhk 2t/A205.webp",
            title: "2 BHK + 2T · Unit A205",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "East",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-208",
            image: "/floorplans/privana/2bhk 2t/A208.webp",
            title: "2 BHK + 2T · Unit A208",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "South",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-215-515",
            image: "/floorplans/privana/2bhk 2t/A215-A515.webp",
            title: "2 BHK + 2T · Units A215–A515",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "South",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-217-517",
            image: "/floorplans/privana/2bhk 2t/A217-A517.webp",
            title: "2 BHK + 2T · Units A217–A517",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "North",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-305-505",
            image: "/floorplans/privana/2bhk 2t/A305-A505.webp",
            title: "2 BHK + 2T · Units A305–A505",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "East",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "a-2bhk2t-308-508",
            image: "/floorplans/privana/2bhk 2t/A308-A508.webp",
            title: "2 BHK + 2T · Units A308–A508",
            type: "2 BHK + 2T",
            area: "—",
            href: "#",
            facing: "South",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
        ],
      },
      {
        id: "block-b",
        label: "Block B",
        tag: "Under Construction",
        tabs: ["1 BHK", "2 BHK 1T", "2 BHK 2T", "3 BHK"],
        plans: [
          // 1 BHK
          {
            id: "b-1bhk-106",
            image: "/floorplans/privana/block-b/1bhk/B106.webp",
            title: "1 BHK · Unit B106 - B506",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-108",
            image: "/floorplans/privana/block-b/1bhk/B108.webp",
            title: "1 BHK · Unit B108",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-109-509",
            image: "/floorplans/privana/block-b/1bhk/B109TO 509.webp",
            title: "1 BHK · Units B109–B509",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-110",
            image: "/floorplans/privana/block-b/1bhk/B110.webp",
            title: "1 BHK · Unit B110",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-111",
            image: "/floorplans/privana/block-b/1bhk/B111.webp",
            title: "1 BHK · Unit B111",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-112",
            image: "/floorplans/privana/block-b/1bhk/B112.webp",
            title: "1 BHK · Unit B112",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-114",
            image: "/floorplans/privana/block-b/1bhk/B114 (2).webp",
            title: "1 BHK · Unit B114",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-115",
            image: "/floorplans/privana/block-b/1bhk/B115.webp",
            title: "1 BHK · Unit B115",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-116",
            image: "/floorplans/privana/block-b/1bhk/B116.webp",
            title: "1 BHK · Unit B116",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-208-508",
            image: "/floorplans/privana/block-b/1bhk/B208-B508.webp",
            title: "1 BHK · Units B208–B508",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-210-510",
            image: "/floorplans/privana/block-b/1bhk/B210-510.webp",
            title: "1 BHK · Units B210–B510",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-211-511",
            image: "/floorplans/privana/block-b/1bhk/b211-b511.webp",
            title: "1 BHK · Units B211–B511",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-212-512",
            image: "/floorplans/privana/block-b/1bhk/B212-B512.webp",
            title: "1 BHK · Units B212–B512",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-214-514",
            image: "/floorplans/privana/block-b/1bhk/B214-B514.webp",
            title: "1 BHK · Units B214–B514",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-215-515",
            image: "/floorplans/privana/block-b/1bhk/B215-B515.webp",
            title: "1 BHK · Units B215–B515",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },
          {
            id: "b-1bhk-216-516",
            image: "/floorplans/privana/block-b/1bhk/B216-B516.webp",
            title: "1 BHK · Units B216–B516",
            type: "1 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "1 Bedroom" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living Room / Kitchen" },
            ],
          },

          // 2 BHK 1T
          {
            id: "b-2bhk1t-102",
            image: "/floorplans/privana/block-b/2bhk1t/B102.webp",
            title: "2 BHK + 1T · Unit B102",
            type: "2 BHK 1T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk1t-103",
            image: "/floorplans/privana/block-b/2bhk1t/B103.webp",
            title: "2 BHK + 1T · Unit B103",
            type: "2 BHK 1T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk1t-107",
            image: "/floorplans/privana/block-b/2bhk1t/B107.webp",
            title: "2 BHK + 1T · Unit B107-B507",
            type: "2 BHK 1T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk1t-202-502",
            image: "/floorplans/privana/block-b/2bhk1t/B202-B502.webp",
            title: "2 BHK + 1T · Units B202–B502",
            type: "2 BHK 1T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk1t-203-503",
            image: "/floorplans/privana/block-b/2bhk1t/B203-B503.webp",
            title: "2 BHK + 1T · Units B203–B503",
            type: "2 BHK 1T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "1 Toilet" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },

          // 2 BHK 2T
          {
            id: "b-2bhk2t-101",
            image: "/floorplans/privana/block-b/2bhk2t/B101.webp",
            title: "2 BHK + 2T · Unit B101",
            type: "2 BHK 2T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk2t-105",
            image: "/floorplans/privana/block-b/2bhk2t/B105.webp",
            title: "2 BHK + 2T · Unit B105-B505",
            type: "2 BHK 2T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk2t-113",
            image: "/floorplans/privana/block-b/2bhk2t/B113.webp",
            title: "2 BHK + 2T · Unit B113",
            type: "2 BHK 2T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk2t-117",
            image: "/floorplans/privana/block-b/2bhk2t/B117.webp",
            title: "2 BHK + 2T · Unit B117",
            type: "2 BHK 2T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk2t-118",
            image: "/floorplans/privana/block-b/2bhk2t/B118.webp",
            title: "2 BHK + 2T · Unit B118",
            type: "2 BHK 2T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk2t-119",
            image: "/floorplans/privana/block-b/2bhk2t/B119.webp",
            title: "2 BHK + 2T · Unit B119",
            type: "2 BHK 2T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk2t-201-501",
            image: "/floorplans/privana/block-b/2bhk2t/B201-B501.webp",
            title: "2 BHK + 2T · Units B201–B501",
            type: "2 BHK 2T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk2t-213-513",
            image: "/floorplans/privana/block-b/2bhk2t/B213-B513.webp",
            title: "2 BHK + 2T · Units B213–B513",
            type: "2 BHK 2T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk2t-217-517",
            image: "/floorplans/privana/block-b/2bhk2t/B217-B517.webp",
            title: "2 BHK + 2T · Units B217–B517",
            type: "2 BHK 2T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk2t-218-518",
            image: "/floorplans/privana/block-b/2bhk2t/B218-B518.webp",
            title: "2 BHK + 2T · Units B218–B518",
            type: "2 BHK 2T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
          {
            id: "b-2bhk2t-219-519",
            image: "/floorplans/privana/block-b/2bhk2t/B219-B519.webp",
            title: "2 BHK + 2T · Units B219–B519",
            type: "2 BHK 2T",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "2 Bedrooms" },
              { icon: "bath", label: "2 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },

          // 3 BHK
          {
            id: "b-3bhk-301",
            image: "/floorplans/privana/block-b/3bhk/B104.webp",
            title: "3 BHK · Unit B104-B504",
            type: "3 BHK",
            area: "—",
            href: "#",
            features: [
              { icon: "bed", label: "3 Bedrooms" },
              { icon: "bath", label: "3 Toilets" },
              { icon: "living", label: "Living cum Dining" },
            ],
          },
        ],
      },
    ],

    // Fallback flat tabs (used only if floorPlanBlocks is removed)
    floorPlanTabs: [],
    floorPlans: [],

    // ---------- Master Plan (Site Plan + Parking Plan) ----------
    masterPlan: {
      eyebrow: "MASTER PLAN",
      heading: ["Thoughtfully Planned", "Site & Parking Layout"],
      description:
        "Every block, driveway and green pocket at Privana is planned around ease of movement, safety and open, breathable spaces. Explore the full site layout and the dedicated parking plan below.",
      // highlights: [
      //   { label: "Site Area", value: "3.2 Acres" },
      //   { label: "Open Space", value: "55%" },
      //   { label: "Blocks", value: "2 (A & B)" },
      //   { label: "Covered Parking", value: "140+ Cars" },
      // ],
      tabs: [
        {
          id: "site",
          label: "Site Plan",
          video: "/siteplan.mp4",
          image: "/siteplan.png",
        },
        {
          id: "parking",
          label: "Parking Plan",
          video: "/parkingplan.mp4",
          image: "/parkingplan.png",
        },
      ],
    },

    // ---------- Gallery ----------
    galleryHeading: ["A Glimpse", "Into Your", "Tomorrow"],
    galleryCtaHref: "#gallery",
    galleryFilters: ["All", "Exteriors", "Interiors", "Amenities", "Lifestyle"],
    galleryImages: [
      { id: "p1", image: "/spyka1.png", title: "Privana — Elevation", category: "Exteriors", size: "large" },
      { id: "p2", image: "/spyka2.png", title: "Privana — Entrance", category: "Exteriors", size: "small" },
      { id: "p3", image: "/spyka3.png", title: "Living Spaces", category: "Interiors", size: "small" },
    ],
    gallery: ["/priv1.png", "/privanaban.jpeg", "/gurudev3.png"],

    // ---------- Project facts ----------
    floors: "Stilt + 5",
    totalUnits: 120,
    unitTypes: [
      { type: "Studio", count: 20, sizeRange: "360 - 380 sqft" },
      { type: "1 BHK", count: 40, sizeRange: "480 - 500 sqft" },
      { type: "2 BHK", count: 40, sizeRange: "720 - 745 sqft" },
    ],
    nearbyLandmarks: [
      { name: "Guduvancheri Railway Station", distance: "5 mins" },
      { name: "GST Road", distance: "8 mins" },
      { name: "Chennai Trade Centre", distance: "20 mins" },
    ],
    possession: "Dec 2026",
    reraId: "TN/35/Building/0000/2025",

    // ---------- Brochure ----------
    // No brochure yet → "Download Brochure" button is hidden.
    // When ready, add the PDF to public/brochures/privana.pdf and set:
    // brochureUrl: "/brochures/privana.pdf",
    brochureUrl: null,

    // ---------- Privana-specific Quick Facts (6 cards) ----------
    quickFacts: [
      { label: "Type",              value: "Studio, 1 & 2 BHK + 2T",           icon: "type" },
      { label: "Development Size",  value: "3.2 Acres",                    icon: "size" },
      { label: "No. of Units",      value: "120",                          icon: "units" },
      { label: "Price / Sq.Ft",     value: "₹ 5,100 per / Sq.Ft",          icon: "price" },
      { label: "Floors",            value: "Stilt + 5",                    icon: "floors" },
      { label: "RERA Number",       value: "TNRERA/35/BLG/0317/2026  dated 03.09.2026",     icon: "rera" },
    ],

    specifications: [],

    // ---------- Location ----------
    locationHeading: ["Well Connected", "for a Brighter You"],
    locationDescription:
      "Privana sits at the heart of a fast-growing neighbourhood, close to schools, IT parks, hospitals and retail. Excellent road and rail connectivity makes everyday commuting simple and stress-free.",
    locationMapUrl: "https://maps.google.com/?q=Guduvancheri+Chennai",
    locationMapImage: "",
    // ✅ UPDATED: New Google Maps embed URL specifically for PKR ESTATES PRIVANA
    locationMapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.4538000050293!2d80.08783897585568!3d12.81392591831403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f700792510ff%3A0x3b167532aa06e06c!2sPKR%20ESTATES%20PRIVANA!5e0!3m2!1sen!2sin!4v1790075321648!5m2!1sen!2sin",
    locationLandmarks: [
      { label: "Guduvancheri (GST Road)", distance: "5 mins" },
      { label: "Urapakkam", distance: "10 mins" },
      { label: "Vandalur", distance: "10 mins" },
      { label: "Perungalathur", distance: "15 mins" },
      { label: "OMR - Thiruporur", distance: "15 mins" },
      { label: "Tambaram", distance: "20 mins" },
    ],
    nearbyColleges: [
      { label: "SRM University", distance: "8 mins" },
      { label: "Crescent Engineering College", distance: "12 mins" },
      { label: "VIT University", distance: "20 mins" },
    ],
    nearbySchools: [
      { label: "Velammal Vidhyashram CBSE", distance: "2 mins" },
      { label: "SRM Public School CBSE", distance: "5 mins" },
      { label: "PSBB Millennium School CBSE", distance: "10 mins" },
    ],

    // ---------- 360 Cinematic Tour ----------
    tourEyebrow: "EXPLORE BEFORE YOU BELONG",
    tourHeading: ["Experience Privana", "in 360°"],
    tourDescription:
      "Take a virtual tour and explore the spaces, views and lifestyle that await you at Privana. Get a real feel of your future home from anywhere, anytime.",
    tourCtaLabel: "Start 360° Tour",
    tourThumbnail: "/spykathumbnail.png",
    tour360Image: "/spyka360.jpeg",
    tourUrl: "https://example.com/privana-360-tour",
    tourTagline: ["See it,", "Feel it,", "Live it."],

    corporateOffice: null,
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
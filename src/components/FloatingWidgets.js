"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Building2, CheckCircle2, Calculator, Info, Phone, Mail, Globe, MapPin, X,
  Send, ChevronRight, ChevronDown, Check, AlertTriangle, Home, LayoutGrid, Ruler, Leaf,
  Hammer, FileText, IndianRupee, Share2, Camera, Play, Building, ShieldCheck,
  Sparkles, ArrowUp, Plus, SquarePen, Copy, CornerDownLeft, Clock, History,
  MessageSquare, Trash2, BedDouble, Bath, Sofa, Toilet, CookingPot, Fence,
  Navigation, Navigation2, Compass, RefreshCw, Expand, ZoomIn, ZoomOut, Eye,
} from "lucide-react";
import { projects as PROJECT_DATA } from "@/data/projects"; // if "@/" alias isn't set up, use "../data/projects"

const LOGO_URL = "/3dlogo.png";
const GREETING_LOGO_URL = "/3dlogo2.png"; // separate image just for the "how can I help?" greeting screen — swap this path independently

// ============ THEME TOKENS ============
const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const DEEP_NAVY_DARK = "#0A2B50";
const DEEP_NAVY_LIGHT = "#4A6FA5";
const ELECTRIC = "#3B82F6";
const CYAN = "#22D3EE";
const VIOLET = "#8B5CF6";
const TEXT_CHARCOAL = "#2D3A46";
const LIGHT_BLUE = "#E8F0F9";
const LIGHT_BLUE_SOFT = "#F0F6FC";
const LINE = "#E6E9EE";
const CANVAS = "#FAFAF9";
const SERIF = 'ui-serif, "Iowan Old Style", "Palatino Linotype", Georgia, "Times New Roman", serif';

const ENQUIRY_API = "https://gurudev.pkrestates.com/api/backend/submit-enquiry";
const CHATBOT_INIT_API = "https://gurudev.pkrestates.com/api/backend/chatbot/init";
const CHATBOT_CHAT_API = "https://gurudev.pkrestates.com/api/backend/chatbot/chat";
const CHATBOT_HISTORY_API = "https://gurudev.pkrestates.com/api/backend/chatbot/history";
const INQUIRY_TYPES = ["General Enquiry", "Gurudev", "Privana"];
const SESSION_STORAGE_KEY = "chatbot_session_id";
const SESSIONS_INDEX_KEY = "chatbot_sessions_index"; 
const WHATSAPP_NUMBER = "919381055555";

const FORCE_SESSION_ID = null;

/* ------------------------------------------------------------------ */
/*  GLOBAL ANIMATIONS + MOBILE HERO OVERRIDES                          */
/* ------------------------------------------------------------------ */
const GLOBAL_STYLES = `
@keyframes pkrFadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pkrOverlayIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes pkrPanelIn { from { opacity: 0; transform: translateY(18px) scale(.975); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes pkrSlideInLeft { from { opacity: 0; transform: translateX(-16px); } to { opacity: 1; transform: translateX(0); } }
@keyframes pkrShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
@keyframes pkrFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
.pkr-fade-up { animation: pkrFadeUp .38s cubic-bezier(.22,1,.36,1) both; }
.pkr-slide-left { animation: pkrSlideInLeft .28s cubic-bezier(.22,1,.36,1) both; }
.pkr-shimmer-text {
  background: linear-gradient(90deg, #94A3B8 0%, #0F3A6B 40%, #94A3B8 80%);
  background-size: 200% 100%;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: pkrShimmer 1.8s linear infinite;
}
.pkr-scroll::-webkit-scrollbar { width: 8px; }
.pkr-scroll::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 99px; border: 2px solid transparent; background-clip: padding-box; }
.pkr-hscroll { scrollbar-width: none; }
.pkr-hscroll::-webkit-scrollbar { display: none; }
.pkr-range { -webkit-appearance: none; appearance: none; width: 100%; height: 4px; border-radius: 99px; background: #E2E8F0; outline: none; }
.pkr-range::-webkit-slider-thumb { -webkit-appearance: none; width: 16px; height: 16px; border-radius: 50%; background: #0F3A6B; box-shadow: 0 0 0 4px rgba(15,58,107,.12); cursor: pointer; }
.pkr-range::-moz-range-thumb { width: 16px; height: 16px; border: 0; border-radius: 50%; background: #0F3A6B; cursor: pointer; }
`;

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */
function buildWhatsAppUrl({ name, phone, inquiryType, message }) {
  const lines = [
    `Hi PKR Estates, I'm ${name || "a visitor"}.`,
    inquiryType ? `I'm interested in: ${inquiryType}.` : null,
    phone ? `My contact number: ${phone}.` : null,
    message ? `Message: ${message}` : null,
  ].filter(Boolean);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join(" "))}`;
}

function generateSessionId() {
  return "sess_" + Date.now() + "_" + Math.random().toString(36).substring(2, 11);
}

function getOrCreateSessionId({ forceNew = false } = {}) {
  if (typeof window === "undefined") return generateSessionId();
  if (!forceNew) {
    const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;
  }
  const fresh = generateSessionId();
  try { sessionStorage.setItem(SESSION_STORAGE_KEY, fresh); } catch { /* noop */ }
  return fresh;
}

function resolveSessionId() {
  if (FORCE_SESSION_ID) return FORCE_SESSION_ID;
  return getOrCreateSessionId();
}

/* -------------------- CLIENT-SIDE SESSION INDEX ------------------- */
function readSessionsIndex() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SESSIONS_INDEX_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch { return []; }
}

function writeSessionsIndex(list) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(SESSIONS_INDEX_KEY, JSON.stringify(list)); } catch { /* noop */ }
}

function rememberSessionId(sid, extra = {}) {
  if (!sid) return;
  const list = readSessionsIndex();
  const existingIdx = list.findIndex((x) => x.session_id === sid);
  const entry = {
    session_id: sid,
    updated_at: new Date().toISOString(),
    created_at: existingIdx >= 0 ? list[existingIdx].created_at : new Date().toISOString(),
    title: extra.title || (existingIdx >= 0 ? list[existingIdx].title : "") || "",
    total: extra.total ?? (existingIdx >= 0 ? list[existingIdx].total : 0),
  };
  if (existingIdx >= 0) list[existingIdx] = { ...list[existingIdx], ...entry };
  else list.unshift(entry);
  // Keep newest first, cap at 50
  list.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  writeSessionsIndex(list.slice(0, 50));
}

function forgetSessionId(sid) {
  const list = readSessionsIndex().filter((x) => x.session_id !== sid);
  writeSessionsIndex(list);
}

function timeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function parseBotReply(text = "") {
  if (!text) return null;
  const lines = String(text).split("\n");
  return lines.map((line, lineIdx) => {
    const parts = [];
    const regex = /\*([^*]+)\*/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
      parts.push(
        <strong key={`b-${lineIdx}-${match.index}`} className="font-semibold text-slate-900">{match[1]}</strong>
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < line.length) parts.push(line.slice(lastIndex));
    return (
      <span key={`l-${lineIdx}`}>
        {parts.length ? parts : line}
        {lineIdx < lines.length - 1 && <br />}
      </span>
    );
  });
}

/* -------------------- TIME FORMATTING HELPERS --------------------- */
function formatTime(ts) {
  if (!ts) return "";
  try {
    const d = new Date(ts);
    return d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
  } catch { return ""; }
}

function formatDayLabel(ts) {
  if (!ts) return "Older";
  const d = new Date(ts);
  const now = new Date();
  const startOf = (x) => new Date(x.getFullYear(), x.getMonth(), x.getDate()).getTime();
  const dayMs = 86400000;
  const diff = Math.floor((startOf(now) - startOf(d)) / dayMs);

  if (diff <= 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff <= 7) return "Previous 7 days";
  if (diff <= 30) return "Previous 30 days";
  return "Older";
}

function groupSessionsByTime(sessions = []) {
  const order = ["Today", "Yesterday", "Previous 7 days", "Previous 30 days", "Older"];
  const groups = {};
  order.forEach((k) => (groups[k] = []));
  sessions.forEach((s) => {
    const key = formatDayLabel(s.updated_at || s.created_at || s.timestamp);
    (groups[key] || groups.Older).push(s);
  });
  return order.filter((k) => groups[k].length > 0).map((k) => ({ label: k, items: groups[k] }));
}

/* ------------------------------------------------------------------ */
/*  FLOOR PLAN HELPERS (same logic as the project page)                */
/* ------------------------------------------------------------------ */
const EMPTY_ROWS = [];

const FACING_ORDER = ["East", "West", "North", "South", "North-East", "North-West", "South-East", "South-West"];

const FACING_ANGLE = {
  North: 0, "North-East": 45, East: 90, "South-East": 135,
  South: 180, "South-West": 225, West: 270, "North-West": 315,
};

const FACING_ALIASES = {
  n: "North", north: "North",
  e: "East", east: "East",
  s: "South", south: "South",
  w: "West", west: "West",
  ne: "North-East", "north-east": "North-East", "east-north": "North-East",
  nw: "North-West", "north-west": "North-West", "west-north": "North-West",
  se: "South-East", "south-east": "South-East", "east-south": "South-East",
  sw: "South-West", "south-west": "South-West", "west-south": "South-West",
};

function normaliseFacing(raw) {
  if (!raw) return "";
  const key = String(raw)
    .trim()
    .toLowerCase()
    .replace(/facing/g, "")
    .replace(/[^a-z]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return FACING_ALIASES[key] || "";
}

function getPlanUnitCodes(plan) {
  const source = [plan?.unit, plan?.flatNo, plan?.id, plan?.title].filter(Boolean).join(" ");
  return (source.match(/[A-Za-z]?\d{3,4}/g) || []).map((c) => c.toUpperCase());
}

function lookupFacingFromPricing(plan, rows) {
  if (!rows || !rows.length) return "";
  const codes = getPlanUnitCodes(plan);
  for (const code of codes) {
    const row = rows.find((r) => String(r?.flatNo || r?.id || "").toUpperCase() === code);
    const facing = normaliseFacing(row?.facing);
    if (facing) return facing;
  }
  return "";
}

const FACING_IN_TITLE = /(north[-\s]?east|north[-\s]?west|south[-\s]?east|south[-\s]?west|north|south|east|west)(?:[-\s]?facing)?\b/i;

function getPlanFacing(plan, pricingRows) {
  const direct = normaliseFacing(plan?.facing);
  if (direct) return direct;
  const match = String(plan?.title || "").match(FACING_IN_TITLE);
  const fromTitle = match ? normaliseFacing(match[1]) : "";
  if (fromTitle) return fromTitle;
  return lookupFacingFromPricing(plan, pricingRows);
}

function planMatchesTab(plan, label) {
  if (!label) return true;
  if (plan.type) return plan.type === label;
  return (plan.title || "").toLowerCase().startsWith(label.toLowerCase());
}

function splitPlanTitle(plan) {
  const title = plan?.title || "";
  const [config, ...rest] = title.split("·").map((s) => s.trim());
  return { config: plan?.config || config, facing: rest.join(" · ") || plan?.unitLabel || "" };
}

function formatArea(area = "") {
  const value = String(area).trim();
  return /\d/.test(value) ? value : "";
}

function getPlanRooms(plan) {
  if (!plan) return [];
  if (plan.rooms?.length) return plan.rooms;
  if (plan.features?.length) return plan.features.map((f) => f.label);
  return [];
}

function getRoomIcon(label = "") {
  const l = label.toLowerCase();
  if (l.includes("bed")) return BedDouble;
  if (l.includes("toilet")) return Toilet;
  if (l.includes("bath")) return Bath;
  if (l.includes("living") || l.includes("hall")) return Sofa;
  if (l.includes("kitchen")) return CookingPot;
  if (l.includes("balcon")) return Fence;
  return Sparkles;
}

const DEFAULT_TYPE_INFO = [
  [/^studio/i, "Compact, self-contained homes where the living, sleeping and kitchenette zones flow into one bright, easy-to-maintain space — ideal for singles, students and first-time buyers."],
  [/^1\s*bhk/i, "A private bedroom with a separate living and kitchen area — the right balance of comfort and affordability for couples, small families and investors."],
  [/^3\s*bhk/i, "Our most spacious configuration, with three bedrooms, generous common areas and ample storage — built for larger families who want room to grow."],
  [/^2\s*bhk.*2\s*t/i, "Two bedrooms with two full bathrooms, so mornings never clash. A wide living-cum-dining area keeps the home social while the bedrooms stay private."],
  [/^2\s*bhk.*1\s*t/i, "Two well-proportioned bedrooms sharing a single bathroom — an efficient plan that puts more of the carpet area into the living and bedroom spaces."],
  [/^2\s*bhk/i, "Two well-proportioned bedrooms around a shared living-cum-dining space, planned for growing families who want comfort without wasted corridors."],
];

function getPlanGroupInfo(label, project, block) {
  const custom = block?.tabInfo?.[label] || project?.floorPlanTypeInfo?.[label];
  if (custom) return custom;
  const match = DEFAULT_TYPE_INFO.find(([pattern]) => pattern.test(label || ""));
  if (match) return match[1];
  return "Layouts planned around easy circulation, cross ventilation and natural light — with every square foot put to use.";
}

/* ------------------------------------------------------------------ */
/*  COMPANY DATA                                                       */
/* ------------------------------------------------------------------ */
const COMPANY = {
  name: "PKR Estates",
  tagline: "An Affordable Home Company",
  founder: "Mr. Prasanna Kumar",
  founded: "2015",
  phone: "+91 95436 33333",
  phoneDisplay: "95 43 63 33 33",
  website: "https://www.pkrestates.com",
  address: "Flat A10, Archana Castle, 4/23 Patrick Church Road, St. Thomas Mount, Chennai 600016",
  story:
    "PKR Estates has been growing from strength to strength since incorporation, delivering gated communities with state-of-the-art amenities in an eco-friendly setting. The company is known for transparency in dealings, a customer-centric approach, uncompromising business ethics, and a commitment to quality.",
  mission:
    "To achieve our vision by maintaining the highest standards of Excellence in Design & Innovation, and the highest standards of Integrity & Dedication in customer service.",
  promises: [
    "An effective quality management system",
    "Transparency to customers and all stakeholders",
    "Integrity and dedication in customer service",
    "Timely delivery of homes",
  ],
  completedProjects: [
    { name: "Premavathy Nagar", type: "Completed residential project" },
    { name: "Little India", type: "1 BHK compact apartments & residential villas, OMR" },
  ],
  socials: {
    facebook: "https://www.facebook.com/pkrestates",
    instagram: "https://www.instagram.com/pkrestates",
    twitter: "https://www.twitter.com/Pkr_estates_LLP",
    youtube: "https://www.youtube.com/channel/UCqxFo8on9tQNwQq11KNfU2w",
  },
};

/* ------------------------------------------------------------------ */
/*  PROJECT DATA                                                       */
/* ------------------------------------------------------------------ */
const PROJECTS = {
  gurudev: {
    name: "Gurudev",
    tagline: "Guduvancheri",
    icon: Building2,
    rera: "TN/35/Layout/1718/2024",
    priceHint: "Contact us for current per-sq.ft pricing & unit availability",
    overview:
      "Gurudev is located in the Guduvancheri neighbourhood of the South-Eastern Suburbs of Chennai — a residential community of 90 thoughtfully crafted apartments, with a choice of 1, 2 & 3 BHK homes. It's 100% vaastu compliant with zero dead space, and surrounded by prominent IT/ITES companies, schools, colleges and hospitals.",
    salientFeatures: [
      "90 elegantly crafted apartments",
      "Stilt + 5 floors design structure",
      "100% vaastu compliant homes, zero dead space",
      "Surrounded by prominent IT/ITES companies, schools, colleges & hospitals",
    ],
    configuration: [
      { block: "Block A", structure: "Stilt + 5 Floors", units: [{ type: "1 BHK", count: 70 }, { type: "2 BHK", count: 20 }] },
    ],
    unitSizes: [
      { type: "1 BHK + 1T", saleable: "391 – 460 sq.ft", carpet: "246 – 292 sq.ft" },
      { type: "2 BHK + 2T", saleable: "730 – 732 sq.ft", carpet: "470 – 476 sq.ft" },
    ],
    amenities: [
      "Shops", "Security Cabin with CCTV", "Children's Play Area", "Walking Track",
      "Park", "Avenue Trees", "Elevator (6-passenger automatic lift)",
      "Sewage Treatment Plant (STP)", "Car Parking",
    ],
    specifications: {
      structure: [
        "RCC Framed Structure, seismic compliant (Zone 3)",
        "Masonry: 200mm external walls, 100mm internal walls",
        "Floor-to-floor height (incl. slab): 3000mm",
        "Anti-termite treatment done",
      ],
      wallFinish: [
        "Internal walls: 2 coats putty, 1 coat primer, 2 coats emulsion paint",
        "Exterior walls: 1 coat primer + 2 coats emulsion paint",
        "Bathroom: glazed ceramic tile up to false ceiling (300x600mm)",
        "Kitchen: ceramic wall tile 300x600mm up to 600mm above counter",
      ],
      flooring: [
        "Foyer/Living/Dining/Bedrooms/Kitchen: vitrified tiles 600x600mm",
        "Bathroom: anti-skid ceramic tiles 300x300mm",
        "Balcony: anti-skid ceramic tiles 300x300mm",
      ],
      kitchen: [
        "Granite kitchen platform, 600mm wide, at 800mm height",
        "Electrical point for chimney & water purifier",
        "Quartz single bowl sink with drain board",
      ],
      electrical: [
        "3 phase power supply with MCB & ELCB",
        "Modular switches & sockets (Anchor Roma / Schneider / ABB or equivalent)",
        "FRLS copper wiring (KEI / Polycab or equivalent)",
        "TV & telephone point in living room",
        "Split AC point in living room & all bedrooms",
      ],
      commonFeatures: [
        "6-passenger automatic lift",
        "Centralized Sewage Treatment Plant & rainwater harvesting",
        "CCTV surveillance at pivotal stilt locations",
        "Interlocking paver block driveway",
        "Security booth at entrance",
      ],
    },
    location: {
      description:
        "Gurudev gives you the gift of time by offering apartments near Guduvancheri Railway Station, with superior connectivity to MEPZ, Siruseri IT Park, and Mahindra World City.",
      landmarks: [
        { label: "Guduvancheri (GST Road)", distance: "5 mins" },
        { label: "Urapakkam", distance: "10 mins" },
        { label: "Vandalur", distance: "10 mins" },
        { label: "Perungalathur", distance: "15 mins" },
        { label: "OMR - Thiruporur", distance: "15 mins" },
        { label: "Tambaram", distance: "20 mins" },
      ],
      schools: [
        { label: "Velammal Vidhyashram CBSE", distance: "2 mins" },
        { label: "Eden Kidspark", distance: "3 mins" },
        { label: "SRI MA Vidyalaya CBSE", distance: "3 mins" },
        { label: "SRM Public School CBSE", distance: "5 mins" },
        { label: "Akshra Mandir Primary School", distance: "5 mins" },
        { label: "St Johns Matric School", distance: "8 mins" },
        { label: "PSBB Millennium School CBSE", distance: "10 mins" },
      ],
      colleges: [
        { label: "Apollo Arts & Science College", distance: "8 mins" },
        { label: "SRM University", distance: "8 mins" },
        { label: "Shri Sathya Sai Medical College", distance: "10 mins" },
        { label: "Crescent Engineering College", distance: "12 mins" },
        { label: "Tagore Engineering College", distance: "14 mins" },
        { label: "Peri Institute of Technology", distance: "15 mins" },
        { label: "VIT University", distance: "20 mins" },
      ],
    },
    faqTopics: ["overview", "configuration", "floorPlans", "unitSizes", "amenities", "specifications", "location", "rera", "price"],
  },
  privana: {
    name: "Privana",
    tagline: "Studio, 1, 2 & 3 BHK homes",
    icon: Building,
    overview:
      "Privana brings together contemporary architecture, premium finishes and a thoughtfully curated set of amenities in one refined residential address. Choose from Studio, 1, 2 & 3 BHK layouts across Block A and Block B. For more details, reach out to our team directly.",
    faqTopics: ["overview", "floorPlans"],
  },
};

const PROJECT_TOPIC_META = {
  overview: { label: "Overview", icon: Home },
  configuration: { label: "Configuration & Units", icon: LayoutGrid },
  floorPlans: { label: "Floor Plans", icon: LayoutGrid },
  unitSizes: { label: "Unit Sizes", icon: Ruler },
  amenities: { label: "Amenities", icon: Leaf },
  specifications: { label: "Specifications", icon: Hammer },
  location: { label: "Location & Landmarks", icon: MapPin },
  rera: { label: "RERA Details", icon: FileText },
  price: { label: "Pricing", icon: IndianRupee },
};

/* ------------------------------------------------------------------ */
/*  SMART KEYWORD ROUTER                                               */
/*  Understands typed messages like "2bhk floor in privana",           */
/*  "east facing 1 bhk gurudev", "block b 3bhk", "gurudev amenities"   */
/*  and answers locally with the same data as the project page.        */
/*  Anything it doesn't recognise still goes to the backend chatbot.   */
/* ------------------------------------------------------------------ */
const PROJECT_ALIASES = {
  gurudev: ["gurudev", "guru dev", "gurudeva"],
  privana: ["privana", "privna", "prevana"],
};

const normType = (t = "") => String(t).toLowerCase().replace(/[^a-z0-9]/g, "");

function detectProject(q) {
  return Object.keys(PROJECT_ALIASES).find((key) => PROJECT_ALIASES[key].some((a) => q.includes(a))) || null;
}

function parseFloorFilters(q) {
  const f = {};

  if (/studio/.test(q)) {
    f.type = "studio"; f.typeLabel = "Studio";
  } else {
    const m = q.match(/\b([1-4])\s*-?\s*(?:bhk|bed(?:room)?s?)/);
    if (m) { f.type = `${m[1]}bhk`; f.typeLabel = `${m[1]} BHK`; }
  }

  const t = q.match(/\b([1-3])\s*(?:t\b|toilets?|baths?)/);
  if (t) f.toilets = Number(t[1]);

  const fm = q.match(FACING_IN_TITLE);
  if (fm) { const facing = normaliseFacing(fm[1]); if (facing) f.facing = facing; }

  const b = q.match(/\bblock\s*-?\s*([ab])\b/);
  if (b) f.block = b[1].toUpperCase();

  const u = q.match(/\b([ab]?\d{3})\b(?!\s*(?:sq|sft))/);
  if (u) f.unit = u[1].toUpperCase();

  return f;
}

function toiletsOf(plan) {
  const feat = (plan.features || []).find((x) => /(\d+)\s*toilet/i.test(x.label || ""));
  if (!feat) return null;
  return Number(feat.label.match(/(\d+)\s*toilet/i)[1]);
}

function planHasUnit(plan, code) {
  const letter = (code.match(/^[A-Z]/) || [""])[0];
  const n = Number(code.replace(/\D/g, ""));
  const codes = (String(plan.title || "").match(/[A-Za-z]?\d{3,4}/g) || []).map((c) => c.toUpperCase());
  if (!codes.length) return false;

  const sameLetter = (c) => !letter || !/^[A-Z]/.test(c) || c[0] === letter;
  const numOf = (c) => Number(c.replace(/\D/g, ""));

  if (codes.some((c) => sameLetter(c) && numOf(c) === n)) return true;

  if (codes.length >= 2) {
    const first = codes[0];
    const last = codes[codes.length - 1];
    if (sameLetter(first) && n % 100 === numOf(first) % 100 && n >= numOf(first) && n <= numOf(last)) return true;
  }
  return false;
}

function findPlanMatches(projectKey, f) {
  const dp = PROJECT_DATA.find((p) => p.slug === projectKey);
  if (!dp) return [];
  const rows = dp.plotPricing?.length ? dp.plotPricing : EMPTY_ROWS;
  const out = [];

  (dp.floorPlanBlocks || []).forEach((block, blockIdx) => {
    if (f.block && !normType(block.label).includes("block" + f.block.toLowerCase())) return;

    (block.plans || []).forEach((plan) => {
      if (f.type && !normType(plan.type || plan.title).startsWith(f.type)) return;
      if (f.toilets && toiletsOf(plan) !== f.toilets) return;
      const facing = getPlanFacing(plan, rows);
      if (f.facing && facing !== f.facing) return;
      if (f.unit && !planHasUnit(plan, f.unit)) return;

      out.push({
        blockIdx,
        blockLabel: block.label,
        planId: plan.id,
        title: splitPlanTitle(plan).facing || plan.title,
        type: plan.type || "",
        area: formatArea(plan.area),
        facing,
        image: plan.image3d || plan.image || "",
      });
    });
  });
  return out;
}

function describeFilters(f) {
  const parts = [];
  if (f.facing) parts.push(`${f.facing}-facing`);
  if (f.typeLabel) parts.push(f.typeLabel);
  if (f.toilets) parts.push(`${f.toilets} toilet${f.toilets > 1 ? "s" : ""}`);
  if (f.block) parts.push(`Block ${f.block}`);
  if (f.unit) parts.push(`unit ${f.unit}`);
  return parts.join(" · ");
}

const EXPLICIT_FLOOR = /floor\s*-?\s*plans?|\bfloors?\b|layouts?|\bplans?\b/;
const UNIT_WORDS = /bhk|studio|bed(?:room)?s?\b|\bflats?\b|\bunits?\b|\bapartments?\b/;

function detectTopic(q, filters) {
  if (/\brera\b/.test(q)) return "rera";
  if (EXPLICIT_FLOOR.test(q)) return "floorPlans";
  if (/pric|cost|how much|rates?\b|budget/.test(q)) return "price";
  if (/amenit|facilit|gym|swimming|pool|club\s*house|play\s*area|walking track|elevator|\blift\b|parking|\bpark\b/.test(q)) return "amenities";
  if (/location|landmark|nearby|near by|schools?\b|colleges?\b|connectivity|distance|how far|where is|address|\bmap\b/.test(q)) return "location";
  if (/specification|\bspecs?\b|material|finish|paint|tiles?\b|kitchen|electrical|wiring|structure/.test(q)) return "specifications";
  if (/configuration|how many|total units|\bblocks?\b|towers?/.test(q) && !filters.block) return "configuration";
  if (/unit\s*size|sq\.?\s*ft|sqft|carpet|saleable|square\s*feet|\bsizes?\b/.test(q)) return "unitSizes";
  if (UNIT_WORDS.test(q) || filters.unit || filters.facing) return "floorPlans";
  if (/overview|\babout\b|details|tell me|know more/.test(q)) return "overview";
  return null;
}

/** Returns an array of bot entries, or null to let the backend chatbot answer. */
function routeMessage(raw) {
  const q = String(raw || "").toLowerCase().trim();
  if (!q) return null;

  const projectKey = detectProject(q);
  const filters = parseFloorFilters(q);
  const topic = detectTopic(q, filters);

  if (!topic) {
    if (projectKey && q.split(/\s+/).length <= 3) return [{ kind: "project-topics", projectKey }];
    return null;
  }

  // facing / unit-code alone (no project, no unit words) is too vague to hijack a normal question
  if (topic === "floorPlans" && !projectKey && !EXPLICIT_FLOOR.test(q) && !UNIT_WORDS.test(q)) return null;

  if (topic === "floorPlans") {
    const keys = projectKey ? [projectKey] : Object.keys(PROJECTS).filter((k) => PROJECTS[k].faqTopics.includes("floorPlans"));
    const entries = keys
      .map((k) => ({ kind: "plans-result", projectKey: k, filters, matches: findPlanMatches(k, filters) }))
      .filter((e) => projectKey || e.matches.length > 0);
    if (entries.length) return entries;
    return [{ kind: "plans-result", projectKey: null, filters, matches: [] }];
  }

  if (projectKey) {
    if (PROJECTS[projectKey].faqTopics.includes(topic)) return [{ kind: "project-detail", projectKey, topic }];
    return null;
  }

  const options = Object.keys(PROJECTS).filter((k) => PROJECTS[k].faqTopics.includes(topic));
  return options.length ? [{ kind: "pick-project", topic, options }] : null;
}

/* ------------------------------------------------------------------ */
/*  EMI ENGINE                                                         */
/* ------------------------------------------------------------------ */
function calcEMI(principal, annualRatePct, tenureYears) {
  const P = Number(principal);
  const r = Number(annualRatePct) / 12 / 100;
  const n = Number(tenureYears) * 12;
  if (!P || !r || !n) return { emi: 0, totalPayment: 0, totalInterest: 0 };
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  return { emi, totalPayment, totalInterest: totalPayment - P };
}

function formatINR(num) {
  if (!Number.isFinite(num)) return "—";
  return "₹" + Math.round(num).toLocaleString("en-IN");
}

/* ------------------------------------------------------------------ */
/*  AI ORB — logo shown as its own centered image inside a badge       */
/*  Pass `src` to override the image for a specific spot (e.g. the     */
/*  greeting screen) without touching the header/launcher logo.        */
/* ------------------------------------------------------------------ */
function AIOrb({ size = 32, showLogo = false, bg = true, src }) {
  const inner = Math.round(size * 0.66); // logo stays smaller than the badge, so it's never stretched edge-to-edge
  const logoSrc = src || LOGO_URL;

  if (!showLogo) {
    return (
      <span
        className="relative inline-flex shrink-0 items-center justify-center rounded-full"
        style={{ width: size, height: size, background: DEEP_NAVY }}
      >
        <Sparkles className="text-white" style={{ width: size * 0.55, height: size * 0.55 }} strokeWidth={2} />
      </span>
    );
  }

  return (
    <span
      className="relative inline-flex shrink-0 items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: bg ? "#FFFFFF" : "transparent",
        boxShadow: bg ? "inset 0 0 0 1px rgba(15,58,107,0.08)" : "none",
      }}
    >
      {/* Logo rendered as its own standalone image, centered within the badge */}
      <img
        src={logoSrc}
        alt="PKR Estates"
        style={{
          width: inner,
          height: inner,
          objectFit: "contain",
          display: "block",
          margin: "auto",
        }}
      />
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  ENQUIRE MODAL                                                      */
/* ------------------------------------------------------------------ */
function EnquireModal({ open, onClose, presetType }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", inquiryType: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false); setSubmitting(false); setSuccessMessage(""); setErrorMessage(""); setFieldErrors({});
      setForm({ name: "", email: "", phone: "", inquiryType: "", message: "" });
    } else if (presetType) {
      setForm((f) => ({ ...f, inquiryType: presetType }));
    }
  }, [open, presetType]);

  if (!open) return null;

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setFieldErrors((errs) => { if (!errs[field]) return errs; const next = { ...errs }; delete next[field]; return next; });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true); setErrorMessage(""); setFieldErrors({});

    const payload = {
      full_name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(),
      inquiry_type: form.inquiryType, message: form.message.trim(),
    };

    try {
      const res = await fetch(ENQUIRY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      let data = null;
      try { data = await res.json(); } catch { data = null; }

      if (!res.ok || !data || data.status !== true) {
        if (data?.errors && typeof data.errors === "object") {
          const mapped = {};
          const keyMap = { full_name: "name", email: "email", phone: "phone", inquiry_type: "inquiryType", message: "message" };
          Object.entries(data.errors).forEach(([key, val]) => {
            mapped[keyMap[key] || key] = Array.isArray(val) ? val[0] : String(val);
          });
          setFieldErrors(mapped);
        }
        setErrorMessage(data?.message || "Something went wrong while submitting your enquiry. Please try again.");
        setSubmitting(false); return;
      }

      setSuccessMessage(data.message || "Your enquiry has been received. Our team will reach out to you shortly.");
      setSubmitting(false); setSubmitted(true);
      window.location.href = buildWhatsAppUrl({
        name: payload.full_name, phone: payload.phone, inquiryType: payload.inquiry_type, message: payload.message,
      });
    } catch (err) {
      console.error("Enquiry submit failed:", err);
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-[14px] text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:ring-4 ${
      fieldErrors[field] ? "border-red-300 focus:ring-red-100" : "border-slate-200 focus:border-[#0F3A6B] focus:ring-[#0F3A6B]/10"
    }`;

  return (
    <div
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-slate-900/40 px-4 py-8 backdrop-blur-md"
      style={{ animation: "pkrOverlayIn .2s ease-out" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full w-full max-w-[460px] overflow-y-auto rounded-3xl border border-white/60 bg-white shadow-[0_40px_100px_-30px_rgba(15,58,107,0.5)]"
        style={{ animation: "pkrPanelIn .35s cubic-bezier(.22,1,.36,1)" }}
      >
        <div className="flex items-start justify-between px-7 pb-2 pt-7">
          <div className="flex items-center gap-3">
            <AIOrb size={40} showLogo />
            <div>
              <h2 className="m-0 text-[22px] font-medium leading-tight text-slate-900" style={{ fontFamily: SERIF }}>Let&apos;s talk</h2>
              <p className="m-0 mt-0.5 text-[12.5px] text-slate-500">We&apos;ll get back to you within 24 hours</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <X className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 px-7 py-14 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
              <Check className="h-7 w-7 text-emerald-600" strokeWidth={2.5} />
            </div>
            <h3 className="m-0 text-[20px] font-medium text-slate-900" style={{ fontFamily: SERIF }}>Thank you!</h3>
            <p className="m-0 max-w-[300px] text-[13.5px] leading-relaxed text-slate-500">{successMessage}</p>
            <p className="m-0 flex items-center gap-2 text-[12px] text-slate-400">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-500" />
              Redirecting you to WhatsApp...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-7 pb-7 pt-4">
            {errorMessage && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] leading-snug text-red-700">
                <AlertTriangle className="mt-[1px] h-4 w-4 shrink-0" strokeWidth={2} />
                <span>{errorMessage}</span>
              </div>
            )}

            <Field label="Full name" required error={fieldErrors.name}>
              <input required type="text" name="full_name" placeholder="Enter your name" value={form.name} onChange={handleChange("name")} className={inputClass("name")} />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Email" required error={fieldErrors.email}>
                <input required type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange("email")} className={inputClass("email")} />
              </Field>
              <Field label="Phone" required error={fieldErrors.phone}>
                <input required type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange("phone")} className={inputClass("phone")} />
              </Field>
            </div>

            <Field label="Inquiry type" required error={fieldErrors.inquiryType}>
              <div className="relative">
                <select required name="inquiry_type" value={form.inquiryType} onChange={handleChange("inquiryType")} className={`${inputClass("inquiryType")} appearance-none pr-10`}>
                  <option value="" disabled>Select an option</option>
                  {INQUIRY_TYPES.map((type) => (<option key={type} value={type}>{type}</option>))}
                </select>
                <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-slate-400" strokeWidth={2.25} />
              </div>
            </Field>

            <Field label="Message" optional error={fieldErrors.message}>
              <textarea rows={3} name="message" placeholder="Tell us a bit more..." value={form.message} onChange={handleChange("message")} className={`${inputClass("message")} resize-none`} />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-[14.5px] font-semibold text-white transition-all hover:bg-[#0F3A6B] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Sending...</>
              ) : (
                <><Send className="h-4 w-4" strokeWidth={2.25} />Submit enquiry</>
              )}
            </button>

            <p className="m-0 text-center text-[11px] text-slate-400">By submitting, you agree to be contacted by PKR Estates regarding your enquiry.</p>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({ label, required, optional, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12.5px] font-medium text-slate-600">
        {label} {required && <span className="text-[#0F3A6B]">*</span>}
        {optional && <span className="font-normal text-slate-400">(optional)</span>}
      </label>
      {children}
      {error && <span className="text-[11.5px] text-red-600">{error}</span>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CHAT PRIMITIVES                                                    */
/* ------------------------------------------------------------------ */
function AssistantRow({ children }) {
  return (
    <div className="pkr-fade-up flex gap-3.5">
      <div className="pt-0.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full" style={{ background: DEEP_NAVY }}>
          <Sparkles className="h-4 w-4 text-white" strokeWidth={2} />
        </span>
      </div>
      <div className="min-w-0 flex-1 text-[15px] leading-7 text-slate-700">{children}</div>
    </div>
  );
}

function UserRow({ children }) {
  return (
    <div className="pkr-fade-up flex justify-end">
      <div className="max-w-[85%] rounded-3xl rounded-br-lg bg-[#EEF2F7] px-4 py-2.5 text-[15px] leading-relaxed text-slate-800">
        {children}
      </div>
    </div>
  );
}

function ThinkingRow() {
  return (
    <AssistantRow>
      <span className="pkr-shimmer-text text-[14.5px] font-medium">Thinking…</span>
    </AssistantRow>
  );
}

function Chip({ children, onClick, icon: Icon, primary = false }) {
  return (
    <button
      onClick={onClick}
      className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] font-medium transition-all active:scale-[0.97] ${
        primary
          ? "border-transparent bg-slate-900 text-white hover:bg-[#0F3A6B]"
          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
      }`}
    >
      {Icon && <Icon className={`h-3.5 w-3.5 ${primary ? "text-white" : "text-[#0F3A6B]"}`} strokeWidth={2} />}
      {children}
    </button>
  );
}

function ChipRow({ children }) {
  return <div className="mt-3 flex flex-wrap gap-2">{children}</div>;
}

function BackLink({ onClick, children }) {
  return (
    <button onClick={onClick} className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-medium text-slate-400 transition hover:text-slate-700">
      ← {children}
    </button>
  );
}

function Card({ title, icon: Icon, children }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
      {title && (
        <p className="m-0 mb-2.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
          {Icon && <Icon className="h-3.5 w-3.5 text-[#0F3A6B]" strokeWidth={2.25} />}
          {title}
        </p>
      )}
      {children}
    </div>
  );
}

function FactList({ items }) {
  return (
    <ul className="m-0 list-none space-y-2 pl-0">
      {items.map((f, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[14px] leading-6 text-slate-700">
          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: `linear-gradient(135deg, ${CYAN}, ${ELECTRIC})` }} />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}

function DistanceList({ items }) {
  return (
    <ul className="m-0 list-none divide-y divide-slate-100 pl-0">
      {items.map((it, i) => (
        <li key={i} className="flex items-center justify-between gap-3 py-2 text-[13.5px]">
          <span className="text-slate-600">{it.label}</span>
          <span className="whitespace-nowrap rounded-full bg-slate-100 px-2 py-0.5 text-[12px] font-semibold text-slate-700">{it.distance}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  PLAN RESULTS — shown when the user types e.g. "2bhk floor privana" */
/*  Each matching layout gets a View button that opens the full        */
/*  floor plan details (image, rooms, facing, enquire…).               */
/* ------------------------------------------------------------------ */
const RESULTS_PAGE = 5;

function FacingArrow({ facing, size = 12, active = false }) {
  const angle = FACING_ANGLE[facing] ?? 0;
  const color = active ? "#FFFFFF" : DEEP_NAVY;
  return (
    <span className="flex shrink-0 items-center justify-center" style={{ width: size, height: size, transform: `rotate(${angle}deg)` }}>
      <Navigation2 className="h-full w-full" strokeWidth={1.6} style={{ color, fill: color }} />
    </span>
  );
}

function PlanResults({ entry, onView, onBrowse, onEnquire, onPickProject }) {
  const [showAll, setShowAll] = useState(false);
  const { projectKey, filters, matches } = entry;
  const project = projectKey ? PROJECTS[projectKey] : null;
  const summary = describeFilters(filters);
  const shown = showAll ? matches : matches.slice(0, RESULTS_PAGE);
  const hidden = matches.length - shown.length;

  if (!matches.length) {
    return (
      <>
        <p className="m-0">
          I couldn&apos;t find a layout matching{summary ? <> <strong className="font-semibold text-slate-900">{summary}</strong></> : " that"}
          {project ? <> in <strong className="font-semibold text-slate-900">{project.name}</strong></> : ""}. Here&apos;s how you can continue:
        </p>
        <ChipRow>
          {project && <Chip icon={LayoutGrid} onClick={() => onBrowse(projectKey)}>Browse all {project.name} floor plans</Chip>}
          {!project && Object.keys(PROJECTS).filter((k) => PROJECTS[k].faqTopics.includes("floorPlans")).map((k) => (
            <Chip key={k} icon={LayoutGrid} onClick={() => onPickProject(k)}>{PROJECTS[k].name} floor plans</Chip>
          ))}
          <Chip primary icon={Mail} onClick={() => onEnquire(project?.name || "General Enquiry")}>Talk to our team</Chip>
        </ChipRow>
      </>
    );
  }

  return (
    <>
      <p className="m-0">
        Found <strong className="font-semibold text-slate-900">{matches.length}</strong> layout{matches.length > 1 ? "s" : ""}
        {summary ? <> for <strong className="font-semibold text-slate-900">{summary}</strong></> : ""} in{" "}
        <strong className="font-semibold text-slate-900">{project.name}</strong>:
      </p>

      <div className="mt-3 space-y-2">
        {shown.map((m) => (
          <div key={`${m.blockIdx}-${m.planId}`} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl" style={{ backgroundColor: LIGHT_BLUE_SOFT }}>
              {m.image
                ? <img src={m.image} alt="" loading="lazy" className="h-full w-full object-contain p-0.5" />
                : <LayoutGrid className="h-5 w-5" strokeWidth={1.6} style={{ color: DEEP_NAVY }} />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-semibold leading-5 text-slate-900">{m.title}</span>
              <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11.5px] leading-4 text-slate-500">
                {m.blockLabel && <span>{m.blockLabel}</span>}
                {m.type && <span>· {m.type}</span>}
                {m.area && <span className="tabular-nums">· {m.area}</span>}
                {m.facing && (
                  <span className="flex items-center gap-1">· <FacingArrow facing={m.facing} size={11} />{m.facing}</span>
                )}
              </span>
            </span>
            <button
              onClick={() => onView(projectKey, m)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-[12.5px] font-semibold text-white transition active:scale-[0.96]"
              style={{ backgroundColor: DEEP_NAVY }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
            >
              <Eye className="h-3.5 w-3.5" strokeWidth={2} />View
            </button>
          </div>
        ))}
      </div>

      <ChipRow>
        {hidden > 0 && <Chip icon={ChevronDown} onClick={() => setShowAll(true)}>Show {hidden} more</Chip>}
        {showAll && matches.length > RESULTS_PAGE && <Chip onClick={() => setShowAll(false)}>Show less</Chip>}
        <Chip icon={LayoutGrid} onClick={() => onBrowse(projectKey)}>Open floor plan explorer</Chip>
        <Chip primary icon={Mail} onClick={() => onEnquire(project.name)}>Enquire about {project.name}</Chip>
      </ChipRow>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FLOOR PLAN EXPLORER — same data + behaviour as the project page    */
/*  Block selector → facing filter → unit types → plan list → detail   */
/* ------------------------------------------------------------------ */
function FloorPlanExplorer({ projectKey, onEnquire, init }) {
  const dataProject = useMemo(() => PROJECT_DATA.find((p) => p.slug === projectKey) || null, [projectKey]);
  const blocks = dataProject?.floorPlanBlocks || [];

  const [activeBlock, setActiveBlock] = useState(init?.blockIdx ?? 0);
  const [facingFilter, setFacingFilter] = useState("all");
  const [picked, setPicked] = useState(() => {
    if (!init?.planId) return null;
    const b = blocks[init.blockIdx ?? 0];
    const plan = b?.plans?.find((p) => p.id === init.planId);
    if (!plan) return null;
    return { plan, label: (b.tabs || []).find((t) => planMatchesTab(plan, t)) || "" };
  });
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const listRef = useRef(null);
  const activeRowRef = useRef(null);

  const block = blocks[activeBlock] || null;
  const tabs = block?.tabs || [];
  const allPlans = block?.plans || [];
  const pricingRows = dataProject?.plotPricing?.length ? dataProject.plotPricing : EMPTY_ROWS;

  /* ---------------- Facing filter ---------------- */
  const planFacings = useMemo(() => {
    const map = new Map();
    allPlans.forEach((plan) => map.set(plan, getPlanFacing(plan, pricingRows)));
    return map;
  }, [allPlans, pricingRows]);

  const facingCounts = useMemo(() => {
    const counts = {};
    allPlans.forEach((plan) => {
      const f = planFacings.get(plan);
      if (f) counts[f] = (counts[f] || 0) + 1;
    });
    return counts;
  }, [allPlans, planFacings]);

  const facingOptions = useMemo(() => FACING_ORDER.filter((f) => facingCounts[f]), [facingCounts]);
  const hasFacingFilter = facingOptions.length > 1;
  const isFacingFiltered = hasFacingFilter && facingFilter !== "all";
  const visiblePlans = isFacingFiltered ? allPlans.filter((p) => planFacings.get(p) === facingFilter) : allPlans;
  const activeFacingAngle = FACING_ANGLE[facingFilter] ?? -45;
  const planFacingOf = (plan) => planFacings.get(plan) || "";

  /* ---------------- Groups (unit types) ---------------- */
  const groups = (
    tabs.length
      ? tabs.map((label) => ({ label, plans: visiblePlans.filter((p) => planMatchesTab(p, label)) }))
      : [{ label: "", plans: visiblePlans }]
  ).filter((g) => g.plans.length > 0);

  const totalPlans = groups.reduce((sum, g) => sum + g.plans.length, 0);
  const firstGroup = groups[0];
  const selection =
    picked && groups.some((g) => g.label === picked.label && g.plans.includes(picked.plan))
      ? picked
      : firstGroup ? { plan: firstGroup.plans[0], label: firstGroup.label } : null;

  const selectedPlan = selection?.plan || null;
  const selectedLabel = selection?.label || "";
  const selectedImage = selectedPlan ? (selectedPlan.image3d || selectedPlan.image) : null;
  const selectedFacing = selectedPlan ? planFacingOf(selectedPlan) : "";

  const changeBlock = (i) => { setActiveBlock(i); setFacingFilter("all"); setPicked(null); };
  const changeFacing = (f) => { setFacingFilter(f); setPicked(null); };

  const openLightbox = () => { setZoom(1); setLightboxOpen(true); };

  // when opened from a "View" button, scroll the list so the chosen layout is visible
  useEffect(() => {
    if (!init?.planId) return;
    const box = listRef.current;
    const row = activeRowRef.current;
    if (box && row) box.scrollTop = Math.max(0, row.offsetTop - box.clientHeight / 2 + row.clientHeight / 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") { e.stopPropagation(); setLightboxOpen(false); }
      if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(4, z + 0.25));
      if (e.key === "-") setZoom((z) => Math.max(0.5, z - 0.25));
      if (e.key === "0") setZoom(1);
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [lightboxOpen]);

  if (!block) {
    return (
      <Card title="Floor plans" icon={LayoutGrid}>
        <p className="m-0 text-[14px] text-slate-600">Floor plans for this project are being finalised. Please contact our team for the latest layouts.</p>
        <button
          onClick={onEnquire}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-[13.5px] font-semibold text-white transition hover:bg-[#0F3A6B]"
        >
          <Send className="h-3.5 w-3.5" strokeWidth={2.25} />Enquire now
        </button>
      </Card>
    );
  }

  const rooms = getPlanRooms(selectedPlan);

  return (
    <div className="space-y-3">
      {/* ---- Select block ---- */}
      {blocks.length > 1 && (
        <div>
          <p className="m-0 mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-400">Select block</p>
          <div className="flex flex-wrap gap-2">
            {blocks.map((b, i) => {
              const active = i === activeBlock;
              return (
                <button
                  key={b.id || b.label || i}
                  onClick={() => changeBlock(i)}
                  className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-[13px] font-semibold transition active:scale-[0.97] ${
                    active ? "border-transparent text-white shadow-[0_10px_24px_-12px_rgba(15,58,107,0.7)]" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                  style={active ? { background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` } : undefined}
                >
                  <Building2 className="h-3.5 w-3.5" strokeWidth={1.9} />
                  {b.label}
                  {b.tag && (
                    <span
                      className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                      style={active ? { backgroundColor: "rgba(255,255,255,0.18)", color: "#fff" } : { backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}
                    >
                      {b.tag}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ---- Facing filter ---- */}
      {hasFacingFilter && (
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
            <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed" style={{ borderColor: "rgba(15,58,107,0.14)" }} />
            <span className="pointer-events-none absolute top-[1px] text-[6.5px] font-bold leading-none" style={{ color: DEEP_NAVY, opacity: 0.55 }}>N</span>
            <span className="flex h-full w-full items-center justify-center transition-transform duration-500" style={{ transform: `rotate(${activeFacingAngle}deg)`, transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)" }}>
              <Navigation2 className="h-[14px] w-[14px]" strokeWidth={1.5} style={{ color: DEEP_NAVY, fill: DEEP_NAVY }} />
            </span>
          </span>
          <div className="pkr-hscroll -mr-1 flex min-w-0 flex-1 items-center gap-1 overflow-x-auto pb-0.5">
            <div className="flex shrink-0 items-center gap-1 rounded-full border border-[#E3ECF5] bg-[#F5F9FD] p-1">
              {[{ id: "all", label: "All", count: allPlans.length }]
                .concat(facingOptions.map((f) => ({ id: f, label: f, count: facingCounts[f] })))
                .map((opt) => {
                  const active = opt.id === facingFilter;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => changeFacing(opt.id)}
                      aria-pressed={active}
                      className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[12px] font-semibold transition active:scale-[0.97] ${
                        active ? "text-white" : "text-slate-700 hover:bg-white"
                      }`}
                      style={active ? { background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` } : undefined}
                    >
                      {opt.id === "all"
                        ? <Compass className="h-[13px] w-[13px]" strokeWidth={1.8} style={{ color: active ? "#fff" : DEEP_NAVY }} />
                        : <FacingArrow facing={opt.id} size={13} active={active} />}
                      {opt.label}
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums"
                        style={active ? { backgroundColor: "rgba(255,255,255,0.22)", color: "#fff" } : { backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}
                      >
                        {opt.count}
                      </span>
                    </button>
                  );
                })}
            </div>
            {isFacingFiltered && (
              <button onClick={() => changeFacing("all")} className="ml-1 flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-[11.5px] font-semibold text-slate-500 transition hover:bg-slate-100">
                <RefreshCw className="h-3 w-3" strokeWidth={2} />Reset
              </button>
            )}
          </div>
        </div>
      )}

      {/* ---- Empty state ---- */}
      {groups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center">
          <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full" style={{ backgroundColor: LIGHT_BLUE }}>
            <Compass className="h-[18px] w-[18px]" strokeWidth={1.6} style={{ color: DEEP_NAVY }} />
          </span>
          {isFacingFiltered ? (
            <>
              <p className="m-0 text-[14px] font-semibold text-slate-800">No {facingFilter.toLowerCase()} facing layouts in this block</p>
              <p className="m-0 mt-1 text-[12.5px] text-slate-500">Try another direction, or view every layout available here.</p>
              <button onClick={() => changeFacing("all")} className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-[12.5px] font-semibold text-white transition hover:bg-[#0F3A6B]">
                <RefreshCw className="h-3 w-3" strokeWidth={2} />Show all layouts
              </button>
            </>
          ) : (
            <p className="m-0 text-[13px] text-slate-500">Floor plans for this block are being finalised.</p>
          )}
        </div>
      ) : (
        <>
          {/* ---- Unit types ---- */}
          {groups.length > 1 && (
            <div className="pkr-hscroll flex items-center gap-2 overflow-x-auto pb-0.5">
              <span className="mr-0.5 shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-slate-400">Unit types</span>
              {groups.map((g) => {
                const active = g.label === selectedLabel;
                return (
                  <button
                    key={g.label || "all"}
                    onClick={() => setPicked({ plan: g.plans[0], label: g.label })}
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition active:scale-[0.97] ${
                      active ? "border-transparent text-white" : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                    style={active ? { backgroundColor: DEEP_NAVY } : undefined}
                  >
                    {g.label || "All layouts"}
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums"
                      style={active ? { backgroundColor: "rgba(255,255,255,0.2)", color: "#fff" } : { backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}
                    >
                      {g.plans.length}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <p className="m-0 text-right text-[11.5px] font-medium tabular-nums text-slate-400">
            {isFacingFiltered ? `${totalPlans} of ${allPlans.length} layouts` : `${allPlans.length} layouts`}
          </p>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03)]">
            {/* ---- Plan list ---- */}
            <div ref={listRef} className="pkr-scroll relative max-h-[230px] overflow-y-auto border-b border-slate-200" style={{ backgroundColor: "#FBFDFE" }}>
              {groups.map((group) => (
                <div key={group.label || "all"}>
                  <div
                    className="sticky top-0 z-[2] flex items-center justify-between gap-2 border-b border-[#E3ECF5] px-4 py-2 backdrop-blur-sm"
                    style={{ backgroundColor: "rgba(237,244,251,0.94)" }}
                  >
                    <span className="text-[10.5px] font-bold uppercase tracking-[0.16em]" style={{ color: DEEP_NAVY }}>{group.label || "All layouts"}</span>
                    <span className="text-[11px] font-semibold tabular-nums text-slate-400">{group.plans.length}</span>
                  </div>
                  <ul className="m-0 list-none p-0">
                    {group.plans.map((plan, i) => {
                      const active = plan === selectedPlan;
                      const { facing } = splitPlanTitle(plan);
                      const areaLabel = formatArea(plan.area);
                      const pf = planFacingOf(plan);
                      return (
                        <li key={plan.id || `${group.label}-${i}`}>
                          <button
                            ref={active ? activeRowRef : null}
                            onClick={() => setPicked({ plan, label: group.label })}
                            aria-current={active}
                            className={`relative flex w-full items-center gap-3 border-b border-[#EEF3F9] px-4 py-2.5 text-left transition ${active ? "bg-[#0F3A6B]/[0.07]" : "hover:bg-[#F1F7FC]"}`}
                          >
                            {active && <span className="absolute left-0 top-0 h-full w-[3px]" style={{ backgroundColor: DEEP_NAVY }} />}
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: active ? DEEP_NAVY : LIGHT_BLUE }}>
                              <LayoutGrid className="h-[16px] w-[16px]" strokeWidth={1.6} style={{ color: active ? "#fff" : DEEP_NAVY }} />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-[13px] font-semibold leading-5" style={{ color: active ? DEEP_NAVY : "#1f2029" }}>
                                {facing || plan.title}
                              </span>
                              {(areaLabel || pf) && (
                                <span className="flex items-center gap-1.5 text-[11.5px] leading-4 text-slate-500">
                                  {areaLabel && <span className="tabular-nums">{areaLabel}</span>}
                                  {areaLabel && pf && <span className="h-2.5 w-px bg-slate-300" />}
                                  {pf && (<span className="flex items-center gap-1"><FacingArrow facing={pf} size={11} />{pf}</span>)}
                                </span>
                              )}
                            </span>
                            <ChevronRight className={`h-4 w-4 shrink-0 transition-opacity ${active ? "opacity-100" : "opacity-0"}`} strokeWidth={2} style={{ color: DEEP_NAVY }} />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>

            {/* ---- Selected plan: image ---- */}
            {selectedPlan && (
              <>
                <div
                  onClick={() => selectedImage && openLightbox()}
                  className="group relative h-[260px] cursor-zoom-in overflow-hidden sm:h-[320px]"
                  style={{ backgroundColor: LIGHT_BLUE_SOFT }}
                >
                  {selectedImage ? (
                    <img
                      key={selectedPlan.id || selectedPlan.title}
                      src={selectedImage}
                      alt={selectedPlan.title}
                      className="pkr-fade-up absolute inset-0 h-full w-full select-none object-contain p-4"
                      draggable={false}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                      <LayoutGrid className="h-8 w-8" strokeWidth={1.4} style={{ color: DEEP_NAVY, opacity: 0.6 }} />
                      <p className="m-0 text-[13px] text-slate-500">Floor plan image coming soon</p>
                    </div>
                  )}

                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#141414]/15 bg-white/90 shadow-sm">
                    <span className="absolute -top-2.5 rounded bg-white px-1 text-[9px] font-bold leading-none text-[#141414]">N</span>
                    <Navigation className="h-3.5 w-3.5 -rotate-45 fill-[#141414] text-[#141414]" strokeWidth={1.5} />
                  </span>

                  {selectedImage && (
                    <button
                      onClick={(e) => { e.stopPropagation(); openLightbox(); }}
                      aria-label="Enlarge floor plan"
                      className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-[#D5E1ED] bg-white px-3 py-1.5 text-[11.5px] font-semibold shadow-md transition hover:border-[#0F3A6B]/50 hover:bg-[#0F3A6B] hover:text-white active:scale-[0.97]"
                      style={{ color: DEEP_NAVY }}
                    >
                      <Expand className="h-3.5 w-3.5" strokeWidth={2} />Enlarge
                    </button>
                  )}
                </div>

                {/* ---- Selected plan: details ---- */}
                <div key={selectedPlan.id || selectedPlan.title} className="pkr-fade-up border-t border-slate-200 px-4 py-4 sm:px-5">
                  {(selectedLabel || selectedFacing) && (
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      {selectedLabel && (
                        <span className="w-fit rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em]" style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}>
                          {selectedLabel}
                        </span>
                      )}
                      {selectedFacing && (
                        <span className="flex w-fit items-center gap-1.5 rounded-full border border-[#DDE7F1] bg-[#FBFDFE] px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.12em]" style={{ color: TEXT_CHARCOAL }}>
                          <FacingArrow facing={selectedFacing} size={12} />
                          {selectedFacing} Facing
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="m-0 text-[18px] font-semibold leading-tight text-[#1f2029]">
                      {splitPlanTitle(selectedPlan).facing || selectedPlan.title}
                    </h3>
                    {formatArea(selectedPlan.area) && (
                      <span className="shrink-0 whitespace-nowrap pt-0.5 text-[14px] font-bold tabular-nums" style={{ color: DEEP_NAVY }}>
                        {formatArea(selectedPlan.area)}
                      </span>
                    )}
                  </div>

                  <p className="m-0 mt-2 border-b border-[#EDF2F8] pb-3.5 text-[13px] leading-[1.65] text-slate-600">
                    {getPlanGroupInfo(selectedLabel, dataProject, block)}
                  </p>

                  {rooms.length > 0 && (
                    <ul className="m-0 grid list-none grid-cols-1 gap-x-4 gap-y-2.5 px-0 py-3.5 sm:grid-cols-2">
                      {rooms.map((room, i) => {
                        const RoomIcon = getRoomIcon(room);
                        return (
                          <li key={i} className="flex items-center gap-3">
                            <RoomIcon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.4} style={{ color: DEEP_NAVY }} />
                            <span className="text-[13.5px] leading-5 text-slate-700">{room}</span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  <button
                    onClick={onEnquire}
                    className="flex w-full items-center justify-center gap-2 rounded-md py-3 text-[13.5px] font-bold text-white shadow-[0_4px_14px_-4px_rgba(15,58,107,0.4)] transition active:scale-[0.98]"
                    style={{ backgroundColor: DEEP_NAVY }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
                  >
                    <Send className="h-4 w-4" strokeWidth={2.25} />Enquire Now
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {/* ---- Lightbox (portal so chat transforms/overflow don't clip it) ---- */}
      {lightboxOpen && selectedPlan && selectedImage && typeof document !== "undefined" && createPortal(
        <div
          className="fixed inset-0 z-[10002] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          style={{ animation: "pkrOverlayIn .25s ease-out" }}
          onClick={() => setLightboxOpen(false)}
          onWheel={(e) => setZoom((z) => Math.min(4, Math.max(0.5, z - e.deltaY * 0.0015)))}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxOpen(false); }}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>

          <div className="absolute left-5 top-6 z-10 max-w-[70%] sm:left-8 sm:top-8">
            <p className="m-0 text-[15px] font-semibold text-white">{splitPlanTitle(selectedPlan).facing || selectedPlan.title}</p>
            <p className="m-0 mt-1 text-[11.5px] font-medium uppercase tracking-[2px] text-white/55">
              {[
                splitPlanTitle(selectedPlan).config,
                selectedFacing ? `${selectedFacing} Facing` : "",
                formatArea(selectedPlan.area),
              ].filter(Boolean).join(" · ")}
            </p>
          </div>

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-2 py-2 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))} aria-label="Zoom out" className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/20">
              <ZoomOut className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <span className="min-w-[60px] text-center text-[13px] font-medium tabular-nums text-white">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom((z) => Math.min(4, z + 0.25))} aria-label="Zoom in" className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/20">
              <ZoomIn className="h-5 w-5" strokeWidth={1.75} />
            </button>
            <span className="mx-1 h-6 w-px bg-white/20" />
            <button onClick={() => setZoom(1)} aria-label="Reset zoom" className="flex h-10 items-center justify-center rounded-full px-3 text-[12px] font-medium text-white transition hover:bg-white/20">
              Reset
            </button>
          </div>

          <div className="flex max-h-full max-w-full items-center justify-center overflow-auto p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage}
              alt={selectedPlan.title}
              className="max-h-[90vh] max-w-[90vw] select-none object-contain transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
              draggable={false}
            />
          </div>

          <p className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[11px] tracking-wide text-white/50 sm:block">
            Scroll to zoom · ESC to close
          </p>
        </div>,
        document.body
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  EMI CALCULATOR                                                     */
/* ------------------------------------------------------------------ */
function SliderRow({ label, value, display, min, max, step, onChange }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[12.5px] font-medium text-slate-500">{label}</span>
        <input
          type="number" value={value} step={step} min={min} max={max}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-[120px] rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-right text-[13px] font-semibold text-slate-800 outline-none focus:border-[#0F3A6B]"
          aria-label={label}
        />
      </div>
      <input type="range" className="pkr-range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} aria-label={`${label} slider`} />
      {display && <div className="mt-1 text-[11px] text-slate-400">{display}</div>}
    </div>
  );
}

function EmiCalculatorWidget() {
  const [principal, setPrincipal] = useState(2500000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const result = useMemo(() => calcEMI(principal, rate, tenure), [principal, rate, tenure]);
  const principalShare = result.totalPayment ? (principal / result.totalPayment) * 100 : 0;

  return (
    <Card title="EMI Calculator" icon={Calculator}>
      <div className="space-y-4">
        <SliderRow label="Loan amount (₹)" value={principal} display={formatINR(principal)} min={200000} max={20000000} step={50000} onChange={setPrincipal} />
        <SliderRow label="Interest rate (% p.a.)" value={rate} min={5} max={15} step={0.1} onChange={setRate} />
        <SliderRow label="Tenure (years)" value={tenure} min={1} max={30} step={1} onChange={setTenure} />
      </div>

      <div className="mt-4 rounded-2xl p-4 text-white" style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, #061B33 100%)` }}>
        <div className="text-[11px] uppercase tracking-[0.1em] text-white/60">Monthly EMI</div>
        <div className="mt-0.5 text-[28px] font-semibold tracking-tight">{formatINR(result.emi)}</div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full" style={{ width: `${principalShare}%`, background: `linear-gradient(90deg, ${CYAN}, ${ELECTRIC})` }} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-[12px]">
          <div><div className="text-white/60">Total interest</div><div className="font-semibold">{formatINR(result.totalInterest)}</div></div>
          <div className="text-right"><div className="text-white/60">Total payment</div><div className="font-semibold">{formatINR(result.totalPayment)}</div></div>
        </div>
      </div>
      <p className="m-0 mt-2.5 text-[11px] text-slate-400">
        Indicative only. Actual EMI depends on your bank/NBFC&apos;s terms, processing fees & credit profile.
      </p>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  HISTORY PANEL                                                      */
/* ------------------------------------------------------------------ */
function HistoryPanel({
  open,
  onClose,
  sessions,
  loading,
  activeSessionId,
  onSelect,
  onNewChat,
  onDelete,
}) {
  if (!open) return null;
  const groups = groupSessionsByTime(sessions);

  return (
    <div
      className="absolute inset-0 z-30 flex"
      style={{ animation: "pkrOverlayIn .18s ease-out" }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/25 backdrop-blur-[2px]" />
      <aside
        onClick={(e) => e.stopPropagation()}
        className="pkr-slide-left relative z-10 flex h-full w-[86%] max-w-[340px] flex-col border-r border-slate-200/70 bg-white shadow-[20px_0_60px_-30px_rgba(15,23,42,0.35)]"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-[#0F3A6B]" strokeWidth={2.25} />
            <span className="text-[14px] font-semibold text-slate-900">Chat history</span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close history"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200/60 hover:text-slate-800"
          >
            <X className="h-4 w-4" strokeWidth={2.25} />
          </button>
        </div>

        <div className="px-3 pb-2">
          <button
            onClick={onNewChat}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2.5 text-[13.5px] font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <Plus className="h-4 w-4 text-[#0F3A6B]" strokeWidth={2.25} />
            New chat
          </button>
        </div>

        <div className="pkr-scroll flex-1 overflow-y-auto px-2 pb-3">
          {loading && (
            <div className="flex items-center gap-2 px-2 py-4 text-[12.5px] text-slate-400">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-200 border-t-slate-500" />
              Loading conversations…
            </div>
          )}

          {!loading && sessions.length === 0 && (
            <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
                <MessageSquare className="h-5 w-5 text-slate-400" strokeWidth={1.75} />
              </div>
              <p className="m-0 text-[13px] font-medium text-slate-600">No past conversations</p>
              <p className="m-0 text-[12px] text-slate-400">Your chats will appear here once you start talking to the assistant.</p>
            </div>
          )}

          {!loading && groups.map((group) => (
            <div key={group.label} className="mb-1">
              <div className="sticky top-0 z-[1] bg-white/95 px-3 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-slate-400 backdrop-blur">
                {group.label}
              </div>
              <ul className="m-0 list-none space-y-0.5 p-0">
                {group.items.map((s) => {
                  const isActive = s.session_id === activeSessionId;
                  return (
                    <li key={s.session_id} className="group/item relative">
                      <button
                        onClick={() => onSelect(s.session_id)}
                        className={`flex w-full items-start gap-2.5 rounded-xl px-3 py-2.5 pr-9 text-left transition ${
                          isActive ? "bg-[#E8F0F9]" : "hover:bg-slate-100"
                        }`}
                      >
                        <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                          isActive ? "bg-white text-[#0F3A6B]" : "bg-slate-100 text-slate-500 group-hover/item:bg-white"
                        }`}>
                          <MessageSquare className="h-3.5 w-3.5" strokeWidth={2} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block truncate text-[13.5px] font-medium ${isActive ? "text-[#0F3A6B]" : "text-slate-800"}`}>
                            {s.title || s.preview || "Untitled chat"}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1.5 text-[11px] text-slate-400">
                            <Clock className="h-3 w-3" strokeWidth={2} />
                            {formatTime(s.updated_at || s.created_at || s.timestamp)}
                            {typeof s.total === "number" && s.total > 0 && (
                              <>
                                <span className="text-slate-300">·</span>
                                <span>{s.total} messages</span>
                              </>
                            )}
                          </span>
                        </span>
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); onDelete?.(s.session_id); }}
                        aria-label="Delete chat"
                        title="Delete"
                        className="absolute right-1.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg text-slate-300 opacity-0 transition group-hover/item:opacity-100 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 px-4 py-3 text-[11px] text-slate-400">
          Showing your recent chats on this device
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                     */
/* ------------------------------------------------------------------ */
export default function FloatingWidgetsModern() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [enquirePreset, setEnquirePreset] = useState("");
  const [log, setLog] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [botConfig, setBotConfig] = useState(null);
  const [botLoading, setBotLoading] = useState(false);
  const [botInitialized, setBotInitialized] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [plusOpen, setPlusOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  // History drawer
  const [historyPanelOpen, setHistoryPanelOpen] = useState(false);
  const [sessionsList, setSessionsList] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(false);

  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const botName = botConfig?.bot_name || "PKR Assistant";
  const companyName = botConfig?.company_name || COMPANY.name;
  const isEmpty = log.length === 0;

  /* -------------------- MOUNT: preview + mac detect --------------- */
  useEffect(() => {
    const t = setTimeout(() => setShowPreview(true), 1200);
    setIsMac(typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform));
    return () => clearTimeout(t);
  }, []);

  /* -------------------- MOUNT: resolve session id once ------------ */
  useEffect(() => {
    const sid = resolveSessionId();
    try { sessionStorage.setItem(SESSION_STORAGE_KEY, sid); } catch { /* noop */ }
    setSessionId(sid);
    rememberSessionId(sid);
    console.log("[Chatbot] Resolved session id:", sid);
  }, []);

  /* -------------------- Auto-scroll to bottom --------------------- */
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [log]);

  /* -------------------- Lock page scroll + focus composer --------- */
  useEffect(() => {
    if (!chatOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => { document.body.style.overflow = prev; clearTimeout(t); };
  }, [chatOpen]);

  /* -------------------- Keyboard shortcuts ------------------------ */
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setChatOpen((o) => !o);
        setShowPreview(false);
      } else if (e.key === "Escape" && chatOpen && !enquireOpen) {
        if (historyPanelOpen) setHistoryPanelOpen(false);
        else if (plusOpen) setPlusOpen(false);
        else setChatOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [chatOpen, enquireOpen, plusOpen, historyPanelOpen]);

  /* ------------------------------------------------------------------ */
  /*  HELPER: Map API history messages -> UI log entries                */
  /* ------------------------------------------------------------------ */
  const mapHistoryToLog = useCallback((messages = []) => {
    return messages
      .map((msg) => {
        if (msg.role === "user") {
          return { role: "user", kind: "text", label: msg.message };
        }
        if (msg.role === "bot") {
          return { role: "bot", kind: "text", text: msg.message };
        }
        return null;
      })
      .filter(Boolean);
  }, []);

  /* ------------------------------------------------------------------ */
  /*  1) INIT CONFIG                                                    */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (botInitialized) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(CHATBOT_INIT_API, { headers: { Accept: "application/json" } });
        const data = await res.json();
        if (cancelled) return;
        if (data?.status) {
          setBotConfig(data);
          setBotInitialized(true);
          console.log("[Chatbot] Init config loaded:", data);
        }
      } catch (err) {
        console.error("Chatbot init failed:", err);
      }
    })();
    return () => { cancelled = true; };
  }, [botInitialized]);

  /* ------------------------------------------------------------------ */
  /*  2) HISTORY FETCH for active session                               */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!chatOpen || !sessionId) return;
    if (historyLoaded) return;

    let cancelled = false;
    (async () => {
      try {
        setBotLoading(true);
        console.log("[Chatbot] Loading history for session:", sessionId);

        const res = await fetch(`${CHATBOT_HISTORY_API}/${sessionId}`, {
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          console.warn("[Chatbot] History HTTP error:", res.status);
          setHistoryLoaded(true);
          return;
        }

        const data = await res.json();
        console.log("[Chatbot] History response:", data);

        if (cancelled) return;

        if (data?.status && Array.isArray(data.messages) && data.messages.length > 0) {
          const mapped = mapHistoryToLog(data.messages);
          setLog(mapped);

          const firstUser = data.messages.find((m) => m.role === "user");
          const lastMsg = data.messages[data.messages.length - 1];
          rememberSessionId(sessionId, {
            title: firstUser?.message?.slice(0, 60) || "",
            total: data.messages.length,
            updated_at: lastMsg?.timestamp || new Date().toISOString(),
          });
        } else {
          console.log("[Chatbot] No history messages for this session.");
        }
        setHistoryLoaded(true);
      } catch (err) {
        console.warn("Chat history fetch failed:", err);
        setHistoryLoaded(true);
      } finally {
        if (!cancelled) setBotLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [chatOpen, sessionId, historyLoaded, mapHistoryToLog]);

  /* ------------------------------------------------------------------ */
  /*  3) SESSIONS LIST — built from client-side index + per-session     */
  /*     fetches. Falls back gracefully if the index is empty.          */
  /* ------------------------------------------------------------------ */
  const fetchSessionsList = useCallback(async () => {
    const index = readSessionsIndex();
    if (index.length === 0) {
      setSessionsList([]);
      setSessionsLoading(false);
      return;
    }

    setSessionsLoading(true);
    try {
      const results = await Promise.all(
        index.slice(0, 30).map(async (item) => {
          try {
            const res = await fetch(`${CHATBOT_HISTORY_API}/${item.session_id}`, {
              headers: { Accept: "application/json" },
            });
            if (!res.ok) return item;
            const data = await res.json();
            if (!data?.status || !Array.isArray(data.messages) || data.messages.length === 0) {
              return { ...item, total: 0 };
            }
            const firstUser = data.messages.find((m) => m.role === "user");
            const lastMsg = data.messages[data.messages.length - 1];
            return {
              ...item,
              title: firstUser?.message?.slice(0, 60) || item.title || "Untitled chat",
              preview: lastMsg?.message?.slice(0, 80) || "",
              total: data.messages.length,
              updated_at: lastMsg?.timestamp || item.updated_at,
            };
          } catch {
            return item;
          }
        })
      );

      const alive = results.filter((r) => (r.total ?? 0) > 0 || r.session_id === sessionId);

      writeSessionsIndex(alive);

      const sorted = alive.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
      setSessionsList(sorted);
    } catch (err) {
      console.warn("Failed to build sessions list:", err);
      setSessionsList(readSessionsIndex());
    } finally {
      setSessionsLoading(false);
    }
  }, [sessionId]);

  useEffect(() => {
    if (historyPanelOpen) fetchSessionsList();
  }, [historyPanelOpen, fetchSessionsList]);

  /* -------------------- Auto-grow composer ------------------------ */
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 200) + "px";
  }, [chatInput]);

  const openChat = () => { setChatOpen(true); setShowPreview(false); };

  const resetChat = () => {
    setLog([]);
    setChatInput("");
    setHistoryLoaded(false);
    const fresh = getOrCreateSessionId({ forceNew: true });
    setSessionId(fresh);
    rememberSessionId(fresh);
    console.log("[Chatbot] Started new session:", fresh);
    inputRef.current?.focus();
  };

  const loadSession = async (sid) => {
    if (!sid) return;
    setHistoryPanelOpen(false);
    if (sid === sessionId && log.length > 0) return;
    console.log("[Chatbot] Switching to session:", sid);
    setLog([]);
    setHistoryLoaded(false);
    setSessionId(sid);
    try { sessionStorage.setItem(SESSION_STORAGE_KEY, sid); } catch { /* noop */ }
  };

  const deleteSession = (sid) => {
    forgetSessionId(sid);
    setSessionsList((prev) => prev.filter((s) => s.session_id !== sid));
    if (sid === sessionId) resetChat();
  };

  const pushUser = (label) => setLog((l) => [...l, { role: "user", kind: "text", label }]);
  const pushBot = (entry) => setLog((l) => [...l, { role: "bot", ...entry }]);
  const flow = (label, entry) => { setPlusOpen(false); pushUser(label); pushBot(entry); };

  const sendChatMessage = async (rawText) => {
    const text = String(rawText ?? "").trim();
    if (!text) return;
    let sid = sessionId;
    if (!sid) { sid = resolveSessionId(); setSessionId(sid); rememberSessionId(sid); }

    const index = readSessionsIndex();
    const existing = index.find((x) => x.session_id === sid);

    // ---- Smart keyword routing: answer project questions locally with the same data as the project page ----
    const smartEntries = routeMessage(text);
    if (smartEntries) {
      setPlusOpen(false);
      pushUser(text);
      setChatInput("");
      smartEntries.forEach(pushBot);
      rememberSessionId(sid, { title: existing?.title || text.slice(0, 60), total: (existing?.total || 0) + 2 });
      return;
    }

    pushUser(text);
    setChatInput("");
    setLog((l) => [...l, { role: "bot", kind: "typing" }]);

    if (!existing?.title) {
      rememberSessionId(sid, { title: text.slice(0, 60), total: (existing?.total || 0) + 2 });
    } else {
      rememberSessionId(sid, { total: (existing?.total || 0) + 2 });
    }

    try {
      const res = await fetch(CHATBOT_CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ message: text, session_id: sid }),
      });
      let data = null;
      try { data = await res.json(); } catch { data = null; }
      setLog((l) => l.filter((e) => e.kind !== "typing"));
      if (res.ok && data?.status && data.reply) pushBot({ kind: "text", text: data.reply });
      else pushBot({ kind: "text", text: "Sorry, I couldn't process that just now. Please try again or call us at " + COMPANY.phoneDisplay + "." });
    } catch (err) {
      console.error("Chat send failed:", err);
      setLog((l) => l.filter((e) => e.kind !== "typing"));
      pushBot({ kind: "text", text: "⚠️ Network issue — please check your connection and try again." });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendChatMessage(chatInput);
    }
  };

  const goOngoingProjects = () => flow("Ongoing projects", { kind: "projects" });
  const goFloorPlans = () => flow("Floor plans", { kind: "projects" });
  const goCompletedProjects = () => flow("Completed projects", { kind: "completed-projects" });
  const goEmiCalculator = () => flow("EMI calculator", { kind: "emi" });
  const goAboutCompany = () => flow("About PKR Estates", { kind: "about-company" });
  const goContactUs = () => flow("Contact us", { kind: "contact" });
  const backToMenu = () => flow("Main menu", { kind: "menu" });
  const backToProjects = () => flow("Back to projects", { kind: "projects" });
  const backToTopics = (projectKey) => flow("More about this project", { kind: "project-topics", projectKey });
  const selectProject = (projectKey) => flow(PROJECTS[projectKey].name, { kind: "project-topics", projectKey });
  const selectTopic = (projectKey, topic) => flow(PROJECT_TOPIC_META[topic].label, { kind: "project-detail", projectKey, topic });
  const openEnquireFromChat = useCallback((type) => { setPlusOpen(false); setEnquirePreset(type); setEnquireOpen(true); }, []);

  // "View" on a matched layout → opens the full floor plan details for that exact plan
  const viewPlan = (projectKey, m) =>
    flow(`View ${m.title}`, { kind: "project-detail", projectKey, topic: "floorPlans", init: { blockIdx: m.blockIdx, planId: m.planId } });
  const browsePlans = (projectKey) =>
    flow("Open floor plan explorer", { kind: "project-detail", projectKey, topic: "floorPlans" });

  const SUGGESTIONS = [
    { icon: Building2, title: "Ongoing projects", desc: "Explore Gurudev & Privana", onClick: goOngoingProjects },
    { icon: Calculator, title: "EMI calculator", desc: "Estimate your monthly payment", onClick: goEmiCalculator },
    { icon: CheckCircle2, title: "Completed projects", desc: "Homes we've delivered", onClick: goCompletedProjects },
    { icon: Info, title: "About PKR Estates", desc: "Our story & promise", onClick: goAboutCompany },
  ];

  /* ------------------------- TOPIC DETAIL -------------------------- */
  const renderTopicDetail = (project, topic, projectKey, init) => {
    switch (topic) {
      case "overview":
        return (<div className="space-y-3"><p className="m-0">{project.overview}</p>{project.salientFeatures && <Card><FactList items={project.salientFeatures} /></Card>}</div>);
      case "floorPlans":
        return (
          <FloorPlanExplorer
            key={`${projectKey}-${init?.blockIdx ?? ""}-${init?.planId || "all"}`}
            projectKey={projectKey}
            init={init}
            onEnquire={() => openEnquireFromChat(project.name)}
          />
        );
      case "configuration":
        return (
          <div className="space-y-3">
            {project.configuration.map((block, i) => (
              <Card key={i} title={`${block.block} · ${block.structure}`} icon={LayoutGrid}>
                <div className="grid grid-cols-2 gap-2.5">
                  {block.units.map((u, j) => (
                    <div key={j} className="rounded-xl bg-slate-50 px-3 py-3 text-center">
                      <div className="text-[12px] font-medium text-slate-500">{u.type}</div>
                      <div className="text-[24px] font-semibold tracking-tight text-slate-900">{u.count}</div>
                      <div className="text-[11px] text-slate-400">units</div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        );
      case "unitSizes":
        return (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="w-full text-left text-[13.5px]">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-[0.08em] text-slate-500">
                <tr><th className="px-4 py-2.5 font-semibold">Type</th><th className="px-4 py-2.5 font-semibold">Saleable</th><th className="px-4 py-2.5 font-semibold">RERA carpet</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {project.unitSizes.map((u, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{u.type}</td>
                    <td className="px-4 py-3 text-slate-700">{u.saleable}</td>
                    <td className="px-4 py-3 text-slate-500">{u.carpet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "amenities":
        return (
          <div className="flex flex-wrap gap-2">
            {project.amenities.map((a, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[13px] text-slate-700">
                <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />{a}
              </span>
            ))}
          </div>
        );
      case "specifications":
        return (
          <div className="space-y-3">
            {Object.entries(project.specifications).map(([key, items]) => (
              <Card key={key} title={key.replace(/([A-Z])/g, " $1")} icon={Hammer}><FactList items={items} /></Card>
            ))}
          </div>
        );
      case "location":
        return (
          <div className="space-y-3">
            <p className="m-0">{project.location.description}</p>
            <Card title="Nearby landmarks" icon={MapPin}><DistanceList items={project.location.landmarks} /></Card>
            <Card title="Nearby schools" icon={MapPin}><DistanceList items={project.location.schools} /></Card>
            <Card title="Nearby colleges" icon={MapPin}><DistanceList items={project.location.colleges} /></Card>
          </div>
        );
      case "rera":
        return (
          <Card title="RERA registration" icon={ShieldCheck}>
            <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3.5 py-3">
              <code className="text-[14px] font-semibold text-slate-900">{project.rera || "Available on request"}</code>
              {project.rera && (
                <button
                  onClick={() => navigator.clipboard?.writeText(project.rera)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-700"
                  aria-label="Copy RERA number" title="Copy"
                >
                  <Copy className="h-4 w-4" strokeWidth={2} />
                </button>
              )}
            </div>
            <p className="m-0 mt-2.5 text-[12px] text-slate-400">Please verify RERA details on the official TN RERA portal before making any payment.</p>
          </Card>
        );
      case "price":
        return (
          <Card title="Pricing" icon={IndianRupee}>
            <p className="m-0 text-[14px] text-slate-700">{project.priceHint}</p>
            <button
              onClick={() => openEnquireFromChat(project.name)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-[13.5px] font-semibold text-white transition hover:bg-[#0F3A6B]"
            >
              <IndianRupee className="h-3.5 w-3.5" strokeWidth={2.25} />Get current price list
            </button>
          </Card>
        );
      default:
        return null;
    }
  };

  /* ------------------------- BOT ENTRIES --------------------------- */
  const renderBotEntry = (entry, idx) => {
    switch (entry.kind) {
      case "typing":
        return <ThinkingRow key={idx} />;

      case "text":
        return <AssistantRow key={idx}><div className="whitespace-pre-wrap">{parseBotReply(entry.text)}</div></AssistantRow>;

      case "plans-result":
        return (
          <AssistantRow key={idx}>
            <PlanResults
              entry={entry}
              onView={viewPlan}
              onBrowse={browsePlans}
              onEnquire={openEnquireFromChat}
              onPickProject={(k) => selectTopic(k, "floorPlans")}
            />
            <BackLink onClick={backToMenu}>Main menu</BackLink>
          </AssistantRow>
        );

      case "pick-project":
        return (
          <AssistantRow key={idx}>
            <p className="m-0">Which project would you like <strong className="font-semibold text-slate-900">{PROJECT_TOPIC_META[entry.topic].label.toLowerCase()}</strong> for?</p>
            <ChipRow>
              {entry.options.map((k) => (
                <Chip key={k} icon={PROJECTS[k].icon} onClick={() => selectTopic(k, entry.topic)}>{PROJECTS[k].name}</Chip>
              ))}
            </ChipRow>
            <BackLink onClick={backToMenu}>Main menu</BackLink>
          </AssistantRow>
        );

      case "menu":
        return (
          <AssistantRow key={idx}>
            <p className="m-0">Sure — here&apos;s what I can help you with at <strong className="font-semibold text-slate-900">{companyName}</strong>:</p>
            <ChipRow>
              <Chip icon={Building2} onClick={goOngoingProjects}>Ongoing projects</Chip>
              <Chip icon={LayoutGrid} onClick={goFloorPlans}>Floor plans</Chip>
              <Chip icon={CheckCircle2} onClick={goCompletedProjects}>Completed projects</Chip>
              <Chip icon={Calculator} onClick={goEmiCalculator}>EMI calculator</Chip>
              <Chip icon={Info} onClick={goAboutCompany}>About us</Chip>
              <Chip icon={Phone} onClick={goContactUs}>Contact</Chip>
            </ChipRow>
          </AssistantRow>
        );

      case "projects":
        return (
          <AssistantRow key={idx}>
            <p className="m-0">We currently have two ongoing projects. Which one would you like to explore?</p>
            <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {Object.entries(PROJECTS).map(([key, p]) => {
                const Icon = p.icon;
                return (
                  <button
                    key={key} onClick={() => selectProject(key)}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_8px_24px_-12px_rgba(15,58,107,0.35)]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}>
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[14px] font-semibold text-slate-900">{p.name}</span>
                      <span className="block truncate text-[12.5px] text-slate-500">{p.tagline}</span>
                    </span>
                    <ChevronRight className="hidden h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-slate-600 sm:block" />
                  </button>
                );
              })}
            </div>
            <BackLink onClick={backToMenu}>Main menu</BackLink>
          </AssistantRow>
        );

      case "project-topics": {
        const project = PROJECTS[entry.projectKey];
        return (
          <AssistantRow key={idx}>
            <p className="m-0">
              What would you like to know about <strong className="font-semibold text-slate-900">{project.name}</strong>
              <span className="text-slate-400"> · {project.tagline}</span>?
            </p>
            <ChipRow>
              {project.faqTopics.map((topic) => {
                const meta = PROJECT_TOPIC_META[topic];
                return <Chip key={topic} icon={meta.icon} onClick={() => selectTopic(entry.projectKey, topic)}>{meta.label}</Chip>;
              })}
              <Chip primary icon={Mail} onClick={() => openEnquireFromChat(project.name)}>Enquire about {project.name}</Chip>
            </ChipRow>
            <BackLink onClick={backToProjects}>All projects</BackLink>
          </AssistantRow>
        );
      }

      case "project-detail": {
        const project = PROJECTS[entry.projectKey];
        const meta = PROJECT_TOPIC_META[entry.topic];
        const MetaIcon = meta.icon;
        return (
          <AssistantRow key={idx}>
            <div className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
              <MetaIcon className="h-3 w-3" strokeWidth={2.25} />{project.name} · {meta.label}
            </div>
            {renderTopicDetail(project, entry.topic, entry.projectKey, entry.init)}
            <ChipRow>
              <Chip onClick={() => backToTopics(entry.projectKey)}>More topics</Chip>
              <Chip primary icon={Mail} onClick={() => openEnquireFromChat(project.name)}>Enquire now</Chip>
            </ChipRow>
            <BackLink onClick={backToMenu}>Main menu</BackLink>
          </AssistantRow>
        );
      }

      case "completed-projects":
        return (
          <AssistantRow key={idx}>
            <p className="m-0">Here are the projects we&apos;ve completed:</p>
            <div className="mt-3 space-y-2.5">
              {COMPANY.completedProjects.map((p, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <div>
                    <p className="m-0 text-[14px] font-semibold text-slate-900">{p.name}</p>
                    <p className="m-0 text-[13px] text-slate-500">{p.type}</p>
                  </div>
                </div>
              ))}
            </div>
            <BackLink onClick={backToMenu}>Main menu</BackLink>
          </AssistantRow>
        );

      case "about-company":
        return (
          <AssistantRow key={idx}>
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3.5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
                  <img src={LOGO_URL} alt="" className="h-full w-full object-contain" />
                </div>
                <div>
                  <p className="m-0 text-[15px] font-semibold text-slate-900">{COMPANY.name}</p>
                  <p className="m-0 text-[12.5px] text-slate-500">{COMPANY.tagline} · Est. {COMPANY.founded}</p>
                </div>
              </div>
              <p className="m-0">Founded by <strong className="font-semibold text-slate-900">{COMPANY.founder}</strong> in {COMPANY.founded}. {COMPANY.story}</p>
              <Card title="Our mission" icon={Info}><p className="m-0 text-[14px] text-slate-700">{COMPANY.mission}</p></Card>
              <Card title="Our promise" icon={ShieldCheck}><FactList items={COMPANY.promises} /></Card>
              <div className="flex flex-wrap gap-2">
                {[
                  { href: COMPANY.socials.facebook, icon: Share2, label: "Facebook" },
                  { href: COMPANY.socials.instagram, icon: Camera, label: "Instagram" },
                  { href: COMPANY.socials.youtube, icon: Play, label: "YouTube" },
                ].map(({ href, icon: Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[12.5px] font-medium text-slate-700 no-underline transition hover:bg-slate-50">
                    <Icon className="h-3.5 w-3.5 text-[#0F3A6B]" strokeWidth={2} />{label}
                  </a>
                ))}
              </div>
            </div>
            <BackLink onClick={backToMenu}>Main menu</BackLink>
          </AssistantRow>
        );

      case "emi":
        return (
          <AssistantRow key={idx}>
            <p className="m-0 mb-3">Plan your home loan — drag the sliders to estimate your monthly EMI.</p>
            <EmiCalculatorWidget />
            <ChipRow><Chip primary icon={Mail} onClick={() => openEnquireFromChat("General Enquiry")}>Talk to a loan advisor</Chip></ChipRow>
            <BackLink onClick={backToMenu}>Main menu</BackLink>
          </AssistantRow>
        );

      case "contact":
        return (
          <AssistantRow key={idx}>
            <p className="m-0 mb-3">You can reach {COMPANY.name} here:</p>
            <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 px-4 py-3 no-underline transition hover:bg-slate-50">
                <Phone className="h-4 w-4 text-[#0F3A6B]" strokeWidth={2} />
                <span className="text-[14px] font-semibold text-slate-900">{botConfig?.contact || COMPANY.phoneDisplay}</span>
              </a>
              <a href={COMPANY.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-3 no-underline transition hover:bg-slate-50">
                <Globe className="h-4 w-4 text-[#0F3A6B]" strokeWidth={2} />
                <span className="text-[14px] font-semibold text-slate-900">pkrestates.com</span>
              </a>
              <div className="flex items-start gap-3 px-4 py-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-slate-400" strokeWidth={2} />
                <span className="text-[13.5px] text-slate-600">{COMPANY.address}</span>
              </div>
            </div>
            <ChipRow><Chip primary icon={Mail} onClick={() => openEnquireFromChat("General Enquiry")}>Submit an enquiry</Chip></ChipRow>
            <BackLink onClick={backToMenu}>Main menu</BackLink>
          </AssistantRow>
        );

      default:
        return null;
    }
  };

  /* ------------------------- COMPOSER ------------------------------ */
  const composer = (
    <div className="relative">
      {plusOpen && (
        <div className="pkr-fade-up absolute bottom-full left-0 z-10 mb-2 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)]">
          {[
            { icon: Building2, label: "Ongoing projects", onClick: goOngoingProjects },
            { icon: LayoutGrid, label: "Floor plans", onClick: goFloorPlans },
            { icon: Calculator, label: "EMI calculator", onClick: goEmiCalculator },
            { icon: Phone, label: "Contact details", onClick: goContactUs },
            { icon: Mail, label: "Submit an enquiry", onClick: () => openEnquireFromChat("General Enquiry") },
          ].map(({ icon: Icon, label, onClick }) => (
            <button key={label} onClick={onClick} className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13.5px] text-slate-700 transition hover:bg-slate-100">
              <Icon className="h-4 w-4 text-slate-500" strokeWidth={2} />{label}
            </button>
          ))}
        </div>
      )}
      <form
        onSubmit={(e) => { e.preventDefault(); sendChatMessage(chatInput); }}
        className="rounded-[26px] border border-slate-200 bg-white px-3 pb-2.5 pt-3 shadow-[0_2px_4px_rgba(15,23,42,0.02),0_12px_32px_-16px_rgba(15,58,107,0.25)] transition focus-within:border-slate-300 focus-within:shadow-[0_2px_4px_rgba(15,23,42,0.03),0_16px_40px_-16px_rgba(15,58,107,0.35)]"
      >
        <textarea
          ref={inputRef}
          rows={1}
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isEmpty ? "Try: 2 BHK floor plans in Privana…" : `Reply to ${botName}…`}
          className="block max-h-[200px] w-full resize-none border-0 bg-transparent px-2 text-[15px] leading-6 text-slate-800 outline-none placeholder:text-slate-400"
        />
        <div className="mt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setPlusOpen((o) => !o)}
            aria-label="Quick actions"
            className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${plusOpen ? "rotate-45 border-slate-300 bg-slate-100" : "border-slate-200 hover:bg-slate-50"}`}
          >
            <Plus className="h-4 w-4 text-slate-600" strokeWidth={2} />
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1 text-[11px] text-slate-400 sm:flex">
              <CornerDownLeft className="h-3 w-3" /> to send
            </span>
            <button
              type="submit"
              aria-label="Send"
              disabled={!chatInput.trim()}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white transition disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              style={chatInput.trim() ? { background: `linear-gradient(135deg, ${ELECTRIC}, ${DEEP_NAVY})` } : undefined}
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );

  /* ------------------------- RENDER -------------------------------- */
  return (
    <>
      <style>{GLOBAL_STYLES}</style>

      <button
        onClick={() => openEnquireFromChat("")}
        className="fixed right-0 top-1/2 z-[9998] -translate-y-1/2 rounded-l-md px-1.5 py-2 text-[9px] font-bold tracking-wide text-white antialiased shadow-[-2px_0_8px_rgba(15,58,107,0.25)] transition-all [writing-mode:sideways-lr] sm:px-3.5 sm:py-3.5 sm:text-[15px] sm:tracking-wider sm:hover:pr-4"
        style={{ backgroundColor: DEEP_NAVY, backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
      >
        ENQUIRE NOW
      </button>

      <EnquireModal open={enquireOpen} onClose={() => setEnquireOpen(false)} presetType={enquirePreset} />

      {!chatOpen && (
        <div className="fixed bottom-5 left-1/2 z-[9998] flex -translate-x-1/2 flex-col items-center gap-2 sm:bottom-6">
          {/* {showPreview && (
            <div className="pkr-fade-up relative flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/90 py-1.5 pl-2 pr-8 text-[12.5px] text-slate-600 shadow-lg backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
              We&apos;re online — ask me anything
              <button onClick={() => setShowPreview(false)} aria-label="Dismiss" className="absolute right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                <X className="h-3 w-3" strokeWidth={2.5} />
              </button>
            </div>
          )} */}
          <button
            onClick={openChat}
            aria-label="Open AI assistant"
            className="group relative flex items-center gap-3 rounded-full border border-white/10 bg-[#0B1C33] py-2 pl-2 pr-4 shadow-[0_18px_40px_-12px_rgba(15,58,107,0.55)] transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-[#0E2340] hover:shadow-[0_22px_48px_-12px_rgba(15,58,107,0.65)] active:translate-y-0 active:scale-[0.98] sm:pr-5"
          >
            <span style={{ animation: "pkrFloat 3s ease-in-out infinite" }}>
              <AIOrb size={34} showLogo />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[13.5px] font-semibold text-white sm:text-[14px]">Ask PKR</span>
            </span>
           
          </button>
        </div>
      )}

      {chatOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/30 p-3 backdrop-blur-md sm:p-6"
          style={{ animation: "pkrOverlayIn .25s ease-out" }}
          onClick={() => setChatOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${botName} chat`}
            onClick={(e) => { e.stopPropagation(); if (plusOpen) setPlusOpen(false); }}
            className="relative flex h-[86vh] max-h-[680px] w-full flex-col overflow-hidden rounded-[24px] border border-white/70 shadow-[0_30px_80px_-20px_rgba(15,23,42,0.45)] sm:h-[88vh] sm:max-h-[860px] sm:max-w-[820px] sm:rounded-[28px] sm:border sm:border-white/70 sm:shadow-[0_50px_120px_-30px_rgba(15,23,42,0.55)]"
            style={{ backgroundColor: CANVAS, animation: "pkrPanelIn .4s cubic-bezier(.22,1,.36,1)" }}
          >
            <div
              className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[640px] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
              style={{ background: `radial-gradient(closest-side, ${CYAN}33, ${ELECTRIC}22, transparent)` }}
            />

            <HistoryPanel
              open={historyPanelOpen}
              onClose={() => setHistoryPanelOpen(false)}
              sessions={sessionsList}
              loading={sessionsLoading}
              activeSessionId={sessionId}
              onSelect={loadSession}
              onNewChat={() => { setHistoryPanelOpen(false); resetChat(); }}
              onDelete={deleteSession}
            />

            <header className="relative z-[1] flex items-center justify-between px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2.5">
                <AIOrb size={26} showLogo />
                <div className="leading-tight">
                  <div className="text-[14px] font-semibold text-slate-900">{botName}</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <span className="hidden h-1.5 w-1.5 rounded-full bg-emerald-400 sm:inline-block" />
                    {companyName}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setHistoryPanelOpen(true)}
                  title="Chat history"
                  aria-label="Chat history"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200/60 hover:text-slate-800"
                >
                  <History className="h-[18px] w-[18px]" strokeWidth={2} />
                </button>
                {!isEmpty && (
                  <button onClick={resetChat} title="New chat" className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12.5px] font-medium text-slate-500 transition hover:bg-slate-200/60 hover:text-slate-800">
                    <SquarePen className="h-4 w-4" strokeWidth={2} />
                    <span className="hidden sm:inline">New chat</span>
                  </button>
                )}
                <button onClick={() => setChatOpen(false)} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-200/60 hover:text-slate-800">
                  <X className="h-[18px] w-[18px]" strokeWidth={2} />
                </button>
              </div>
            </header>

            {isEmpty ? (
              <div className="pkr-scroll relative z-[1] flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 pb-6 sm:px-8">
                <div className="w-full max-w-[640px]">
                  <div className="pkr-fade-up mb-8 flex flex-col items-center text-center">
                    {/* <AIOrb size={64} showLogo bg={false} src={GREETING_LOGO_URL} /> */}
                    <h1 className="m-0 mt-5 text-[30px] font-normal leading-tight tracking-tight text-slate-900 sm:text-[38px]" style={{ fontFamily: SERIF }}>
                      {timeGreeting()}, how can I help?
                    </h1>
                    <p className="m-0 mt-2 max-w-[460px] text-[14px] text-slate-500">
                      {botLoading
                        ? <span className="pkr-shimmer-text font-medium">Connecting to assistant…</span>
                        : (botConfig?.greeting ? parseBotReply(botConfig.greeting) : `Your guide to ${COMPANY.name} — ${COMPANY.tagline.toLowerCase()}.`)}
                    </p>
                  </div>

                  <div className="pkr-fade-up" style={{ animationDelay: "80ms" }}>{composer}</div>

                  <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {SUGGESTIONS.map(({ icon: Icon, title, desc, onClick }, i) => (
                      <button
                        key={title} onClick={onClick}
                        className="pkr-fade-up group flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/70 p-3.5 text-left backdrop-blur transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:bg-white hover:shadow-[0_10px_30px_-15px_rgba(15,58,107,0.35)]"
                        style={{ animationDelay: `${140 + i * 50}ms` }}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-[#0F3A6B] transition group-hover:bg-[#E8F0F9]">
                          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[13.5px] font-semibold text-slate-800">{title}</span>
                          <span className="block truncate text-[12px] text-slate-500">{desc}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div ref={scrollRef} className="pkr-scroll relative z-[1] flex-1 overflow-y-auto">
                  <div className="mx-auto flex w-full max-w-[680px] flex-col gap-7 px-4 pb-8 pt-4 sm:px-6">
                    {log.map((entry, idx) =>
                      entry.role === "user"
                        ? <UserRow key={idx}>{entry.label}</UserRow>
                        : renderBotEntry(entry, idx)
                    )}
                  </div>
                </div>
                <div className="relative z-[1] mx-auto w-full max-w-[720px] px-3 pb-3 sm:px-6 sm:pb-4">
                  <div className="pointer-events-none absolute -top-8 left-0 right-0 h-8" style={{ background: `linear-gradient(to bottom, transparent, ${CANVAS})` }} />
                  {composer}
                  <p className="m-0 mt-2 text-center text-[11px] text-slate-400">
                    {botName} can make mistakes. Please verify pricing & RERA details with our team.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
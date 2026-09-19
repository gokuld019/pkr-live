"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Building2, CheckCircle2, Calculator, Info, Phone, Mail, Globe, MapPin, X,
  RotateCcw, Send, ChevronRight, Check, AlertTriangle, Home, LayoutGrid,
  Ruler, Leaf, Hammer, FileText, IndianRupee, Share2, Camera, Play, Building,
  ShieldCheck, RefreshCw,
} from "lucide-react";

const LOGO_URL = "/logo.jpeg";

// ============ THEME TOKENS ============
const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const DEEP_NAVY_DARK = "#0A2B50";
const DEEP_NAVY_LIGHT = "#4A6FA5";
const TEXT_CHARCOAL = "#2D3A46";
const LIGHT_BLUE = "#E8F0F9";
const LIGHT_BLUE_SOFT = "#F0F6FC";
const LIGHT_BLUE_DEEP = "#D5E1ED";
const LINE = "#E0E8F0";

// Legacy aliases (kept so nothing else needs renaming)
const GOLD = DEEP_NAVY;
const GOLD_LIGHT = DEEP_NAVY_LIGHT;
const GOLD_DARK = DEEP_NAVY_DARK;
const INK = "#1c1c1c";

const ENQUIRY_API = "https://api.crazystory.in/api/submit-enquiry";
const CHATBOT_INIT_API = "https://api.crazystory.in/api/chatbot/init";
const CHATBOT_CHAT_API = "https://api.crazystory.in/api/chatbot/chat";
const INQUIRY_TYPES = ["General Enquiry", "Gurudev", "Privana"];

const SESSION_STORAGE_KEY = "chatbot_session_id";

/* ------------------------------------------------------------------ */
/*  SESSION ID HELPERS                                                 */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  BOT REPLY FORMATTER                                                */
/* ------------------------------------------------------------------ */
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
        <strong key={`b-${lineIdx}-${match.index}`} className="font-bold" style={{ color: DEEP_NAVY }}>
          {match[1]}
        </strong>
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
    faqTopics: ["overview", "configuration", "unitSizes", "amenities", "specifications", "location", "rera", "price"],
  },
  privana: {
    name: "Privana",
    tagline: "Details coming soon",
    icon: Building,
    overview:
      "Privana details will be added here once the brochure is uploaded. For now, you can reach out to our team directly for more information.",
    faqTopics: ["overview"],
  },
};

/* ------------------------------------------------------------------ */
/*  EMI CALCULATOR ENGINE                                              */
/* ------------------------------------------------------------------ */
function calcEMI(principal, annualRatePct, tenureYears) {
  const P = Number(principal);
  const r = Number(annualRatePct) / 12 / 100;
  const n = Number(tenureYears) * 12;
  if (!P || !r || !n) return { emi: 0, totalPayment: 0, totalInterest: 0 };
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;
  return { emi, totalPayment, totalInterest };
}

function formatINR(num) {
  if (!Number.isFinite(num)) return "—";
  return "₹" + Math.round(num).toLocaleString("en-IN");
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
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
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
            const field = keyMap[key] || key;
            mapped[field] = Array.isArray(val) ? val[0] : String(val);
          });
          setFieldErrors(mapped);
        }
        setErrorMessage(data?.message || "Something went wrong while submitting your enquiry. Please try again.");
        setSubmitting(false); return;
      }

      setSuccessMessage(data.message || "Your enquiry has been received. Our team will reach out to you shortly.");
      setSubmitting(false); setSubmitted(true);
    } catch (err) {
      console.error("Enquiry submit failed:", err);
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
  `w-full rounded-xl border-0 bg-[#F0F6FC] px-4 py-3 text-[14px] text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 ${
    fieldErrors[field]
      ? "ring-1 ring-red-400 focus:ring-red-500"
      : "focus:ring-[#0F3A6B]/20"
  }`;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full w-full max-w-[460px] overflow-y-auto rounded-[22px] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
        style={{ animation: "enquireModalIn 0.35s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <style>{`
          @keyframes enquireModalIn {
            from { opacity: 0; transform: translateY(16px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <div className="relative px-6 pb-8 pt-7 sm:px-8" style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}>
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25">
            <X className="h-4 w-4" strokeWidth={2.25} />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md">
              <img src={LOGO_URL} alt="" className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="m-0 text-[19px] font-bold leading-tight text-white sm:text-[21px]">Let&apos;s Talk</h2>
              <p className="m-0 mt-0.5 text-[12.5px] text-[#B8CFE8]">We&apos;ll get back to you within 24 hours</p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 px-6 py-14 text-center sm:px-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: `${DEEP_NAVY}1a` }}>
              <Check className="h-7 w-7" style={{ color: DEEP_NAVY }} strokeWidth={2.5} />
            </div>
            <h3 className="m-0 text-[18px] font-bold text-gray-800">Thank You!</h3>
            <p className="m-0 max-w-[300px] text-[13.5px] leading-relaxed text-gray-500">{successMessage}</p>
            <button onClick={onClose} className="mt-3 rounded-full px-6 py-2.5 text-[13.5px] font-bold text-white transition-transform hover:scale-[1.03]" style={{ backgroundColor: DEEP_NAVY }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-6 sm:px-8">
            {errorMessage && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] leading-snug text-red-700">
                <AlertTriangle className="mt-[1px] h-4 w-4 shrink-0" strokeWidth={2} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold text-gray-600">
                Full Name <span style={{ color: DEEP_NAVY }}>*</span>
              </label>
              <input required type="text" name="full_name" placeholder="Enter your name" value={form.name} onChange={handleChange("name")} className={inputClass("name")} style={{ backgroundColor: LIGHT_BLUE_SOFT }} />
              {fieldErrors.name && <span className="text-[11.5px] text-red-600">{fieldErrors.name}</span>}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-gray-600">
                  Email <span style={{ color: DEEP_NAVY }}>*</span>
                </label>
                <input required type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange("email")} className={inputClass("email")} style={{ backgroundColor: LIGHT_BLUE_SOFT }} />
                {fieldErrors.email && <span className="text-[11.5px] text-red-600">{fieldErrors.email}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-gray-600">
                  Phone <span style={{ color: DEEP_NAVY }}>*</span>
                </label>
                <input required type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange("phone")} className={inputClass("phone")} style={{ backgroundColor: LIGHT_BLUE_SOFT }} />
                {fieldErrors.phone && <span className="text-[11.5px] text-red-600">{fieldErrors.phone}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold text-gray-600">
                Inquiry Type <span style={{ color: DEEP_NAVY }}>*</span>
              </label>
              <div className="relative">
                <select required name="inquiry_type" value={form.inquiryType} onChange={handleChange("inquiryType")} className={`${inputClass("inquiryType")} appearance-none pr-10`} style={{ backgroundColor: LIGHT_BLUE_SOFT }}>
                  <option value="" disabled>Select an option</option>
                  {INQUIRY_TYPES.map((type) => (<option key={type} value={type}>{type}</option>))}
                </select>
                <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-gray-400" strokeWidth={2.25} />
              </div>
              {fieldErrors.inquiryType && <span className="text-[11.5px] text-red-600">{fieldErrors.inquiryType}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold text-gray-600">
                Your Message <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea rows={3} name="message" placeholder="Tell us a bit more..." value={form.message} onChange={handleChange("message")} className={`${inputClass("message")} resize-none`} style={{ backgroundColor: LIGHT_BLUE_SOFT }} />
              {fieldErrors.message && <span className="text-[11.5px] text-red-600">{fieldErrors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-[14.5px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(15,58,107,0.55)] transition-all hover:shadow-[0_14px_30px_-8px_rgba(15,58,107,0.65)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
            >
              {submitting ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Sending...</>
              ) : (
                <><Send className="h-4 w-4" strokeWidth={2.25} />Submit Enquiry</>
              )}
            </button>

            <p className="m-0 text-center text-[11px] text-gray-400">By submitting, you agree to be contacted by PKR Estates regarding your enquiry.</p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  CHAT UI PRIMITIVES                                                  */
/* ------------------------------------------------------------------ */
function BotBubble({ children }) {
  return (
    <div className="max-w-[90%] self-start rounded-2xl rounded-tl-md border bg-white p-3.5 text-[13.5px] leading-relaxed shadow-[0_2px_10px_rgba(15,58,107,0.04)]" style={{ borderColor: LINE, color: TEXT_CHARCOAL }}>
      {children}
    </div>
  );
}

function BotTextBubble({ text }) {
  return (
    <div className="max-w-[90%] self-start rounded-2xl rounded-tl-md border bg-white p-3.5 text-[13.5px] leading-relaxed whitespace-pre-wrap shadow-[0_2px_10px_rgba(15,58,107,0.04)]" style={{ borderColor: LINE, color: TEXT_CHARCOAL }}>
      {parseBotReply(text)}
    </div>
  );
}

function UserBubble({ children }) {
  return (
    <div
      className="max-w-[82%] self-end rounded-2xl rounded-tr-md px-4 py-2.5 text-[13.5px] font-medium text-white shadow-sm"
      style={{ background: `linear-gradient(135deg, ${DEEP_NAVY_LIGHT}, ${DEEP_NAVY_DARK})` }}
    >
      {children}
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="max-w-[90%] self-start rounded-2xl rounded-tl-md border bg-white px-4 py-3 shadow-[0_2px_10px_rgba(15,58,107,0.04)]" style={{ borderColor: LINE }}>
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: DEEP_NAVY, animationDelay: "0ms" }} />
        <span className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: DEEP_NAVY, animationDelay: "150ms" }} />
        <span className="h-2 w-2 animate-bounce rounded-full" style={{ backgroundColor: DEEP_NAVY, animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

function OptionButton({ children, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-2 rounded-xl border bg-white px-4 py-3 text-left text-[13.5px] font-semibold shadow-[0_1px_4px_rgba(15,58,107,0.03)] transition-all"
      style={{ borderColor: LINE, color: DEEP_NAVY }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = DEEP_NAVY
        e.currentTarget.style.backgroundColor = LIGHT_BLUE_SOFT
        e.currentTarget.style.transform = 'translateY(-1px)'
        e.currentTarget.style.boxShadow = '0 6px 16px -6px rgba(15,58,107,0.35)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = LINE
        e.currentTarget.style.backgroundColor = '#FFFFFF'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 1px 4px rgba(15,58,107,0.03)'
      }}
    >
      <span className="flex items-center gap-2.5">
        {Icon && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}>
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
        )}
        {children}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" style={{ color: DEEP_NAVY }} strokeWidth={2.25} />
    </button>
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="rounded-xl border p-3.5" style={{ borderColor: LINE, backgroundColor: LIGHT_BLUE_SOFT }}>
      <p className="m-0 mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: DEEP_NAVY }}>
        {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />}
        {title}
      </p>
      {children}
    </div>
  );
}

function FactList({ items }) {
  return (
    <ul className="m-0 list-none space-y-1.5 pl-0">
      {items.map((f, i) => (
        <li key={i} className="flex items-start gap-2 text-[13px]" style={{ color: TEXT_CHARCOAL }}>
          <Check className="mt-[2px] h-3.5 w-3.5 shrink-0" style={{ color: DEEP_NAVY }} strokeWidth={2.5} />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  );
}

function DistanceList({ items }) {
  return (
    <ul className="m-0 list-none space-y-1">
      {items.map((it, i) => (
        <li key={i} className="flex items-center justify-between gap-3 border-b py-1.5 text-[12.5px] last:border-b-0" style={{ borderColor: LINE }}>
          <span className="flex items-center gap-1.5" style={{ color: TEXT_CHARCOAL }}>
            <MapPin className="h-3 w-3 shrink-0 text-gray-400" strokeWidth={2} />
            {it.label}
          </span>
          <span className="whitespace-nowrap font-semibold" style={{ color: DEEP_NAVY }}>{it.distance}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/*  EMI CALCULATOR WIDGET (inline in chat)                             */
/* ------------------------------------------------------------------ */
function EmiCalculatorWidget() {
  const [principal, setPrincipal] = useState("2500000");
  const [rate, setRate] = useState("8.5");
  const [tenure, setTenure] = useState("20");
  const result = useMemo(() => calcEMI(principal, rate, tenure), [principal, rate, tenure]);

  const inputStyle = { borderColor: LINE, color: DEEP_NAVY };

  return (
    <SectionCard title="EMI Calculator" icon={Calculator}>
      <div className="mb-3 grid grid-cols-1 gap-2.5">
        <label className="flex flex-col gap-1">
          <span className="text-[11.5px] font-semibold" style={{ color: TEXT_CHARCOAL }}>Loan Amount (₹)</span>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)}
            className="w-full rounded-lg border bg-white px-3 py-2 text-[13px] outline-none"
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = DEEP_NAVY)}
            onBlur={(e) => (e.currentTarget.style.borderColor = LINE)}
          />
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <label className="flex flex-col gap-1">
            <span className="text-[11.5px] font-semibold" style={{ color: TEXT_CHARCOAL }}>Interest (% p.a.)</span>
            <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-lg border bg-white px-3 py-2 text-[13px] outline-none"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = DEEP_NAVY)}
              onBlur={(e) => (e.currentTarget.style.borderColor = LINE)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11.5px] font-semibold" style={{ color: TEXT_CHARCOAL }}>Tenure (yrs)</span>
            <input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)}
              className="w-full rounded-lg border bg-white px-3 py-2 text-[13px] outline-none"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = DEEP_NAVY)}
              onBlur={(e) => (e.currentTarget.style.borderColor = LINE)}
            />
          </label>
        </div>
      </div>

      <div className="rounded-lg p-3 text-white" style={{ background: `linear-gradient(135deg, ${DEEP_NAVY_LIGHT}, ${DEEP_NAVY_DARK})` }}>
        <div className="flex items-center justify-between text-[12.5px]">
          <span className="opacity-90">Monthly EMI</span>
          <span className="text-[17px] font-bold">{formatINR(result.emi)}</span>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11.5px] opacity-90">
          <span>Total Interest</span>
          <span className="font-semibold">{formatINR(result.totalInterest)}</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-[11.5px] opacity-90">
          <span>Total Payment</span>
          <span className="font-semibold">{formatINR(result.totalPayment)}</span>
        </div>
      </div>
      <p className="m-0 mt-2 text-[10.5px] text-gray-400">
        Indicative only. Actual EMI depends on your bank/NBFC's terms, processing fees & credit profile.
      </p>
    </SectionCard>
  );
}

/* ------------------------------------------------------------------ */
/*  CHAT FLOW ENGINE                                                   */
/* ------------------------------------------------------------------ */
const ROOT_MESSAGE = { role: "bot", kind: "menu" };

const PROJECT_TOPIC_META = {
  overview: { label: "Overview", icon: Home },
  configuration: { label: "Configuration & Units", icon: LayoutGrid },
  unitSizes: { label: "Unit Sizes", icon: Ruler },
  amenities: { label: "Amenities", icon: Leaf },
  specifications: { label: "Specifications", icon: Hammer },
  location: { label: "Location & Landmarks", icon: MapPin },
  rera: { label: "RERA Details", icon: FileText },
  price: { label: "Pricing", icon: IndianRupee },
};

export default function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [enquirePreset, setEnquirePreset] = useState("");
  const [log, setLog] = useState([ROOT_MESSAGE]);
  const scrollRef = useRef(null);

  const [chatInput, setChatInput] = useState("");
  const [botConfig, setBotConfig] = useState(null);
  const [botLoading, setBotLoading] = useState(false);
  const [botInitialized, setBotInitialized] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => { setShowPreview(true); }, []);
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [log]);
  useEffect(() => { if (!chatOpen) return; if (sessionId) return; setSessionId(getOrCreateSessionId()); }, [chatOpen, sessionId]);

  useEffect(() => {
    if (!chatOpen || botInitialized) return;
    let cancelled = false;

    const initChatbot = async () => {
      try {
        setBotLoading(true);
        const res = await fetch(CHATBOT_INIT_API, { headers: { Accept: "application/json" } });
        const data = await res.json();
        if (cancelled) return;
        if (data?.status) {
          setBotConfig(data);
          setBotInitialized(true);
          if (data.greeting) setLog((l) => [...l, { role: "bot", kind: "text", text: data.greeting }]);
        }
      } catch (err) {
        console.error("Chatbot init failed:", err);
      } finally {
        if (!cancelled) setBotLoading(false);
      }
    };

    initChatbot();
    return () => { cancelled = true; };
  }, [chatOpen, botInitialized]);

  const handleChatToggle = () => { setChatOpen((prev) => !prev); setShowPreview(false); };

  const resetChat = () => {
    setLog([ROOT_MESSAGE]);
    setChatInput("");
    setSessionId(getOrCreateSessionId({ forceNew: true }));
  };

  const pushUser = (label) => setLog((l) => [...l, { role: "user", kind: "text", label }]);
  const pushBot = (entry) => setLog((l) => [...l, { role: "bot", ...entry }]);

  const sendChatMessage = async (rawText) => {
    const text = String(rawText ?? "").trim();
    if (!text) return;

    let sid = sessionId;
    if (!sid) { sid = getOrCreateSessionId(); setSessionId(sid); }

    pushUser(text);
    setChatInput("");
    setLog((l) => [...l, { role: "bot", kind: "typing" }]);
    await new Promise((r) => setTimeout(r, 500));

    try {
      const res = await fetch(CHATBOT_CHAT_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ message: text, session_id: sid }),
      });
      let data = null;
      try { data = await res.json(); } catch { data = null; }

      setLog((l) => l.filter((e) => e.kind !== "typing"));

      if (res.ok && data?.status && data.reply) {
        pushBot({ kind: "text", text: data.reply });
      } else {
        pushBot({ kind: "text", text: "Sorry, I couldn't process that just now. Please try again or call us at " + COMPANY.phoneDisplay + "." });
      }
    } catch (err) {
      console.error("Chat send failed:", err);
      setLog((l) => l.filter((e) => e.kind !== "typing"));
      pushBot({ kind: "text", text: "⚠️ Network issue — please check your connection and try again." });
    }
  };

  const handleInputSubmit = (e) => { e.preventDefault(); sendChatMessage(chatInput); };

  const goOngoingProjects = () => { pushUser("Ongoing Projects"); pushBot({ kind: "projects" }); };
  const goContactUs = () => { pushUser("Contact Us"); pushBot({ kind: "contact" }); };
  const goAboutCompany = () => { pushUser("About PKR Estates"); pushBot({ kind: "about-company" }); };
  const goCompletedProjects = () => { pushUser("Completed Projects"); pushBot({ kind: "completed-projects" }); };
  const goEmiCalculator = () => { pushUser("EMI Calculator"); pushBot({ kind: "emi" }); };

  const openEnquireFromChat = (type) => { setEnquirePreset(type); setEnquireOpen(true); };

  const selectProject = (projectKey) => {
    const project = PROJECTS[projectKey];
    pushUser(project.name);
    pushBot({ kind: "project-topics", projectKey });
  };

  const selectTopic = (projectKey, topic) => {
    const meta = PROJECT_TOPIC_META[topic];
    pushUser(meta.label);
    pushBot({ kind: "project-detail", projectKey, topic });
  };

  const backToProjects = () => { pushUser("Back to projects"); pushBot({ kind: "projects" }); };
  const backToTopics = (projectKey) => { pushUser("More about this project"); pushBot({ kind: "project-topics", projectKey }); };
  const backToMenu = () => { pushUser("Main menu"); pushBot({ kind: "menu" }); };

  const renderTopicDetail = (project, topic) => {
    switch (topic) {
      case "overview":
        return (<><p className="m-0 mb-2">{project.overview}</p>{project.salientFeatures && <FactList items={project.salientFeatures} />}</>);
      case "configuration":
        return (
          <div className="space-y-2.5">
            {project.configuration.map((block, i) => (
              <SectionCard key={i} title={`${block.block} · ${block.structure}`} icon={LayoutGrid}>
                <ul className="m-0 grid grid-cols-2 gap-2">
                  {block.units.map((u, j) => (
                    <li key={j} className="rounded-lg bg-white px-2.5 py-2 text-center text-[12.5px] font-semibold shadow-sm" style={{ color: DEEP_NAVY }}>
                      {u.type}
                      <div className="text-[15px] font-bold" style={{ color: DEEP_NAVY }}>{u.count}</div>
                      <div className="text-[10.5px] font-normal text-gray-400">units</div>
                    </li>
                  ))}
                </ul>
              </SectionCard>
            ))}
          </div>
        );
      case "unitSizes":
        return (
          <div className="space-y-2">
            {project.unitSizes.map((u, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border px-3 py-2.5" style={{ borderColor: LINE, backgroundColor: LIGHT_BLUE_SOFT }}>
                <span className="flex items-center gap-1.5 text-[13px] font-semibold" style={{ color: DEEP_NAVY }}>
                  <Ruler className="h-3.5 w-3.5" strokeWidth={2} style={{ color: DEEP_NAVY }} />
                  {u.type}
                </span>
                <div className="text-right text-[12px]">
                  <div style={{ color: TEXT_CHARCOAL }}>Saleable: <strong>{u.saleable}</strong></div>
                  <div className="text-gray-400">RERA Carpet: {u.carpet}</div>
                </div>
              </div>
            ))}
          </div>
        );
      case "amenities":
        return <FactList items={project.amenities} />;
      case "specifications":
        return (
          <div className="space-y-2.5">
            {Object.entries(project.specifications).map(([key, items]) => (
              <SectionCard key={key} title={key.replace(/([A-Z])/g, " $1")} icon={Hammer}>
                <FactList items={items} />
              </SectionCard>
            ))}
          </div>
        );
      case "location":
        return (
          <div className="space-y-2.5">
            <p className="m-0">{project.location.description}</p>
            <SectionCard title="Nearby Landmarks" icon={MapPin}><DistanceList items={project.location.landmarks} /></SectionCard>
            <SectionCard title="Nearby Schools" icon={MapPin}><DistanceList items={project.location.schools} /></SectionCard>
            <SectionCard title="Nearby Colleges" icon={MapPin}><DistanceList items={project.location.colleges} /></SectionCard>
          </div>
        );
      case "rera":
        return (
          <SectionCard title="RERA Registration" icon={ShieldCheck}>
            <p className="m-0 text-[13px]" style={{ color: TEXT_CHARCOAL }}>
              RERA Number: <strong style={{ color: DEEP_NAVY }}>{project.rera || "Available on request"}</strong>
            </p>
            <p className="m-0 mt-2 text-[11.5px] text-gray-400">
              Please verify RERA details on the official TN RERA portal before making any payment.
            </p>
          </SectionCard>
        );
      case "price":
        return (
          <SectionCard title="Pricing" icon={IndianRupee}>
            <p className="m-0 text-[13px]" style={{ color: TEXT_CHARCOAL }}>{project.priceHint}</p>
            <button onClick={() => openEnquireFromChat(project.name)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-bold text-white"
              style={{ backgroundColor: DEEP_NAVY }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}>
              <IndianRupee className="h-3.5 w-3.5" strokeWidth={2.25} />
              Get Current Price List
            </button>
          </SectionCard>
        );
      default:
        return null;
    }
  };

  const renderBotEntry = (entry, idx) => {
    switch (entry.kind) {
      case "menu":
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <BotBubble>
              Hello! Welcome to <strong>{botConfig?.company_name || COMPANY.name}</strong> — {botConfig?.tagline || COMPANY.tagline}. How can I help you today?
            </BotBubble>
            <OptionButton icon={Building2} onClick={goOngoingProjects}>Ongoing Projects</OptionButton>
            <OptionButton icon={CheckCircle2} onClick={goCompletedProjects}>Completed Projects</OptionButton>
            <OptionButton icon={Calculator} onClick={goEmiCalculator}>EMI Calculator</OptionButton>
            <OptionButton icon={Info} onClick={goAboutCompany}>About PKR Estates</OptionButton>
            <OptionButton icon={Phone} onClick={goContactUs}>Contact Us</OptionButton>
          </div>
        );

      case "typing":
        return <TypingBubble key={idx} />;

      case "text":
        return <BotTextBubble key={idx} text={entry.text} />;

      case "projects":
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <BotBubble>We currently have ongoing projects. Which one would you like to explore?</BotBubble>
            <OptionButton icon={PROJECTS.gurudev.icon} onClick={() => selectProject("gurudev")}>Gurudev — Guduvancheri</OptionButton>
            <OptionButton icon={PROJECTS.privana.icon} onClick={() => selectProject("privana")}>Privana</OptionButton>
            <button onClick={backToMenu} className="mt-1 self-start text-[12px] font-semibold hover:underline" style={{ color: DEEP_NAVY }}>← Main menu</button>
          </div>
        );

      case "project-topics": {
        const project = PROJECTS[entry.projectKey];
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <BotBubble>
              <div className="mb-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: DEEP_NAVY }}>
                {project.name} · {project.tagline}
              </div>
              What would you like to know about <strong>{project.name}</strong>?
            </BotBubble>
            {project.faqTopics.map((topic) => {
              const meta = PROJECT_TOPIC_META[topic];
              return (<OptionButton key={topic} icon={meta.icon} onClick={() => selectTopic(entry.projectKey, topic)}>{meta.label}</OptionButton>);
            })}
            <OptionButton icon={Mail} onClick={() => openEnquireFromChat(project.name)}>Enquire about {project.name}</OptionButton>
            <button onClick={backToProjects} className="self-start text-[12px] font-semibold hover:underline" style={{ color: DEEP_NAVY }}>← All projects</button>
          </div>
        );
      }

      case "project-detail": {
        const project = PROJECTS[entry.projectKey];
        const meta = PROJECT_TOPIC_META[entry.topic];
        const MetaIcon = meta.icon;
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <BotBubble>
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide" style={{ color: DEEP_NAVY }}>
                <MetaIcon className="h-3.5 w-3.5" strokeWidth={2.25} />
                {project.name} · {meta.label}
              </div>
              {renderTopicDetail(project, entry.topic)}
            </BotBubble>
            <div className="flex gap-2">
              <button onClick={() => backToTopics(entry.projectKey)}
                className="flex-1 rounded-lg border bg-white px-3 py-2.5 text-[13px] font-semibold transition-colors"
                style={{ borderColor: LINE, color: TEXT_CHARCOAL }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LIGHT_BLUE_SOFT)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}>
                ← More topics
              </button>
              <button onClick={() => openEnquireFromChat(project.name)}
                className="flex-1 rounded-lg px-3 py-2.5 text-[13px] font-bold text-white transition-colors"
                style={{ backgroundColor: DEEP_NAVY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}>
                Enquire Now
              </button>
            </div>
            <button onClick={backToMenu} className="self-start text-[12px] font-semibold hover:underline" style={{ color: DEEP_NAVY }}>← Main menu</button>
          </div>
        );
      }

      case "completed-projects":
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <BotBubble>
              <div className="mb-2">Here are our completed projects:</div>
              <div className="space-y-2">
                {COMPANY.completedProjects.map((p, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-lg border px-3 py-2.5" style={{ borderColor: LINE, backgroundColor: LIGHT_BLUE_SOFT }}>
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}>
                      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.25} />
                    </span>
                    <div>
                      <p className="m-0 text-[13px] font-semibold" style={{ color: DEEP_NAVY }}>{p.name}</p>
                      <p className="m-0 text-[12px] text-gray-500">{p.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BotBubble>
            <button onClick={backToMenu} className="self-start text-[12px] font-semibold hover:underline" style={{ color: DEEP_NAVY }}>← Main menu</button>
          </div>
        );

      case "about-company":
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <BotBubble>
              <div className="mb-2 flex items-center gap-2.5">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow">
                  <img src={LOGO_URL} alt="" className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="m-0 text-[14px] font-bold" style={{ color: DEEP_NAVY }}>{COMPANY.name}</p>
                  <p className="m-0 text-[11.5px] text-gray-500">{COMPANY.tagline}</p>
                </div>
              </div>
              <p className="m-0 mb-2 text-[13px]" style={{ color: TEXT_CHARCOAL }}>
                Founded by <strong>{COMPANY.founder}</strong> in {COMPANY.founded}.
              </p>
              <p className="m-0 mb-2">{COMPANY.story}</p>
            </BotBubble>
            <SectionCard title="Our Mission" icon={Info}><p className="m-0 text-[13px]" style={{ color: TEXT_CHARCOAL }}>{COMPANY.mission}</p></SectionCard>
            <SectionCard title="Our Promise" icon={ShieldCheck}><FactList items={COMPANY.promises} /></SectionCard>
            <div className="flex flex-wrap gap-2">
              <a href={COMPANY.socials.facebook} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition-colors"
                style={{ borderColor: LINE, color: DEEP_NAVY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LIGHT_BLUE_SOFT)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <Share2 className="h-3.5 w-3.5" strokeWidth={2} />Facebook
              </a>
              <a href={COMPANY.socials.instagram} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition-colors"
                style={{ borderColor: LINE, color: DEEP_NAVY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LIGHT_BLUE_SOFT)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <Camera className="h-3.5 w-3.5" strokeWidth={2} />Instagram
              </a>
              <a href={COMPANY.socials.youtube} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] font-semibold transition-colors"
                style={{ borderColor: LINE, color: DEEP_NAVY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LIGHT_BLUE_SOFT)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <Play className="h-3.5 w-3.5" strokeWidth={2} />YouTube
              </a>
            </div>
            <button onClick={backToMenu} className="mt-1 self-start text-[12px] font-semibold hover:underline" style={{ color: DEEP_NAVY }}>← Main menu</button>
          </div>
        );

      case "emi":
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <BotBubble>Plan your home loan — adjust the values below to estimate your monthly EMI.</BotBubble>
            <EmiCalculatorWidget />
            <OptionButton icon={Mail} onClick={() => openEnquireFromChat("General Enquiry")}>Talk to a Loan Advisor</OptionButton>
            <button onClick={backToMenu} className="self-start text-[12px] font-semibold hover:underline" style={{ color: DEEP_NAVY }}>← Main menu</button>
          </div>
        );

      case "contact":
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <BotBubble>
              <p className="m-0 mb-2">You can reach {COMPANY.name} at:</p>
              <p className="m-0 flex items-center gap-1.5 text-[13px]">
                <Phone className="h-3.5 w-3.5" strokeWidth={2.25} style={{ color: DEEP_NAVY }} />
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="font-bold" style={{ color: DEEP_NAVY }}>
                  {botConfig?.contact || COMPANY.phoneDisplay}
                </a>
              </p>
              <p className="m-0 mt-1 flex items-center gap-1.5 text-[13px]">
                <Globe className="h-3.5 w-3.5" strokeWidth={2.25} style={{ color: DEEP_NAVY }} />
                <a href={COMPANY.website} target="_blank" rel="noreferrer" className="font-bold" style={{ color: DEEP_NAVY }}>
                  pkrestates.com
                </a>
              </p>
              <p className="m-0 mt-1 flex items-start gap-1.5 text-[12.5px] text-gray-600">
                <MapPin className="mt-[2px] h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2} />
                {COMPANY.address}
              </p>
            </BotBubble>
            <OptionButton icon={Mail} onClick={() => openEnquireFromChat("General Enquiry")}>Submit an Enquiry</OptionButton>
            <button onClick={backToMenu} className="mt-1 self-start text-[12px] font-semibold hover:underline" style={{ color: DEEP_NAVY }}>← Main menu</button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={() => openEnquireFromChat("")}
        className="fixed top-1/2 right-0 z-[9998] -translate-y-1/2 [writing-mode:sideways-lr] rounded-l-md px-2 py-3.5 text-[12px] font-bold tracking-wider text-white shadow-[-2px_0_8px_rgba(15,58,107,0.25)] antialiased [text-rendering:optimizeLegibility] transition-all no-underline sm:px-3.5  sm:text-[15px] sm:hover:pr-4"
        style={{ backgroundColor: DEEP_NAVY, backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
      >
        ENQUIRE NOW
      </button>

      <EnquireModal open={enquireOpen} onClose={() => setEnquireOpen(false)} presetType={enquirePreset} />

      {/* Floating chat trigger + preview bubble (responsive sizing) */}
      <div className="fixed bottom-5 right-4 z-[9998] flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-5 sm:gap-3">
        {showPreview && !chatOpen && (
          <div className="relative flex max-w-[200px] items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-[0_6px_20px_rgba(0,0,0,0.18)] sm:max-w-[240px] sm:px-4 sm:py-3">
            <button
              onClick={() => setShowPreview(false)}
              aria-label="Dismiss"
              className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
            >
              <X className="h-3 w-3" strokeWidth={2.5} />
            </button>
            <span className="mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400" />
            <div>
              <div className="text-[12px] font-bold sm:text-sm" style={{ color: DEEP_NAVY }}>We&apos;re Online!</div>
              <div className="text-[11px] sm:text-[13px]" style={{ color: TEXT_CHARCOAL }}>How may I assist you today?</div>
            </div>
          </div>
        )}

        <button
          aria-label="Open chat assistant"
          onClick={handleChatToggle}
          className="relative flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-full shadow-[0_10px_28px_-6px_rgba(15,58,107,0.55)] ring-[2px] ring-white transition-transform hover:scale-105 sm:h-[62px] sm:w-[62px] sm:ring-[2.5px]"
          style={{ background: `linear-gradient(135deg, ${DEEP_NAVY_LIGHT}, ${DEEP_NAVY_DARK})` }}
        >
          <div className="flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full bg-white sm:h-[52px] sm:w-[52px]">
            <img src={LOGO_URL} alt="Chat" className="h-full w-full object-cover" />
          </div>
        </button>
      </div>

      {chatOpen && (
        <div
          className="fixed bottom-[72px] right-4 z-[9999] flex h-[70vh] max-h-[70vh] w-[340px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[22px] shadow-[0_24px_60px_-16px_rgba(15,58,107,0.35)] ring-1 ring-black/[0.04] sm:bottom-[104px] sm:right-5 sm:h-[600px] sm:max-h-[82vh] sm:w-[400px] sm:max-w-[calc(100vw-40px)] max-[480px]:right-3 max-[480px]:bottom-[76px] max-[480px]:w-[calc(100vw-24px)]"
          style={{ backgroundColor: LIGHT_BLUE_SOFT }}
        >
          <div className="relative flex items-center justify-between px-5 py-4" style={{ background: `linear-gradient(135deg, ${DEEP_NAVY_LIGHT} 0%, ${DEEP_NAVY_DARK} 100%)` }}>
            <div className="flex items-center gap-3">
              <div className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-white shadow-md">
                <img src={LOGO_URL} alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-white tracking-wide">
                  {botConfig?.bot_name || "PKR Estates Assistant"}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#B8CFE8]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
                  Active now
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={resetChat} aria-label="Restart chat" title="Restart" className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25">
                <RotateCcw className="h-3.5 w-3.5" strokeWidth={2.25} />
              </button>
              <button onClick={() => setChatOpen(false)} aria-label="Close chat" className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25">
                <X className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-4" style={{ scrollbarWidth: "thin" }}>
            {log.map((entry, idx) =>
              entry.role === "user" ? (
                <div key={idx} className="flex justify-end"><UserBubble>{entry.label}</UserBubble></div>
              ) : (
                renderBotEntry(entry, idx)
              )
            )}
            {botLoading && <TypingBubble />}
          </div>

          <form onSubmit={handleInputSubmit} className="flex items-center gap-2 border-t bg-white/60 px-3.5 py-3" style={{ borderColor: LINE }}>
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Message PKR..."
              className="flex-1 rounded-full border bg-white px-4 py-2.5 text-[13px] outline-none"
              style={{ borderColor: LINE, color: DEEP_NAVY }}
              onFocus={(e) => (e.currentTarget.style.borderColor = DEEP_NAVY)}
              onBlur={(e) => (e.currentTarget.style.borderColor = LINE)}
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!chatInput.trim()}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-white transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: DEEP_NAVY }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
            >
              <Send className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </form>
          <div className="pb-2.5 pt-1.5 text-center text-[10px] font-medium tracking-wide text-gray-400">
            Powered by {botConfig?.company_name || COMPANY.name}
          </div>
        </div>
      )}
    </>
  );
}
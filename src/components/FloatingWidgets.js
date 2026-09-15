"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Building2,
  CheckCircle2,
  Calculator,
  Info,
  Phone,
  Mail,
  Globe,
  MapPin,
  X,
  RotateCcw,
  Send,
  ChevronRight,
  Check,
  AlertTriangle,
  Home,
  LayoutGrid,
  Ruler,
  Leaf,
  Hammer,
  FileText,
  IndianRupee,
  Share2,
  Camera,
  Play,
  Building,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

const LOGO_URL = "/logo.jpeg";

const GOLD = "#b8860b";
const GOLD_LIGHT = "#d4a017";
const GOLD_DARK = "#8f6a08";
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
  return (
    "sess_" +
    Date.now() +
    "_" +
    Math.random().toString(36).substring(2, 11)
  );
}

function getOrCreateSessionId({ forceNew = false } = {}) {
  if (typeof window === "undefined") return generateSessionId();

  if (!forceNew) {
    const existing = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (existing) return existing;
  }

  const fresh = generateSessionId();
  try {
    sessionStorage.setItem(SESSION_STORAGE_KEY, fresh);
  } catch {
    // sessionStorage unavailable (private mode, etc.) — just use in-memory
  }
  return fresh;
}

/* ------------------------------------------------------------------ */
/*  BOT REPLY FORMATTER                                                */
/*    *bold*  →  <strong>bold</strong>                                 */
/*    \n      →  <br/>                                                 */
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
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      parts.push(
        <strong key={`b-${lineIdx}-${match.index}`} className="font-bold text-[#9a6f09]">
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
      "Shops",
      "Security Cabin with CCTV",
      "Children's Play Area",
      "Walking Track",
      "Park",
      "Avenue Trees",
      "Elevator (6-passenger automatic lift)",
      "Sewage Treatment Plant (STP)",
      "Car Parking",
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
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setSubmitting(false);
      setSuccessMessage("");
      setErrorMessage("");
      setFieldErrors({});
      setForm({ name: "", email: "", phone: "", inquiryType: "", message: "" });
    } else if (presetType) {
      setForm((f) => ({ ...f, inquiryType: presetType }));
    }
  }, [open, presetType]);

  if (!open) return null;

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setFieldErrors((errs) => {
      if (!errs[field]) return errs;
      const next = { ...errs };
      delete next[field];
      return next;
    });
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorMessage("");
    setFieldErrors({});

    const payload = {
      full_name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      inquiry_type: form.inquiryType,
      message: form.message.trim(),
    };

    try {
      const res = await fetch(ENQUIRY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

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
        setSubmitting(false);
        return;
      }

      setSuccessMessage(data.message || "Your enquiry has been received. Our team will reach out to you shortly.");
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error("Enquiry submit failed:", err);
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-[#faf8f3] px-4 py-3 text-[14px] text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#b8860b]/15 ${
      fieldErrors[field] ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[#b8860b]"
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

        <div className="relative px-6 pb-8 pt-7 sm:px-8" style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)` }}>
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25">
            <X className="h-4 w-4" strokeWidth={2.25} />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md">
              <img src={LOGO_URL} alt="" className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="m-0 text-[19px] font-bold leading-tight text-white sm:text-[21px]">Let&apos;s Talk</h2>
              <p className="m-0 mt-0.5 text-[12.5px] text-[#f7e6c2]">We&apos;ll get back to you within 24 hours</p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 px-6 py-14 text-center sm:px-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: `${GOLD}1a` }}>
              <Check className="h-7 w-7" style={{ color: GOLD }} strokeWidth={2.5} />
            </div>
            <h3 className="m-0 text-[18px] font-bold text-gray-800">Thank You!</h3>
            <p className="m-0 max-w-[300px] text-[13.5px] leading-relaxed text-gray-500">{successMessage}</p>
            <button onClick={onClose} className="mt-3 rounded-full px-6 py-2.5 text-[13.5px] font-bold text-white transition-transform hover:scale-[1.03]" style={{ backgroundColor: GOLD }}>
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
                Full Name <span style={{ color: GOLD }}>*</span>
              </label>
              <input required type="text" name="full_name" placeholder="Enter your name" value={form.name} onChange={handleChange("name")} className={inputClass("name")} />
              {fieldErrors.name && <span className="text-[11.5px] text-red-600">{fieldErrors.name}</span>}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-gray-600">
                  Email <span style={{ color: GOLD }}>*</span>
                </label>
                <input required type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange("email")} className={inputClass("email")} />
                {fieldErrors.email && <span className="text-[11.5px] text-red-600">{fieldErrors.email}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-gray-600">
                  Phone <span style={{ color: GOLD }}>*</span>
                </label>
                <input required type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange("phone")} className={inputClass("phone")} />
                {fieldErrors.phone && <span className="text-[11.5px] text-red-600">{fieldErrors.phone}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold text-gray-600">
                Inquiry Type <span style={{ color: GOLD }}>*</span>
              </label>
              <div className="relative">
                <select required name="inquiry_type" value={form.inquiryType} onChange={handleChange("inquiryType")} className={`${inputClass("inquiryType")} appearance-none pr-10`}>
                  <option value="" disabled>
                    Select an option
                  </option>
                  {INQUIRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-gray-400" strokeWidth={2.25} />
              </div>
              {fieldErrors.inquiryType && <span className="text-[11.5px] text-red-600">{fieldErrors.inquiryType}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold text-gray-600">
                Your Message <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea rows={3} name="message" placeholder="Tell us a bit more..." value={form.message} onChange={handleChange("message")} className={`${inputClass("message")} resize-none`} />
              {fieldErrors.message && <span className="text-[11.5px] text-red-600">{fieldErrors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-[14.5px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(184,134,11,0.55)] transition-all hover:shadow-[0_14px_30px_-8px_rgba(184,134,11,0.65)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)` }}
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" strokeWidth={2.25} />
                  Submit Enquiry
                </>
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
    <div className="max-w-[90%] self-start rounded-2xl rounded-tl-md border border-[#f0e6cc] bg-white p-3.5 text-[13.5px] leading-relaxed text-[#2a2a2a] shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      {children}
    </div>
  );
}

function BotTextBubble({ text }) {
  return (
    <div className="max-w-[90%] self-start rounded-2xl rounded-tl-md border border-[#f0e6cc] bg-white p-3.5 text-[13.5px] leading-relaxed text-[#2a2a2a] shadow-[0_2px_10px_rgba(0,0,0,0.04)] whitespace-pre-wrap">
      {parseBotReply(text)}
    </div>
  );
}

function UserBubble({ children }) {
  return (
    <div
      className="max-w-[82%] self-end rounded-2xl rounded-tr-md px-4 py-2.5 text-[13.5px] font-medium text-white shadow-sm"
      style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD_DARK})` }}
    >
      {children}
    </div>
  );
}

function TypingBubble() {
  return (
    <div className="max-w-[90%] self-start rounded-2xl rounded-tl-md border border-[#f0e6cc] bg-white px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#b8860b]" style={{ animationDelay: "0ms" }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#b8860b]" style={{ animationDelay: "150ms" }} />
        <span className="h-2 w-2 animate-bounce rounded-full bg-[#b8860b]" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

function OptionButton({ children, onClick, icon: Icon }) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-center justify-between gap-2 rounded-xl border border-[#ecdfc0] bg-white px-4 py-3 text-left text-[13.5px] font-semibold text-[#232323] shadow-[0_1px_4px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-[1px] hover:border-[#b8860b] hover:bg-[#fdf8ea] hover:shadow-[0_6px_16px_-6px_rgba(184,134,11,0.35)]"
    >
      <span className="flex items-center gap-2.5">
        {Icon && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f6efdd] text-[#9a6f09]">
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
        )}
        {children}
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-[#b8860b] transition-transform group-hover:translate-x-0.5" strokeWidth={2.25} />
    </button>
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <div className="rounded-xl border border-[#f1e8d3] bg-[#fffdf7] p-3.5">
      <p className="m-0 mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#9a6f09]">
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
        <li key={i} className="flex items-start gap-2 text-[13px] text-gray-700">
          <Check className="mt-[2px] h-3.5 w-3.5 shrink-0" style={{ color: GOLD }} strokeWidth={2.5} />
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
        <li key={i} className="flex items-center justify-between gap-3 border-b border-[#f4ecd8] py-1.5 text-[12.5px] last:border-b-0">
          <span className="flex items-center gap-1.5 text-gray-700">
            <MapPin className="h-3 w-3 shrink-0 text-gray-400" strokeWidth={2} />
            {it.label}
          </span>
          <span className="whitespace-nowrap font-semibold text-[#9a6f09]">{it.distance}</span>
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

  return (
    <SectionCard title="EMI Calculator" icon={Calculator}>
      <div className="mb-3 grid grid-cols-1 gap-2.5">
        <label className="flex flex-col gap-1">
          <span className="text-[11.5px] font-semibold text-gray-600">Loan Amount (₹)</span>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full rounded-lg border border-[#ecdfc0] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#b8860b]"
          />
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <label className="flex flex-col gap-1">
            <span className="text-[11.5px] font-semibold text-gray-600">Interest (% p.a.)</span>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full rounded-lg border border-[#ecdfc0] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#b8860b]"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-[11.5px] font-semibold text-gray-600">Tenure (yrs)</span>
            <input
              type="number"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full rounded-lg border border-[#ecdfc0] bg-white px-3 py-2 text-[13px] outline-none focus:border-[#b8860b]"
            />
          </label>
        </div>
      </div>

      <div className="rounded-lg p-3 text-white" style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD_DARK})` }}>
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

  /* ---- Chatbot API state ---- */
  const [chatInput, setChatInput] = useState("");
  const [botConfig, setBotConfig] = useState(null);
  const [botLoading, setBotLoading] = useState(false);
  const [botInitialized, setBotInitialized] = useState(false);

  /* ---- NEW: session id (kept in state so we can re-render if needed) ---- */
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    setShowPreview(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [log]);

  /* ---- NEW: Ensure a session id exists as soon as chat opens ---- */
  useEffect(() => {
    if (!chatOpen) return;
    if (sessionId) return;
    setSessionId(getOrCreateSessionId());
  }, [chatOpen, sessionId]);

  /* ---- Initialize chatbot the first time chat opens ---- */
  useEffect(() => {
    if (!chatOpen || botInitialized) return;
    let cancelled = false;

    const initChatbot = async () => {
      try {
        setBotLoading(true);
        const res = await fetch(CHATBOT_INIT_API, {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        if (cancelled) return;

        if (data?.status) {
          setBotConfig(data);
          setBotInitialized(true);
          if (data.greeting) {
            setLog((l) => [...l, { role: "bot", kind: "text", text: data.greeting }]);
          }
        }
      } catch (err) {
        console.error("Chatbot init failed:", err);
      } finally {
        if (!cancelled) setBotLoading(false);
      }
    };

    initChatbot();
    return () => {
      cancelled = true;
    };
  }, [chatOpen, botInitialized]);

  const handleChatToggle = () => {
    setChatOpen((prev) => !prev);
    setShowPreview(false);
  };

  /* ---- Restart chat: also rotate session id ---- */
  const resetChat = () => {
    setLog([ROOT_MESSAGE]);
    setChatInput("");
    // Force a brand new session for a fresh conversation
    setSessionId(getOrCreateSessionId({ forceNew: true }));
  };

  const pushUser = (label) => setLog((l) => [...l, { role: "user", kind: "text", label }]);
  const pushBot = (entry) => setLog((l) => [...l, { role: "bot", ...entry }]);

  /* ---- Send a message to the chatbot API (now with session_id) ---- */
  const sendChatMessage = async (rawText) => {
    const text = String(rawText ?? "").trim();
    if (!text) return;

    // Ensure we always have a session id before sending
    let sid = sessionId;
    if (!sid) {
      sid = getOrCreateSessionId();
      setSessionId(sid);
    }

    pushUser(text);
    setChatInput("");

    // Show typing indicator
    setLog((l) => [...l, { role: "bot", kind: "typing" }]);

    // Small artificial delay so the user sees the typing bubble
    await new Promise((r) => setTimeout(r, 500));

    try {
      const res = await fetch(CHATBOT_CHAT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          message: text,
          session_id: sid,
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      // Remove typing bubble
      setLog((l) => l.filter((e) => e.kind !== "typing"));

      if (res.ok && data?.status && data.reply) {
        pushBot({ kind: "text", text: data.reply });
      } else {
        pushBot({
          kind: "text",
          text: "Sorry, I couldn't process that just now. Please try again or call us at " + COMPANY.phoneDisplay + ".",
        });
      }
    } catch (err) {
      console.error("Chat send failed:", err);
      setLog((l) => l.filter((e) => e.kind !== "typing"));
      pushBot({
        kind: "text",
        text: "⚠️ Network issue — please check your connection and try again.",
      });
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    sendChatMessage(chatInput);
  };

  /* --- Flow actions (local rich UI) --- */
  const goOngoingProjects = () => {
    pushUser("Ongoing Projects");
    pushBot({ kind: "projects" });
  };

  const goContactUs = () => {
    pushUser("Contact Us");
    pushBot({ kind: "contact" });
  };

  const goAboutCompany = () => {
    pushUser("About PKR Estates");
    pushBot({ kind: "about-company" });
  };

  const goCompletedProjects = () => {
    pushUser("Completed Projects");
    pushBot({ kind: "completed-projects" });
  };

  const goEmiCalculator = () => {
    pushUser("EMI Calculator");
    pushBot({ kind: "emi" });
  };

  const openEnquireFromChat = (type) => {
    setEnquirePreset(type);
    setEnquireOpen(true);
  };

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

  const backToProjects = () => {
    pushUser("Back to projects");
    pushBot({ kind: "projects" });
  };

  const backToTopics = (projectKey) => {
    pushUser("More about this project");
    pushBot({ kind: "project-topics", projectKey });
  };

  const backToMenu = () => {
    pushUser("Main menu");
    pushBot({ kind: "menu" });
  };

  /* --- Detail renderer per topic --- */
  const renderTopicDetail = (project, topic) => {
    switch (topic) {
      case "overview":
        return (
          <>
            <p className="m-0 mb-2">{project.overview}</p>
            {project.salientFeatures && <FactList items={project.salientFeatures} />}
          </>
        );
      case "configuration":
        return (
          <div className="space-y-2.5">
            {project.configuration.map((block, i) => (
              <SectionCard key={i} title={`${block.block} · ${block.structure}`} icon={LayoutGrid}>
                <ul className="m-0 grid grid-cols-2 gap-2">
                  {block.units.map((u, j) => (
                    <li key={j} className="rounded-lg bg-white px-2.5 py-2 text-center text-[12.5px] font-semibold text-[#232323] shadow-sm">
                      {u.type}
                      <div className="text-[15px] font-bold text-[#9a6f09]">{u.count}</div>
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
              <div key={i} className="flex items-center justify-between rounded-lg border border-[#f1e8d3] bg-[#fffdf7] px-3 py-2.5">
                <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#232323]">
                  <Ruler className="h-3.5 w-3.5 text-[#9a6f09]" strokeWidth={2} />
                  {u.type}
                </span>
                <div className="text-right text-[12px]">
                  <div className="text-gray-600">
                    Saleable: <strong>{u.saleable}</strong>
                  </div>
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
            <SectionCard title="Nearby Landmarks" icon={MapPin}>
              <DistanceList items={project.location.landmarks} />
            </SectionCard>
            <SectionCard title="Nearby Schools" icon={MapPin}>
              <DistanceList items={project.location.schools} />
            </SectionCard>
            <SectionCard title="Nearby Colleges" icon={MapPin}>
              <DistanceList items={project.location.colleges} />
            </SectionCard>
          </div>
        );
      case "rera":
        return (
          <SectionCard title="RERA Registration" icon={ShieldCheck}>
            <p className="m-0 text-[13px] text-gray-700">
              RERA Number: <strong className="text-[#9a6f09]">{project.rera || "Available on request"}</strong>
            </p>
            <p className="m-0 mt-2 text-[11.5px] text-gray-400">
              Please verify RERA details on the official TN RERA portal before making any payment.
            </p>
          </SectionCard>
        );
      case "price":
        return (
          <SectionCard title="Pricing" icon={IndianRupee}>
            <p className="m-0 text-[13px] text-gray-700">{project.priceHint}</p>
            <button
              onClick={() => openEnquireFromChat(project.name)}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-[13px] font-bold text-white"
              style={{ backgroundColor: GOLD }}
            >
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
            <OptionButton icon={Building2} onClick={goOngoingProjects}>
              Ongoing Projects
            </OptionButton>
            <OptionButton icon={CheckCircle2} onClick={goCompletedProjects}>
              Completed Projects
            </OptionButton>
            <OptionButton icon={Calculator} onClick={goEmiCalculator}>
              EMI Calculator
            </OptionButton>
            <OptionButton icon={Info} onClick={goAboutCompany}>
              About PKR Estates
            </OptionButton>
            <OptionButton icon={Phone} onClick={goContactUs}>
              Contact Us
            </OptionButton>
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
            <OptionButton icon={PROJECTS.gurudev.icon} onClick={() => selectProject("gurudev")}>
              Gurudev — Guduvancheri
            </OptionButton>
            <OptionButton icon={PROJECTS.privana.icon} onClick={() => selectProject("privana")}>
              Privana
            </OptionButton>
            <button onClick={backToMenu} className="mt-1 self-start text-[12px] font-semibold text-[#9a6f09] hover:underline">
              ← Main menu
            </button>
          </div>
        );

      case "project-topics": {
        const project = PROJECTS[entry.projectKey];
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <BotBubble>
              <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-[#9a6f09]">
                {project.name} · {project.tagline}
              </div>
              What would you like to know about <strong>{project.name}</strong>?
            </BotBubble>
            {project.faqTopics.map((topic) => {
              const meta = PROJECT_TOPIC_META[topic];
              return (
                <OptionButton key={topic} icon={meta.icon} onClick={() => selectTopic(entry.projectKey, topic)}>
                  {meta.label}
                </OptionButton>
              );
            })}
            <OptionButton icon={Mail} onClick={() => openEnquireFromChat(project.name)}>
              Enquire about {project.name}
            </OptionButton>
            <button onClick={backToProjects} className="self-start text-[12px] font-semibold text-[#9a6f09] hover:underline">
              ← All projects
            </button>
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
              <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#9a6f09]">
                <MetaIcon className="h-3.5 w-3.5" strokeWidth={2.25} />
                {project.name} · {meta.label}
              </div>
              {renderTopicDetail(project, entry.topic)}
            </BotBubble>
            <div className="flex gap-2">
              <button
                onClick={() => backToTopics(entry.projectKey)}
                className="flex-1 rounded-lg border border-[#eee0c8] bg-white px-3 py-2.5 text-[13px] font-semibold text-gray-700 hover:bg-[#fdf6e3]"
              >
                ← More topics
              </button>
              <button
                onClick={() => openEnquireFromChat(project.name)}
                className="flex-1 rounded-lg px-3 py-2.5 text-[13px] font-bold text-white"
                style={{ backgroundColor: GOLD }}
              >
                Enquire Now
              </button>
            </div>
            <button onClick={backToMenu} className="self-start text-[12px] font-semibold text-[#9a6f09] hover:underline">
              ← Main menu
            </button>
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
                  <div key={i} className="flex items-start gap-2.5 rounded-lg border border-[#f1e8d3] bg-[#fffdf7] px-3 py-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f6efdd] text-[#9a6f09]">
                      <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={2.25} />
                    </span>
                    <div>
                      <p className="m-0 text-[13px] font-semibold text-[#232323]">{p.name}</p>
                      <p className="m-0 text-[12px] text-gray-500">{p.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BotBubble>
            <button onClick={backToMenu} className="self-start text-[12px] font-semibold text-[#9a6f09] hover:underline">
              ← Main menu
            </button>
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
                  <p className="m-0 text-[14px] font-bold text-[#232323]">{COMPANY.name}</p>
                  <p className="m-0 text-[11.5px] text-gray-500">{COMPANY.tagline}</p>
                </div>
              </div>
              <p className="m-0 mb-2 text-[13px] text-gray-700">
                Founded by <strong>{COMPANY.founder}</strong> in {COMPANY.founded}.
              </p>
              <p className="m-0 mb-2">{COMPANY.story}</p>
            </BotBubble>
            <SectionCard title="Our Mission" icon={Info}>
              <p className="m-0 text-[13px] text-gray-700">{COMPANY.mission}</p>
            </SectionCard>
            <SectionCard title="Our Promise" icon={ShieldCheck}>
              <FactList items={COMPANY.promises} />
            </SectionCard>
            <div className="flex flex-wrap gap-2">
              <a href={COMPANY.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[#ecdfc0] px-3 py-1.5 text-[11.5px] font-semibold text-[#9a6f09] hover:bg-[#fdf6e3]"
              >
                <Share2 className="h-3.5 w-3.5" strokeWidth={2} />
                Facebook
              </a>
              <a href={COMPANY.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[#ecdfc0] px-3 py-1.5 text-[11.5px] font-semibold text-[#9a6f09] hover:bg-[#fdf6e3]"
              >
                <Camera className="h-3.5 w-3.5" strokeWidth={2} />
                Instagram
              </a>
              <a href={COMPANY.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-[#ecdfc0] px-3 py-1.5 text-[11.5px] font-semibold text-[#9a6f09] hover:bg-[#fdf6e3]"
              >
                <Play className="h-3.5 w-3.5" strokeWidth={2} />
                YouTube
              </a>
            </div>
            <button onClick={backToMenu} className="mt-1 self-start text-[12px] font-semibold text-[#9a6f09] hover:underline">
              ← Main menu
            </button>
          </div>
        );

      case "emi":
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <BotBubble>Plan your home loan — adjust the values below to estimate your monthly EMI.</BotBubble>
            <EmiCalculatorWidget />
            <OptionButton icon={Mail} onClick={() => openEnquireFromChat("General Enquiry")}>
              Talk to a Loan Advisor
            </OptionButton>
            <button onClick={backToMenu} className="self-start text-[12px] font-semibold text-[#9a6f09] hover:underline">
              ← Main menu
            </button>
          </div>
        );

      case "contact":
        return (
          <div key={idx} className="flex flex-col gap-2.5">
            <BotBubble>
              <p className="m-0 mb-2">You can reach {COMPANY.name} at:</p>
              <p className="m-0 flex items-center gap-1.5 text-[13px]">
                <Phone className="h-3.5 w-3.5 text-[#9a6f09]" strokeWidth={2.25} />
                <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="font-bold text-[#9a6f09]">
                  {botConfig?.contact || COMPANY.phoneDisplay}
                </a>
              </p>
              <p className="m-0 mt-1 flex items-center gap-1.5 text-[13px]">
                <Globe className="h-3.5 w-3.5 text-[#9a6f09]" strokeWidth={2.25} />
                <a href={COMPANY.website} target="_blank" rel="noreferrer" className="font-bold text-[#9a6f09]">
                  pkrestates.com
                </a>
              </p>
              <p className="m-0 mt-1 flex items-start gap-1.5 text-[12.5px] text-gray-600">
                <MapPin className="mt-[2px] h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2} />
                {COMPANY.address}
              </p>
            </BotBubble>
            <OptionButton icon={Mail} onClick={() => openEnquireFromChat("General Enquiry")}>
              Submit an Enquiry
            </OptionButton>
            <button onClick={backToMenu} className="mt-1 self-start text-[12px] font-semibold text-[#9a6f09] hover:underline">
              ← Main menu
            </button>
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
        className="fixed top-1/2 right-0 z-[9998] -translate-y-1/2 [writing-mode:sideways-lr] rounded-l-md bg-[#b8860b] px-2 py-3.5 text-[12px] font-bold tracking-wider text-white shadow-[-2px_0_8px_rgba(0,0,0,0.2)] antialiased [text-rendering:optimizeLegibility] transition-all hover:bg-[#9a6f09] no-underline sm:px-3.5 sm:py-6 sm:text-[15px] sm:hover:pr-4"
        style={{ backfaceVisibility: "hidden", transform: "translateZ(0)" }}
      >
        ENQUIRE NOW
      </button>

      <EnquireModal open={enquireOpen} onClose={() => setEnquireOpen(false)} presetType={enquirePreset} />

      <div className="fixed bottom-6 right-5 z-[9998] flex flex-col items-end gap-3 mb-15">
        {showPreview && !chatOpen && (
          <div className="relative flex max-w-[240px] mr-18 mb-[-70] items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_6px_20px_rgba(0,0,0,0.18)]">
            <button onClick={() => setShowPreview(false)} aria-label="Dismiss" className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white">
              <X className="h-3 w-3" strokeWidth={2.5} />
            </button>
            <span className="mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400" />
            <div>
              <div className="text-sm font-bold text-gray-800">We&apos;re Online!</div>
              <div className="text-[13px] text-gray-500">How may I assist you today?</div>
            </div>
          </div>
        )}

        <button
          aria-label="Open chat assistant"
          onClick={handleChatToggle}
          className="relative flex h-[62px] w-[62px] items-center justify-center overflow-hidden rounded-full shadow-[0_10px_28px_-6px_rgba(184,134,11,0.55)] ring-[2.5px] ring-white transition-transform hover:scale-105"
          style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD_DARK})` }}
        >
          <div className="flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-full bg-white">
            <img src={LOGO_URL} alt="Chat" className="h-full w-full object-cover" />
          </div>
        </button>
      </div>

      {chatOpen && (
        <div
          className="fixed bottom-[104px] right-5 z-[9999] flex h-[600px] w-[400px] max-w-[calc(100vw-40px)] max-h-[82vh] flex-col overflow-hidden rounded-[22px] bg-[#fbf9f3] shadow-[0_24px_60px_-16px_rgba(0,0,0,0.35)] ring-1 ring-black/[0.04] max-[480px]:right-3 max-[480px]:bottom-[92px] max-[480px]:w-[calc(100vw-24px)]"
        >
          <div className="relative flex items-center justify-between px-5 py-4" style={{ background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD_DARK} 100%)` }}>
            <div className="flex items-center gap-3">
              <div className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-full bg-white shadow-md">
                <img src={LOGO_URL} alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-[14px] font-bold text-white tracking-wide">
                  {botConfig?.bot_name || "PKR Estates Assistant"}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-[#fbe9c4]">
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
                <div key={idx} className="flex justify-end">
                  <UserBubble>{entry.label}</UserBubble>
                </div>
              ) : (
                renderBotEntry(entry, idx)
              )
            )}
            {botLoading && <TypingBubble />}
          </div>

          <form
            onSubmit={handleInputSubmit}
            className="flex items-center gap-2 border-t border-[#eee0c8] bg-white/60 px-3.5 py-3"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Message PKR..."
              className="flex-1 rounded-full border border-[#eee0c8] bg-white px-4 py-2.5 text-[13px] outline-none focus:border-[#b8860b]"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!chatInput.trim()}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full text-white transition disabled:cursor-not-allowed disabled:opacity-50"
              style={{ backgroundColor: GOLD }}
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
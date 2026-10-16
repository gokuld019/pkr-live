"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Figtree } from "next/font/google";
import { ArrowUpRight, ArrowRight, Building2, Ruler, BedDouble, Layers } from "lucide-react";

const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_DARK = "#0A2B50";
const TEXT_CHARCOAL = "#2D3A46";
const LIGHT_BLUE = "#E8F0F9";
const EASE = [0.22, 1, 0.36, 1];

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* ================= CONTENT (edit these) ================= */
const HEADING = "A Place That You Call Home";

const PROJECTS = [
  {
    id: "all",
    title: "All Projects",
    lines: ["Chennai · Apartments", "2 Ongoing Projects"],
    details: {
      type: "Apartments",
      size: "68 Cents - 1.41 Acres",
      configuration: "Studio - 3 BHK",
      units: "276 Units",
      price: "₹20.01 Lakhs*",
    },
    cta: { label: "View all projects", href: "/projects" }, // <- your real links
  },
  {
    id: "gurudev",
    title: "Gurudev",
    lines: ["Perumathurallur, Chennai", "Handover - Dec 2026"],
    details: {
      type: "Apartments",
      size: "68 Cents",
      configuration: "1 BHK & 2 BHK",
      units: "90 Units",
      price: "₹22 Lakhs*",
    },
    cta: { label: "View project", href: "/projects/gurudev" },
  },
  {
    id: "privana",
    title: "Privana",
    lines: ["Guduvancheri, Chennai", "Handover - Jun 2028"],
    details: {
      type: "Apartments",
      size: "1.41 Acres",
      configuration: "Studio, 1, 2 & 3 BHK",
      units: "186 Units",
      price: "₹20.01 Lakhs*",
    },
    cta: { label: "View project", href: "/projects/privana" },
  },
];

/* ================= PIECES ================= */
function Detail({ Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 lg:flex-1 lg:px-6">
      <span
        aria-hidden="true"
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11"
        style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
      </span>
      <div className="min-w-0">
        <p className="m-0 text-[10px] font-medium uppercase tracking-[1.4px] sm:text-[11px]" style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}>
          {label}
        </p>
        <p className="m-0 mt-0.5 text-[14px] font-semibold leading-snug sm:text-[15px]" style={{ color: DEEP_NAVY }}>
          {value}
        </p>
      </div>
    </div>
  );
}

/* ================= SECTION ================= */
export default function PlaceThatYouCallHome({ id = "projects-overview" }) {
  const [activeId, setActiveId] = useState(PROJECTS[0].id);
  const active = PROJECTS.find((p) => p.id === activeId);
  const d = active.details;

  const onKeyDown = (e) => {
    const i = PROJECTS.findIndex((p) => p.id === activeId);
    if (e.key === "ArrowRight") setActiveId(PROJECTS[(i + 1) % PROJECTS.length].id);
    if (e.key === "ArrowLeft") setActiveId(PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length].id);
  };

  return (
    <section
      id={id}
      className={`${figtree.className} w-full bg-white px-4 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24`}
      style={{ fontFamily: figtree.style.fontFamily }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2
          className="m-0 mb-8 text-center text-[26px] font-bold leading-tight tracking-tight sm:mb-12 sm:text-[38px] lg:text-[44px]"
          style={{ color: DEEP_NAVY }}
        >
          {HEADING}
        </h2>

        {/* Card */}
        <div className="overflow-hidden rounded-[20px] bg-white shadow-[0_30px_70px_-35px_rgba(15,58,107,0.45)] ring-1 ring-[#0F3A6B]/10">
          {/* Tab strip */}
          <div
            role="tablist"
            aria-label="Projects"
            onKeyDown={onKeyDown}
            className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-3 sm:overflow-visible"
          >
            {PROJECTS.map((p) => {
              const isActive = p.id === activeId;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  id={`proj-tab-${p.id}`}
                  aria-selected={isActive}
                  aria-controls="proj-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(p.id)}
                  className={`min-w-[210px] flex-1 px-5 py-4 text-left outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5B9BE0] sm:min-w-0 sm:px-8 sm:py-6 ${
                    isActive ? "text-white" : "text-[#0F3A6B] hover:bg-[#DCE8F6]"
                  }`}
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)`
                      : LIGHT_BLUE,
                  }}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-[16px] font-bold sm:text-[18px]">{p.title}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className={`mt-1 h-4 w-4 shrink-0 transition-transform duration-300 ${isActive ? "opacity-90" : "opacity-60"}`}
                      strokeWidth={2.2}
                    />
                  </span>
                  {p.lines.map((line) => (
                    <span
                      key={line}
                      className={`mt-1 block text-[12px] leading-snug sm:text-[13px] ${
                        isActive ? "text-white/75" : "text-[#2D3A46]/70"
                      }`}
                    >
                      {line}
                    </span>
                  ))}
                </button>
              );
            })}
          </div>

          {/* Details panel */}
          <div id="proj-panel" role="tabpanel" aria-labelledby={`proj-tab-${activeId}`} className="bg-white">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="grid grid-cols-1 gap-y-5 px-5 py-6 sm:grid-cols-2 sm:px-8 sm:py-7 lg:flex lg:items-center lg:gap-0 lg:px-6 lg:py-6 lg:[&>*+*]:border-l lg:[&>*+*]:border-[#0F3A6B]/10"
              >
                <Detail Icon={Building2} label="Type" value={d.type} />
                <Detail Icon={Ruler} label="Size" value={d.size} />
                <Detail Icon={BedDouble} label="Configuration" value={d.configuration} />
                <Detail Icon={Layers} label="Units" value={d.units} />

                <div className="lg:flex-1 lg:px-6">
                  <p className="m-0 text-[10px] font-medium uppercase tracking-[1.4px] sm:text-[11px]" style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}>
                    Starting from
                  </p>
                  <p className="m-0 mt-0.5 text-[20px] font-bold leading-tight sm:text-[22px]" style={{ color: DEEP_NAVY }}>
                    {d.price}
                  </p>
                </div>

                <div className="sm:col-span-2 lg:shrink-0 lg:pl-6">
                  <Link
                    href={active.cta.href}
                    className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-md px-6 py-3.5 text-[11.5px] font-bold uppercase tracking-[1.6px] text-white shadow-[0_10px_24px_-10px_rgba(15,58,107,0.6)] transition-all duration-300 hover:shadow-[0_14px_30px_-10px_rgba(15,58,107,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5B9BE0] active:scale-[0.98] lg:w-auto lg:px-7 sm:text-[12px]"
                    style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
                  >
                    {active.cta.label}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
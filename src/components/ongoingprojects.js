"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Figtree } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Home,
  BedDouble,
  Ruler,
  Layers,
  Video,
  Orbit,
  Building2,
  Map,
  ArrowRight,
  Phone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const GOLD = "#B08D3F";
const GOLD_DEEP = "#8A6B2E";
const CREAM = "#FBF8F2";
const LINE = "#E8DFCB";

const PROJECTS = [
  {
    id: 1,
    category: "APARTMENTS",
    status: "Under Construction",
    name: "Gurudev",
    address:
      "PKR ESTATES Gurudev, Next to SHRIRAM SHANKARI, Perumathunallur, Chennai, Tamil Nadu 603202, India",
    price: "₹22 Lacs Onwards*",
    type: "Apartments",
    size: "0.6 Acres",
    bedrooms: "1BHK & 2BHK",
    units: "90 Apartments",
    completion: "DEC 2026",
    completionDate: "2026-12-31T23:59:59",
    image: "/gurudev.png",
  },
  {
    id: 2,
    category: "APARTMENTS",
    status: "Under Construction",
    name: "Privana",
    address:
      "Perumattunallur Village, Guduvancheri, Chennai South, Chennai",
    price: "₹20.01 Lacs Onwards*",
    type: "Apartments",
    size: "1.41 Acres",
    bedrooms: "Studio, 1BHK, 2BHK & 3BHK",
    units: "186 Units",
    completion: "JUN 2028",
    completionDate: "2028-06-30T23:59:59",
    image: "/privana.png",
  },
];

function useCountdown(target) {
  const [t, setT] = useState({ days: "--", hrs: "--", min: "--", sec: "--" });

  useEffect(() => {
    const tick = () => {
      const diff = new Date(target).getTime() - Date.now();
      if (diff <= 0) {
        setT({ days: 0, hrs: 0, min: 0, sec: 0 });
        return;
      }
      setT({
        days: Math.floor(diff / 86400000),
        hrs: Math.floor((diff / 3600000) % 24),
        min: Math.floor((diff / 60000) % 60),
        sec: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return t;
}

export default function OurProjects() {
  const root = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".gs-head", start: "top 82%", once: true },
      });

      tl.fromTo(
        ".gs-eyebrow-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "center",
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform",
        }
      )
        .fromTo(
          ".gs-eyebrow-text",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, clearProps: "transform,opacity" },
          "-=0.35"
        )
        .fromTo(
          ".gs-title-word",
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.08,
            ease: "power4.out",
            clearProps: "transform,opacity",
          },
          "-=0.3"
        )
        .fromTo(
          ".gs-sub",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", clearProps: "transform,opacity" },
          "-=0.5"
        );

      gsap.utils.toArray(".gs-card").forEach((card) => {
        const ctl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: card, start: "top 84%", once: true },
        });

        ctl.fromTo(
          card,
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", clearProps: "transform,opacity" }
        )
          .fromTo(
            card.querySelector(".gs-img"),
            { scale: 1.1, opacity: 0.85 },
            { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.7"
          )
          .fromTo(
            card.querySelector(".gs-badge"),
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.7"
          )
          .fromTo(
            card.querySelector(".gs-card-rule"),
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: "left center", duration: 0.5, ease: "power2.out", clearProps: "transform" },
            "-=0.6"
          )
          .fromTo(
            card.querySelectorAll(".gs-line"),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out", clearProps: "transform,opacity" },
            "-=0.5"
          )
          .fromTo(
            card.querySelectorAll(".gs-spec"),
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.4"
          )
          .fromTo(
            card.querySelector(".gs-countdown-box"),
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.3"
          )
          .fromTo(
            card.querySelector(".gs-actions"),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", clearProps: "transform,opacity" },
            "-=0.3"
          );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="projects"
      className={`${figtree.className} relative w-full py-16 sm:py-20`}
      style={{ backgroundColor: CREAM }}
    >
      <div className="relative mx-auto max-w-[1800px] px-6 lg:px-10">
        {/* Section Heading */}
        <div className="gs-head mb-14 text-center">
          <div className="flex items-center justify-center gap-3">
           
            <span
              className="gs-eyebrow-text text-xs font-semibold tracking-[0.28em]"
              style={{ color: GOLD_DEEP }}
            >
              EXPLORE
            </span>
           
          </div>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
            {["Our", "Projects"].map((word) => (
              <span key={word} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span className="gs-title-word inline-block pr-[0.22em] will-change-transform">{word}</span>
              </span>
            ))}
          </h2>

          <p className="gs-sub mx-auto mt-5 max-w-2xl text-base leading-relaxed text-neutral-600 sm:text-lg">
            Two ongoing residential communities in Chennai South — thoughtfully
            designed, transparently priced.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const { days, hrs, min, sec } = useCountdown(project.completionDate);

  return (
    <div
      className="gs-card overflow-hidden rounded-2xl border bg-white shadow-[0_18px_50px_-30px_rgba(90,70,30,0.45)]"
      style={{ borderColor: LINE }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {/* Image */}
        <div className="relative h-60 overflow-hidden sm:h-full sm:min-h-[360px]">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="gs-img object-cover"
          />
          <span
            className="gs-badge absolute right-0 top-5 rounded-l-md px-4 py-1.5 text-xs font-semibold tracking-wide text-white"
            style={{ backgroundColor: GOLD_DEEP }}
          >
            {project.status}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center px-6 py-7 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                className="gs-line text-[11px] font-semibold tracking-[0.22em]"
                style={{ color: GOLD_DEEP }}
              >
                {project.category}
              </span>
              <h3 className="gs-line mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
                {project.name}
              </h3>
            </div>

            <button
              type="button"
              aria-label={`Call about ${project.name}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderColor: LINE, backgroundColor: CREAM, color: GOLD_DEEP }}
            >
              <Phone className="h-4 w-4" />
            </button>
          </div>

          <span
            className="gs-card-rule mt-4 block h-[3px] w-12 rounded-full"
            style={{ backgroundColor: GOLD }}
          />

          <p className="gs-line mt-4 text-[14px] leading-relaxed text-neutral-500">
            {project.address}
          </p>

          <div className="gs-line mt-6 text-xs font-medium tracking-wide text-neutral-500">
            Starting from
          </div>
          <div
            className="gs-line mt-1 text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: GOLD_DEEP }}
          >
            {project.price}
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="border-t px-6 py-6 sm:px-8" style={{ borderColor: "#EFE7D6" }}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
          {[
            { icon: Building2, label: "TYPE", value: project.type },
            { icon: Ruler, label: "SIZE", value: project.size },
            { icon: BedDouble, label: "BEDROOMS", value: project.bedrooms },
            { icon: Home, label: "UNITS", value: project.units },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="gs-spec flex items-start gap-2.5">
              <Icon
                className="mt-0.5 h-5 w-5 shrink-0"
                strokeWidth={1.5}
                style={{ color: GOLD }}
              />
              <div>
                <div className="text-[10px] font-semibold tracking-[0.14em] text-neutral-400">
                  {label}
                </div>
                <div className="mt-0.5 text-sm font-bold leading-snug text-neutral-900">
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div
          className="mt-7 border-t pt-6"
          style={{ borderColor: "#EFE7D6" }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.16em] text-neutral-400">
              TIME LEFT FOR PROJECT COMPLETION
            </span>
            <span
              className="text-[11px] font-bold tracking-[0.12em]"
              style={{ color: GOLD_DEEP }}
            >
              {project.completion}
            </span>
          </div>

          <div
            className="gs-countdown-box mt-4 grid grid-cols-4 divide-x overflow-hidden rounded-xl border"
            style={{ borderColor: LINE, backgroundColor: CREAM }}
          >
            {[
              { v: days, l: "DAYS" },
              { v: hrs, l: "HRS" },
              { v: min, l: "MIN" },
              { v: sec, l: "SEC" },
            ].map(({ v, l }) => (
              <div
                key={l}
                className="gs-count flex flex-col items-center py-4"
                style={{ borderColor: LINE }}
              >
                <span className="text-xl font-bold tabular-nums text-neutral-900 sm:text-2xl">
                  {v}
                </span>
                <span className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-neutral-400">
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div
          className="gs-actions mt-6 flex flex-col gap-5 rounded-xl border px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "#EFE7D6", backgroundColor: CREAM }}
        >
          <div className="flex flex-wrap items-center gap-5">
            <ActionIcon icon={Video} label="Walk Through" />
            <ActionIcon icon={Orbit} label="Aerial View" />
            <ActionIcon icon={Building2} label="Home Tour" />
            <ActionIcon icon={Map} label="Route Map" />
          </div>

          <button
            type="button"
            className="group inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{ backgroundColor: GOLD_DEEP }}
          >
            KNOW MORE
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionIcon({ icon: Icon, label }) {
  return (
    <div className="group flex flex-col items-center gap-1.5">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-md text-white transition-transform duration-300 group-hover:-translate-y-1"
        style={{ backgroundColor: GOLD }}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="text-center text-[10px] font-bold leading-tight tracking-wide text-neutral-600">
        {label}
      </span>
    </div>
  );
}
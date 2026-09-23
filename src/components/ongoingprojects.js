"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Geist } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Home,
  BedDouble,
  Ruler,
  Building2,
  ArrowRight,
  Phone,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const TEXT_CHARCOAL = "#2D3A46";
const LIGHT_BLUE = "#E8F0F9";
const LIGHT_BLUE_RING = "rgba(15,58,107,0.10)";

const PROJECTS = [
  {
    id: 1,
    slug: "gurudev",
    category: "APARTMENTS",
    status: "Under Construction",
    name: "Gurudev",
    address:
      "PKR ESTATES Gurudev, Next to SHRIRAM SHANKARI, Perumathunallur, Chennai, Tamil Nadu 603202, India",
    price: "₹22 Lakhs Onwards*",
    type: "Apartments",
    size: "68 Cents",
    bedrooms: "1BHK & 2BHK",
    units: "90 Apartments",
    completion: "DEC 2026",
    completionDate: "2026-12-31T23:59:59",
    image: "/guuruu.png",
  },
  {
    id: 2,
    slug: "privana",
    category: "APARTMENTS",
    status: "Under Construction",
    name: "Privana",
    address:
      "Perumattunallur Village, Guduvancheri, Chennai South, Chennai",
    price: "₹20.01 Lakhs Onwards*",
    type: "Apartments",
    size: "1.41 Acres",
    bedrooms: "Studio, 1& 2& 3BHK ",
    units: "186 Units",
    completion: "JUN 2028",
    completionDate: "2028-06-30T23:59:59",
    image: "/uppriv.png",
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
        scrollTrigger: { trigger: ".gs-head", start: "top 85%", once: true },
      });

      tl.fromTo(
        ".gs-eyebrow-text",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, clearProps: "transform,opacity" }
      )
        .fromTo(
          ".gs-title-word",
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: "power4.out",
            clearProps: "transform,opacity",
          },
          "-=0.2"
        )
        .fromTo(
          ".gs-sub",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", clearProps: "transform,opacity" },
          "-=0.3"
        );

      gsap.utils.toArray(".gs-card").forEach((card) => {
        const ctl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });

        ctl.fromTo(
          card,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: "power3.out", clearProps: "transform,opacity" }
        )
          .fromTo(
            card.querySelector(".gs-img"),
            { scale: 1.08, opacity: 0.85 },
            { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.4"
          )
          .fromTo(
            card.querySelector(".gs-badge"),
            { x: 25, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.35, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.45"
          )
          .fromTo(
            card.querySelector(".gs-card-rule"),
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: "left center", duration: 0.35, ease: "power2.out", clearProps: "transform" },
            "-=0.35"
          )
          .fromTo(
            card.querySelectorAll(".gs-line"),
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.04, ease: "power3.out", clearProps: "transform,opacity" },
            "-=0.3"
          )
          .fromTo(
            card.querySelectorAll(".gs-spec"),
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.25"
          )
          .fromTo(
            card.querySelector(".gs-countdown-box"),
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.2"
          )
          .fromTo(
            card.querySelector(".gs-actions"),
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", clearProps: "transform,opacity" },
            "-=0.2"
          );
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="projects"
      className={`${geist.className} relative w-full py-9 sm:py-16 md:py-20`}
    >
      <div className="relative mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-10">
        <div className="gs-head mb-7 text-center sm:mb-14">
          <div className="flex items-center justify-center gap-3">
            <span
              className="gs-eyebrow-text text-[10.5px] font-semibold tracking-[0.2em] sm:text-xs sm:tracking-[0.28em]"
              style={{ color: DEEP_NAVY }}
            >
              EXPLORE
            </span>
          </div>

          <h2
            className="mt-2.5 text-[27px] font-bold tracking-tight sm:mt-4 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ color: DEEP_NAVY }}
          >
            {["Our", "Projects"].map((word) => (
              <span
                key={word}
                className="inline-block overflow-hidden align-bottom"
                style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
              >
                <span className="gs-title-word inline-block pr-[0.22em] will-change-transform">
                  {word}
                </span>
              </span>
            ))}
          </h2>

          <p
            className="gs-sub mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed sm:mt-5 sm:text-lg"
            style={{ color: TEXT_CHARCOAL }}
          >
            Creating more than addresses; we shape welcoming spaces where families can begin their next chapter together. 
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-7 lg:grid-cols-2">
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
  const router = useRouter();
  const href = `/projects/${project.slug}`;

  return (
    <div className="gs-card group/card overflow-hidden rounded-2xl bg-white shadow-[0_10px_40px_-14px_rgba(15,58,107,0.25)] transition-shadow duration-300 hover:shadow-[0_18px_50px_-16px_rgba(15,58,107,0.35)]">
      <div className="grid grid-cols-1 sm:grid-cols-2">
        
        {/* --- IMAGE SECTION - FIXED --- */}
        <Link
          href={href}
          aria-label={`View ${project.name} project details`}
          // Removed fixed height, added flex to center if needed
          className="relative block w-full overflow-hidden bg-gray-50"
        >
          <Image
            src={project.image}
            alt={project.name}
            // REMOVED: fill
            // ADDED: width={0} height={0} sizes="100vw" to enable responsive sizing
            width={0}
            height={0}
            sizes="100vw"
            // CHANGED: object-cover to object-contain
            // ADDED: w-full h-auto to maintain aspect ratio
            className="gs-img h-auto w-full object-contain transition-transform duration-500 group-hover/card:scale-[1.04]"
          />
        </Link>
        {/* --------------------------- */}

        {/* Details */}
        <div className="flex flex-col justify-center px-4 py-5 sm:px-6 sm:py-7 md:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <span
                className="gs-line text-[10px] font-semibold tracking-[0.18em] sm:text-[11px] sm:tracking-[0.22em]"
                style={{ color: DEEP_NAVY }}
              >
                {project.category}
              </span>

              <h3
                className="gs-line mt-0.5 text-lg font-semibold tracking-tight sm:mt-1 sm:text-2xl"
                style={{ color: DEEP_NAVY }}
              >
                <Link
                  href={href}
                  className="transition-colors duration-300"
                  style={{ color: DEEP_NAVY }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                >
                  {project.name}
                </Link>
              </h3>
            </div>

            <button
              type="button"
              aria-label={`Call about ${project.name}`}
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = "tel:+911234567890";
              }}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-0.5 sm:h-10 sm:w-10"
              style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>

          <p
            className="gs-line mt-2.5 text-[12.5px] leading-relaxed sm:mt-4 sm:text-[14px]"
            style={{ color: TEXT_CHARCOAL }}
          >
            {project.address}
          </p>

          <div
            className="gs-line mt-4 text-[11px] font-medium tracking-wide sm:mt-6 sm:text-xs"
            style={{ color: TEXT_CHARCOAL }}
          >
            Starting from
          </div>
          <div
            className="gs-line mt-0.5 text-lg font-bold tracking-tight sm:mt-1 sm:text-2xl md:text-3xl"
            style={{ color: DEEP_NAVY }}
          >
            {project.price}
          </div>
        </div>
      </div>

      {/* Specs */}
      <div className="px-4 py-4 sm:px-6 sm:py-6 md:px-8">
        <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-6 sm:gap-y-5 md:grid-cols-4">
          {[
            { icon: Building2, label: "TYPE", value: project.type },
            { icon: Ruler, label: "SIZE", value: project.size },
            { icon: BedDouble, label: "BEDROOMS", value: project.bedrooms },
            { icon: Home, label: "UNITS", value: project.units },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="gs-spec flex items-start gap-2 sm:gap-2.5">
              <Icon
                className="mt-0.5 h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                strokeWidth={1.5}
                style={{ color: DEEP_NAVY }}
              />
              <div className="min-w-0">
                <div
                  className="text-[9.5px] font-semibold tracking-[0.14em] sm:text-[10px]"
                  style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}
                >
                  {label}
                </div>
                <div
                  className="mt-0.5 text-[12px] font-bold leading-snug sm:text-sm"
                  style={{ color: DEEP_NAVY }}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Countdown */}
        <div className="mt-4 pt-3 sm:mt-7 sm:pt-6">
          <div className="flex flex-col gap-1 xs:flex-row xs:items-center xs:justify-between sm:flex-row sm:items-center sm:justify-between sm:gap-1.5">
            <span
              className="text-[9.5px] font-semibold tracking-[0.14em] sm:text-[10px] sm:tracking-[0.16em]"
              style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}
            >
              TIME LEFT FOR PROJECT COMPLETION
            </span>
            <span
              className="text-[10.5px] font-bold tracking-[0.12em] sm:text-[11px]"
              style={{ color: DEEP_NAVY }}
            >
              {project.completion}
            </span>
          </div>

          <div
            className="gs-countdown-box mt-3 grid grid-cols-4 overflow-hidden rounded-xl sm:mt-4"
            style={{
              backgroundColor: LIGHT_BLUE,
              boxShadow: `inset 0 0 0 1px ${LIGHT_BLUE_RING}`,
            }}
          >
            {[
              { v: days, l: "DAYS" },
              { v: hrs, l: "HRS" },
              { v: min, l: "MIN" },
              { v: sec, l: "SEC" },
            ].map(({ v, l }) => (
              <div
                key={l}
                className="gs-count flex flex-col items-center py-2.5 sm:py-4"
              >
                <span
                  className="text-base font-bold tabular-nums sm:text-xl md:text-2xl"
                  style={{ color: DEEP_NAVY }}
                >
                  {v}
                </span>
                <span
                  className="mt-0.5 text-[8.5px] font-semibold tracking-[0.1em] sm:mt-1 sm:text-[10px] sm:tracking-[0.14em]"
                  style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}
                >
                  {l}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="gs-actions mt-4 flex justify-end sm:mt-7">
          <Link
            href={href}
            className="group inline-flex items-center gap-2 rounded-md px-4 py-2 text-[10.5px] font-bold tracking-[0.14em] text-white shadow-[0_6px_18px_-8px_rgba(15,58,107,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(15,58,107,0.85)] active:scale-[0.98] sm:gap-2.5 sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.16em]"
            style={{ backgroundColor: DEEP_NAVY }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
          >
            KNOW MORE
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
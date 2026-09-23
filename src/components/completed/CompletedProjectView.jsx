"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Geist } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, MapPin, ArrowUpRight, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const DEEP_NAVY = "#0F3A6B";
const GOLD = "#B8925A";
const GOLD_DEEP = "#8C6A3F";
const CHARCOAL = "#2D3A46";
const CREAM = "#FAF8F4";
const HAIRLINE = "rgba(15,58,107,0.12)";

export default function CompletedProjectView({ project, otherProjects }) {
  const root = useRef(null);

  useGSAP(
    () => {
      // One orchestrated hero entrance — nothing else animates on load.
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(".cp-stamp", { opacity: 0, scale: 0.6, rotate: 8 }, { opacity: 1, scale: 1, rotate: -8, duration: 0.7, ease: "back.out(1.6)" })
        .fromTo(
          ".cp-title-word",
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: "power4.out" },
          "-=0.45"
        )
        .fromTo(".cp-hero-copy", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, "-=0.3");

      // Scroll-triggered reveals — one clean fade per section, not per card.
      gsap.utils.toArray(".cp-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    },
    { scope: root }
  );

  const titleWords = project.name.split(" ");
  const mobileHero = project.heroImageMobile || project.heroImage;

  return (
    <main ref={root} className={`${geist.className} w-full bg-white`} style={{ color: CHARCOAL }}>
      {/* ================= HERO — full-bleed, editorial ================= */}
      <section className="relative h-[78vh] min-h-[520px] w-full overflow-hidden sm:h-[86vh] sm:min-h-[560px]">
        {/* Desktop hero */}
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          priority
          sizes="(min-width: 640px) 100vw, 0vw"
          className="hidden object-cover sm:block"
        />

        {/* Mobile hero */}
        <Image
          src={mobileHero}
          alt={project.name}
          fill
          priority
          sizes="(max-width: 639px) 100vw, 0vw"
          className="block object-cover sm:hidden"
        />

       

       
      </section>

      {/* ================= STAT RULE ================= */}
      {/* <section className="cp-reveal w-full border-b" style={{ borderColor: HAIRLINE }}>
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 py-6 sm:gap-x-16 sm:px-10 sm:py-8 lg:px-14">
          {project.stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-x-10 sm:gap-x-16">
              {i !== 0 && <span className="hidden h-8 w-px sm:block" style={{ backgroundColor: HAIRLINE }} />}
              <div className="text-center">
                <div className="text-[16px] font-bold sm:text-[19px]" style={{ color: DEEP_NAVY }}>
                  {stat.value}
                </div>
                <div className="mt-0.5 text-[11.5px]" style={{ color: CHARCOAL, opacity: 0.55 }}>
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* ================= STORY + HIGHLIGHTS ================= */}
      <section className="cp-reveal mx-auto max-w-[1500px] px-5 py-16 sm:px-10 sm:py-24 lg:px-14">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <h2 className="text-[24px] font-bold leading-tight tracking-tight sm:text-[34px]" style={{ color: DEEP_NAVY }}>
              The story behind {project.name}
            </h2>
            <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.75] sm:text-[16px]">{project.description}</p>
          </div>

          <div className="flex flex-col justify-center gap-5 sm:gap-6">
            {project.highlights.map((point) => (
              <div key={point} className="flex items-start gap-3.5">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(184,146,90,0.14)" }}
                >
                  <Check className="h-3.5 w-3.5" style={{ color: GOLD_DEEP }} strokeWidth={2.5} />
                </span>
                <p className="text-[14.5px] font-medium leading-snug sm:text-[15.5px]" style={{ color: DEEP_NAVY }}>
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      {/* <section className="cp-reveal w-full" style={{ backgroundColor: CREAM }}>
        <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-10 sm:py-24 lg:px-14">
          <h3 className="mb-7 text-[20px] font-bold tracking-tight sm:mb-9 sm:text-[26px]" style={{ color: DEEP_NAVY }}>
            A look back at {project.name}
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {project.gallery.map((src, i) => (
              <div
                key={src}
                className={`relative overflow-hidden rounded-xl ${
                  i === 0 ? "h-[260px] sm:col-span-2 sm:row-span-2 sm:h-[420px]" : "h-[190px] sm:h-[202px]"
                }`}
              >
                <Image src={src} alt={`${project.name} photo ${i + 1}`} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section> */}
    </main>
  );
}
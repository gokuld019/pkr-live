"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GOLD = "#B08D3F";

export default function VisionMission() {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        ".gs-bg-photo",
        { scale: 1.08, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.6, ease: "power2.out", clearProps: "transform" }
      )
        .fromTo(
          ".gs-rule",
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left center", duration: 0.7, ease: "power2.out", clearProps: "transform" },
          "-=1.2"
        )
        .fromTo(
          ".gs-word",
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.065,
            ease: "power4.out",
            clearProps: "all",
          },
          "-=0.55"
        )
        .fromTo(
          ".gs-para",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "all" },
          "-=0.5"
        )
        .fromTo(
          ".gs-cta",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power2.out", clearProps: "all" },
          "-=0.4"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative w-full overflow-hidden">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/mission.jpeg"
          alt="Happy homeowners"
          fill
          priority
          className="gs-bg-photo object-cover object-center"
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[700px] max-w-[1700px] grid-cols-1 px-6 py-16 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,0.5fr)] lg:py-0">
        {/* Left copy */}
        <div className="relative z-20 flex flex-col justify-center py-6 lg:py-24">
          <span
            className="gs-rule mb-7 block h-[3px] w-16 rounded-full"
            style={{ backgroundColor: GOLD }}
          />

          <h2 className="text-3xl font-bold uppercase leading-[1.15] tracking-tight text-black sm:text-4xl xl:text-[2.75rem]">
            {["Driven", "by", "Purpose,"].map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span className="gs-word inline-block pr-[0.25em] will-change-transform">{w}</span>
              </span>
            ))}
            <br />
            {["Built", "on", "Promise"].map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span className="gs-word inline-block pr-[0.25em] will-change-transform">{w}</span>
              </span>
            ))}
          </h2>

          <p className="gs-para mt-6 max-w-md text-[15px] leading-[1.85] text-black-200 sm:text-base">
            Empowering dreams through customer-centric design and quality
            craftsmanship, we create more than homes — we build lasting value
            for families and communities. Every project reflects our vision for
            a better and enduring living experience for all.
          </p>

          <div className="gs-cta mt-10">
            <button
              type="button"
              className="group inline-flex items-center gap-4 rounded-full border bg-white/10 px-8 py-3.5 text-sm font-semibold tracking-wide text-black backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
              style={{ borderColor: GOLD }}
            >
              Know More
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: GOLD }}
              />
            </button>
          </div>
        </div>

        {/* Center column — empty spacer, keeps the 3-col width ratio */}
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
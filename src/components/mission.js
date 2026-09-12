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
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        ".gs-bg-photo",
        { scale: 1.04, opacity: 0.9 },
        { scale: 1, opacity: 1, duration: 0.7, ease: "power2.out", clearProps: "transform" }
      )
        .fromTo(
          ".gs-rule",
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left center", duration: 0.35, ease: "power2.out", clearProps: "transform" },
          "-=0.45"
        )
        .fromTo(
          ".gs-word",
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.025,
            ease: "power3.out",
            clearProps: "all",
          },
          "-=0.25"
        )
        .fromTo(
          ".gs-para",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", clearProps: "all" },
          "-=0.2"
        )
        .fromTo(
          ".gs-cta",
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: "power2.out", clearProps: "all" },
          "-=0.15"
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

      <div className="relative z-10 mx-auto grid min-h-[480px] max-w-[1700px] grid-cols-1 px-5 py-12 sm:min-h-[560px] sm:px-8 sm:py-16 md:px-10 md:py-20 lg:min-h-[700px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,0.5fr)] lg:py-0">
        {/* Left copy */}
        <div className="relative z-20 flex flex-col justify-center py-4 sm:py-6 lg:py-24">
          <h2 className="text-2xl font-bold uppercase leading-[1.2] tracking-tight text-black sm:text-3xl md:text-4xl xl:text-[2.75rem]">
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

          <p className="gs-para mt-5 max-w-full text-sm leading-[1.75] text-black-200 sm:mt-6 sm:max-w-md sm:text-base sm:leading-[1.85]">
            Empowering dreams through customer-centric design and quality
            craftsmanship, we create more than homes — we build lasting value
            for families and communities. Every project reflects our vision for
            a better and enduring living experience for all.
          </p>

          <div className="gs-cta mt-7 sm:mt-10">
            <button
              type="button"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full border bg-white/10 px-6 py-3 text-sm font-semibold tracking-wide text-black backdrop-blur-sm transition-all duration-300 hover:bg-white/20 sm:w-auto sm:justify-start sm:gap-4 sm:px-8 sm:py-3.5"
              style={{ borderColor: GOLD }}
            >
              Know More
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
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
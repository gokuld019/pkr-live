"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BG_IMAGE = "/CTA.png";
const MODEL_IMAGE = "/lineart.png";

const INK = "#feffff";

export default function PromiseHeroBanner() {
  const root = useRef(null);
  const overlayRef = useRef(null);
  const modelRef = useRef(null);

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

      if (overlayRef.current) {
        tl.to(
          overlayRef.current,
          { opacity: 0, scaleY: 0, transformOrigin: "top center", duration: 0.8, ease: "power4.inOut", clearProps: "all" },
          0
        );
      }

      if (modelRef.current) {
        tl.fromTo(
          modelRef.current,
          { opacity: 0, x: 30 },
          { opacity: 0.85, x: 0, duration: 1.1, ease: "power3.out", clearProps: "transform" },
          0.2
        );
      }

      tl.fromTo(
        ".ph-word",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.08,
          ease: "power4.out",
          clearProps: "all",
        },
        0.25
      )
        .fromTo(
          ".ph-subline",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", clearProps: "all" },
          0.6
        )
        .fromTo(
          ".ph-cta",
          { opacity: 0, y: 18, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "back.out(1.5)", clearProps: "all" },
          0.75
        )
        .fromTo(
          ".ph-scrollbar",
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left center", duration: 0.6, ease: "power2.out", clearProps: "transform" },
          0.9
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="contact"
      className="relative w-full overflow-hidden bg-[#F4F2ED]"
      style={{
        fontFamily: "'Poppins', 'Plus Jakarta Sans', system-ui, sans-serif",
        height: "clamp(340px, 37vw, 660px)",
      }}
    >
      {/* Curtain reveal overlay */}
     

      {/* Background texture */}
      <div className="absolute inset-0 z-0">
        <Image src={BG_IMAGE} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* Model cutout */}
      <div
        ref={modelRef}
        className="pointer-events-none absolute z-20 right-[6%] bottom-0"
        style={{ height: "108%", width: "34%" }}
      >
        <Image
          src={MODEL_IMAGE}
          alt="Happy resident"
          fill
          priority
          sizes="34vw"
          className="object-contain object-bottom"
        />
      </div>

      {/* Copy block */}
      <div className="absolute inset-0 z-30 flex items-end pb-[12%] sm:items-center sm:pb-0">
        <div className="w-full px-6 sm:px-10 lg:px-16">
          <div className="flex max-w-[560px] flex-wrap items-end gap-x-4">
            <h1
              className="leading-[0.92] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(2rem, 5.2vw, 4.2rem)",
                color: INK,
                fontWeight: 300,
              }}
            >
              {["Pride", "is Our", "Promise"].map((line) => (
                <span key={line} className="block overflow-hidden" style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}>
                  <span className="ph-word block will-change-transform">{line}</span>
                </span>
              ))}
            </h1>

          
          </div>

          <button
            type="button"
            onClick={() =>
              document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" })
            }
            className="ph-cta mt-6 inline-flex cursor-pointer items-center bg-white px-8 py-3.5 text-xs font-bold tracking-[0.15em] shadow-md transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ color: INK }}
          >
            ENQUIRE NOW
          </button>
        </div>
      </div>

     
    </section>
  );
}
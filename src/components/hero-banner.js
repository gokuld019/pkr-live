"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { src: "/banners/1.jpeg", alt: "Radiance project view 1" },
  { src: "/banners/2.jpeg", alt: "Radiance project view 2" },
  { src: "/banners/3.jpeg", alt: "Radiance project view 3" },
];

const AUTO_SCROLL_MS = 6000;
const ACCENT = "#0F3A6B";

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  const goTo = useCallback((index) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  return (
    <section className="relative isolate h-[100svh] min-h-[480px] w-full overflow-hidden bg-[#0B0B0C] sm:min-h-[560px] md:h-[90svh] lg:h-[100svh]">
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 ${i === active ? "z-10 opacity-100" : "z-0 opacity-0"}`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes="100vw"
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
            quality={90}
            className="object-cover object-[68%_center] sm:object-center"
          />
        </div>
      ))}

      {/* Slim frame lines — modern sleek touch */}
      <div className="pointer-events-none absolute inset-5 z-20 border border-white/15 sm:inset-8 md:inset-10" />

      {/* Arrows */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:left-6 md:left-10"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-black sm:right-6 md:right-10"
      >
        <ChevronRight className="h-4 w-4" />
      </button>

      {/* Slide index + dashes — bottom-left, minimal */}
      <div className="absolute bottom-6 left-5 z-30 flex items-center gap-4 sm:bottom-8 sm:left-8 md:left-10">
        <span className="text-xs font-semibold tracking-[0.2em] text-white/70">
          {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active}
              className="h-[3px] rounded-full transition-all duration-300"
              style={{
                width: i === active ? "32px" : "14px",
                backgroundColor: i === active ? ACCENT : "rgba(255,255,255,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
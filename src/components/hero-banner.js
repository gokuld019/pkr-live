"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { getImageProps } from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Each slide has a separate desktop/tablet image (landscape) and mobile image (portrait).
 * Mobile image shows below 768px, desktop image from 768px up.
 *
 * Suggested sizes:
 *   desktop → 2400 x 1350 (16:9)
 *   mobile  → 1080 x 1600 (roughly 2:3 / 4:5 portrait)
 */
const SLIDES = [
  {
    desktop: "/banners/d1.jpeg",
    mobile: "/banners/M1.jpeg",
    alt: "Radiance project view 1",
  },
  {
    desktop: "/banners/d2.jpeg",
    mobile: "/banners/M2.jpeg",
    alt: "Radiance project view 2",
  },
  {
    desktop: "/banners/upd3.jpeg",
    mobile: "/banners/M3.jpeg",
    alt: "Radiance project view 3",
  },
];

const AUTO_SCROLL_MS = 5000;
const SWIPE_THRESHOLD = 50;
const ACCENT = "#0F3A6B";

/* Shared look for both arrow buttons: frosted glass, always readable on any photo */
const ARROW_BASE =
  "group absolute z-30 flex items-center justify-center rounded-full " +
  "border border-white/40 bg-black/35 text-white backdrop-blur-md " +
  "shadow-[0_8px_24px_-6px_rgba(0,0,0,0.55)] " +
  "h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 2xl:h-16 2xl:w-16 " +
  "transition-all duration-300 ease-out " +
  "hover:scale-105 hover:border-white hover:bg-white hover:text-[#0F3A6B] " +
  "active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/40";

const ARROW_ICON =
  "h-5 w-5 lg:h-6 lg:w-6 2xl:h-7 2xl:w-7 transition-transform duration-300";

function SlideImage({ slide, priority }) {
  const common = {
    alt: slide.alt,
    fill: true,
    sizes: "100vw",
    quality: 85,
    className: "object-cover object-center",
  };

  const {
    props: { srcSet: desktopSet, ...desktopProps },
  } = getImageProps({ ...common, src: slide.desktop, priority });

  const {
    props: { srcSet: mobileSet },
  } = getImageProps({ ...common, src: slide.mobile });

  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={mobileSet} />
      <source media="(min-width: 768px)" srcSet={desktopSet} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...desktopProps} alt={slide.alt} />
    </picture>
  );
}

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  const goTo = useCallback((index) => {
    setActive((index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  /* Auto-scroll (resets whenever the slide changes, pauses on hover/touch) */
  useEffect(() => {
    if (paused || SLIDES.length < 2) return;
    const id = setTimeout(next, AUTO_SCROLL_MS);
    return () => clearTimeout(id);
  }, [active, paused, next]);

  /* Keyboard arrows */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  /* Swipe support for touch screens */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (dx > SWIPE_THRESHOLD) prev();
      else if (dx < -SWIPE_THRESHOLD) next();
    }
    touchStartX.current = null;
    setPaused(false);
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Project banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      className={
        "relative isolate w-full overflow-hidden bg-[#0B0B0C] " +
        /* Height scales per breakpoint; max-h keeps it sane on ultra-wide / 4K */
        "h-[82svh] min-h-[460px] max-h-[900px] " +
        "sm:h-[78svh] sm:min-h-[520px] " +
        "md:h-[85svh] md:min-h-[560px] md:max-h-[1000px] " +
        "lg:h-[100svh] lg:min-h-[620px] lg:max-h-[1100px] " +
        "2xl:max-h-[1300px]"
      }
    >
      <style>{`
        @keyframes heroProgress { from { width: 0%; } to { width: 100%; } }
        @keyframes heroKenBurns { from { transform: scale(1.06); } to { transform: scale(1); } }
        @media (prefers-reduced-motion: reduce) {
          .hero-kenburns, .hero-progress { animation: none !important; }
        }
      `}</style>

      {/* Slides */}
      {SLIDES.map((s, i) => {
        const isActive = i === active;
        return (
          <div
            key={s.desktop}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-in-out motion-reduce:transition-none ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <div
              key={isActive ? `on-${active}` : `off-${i}`}
              className="hero-kenburns absolute inset-0"
              style={isActive ? { animation: `heroKenBurns ${AUTO_SCROLL_MS + 1500}ms ease-out forwards` } : undefined}
            >
              <SlideImage slide={s} priority={i === 0} />
            </div>
          </div>
        );
      })}

    

     

     
    </section>
  );
}
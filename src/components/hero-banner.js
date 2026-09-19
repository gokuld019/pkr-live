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
    desktop: "/banners/1.jpeg",
    mobile: "/banners/mobile/1.jpeg",
    alt: "Radiance project view 1",
  },
  {
    desktop: "/banners/2.jpeg",
    mobile: "/banners/mobile/2.jpeg",
    alt: "Radiance project view 2",
  },
  {
    desktop: "/banners/3.jpeg",
    mobile: "/banners/mobile/3.jpeg",
    alt: "Radiance project view 3",
  },
];

const AUTO_SCROLL_MS = 6000;
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

    

     

      {/* Arrows
          mobile  → grouped bottom-right (never covers the photo subject)
          md & up → vertically centered on the left / right edges */}
      {/* <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className={`${ARROW_BASE} bottom-5 right-[3.75rem] sm:bottom-7 sm:right-[4.5rem] md:bottom-auto md:right-auto md:left-6 md:top-1/2 md:-translate-y-1/2 md:hover:scale-105 lg:left-10 2xl:left-16`}
      >
        <ChevronLeft className={`${ARROW_ICON} group-hover:-translate-x-0.5`} strokeWidth={2.25} />
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className={`${ARROW_BASE} bottom-5 right-3 sm:bottom-7 sm:right-5 md:bottom-auto md:right-6 md:top-1/2 md:-translate-y-1/2 lg:right-10 2xl:right-16`}
      >
        <ChevronRight className={`${ARROW_ICON} group-hover:translate-x-0.5`} strokeWidth={2.25} />
      </button> */}

      {/* Slide index + progress dashes — bottom-left */}
      <div className="absolute bottom-6 left-5 z-30 flex items-center gap-3 sm:bottom-8 sm:left-8 sm:gap-4 md:left-12 lg:bottom-12 lg:left-16 2xl:bottom-16 2xl:left-24">
        <span className="text-[11px] font-semibold tabular-nums tracking-[0.2em] text-white/80 sm:text-xs 2xl:text-sm">
          {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {SLIDES.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={isActive}
                className="relative flex h-6 items-center"
              >
                <span
                  className="relative block h-[3px] overflow-hidden rounded-full bg-white/35 transition-all duration-500"
                  style={{ width: isActive ? "clamp(28px, 4vw, 48px)" : "clamp(12px, 1.6vw, 18px)" }}
                >
                  {isActive && (
                    <span
                      key={`p-${active}-${paused}`}
                      className="hero-progress absolute inset-y-0 left-0 rounded-full"
                      style={{
                        backgroundColor: "#FFFFFF",
                        boxShadow: `0 0 0 0.5px ${ACCENT}`,
                        width: paused ? "100%" : undefined,
                        animation: paused ? "none" : `heroProgress ${AUTO_SCROLL_MS}ms linear forwards`,
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
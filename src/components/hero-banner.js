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
    desktop: "/banners/slide2.jpeg",
    mobile: "/banners/mob1.jpeg",
    alt: "gurudev project view 1",
  },
  {
    desktop: "/banners/d12.jpeg",
    mobile: "/banners/M12.jpeg",
    alt: "Radiance project view 2",
  },
  {
    desktop: "/banners/upd3.jpeg",
    mobile: "/banners/M2.jpeg",
    alt: "Radiance project view 3",
  },
];

const AUTO_SCROLL_MS = 5000;
const SWIPE_THRESHOLD = 50;
const ACCENT = "#0F3A6B";

/* Shared look for both arrow buttons: frosted glass, always readable on any photo */
const ARROW_BASE =
  "group absolute top-1/2 z-30 -translate-y-1/2 flex items-center justify-center rounded-full " +
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

  /* Auto-scroll: a fresh timer is set every time `active` changes (or pause
     toggles), so every slide gets its own full AUTO_SCROLL_MS window. */
  useEffect(() => {
    if (paused || SLIDES.length < 2) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % SLIDES.length);
    }, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [paused]);

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

  const handlePrev = () => {
    prev();
    setPaused(true);
    setTimeout(() => setPaused(false), AUTO_SCROLL_MS);
  };
  const handleNext = () => {
    next();
    setPaused(true);
    setTimeout(() => setPaused(false), AUTO_SCROLL_MS);
  };
  const handleDot = (i) => {
    goTo(i);
    setPaused(true);
    setTimeout(() => setPaused(false), AUTO_SCROLL_MS);
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
        @media (prefers-reduced-motion: reduce) {
          .hero-progress { animation: none !important; }
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
            <SlideImage slide={s} priority={i === 0} />
          </div>
        );
      })}

      {/* Manual navigation arrows */}
      {SLIDES.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous slide"
            className={`${ARROW_BASE} left-3 sm:left-4 lg:left-6`}
          >
            <ChevronLeft className={`${ARROW_ICON} -translate-x-[1px] group-hover:-translate-x-0.5`} strokeWidth={2.25} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next slide"
            className={`${ARROW_BASE} right-3 sm:right-4 lg:right-6`}
          >
            <ChevronRight className={`${ARROW_ICON} translate-x-[1px] group-hover:translate-x-0.5`} strokeWidth={2.25} />
          </button>
        </>
      )}

      {/* Progress dots */}
      {SLIDES.length > 1 && (
        <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 sm:bottom-7">
          {SLIDES.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.desktop}
                type="button"
                onClick={() => handleDot(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={isActive}
                className="group relative flex h-3 items-center"
              >
                <span
                  className={`block h-1.5 rounded-full backdrop-blur-md transition-all duration-500 ease-out ${
                    isActive
                      ? "w-7 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
                      : "w-1.5 bg-white/45 group-hover:bg-white/75"
                  }`}
                />
                {isActive && !paused && (
                  <span
                    key={active}
                    className="hero-progress absolute inset-y-0 left-0 h-1.5 w-7 origin-left overflow-hidden rounded-full"
                  >
                    <span
                      className="block h-full rounded-full"
                      style={{ background: ACCENT, animation: `heroProgress ${AUTO_SCROLL_MS}ms linear forwards` }}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
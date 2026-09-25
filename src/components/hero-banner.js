"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { getImageProps } from "next/image";

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
    desktop: "/banners/ban1.jpeg",
    mobile: "/banners/mob1.jpeg",
    alt: "gurudev project view 1",
  },
  {
    desktop: "/banners/rr.jpeg",
    mobile: "/banners/mob1.png",
    alt: "gurudev project view 2",
  },

  {
    desktop: "/banners/ban3.jpeg",
    mobile: "/banners/M12.jpeg",
    alt: "gurudev project view 3",
  },
  {
    desktop: "/banners/ban2.jpeg",
    mobile: "/banners/M2.jpeg",
    alt: "gurudev project view 4",
  },
];

const AUTO_SCROLL_MS = 3000;
const SWIPE_THRESHOLD = 50;

function SlideImage({ slide, priority }) {
  const common = {
    alt: slide.alt,
    fill: true,
    sizes: "100vw",
    quality: 85,
    className: "object-cover object-top",
    // Kill any default img border/outline and the inline-element gap
    // that browsers add under images (this is what causes the thin
    // stroke/seam line you were seeing at the bottom edge).
    style: {
      display: "block",
      border: 0,
      outline: "none",
      verticalAlign: "top",
    },
  };

  const {
    props: { srcSet: desktopSet, ...desktopProps },
  } = getImageProps({ ...common, src: slide.desktop, priority });

  const {
    props: { srcSet: mobileSet },
  } = getImageProps({ ...common, src: slide.mobile });

  return (
    <picture style={{ display: "block", border: 0, lineHeight: 0 }}>
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
  const pausedRef = useRef(false);
  const touchStartX = useRef(null);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  /* Keep a ref in sync with `paused` so the interval below can read the
     latest value without needing to be recreated every time it changes. */
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  /* Auto-scroll: single interval for the component's lifetime.
     Pausing just skips a tick instead of resetting the countdown,
     so the cadence stays a true 5s once resumed. */
  useEffect(() => {
    if (SLIDES.length < 2) return;
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setActive((p) => (p + 1) % SLIDES.length);
      }
    }, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, []);

  /* Keyboard arrows (desktop convenience — no visible UI) */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  /* Swipe support for touch screens — no longer toggles `paused`,
     so a tap or vertical scroll gesture doesn't reset the auto-scroll timer. */
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (dx > SWIPE_THRESHOLD) prev();
      else if (dx < -SWIPE_THRESHOLD) next();
    }
    touchStartX.current = null;
  };

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Project banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ border: 0, outline: "none", boxShadow: "none" }}
      className={
        "relative isolate w-full overflow-hidden bg-[#0B0B0C] " +
        /* Height scales per breakpoint; max-h keeps it sane on ultra-wide / 4K */
        "h-[100vh] min-h-[460px] max-h-[900px] " +
        "sm:h-[78svh] sm:min-h-[520px] " +
        "md:h-[90vh] md:min-h-[560px] md:max-h-[1000px] " +
        "lg:h-[100svh] lg:min-h-[620px] lg:max-h-[1100px] " +
        "2xl:max-h-[1300px]"
      }
    >
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
            style={{
              // Overlap by 1px on every edge to swallow the subpixel
              // rounding seam that shows as a thin line at the bottom
              // of the banner during rendering/crossfade.
              top: -1,
              left: -1,
              right: -1,
              bottom: -1,
            }}
            className={`absolute transition-opacity duration-[900ms] ease-in-out motion-reduce:transition-none ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <SlideImage slide={s} priority={i === 0} />
          </div>
        );
      })}
    </section>
  );
}
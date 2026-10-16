"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

const SLIDES = [
   {
    desktop: "/banners/main-banner.webp",
    mobile: "/banners/1.webp",
    alt: "Project amenities banner",
  },
  {
    desktop: "/banners/privana.webp",
    mobile: "/banners/2.webp",
    alt: "Privana project banner",
  },
  {
    desktop: "/banners/gurudev.webp",
    mobile: "/banners/3.webp",
    alt: "Gurudev project banner",
  },
 
];

/* Set these to the REAL pixel size of your image files.
   Desktop images (768px and up) and mobile images (below 768px). */
const DESKTOP_SIZE = { width: 1920, height: 900 };
const MOBILE_SIZE = { width: 800, height: 1000 };

const AUTO_SCROLL_MS = 3000;
const SWIPE_THRESHOLD = 50;

function SlideImage({ slide, priority }) {
  return (
    <>
      <Image
        src={slide.desktop}
        alt={slide.alt}
        width={DESKTOP_SIZE.width}
        height={DESKTOP_SIZE.height}
        sizes="100vw"
        quality={85}
        priority={priority}
        className="hidden h-auto w-full md:block"
      />
      <Image
        src={slide.mobile}
        alt={slide.alt}
        width={MOBILE_SIZE.width}
        height={MOBILE_SIZE.height}
        sizes="100vw"
        quality={85}
        priority={priority}
        className="block h-auto w-full md:hidden"
      />
    </>
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

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (SLIDES.length < 2) return;
    const id = setInterval(() => {
      if (!pausedRef.current) next();
    }, AUTO_SCROLL_MS);
    return () => clearInterval(id);
  }, [next]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

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
      className="hero-banner relative isolate grid w-full overflow-hidden"
    >
      {SLIDES.map((s, i) => {
        const isActive = i === active;
        return (
          <div
            key={s.desktop}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${SLIDES.length}`}
            aria-hidden={!isActive}
            className={`col-start-1 row-start-1 transition-opacity duration-[900ms] ease-in-out motion-reduce:transition-none ${
              isActive ? "z-10 opacity-100" : "pointer-events-none z-0 opacity-0"
            }`}
          >
            <SlideImage slide={s} priority={i === 0} />
          </div>
        );
      })}
    </section>
  );
}
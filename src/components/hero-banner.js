"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { src: "/banners/hero1.jpeg", alt: "Radiance project view 1" },
  { src: "/banners/hero2.jpeg", alt: "Radiance project view 2" },
  { src: "/banners/hero3.jpeg", alt: "Radiance project view 3" },
];

const AUTO_SCROLL_MS = 10000;
const GOLD = "#8A6B2E";

export default function HeroBanner() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const root = useRef(null);
  const imageRefs = useRef([]);
  const timerRef = useRef(null);
  const zoomTweenRef = useRef(null);

  const goTo = useCallback((index) => {
    setActive((index + SLIDES.length) % SLIDES.length);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % SLIDES.length);
    setProgressKey((k) => k + 1);
  }, []);

  const prev = useCallback(() => {
    setActive((p) => (p - 1 + SLIDES.length) % SLIDES.length);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (!root.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isVisible || SLIDES.length < 2) return;
    timerRef.current = setTimeout(next, AUTO_SCROLL_MS);
    return () => clearTimeout(timerRef.current);
  }, [active, isPaused, isVisible, next]);

  useEffect(() => {
    const tween = zoomTweenRef.current;
    if (!tween) return;
    if (isVisible) tween.resume();
    else tween.pause();
  }, [isVisible]);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      const activeImg = imageRefs.current[active];

      if (activeImg) {
        tl.fromTo(
          activeImg,
          { scale: 1.12, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.4, ease: "power3.out" },
          0
        );
      }

      const q = gsap.utils.selector(root);
      const eyebrowText = q(".hb-eyebrow-text");
      const eyebrowLine = q(".hb-eyebrow-line");
      const words = q(".hb-word");
      const subline = q(".hb-subline");
      const cta = q(".hb-cta");

      if (eyebrowText.length)
        tl.fromTo(
          eyebrowText,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, clearProps: "all" },
          0.15
        );

      if (eyebrowLine.length)
        tl.fromTo(
          eyebrowLine,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left center", duration: 0.7, ease: "power2.out", clearProps: "transform" },
          0.3
        );

      if (words.length)
        tl.fromTo(
          words,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.07, clearProps: "all" },
          0.35
        );

      if (subline.length)
        tl.fromTo(
          subline,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", clearProps: "all" },
          0.85
        );

      if (cta.length)
        tl.fromTo(
          cta,
          { y: 24, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", clearProps: "all" },
          1.1
        );

      if (activeImg) {
        zoomTweenRef.current = gsap.to(activeImg, {
          scale: 1.05,
          duration: 12,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1.4,
          paused: !isVisible,
        });
      }
    }, root);

    return () => {
      zoomTweenRef.current = null;
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <section
      ref={root}
      className="relative isolate h-[100svh] min-h-[480px] w-full overflow-hidden bg-[#1a1a1a] sm:min-h-[560px] md:h-[90svh] lg:h-[100svh]"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1100ms] ease-in-out ${
            i === active ? "z-10 opacity-100" : "z-0 opacity-0"
          }`}
        >
          <div
            ref={(el) => (imageRefs.current[i] = el)}
            className="relative h-full w-full will-change-transform"
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              sizes="100vw"
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              quality={85}
              className="object-cover object-[68%_center] sm:object-center"
            />
          </div>
        </div>
      ))}

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/45 via-black/10 to-transparent sm:hidden" />

      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="group absolute left-2.5 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 p-2 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:left-4 sm:p-3 md:left-6 md:p-3.5"
      >
        <ChevronLeft className="h-4 w-4 text-white transition-transform group-hover:-translate-x-0.5 sm:h-5 sm:w-5" />
      </button>
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="group absolute right-2.5 top-1/2 z-30 -translate-y-1/2 rounded-full border border-white/25 bg-white/10 p-2 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white sm:right-4 sm:p-3 md:right-6 md:p-3.5"
      >
        <ChevronRight className="h-4 w-4 text-white transition-transform group-hover:translate-x-0.5 sm:h-5 sm:w-5" />
      </button>

      <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2.5 sm:bottom-8 sm:gap-3">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active}
            className="relative h-1.5 overflow-hidden rounded-full bg-white/30 transition-all duration-300"
            style={{ width: i === active ? "36px" : "14px" }}
          >
            {i === active && (
              <span
                key={progressKey}
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  backgroundColor: GOLD,
                  width: "0%",
                  animation: `hb-progress ${AUTO_SCROLL_MS}ms linear forwards`,
                  animationPlayState: isPaused || !isVisible ? "paused" : "running",
                }}
              />
            )}
          </button>
        ))}
      </div>

      <style jsx global>{`
        @keyframes hb-progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        @media (min-width: 640px) {
          .hb-dot-active {
            width: 44px !important;
          }
        }
      `}</style>
    </section>
  );
}
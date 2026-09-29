"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const BG_IMAGE = "/mission1.png";
const MODEL_IMAGE = "/lineart.png";

const CREAM = "#FBF8F2";
const WHATSAPP_GREEN = "#25D366";
const WHATSAPP_GREEN_DARK = "#128C7E";

// WhatsApp number to redirect to after a successful enquiry submission
const WHATSAPP_NUMBER = "919381055555";

/* ------------------------------------------------------------------ */
/*  WHATSAPP HELPERS                                                   */
/* ------------------------------------------------------------------ */
function buildWhatsAppUrl({ message }) {
  const text = message || "Hi PKR Estates, I'd like to know more about your projects.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* Text is split into words only so GSAP can animate them. */
const HEADLINE_WORDS = ["Crafting", "Your", "Perfect", "Space"];
const SUB_COPY =
  "Thoughtfully designed residences where comfort meets style your new chapter begins here.";
const SUB_WORDS = SUB_COPY.split(" ");

/* ------------------------------------------------------------------ */
/*  ICONS                                                               */
/* ------------------------------------------------------------------ */
function WhatsAppIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 32 32" fill="none">
      <path
        d="M16 4C9.4 4 4 9.4 4 16c0 2.2.6 4.3 1.7 6.1L4 28l6.1-1.6A11.9 11.9 0 0 0 16 28c6.6 0 12-5.4 12-12S22.6 4 16 4Z"
        fill={WHATSAPP_GREEN}
      />
      <path
        d="M11.9 10.6c.3-.6.6-.6.9-.6h.7c.2 0 .5 0 .7.6.3.6 1 2.2 1.1 2.4.1.2.2.4 0 .6-.1.3-.2.4-.4.6l-.5.6c-.2.2-.3.4-.1.7.2.3 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.3.2.5.1.7-.1l.7-.8c.2-.3.5-.2.8-.1l2.1 1c.3.1.5.2.6.3.1.2.1 1-.3 1.9-.4.9-2 1.8-2.8 1.9-.7.1-1.6.2-5-1.2-4.2-1.7-6.8-6-7-6.3-.2-.3-1.6-2.2-1.6-4.1 0-2 1-2.9 1.4-3.3Z"
        fill="#fff"
      />
    </svg>
  );
}

/* A small hand-cursor cue that "taps" the button on a loop, echoing the
   animated pointer GIF used on similar chat-widget buttons. */
function TapHandIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M9.5 12.2V5.8a1.3 1.3 0 1 1 2.6 0v5.1M12.1 10.9V4.6a1.3 1.3 0 1 1 2.6 0v6.3M14.7 11.2V6.3a1.3 1.3 0 1 1 2.6 0v7.4M9.5 12V9.7a1.3 1.3 0 1 0-2.6 0v6.1c0 3.3 2.2 6 5.9 6 3.4 0 5.9-2.3 5.9-5.9v-3.6a1.3 1.3 0 1 0-2.6 0"
        stroke="#1E1E1E"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="#FDD9B5"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO BANNER                                                        */
/* ------------------------------------------------------------------ */
export default function PromiseHeroBanner() {
  const sectionRef = useRef(null);
  const buttonRef = useRef(null);

  /* Entrance animation.
     This banner sits near the bottom of the page, so it must NOT play on page
     load (the user would never see it). We build the timeline paused, then play
     it the moment the section actually scrolls into view. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let observer;

    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Reduced motion: show everything immediately, no movement
      if (reduced) {
        gsap.set(".hero-model", { opacity: 0.9 });
        gsap.set(".hero-word, .hero-sub-word", { autoAlpha: 1 });
        gsap.set(".hero-cta", { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } });

      // Model cutout glides in from the right
      tl.fromTo(
        ".hero-model",
        { x: 50, opacity: 0 },
        { x: 0, opacity: 0.9, duration: 1.4 },
        0.1
      );

      // Headline: each word rises out of its own mask with a slight tilt
      tl.fromTo(
        ".hero-word",
        { yPercent: 115, rotate: 5, autoAlpha: 0, transformOrigin: "left bottom" },
        { yPercent: 0, rotate: 0, autoAlpha: 1, duration: 1.3, stagger: 0.11 },
        0.2
      );

      // Sub copy: words settle in one after another
      tl.fromTo(
        ".hero-sub-word",
        { y: 14, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.03, ease: "power3.out" },
        "-=0.85"
      );

      // Button wrapper
      tl.fromTo(
        ".hero-cta",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
        "-=0.7"
      );

      // Play once, when the banner is really on screen.
      // IntersectionObserver checks the live position, so it stays correct even if
      // images or videos above the banner load late and push the page down.
      if (typeof IntersectionObserver === "undefined") {
        tl.play();
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            tl.play();
            observer.disconnect();
          }
        },
        { threshold: 0.25 }
      );
      observer.observe(section);
    }, sectionRef);

    return () => {
      if (observer) observer.disconnect();
      ctx.revert();
    };
  }, []);

  /* Button hover / tap interactions */
  const handleEnter = () =>
    gsap.to(buttonRef.current, { y: -2, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  const handleLeave = () =>
    gsap.to(buttonRef.current, { y: 0, scale: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  const handleDown = () =>
    gsap.to(buttonRef.current, { scale: 0.98, duration: 0.15, ease: "power2.out", overwrite: "auto" });
  const handleUp = () =>
    gsap.to(buttonRef.current, { scale: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });

  const handleGetInTouch = () => {
    const url = buildWhatsAppUrl({
      message: "Hi PKR Estates, I'd like to know more about your projects.",
    });
    // Open WhatsApp in a new tab on desktop, same tab on mobile is also fine
    window.location.href = url;
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full overflow-hidden bg-[#F4F2ED] font-sans"
      style={{
        height: "50vh",
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 z-0">
        <Image src={BG_IMAGE} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* Legibility overlay — strongest behind the left copy, fading toward the illustration */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#081B36]/60 via-[#081B36]/20 to-transparent" />

      {/* Model cutout */}
      <div
        className="hero-model pointer-events-none absolute bottom-0 right-[2%] z-20 hidden sm:right-[4%] sm:block md:right-[6%]"
        style={{ height: "100%", width: "42%", maxWidth: "420px", opacity: 0 }}
      >
        <Image
          src={MODEL_IMAGE}
          alt="Happy resident"
          fill
          priority
          sizes="(max-width: 768px) 42vw, 34vw"
          className="object-contain object-bottom"
        />
      </div>

      {/* Copy block — left aligned */}
      <div className="absolute inset-0 z-30 flex items-center">
        <div className="w-full px-5 sm:px-10 lg:px-16">
          <div className="max-w-[640px] text-left">
            <h1
              className="leading-[1.12] tracking-[-0.015em]"
              style={{
                fontSize: "clamp(1.7rem, 4.6vw, 3.6rem)",
                color: CREAM,
                fontWeight: 300,
              }}
            >
              {HEADLINE_WORDS.map((word, i) => (
                /* Mask wrapper: clips the word while it rises. Padding/negative
                   margin keep descenders (g, p) visible and the layout unchanged. */
                <span
                  key={word}
                  className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top"
                  style={{ marginRight: i === HEADLINE_WORDS.length - 1 ? 0 : "0.22em" }}
                >
                  <span className="hero-word block" style={{ opacity: 0, visibility: "hidden" }}>
                    {word}
                  </span>
                </span>
              ))}
            </h1>

            <p
              className="hero-sub mt-3.5 max-w-[420px] text-[12.5px] leading-relaxed sm:mt-5 sm:text-base"
              style={{ color: CREAM, opacity: 0.85 }}
            >
              {SUB_WORDS.map((word, i) => (
                <span key={`${word}-${i}`}>
                  <span className="hero-sub-word inline-block" style={{ opacity: 0, visibility: "hidden" }}>
                    {word}
                  </span>
                  {i < SUB_WORDS.length - 1 ? " " : ""}
                </span>
              ))}
            </p>

            <div className="hero-cta mt-6 flex justify-start sm:mt-8" style={{ opacity: 0 }}>
              {/* Wrapper is relative so the tapping-hand cue can sit on top of
                  the button's corner without affecting its layout/size. */}
              <div className="relative inline-flex">
                <button
                  ref={buttonRef}
                  type="button"
                  onClick={handleGetInTouch}
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                  onMouseDown={handleDown}
                  onMouseUp={handleUp}
                  onTouchStart={handleDown}
                  onTouchEnd={handleUp}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-[10px] font-bold tracking-wide text-white shadow-lg sm:py-2 sm:pl-2 sm:pr-5 sm:text-[11.5px]"
                  style={{ background: `linear-gradient(135deg, ${WHATSAPP_GREEN}, ${WHATSAPP_GREEN_DARK})` }}
                >
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white sm:h-6 sm:w-6">
                    <WhatsAppIcon />
                  </span>
                  Chat With Us
                </button>

                {/* Animated hand — if you re-enable this, add className="tap-hand"
                    and animate it in the useEffect with:
                    gsap.to(".tap-hand", { y: 6, rotate: -6, duration: 0.55,
                      repeat: -1, yoyo: true, ease: "sine.inOut" }) */}
                {/* <span
                  className="tap-hand pointer-events-none absolute -bottom-3 right-2 origin-bottom sm:-bottom-4 sm:right-3"
                >
                  <TapHandIcon />
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
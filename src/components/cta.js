"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BG_IMAGE = "/cta.png";
const MODEL_IMAGE = "/lineart.png";

const CREAM = "#FBF8F2";
const WHATSAPP_GREEN = "#25D366";
const WHATSAPP_GREEN_DARK = "#128C7E";

// WhatsApp number to redirect to after a successful enquiry submission
const WHATSAPP_NUMBER = "919381055555";

const EASE = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/*  WHATSAPP HELPERS                                                   */
/* ------------------------------------------------------------------ */
function buildWhatsAppUrl({ message }) {
  const text = message || "Hi PKR Estates, I'd like to know more about your projects.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* Headline is split into words only so they can stagger in on load. */
const HEADLINE_WORDS = ["Crafting", "Your", "Perfect", "Space"];

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
  const handleGetInTouch = () => {
    const url = buildWhatsAppUrl({
      message: "Hi PKR Estates, I'd like to know more about your projects.",
    });
    // Open WhatsApp in a new tab on desktop, same tab on mobile is also fine
    window.location.href = url;
  };

  return (
    <section
      id="contact"
      className="relative w-full overflow-hidden bg-[#F4F2ED] font-sans"
      style={{
        height: "40vh",
      }}
    >
      {/* Background texture */}
      <div className="absolute inset-0 z-0">
        <Image src={BG_IMAGE} alt="" fill priority sizes="100vw" className="object-cover" />
      </div>

      {/* Legibility overlay — strongest behind the left copy, fading toward the illustration */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#081B36]/60 via-[#081B36]/20 to-transparent" />

      {/* Model cutout */}
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 0.9 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        className="pointer-events-none absolute bottom-0 right-[2%] z-20 hidden sm:right-[4%] sm:block md:right-[6%]"
        style={{ height: "100%", width: "42%", maxWidth: "420px" }}
      >
        <Image
          src={MODEL_IMAGE}
          alt="Happy resident"
          fill
          priority
          sizes="(max-width: 768px) 42vw, 34vw"
          className="object-contain object-bottom"
        />
      </motion.div>

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
                <motion.span
                  key={word}
                  className="inline-block"
                  style={{ marginRight: i === HEADLINE_WORDS.length - 1 ? 0 : "0.22em" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.9,
                    ease: EASE,
                    delay: 0.2 + i * 0.09,
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-3.5 max-w-[420px] text-[12.5px] leading-relaxed sm:mt-5 sm:text-base"
              style={{ color: CREAM, opacity: 0.85 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
            >
              Thoughtfully designed residences where comfort meets style your new chapter begins here.
            </motion.p>

            <motion.div
              className="mt-6 flex justify-start sm:mt-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
            >
              {/* Wrapper is relative so the tapping-hand cue can sit on top of
                  the button's corner without affecting its layout/size. */}
              <div className="relative inline-flex">
                <motion.button
                  type="button"
                  onClick={handleGetInTouch}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full py-1.5 pl-1.5 pr-4 text-[10px] font-bold tracking-wide text-white shadow-lg sm:py-2 sm:pl-2 sm:pr-5 sm:text-[11.5px]"
                  style={{ background: `linear-gradient(135deg, ${WHATSAPP_GREEN}, ${WHATSAPP_GREEN_DARK})` }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white sm:h-6 sm:w-6">
                    <WhatsAppIcon />
                  </span>
                  Chat With Us
                </motion.button>

                {/* Animated hand — loops a little tap/press motion, like the
                    reference GIF, without needing an external image file. */}
                {/* <motion.span
                  className="pointer-events-none absolute -bottom-3 right-2 origin-bottom sm:-bottom-4 sm:right-3"
                  animate={{ y: [0, 6, 0], rotate: [0, -6, 0] }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                >
                  <TapHandIcon />
                </motion.span> */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
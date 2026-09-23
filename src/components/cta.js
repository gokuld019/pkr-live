"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const BG_IMAGE = "/ctaaa.jpeg";
const MODEL_IMAGE = "/lineart.png";

const CREAM = "#FBF8F2";

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

/* Headline stays on ONE line. It's split into words only so they can
   stagger in — the row is `whitespace-nowrap`, so it never breaks.
   Font size is driven by vw (not the container), and the text is about
   13em wide, so ~5.9vw keeps it inside the viewport at every width
   while still capping at 4rem on large screens. */
const HEADLINE_WORDS = ["Crafting", "Your", "Perfect", "Space"];

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

      {/* Copy block — centered */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div className="w-full px-4 text-center sm:px-8">
          <div className="mx-auto max-w-[1200px]">
            <h1
              className="whitespace-nowrap leading-[1.15] tracking-[-0.01em]"
              style={{
                fontSize: "clamp(1.15rem, 5.4vw, 4rem)",
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
              className="mx-auto mt-3.5 max-w-[420px] text-[12.5px] leading-relaxed sm:mt-6 sm:text-base"
              style={{ color: CREAM }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
            >
              Thoughtfully designed residences where comfort meets style your new chapter begins here.
            </motion.p>

            <motion.div
              className="mt-5 flex justify-center sm:mt-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
            >
              <motion.button
                type="button"
                onClick={handleGetInTouch}
                className="inline-flex cursor-pointer items-center rounded-md bg-white px-6 py-2.5 text-[10.5px] font-bold tracking-[0.12em] shadow-md sm:px-9 sm:py-3.5 sm:text-xs sm:tracking-[0.15em]"
                style={{ color: "#0F3A6B" }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                GET IN TOUCH
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
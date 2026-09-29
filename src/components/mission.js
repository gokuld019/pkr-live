"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Geist } from "next/font/google";
import {
  useReveal,
  SplitReveal,
  WordReveal,
  FadeUp,
  EASE,
} from "@/components/motion/reveal";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const DEEP_NAVY = "#0F3A6B";
const TEXT_CHARCOAL = "#2D3A46";
const GOLD = "#B08D3F";

const DESKTOP_IMAGE = "/upm.jpeg";
const MOBILE_IMAGE = "/mismob.jpeg";

const DESCRIPTION =
  "We create thoughtfully planned homes that make ownership more accessible for families. From apartments and villas to plots, PKR Estates builds practical spaces for everyday living. Our housing apartment in Chennai solutions bring comfort, value and purposeful planning together.";

// ===== Small top section data (real-estate trust signals) =====
const STATS = [
  { value: "12+", label: "Years of Trust" },
  { value: "2,500+", label: "Happy Families" },
  { value: "18", label: "Projects Delivered" },
  { value: "100%", label: "RERA Approved" },
];

/* ------------------------------------------------------------------ */
/*  MASKED WORD RISE — each word rises out of a mask while un-blurring  */
/*  (same animation as the hero headline, triggered on scroll into view) */
/* ------------------------------------------------------------------ */
function MaskText({ text, delay = 0, step = 0.1, className = "" }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          style={{
            marginRight: i === words.length - 1 ? 0 : "0.25em",
            paddingBottom: "0.14em",
            marginBottom: "-0.14em",
          }}
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={reduce ? false : { y: "110%", opacity: 0, filter: "blur(8px)" }}
            whileInView={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1, ease: EASE, delay: delay + i * step }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function VisionMission() {
  const root = useRef(null);
  const lineRef = useRef(null);
  const lineShow = useReveal(lineRef, { amount: "some" });
  const reduce = useReducedMotion();

  return (
    <>
      {/* ============================================================= */}
      {/* ==========  SMALL TOP SECTION (Trust / Stats Bar)  ========== */}
      {/* ============================================================= */}
      
      <section
        className={`${geist.className} relative w-full bg-[#0F3A6B] text-white overflow-hidden`}
      >
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#B08D3F] to-transparent" />
        <div className="mx-auto max-w-[1700px] px-6 py-5 sm:px-10 sm:py-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#B08D3F]/40 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B08D3F]" />
            </span>
            <MaskText
              text="Trusted Real Estate Partner"
              delay={0.1}
              className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E9C97A]"
            />
            <motion.span
              className="h-px flex-1 origin-left bg-gradient-to-r from-[#B08D3F]/60 to-transparent"
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.5 }}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-y-5 sm:mt-5 sm:grid-cols-4 sm:gap-4 sm:divide-x sm:divide-white/15">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center text-center sm:px-4">
                <MaskText
                  text={s.value}
                  delay={0.3 + i * 0.12}
                  className="text-[20px] sm:text-[26px] font-bold tracking-tight text-[#E9C97A]"
                />
                <MaskText
                  text={s.label}
                  delay={0.45 + i * 0.12}
                  step={0.06}
                  className="mt-1 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.14em] text-white/75"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="h-px w-full bg-white/10" />
      </section>

      {/* ============================================================= */}
      {/* ==========  MAIN VisionMission SECTION (unchanged)  ========= */}
      {/* ============================================================= */}



      {/* <section
        ref={root}
        className="relative w-full overflow-hidden font-sans bg-white">
        <div className="flex flex-col lg:hidden">
          <div className="relative mx-auto h-[200px] w-full sm:h-[360px]">
            <Image
              src={MOBILE_IMAGE}
              alt="Happy homeowners"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 0px"
              className="object-cover object-center"
              style={{ objectPosition: "center center" }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/80 to-transparent sm:h-16" />
          </div>
          <div className="relative z-20 -mt-3 rounded-t-[22px] bg-white px-5 pb-8 pt-5 sm:-mt-6 sm:rounded-t-[24px] sm:px-8 sm:pb-16 sm:pt-10">
            <SplitReveal
              text="More Than a Home, A New Beginning"
              className="text-[19px] font-bold uppercase leading-[1.2] tracking-tight sm:text-3xl !text-[#0F3A6B]"
            />

            <WordReveal
              text={DESCRIPTION}
              delay={0.1}
              className="mt-3 max-w-full text-[12.5px] leading-[1.6] sm:mt-6 sm:text-base sm:leading-[1.85] !text-[#2D3A46]"
            />

            <FadeUp delay={0.2} amount={0.8} className="mt-4 sm:mt-10">
              <Link
                href="/aboutus"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-md bg-[#0F3A6B] px-6 py-2.5 text-[12.5px] font-semibold tracking-wide text-white shadow-md transition-all duration-300 hover:bg-[#0A2B50] hover:shadow-lg sm:w-auto sm:justify-start sm:gap-4 sm:px-8 sm:py-3.5 sm:text-sm"
              >
                Know More
                <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </FadeUp>
          </div>
        </div>

        <div className="relative hidden lg:block">
          
          <div className="absolute inset-0 z-0">
            <Image
              src={DESKTOP_IMAGE}
              alt="Happy homeowners"
              fill
              priority
              sizes="(min-width: 1024px) 100vw, 0px"
              className="object-cover object-center"
            />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[700px] max-w-[1700px] grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,0.5fr)] px-10 py-0">
            <div className="relative z-20 flex flex-col justify-center py-24">
              <SplitReveal
                text="Driven by Purpose, Built on Promise"
                className="text-4xl font-bold uppercase leading-[1.2] tracking-tight xl:text-[2.75rem] !text-[#0F3A6B]"
              />

              <WordReveal
                text={DESCRIPTION}
                delay={0.1}
                className="mt-6 max-w-md text-base leading-[1.85] !text-[#2D3A46]"
              />

              <FadeUp delay={0.2} amount={0.8} className="mt-10">
                <Link
                  href="/aboutus"
                  className="group inline-flex items-center justify-start gap-4 rounded-md bg-[#0F3A6B] px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-md transition-all duration-300 hover:bg-[#0A2B50] hover:shadow-lg"
                >
                  Know More
                  <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </FadeUp>
            </div>
            <div />
          </div>
        </div>
      </section> */}




    </>
  );
}
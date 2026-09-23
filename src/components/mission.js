"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useReveal, SplitReveal, WordReveal, FadeUp, EASE } from "@/components/motion/reveal";
import { motion } from "framer-motion";
import Link from 'next/link'

const DEEP_NAVY = "#0F3A6B";
const TEXT_CHARCOAL = "#2D3A46";
const GOLD = "#B08D3F";

// Separate images for desktop and mobile
const DESKTOP_IMAGE = "/upm.jpeg";
const MOBILE_IMAGE = "/mismob.jpeg"; // add this file to /public

const DESCRIPTION =
  "We create thoughtfully planned homes that make ownership more accessible for families. From apartments and villas to plots, PKR Estates builds practical spaces for everyday living. Our housing apartment in Chennai solutions bring comfort, value and purposeful planning together.";

export default function VisionMission() {
  const root = useRef(null);
  const lineRef = useRef(null);
  const lineShow = useReveal(lineRef, { amount: "some" });

  return (
    <section ref={root} className="relative w-full overflow-hidden font-sans bg-white">

      {/* ========== MOBILE LAYOUT: image above, text below ========== */}
      <div className="flex flex-col lg:hidden">
        {/* Image block — dedicated mobile image */}
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
          {/* subtle gradient bottom for blending */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white/80 to-transparent sm:h-16" />
        </div>

        {/* Text block — pulled up to reduce gap */}
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

      {/* ========== DESKTOP LAYOUT: original full-bleed background ========== */}
      <div className="relative hidden lg:block">
        {/* Full-bleed background image */}
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
          {/* Left copy */}
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

          {/* Center spacer */}
          <div />
        </div>
      </div>
    </section>
  );
}
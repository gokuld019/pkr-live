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

const DESCRIPTION =
  "Empowering dreams through customer-centric design and quality craftsmanship, we create more than homes — we build lasting value for families and communities. Every project reflects our vision for a better and enduring living experience for all.";

export default function VisionMission() {
  const root = useRef(null);
  const lineRef = useRef(null);
  const lineShow = useReveal(lineRef, { amount: "some" });

  return (
    <section ref={root} className="relative w-full overflow-hidden font-sans">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/upm.jpeg"
          alt="Happy homeowners"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[480px] max-w-[1700px] grid-cols-1 px-5 py-12 sm:min-h-[560px] sm:px-8 sm:py-16 md:px-10 md:py-20 lg:min-h-[700px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_minmax(0,0.5fr)] lg:py-0">
        {/* Left copy */}
        <div className="relative z-20 flex flex-col justify-center py-4 sm:py-6 lg:py-24">

          {/* Heading — Deep Navy */}
          <SplitReveal
            text="Driven by Purpose, Built on Promise"
            className="text-2xl font-bold uppercase leading-[1.2] tracking-tight sm:text-3xl md:text-4xl xl:text-[2.75rem] !text-[#0F3A6B]"
          />

          {/* Divider line */}
          {/* <motion.div
            ref={lineRef}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: lineShow ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
            className="mt-5 h-px w-16 origin-left bg-black/30 sm:mt-6 sm:w-20"
          /> */}

          {/* Description — Text Charcoal */}
          <WordReveal
            text={DESCRIPTION}
            delay={0.1}
            className="mt-5 max-w-full text-sm leading-[1.75] sm:mt-6 sm:max-w-md sm:text-base sm:leading-[1.85] !text-[#2D3A46]"
          />

          {/* CTA Button — Deep Navy, white text, subtle rounded corners */}
          <FadeUp delay={0.2} amount={0.8} className="mt-7 sm:mt-10">
            <Link
              href="/aboutus"
              className="group inline-flex w-full items-center justify-center gap-3 rounded-md bg-[#0F3A6B] px-6 py-3 text-sm font-semibold tracking-wide text-white shadow-md transition-all duration-300 hover:bg-[#0A2B50] hover:shadow-lg sm:w-auto sm:justify-start sm:gap-4 sm:px-8 sm:py-3.5"
            >
              Know More
              <ArrowRight className="h-4 w-4 shrink-0 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>

        {/* Center column — empty spacer */}
        <div className="hidden lg:block" />
      </div>
    </section>
  );
}
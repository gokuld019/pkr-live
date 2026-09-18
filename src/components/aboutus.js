"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { EASE, useReveal, SplitReveal, WordReveal, FadeUp, CountUp } from "@/components/motion/reveal";

const DEEP_NAVY = "#0F3A6B";
const TEXT_CHARCOAL = "#2D3A46";

const STATS = [
  { value: "8+", label: ["YEARS OF", "EXCELLENCE"] },
  { value: "7M+", label: ["SQ.FT. SPACE", "DELIVERED"] },
  { value: "44+", label: ["LANDMARK", "PROJECTS"] },
];

const DESCRIPTION =
  "PKR Estates is a trusted name in South India's real estate sector, committed to creating thoughtfully designed residential developments that combine contemporary living, quality construction, and lasting value. With a strong focus on sustainable practices, innovative design, and customer-centric development, we build homes that meet modern aspirations while contributing to vibrant and responsible communities.";

export default function AboutStats() {
  const statsRef = useRef(null);
  const statsShow = useReveal(statsRef, { amount: 0.4 });

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat py-14 sm:py-20 md:py-24 lg:py-30 font-sans"
      style={{ backgroundImage: "url('/hi.jpeg')" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-8 lg:px-12">

        {/* HEADING — deep navy */}
        <SplitReveal
          text="A Legacy Built on Promise"
          className="mx-auto max-w-5xl text-center text-[26px] font-bold uppercase leading-[1.2] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl text-[#0F3A6B]"
        />

        <div
          ref={statsRef}
          className="mt-10 grid grid-cols-2 gap-y-8 gap-x-4 sm:mt-14 sm:grid-cols-3 sm:gap-4 sm:divide-x sm:divide-black/20 md:gap-0"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.value}
              className={`flex flex-col items-center px-2 text-center sm:px-4 lg:px-10 ${
                i === 2 ? "col-span-2 sm:col-span-1" : ""
              }`}
            >
              {/* NUMBERS — deep navy, reduced weight */}
              <CountUp
                value={stat.value}
                delay={0.15 * i}
                className="text-4xl font-semibold leading-none tabular-nums sm:text-5xl lg:text-6xl text-[#0F3A6B]"
              />

              {/* LABELS — text charcoal */}
              <div className="mt-3 flex flex-col items-center gap-1 text-xs font-semibold uppercase leading-snug tracking-wide sm:mt-4 sm:text-sm md:text-base lg:text-lg text-[#2D3A46]">
                {stat.label.map((line, li) => (
                  <span key={line} className="block overflow-hidden">
                    <motion.span
                      className="block"
                      initial={{ y: "100%", opacity: 0 }}
                      animate={statsShow ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                      transition={{ duration: 0.7, delay: 0.35 + 0.15 * i + 0.08 * li, ease: EASE }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* DESCRIPTION — text charcoal */}
        <WordReveal
          text={DESCRIPTION}
          delay={0.1}
          className="mx-auto mt-10 max-w-4xl text-center text-sm leading-relaxed sm:mt-14 sm:text-lg lg:text-xl text-[#2D3A46]"
        />

        <FadeUp delay={0.2} amount={0.8} className="mt-8 flex justify-center sm:mt-10">
          <button
            type="button"
            className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wide sm:text-base text-[#2D3A46]"
          >
            {/* ... */}
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
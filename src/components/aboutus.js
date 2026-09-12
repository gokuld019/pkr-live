"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { EASE, useReveal, SplitReveal, WordReveal, FadeUp, CountUp } from "@/components/motion/reveal";

const STATS = [
  { value: "77+", label: ["YEARS OF", "EXCELLENCE"], color: "#1A1A1A" },
  { value: "7M+", label: ["SQ.FT. SPACE", "DELIVERED"], color: "#1A1A1A" },
  { value: "44+", label: ["LANDMARK", "PROJECTS"], color: "#1A1A1A" },
];

const DESCRIPTION =
  "PKR Estates is a trusted name in South India's real estate sector, committed to creating thoughtfully designed residential developments that combine contemporary living, quality construction, and lasting value. With a strong focus on sustainable practices, innovative design, and customer-centric development, we build homes that meet modern aspirations while contributing to vibrant and responsible communities.";

export default function AboutStats() {
  const lineRef = useRef(null);
  const lineShow = useReveal(lineRef, { amount: "some" });

  const statsRef = useRef(null);
  const statsShow = useReveal(statsRef, { amount: 0.4 });

  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat py-14 sm:py-20 md:py-24 lg:py-28"
      style={{ backgroundImage: "url('/aboutbg.jpeg')" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-8 lg:px-12">
        <SplitReveal
          text="A Legacy Built on Promise"
          className="mx-auto max-w-5xl text-center text-[26px] font-bold uppercase leading-[1.2] tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl"
        />

        <motion.div
          ref={lineRef}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: lineShow ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="mx-auto mt-6 h-px w-20 origin-center bg-black/30 sm:mt-8 sm:w-24"
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
      <CountUp
        value={stat.value}
        delay={0.15 * i}
        className="text-4xl font-black leading-none tabular-nums text-black sm:text-5xl lg:text-6xl"
      />

      <div className="mt-3 flex flex-col items-center gap-1 text-xs font-semibold uppercase leading-snug tracking-wide sm:mt-4 sm:text-sm md:text-base lg:text-lg">
        {stat.label.map((line, li) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block"
              style={{ color: stat.color }}
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

        <WordReveal
          text={DESCRIPTION}
          delay={0.1}
          className="mx-auto mt-10 max-w-4xl text-center text-sm leading-relaxed text-black/80 sm:mt-14 sm:text-lg lg:text-xl"
        />

        <FadeUp delay={0.2} amount={0.8} className="mt-8 flex justify-center sm:mt-10">
          <button
            type="button"
            className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-black sm:text-base"
          >
            <span className="relative">
              Read More
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1 sm:h-9 sm:w-9">
              <ChevronRight className="h-4 w-4" />
            </span>
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
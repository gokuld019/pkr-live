"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { EASE, useReveal, SplitReveal, WordReveal, FadeUp, CountUp } from "@/components/motion/reveal";

const STATS = [
  { value: "77+", label: ["YEARS OF", "ENGINEERING", "EXCELLENCE"], color: "#1B3B8C" },
  { value: "7M+", label: ["SQ.FT. SPACE", "DELIVERED"], color: "#C1541C" },
  { value: "44+", label: ["LANDMARK", "PROJECTS"], color: "#2E7D32" },
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
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat py-20 sm:py-28"
      style={{ backgroundImage: "url('/aboutbg.jpeg')" }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <SplitReveal
          text="A Legacy Built on Promise"
          className="mx-auto max-w-5xl text-center text-3xl font-bold uppercase leading-[1.15] tracking-tight text-black sm:text-5xl lg:text-6xl"
        />

        <motion.div
          ref={lineRef}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: lineShow ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="mx-auto mt-8 h-px w-24 origin-center bg-black/30"
        />

        <div
          ref={statsRef}
          className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-black/20"
        >
          {STATS.map((stat, i) => (
            <div key={stat.value} className="flex flex-col items-center px-6 text-center lg:px-10">
              <CountUp
                value={stat.value}
                delay={0.15 * i}
                className="text-5xl font-black leading-none tabular-nums text-black lg:text-6xl"
              />

              <div className="mt-4 flex flex-col items-center gap-1 text-sm font-semibold uppercase leading-snug tracking-wide sm:text-base lg:text-lg">
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
          className="mx-auto mt-14 max-w-4xl text-center text-base leading-relaxed text-black/80 sm:text-lg lg:text-xl"
        />

        <FadeUp delay={0.2} amount={0.8} className="mt-10 flex justify-center">
          <button
            type="button"
            className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-black sm:text-base"
          >
            <span className="relative">
              Read More
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 group-hover:scale-x-100" />
            </span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform duration-300 group-hover:translate-x-1">
              <ChevronRight className="h-4 w-4" />
            </span>
          </button>
        </FadeUp>
      </div>
    </section>
  );
}
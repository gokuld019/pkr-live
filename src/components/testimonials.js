"use client";

import { useRef } from "react";
import { Figtree } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const GOLD = "#B08D3F";
const GOLD_DEEP = "#8A6B2E";
const CREAM = "#FBF8F2";
const LINE = "#E8DFCB";

const REVIEWS = [
  {
    id: 1,
    text: "From the first site visit to the final handover, everything was transparent and well-managed. PKR Estates truly cares about their buyers. We're delighted with our new home!",
    name: "Ramesh Kumar",
    project: "PKR Gurudev",
  },
  {
    id: 2,
    text: "Great location, smart layouts and quality construction. PKR Estates delivers exactly what they promise — no surprises. Highly recommended for anyone looking to buy a home.",
    name: "Priya Menon",
    project: "PKR Privana",
  },
  {
    id: 3,
    text: "A builder with a customer-first mindset. From booking to possession, the team guided us at every step. We feel proud to be part of the PKR Estates family.",
    name: "Suresh & Kavitha",
    project: "PKR Gurudev",
  },
];

export default function ClientReviews() {
  const root = useRef(null);

  useGSAP(
    () => {
      // ---- Header ----
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".gs-head", start: "top 85%", once: true },
      });

      tl.fromTo(
        ".gs-eyebrow-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "center",
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          clearProps: "transform",
        }
      )
        .fromTo(
          ".gs-eyebrow",
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, clearProps: "transform,opacity" },
          "-=0.35"
        )
        .fromTo(
          ".gs-title-word",
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.08,
            ease: "power4.out",
            clearProps: "transform,opacity",
          },
          "-=0.3"
        )
        .fromTo(
          ".gs-sub",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", clearProps: "transform,opacity" },
          "-=0.5"
        );

      // ---- Side + corner labels ----
      gsap.fromTo(
        ".gs-side-word",
        { x: -18, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gs-head", start: "top 85%", once: true },
          clearProps: "transform,opacity",
        }
      );

      gsap.fromTo(
        ".gs-cursive",
        { x: 20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gs-head", start: "top 85%", once: true },
          clearProps: "transform,opacity",
        }
      );

      // ---- Google bar ----
      const gtl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".gs-google", start: "top 88%", once: true },
      });

      gtl.fromTo(
        ".gs-google",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity" }
      )
        .fromTo(
          ".gs-google-item",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power2.out", clearProps: "transform,opacity" },
          "-=0.5"
        )
        .fromTo(
          ".gs-star-big",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06, ease: "back.out(2)", clearProps: "transform,opacity" },
          "-=0.4"
        );

      // Count-up rating scoped to root
      const rating = root.current?.querySelector(".gs-rating");
      if (rating) {
        const obj = { v: 0 };
        gtl.to(
          obj,
          {
            v: 4.8,
            duration: 1.2,
            ease: "power2.out",
            onUpdate: () => {
              if (rating) rating.textContent = obj.v.toFixed(1);
            },
          },
          "-=0.8"
        );
      }

      // ---- Review cards ----
      gsap.utils.toArray(".gs-card").forEach((card) => {
        const ctl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });

        ctl.fromTo(
          card,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "transform,opacity" }
        )
          .fromTo(
            card.querySelectorAll(".gs-star"),
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.35, stagger: 0.05, ease: "back.out(2)", clearProps: "transform,opacity" },
            "-=0.5"
          )
          .fromTo(
            card.querySelector(".gs-quote"),
            { scale: 0.7, opacity: 0, rotate: -10 },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.4"
          )
          .fromTo(
            card.querySelectorAll(".gs-line"),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", clearProps: "transform,opacity" },
            "-=0.35"
          );
      });

      // ---- Bottom bar ----
      gsap.fromTo(
        ".gs-bottom > *",
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gs-bottom", start: "top 92%", once: true },
          clearProps: "transform,opacity",
        }
      );
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className={`${figtree.className} relative w-full overflow-hidden bg-white py-16 sm:py-20`}
    >
      <div className="relative mx-auto max-w-[1800px] px-6 lg:px-10">
        {/* Vertical side label */}
       

        {/* Cursive tagline top-right */}
       

        {/* Header */}
        <div className="gs-head mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span
              className="gs-eyebrow-line h-px w-10"
              style={{ backgroundColor: GOLD }}
            />
            <span
              className="gs-eyebrow text-xs font-semibold tracking-[0.3em]"
              style={{ color: GOLD_DEEP }}
            >
              REAL FAMILIES. REAL HOMES.
            </span>
            <span
              className="gs-eyebrow-line h-px w-10"
              style={{ backgroundColor: GOLD }}
            />
          </div>

          <h2 className="mt-3 text-5xl font-bold text-neutral-900 sm:text-6xl">
            {["What", "Our", "Owners", "Say"].map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                <span className="gs-title-word inline-block pr-[0.22em] will-change-transform">{w}</span>
              </span>
            ))}
          </h2>

          <p className="gs-sub mt-4 text-lg text-neutral-500">
            Trusted by families across Chennai. Built for a brighter tomorrow.
          </p>
        </div>

        {/* Google reviews bar */}
        <div
          className="gs-google mx-auto mt-10 flex max-w-4xl flex-col items-center justify-between gap-6 rounded-2xl px-8 py-6 sm:flex-row"
          style={{ backgroundColor: CREAM, border: `1px solid ${LINE}` }}
        >
          <div className="gs-google-item flex items-center gap-3">
            <GoogleGIcon className="h-8 w-8" />
            <span className="text-xl font-semibold text-neutral-800">Google Reviews</span>
          </div>

          <div className="hidden h-10 w-px sm:block" style={{ backgroundColor: LINE }} />

          <div className="gs-google-item flex items-center gap-3">
            <span
              className="gs-rating text-4xl font-bold tabular-nums"
              style={{ color: GOLD_DEEP }}
            >
              4.8
            </span>
            <span className="text-neutral-500">out of 5</span>
          </div>

          <div className="hidden h-10 w-px sm:block" style={{ backgroundColor: LINE }} />

          <div className="gs-google-item flex flex-col items-center gap-1">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className="gs-star-big h-5 w-5"
                  style={{ fill: GOLD, color: GOLD }}
                />
              ))}
              <Star className="gs-star-big h-5 w-5 fill-neutral-300 text-neutral-300" />
            </div>
            <span className="text-sm text-neutral-500">326 reviews</span>
          </div>

          <button
            className="gs-google-item group flex items-center gap-2 rounded-full border bg-white px-6 py-3 text-xs font-bold tracking-widest transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: GOLD, color: GOLD_DEEP }}
          >
            WRITE A REVIEW
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Review cards */}
        <div className="relative mt-14">
          <button
            aria-label="Previous"
            className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-md transition-transform duration-300 hover:-translate-y-[55%] lg:flex"
            style={{ borderColor: LINE }}
          >
            <ArrowLeft className="h-5 w-5" style={{ color: GOLD_DEEP }} />
          </button>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="gs-card relative rounded-2xl border bg-white p-8 shadow-sm"
                style={{ borderColor: LINE }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="gs-star h-4 w-4"
                        style={{ fill: GOLD, color: GOLD }}
                      />
                    ))}
                  </div>
                  <Quote
                    className="gs-quote h-8 w-8"
                    fill="currentColor"
                    style={{ color: LINE }}
                  />
                </div>

                <p className="gs-line mt-5 text-[15px] leading-relaxed text-neutral-600">
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="gs-line mt-6 border-t pt-4" style={{ borderColor: LINE }}>
                  <div className="text-base font-bold text-neutral-900">
                    {review.name}
                  </div>
                  <div className="text-sm" style={{ color: GOLD_DEEP }}>
                    {review.project}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            aria-label="Next"
            className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border bg-white shadow-md transition-transform duration-300 hover:-translate-y-[55%] lg:flex"
            style={{ borderColor: LINE }}
          >
            <ArrowRight className="h-5 w-5" style={{ color: GOLD_DEEP }} />
          </button>
        </div>

        {/* Bottom bar */}
        <div className="gs-bottom mt-12 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div
            className="text-center text-[11px] font-semibold tracking-[0.15em] sm:text-left"
            style={{ color: GOLD_DEEP }}
          >
            HAPPY FAMILIES.<br />BRIGHTER TOMORROWS.
          </div>

          <div className="flex items-center gap-2">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: LINE }}
            />
            <span
              className="h-1.5 w-6 rounded-full"
              style={{ backgroundColor: GOLD_DEEP }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: LINE }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function GoogleGIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.5 0-14 4.2-17.7 10.7z" />
      <path fill="#4CAF50" d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.4C29.7 35.4 27 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.9 39.8 16.4 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.2 4.3-4.1 5.7l6.6 5.4C39.9 36.5 44 30.9 44 24c0-1.3-.1-2.7-.4-3.5z" />
    </svg>
  );
}
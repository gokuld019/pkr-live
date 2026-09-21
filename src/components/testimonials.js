"use client";

import { useRef } from "react";
import { Geist } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const TEXT_CHARCOAL = "#2D3A46";
const LIGHT_BLUE = "#E8F0F9";
const LIGHT_BLUE_RING = "rgba(15,58,107,0.10)";

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
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".gs-head", start: "top 85%", once: true },
      });

      tl.fromTo(
        ".gs-eyebrow",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.35, clearProps: "transform,opacity" }
      )
        .fromTo(
          ".gs-title-word",
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: "power4.out",
            clearProps: "transform,opacity",
          },
          "-=0.2"
        )
        .fromTo(
          ".gs-sub",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: "power3.out", clearProps: "transform,opacity" },
          "-=0.3"
        );

      gsap.fromTo(
        ".gs-side-word",
        { x: -14, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gs-head", start: "top 85%", once: true },
          clearProps: "transform,opacity",
        }
      );

      gsap.fromTo(
        ".gs-cursive",
        { x: 15, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: ".gs-head", start: "top 85%", once: true },
          clearProps: "transform,opacity",
        }
      );

      const gtl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".gs-google", start: "top 90%", once: true },
      });

      gtl.fromTo(
        ".gs-google",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", clearProps: "transform,opacity" }
      )
        .fromTo(
          ".gs-google-item",
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, ease: "power2.out", clearProps: "transform,opacity" },
          "-=0.3"
        )
        .fromTo(
          ".gs-star-big",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, stagger: 0.04, ease: "back.out(2)", clearProps: "transform,opacity" },
          "-=0.25"
        );

      const rating = root.current?.querySelector(".gs-rating");
      if (rating) {
        const obj = { v: 0 };
        gtl.to(
          obj,
          {
            v: 4.8,
            duration: 0.8,
            ease: "power2.out",
            onUpdate: () => {
              if (rating) rating.textContent = obj.v.toFixed(1);
            },
          },
          "-=0.5"
        );
      }

      gsap.utils.toArray(".gs-card").forEach((card) => {
        const ctl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: card, start: "top 90%", once: true },
        });

        ctl.fromTo(
          card,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: "power3.out", clearProps: "transform,opacity" }
        )
          .fromTo(
            card.querySelectorAll(".gs-star"),
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.25, stagger: 0.04, ease: "back.out(2)", clearProps: "transform,opacity" },
            "-=0.3"
          )
          .fromTo(
            card.querySelector(".gs-quote"),
            { scale: 0.7, opacity: 0, rotate: -10 },
            { scale: 1, opacity: 1, rotate: 0, duration: 0.35, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.25"
          )
          .fromTo(
            card.querySelectorAll(".gs-line"),
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: "power3.out", clearProps: "transform,opacity" },
            "-=0.2"
          );
      });

      gsap.fromTo(
        ".gs-bottom > *",
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
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
      className={`${geist.className} relative w-full overflow-hidden bg-white py-10 sm:py-16 md:py-20 lg:py-24`}
    >
      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="gs-head mx-auto max-w-xl text-center sm:max-w-2xl">
          <div className="flex items-center justify-center gap-3">
            <span
              className="gs-eyebrow text-[9.5px] font-semibold tracking-[0.25em] sm:text-xs sm:tracking-[0.3em]"
              style={{ color: DEEP_NAVY }}
            >
              REAL FAMILIES. REAL HOMES.
            </span>
          </div>

          <h2
            className="mt-2.5 text-[28px] font-bold leading-[1.05] sm:mt-3 sm:text-[clamp(2.25rem,7vw,3.75rem)]"
            style={{ color: DEEP_NAVY }}
          >
            {["What", "Our", "Owners", "Say"].map((w, i) => (
              <span
                key={i}
                className="inline-block overflow-hidden align-bottom"
                style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
              >
                <span className="gs-title-word inline-block pr-[0.22em] will-change-transform">
                  {w}
                </span>
              </span>
            ))}
          </h2>

          <p
            className="gs-sub mt-3 text-[13px] sm:mt-4 sm:text-[clamp(0.95rem,2vw,1.125rem)]"
            style={{ color: TEXT_CHARCOAL }}
          >
            Trusted by families across Chennai. Built for a brighter tomorrow.
          </p>
        </div>

        {/* Google reviews bar — light blue background */}
        <div
          className="gs-google mx-auto mt-6 flex w-full max-w-4xl flex-col items-stretch gap-3.5 rounded-2xl px-4 py-4 sm:mt-10 sm:gap-6 sm:px-8 sm:py-6 md:flex-row md:items-center md:justify-between"
          style={{
            backgroundColor: LIGHT_BLUE,
            boxShadow: `0 4px 20px rgba(15,58,107,0.06)`,
          }}
        >
          <div className="gs-google-item flex items-center justify-center gap-2.5 sm:gap-3 md:justify-start">
            <GoogleGIcon className="h-6 w-6 shrink-0 sm:h-8 sm:w-8" />
            <span
              className="text-base font-semibold sm:text-xl"
              style={{ color: DEEP_NAVY }}
            >
              Google Reviews
            </span>
          </div>

          <div className="flex items-center justify-center gap-5 sm:gap-8 md:justify-start md:gap-3">
            <div className="gs-google-item flex items-center gap-2 sm:gap-3">
              <span
                className="gs-rating text-2xl font-bold tabular-nums sm:text-4xl"
                style={{ color: DEEP_NAVY }}
              >
                4.8
              </span>
              <span
                className="text-[13px] sm:text-base"
                style={{ color: TEXT_CHARCOAL }}
              >
                out of 5
              </span>
            </div>

            <div className="gs-google-item flex flex-col items-center gap-0.5 sm:gap-1">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <Star
                    key={i}
                    className="gs-star-big h-3.5 w-3.5 sm:h-5 sm:w-5"
                    style={{ fill: DEEP_NAVY, color: DEEP_NAVY }}
                  />
                ))}
                <Star
                  className="gs-star-big h-3.5 w-3.5 sm:h-5 sm:w-5"
                  style={{ fill: "#CBD5E1", color: "#CBD5E1" }}
                />
              </div>
              <span
                className="text-[11px] sm:text-sm"
                style={{ color: TEXT_CHARCOAL }}
              >
                326 reviews
              </span>
            </div>
          </div>

          <button
            className="gs-google-item group mx-auto flex w-full max-w-xs items-center justify-center gap-2 rounded-md bg-white px-6 py-2.5 text-[10.5px] font-bold tracking-widest transition-all duration-300 hover:-translate-y-0.5 sm:py-3 sm:text-xs md:mx-0 md:w-auto"
            style={{
              color: DEEP_NAVY,
              boxShadow: `0 2px 10px rgba(15,58,107,0.10)`,
            }}
          >
            WRITE A REVIEW
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Review cards */}
        <div className="relative mt-7 sm:mt-12 lg:mt-14">
          <button
            aria-label="Previous"
            className="absolute -left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 hover:-translate-y-[55%] xl:-left-5 xl:flex xl:h-12 xl:w-12"
          >
            <ArrowLeft className="h-5 w-5" style={{ color: DEEP_NAVY }} />
          </button>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {REVIEWS.map((review) => (
              <div
                key={review.id}
                className="gs-card relative flex flex-col rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(15,58,107,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(15,58,107,0.12)] sm:p-7 lg:p-8"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="gs-star h-3.5 w-3.5 sm:h-4 sm:w-4"
                        style={{ fill: DEEP_NAVY, color: DEEP_NAVY }}
                      />
                    ))}
                  </div>
                  <Quote
                    className="gs-quote h-6 w-6 sm:h-8 sm:w-8"
                    fill="currentColor"
                    style={{ color: LIGHT_BLUE }}
                  />
                </div>

                <p
                  className="gs-line mt-3.5 flex-1 text-[13px] leading-relaxed sm:mt-5 sm:text-[15px]"
                  style={{ color: TEXT_CHARCOAL }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="gs-line mt-4 pt-3 sm:mt-6 sm:pt-4">
                  <div
                    className="text-sm font-bold sm:text-base"
                    style={{ color: DEEP_NAVY }}
                  >
                    {review.name}
                  </div>
                  <div className="text-[13px] sm:text-sm" style={{ color: DEEP_NAVY }}>
                    {review.project}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            aria-label="Next"
            className="absolute -right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 hover:-translate-y-[55%] xl:-right-5 xl:flex xl:h-12 xl:w-12"
          >
            <ArrowRight className="h-5 w-5" style={{ color: DEEP_NAVY }} />
          </button>

          {/* Mobile nav controls */}
          <div className="mt-5 flex items-center justify-center gap-4 sm:mt-6 xl:hidden">
            <button
              aria-label="Previous"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md sm:h-10 sm:w-10"
            >
              <ArrowLeft className="h-4 w-4" style={{ color: DEEP_NAVY }} />
            </button>
            <button
              aria-label="Next"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md sm:h-10 sm:w-10"
            >
              <ArrowRight className="h-4 w-4" style={{ color: DEEP_NAVY }} />
            </button>
          </div>
        </div>

        {/* Bottom bar (commented out in original, kept as-is) */}
        {/* <div className="gs-bottom mt-10 flex flex-col items-center justify-between gap-5 sm:mt-12 sm:gap-6 sm:flex-row">
          <div
            className="text-center text-[10px] font-semibold leading-relaxed tracking-[0.12em] sm:text-left sm:text-[11px] sm:tracking-[0.15em]"
            style={{ color: DEEP_NAVY }}
          >
            HAPPY FAMILIES.<br />BRIGHTER TOMORROWS.
          </div>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: LIGHT_BLUE_RING }} />
            <span className="h-1.5 w-6 rounded-full" style={{ backgroundColor: DEEP_NAVY }} />
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: LIGHT_BLUE_RING }} />
          </div>
        </div> */}
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
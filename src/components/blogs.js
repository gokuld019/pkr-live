"use client";

import { useRef } from "react";
import Image from "next/image";
import { Figtree } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const GOLD = "#B08D3F";
const GOLD_DEEP = "#8A6B2E";
const CREAM = "#FBF8F2";
const LINE = "#E8DFCB";

const FEATURED = {
  category: "REAL ESTATE",
  date: "AUG 12, 2025",
  title: "Why North Bangalore is the Next Big Growth Corridor",
  excerpt:
    "From infrastructure to lifestyle, explore what makes North Bangalore a preferred choice for homebuyers and investors.",
  readTime: "10 MIN READ",
  image: "/blog-1.png",
};

const POSTS = [
  {
    id: 1,
    category: "HOME BUYING",
    date: "AUG 05, 2025",
    title: "5 Essential Tips for First-Time Homebuyers",
    excerpt:
      "A complete guide to help you make confident and informed decisions on your first home purchase.",
    image: "/blog-2.png",
  },
  {
    id: 2,
    category: "INVESTMENT",
    date: "JUL 28, 2025",
    title: "Real Estate Investment Trends in 2025",
    excerpt:
      "Discover the key trends shaping the real estate market and where the best opportunities lie.",
    image: "/blog-3.png",
  },
];

export default function OurBlogs() {
  const root = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".gs-head", start: "top 85%", once: true },
      });

      tl.fromTo(
        ".gs-eyebrow",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, clearProps: "transform,opacity" }
      )
        .fromTo(
          ".gs-eyebrow-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform",
          },
          "-=0.35"
        )
        .fromTo(
          ".gs-title-word",
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.07,
            ease: "power4.out",
            clearProps: "transform,opacity",
          },
          "-=0.3"
        )
        .fromTo(
          ".gs-divider",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform",
          },
          "-=0.7"
        )
        .fromTo(
          ".gs-lede",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", clearProps: "transform,opacity" },
          "-=0.5"
        )
        .fromTo(
          ".gs-viewall",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power2.out", clearProps: "transform,opacity" },
          "-=0.55"
        );

      gsap.utils.toArray(".gs-card").forEach((card) => {
        const ctl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: card, start: "top 86%", once: true },
        });

        ctl.fromTo(
          card,
          { y: 45, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", clearProps: "transform,opacity" }
        )
          .fromTo(
            card.querySelector(".gs-img"),
            { scale: 1.1, opacity: 0.85 },
            { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.7"
          )
          .fromTo(
            card.querySelector(".gs-tag"),
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.7"
          )
          .fromTo(
            card.querySelectorAll(".gs-line"),
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out", clearProps: "transform,opacity" },
            "-=0.55"
          );
      });

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
      className={`${figtree.className} relative w-full overflow-hidden py-16 sm:py-20`}
      
    >
      {/* Decorative line art bottom-left */}
      <div className="pointer-events-none absolute -bottom-6 left-0 h-40 w-40 opacity-20">
        <Image src="/lineart.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative mx-auto max-w-[1800px] px-6 lg:px-10">
        {/* Header */}
        <div className="gs-head flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="gs-eyebrow text-xs font-semibold tracking-[0.25em]"
                  style={{ color: GOLD_DEEP }}
                >
                  OUR BLOGS
                </span>
               
              </div>
              <h2 className="mt-2 text-5xl font-bold leading-tight text-neutral-900 sm:text-6xl">
                {["Insights", "for"].map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                    <span className="gs-title-word inline-block pr-[0.22em] will-change-transform">{w}</span>
                  </span>
                ))}
                <br />
                {["a", "Better", "Tomorrow"].map((w, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom" style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}>
                    <span className="gs-title-word inline-block pr-[0.22em] text-neutral-900 will-change-transform">
                      {w}
                    </span>
                  </span>
                ))}
              </h2>
            </div>

            <div className="flex items-start gap-5 lg:pb-2">
              <span
                className="gs-divider hidden h-16 w-px sm:block"
                style={{ backgroundColor: GOLD }}
              />
              <p className="gs-lede max-w-xs text-[15px] leading-relaxed text-neutral-500">
                Explore expert advice, market trends and real estate insights to
                help you make smarter decisions.
              </p>
            </div>
          </div>

          <button
            className="gs-viewall group flex items-center gap-2 self-start rounded-full border px-6 py-3 text-xs font-bold tracking-widest transition-colors hover:text-white lg:self-auto"
            style={{ borderColor: GOLD, color: GOLD_DEEP }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD_DEEP)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            VIEW ALL BLOGS
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Blog grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Featured */}
          <div
            className="gs-card overflow-hidden rounded-2xl border bg-white shadow-sm lg:col-span-1 lg:grid lg:grid-cols-1"
            style={{ borderColor: LINE }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="relative h-64 overflow-hidden sm:h-full lg:h-64 xl:h-full xl:min-h-[280px]">
                <Image
                  src={FEATURED.image}
                  alt={FEATURED.title}
                  fill
                  className="gs-img object-cover"
                />
                <span
                  className="gs-tag absolute left-4 top-4 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide text-white"
                  style={{ backgroundColor: GOLD_DEEP }}
                >
                  FEATURED
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Clock className="h-3.5 w-3.5" />
                  {FEATURED.readTime}
                </div>
              </div>

              <div className="flex flex-col justify-center px-6 py-6">
                <div className="gs-line flex items-center justify-between">
                  <span
                    className="border-b-2 pb-1 text-[11px] font-bold tracking-[0.15em]"
                    style={{ borderColor: GOLD, color: GOLD_DEEP }}
                  >
                    {FEATURED.category}
                  </span>
                  <span className="text-xs text-neutral-400">{FEATURED.date}</span>
                </div>

                <h3 className="gs-line mt-4 text-2xl font-bold leading-snug text-neutral-900">
                  {FEATURED.title}
                </h3>

                <p className="gs-line mt-3 text-sm leading-relaxed text-neutral-500">
                  {FEATURED.excerpt}
                </p>

                <div className="gs-line mt-5 border-t pt-4" style={{ borderColor: LINE }}>
                  <button className="group flex items-center gap-2 text-sm font-bold text-neutral-900">
                    Read More
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: GOLD }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Regular posts */}
          {POSTS.map((post) => (
            <div
              key={post.id}
              className="gs-card overflow-hidden rounded-2xl border bg-white shadow-sm"
              style={{ borderColor: LINE }}
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="gs-img object-cover"
                />
                <span
                  className="gs-tag absolute left-4 top-4 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-wide text-white"
                  style={{ backgroundColor: GOLD_DEEP }}
                >
                  {post.category}
                </span>
              </div>

              <div className="px-6 py-6">
                <div className="gs-line flex items-center justify-between">
                  <span
                    className="text-[11px] font-bold tracking-[0.15em]"
                    style={{ color: GOLD_DEEP }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-neutral-400">{post.date}</span>
                </div>

                <h3 className="gs-line mt-3 text-xl font-bold leading-snug text-neutral-900">
                  {post.title}
                </h3>

                <p className="gs-line mt-3 text-sm leading-relaxed text-neutral-500">
                  {post.excerpt}
                </p>

                <div className="gs-line mt-5 border-t pt-4" style={{ borderColor: LINE }}>
                  <button className="group flex items-center gap-2 text-sm font-bold text-neutral-900">
                    Read More
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: GOLD }}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="gs-bottom mt-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            {["01", "02", "03"].map((n, i) => (
              <button
                key={n}
                className="pb-1 text-sm font-semibold tracking-wide"
                style={
                  i === 0
                    ? { color: GOLD_DEEP, borderBottom: `2px solid ${GOLD}` }
                    : { color: "#a3a3a3" }
                }
              >
                {n}
              </button>
            ))}
          </div>

          {/* <div className="hidden items-center gap-3 sm:flex">
            <span className="h-px w-8" style={{ backgroundColor: GOLD }} />
            <span
              className="text-xs font-semibold tracking-[0.2em]"
              style={{ color: GOLD_DEEP }}
            >
              KNOWLEDGE BUILDS BETTER HOMES
            </span>
          </div> */}

          <div className="flex items-center gap-3">
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border bg-white text-neutral-700 transition-transform duration-300 hover:-translate-y-0.5"
              style={{ borderColor: GOLD }}
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ backgroundColor: GOLD_DEEP }}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
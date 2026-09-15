"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Figtree } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Clock } from "lucide-react";
import { ALL_POSTS } from "@/lib/blogData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const figtree = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const GOLD = "#B08D3F";
const GOLD_DEEP = "#8A6B2E";
const CREAM = "#FBF8F2";
const LINE = "#E8DFCB";

const FEATURED = ALL_POSTS[0];
const POSTS = ALL_POSTS.slice(1);

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
      className={`${figtree.className} relative w-full overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24`}
    >
      {/* Decorative line art bottom-left */}
      <div className="pointer-events-none absolute -bottom-6 left-0 hidden h-40 w-40 opacity-20 sm:block">
        <Image src="/lineart.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="gs-head flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end lg:flex-row">
            <div>
              <div className="flex items-center gap-3">
                <span
                  className="gs-eyebrow text-[10px] font-semibold tracking-[0.2em] sm:text-xs sm:tracking-[0.25em]"
                  style={{ color: GOLD_DEEP }}
                >
                  OUR BLOGS
                </span>
              </div>
              <h2 className="mt-2 text-[clamp(2.1rem,7vw,3.75rem)] font-bold leading-[1.05] text-neutral-900">
                {["Insights", "for"].map((w, i) => (
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
                <br />
                {["a", "Better", "Tomorrow"].map((w, i) => (
                  <span
                    key={i}
                    className="inline-block overflow-hidden align-bottom"
                    style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
                  >
                    <span className="gs-title-word inline-block pr-[0.22em] text-neutral-900 will-change-transform">
                      {w}
                    </span>
                  </span>
                ))}
              </h2>
            </div>

            <div className="flex items-start gap-4 sm:gap-5 lg:pb-2">
              <span
                className="gs-divider hidden h-16 w-px sm:block"
                style={{ backgroundColor: GOLD }}
              />
              <p className="gs-lede max-w-xs text-[14px] leading-relaxed text-neutral-500 sm:text-[15px]">
                Explore expert advice, market trends and real estate insights to
                help you make smarter decisions.
              </p>
            </div>
          </div>

          <Link
            href="/blogs"
            className="gs-viewall group flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-xs font-bold tracking-widest transition-colors hover:text-white sm:w-auto sm:self-start lg:self-auto"
            style={{ borderColor: GOLD, color: GOLD_DEEP }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = GOLD_DEEP)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            VIEW ALL BLOGS
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Blog grid */}
        <div className="mt-9 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {/* Featured */}
          <Link
            href={`/blogs/${FEATURED.slug}`}
            className="gs-card block overflow-hidden rounded-2xl border bg-white shadow-sm md:col-span-2 lg:col-span-1"
            style={{ borderColor: LINE }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="relative h-56 overflow-hidden sm:h-64 lg:h-64 xl:h-full xl:min-h-[280px]">
                <Image
                  src={FEATURED.image}
                  alt={FEATURED.title}
                  fill
                  className="gs-img object-cover"
                />
                <span
                  className="gs-tag absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-white sm:px-4 sm:text-xs"
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

              <div className="flex flex-col justify-center px-5 py-6 sm:px-6">
                <div className="gs-line flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="border-b-2 pb-1 text-[10.5px] font-bold tracking-[0.13em] sm:text-[11px] sm:tracking-[0.15em]"
                    style={{ borderColor: GOLD, color: GOLD_DEEP }}
                  >
                    {FEATURED.category}
                  </span>
                  <span className="text-xs text-neutral-400">{FEATURED.date}</span>
                </div>

                <h3 className="gs-line mt-4 text-xl font-bold leading-snug text-neutral-900 sm:text-2xl">
                  {FEATURED.title}
                </h3>

                <p className="gs-line mt-3 text-sm leading-relaxed text-neutral-500">
                  {FEATURED.excerpt}
                </p>

                <div className="gs-line mt-5 border-t pt-4" style={{ borderColor: LINE }}>
                  <span className="group flex items-center gap-2 text-sm font-bold text-neutral-900">
                    Read More
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: GOLD }}
                    />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Regular posts */}
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="gs-card block overflow-hidden rounded-2xl border bg-white shadow-sm"
              style={{ borderColor: LINE }}
            >
              <div className="relative h-48 overflow-hidden sm:h-52">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="gs-img object-cover"
                />
                <span
                  className="gs-tag absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold tracking-wide text-white sm:px-4 sm:text-[11px]"
                  style={{ backgroundColor: GOLD_DEEP }}
                >
                  {post.category}
                </span>
              </div>

              <div className="px-5 py-6 sm:px-6">
                <div className="gs-line flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="text-[10.5px] font-bold tracking-[0.13em] sm:text-[11px] sm:tracking-[0.15em]"
                    style={{ color: GOLD_DEEP }}
                  >
                    {post.category}
                  </span>
                  <span className="text-xs text-neutral-400">{post.date}</span>
                </div>

                <h3 className="gs-line mt-3 text-lg font-bold leading-snug text-neutral-900 sm:text-xl">
                  {post.title}
                </h3>

                <p className="gs-line mt-3 text-sm leading-relaxed text-neutral-500">
                  {post.excerpt}
                </p>

                <div className="gs-line mt-5 border-t pt-4" style={{ borderColor: LINE }}>
                  <span className="group flex items-center gap-2 text-sm font-bold text-neutral-900">
                    Read More
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: GOLD }}
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
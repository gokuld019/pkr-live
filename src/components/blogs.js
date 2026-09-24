"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Geist } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Clock } from "lucide-react";
import { ALL_POSTS } from "@/lib/blogData";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const TEXT_CHARCOAL = "#2D3A46";
const LIGHT_BLUE = "#E8F0F9";

// Featured pill only
const FEAT_GREEN = "#2C3A22";

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
            card.querySelectorAll(".gs-img"),
            { scale: 1.1, opacity: 0.85 },
            { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out", clearProps: "transform,opacity" },
            "-=0.7"
          )
          .fromTo(
            card.querySelectorAll(".gs-tag"),
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
      className={`${geist.className} relative w-full overflow-hidden`}
    >
      <div className="pointer-events-none absolute -bottom-6 left-0 hidden h-40 w-40 opacity-20 sm:block">
        <Image src="/lineart.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative mx-auto w-full max-w-[1800px] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="gs-head flex flex-col items-center gap-4 text-center sm:gap-6">
          <div>
            <span
              className="gs-eyebrow text-[9px] font-semibold tracking-[0.18em] sm:text-xs sm:tracking-[0.25em]"
              style={{ color: DEEP_NAVY }}
            >
              OUR BLOGS
            </span>
            <h2
              className="mt-1.5 text-[clamp(1.75rem,6.5vw,3.75rem)] font-bold leading-[1.05] sm:mt-2"
              style={{ color: DEEP_NAVY }}
            >
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
                  <span
                    className="gs-title-word inline-block pr-[0.22em] will-change-transform"
                    style={{ color: DEEP_NAVY }}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* Blog grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr] lg:gap-7 lg:h-[450px]">

          {/* --- FEATURED POST (stacked card on mobile, split card from sm up) --- */}
          <Link
            href={`/blogs/${FEATURED.slug}`}
            className="gs-card group/card flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-[#0F3A6B]/10 bg-white shadow-[0_4px_24px_rgba(15,58,107,0.06)] transition-[box-shadow,border-color] duration-300 hover:border-[#0F3A6B]/25 hover:shadow-[0_8px_32px_rgba(15,58,107,0.12)] md:col-span-2 lg:col-span-1 sm:min-h-[380px] lg:min-h-0 lg:h-full"
          >
            {/* Mobile image (separate image, below sm only) */}
            <div className="relative h-auto shrink-0 overflow-hidden bg-gray-50 sm:hidden">
              <Image
                src={FEATURED.mobileImage || FEATURED.image}
                alt={FEATURED.title}
                width={0}
                height={0}
                sizes="100vw"
                className="gs-img h-auto w-full object-contain"
              />
            </div>

            {/* Desktop image (sm and up) */}
            <div className="relative hidden w-[48%] shrink-0 overflow-hidden bg-gray-50 sm:block">
              <Image
                src={FEATURED.image}
                alt={FEATURED.title}
                fill
                sizes="(max-width: 1024px) 40vw, 28vw"
                className="gs-img object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
              />

              {/* Bottom gradient for readability */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />

             

              {/* Read time */}
              <div className="absolute bottom-5 left-5 flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] text-white">
                <Clock className="h-4 w-4" strokeWidth={1.75} />
                <span className="uppercase">{FEATURED.readTime || "10 min read"}</span>
              </div>
            </div>

            {/* Content (same typography + colors as regular cards) */}
            <div className="flex min-w-0 flex-1 flex-col px-4 py-5 sm:px-6 sm:py-6 xl:px-10 xl:py-9 lg:overflow-hidden">
              {/* Category + date */}
              <div className="gs-line flex flex-wrap items-center justify-between gap-2">
                <span
                  className="text-[10px] font-bold tracking-[0.12em] sm:text-[11px] sm:tracking-[0.15em]"
                  style={{ color: DEEP_NAVY }}
                >
                  {FEATURED.category}
                </span>
                <span
                  className="text-[11px] sm:text-xs"
                  style={{ color: TEXT_CHARCOAL, opacity: 0.7 }}
                >
                  {FEATURED.date}
                </span>
              </div>

              <h3
                className="gs-line mt-2.5 text-base font-bold leading-snug sm:mt-3 sm:text-2xl xl:mt-5 xl:text-[32px] xl:leading-[1.2]"
                style={{ color: DEEP_NAVY }}
              >
                {FEATURED.title}
              </h3>

              <p
                className="gs-line mt-2 text-[13px] leading-relaxed line-clamp-3 sm:mt-3 sm:text-sm xl:mt-4 xl:text-[15px]"
                style={{ color: TEXT_CHARCOAL }}
              >
                {FEATURED.excerpt}
              </p>

              {/* Footer */}
              <div className="gs-line mt-4 pt-3 sm:mt-auto sm:pt-4">
                <span
                  className="flex items-center gap-2 text-[13px] font-bold sm:text-sm xl:text-base"
                  style={{ color: DEEP_NAVY }}
                >
                  Read More
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover/card:translate-x-1 sm:h-4 sm:w-4"
                    style={{ color: DEEP_NAVY }}
                  />
                </span>
              </div>
            </div>
          </Link>

          {/* --- REGULAR POSTS --- */}
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="gs-card flex flex-col overflow-hidden rounded-2xl border border-[#0F3A6B]/10 bg-white shadow-[0_4px_24px_rgba(15,58,107,0.06)] transition-[box-shadow,border-color] duration-300 hover:border-[#0F3A6B]/25 hover:shadow-[0_8px_32px_rgba(15,58,107,0.12)] lg:h-full"
            >
              {/* Image Container */}
              <div className="relative h-auto shrink-0 overflow-hidden bg-gray-50 lg:h-[45%]">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={0}
                  height={0}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="gs-img h-auto w-full object-contain transition-transform duration-500 group-hover/card:scale-[1.04] lg:h-full lg:object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col px-4 py-5 sm:px-6 sm:py-6 lg:overflow-hidden">
                <div className="gs-line flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="text-[10px] font-bold tracking-[0.12em] sm:text-[11px] sm:tracking-[0.15em]"
                    style={{ color: DEEP_NAVY }}
                  >
                    {post.category}
                  </span>
                  <span
                    className="text-[11px] sm:text-xs"
                    style={{ color: TEXT_CHARCOAL, opacity: 0.7 }}
                  >
                    {post.date}
                  </span>
                </div>

                <h3
                  className="gs-line mt-2.5 text-base font-bold leading-snug sm:mt-3 sm:text-xl"
                  style={{ color: DEEP_NAVY }}
                >
                  {post.title}
                </h3>

                <p
                  className="gs-line mt-2 text-[13px] leading-relaxed sm:mt-3 sm:text-sm line-clamp-3"
                  style={{ color: TEXT_CHARCOAL }}
                >
                  {post.excerpt}
                </p>

                <div className="gs-line mt-4 pt-3 sm:mt-5 sm:pt-4">
                  <span
                    className="group flex items-center gap-2 text-[13px] font-bold sm:text-sm"
                    style={{ color: DEEP_NAVY }}
                  >
                    Read More
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 sm:h-4 sm:w-4"
                      style={{ color: DEEP_NAVY }}
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
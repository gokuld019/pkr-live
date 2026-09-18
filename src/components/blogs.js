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
      className={`${geist.className} relative w-full overflow-hidden`}
    >
      {/* Decorative line art bottom-left */}
      <div className="pointer-events-none absolute -bottom-6 left-0 hidden h-40 w-40 opacity-20 sm:block">
        <Image src="/lineart.png" alt="" fill className="object-contain" />
      </div>

      <div className="relative mx-auto w-full max-w-[1800px] px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div className="gs-head flex flex-col items-center gap-6 text-center">
          <div>
            <span
              className="gs-eyebrow text-[10px] font-semibold tracking-[0.2em] sm:text-xs sm:tracking-[0.25em]"
              style={{ color: DEEP_NAVY }}
            >
              OUR BLOGS
            </span>
            <h2
              className="mt-2 text-[clamp(2.1rem,7vw,3.75rem)] font-bold leading-[1.05]"
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

          {/* <Link
            href="/blogs"
            className="gs-viewall group flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-bold tracking-widest text-white transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
            style={{ backgroundColor: DEEP_NAVY }}
          >
            VIEW ALL BLOGS
            <ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Link> */}
        </div>

        {/* Blog grid */}
        <div className="mt-9 grid grid-cols-1 gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {/* Featured */}
          <Link
            href={`/blogs/${FEATURED.slug}`}
            className="gs-card block overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(15,58,107,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(15,58,107,0.12)] md:col-span-2 lg:col-span-1"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="relative h-56 overflow-hidden sm:h-64 lg:h-64 xl:h-full xl:min-h-[280px]">
                <Image
                  src={FEATURED.image}
                  alt={FEATURED.title}
                  fill
                  className="gs-img object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-semibold text-white">
                  <Clock className="h-3.5 w-3.5" />
                  {FEATURED.readTime}
                </div>
              </div>

              <div className="flex flex-col justify-center px-5 py-6 sm:px-6">
                <div className="gs-line flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-[10.5px] font-bold tracking-[0.13em] sm:text-[11px] sm:tracking-[0.15em]"
                    style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}
                  >
                    {FEATURED.category}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: TEXT_CHARCOAL, opacity: 0.7 }}
                  >
                    {FEATURED.date}
                  </span>
                </div>

                <h3
                  className="gs-line mt-4 text-xl font-bold leading-snug sm:text-2xl"
                  style={{ color: DEEP_NAVY }}
                >
                  {FEATURED.title}
                </h3>

                <p
                  className="gs-line mt-3 text-sm leading-relaxed"
                  style={{ color: TEXT_CHARCOAL }}
                >
                  {FEATURED.excerpt}
                </p>

                <div className="gs-line mt-5 pt-4">
                  <span
                    className="group flex items-center gap-2 text-sm font-bold"
                    style={{ color: DEEP_NAVY }}
                  >
                    Read More
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      style={{ color: DEEP_NAVY }}
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
              className="gs-card block overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(15,58,107,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(15,58,107,0.12)]"
            >
              <div className="relative h-48 overflow-hidden sm:h-52">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="gs-img object-cover"
                />
              </div>

              <div className="px-5 py-6 sm:px-6">
                <div className="gs-line flex flex-wrap items-center justify-between gap-2">
                  <span
                    className="text-[10.5px] font-bold tracking-[0.13em] sm:text-[11px] sm:tracking-[0.15em]"
                    style={{ color: DEEP_NAVY }}
                  >
                    {post.category}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: TEXT_CHARCOAL, opacity: 0.7 }}
                  >
                    {post.date}
                  </span>
                </div>

                <h3
                  className="gs-line mt-3 text-lg font-bold leading-snug sm:text-xl"
                  style={{ color: DEEP_NAVY }}
                >
                  {post.title}
                </h3>

                <p
                  className="gs-line mt-3 text-sm leading-relaxed"
                  style={{ color: TEXT_CHARCOAL }}
                >
                  {post.excerpt}
                </p>

                <div className="gs-line mt-5 pt-4">
                  <span
                    className="group flex items-center gap-2 text-sm font-bold"
                    style={{ color: DEEP_NAVY }}
                  >
                    Read More
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
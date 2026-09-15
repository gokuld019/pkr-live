// src/app/aboutus/page.js
'use client'

import { useRef } from "react";
import { Figtree } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  Award,
  Users,
  Building2,
  Ruler,
  ArrowRight,
  ChevronUp,
  MapPin,
  Building,
  ShieldCheck,
  Clock3,
  HandCoins,
  Star,
  ThumbsUp,
  Medal,
  ShieldCheck as SafetyShield,
  Handshake,
  Timer,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const GOLD = "#B08D3F";
const GOLD_DEEP = "#8A6B2E";
const CREAM = "#FBF8F2";
const LINE = "#E8DFCB";
const INK = "#1a1a1a";

export default function AboutUsPage() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-img",
        { scale: 1.08, opacity: 0.9 },
        { scale: 1, opacity: 1, duration: 1.3, ease: "power3.out" }
      );

      const engTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".eng-head", start: "top 82%", once: true },
      });
      engTl
        .fromTo(".eng-eyebrow-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.6, clearProps: "transform" })
        .fromTo(".eng-eyebrow-text", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, clearProps: "transform,opacity" }, "-=0.35")
        .fromTo(".eng-title-word", { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power4.out", clearProps: "transform,opacity" }, "-=0.3")
        .fromTo(".eng-copy", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: "power3.out", clearProps: "transform,opacity" }, "-=0.4")
        .fromTo(".eng-cta", { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, clearProps: "transform,opacity" }, "-=0.3");

      gsap.fromTo(
        ".stat-card",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".stat-grid", start: "top 85%", once: true } }
      );

      gsap.fromTo(
        ".portrait-wrap",
        { y: 40, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".portrait-wrap", start: "top 85%", once: true } }
      );

      const vmTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".vm-grid", start: "top 82%", once: true },
      });
      vmTl
        .fromTo(".vm-block", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, clearProps: "transform,opacity" })
        .fromTo(".vm-image", { y: 50, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", clearProps: "transform,opacity" }, "-=0.5");

      const wcTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".wc-head", start: "top 82%", once: true },
      });
      wcTl
        .fromTo(".wc-eyebrow-line", { scaleX: 0 }, { scaleX: 1, transformOrigin: "left center", duration: 0.6, clearProps: "transform" })
        .fromTo(".wc-eyebrow-text", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, clearProps: "transform,opacity" }, "-=0.35")
        .fromTo(".wc-title-word", { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.06, ease: "power4.out", clearProps: "transform,opacity" }, "-=0.3");

      gsap.fromTo(
        ".wc-feature",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".wc-grid", start: "top 85%", once: true } }
      );

      gsap.fromTo(
        ".wc-photo",
        { scale: 1.08, opacity: 0.85 },
        { scale: 1, opacity: 1, duration: 1.1, ease: "power2.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".wc-photo-wrap", start: "top 85%", once: true } }
      );

      const ccTl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".cc-head", start: "top 82%", once: true },
      });
      ccTl
        .fromTo(".cc-title-word", { yPercent: 115, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.85, stagger: 0.03, ease: "power4.out", clearProps: "transform,opacity" })
        .fromTo(".cc-copy", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, clearProps: "transform,opacity" }, "-=0.4");

      gsap.fromTo(
        ".cc-item",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: ".cc-grid", start: "top 85%", once: true } }
      );
    },
    { scope: root }
  );

  return (
    <main ref={root} className={`${figtree.className} min-h-screen relative`}>
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[780px] flex overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 mt-3 sm:mx-4 sm:mt-4 md:mx-8 md:mt-8">
          <div
            className="hero-img flex-[1.7] relative bg-cover bg-center mr-23"
            style={{ backgroundImage: `url(/contactus.png)` }}
          >
          </div>
        </div>
      </section>

      {/* Engineering Your Dream Home Section */}
      <section className="w-full px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16 overflow-hidden" style={{ backgroundColor: CREAM }}>
        <div className="eng-head max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr_0.85fr] gap-10 sm:gap-12 lg:gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="eng-eyebrow-line h-px w-10" style={{ backgroundColor: GOLD }} />
              <span className="eng-eyebrow-text text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.28em]" style={{ color: GOLD_DEEP }}>
                BUILT ON TRUST
              </span>
            </div>

            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] leading-[1.15] font-semibold mb-4 sm:mb-5" style={{ color: "#1a2233" }}>
              <span className="eng-title-word inline-block overflow-hidden">
                <span className="inline-block">Engineering</span>
              </span>
              <br />
              <span className="eng-title-word inline-block overflow-hidden">
                <span className="inline-block" style={{ color: GOLD_DEEP }}>
                  Your Dream Home.
                </span>
              </span>
            </h2>

            <p className="eng-copy text-sm leading-[1.7] text-neutral-500 mb-5 sm:mb-6 max-w-full sm:max-w-[420px]">
              Enhancing lifestyles through quality homes with essential luxuries, fitting within your budget.
            </p>

            <span className="eng-copy block h-px w-10 mb-5 sm:mb-6" style={{ backgroundColor: GOLD }} />

            <p className="eng-copy text-[13.5px] sm:text-sm leading-[1.8] sm:leading-[1.9] text-neutral-500 mb-7 sm:mb-8 max-w-full sm:max-w-[440px]">
              As a trusted construction company in Chennai, PKR Estates, with over a decade of
              experience, specializes in creating quality homes that enhance lifestyles. Each project
              is uniquely designed to meet homebuyers&apos; needs, offering convenience and comfort.
              Committed to providing essential luxuries at affordable prices, our properties are known
              for their aesthetics, amenities, and accessibility to essential facilities. Choose PKR
              Estates for your ideal home.
            </p>

            <a
              href="#know-more"
              className="eng-cta inline-flex items-center gap-3 border text-[12px] sm:text-[13px] font-semibold tracking-[1.2px] sm:tracking-[1.5px] uppercase no-underline px-5 sm:px-6 py-3.5 sm:py-4 transition-colors w-full sm:w-auto justify-center sm:justify-start"
              style={{ borderColor: LINE, color: GOLD_DEEP }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = GOLD_DEEP;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = GOLD_DEEP;
              }}
            >
              Know More About PKR Estates <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </div>

          <div className="stat-grid grid grid-cols-2 gap-3.5 sm:gap-5">
            {[
              { icon: Award, value: "15", suffix: "+", label: ["YEARS", "OF EXPERIENCE"] },
              { icon: Users, value: "3.2K", suffix: "+", label: ["HAPPY", "HOME OWNERS"] },
              { icon: Building2, value: "50", suffix: "+", label: ["PROJECTS", "DELIVERED"] },
              { icon: Ruler, value: "5M", suffix: "+", label: ["SQ.FT.", "CONSTRUCTED"] },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="stat-card rounded-sm px-4 py-6 sm:px-6 sm:py-8 flex flex-col items-center text-center border"
                  style={{ borderColor: LINE, backgroundColor: "#fff" }}
                >
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4"
                    style={{ backgroundColor: "#F3ECDA" }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} style={{ color: GOLD_DEEP }} />
                  </div>
                  <p className="m-0 mb-2.5 sm:mb-3 leading-none">
                    <span className="text-[28px] sm:text-[34px] md:text-[40px] font-bold" style={{ color: GOLD_DEEP }}>
                      {stat.value}
                    </span>
                    <span className="text-base sm:text-lg md:text-xl font-bold align-top" style={{ color: GOLD_DEEP }}>
                      {stat.suffix}
                    </span>
                  </p>
                  <p className="text-[10.5px] sm:text-[12px] tracking-[0.5px] sm:tracking-[1px] font-semibold uppercase m-0 leading-relaxed" style={{ color: "#1a2233" }}>
                    {stat.label[0]}
                    <br />
                    {stat.label[1]}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="portrait-wrap relative w-full h-[340px] sm:h-[420px] md:h-[480px] lg:h-[560px] overflow-hidden ">
            <img src="/abouthome.png" alt="PKR Estates residence" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative w-full px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16 overflow-hidden" style={{ backgroundColor: CREAM }}>
        <div className="max-w-[1600px] mx-auto relative">
          <div className="vm-grid grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 relative z-10">
            <div className="vm-block max-w-full sm:max-w-[420px]">
              <h2 className="relative text-[32px] sm:text-[42px] md:text-[52px] font-light mb-5 sm:mb-6 leading-none pl-3 sm:pl-0" style={{ color: GOLD_DEEP }}>
                <span className="absolute -left-1 sm:-left-4 -top-2 text-[28px] sm:text-[36px]" style={{ color: GOLD_DEEP }}>
                  &ldquo;
                </span>
                Our Vision
              </h2>
              <p className="text-[13.5px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-neutral-600 relative">
                To be the most trusted and admired real estate developer in South India, known for
                crafting sustainable communities that enrich lives and stand the test of time. Our
                goal is to deliver 10 million sq.ft. of premium living spaces across Chennai and
                beyond, while creating a positive, growth-driven environment for our 500+ team
                members by 2030.
                <span className="text-lg font-bold ml-1" style={{ color: GOLD_DEEP }}>
                  &rdquo;
                </span>
              </p>
            </div>

            <div className="vm-block max-w-full sm:max-w-[420px] lg:ml-auto lg:text-right">
              <h2 className="relative text-[32px] sm:text-[42px] md:text-[52px] font-light mb-5 sm:mb-6 leading-none pl-3 sm:pl-0 lg:pl-0 lg:text-right" style={{ color: GOLD_DEEP }}>
                <span className="lg:hidden absolute -left-1 sm:-left-4 -top-2 text-[28px] sm:text-[36px]" style={{ color: GOLD_DEEP }}>
                  &ldquo;
                </span>
                <span className="hidden lg:inline text-[36px] mr-1" style={{ color: GOLD_DEEP }}>
                  &ldquo;
                </span>
                Our Mission
              </h2>
              <p className="text-[13.5px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-neutral-600">
                To deliver exceptional homes with a focus on customer satisfaction. We aim to provide
                families with the homes of their dreams, offering quality construction, value for
                money, and environmental responsibility. We will achieve this through trusted
                vendors, an innovative and passionate workforce, and ethical business practices, as
                we strive to build a better future for all.
                <span className="text-lg font-bold ml-1" style={{ color: GOLD_DEEP }}>
                  &rdquo;
                </span>
              </p>
            </div>
          </div>

          <div className="vm-image relative w-full max-w-[320px] sm:max-w-[460px] md:max-w-[620px] mx-auto -mt-8 sm:-mt-12 md:-mt-28">
            <img src="/about3.png" alt="Vision and Mission" className="w-[1200px] h-autox object-contain" />
          </div>
        </div>
      </section>

      {/* Why Choose PKR Estates Section */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#fff" }}>
        <div className="relative max-w-[1700px] mx-auto flex flex-col lg:flex-row items-stretch rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Left: text + features */}
          <div className="flex-1 px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-16 lg:py-20 flex flex-col justify-center">
            <div className="wc-head mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
                <span className="wc-eyebrow-line h-[2px] w-10 rounded-full" style={{ backgroundColor: GOLD }} />
                <span className="wc-eyebrow-text text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.28em]" style={{ color: GOLD_DEEP }}>
                  EXPLORE
                </span>
              </div>
              <h2 className="text-2xl sm:text-[28px] md:text-[36px] font-bold tracking-tight" style={{ color: INK }}>
                <span className="wc-title-word inline-block overflow-hidden">
                  <span className="inline-block">Why Choose PKR Estates?</span>
                </span>
              </h2>
            </div>

            <div className="wc-grid grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-8 sm:gap-y-10 max-w-full sm:max-w-[600px]">
              {[
                { icon: MapPin, label: ["PRIME", "LOCATIONS"] },
                { icon: Building, label: ["IN-HOUSE", "CONSTRUCTION"] },
                { icon: ShieldCheck, label: ["SUPERIOR", "QUALITY"] },
                { icon: Clock3, label: ["ON-TIME", "DELIVERY"] },
                { icon: HandCoins, label: ["AFFORDABLE", "PRICE"] },
                { icon: Star, label: ["TOP-CLASS", "AMENITIES"] },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="wc-feature flex flex-col items-center text-center">
                    <Icon className="w-8 h-8 sm:w-9 sm:h-9 mb-2.5 sm:mb-3" strokeWidth={1.6} style={{ color: GOLD_DEEP }} />
                    <p className="text-[13px] sm:text-sm font-bold uppercase leading-tight m-0" style={{ color: INK }}>
                      {item.label[0]}
                      <br />
                      {item.label[1]}
                    </p>
                    <span className="block h-px w-8 mt-2.5 sm:mt-3" style={{ backgroundColor: GOLD }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: building image */}
          <div className="wc-photo-wrap flex-1 relative min-h-[240px] sm:min-h-[320px] lg:min-h-0 overflow-hidden">
            <img src="/gurudev.png" alt="PKR Estates building" className="wc-photo w-full h-full object-cover object-bottom" />
          </div>
        </div>
      </section>

      {/* Core Competencies Section */}
      <section
        className="relative w-full overflow-hidden px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="relative max-w-[1500px] mx-auto text-center">
          <div className="cc-head">
            <h2 className="text-lg sm:text-[22px] md:text-[30px] font-bold tracking-tight mb-5 sm:mb-6 leading-snug">
              {"CORE COMPETENCIES: PRECISION, ACCOUNTABILITY, EXECUTIONAL RIGOR"
                .split(" ")
                .map((word, i) => (
                  <span key={i} className="cc-title-word inline-block overflow-hidden mr-[0.28em]" style={{ color: INK }}>
                    <span className="inline-block">{word}</span>
                  </span>
                ))}
            </h2>

            <p className="cc-copy mx-auto max-w-[900px] text-[13.5px] sm:text-[15px] leading-[1.75] sm:leading-[1.8] text-neutral-600 mb-10 sm:mb-14">
              Our vertically integrated construction arm ensures absolute control over build
              quality, execution timelines, and operational safety. Every phase&mdash;from
              structural engineering and materials procurement to interior design and
              post-handover maintenance&mdash;is managed in-house for optimal coordination and
              performance. This comprehensive delivery model ensures lifecycle excellence for
              every PKR Estates home.
            </p>
          </div>

          <div className="cc-grid grid grid-cols-2 sm:flex sm:flex-wrap items-start justify-center gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-9 sm:gap-y-12">
            {[
              { icon: ThumbsUp, label: ["CUSTOMER", "OBSESSION"] },
              { icon: Medal, label: ["QUALITY"] },
              { icon: SafetyShield, label: ["SAFETY"] },
              { icon: Handshake, label: ["INTEGRITY"] },
              { icon: Timer, label: ["ONTIME DELIVERY"] },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="cc-item flex flex-col items-center text-center w-full sm:w-[140px]">
                  <Icon className="w-9 h-9 sm:w-11 sm:h-11 mb-3.5 sm:mb-5" strokeWidth={1.3} style={{ color: INK }} />
                  <p className="text-[13px] sm:text-sm font-bold uppercase leading-tight m-0" style={{ color: INK }}>
                    {item.label.map((line, j) => (
                      <span key={j}>
                        {line}
                        {j < item.label.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
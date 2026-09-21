// src/app/aboutus/page.js
'use client'

import { Figtree } from "next/font/google";
import {
  Award,
  Users,
  Building2,
  Ruler,
  ArrowRight,
  MapPin,
  Building,
  ShieldCheck,
  Clock3,
  HandCoins,
  Star,
} from "lucide-react";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const TEXT_CHARCOAL = "#2D3A46";
const LIGHT_BLUE = "#E8F0F9";

export default function AboutUsPage() {
  return (
    <main className={`${figtree.className} min-h-screen relative overflow-x-hidden`}>
      {/*
        ===================== HERO SECTION =====================
      */}
      <section className="relative w-full bg-white">
        {/* Mobile-only banner */}
        <div
          className="block sm:hidden relative w-full bg-[#333] bg-cover bg-center"
          style={{ backgroundImage: `url(/gurumob.jpeg)`, aspectRatio: "380 / 700" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/10" />
        </div>

        {/* Tablet & up banner */}
        <div
          className="hidden sm:flex relative w-full h-[420px] md:h-[560px] lg:h-[680px] xl:h-[750px] 2xl:h-[860px] bg-[#333] bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url(/about.jpeg)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent" />
        </div>
      </section>

      {/* ===================== ENGINEERING YOUR DREAM HOME ===================== */}
      <section className="w-full px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-16 xl:px-20 2xl:px-28 2xl:py-10 overflow-hidden">
        <div className="max-w-[1680px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.15fr_0.85fr] gap-7 sm:gap-12 md:gap-10 lg:gap-8 xl:gap-12 items-center">
          
          {/* Copy block */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-3 sm:mb-5">
              <span
                className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] sm:tracking-[0.28em]"
                style={{ color: DEEP_NAVY }}
              >
                BUILT ON TRUST
              </span>
            </div>

            <h2
              className="text-[24px] sm:text-[34px] md:text-[38px] lg:text-[42px] xl:text-[48px] 2xl:text-[54px] leading-[1.12] font-semibold mb-3 sm:mb-5"
              style={{ color: DEEP_NAVY }}
            >
              Engineering
              <br />
              <span style={{ color: DEEP_NAVY }}>Your Dream Home.</span>
            </h2>

            <p
              className="text-[13px] xl:text-[15px] leading-[1.65] mb-4 sm:mb-6 max-w-full sm:max-w-[420px]"
              style={{ color: TEXT_CHARCOAL }}
            >
              Enhancing lifestyles through quality homes with essential luxuries, fitting within your budget.
            </p>

            <p
              className="text-[12.5px] sm:text-sm xl:text-[15px] leading-[1.7] sm:leading-[1.9] mb-6 sm:mb-8 max-w-full sm:max-w-[440px] xl:max-w-[480px]"
              style={{ color: TEXT_CHARCOAL }}
            >
              As a trusted construction company in Chennai, PKR Estates, with over a decade of
              experience, specializes in creating quality homes that enhance lifestyles. Each project
              is uniquely designed to meet homebuyers&apos; needs, offering convenience and comfort.
              Committed to providing essential luxuries at affordable prices, our properties are known
              for their aesthetics, amenities, and accessibility to essential facilities. Choose PKR
              Estates for your ideal home.
            </p>

            <a
              href="#know-more"
              className="group inline-flex items-center gap-2.5 text-[11px] sm:text-[13px] font-bold tracking-[1px] uppercase no-underline px-5 sm:px-7 py-3 sm:py-4 rounded-full transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start shadow-[0_8px_20px_-8px_rgba(15,58,107,0.5)] hover:shadow-[0_14px_32px_-8px_rgba(15,58,107,0.65)] hover:-translate-y-0.5"
              style={{ backgroundColor: DEEP_NAVY, color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
            >
              Know More About PKR Estates
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:gap-6">
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
                  className="rounded-2xl px-3.5 py-5 sm:px-6 sm:py-8 xl:px-7 xl:py-9 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
                  style={{ backgroundColor: "#fff", boxShadow: "0 4px 20px rgba(15,58,107,0.06)" }}
                >
                  <div
                    className="w-11 h-11 sm:w-14 sm:h-14 xl:w-16 xl:h-16 rounded-full flex items-center justify-center mb-2.5 sm:mb-4"
                    style={{ backgroundColor: LIGHT_BLUE }}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6 xl:w-7 xl:h-7"
                      strokeWidth={1.5}
                      style={{ color: DEEP_NAVY }}
                    />
                  </div>
                  <p className="m-0 mb-2 sm:mb-3 leading-none">
                    <span
                      className="text-[24px] sm:text-[34px] md:text-[36px] xl:text-[42px] 2xl:text-[46px] font-bold"
                      style={{ color: DEEP_NAVY }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-sm sm:text-lg xl:text-xl font-bold align-top"
                      style={{ color: DEEP_NAVY }}
                    >
                      {stat.suffix}
                    </span>
                  </p>
                  <p
                    className="text-[9.5px] sm:text-[12px] xl:text-[13px] tracking-[0.4px] sm:tracking-[1px] font-semibold uppercase m-0 leading-relaxed"
                    style={{ color: TEXT_CHARCOAL }}
                  >
                    {stat.label[0]}
                    <br />
                    {stat.label[1]}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Image — FIXED to show full image */}
          <div className="relative w-full h-auto overflow-hidden rounded-2xl md:col-span-2 lg:col-span-1">
            <img
              src="/a2.png"
              alt="PKR Estates residence"
              className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>
      </section>

      {/* ===================== VISION & MISSION ===================== */}
      <section className="relative w-full px-4 py-12 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-16 xl:px-20 2xl:px-28 overflow-hidden">
        <div className="max-w-[1680px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px_1fr] xl:grid-cols-[1fr_380px_1fr] 2xl:grid-cols-[1fr_420px_1fr] gap-8 sm:gap-14 lg:gap-10 xl:gap-14 items-center">

            {/* Vision */}
            <div className="order-1 text-left max-w-full sm:max-w-[420px] lg:max-w-none lg:justify-self-end">
              <h2
                className="text-[24px] sm:text-[34px] md:text-[38px] lg:text-[40px] xl:text-[44px] font-semibold mb-4 sm:mb-5 leading-[1.1]"
                style={{ color: DEEP_NAVY }}
              >
                Our Vision
              </h2>
              <p
                className="text-[13px] sm:text-[15px] xl:text-[15.5px] leading-[1.75] sm:leading-[1.85]"
                style={{ color: TEXT_CHARCOAL }}
              >
                To be the most trusted and admired real estate developer in South India, known for
                crafting sustainable communities that enrich lives and stand the test of time. Our
                goal is to deliver 10 million sq.ft. of premium living spaces across Chennai and
                beyond, while creating a positive, growth-driven environment for our 500+ team
                members by 2030.
              </p>
            </div>

            {/* Center video */}
            <div className="order-2 lg:order-2 justify-self-center relative">
              <div
                className="relative w-full max-w-[180px] sm:max-w-[240px] md:max-w-[260px] xl:max-w-[300px] 2xl:max-w-[340px] mx-auto aspect-[9/16] rounded-[24px] sm:rounded-[28px] overflow-hidden"
                style={{
                  boxShadow: "0 30px 60px -20px rgba(15,58,107,0.35), 0 0 0 1px rgba(15,58,107,0.06)",
                }}
              >
                <video
                  src="/locker.mp4"
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[28px]"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)" }}
                />
              </div>
              <div
                className="hidden sm:block absolute -z-10 rounded-full"
                style={{
                  width: 300,
                  height: 300,
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background:
                    "radial-gradient(circle, rgba(15,58,107,0.06) 0%, rgba(15,58,107,0) 70%)",
                }}
              />
            </div>

            {/* Mission */}
            <div className="order-3 text-left lg:text-right max-w-full sm:max-w-[420px] lg:max-w-none lg:justify-self-start">
              <h2
                className="text-[24px] sm:text-[34px] md:text-[38px] lg:text-[40px] xl:text-[44px] font-semibold mb-4 sm:mb-5 leading-[1.1]"
                style={{ color: DEEP_NAVY }}
              >
                Our Mission
              </h2>
              <p
                className="text-[13px] sm:text-[15px] xl:text-[15.5px] leading-[1.75] sm:leading-[1.85]"
                style={{ color: TEXT_CHARCOAL }}
              >
                To deliver exceptional homes with a focus on customer satisfaction. We aim to provide
                families with the homes of their dreams, offering quality construction, value for
                money, and environmental responsibility. We will achieve this through trusted
                vendors, an innovative and passionate workforce, and ethical business practices, as
                we strive to build a better future for all.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===================== WHY CHOOSE PKR ESTATES ===================== */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#fff" }}>
        <div className="relative max-w-[1760px] mx-auto flex flex-col lg:flex-row items-stretch rounded-2xl sm:rounded-3xl overflow-hidden">
          
          {/* Left: text + features */}
          <div className="flex-1 px-4 py-10 sm:px-6 sm:py-16 md:px-8 md:py-18 lg:px-16 lg:py-20 xl:px-20 xl:py-24 flex flex-col justify-center">
            <div className="mb-6 sm:mb-10">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span
                  className="text-[10px] sm:text-xs font-semibold tracking-[0.18em] sm:tracking-[0.28em]"
                  style={{ color: DEEP_NAVY }}
                >
                  EXPLORE
                </span>
              </div>
              <h2
                className="text-xl sm:text-[28px] md:text-[32px] lg:text-[36px] xl:text-[40px] font-bold tracking-tight"
                style={{ color: DEEP_NAVY }}
              >
                Why Choose PKR Estates?
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 xl:gap-x-10 gap-y-6 sm:gap-y-10 xl:gap-y-12 max-w-full sm:max-w-[600px] xl:max-w-[680px]">
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
                  <div key={i} className="flex flex-col items-center text-center group">
                    <div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2 sm:mb-3 transition-transform duration-300 group-hover:-translate-y-1"
                      style={{ backgroundColor: LIGHT_BLUE }}
                    >
                      <Icon
                        className="w-5 h-5 sm:w-7 sm:h-7 xl:w-8 xl:h-8"
                        strokeWidth={1.6}
                        style={{ color: DEEP_NAVY }}
                      />
                    </div>
                    <p
                      className="text-[11px] sm:text-[13px] xl:text-sm font-bold uppercase leading-tight m-0"
                      style={{ color: DEEP_NAVY }}
                    >
                      {item.label[0]}
                      <br />
                      {item.label[1]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: building image — FIXED to show full image */}
          <div className="flex-1 relative min-h-[220px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-0 overflow-hidden bg-gray-50 flex items-center justify-center">
            <img
              src="/a4.png"
              alt="PKR Estates building"
              className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
            />
          </div>
          
        </div>
      </section>

    </main>
  );
}
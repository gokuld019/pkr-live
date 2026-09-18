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
    <main className={`${figtree.className} min-h-screen relative`}>
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[780px] flex overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 mt-3 sm:mx-4 sm:mt-4 md:mx-8 md:mt-8">
          <div
            className="flex-[1.7] relative bg-cover bg-center mr-23"
            style={{ backgroundImage: `url(/a01.jpeg)` }}
          >
          </div>
        </div>
      </section>

      {/* Engineering Your Dream Home Section */}
      <section className="w-full px-4 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16 overflow-hidden" >
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.15fr_0.85fr] gap-10 sm:gap-12 lg:gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span
                className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.28em]"
                style={{ color: DEEP_NAVY }}
              >
                BUILT ON TRUST
              </span>
            </div>

            <h2
              className="text-[28px] sm:text-[36px] md:text-[44px] leading-[1.15] font-semibold mb-4 sm:mb-5"
              style={{ color: DEEP_NAVY }}
            >
              <span className="inline-block">
                <span className="inline-block">Engineering</span>
              </span>
              <br />
              <span className="inline-block">
                <span className="inline-block" style={{ color: DEEP_NAVY }}>
                  Your Dream Home.
                </span>
              </span>
            </h2>

            <p
              className="text-sm leading-[1.7] mb-5 sm:mb-6 max-w-full sm:max-w-[420px]"
              style={{ color: TEXT_CHARCOAL }}
            >
              Enhancing lifestyles through quality homes with essential luxuries, fitting within your budget.
            </p>

            <p
              className="text-[13.5px] sm:text-sm leading-[1.8] sm:leading-[1.9] mb-7 sm:mb-8 max-w-full sm:max-w-[440px]"
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
              className="group inline-flex items-center gap-2.5 text-[12px] sm:text-[13px] font-bold tracking-[1px] uppercase no-underline px-6 sm:px-7 py-3.5 sm:py-4 rounded-md transition-all duration-300 w-full sm:w-auto justify-center sm:justify-start shadow-[0_8px_20px_-8px_rgba(15,58,107,0.5)] hover:shadow-[0_12px_28px_-8px_rgba(15,58,107,0.6)] hover:-translate-y-0.5"
              style={{ backgroundColor: DEEP_NAVY, color: "#fff" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
            >
              Know More About PKR Estates
              <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:gap-5">
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
                  className="rounded-2xl px-4 py-6 sm:px-6 sm:py-8 flex flex-col items-center text-center"
                  style={{ backgroundColor: "#fff", boxShadow: "0 4px 20px rgba(15,58,107,0.06)" }}
                >
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-3 sm:mb-4"
                    style={{ backgroundColor: LIGHT_BLUE }}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      strokeWidth={1.5}
                      style={{ color: DEEP_NAVY }}
                    />
                  </div>
                  <p className="m-0 mb-2.5 sm:mb-3 leading-none">
                    <span
                      className="text-[28px] sm:text-[34px] md:text-[40px] font-bold"
                      style={{ color: DEEP_NAVY }}
                    >
                      {stat.value}
                    </span>
                    <span
                      className="text-base sm:text-lg md:text-xl font-bold align-top"
                      style={{ color: DEEP_NAVY }}
                    >
                      {stat.suffix}
                    </span>
                  </p>
                  <p
                    className="text-[10.5px] sm:text-[12px] tracking-[0.5px] sm:tracking-[1px] font-semibold uppercase m-0 leading-relaxed"
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

          <div className="relative w-full h-[340px] sm:h-[420px] md:h-[480px] lg:h-[560px] overflow-hidden rounded-2xl">
            <img src="/a2.png" alt="PKR Estates residence" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="relative w-full px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16 overflow-hidden">
        <div className="max-w-[1600px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px_1fr] gap-12 sm:gap-14 lg:gap-10 items-center">

            {/* Vision — left */}
            <div className="order-1 lg:order-1 text-left max-w-full sm:max-w-[420px] lg:max-w-none lg:justify-self-end">
              {/* <span
                className="text-[11px] font-semibold tracking-[0.28em] mb-3 block"
                style={{ color: DEEP_NAVY, opacity: 0.55 }}
              >
                01 &mdash; PURPOSE
              </span> */}
              <h2
                className="text-[30px] sm:text-[38px] md:text-[44px] font-semibold mb-5 leading-[1.1]"
                style={{ color: DEEP_NAVY }}
              >
                Our Vision
              </h2>
              <div
                className="w-10 h-[3px] rounded-full mb-6"
                style={{ backgroundColor: DEEP_NAVY }}
              />
              <p
                className="text-[14px] sm:text-[15px] leading-[1.85]"
                style={{ color: TEXT_CHARCOAL }}
              >
                To be the most trusted and admired real estate developer in South India, known for
                crafting sustainable communities that enrich lives and stand the test of time. Our
                goal is to deliver 10 million sq.ft. of premium living spaces across Chennai and
                beyond, while creating a positive, growth-driven environment for our 500+ team
                members by 2030.
              </p>
            </div>

            {/* Center — compact sleek video frame */}
            <div className="order-2 lg:order-2 justify-self-center relative">
              <div
                className="relative w-full max-w-[220px] sm:max-w-[260px] mx-auto aspect-[9/16] rounded-[28px] overflow-hidden"
                style={{
                  boxShadow: "0 30px 60px -20px rgba(15,58,107,0.35), 0 0 0 1px rgba(15,58,107,0.06)",
                }}
              >
                <video
                  src="/locker.mp4"
                  className="w-full w-[250px] h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-[28px]"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)" }}
                />
              </div>
              {/* decorative ring accent */}
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

            {/* Mission — right */}
            <div className="order-3 lg:order-3 text-left lg:text-right max-w-full sm:max-w-[420px] lg:max-w-none lg:justify-self-start">
              {/* <span
                className="text-[11px] font-semibold tracking-[0.28em] mb-3 block"
                style={{ color: DEEP_NAVY, opacity: 0.55 }}
              >
                02 &mdash; DIRECTION
              </span> */}
              <h2
                className="text-[30px] sm:text-[38px] md:text-[44px] font-semibold mb-5 leading-[1.1]"
                style={{ color: DEEP_NAVY }}
              >
                Our Mission
              </h2>
              <div
                className="w-10 h-[3px] rounded-full mb-6 lg:ml-auto"
                style={{ backgroundColor: DEEP_NAVY }}
              />
              <p
                className="text-[14px] sm:text-[15px] leading-[1.85]"
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

      {/* Why Choose PKR Estates Section */}
      <section className="relative w-full overflow-hidden" style={{ backgroundColor: "#fff" }}>
        <div className="relative max-w-[1700px] mx-auto flex flex-col lg:flex-row items-stretch rounded-2xl sm:rounded-3xl overflow-hidden">
          {/* Left: text + features */}
          <div className="flex-1 px-4 py-12 sm:px-6 sm:py-16 md:px-10 lg:px-16 lg:py-20 flex flex-col justify-center">
            <div className="mb-8 sm:mb-10">
              <div className="flex items-center gap-3 mb-3.5 sm:mb-4">
                <span
                  className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.28em]"
                  style={{ color: DEEP_NAVY }}
                >
                  EXPLORE
                </span>
              </div>
              <h2
                className="text-2xl sm:text-[28px] md:text-[36px] font-bold tracking-tight"
                style={{ color: DEEP_NAVY }}
              >
                <span className="inline-block">
                  <span className="inline-block">Why Choose PKR Estates?</span>
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-8 sm:gap-y-10 max-w-full sm:max-w-[600px]">
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
                  <div key={i} className="flex flex-col items-center text-center">
                    <Icon
                      className="w-8 h-8 sm:w-9 sm:h-9 mb-2.5 sm:mb-3"
                      strokeWidth={1.6}
                      style={{ color: DEEP_NAVY }}
                    />
                    <p
                      className="text-[13px] sm:text-sm font-bold uppercase leading-tight m-0"
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

          {/* Right: building image */}
          <div className="flex-1 relative min-h-[240px] sm:min-h-[320px] lg:min-h-0 overflow-hidden">
            <img src="/a4.png" alt="PKR Estates building" className="w-full h-full object-cover object-bottom" />
          </div>
        </div>
      </section>

    </main>
  );
}
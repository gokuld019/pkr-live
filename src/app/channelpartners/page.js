"use client";

import Image from "next/image";
import { Figtree } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

function Reveal({ children, delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transform-gpu transition-all duration-700 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

export default function ChannelPartnersHero() {
  const features = [
    { icon: "diamond", title: "Attractive Commissions", desc: "Earn competitive rewards for your efforts." },
    { icon: "team", title: "Dedicated Partner Support", desc: "End-to-end assistance from our expert team." },
    { icon: "growth", title: "Exclusive Project Access", desc: "Get early access to new launches and inventory." },
    { icon: "handshake", title: "Long-Term Growth", desc: "Build a strong and lasting partnership." },
  ];

  const steps = [
    { number: "01", title: "Register", desc: "Share your basic details with us." },
    { number: "02", title: "Get Verified", desc: "Our team will review and verify your application." },
    { number: "03", title: "Start Selling", desc: "Get access to project details, tools and support." },
    { number: "04", title: "Grow Together", desc: "Earn rewards and build a long-term relationship." },
  ];

  const benefits = [
    { icon: "headset", title: "Marketing Support" },
    { icon: "training", title: "Training & Enablement" },
    { icon: "tag", title: "Sales Collaterals" },
    { icon: "events", title: "Exclusive Events" },
    { icon: "gift", title: "Incentives & Rewards" },
    { icon: "person", title: "Relationship Management" },
  ];

  const icons = {
    diamond: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#a67c2e] sm:h-8 sm:w-8">
        <path d="M6 3h12l3 5-9 13L3 8l3-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 8h18M9 3l3 5-3 13M15 3l-3 5 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    team: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#a67c2e] sm:h-8 sm:w-8">
        <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 20c0-2.8 2-5 5-5h6c3 0 5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 19c0-2 1.3-3.6 3-4M22 19c0-2-1.3-3.6-3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    growth: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#a67c2e] sm:h-8 sm:w-8">
        <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 6l4-2 2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    handshake: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#a67c2e] sm:h-8 sm:w-8">
        <path d="M2 12l4-3 4 2 4-3 4 2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 9l3 6 3-2 3 3 3-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    headset: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#a67c2e] sm:h-7 sm:w-7">
        <path d="M4 13a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M19 19v1a3 3 0 0 1-3 3h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    training: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#a67c2e] sm:h-7 sm:w-7">
        <path d="M7 3h8l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M15 3v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12h3M9 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9.5" cy="17.5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    tag: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#a67c2e] sm:h-7 sm:w-7">
        <path d="M12 2 4 10v10a1 1 0 0 0 1 1h6l9-9-8-10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="1.3" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
    events: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#a67c2e] sm:h-7 sm:w-7">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 8a4 4 0 1 1 8 0M4 21c0-3.3 2.7-6 6-6M20 21c0-3.3-2.7-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gift: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#a67c2e] sm:h-7 sm:w-7">
        <rect x="4" y="9" width="16" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 13h16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 9v11" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 9c-1.5 0-4-1-4-3a2 2 0 1 1 4 0 2 2 0 1 1 4 0c0 2-2.5 3-4 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    person: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#a67c2e] sm:h-7 sm:w-7">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-gray-400">
        <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-gray-400">
        <path d="M6 3h3l2 5-2 1a10 10 0 0 0 5 5l1-2 5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 4 5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
    mail: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-gray-400">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 6l9 7 9-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    briefcase: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-gray-400">
        <rect x="3" y="8" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    pin: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-gray-400">
        <path d="M12 21s7-6.5 7-11.5A7 7 0 0 0 5 9.5C5 14.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="12" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    note: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-gray-400">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    shield: (
      <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5 shrink-0 text-gray-400">
        <path d="M12 2l7 3v6c0 5-3.5 8.5-7 11-3.5-2.5-7-6-7-11V5l7-3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  };

  return (
    <section className={`relative w-full ${figtree.className}`}>
      {/* Hero Image */}
      <div className="relative w-full">
        <Image
          src="/cp.png"
          alt="PKR Estates — An Affordable Home Company"
          width={1920}
          height={800}
          className="h-auto w-full mr-10"
          priority
        />
      </div>

      {/* Why Partner Section */}
      <div className="w-full bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-full lg:max-w-lg">
            <Reveal>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#a67c2e] sm:mb-3 sm:text-xs">
                Why Partner With PKR Estates
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mb-3.5 text-2xl font-semibold leading-tight text-gray-900 sm:mb-4 sm:text-3xl lg:text-4xl">
                A Trusted Brand
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>for a Bigger Tomorrow
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mb-5 text-sm leading-relaxed text-gray-500 sm:mb-6">
                At PKR Estates, our channel partners are more than business
                associates — they are valued growth partners. With a legacy of
                quality, transparency, and care, we create opportunities that
                help you grow with us.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-full bg-[#a67c2e] px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#8f6a26] hover:shadow-lg hover:shadow-[#a67c2e]/30 sm:px-6"
              >
                Partner With a Leading Brand
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </Reveal>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-6 sm:gap-7 md:grid-cols-4 md:gap-8">
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 100} className="flex flex-col items-start gap-3 sm:gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f6efe2] transition-transform duration-300 hover:-translate-y-1 hover:shadow-md sm:h-16 sm:w-16">
                  {icons[f.icon]}
                </div>
                <div>
                  <h3 className="mb-1 text-[13px] font-bold text-gray-900 sm:text-sm">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-500">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Your Journey as a Partner Section */}
      <div className="w-full bg-[#f7f3ec] px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="flex-1">
            <Reveal>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#a67c2e] sm:mb-3 sm:text-xs">
                A Simple Process
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mb-3 text-2xl font-semibold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                Your Journey as a Partner
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mb-8 text-sm leading-relaxed text-gray-500 sm:mb-10">
                Get started in just a few steps and unlock a world of opportunities.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={i} delay={i * 120} className="relative flex flex-col items-start">
                  <div className="mb-3.5 flex items-center sm:mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#a67c2e] text-[13px] font-bold text-[#a67c2e] transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-14 sm:text-sm">
                      {s.number}
                    </div>
                    {i < steps.length - 1 && (
                      <span aria-hidden="true" className="ml-3 hidden text-[#a67c2e] md:inline">
                        →
                      </span>
                    )}
                  </div>
                  <h3 className="mb-1 text-[13px] font-bold text-gray-900 sm:text-sm">{s.title}</h3>
                  <p className="text-xs leading-relaxed text-gray-500">{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal
            delay={200}
            className="flex flex-col items-start border-t border-gray-300 pt-8 lg:w-64 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          >
            <p className="mb-4 text-xl font-semibold italic leading-tight text-[#a67c2e] sm:text-2xl">
              More Opportunities Together
            </p>
            <div className="mb-4 h-px w-10 bg-gray-400" />
            <p className="text-sm leading-relaxed text-gray-600">
              More Homes.
              <br />
              Happier Families.
              <br />
              Stronger Communities.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Partner Benefits Section */}
      <div className="w-full bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-full lg:max-w-md">
            <Reveal>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest text-[#a67c2e] sm:mb-3 sm:text-xs">
                Partner Benefits
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mb-3.5 text-2xl font-semibold leading-tight text-gray-900 sm:mb-4 sm:text-3xl lg:text-4xl">
                Everything You Need
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>to Succeed
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-sm leading-relaxed text-gray-500">
                We provide the right tools, training and support to help you grow faster in real estate.
              </p>
            </Reveal>
          </div>

          <div className="grid flex-1 grid-cols-3 gap-5 sm:gap-6 md:grid-cols-6 md:gap-8">
            {benefits.map((b, i) => (
              <Reveal key={i} delay={i * 80} className="flex flex-col items-center text-center">
                <div className="mb-2.5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f6efe2] transition-transform duration-300 hover:-translate-y-1 hover:shadow-md sm:mb-3 sm:h-16 sm:w-16">
                  {icons[b.icon]}
                </div>
                <h3 className="text-[11px] font-bold leading-snug text-gray-900 sm:text-xs">{b.title}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Let's Grow Together — Enquiry Section */}
      <div className="relative w-full overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16">
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full bg-[#a67c2e]/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-[#a67c2e]/5 blur-3xl sm:h-96 sm:w-96" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Left content */}
          <div className="max-w-full lg:max-w-md">
            <Reveal>
              <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-widest text-[#a67c2e] sm:mb-4 sm:text-xs">
                Become a Channel Partner
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mb-4 text-3xl font-semibold leading-tight text-gray-900 sm:mb-5 sm:text-4xl lg:text-5xl">
                Let&apos;s Grow
                <br />
                Together
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mb-5 h-px w-12 bg-[#a67c2e] sm:mb-6" />
            </Reveal>
            <Reveal delay={220}>
              <p className="text-sm leading-relaxed text-gray-500">
                Share a few details and our experts will reach out to you
                shortly.
              </p>
            </Reveal>
          </div>

          {/* Right form card */}
          <Reveal
            delay={160}
            className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-2xl transition-shadow duration-300 hover:shadow-[0_20px_60px_-15px_rgba(166,124,46,0.25)] sm:p-6 md:p-8 lg:max-w-2xl"
          >
            <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors duration-300 focus-within:border-[#a67c2e]/60 sm:py-3.5">
                {icons.user}
                <input
                  type="text"
                  placeholder="Full Name *"
                  className="w-full min-w-0 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors duration-300 focus-within:border-[#a67c2e]/60 sm:py-3.5">
                {icons.phone}
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  className="w-full min-w-0 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors duration-300 focus-within:border-[#a67c2e]/60 sm:py-3.5">
                {icons.mail}
                <input
                  type="email"
                  placeholder="Email Address *"
                  className="w-full min-w-0 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors duration-300 focus-within:border-[#a67c2e]/60 sm:py-3.5">
                {icons.briefcase}
                <select className="w-full min-w-0 appearance-none bg-transparent text-sm text-gray-500 outline-none">
                  <option>Select Your Profession</option>
                  <option>Broker</option>
                  <option>Agent</option>
                  <option>Consultant</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors duration-300 focus-within:border-[#a67c2e]/60 sm:col-span-2 sm:py-3.5">
                {icons.pin}
                <input
                  type="text"
                  placeholder="Select City"
                  className="w-full min-w-0 bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 transition-colors duration-300 focus-within:border-[#a67c2e]/60 sm:col-span-2 sm:py-3.5">
                <div className="mt-0.5">{icons.note}</div>
                <textarea
                  placeholder="Tell us about yourself (Optional)"
                  rows={2}
                  className="w-full min-w-0 resize-none bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#c99a4a] to-[#a67c2e] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#a67c2e]/20 transition-all duration-300 hover:shadow-[#a67c2e]/40 hover:brightness-105 active:scale-[0.99] sm:mt-6 sm:py-4"
            >
              Submit Enquiry
              <span aria-hidden="true">→</span>
            </button>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-gray-500">
              {icons.shield}
              We respect your privacy. Your information is safe with us.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
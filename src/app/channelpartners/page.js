"use client";

import Image from "next/image";
import { Figtree } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

/* ------------------------------------------------------------------ */
/*  THEME TOKENS                                                       */
/* ------------------------------------------------------------------ */
const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const DEEP_NAVY_DARK = "#0A2B50";
const TEXT_CHARCOAL = "#2D3A46";
const LIGHT_BLUE = "#E8F0F9";
const LIGHT_BLUE_SOFT = "#F0F6FC";
const LIGHT_BLUE_DEEP = "#D5E1ED";
const LINE = "#E0E8F0";

/* ------------------------------------------------------------------ */
/*  API CONFIG                                                         */
/* ------------------------------------------------------------------ */
const CHANNEL_PARTNER_API =
  "https://api.crazystory.in/api/channel-partner/register";

const PROFESSIONS = [
  "Broker",
  "Agent",
  "Consultant",
  "Real Estate Agent",
  "Property Dealer",
  "Other",
];

const INITIAL_FORM = {
  full_name: "",
  phone: "",
  email: "",
  profession: "",
  city: "",
  about: "",
};

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

  /* ------------------------------------------------------------------ */
  /*  FORM STATE                                                         */
  /* ------------------------------------------------------------------ */
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [field]: value }));
    setFieldErrors((errs) => {
      if (!errs[field]) return errs;
      const next = { ...errs };
      delete next[field];
      return next;
    });
    if (errorMessage) setErrorMessage("");
  };

  const validate = () => {
    const errs = {};
    if (!form.full_name.trim()) errs.full_name = "Full name is required";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[\d\s+\-()]{7,}$/.test(form.phone.trim()))
      errs.phone = "Enter a valid phone number";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Enter a valid email address";
    if (!form.profession.trim()) errs.profession = "Please select your profession";
    return errs;
  };

  const resetForm = () => {
    setForm(INITIAL_FORM);
    setSubmitted(false);
    setSubmitting(false);
    setSuccessMessage("");
    setErrorMessage("");
    setFieldErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setErrorMessage("");
    const errs = validate();
    if (Object.keys(errs).length) {
      setFieldErrors(errs);
      return;
    }

    setSubmitting(true);
    setFieldErrors({});

    const payload = {
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      profession: form.profession.trim(),
      city: form.city.trim(),
      about: form.about.trim(),
    };

    try {
      const res = await fetch(CHANNEL_PARTNER_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok || !data || data.status !== true) {
        if (data?.errors && typeof data.errors === "object") {
          const mapped = {};
          Object.entries(data.errors).forEach(([key, val]) => {
            mapped[key] = Array.isArray(val) ? val[0] : String(val);
          });
          setFieldErrors(mapped);
        }
        setErrorMessage(
          data?.message ||
            "Something went wrong while submitting your registration. Please try again."
        );
        setSubmitting(false);
        return;
      }

      setSuccessMessage(
        data.message ||
          "Thank you for registering as a channel partner. Our team will contact you soon."
      );
      setSubmitting(false);
      setSubmitted(true);
    } catch (err) {
      console.error("Channel partner submit failed:", err);
      setErrorMessage(
        "We couldn't reach the server. Please check your connection and try again."
      );
      setSubmitting(false);
    }
  };

  const inputWrapperClass = (field) =>
    `flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 transition-colors duration-300 sm:py-3.5 ${
      fieldErrors[field]
        ? "border-red-400 focus-within:border-red-500"
        : "border-gray-200 focus-within:border-[#0F3A6B]/60"
    }`;

  const icons = {
    diamond: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#0F3A6B] sm:h-8 sm:w-8">
        <path d="M6 3h12l3 5-9 13L3 8l3-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M3 8h18M9 3l3 5-3 13M15 3l-3 5 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    team: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#0F3A6B] sm:h-8 sm:w-8">
        <circle cx="12" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="5" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="19" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 20c0-2.8 2-5 5-5h6c3 0 5 2.2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M2 19c0-2 1.3-3.6 3-4M22 19c0-2-1.3-3.6-3-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    growth: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#0F3A6B] sm:h-8 sm:w-8">
        <path d="M4 20V10M10 20V4M16 20v-7M4 20h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 6l4-2 2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    handshake: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#0F3A6B] sm:h-8 sm:w-8">
        <path d="M2 12l4-3 4 2 4-3 4 2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 9l3 6 3-2 3 3 3-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    headset: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#0F3A6B] sm:h-7 sm:w-7">
        <path d="M4 13a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M19 19v1a3 3 0 0 1-3 3h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    training: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#0F3A6B] sm:h-7 sm:w-7">
        <path d="M7 3h8l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M15 3v4h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 12h3M9 15h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9.5" cy="17.5" r="1.2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    tag: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#0F3A6B] sm:h-7 sm:w-7">
        <path d="M12 2 4 10v10a1 1 0 0 0 1 1h6l9-9-8-10Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="1.3" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
    events: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#0F3A6B] sm:h-7 sm:w-7">
        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 8a4 4 0 1 1 8 0M4 21c0-3.3 2.7-6 6-6M20 21c0-3.3-2.7-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    gift: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#0F3A6B] sm:h-7 sm:w-7">
        <rect x="4" y="9" width="16" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 13h16" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 9v11" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 9c-1.5 0-4-1-4-3a2 2 0 1 1 4 0 2 2 0 1 1 4 0c0 2-2.5 3-4 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    person: (
      <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#0F3A6B] sm:h-7 sm:w-7">
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
    check: (
      <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#0F3A6B]" strokeWidth="2.5">
        <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    alert: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0">
        <path d="M12 3l9 16H3l9-16Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 10v4M12 17v.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  };

  return (
    <section className={`relative w-full ${figtree.className}`}>
      {/* Hero Image */}
      <section className="w-full">
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[780px] flex overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 mt-3 sm:mx-4 sm:mt-4 md:mx-8 md:mt-8">
          <div
            className="hero-img flex-[1.7] relative bg-cover bg-center mr-23"
            style={{ backgroundImage: `url(/cp.jpeg)` }}
          />
        </div>
      </section>

      {/* Why Partner Section */}
      <div className="w-full bg-white px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="max-w-full lg:max-w-lg">
            <Reveal>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest sm:mb-3 sm:text-xs" style={{ color: DEEP_NAVY }}>
                Why Partner With PKR Estates
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mb-3.5 text-2xl font-semibold leading-tight sm:mb-4 sm:text-3xl lg:text-4xl" style={{ color: DEEP_NAVY }}>
                A Trusted Brand
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>for a Bigger Tomorrow
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mb-5 text-sm leading-relaxed sm:mb-6" style={{ color: TEXT_CHARCOAL }}>
                At PKR Estates, our channel partners are more than business
                associates — they are valued growth partners. With a legacy of
                quality, transparency, and care, we create opportunities that
                help you grow with us.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <a
                href="#partner-form"
                className="group inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg sm:px-6"
                style={{ backgroundColor: DEEP_NAVY }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER
                  e.currentTarget.style.boxShadow = '0 12px 28px -8px rgba(15,58,107,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = DEEP_NAVY
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Partner With a Leading Brand
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-6 sm:gap-7 md:grid-cols-4 md:gap-8">
            {features.map((f, i) => (
              <Reveal key={i} delay={i * 100} className="flex flex-col items-start gap-3 sm:gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-md sm:h-16 sm:w-16" style={{ backgroundColor: LIGHT_BLUE }}>
                  {icons[f.icon]}
                </div>
                <div>
                  <h3 className="mb-1 text-[13px] font-bold sm:text-sm" style={{ color: DEEP_NAVY }}>{f.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: TEXT_CHARCOAL }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Your Journey as a Partner Section */}
      <div className="w-full px-4 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14 lg:px-16" style={{ backgroundColor: LIGHT_BLUE_SOFT }}>
        <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="flex-1">
            <Reveal>
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest sm:mb-3 sm:text-xs" style={{ color: DEEP_NAVY }}>
                A Simple Process
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mb-3 text-2xl font-semibold leading-tight sm:text-3xl lg:text-4xl" style={{ color: DEEP_NAVY }}>
                Your Journey as a Partner
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mb-8 text-sm leading-relaxed sm:mb-10" style={{ color: TEXT_CHARCOAL }}>
                Get started in just a few steps and unlock a world of opportunities.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-6 sm:gap-y-10 md:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={i} delay={i * 120} className="relative flex flex-col items-start">
                  <div className="mb-3.5 flex items-center sm:mb-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-[13px] font-bold transition-transform duration-300 hover:scale-110 sm:h-14 sm:w-14 sm:text-sm"
                      style={{ borderColor: DEEP_NAVY, color: DEEP_NAVY }}
                    >
                      {s.number}
                    </div>
                    {i < steps.length - 1 && (
                      <span aria-hidden="true" className="ml-3 hidden md:inline" style={{ color: DEEP_NAVY }}>→</span>
                    )}
                  </div>
                  <h3 className="mb-1 text-[13px] font-bold sm:text-sm" style={{ color: DEEP_NAVY }}>{s.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: TEXT_CHARCOAL }}>{s.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal
            delay={200}
            className="flex flex-col items-start border-t pt-8 lg:w-64 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
          >
            <div style={{ borderColor: LINE }} className="hidden" />
            <p className="mb-4 text-xl font-semibold italic leading-tight sm:text-2xl" style={{ color: DEEP_NAVY }}>
              More Opportunities Together
            </p>
            <div className="mb-4 h-px w-10" style={{ backgroundColor: DEEP_NAVY, opacity: 0.4 }} />
            <p className="text-sm leading-relaxed" style={{ color: TEXT_CHARCOAL }}>
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
              <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-widest sm:mb-3 sm:text-xs" style={{ color: DEEP_NAVY }}>
                Partner Benefits
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mb-3.5 text-2xl font-semibold leading-tight sm:mb-4 sm:text-3xl lg:text-4xl" style={{ color: DEEP_NAVY }}>
                Everything You Need
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>to Succeed
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="text-sm leading-relaxed" style={{ color: TEXT_CHARCOAL }}>
                We provide the right tools, training and support to help you grow faster in real estate.
              </p>
            </Reveal>
          </div>

          <div className="grid flex-1 grid-cols-3 gap-5 sm:gap-6 md:grid-cols-6 md:gap-8">
            {benefits.map((b, i) => (
              <Reveal key={i} delay={i * 80} className="flex flex-col items-center text-center">
                <div className="mb-2.5 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-md sm:mb-3 sm:h-16 sm:w-16" style={{ backgroundColor: LIGHT_BLUE }}>
                  {icons[b.icon]}
                </div>
                <h3 className="text-[11px] font-bold leading-snug sm:text-xs" style={{ color: DEEP_NAVY }}>{b.title}</h3>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Let's Grow Together — Enquiry Section */}
      <div
        id="partner-form"
        className="relative w-full overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16"
      >
        {/* Subtle decorative glow */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96" style={{ backgroundColor: 'rgba(15,58,107,0.10)' }} />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96" style={{ backgroundColor: 'rgba(15,58,107,0.05)' }} />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Left content */}
          <div className="max-w-full lg:max-w-md">
            <Reveal>
              <p className="mb-3.5 text-[11px] font-semibold uppercase tracking-widest sm:mb-4 sm:text-xs" style={{ color: DEEP_NAVY }}>
                Become a Channel Partner
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mb-4 text-3xl font-semibold leading-tight sm:mb-5 sm:text-4xl lg:text-5xl" style={{ color: DEEP_NAVY }}>
                Let&apos;s Grow
                <br />
                Together
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <div className="mb-5 h-px w-12 sm:mb-6" style={{ backgroundColor: DEEP_NAVY }} />
            </Reveal>
            <Reveal delay={220}>
              <p className="text-sm leading-relaxed" style={{ color: TEXT_CHARCOAL }}>
                Share a few details and our experts will reach out to you shortly.
              </p>
            </Reveal>
          </div>

          {/* Right form card */}
          <Reveal
            delay={160}
            className="w-full rounded-2xl  bg-white p-5 shadow-2xl transition-shadow duration-300 sm:p-6 md:p-8 lg:max-w-2xl"
            style={{ borderColor: LINE }}
          >
            {submitted ? (
              /* ---------------- SUCCESS STATE ---------------- */
              <div className="flex flex-col items-center gap-4 px-2 py-10 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: LIGHT_BLUE }}>
                  {icons.check}
                </div>
                <h3 className="m-0 text-xl font-semibold" style={{ color: DEEP_NAVY }}>
                  Thank You!
                </h3>
                <p className="m-0 max-w-md text-sm leading-relaxed" style={{ color: TEXT_CHARCOAL }}>
                  {successMessage}
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-3 rounded-xl border bg-white px-6 py-3 text-sm font-semibold transition-all"
                  style={{ borderColor: `${DEEP_NAVY}66`, color: DEEP_NAVY }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LIGHT_BLUE)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  Register Another Partner
                </button>
              </div>
            ) : (
              /* ---------------- FORM STATE ---------------- */
              <form onSubmit={handleSubmit} noValidate>
                {errorMessage && (
                  <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] leading-snug text-red-700">
                    <span className="mt-[1px]">{icons.alert}</span>
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
                  {/* Full Name */}
                  <div className={inputWrapperClass("full_name")}>
                    {icons.user}
                    <div className="w-full min-w-0">
                      <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name *"
                        value={form.full_name}
                        onChange={handleChange("full_name")}
                        className="w-full bg-transparent text-sm outline-none placeholder-gray-400"
                        style={{ color: DEEP_NAVY }}
                      />
                      {fieldErrors.full_name && (
                        <p className="m-0 mt-0.5 text-[11px] text-red-600">{fieldErrors.full_name}</p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div className={inputWrapperClass("phone")}>
                    {icons.phone}
                    <div className="w-full min-w-0">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number *"
                        value={form.phone}
                        onChange={handleChange("phone")}
                        className="w-full bg-transparent text-sm outline-none placeholder-gray-400"
                        style={{ color: DEEP_NAVY }}
                      />
                      {fieldErrors.phone && (
                        <p className="m-0 mt-0.5 text-[11px] text-red-600">{fieldErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div className={inputWrapperClass("email")}>
                    {icons.mail}
                    <div className="w-full min-w-0">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address *"
                        value={form.email}
                        onChange={handleChange("email")}
                        className="w-full bg-transparent text-sm outline-none placeholder-gray-400"
                        style={{ color: DEEP_NAVY }}
                      />
                      {fieldErrors.email && (
                        <p className="m-0 mt-0.5 text-[11px] text-red-600">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Profession */}
                  <div className={inputWrapperClass("profession")}>
                    {icons.briefcase}
                    <div className="w-full min-w-0">
                      <select
                        name="profession"
                        value={form.profession}
                        onChange={handleChange("profession")}
                        className="w-full appearance-none bg-transparent text-sm outline-none"
                        style={{ color: form.profession ? DEEP_NAVY : '#9CA3AF' }}
                      >
                        <option value="" disabled>Select Your Profession *</option>
                        {PROFESSIONS.map((p) => (<option key={p} value={p}>{p}</option>))}
                      </select>
                      {fieldErrors.profession && (
                        <p className="m-0 mt-0.5 text-[11px] text-red-600">{fieldErrors.profession}</p>
                      )}
                    </div>
                  </div>

                  {/* City (full-width) */}
                  <div className={`${inputWrapperClass("city")} sm:col-span-2`}>
                    {icons.pin}
                    <div className="w-full min-w-0">
                      <input
                        type="text"
                        name="city"
                        placeholder="Select City"
                        value={form.city}
                        onChange={handleChange("city")}
                        className="w-full bg-transparent text-sm outline-none placeholder-gray-400"
                        style={{ color: DEEP_NAVY }}
                      />
                    </div>
                  </div>

                  {/* About (full-width) */}
                  <div className={`${inputWrapperClass("about")} sm:col-span-2`}>
                    <div className="mt-0.5">{icons.note}</div>
                    <textarea
                      name="about"
                      placeholder="Tell us about yourself (Optional)"
                      rows={2}
                      value={form.about}
                      onChange={handleChange("about")}
                      className="w-full min-w-0 resize-none bg-transparent text-sm outline-none placeholder-gray-400"
                      style={{ color: DEEP_NAVY }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:brightness-105 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:mt-6 sm:py-4"
                  style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 18px 34px -12px rgba(15,58,107,0.6)')}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 10px 24px -8px rgba(15,58,107,0.4)')}
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Enquiry
                      <span aria-hidden="true">→</span>
                    </>
                  )}
                </button>

                <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs" style={{ color: TEXT_CHARCOAL, opacity: 0.8 }}>
                  {icons.shield}
                  We respect your privacy. Your information is safe with us.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
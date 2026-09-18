"use client";

import { useRef, useEffect } from "react";
import { Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  ArrowRight,
  FileText,
  Percent,
  BookOpen,
  MapPin,
  Phone,
  Clock,
  Users,
  Sprout,
  Building2,
  Star,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const TEXT_CHARCOAL = "#2D3A46";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/pkrestates",
  instagram: "https://www.instagram.com/pkrestates",
  linkedin: "https://www.linkedin.com/company/pkrestates",
  youtube: "https://www.youtube.com/channel/UCqxFo8on9tQNwQq11KNfU2w",
};

const SOCIAL_ICONS = {
  facebook: (
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z" />
  ),
  instagram: (
    <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43-.26.66-.6 1.22-1.15 1.77-.55.55-1.11.9-1.77 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47-.66-.26-1.22-.6-1.77-1.15-.55-.55-.9-1.11-1.15-1.77-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.55-.55 1.11-.9 1.77-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 1.8c-2.67 0-2.99.01-4.04.06-.86.04-1.33.18-1.64.3-.41.16-.71.35-1.02.66-.31.31-.5.61-.66 1.02-.12.31-.26.78-.3 1.64-.05 1.05-.06 1.37-.06 4.04s.01 2.99.06 4.04c.04.86.18 1.33.3 1.64.16.41.35.71.66 1.02.31.31.61.5 1.02.66.31.12.78.26 1.64.3 1.05.05 1.37.06 4.04.06s2.99-.01 4.04-.06c.86-.04 1.33-.18 1.64-.3.41-.16.71-.35 1.02-.66.31-.31.5-.61.66-1.02.12-.31.26-.78.3-1.64.05-1.05.06-1.37.06-4.04s-.01-2.99-.06-4.04c-.04-.86-.18-1.33-.3-1.64a2.7 2.7 0 0 0-.66-1.02 2.7 2.7 0 0 0-1.02-.66c-.31-.12-.78-.26-1.64-.3-1.05-.05-1.37-.06-4.04-.06Zm0 3.06a5.14 5.14 0 1 1 0 10.28 5.14 5.14 0 0 1 0-10.28Zm0 1.8a3.34 3.34 0 1 0 0 6.68 3.34 3.34 0 0 0 0-6.68Zm5.34-1.98a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z" />
  ),
  linkedin: (
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.33V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45Z" />
  ),
  youtube: (
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14C4.5 20.5 12 20.5 12 20.5s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.6 15.6V8.4l6.27 3.6-6.27 3.6Z" />
  ),
};

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/aboutus" },
  { label: "Ongoing Projects", href: "#" },
  { label: "Gurudev", href: "/projects/gurudev", isSub: true },
  { label: "Privana", href: "/projects/privana", isSub: true },
  { label: "EMI Calculator", href: "/emicalculator" },
  { label: "Channel Partners", href: "/channelpartners" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contactus" },
];

export default function Footer() {
  const root = useRef(null);

  useEffect(() => {
    if (!root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: {
          trigger: root.current,
          start: "top 88%",
          once: true,
        },
      });

      tl.fromTo(
        ".ft-newsletter",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "all" }
      )
        .fromTo(
          ".ft-grid > *",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power2.out", clearProps: "all" },
          "-=0.4"
        )
        .fromTo(
          ".ft-stats",
          { y: 15, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", clearProps: "all" },
          "-=0.3"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={root} className={`${geist.className} relative w-full overflow-hidden bg-white`}>
      <div className="relative mx-auto max-w-[1800px] px-5 pt-12 sm:px-6 md:px-8 lg:px-10 lg:pt-14">
        {/* Newsletter row */}
        <div className="ft-newsletter flex flex-col gap-7 border-b border-neutral-200 pb-9 sm:gap-8 sm:pb-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="lg:max-w-md">
            <div className="flex items-center gap-3">
              <span
                className="text-[11px] font-semibold tracking-[0.2em] sm:text-xs sm:tracking-[0.25em]"
                style={{ color: TEXT_CHARCOAL }}
              >
                STAY AHEAD
              </span>
            </div>
            <h3
              className="mt-2 text-xl font-semibold leading-snug sm:text-2xl lg:text-3xl"
              style={{ color: DEEP_NAVY }}
            >
              Get the latest updates
              <br />
              on our projects, offers &amp; insights.
            </h3>
          </div>

          <div className="lg:max-w-sm">
            <div className="flex flex-col gap-3 rounded-2xl border border-neutral-300 p-2 sm:flex-row sm:items-center sm:gap-3 sm:rounded-full sm:px-4 sm:py-2.5">
              <div className="flex items-center gap-3 px-2 sm:px-0">
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: DEEP_NAVY }} />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none"
                />
              </div>
              <button
                className="flex flex-shrink-0 items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors sm:py-2"
                style={{ backgroundColor: DEEP_NAVY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
              >
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-2 text-xs" style={{ color: TEXT_CHARCOAL, opacity: 0.8 }}>
              Be the first to know. No spam, ever.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 sm:flex sm:items-center sm:gap-6">
            <FooterBadge icon={FileText} label={"New\nProjects"} />
            <span className="hidden h-10 w-px bg-neutral-200 sm:block" />
            <FooterBadge icon={Percent} label={"Exclusive\nOffers"} />
            <span className="hidden h-10 w-px bg-neutral-200 sm:block" />
            <FooterBadge icon={BookOpen} label={"Expert\nInsights"} />
          </div>
        </div>

        {/* Main footer grid */}
        <div className="ft-grid grid grid-cols-1 gap-10 py-10 sm:grid-cols-2 sm:py-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="flex flex-col items-start sm:col-span-2 lg:col-span-1">
            <Image
              src="/pkr-logo.png"
              alt="PKR Estates"
              width={180}
              height={70}
              priority
              style={{ width: "auto", height: "auto" }}
              className="h-auto w-[140px] object-contain sm:w-[160px]"
            />

            <div
              className="mt-4 text-xs font-bold tracking-[0.15em]"
              style={{ color: DEEP_NAVY }}
            >
              SPACES FOR A
              <br />
              BRIGHTER TOMORROW
            </div>

            <p
              className="mt-4 max-w-xs text-sm leading-relaxed"
              style={{ color: TEXT_CHARCOAL }}
            >
              Creating thoughtfully designed homes and communities that enrich lives,
              today and for generations to come.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <SocialIcon
                name="facebook"
                label="Facebook"
                href={SOCIAL_LINKS.facebook}
              />
              <SocialIcon
                name="instagram"
                label="Instagram"
                href={SOCIAL_LINKS.instagram}
              />
              <SocialIcon
                name="linkedin"
                label="LinkedIn"
                href={SOCIAL_LINKS.linkedin}
              />
              <SocialIcon
                name="youtube"
                label="YouTube"
                href={SOCIAL_LINKS.youtube}
              />
            </div>
          </div>

          {/* Explore — mirrors Navbar links */}
          <div>
            <h4
              className="text-xs font-bold tracking-[0.2em]"
              style={{ color: DEEP_NAVY }}
            >
              EXPLORE
            </h4>
            <ul className="mt-5 flex flex-col gap-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors"
                    style={{
                      color: link.isSub ? TEXT_CHARCOAL : TEXT_CHARCOAL,
                      opacity: link.isSub ? 0.75 : 1,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = link.isSub ? TEXT_CHARCOAL : TEXT_CHARCOAL)
                    }
                  >
                    {link.isSub && (
                      <span
                        className="mr-1.5 inline-block h-1 w-1 -translate-y-[2px] rounded-full align-middle"
                        style={{ backgroundColor: DEEP_NAVY, opacity: 0.6 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Support */}
          <FooterColumn
            title="HELP & SUPPORT"
            links={["Terms & Conditions", "Privacy Policy"]}
          />

          {/* Get in touch */}
          <div>
            <h4
              className="text-xs font-bold tracking-[0.2em]"
              style={{ color: DEEP_NAVY }}
            >
              GET IN TOUCH
            </h4>

            <div className="mt-5 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  style={{ color: DEEP_NAVY }}
                />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: TEXT_CHARCOAL }}
                >
                  Flat A10, Archana Castle,
                  <br />
                  4/23 Patrick Church Road,
                  <br />
                  St. Thomas Mount, Chennai – 600 016,
                  <br />
                  Tamil Nadu, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0" style={{ color: DEEP_NAVY }} />
                <a
                  href="tel:+919543633333"
                  className="text-sm transition-colors"
                  style={{ color: TEXT_CHARCOAL }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_CHARCOAL)}
                >
                  +91 95436 33333
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: DEEP_NAVY }} />
                <a
                  href="mailto:pkr@pkrestates.com"
                  className="break-all text-sm transition-colors"
                  style={{ color: TEXT_CHARCOAL }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_CHARCOAL)}
                >
                  pkr@pkrestates.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock
                  className="mt-0.5 h-4 w-4 flex-shrink-0"
                  style={{ color: DEEP_NAVY }}
                />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: TEXT_CHARCOAL }}
                >
                  Mon – Sat: 9:00 AM – 6:00 PM
                  <br />
                  Sunday: By Appointment
                </span>
              </div>
            </div>
          </div>

          {/* Let's build */}
          <div className="relative sm:col-span-2 lg:col-span-1">
            <h4
              className="text-xs font-bold leading-relaxed tracking-[0.2em]"
              style={{ color: DEEP_NAVY }}
            >
              LET&apos;S BUILD
              <br />A BRIGHTER
              <br />
              TOMORROW
            </h4>

            <p
              className="mt-4 max-w-xs text-sm leading-relaxed"
              style={{ color: TEXT_CHARCOAL }}
            >
              Have a question or want to know more? We&apos;re here to help.
            </p>

            <Link
              href="/contactus"
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors"
              style={{ borderColor: DEEP_NAVY, color: DEEP_NAVY }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = DEEP_NAVY;
                e.currentTarget.style.color = "#FFFFFF";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = DEEP_NAVY;
              }}
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-neutral-200 bg-white">
        <div
          className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-3 px-5 py-5 text-center text-xs sm:px-6 sm:text-sm sm:flex-row sm:text-left lg:px-10"
          style={{ color: TEXT_CHARCOAL }}
        >
          <span>© 2026 PKR ESTATES. All rights reserved.</span>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_CHARCOAL)}
            >
              Terms &amp; Conditions
            </a>
            <span className="text-neutral-300">|</span>
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_CHARCOAL)}
            >
              Privacy Policy
            </a>
            <span className="text-neutral-300">|</span>
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_CHARCOAL)}
            >
              RERA
            </a>
            <span className="text-neutral-300">|</span>
            <a
              href="#"
              className="transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_CHARCOAL)}
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterBadge({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-full border sm:h-11 sm:w-11"
        style={{ borderColor: DEEP_NAVY, color: DEEP_NAVY }}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span
        className="whitespace-pre-line text-[11px] font-semibold leading-tight sm:text-xs"
        style={{ color: TEXT_CHARCOAL }}
      >
        {label}
      </span>
    </div>
  );
}

function SocialIcon({ name, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors"
      style={{ backgroundColor: DEEP_NAVY }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        {SOCIAL_ICONS[name]}
      </svg>
    </a>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h4
        className="text-xs font-bold tracking-[0.2em]"
        style={{ color: DEEP_NAVY }}
      >
        {title}
      </h4>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm transition-colors"
              style={{ color: TEXT_CHARCOAL }}
              onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
              onMouseLeave={(e) => (e.currentTarget.style.color = TEXT_CHARCOAL)}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatItem({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-3">
      <Icon
        className="h-6 w-6 shrink-0 sm:h-7 sm:w-7"
        strokeWidth={1.5}
        style={{ color: DEEP_NAVY }}
      />
      <div>
        <div
          className="text-lg font-bold sm:text-xl"
          style={{ color: DEEP_NAVY }}
        >
          {value}
        </div>
        <div
          className="text-[9.5px] font-medium tracking-wide sm:text-[10px]"
          style={{ color: TEXT_CHARCOAL, opacity: 0.7 }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
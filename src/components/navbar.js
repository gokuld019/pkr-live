"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const LIGHT_BLUE_SOFT = "#F0F6FC";

/* Rendered left to right, after the logo. A `projects` array turns an
   item into a hover dropdown; everything else is a plain link. */
const navItems = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/aboutus" },
  {
    label: "ONGOING PROJECTS",
    href: "#",
    projects: [
      { name: "Gurudev", slug: "gurudev" },
      { name: "Privana", slug: "privana" },
    ],
  },
  { label: "EMI CALCULATOR", href: "/emicalculator" },
  { label: "CHANNEL PARTNERS", href: "/channelpartners" },
  // { label: "BLOGS", href: "/blogs" },
  { label: "CONTACT US", href: "/contactus" },
];

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64);
  const pathname = usePathname();
  const headerRef = useRef(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure the real rendered header height instead of guessing a fixed
  // pixel value — this changes across breakpoints and scrolled state.
  useEffect(() => {
    const measure = () => {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [scrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
    setOpenMenu(null);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open. Plain
  // `overflow: hidden` on body does not reliably stop scrolling on iOS
  // Safari, so pin the body in place with position: fixed and restore the
  // scroll position on close.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    scrollYRef.current = window.scrollY;
    const { style } = document.body;
    const prevPosition = style.position;
    const prevTop = style.top;
    const prevWidth = style.width;
    const prevOverflow = style.overflow;

    style.position = "fixed";
    style.top = `-${scrollYRef.current}px`;
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      style.position = prevPosition;
      style.top = prevTop;
      style.width = prevWidth;
      style.overflow = prevOverflow;
      window.scrollTo(0, scrollYRef.current);
    };
  }, [mobileMenuOpen]);

  const isActive = (href) => href !== "#" && (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-[60] w-full border-b bg-white transition-shadow duration-300 ${
        scrolled
          ? "border-[#0F3A6B]/12 shadow-[0_4px_16px_rgba(15,58,107,0.10)]"
          : "border-[#0F3A6B]/10 shadow-[0_1px_4px_rgba(15,58,107,0.05)]"
      }`}
    >
      <nav
        className={`mx-auto flex w-full max-w-[1560px] items-center justify-between gap-4 px-4 transition-[height] duration-300 sm:px-6 md:px-8 lg:px-10 xl:px-12 ${
          scrolled ? "h-[56px] sm:h-[60px] lg:h-[64px]" : "h-[64px] sm:h-[70px] lg:h-[78px]"
        }`}
      >
        {/* ================= LOGO — left, all screens ================= */}
        <Link
          href="/"
          aria-label="PKR Estates — Home"
          className="flex shrink-0 items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3A6B]/40"
        >
          <Image
            src="/pkr-logo.png"
            alt="PKR Estates"
            width={200}
            height={74}
            priority
            className={`w-auto object-contain transition-[height] duration-300 ${
              scrolled
                ? "h-[28px] sm:h-[32px] lg:h-[34px]"
                : "h-[32px] sm:h-[38px] lg:h-[44px]"
            }`}
          />
        </Link>

        {/* ================= LINKS — right, desktop ================= */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-7 2xl:gap-9">
          {navItems.map((item) =>
            item.projects ? (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openMenu === item.label}
                  className="flex items-center gap-1.5 whitespace-nowrap py-2 text-[13px] font-bold tracking-wide text-neutral-900 transition-colors lg:text-[13.5px] xl:text-[14.5px]"
                  onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  {item.label}
                  <svg
                    className={`shrink-0 transition-transform duration-200 ${openMenu === item.label ? "rotate-180" : ""}`}
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                  >
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {openMenu === item.label && (
                  <div className="absolute left-0 top-full z-50 pt-3">
                    <ul className="min-w-[190px] rounded-xl border border-neutral-100 bg-white py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
                      {item.projects.map((project) => (
                        <li key={project.slug}>
                          <Link
                            href={`/projects/${project.slug}`}
                            className="block whitespace-nowrap px-5 py-2.5 text-[13px] font-semibold text-neutral-900 transition-colors"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = LIGHT_BLUE_SOFT;
                              e.currentTarget.style.color = DEEP_NAVY;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "";
                              e.currentTarget.style.color = "";
                            }}
                          >
                            {project.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ) : (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="relative block whitespace-nowrap py-2 text-[13px] font-bold tracking-wide transition-colors lg:text-[13.5px] xl:text-[14.5px]"
                  style={{ color: isActive(item.href) ? DEEP_NAVY : "#171717" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isActive(item.href) ? DEEP_NAVY : "#171717")}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* ================= MOBILE TOGGLE ================= */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((v) => !v)}
          className="relative z-[70] -mr-1 shrink-0 rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 focus:outline-none lg:hidden"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* ================= MOBILE BACKDROP ================= */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/30 lg:hidden"
          style={{ top: headerHeight }}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-x-0 z-[65] overflow-y-auto border-t border-neutral-100 bg-white px-5 pb-5 pt-3 shadow-[0_12px_24px_rgba(0,0,0,0.08)] sm:px-6 lg:hidden"
          style={{ top: headerHeight, maxHeight: `calc(100svh - ${headerHeight}px)` }}
        >
          <ul className="flex flex-col">
            {navItems.map((item) =>
              item.projects ? (
                <li key={item.label} className="border-b border-neutral-100 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)}
                    aria-expanded={mobileDropdown === item.label}
                    className="flex w-full items-center justify-between py-3.5 text-[13.5px] font-bold tracking-wide text-neutral-800"
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${mobileDropdown === item.label ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {mobileDropdown === item.label && (
                    <ul className="mb-3 ml-1 space-y-1 border-l-2 pl-4" style={{ borderColor: DEEP_NAVY }}>
                      {item.projects.map((project) => (
                        <li key={project.slug}>
                          <Link
                            href={`/projects/${project.slug}`}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-2 text-[13px] font-semibold text-neutral-600"
                          >
                            {project.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label} className="border-b border-neutral-100 last:border-b-0">
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="block py-3.5 text-[13.5px] font-bold tracking-wide"
                    style={{ color: isActive(item.href) ? DEEP_NAVY : "#262626" }}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
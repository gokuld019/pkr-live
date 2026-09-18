"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const LIGHT_BLUE_SOFT = "#F0F6FC";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/aboutus" },
];

const dropdownLinks = [
  {
    label: "ONGOING PROJECTS",
    href: "#",
    projects: [
      { name: "Gurudev", slug: "gurudev" },
      { name: "Privana", slug: "privana" },
    ],
  },
];

const rightNavLinks = [
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
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileDropdown(null);
    setOpenMenu(null);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-[60] w-full bg-white">
      <nav
        className={`relative flex items-center justify-between gap-3 border-b border-[#0F3A6B]/15 px-4 shadow-[0_2px_10px_rgba(15,58,107,0.06)] transition-[padding] duration-300 sm:px-6 md:px-8 lg:justify-center lg:gap-8 lg:px-10 xl:gap-14 ${
          scrolled ? "py-3.5 sm:py-4" : "py-5 sm:py-6"
        }`}
      >
        {/* LEFT — before logo */}
        <ul className="hidden items-center gap-5 lg:flex lg:flex-1 lg:justify-end xl:gap-7">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="whitespace-nowrap text-[13px] font-bold tracking-wide text-neutral-900 transition-colors lg:text-[13.5px] xl:text-[14.5px]"
                onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {dropdownLinks.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() => setOpenMenu(link.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button
                type="button"
                className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-bold tracking-wide text-neutral-900 transition-colors lg:text-[13.5px] xl:text-[14.5px]"
                onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                {link.label}
                <svg
                  className={`shrink-0 transition-transform duration-200 ${openMenu === link.label ? "rotate-180" : ""}`}
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                >
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {openMenu === link.label && (
                <div className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3">
                  <ul className="min-w-[190px] rounded-xl border border-neutral-100 bg-white py-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.12)]">
                    {link.projects.map((project) => (
                      <li key={project.slug}>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="block whitespace-nowrap px-5 py-2.5 text-[13px] font-semibold text-neutral-900 transition-colors"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = LIGHT_BLUE_SOFT
                            e.currentTarget.style.color = DEEP_NAVY
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = ''
                            e.currentTarget.style.color = ''
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
          ))}
        </ul>

        {/* CENTER SPACER — width matches the floating badge so side links never collide with it */}
        <div
          className={`hidden shrink-0 lg:block transition-all duration-300 ${
            scrolled ? "w-[162px] xl:w-[180px]" : "w-[186px] xl:w-[206px]"
          }`}
          aria-hidden="true"
        />

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="shrink-0 rounded-lg p-2 text-neutral-700 hover:bg-neutral-100 focus:outline-none lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* RIGHT — after logo (desktop) */}
        <ul className="hidden items-center gap-5 lg:flex lg:flex-1 lg:justify-start xl:gap-7">
          {rightNavLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="whitespace-nowrap text-[13px] font-bold tracking-wide text-neutral-900 transition-colors lg:text-[13.5px] xl:text-[14.5px]"
                onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                onMouseLeave={(e) => (e.currentTarget.style.color = '')}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* MOBILE — compact inline logo */}
        <Link href="/" className="flex flex-shrink-0 items-center lg:hidden" aria-label="PKR Estates Home">
          <Image
            src="/pkr-logo.png"
            alt="PKR Estates Logo"
            width={140}
            height={52}
            priority
            className={`h-auto w-[105px] object-contain transition-all duration-300 sm:w-[125px] ${
              scrolled ? "w-[90px] sm:w-[110px]" : ""
            }`}
          />
        </Link>

        {/* CENTER — floating curved logo badge (desktop) */}
        <Link
          href="/"
          aria-label="PKR Estates Home"
          className="absolute left-1/2 top-full z-[70] hidden -translate-x-1/2 -translate-y-[68%] lg:block mt-[-10px]"
        >
          <div
            className={`relative flex items-center justify-center rounded-b-[1.4rem] rounded-t-none bg-white transition-all duration-300 ${
              scrolled ? "px-4 py-3.5" : "px-5 py-4"
            }`}
            style={{
              boxShadow:
                "0 8px 24px rgba(15,58,107,0.16), 0 2px 6px rgba(15,58,107,0.08)",
            }}
          >
            {/* thin gradient ring — bottom rounded only */}
            <span
              className="pointer-events-none absolute inset-0 rounded-b-[1.4rem] rounded-t-none"
              style={{
                padding: 1,
                background:
                  "linear-gradient(135deg, rgba(15,58,107,0.18), rgba(15,58,107,0.02))",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
              aria-hidden="true"
            />
            <Image
              src="/pkr-logo.png"
              alt="PKR Estates Logo"
              width={200}
              height={74}
              priority
              className={`relative h-auto object-contain transition-all duration-300 ${
                scrolled ? "w-[142px] xl:w-[158px]" : "w-[142px] xl:w-[158px]"
              }`}
            />
          </div>
        </Link>
      </nav>

      {mobileMenuOpen && (
        <div className="max-h-[calc(100svh-72px)] overflow-y-auto border-b border-neutral-200 bg-white px-5 py-4 shadow-lg sm:px-6 lg:hidden">
          <ul className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm font-bold text-neutral-800 transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="my-1 border-t border-neutral-100 pt-1" aria-hidden="true" />

            {dropdownLinks.map((link) => (
              <li key={link.label} className="py-1">
                <button
                  type="button"
                  onClick={() => setMobileDropdown(mobileDropdown === link.label ? null : link.label)}
                  className="flex w-full items-center justify-between text-sm font-bold text-neutral-800 transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  <span>{link.label}</span>
                  <svg
                    className={`h-3.5 w-3.5 shrink-0 transition-transform ${mobileDropdown === link.label ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {mobileDropdown === link.label && (
                  <ul className="ml-3 mt-2 space-y-2 border-l-2 py-1 pl-3" style={{ borderColor: DEEP_NAVY }}>
                    {link.projects.map((project) => (
                      <li key={project.slug}>
                        <Link
                          href={`/projects/${project.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs font-semibold text-neutral-600 transition-colors"
                          onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                        >
                          {project.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}

            <li className="my-1 border-t border-neutral-100 pt-1" aria-hidden="true" />

            {rightNavLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm font-bold text-neutral-800 transition-colors"
                  onMouseEnter={(e) => (e.currentTarget.style.color = DEEP_NAVY)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
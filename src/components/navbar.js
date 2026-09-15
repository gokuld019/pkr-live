"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

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
    <header
      className={`sticky top-0 z-[60] w-full bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-[0_6px_20px_rgba(0,0,0,0.08)]" : ""
      }`}
    >
      <nav
        className={`relative flex items-center justify-between gap-3 border-b border-[#1B3B8C]/15 px-4 transition-[padding] duration-300 sm:px-6 md:px-8 lg:justify-center lg:gap-6 lg:px-10 xl:gap-10 ${
          scrolled ? "py-2.5 sm:py-3" : "py-3.5 sm:py-5"
        }`}
      >
        {/* LEFT — before logo */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="whitespace-nowrap text-[13px] font-bold tracking-wide text-neutral-900 transition-colors hover:text-[#F0722F] lg:text-[14px] xl:text-[15px]"
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
                className="flex items-center gap-1.5 whitespace-nowrap text-[13px] font-bold tracking-wide text-neutral-900 transition-colors hover:text-[#F0722F] lg:text-[14px] xl:text-[15px]"
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
                          className="block whitespace-nowrap px-5 py-2.5 text-[13px] font-semibold text-neutral-900 transition-colors hover:bg-[#f6ede2] hover:text-[#F0722F]"
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

        {/* CENTER — logo */}
        <Link href="/" className="flex flex-shrink-0 flex-col items-center" aria-label="PKR Estates Home">
          <Image
            src="/pkr-logo.png"
            alt="PKR Estates Logo"
            width={160}
            height={60}
            priority
            className={`h-auto object-contain transition-all duration-300 ${
              scrolled
                ? "w-[110px] sm:w-[140px] md:w-[150px] lg:w-[120px] xl:w-[130px]"
                : "w-[130px] sm:w-[170px] md:w-[190px] lg:w-[150px] xl:w-[160px]"
            }`}
          />
        </Link>

        {/* RIGHT — after logo */}
        <ul className="hidden items-center gap-5 lg:flex xl:gap-8">
          {rightNavLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="whitespace-nowrap text-[13px] font-bold tracking-wide text-neutral-900 transition-colors hover:text-[#F0722F] lg:text-[14px] xl:text-[15px]"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

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
      </nav>

      {mobileMenuOpen && (
        <div className="max-h-[calc(100svh-72px)] overflow-y-auto border-b border-neutral-200 bg-white px-5 py-4 shadow-lg sm:px-6 lg:hidden">
          <ul className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-sm font-bold text-neutral-800 hover:text-[#F0722F]"
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
                  className="flex w-full items-center justify-between text-sm font-bold text-neutral-800 hover:text-[#F0722F]"
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
                  <ul className="ml-3 mt-2 space-y-2 border-l-2 border-[#F0722F] py-1 pl-3">
                    {link.projects.map((project) => (
                      <li key={project.slug}>
                        <Link
                          href={`/projects/${project.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs font-semibold text-neutral-600 hover:text-[#F0722F]"
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
                  className="block py-1.5 text-sm font-bold text-neutral-800 hover:text-[#F0722F]"
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
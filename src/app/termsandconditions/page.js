"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const UPDATED = "15 October 2026";

const SECTIONS = [
  {
    id: "about",
    title: "About PKR Estates",
    body: [
      "PKR Estates LLP is an affordable housing developer established in 2018 with a focus on meeting the housing needs of first-time homebuyers and families looking for value-for-money homes.",
      "Our website provides information about our residential projects, including apartments, villas, residential plots, property features, amenities, pricing and location advantages. It also allows visitors to enquire about properties and connect with our team.",
      "We aim to keep the information useful and accurate so that prospective buyers can better understand our projects before taking the next step.",
    ],
  },
  {
    id: "use",
    title: "Use of Our Website",
    body: [
      "You are welcome to browse our website to learn about our company, explore residential projects and enquire about properties that interest you.",
      "When using the website, please provide accurate information in any forms you submit and use the website only for lawful purposes. You must not misuse our content, attempt to access our systems without permission or interfere with the website's normal functioning.",
      "We may take appropriate action if we identify activities that compromise the security, operation or legitimate use of our website.",
    ],
  },
  {
    id: "property-details",
    title: "Property Details and Project Information",
    body: [
      "We make reasonable efforts to keep project information updated. However, property details can change as development progresses and as project requirements, approvals or other circumstances evolve.",
      "Information such as apartment sizes, floor plans, layouts, amenities, specifications, construction details and availability should be confirmed with our team before making a purchase decision.",
      "We encourage every prospective buyer to review the latest project brochure, applicable approvals and relevant sale documents. These documents provide the details necessary to understand the property and the terms of purchase.",
    ],
  },
  {
    id: "images",
    title: "Images, Plans and Specifications",
    body: [
      "Images, architectural drawings, floor plans, sample interiors and other visuals on our website are intended to help visitors understand the proposed design and features of a project.",
      "Some images may be artistic representations rather than photographs of the completed property. Actual finishes, colours, landscaping, fittings and other details may differ from the visuals shown.",
      "The final specifications and commitments for a property will be those set out in the applicable approved plans and contractual documents, subject to applicable law.",
    ],
  },
  {
    id: "prices",
    title: "Property Prices and Special Offers",
    body: [
      "We understand that affordability is an important consideration when choosing a home. We therefore encourage buyers to confirm the latest price and total cost of their preferred property with our sales team.",
      "Prices displayed on the website may be indicative and may apply to selected units or configurations. Additional amounts, including applicable taxes, stamp duty, registration charges and other disclosed charges, may be payable.",
      "Special offers and promotional benefits may be available for selected projects or properties for a limited period. Such offers are subject to their stated terms, eligibility requirements and availability.",
      "We may update prices and promotional details from time to time, subject to applicable law and existing contractual commitments. Please obtain a current price breakdown before proceeding with a booking.",
    ],
  },
  {
    id: "approvals",
    title: "Project Approvals and Legal Documents",
    body: [
      "Property buyers should review the relevant project approvals, registration details, title documents and other applicable legal records before purchasing a property.",
      "Where required, project registration and approval details should be verified through the appropriate government authorities, including the Tamil Nadu Real Estate Regulatory Authority.",
      "PKR Estates will provide applicable project disclosures in accordance with legal requirements. Information published on the website does not replace official records or the need to review the documents relevant to your chosen property.",
    ],
  },
  {
    id: "enquiries",
    title: "Enquiries and Site Visits",
    body: [
      "You can contact us through our website to request project details, enquire about availability or arrange a site visit.",
      "Please ensure that your contact information is correct so our team can respond to your request. Submitting an enquiry does not reserve a property or confirm its availability.",
      "Site visits are subject to appointment confirmation and the arrangements applicable to the project. Our team will help you understand the next steps once you express interest in a property.",
      "We may contact you regarding your enquiry in accordance with applicable privacy and communication requirements. You can manage your preferences for promotional communications as permitted by law.",
    ],
  },
  {
    id: "bookings",
    title: "Property Bookings and Payments",
    body: [
      "A property purchase involves important financial and legal commitments. Before making a booking or payment, please review the relevant property details, payment schedule, applicable charges and contractual conditions.",
      "Bookings, allotments, cancellations, refunds, possession and other sale-related matters will be governed by the applicable booking documents, allotment letters, agreements for sale and relevant laws.",
      "An enquiry, brochure request or discussion with our team does not constitute a confirmed booking or replace the required legal documentation.",
      "Please make payments only through authorised channels after verifying the payment instructions with PKR Estates. Any cancellation or refund will be handled in accordance with the applicable agreement and law.",
    ],
  },
  {
    id: "home-loan",
    title: "Home Loan and EMI Information",
    body: [
      "Our website may provide an EMI calculator or general information to help you understand the potential cost of financing a home.",
      "These calculations are estimates and may not reflect the actual repayment amount offered by a bank or financial institution. Interest rates, eligibility, loan tenure, processing fees and approval conditions vary by lender and applicant.",
      "Please confirm the applicable terms directly with your lender before making financial commitments. PKR Estates does not guarantee loan approval or any particular financing arrangement.",
    ],
  },
  {
    id: "investment",
    title: "Property Investment Information",
    body: [
      "If you are considering a property for investment, please assess the relevant costs, location, legal documentation and market conditions before making a decision.",
      "Property values and future returns depend on several factors and may rise or fall over time. Information about a project's location, connectivity or development potential should not be understood as a guarantee of appreciation, rental income or resale value.",
      "We encourage buyers to make informed decisions based on verified project information and their individual financial circumstances.",
    ],
  },
  {
    id: "ip",
    title: "Website Content and Ownership",
    body: [
      "The content on our website, including the PKR Estates name and logo, text, photographs, graphics, brochures, illustrations and other materials, is owned by PKR Estates or used with the necessary permission.",
      "You may view this content for personal and informational purposes. Reproducing, publishing, modifying or using it commercially without permission is not allowed, except where permitted by law.",
      "If you wish to use any of our website materials for another purpose, please contact us for permission.",
    ],
  },
  {
    id: "links",
    title: "Links to Other Websites",
    body: [
      "Our website may contain links to third-party websites or services for your convenience.",
      "These websites are managed independently, and their content, availability and privacy practices are outside our direct control. We recommend reviewing their terms and privacy policies before using their services or sharing personal information.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy and Personal Information",
    body: [
      "When you submit an enquiry or contact us through our website, we may collect the information needed to respond to your request and assist you with your property requirements.",
      "We handle personal information in accordance with our Privacy Policy and applicable data protection laws. This may include using your information to respond to enquiries, arrange site visits, provide requested project details and fulfil relevant legal obligations.",
      "Please read our Privacy Policy for more information about how your personal information is collected, used, stored and protected.",
    ],
  },
  {
    id: "availability",
    title: "Website Availability",
    body: [
      "We make reasonable efforts to keep our website accessible and functioning properly. However, temporary interruptions may occur due to maintenance, technical issues, network problems or circumstances beyond our control.",
      "We may update website content or make changes to its features as required. If you notice an error or outdated project information, please contact our team so that we can review it.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    body: [
      "We take reasonable care when preparing and publishing website content. However, information may occasionally become outdated or contain errors.",
      "To the extent permitted by law, PKR Estates is not responsible for indirect losses arising solely from website interruptions or reliance on general website information that has not been verified.",
      "Nothing in these Terms and Conditions excludes liability or limits any consumer right, statutory obligation or remedy that cannot lawfully be excluded or limited.",
      "The rights and obligations relating to an actual property purchase will be determined by the relevant contractual documents and applicable law.",
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    body: [
      "We may update these Terms and Conditions when our website, business operations or legal requirements change.",
      "Any revisions will be published on this page with an updated date. We encourage visitors to check this page periodically.",
      "Updates to these terms will not override existing contractual commitments or mandatory legal rights.",
    ],
  },
  {
    id: "law",
    title: "Governing Law",
    body: [
      "These Terms and Conditions are governed by the laws of India.",
      "Any dispute relating to the use of this website will be subject to the jurisdiction of the competent courts in Chennai, Tamil Nadu, subject to applicable law and the jurisdiction of relevant consumer forums and regulatory authorities.",
      "Property-related disputes will be dealt with in accordance with the applicable agreements and legal provisions.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    body: [
      "If you have any questions about these Terms and Conditions, our website or a residential project, please contact PKR Estates through the official contact details provided on our website.",
      "PKR Estates LLP",
      "Website: https://pkrestates.com/",
      "We appreciate your interest in PKR Estates and encourage you to contact our team whenever you need clarification about a project or property.",
    ],
  },
];

export default function TermsPage() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const navRef = useRef(null);

  // Highlight the section currently in view
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mobile/tablet: keep the active pill centred in the horizontal bar.
  // Desktop: keep the active item visible inside the scrolling sidebar.
  useEffect(() => {
    const nav = navRef.current;
    const el = nav?.querySelector("a.on");
    if (!nav || !el) return;

    if (nav.scrollWidth > nav.clientWidth) {
      nav.scrollTo({
        left: el.offsetLeft - nav.clientWidth / 2 + el.clientWidth / 2,
        behavior: "smooth",
      });
    } else {
      const toc = nav.parentElement;
      if (toc && toc.scrollHeight > toc.clientHeight) {
        const top = el.offsetTop - toc.clientHeight / 2 + el.clientHeight / 2;
        toc.scrollTo({ top, behavior: "smooth" });
      }
    }
  }, [active]);

  const goTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className={`pk-legal ${geist.className}`}>
      <title>Terms &amp; Conditions | PKR Estates</title>

      <style>{`
        .pk-legal {
          --navy: #0f3a6b;
          --navy-dark: #0a2b50;
          --ink: #2d3a46;
          --soft: #f4f7fb;
          --line: #e3e9f1;
          --nav-h: 84px;            /* set this to your fixed navbar height */
          --gutter: clamp(16px, 4vw, 32px);
          background: var(--soft);
          color: var(--ink);
          min-height: 100vh;
          overflow-x: clip;
          -webkit-text-size-adjust: 100%;
        }
        .pk-legal * { box-sizing: border-box; }
        .pk-legal a, .pk-legal p, .pk-legal li { overflow-wrap: anywhere; }

        @media (prefers-reduced-motion: no-preference) {
          html { scroll-behavior: smooth; }
        }

        /* ---------- HERO ---------- */
        .pk-legal .hero {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0a2b50 0%, #0f3a6b 60%, #164b87 100%);
          color: #fff;
          padding: calc(var(--nav-h) + clamp(32px, 6vw, 56px)) var(--gutter) clamp(56px, 8vw, 80px);
        }
        .pk-legal .hero::before,
        .pk-legal .hero::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          pointer-events: none;
        }
        .pk-legal .hero::before { width: clamp(220px, 34vw, 440px); aspect-ratio: 1; right: -8%; top: -30%; }
        .pk-legal .hero::after { width: clamp(140px, 20vw, 280px); aspect-ratio: 1; left: -5%; bottom: -35%; }
        .pk-legal .hero-in { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }
        .pk-legal .crumbs { font-size: clamp(12px, 1.6vw, 13px); color: #b9cae0; margin-bottom: 16px; }
        .pk-legal .crumbs a { color: #fff; text-decoration: none; }
        .pk-legal .crumbs a:hover { text-decoration: underline; }
        .pk-legal .eyebrow {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.22em;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .pk-legal h1 {
          margin: 14px 0 12px;
          font-size: clamp(30px, 5.5vw, 54px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .pk-legal .sub { max-width: 600px; font-size: clamp(14.5px, 1.8vw, 16.5px); line-height: 1.6; color: #cfdcee; margin: 0; }
        .pk-legal .stamp { margin-top: 20px; font-size: 13px; color: #b9cae0; }

        /* ---------- LAYOUT ---------- */
        .pk-legal .wrap {
          max-width: 1200px;
          margin: -28px auto 0;
          padding: 0 var(--gutter) clamp(48px, 8vw, 80px);
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: clamp(220px, 23vw, 280px) minmax(0, 1fr);
          gap: clamp(20px, 3vw, 36px);
          align-items: start;
        }

        /* ---------- TOC (desktop: sticky sidebar) ---------- */
        .pk-legal .toc {
          position: sticky;
          top: calc(var(--nav-h) + 16px);
          max-height: calc(100vh - var(--nav-h) - 32px);
          overflow-y: auto;
          overscroll-behavior: contain;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 20px 14px;
          box-shadow: 0 10px 30px rgba(15, 58, 107, 0.07);
        }
        .pk-legal .toc p {
          margin: 0 10px 10px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: var(--navy);
        }
        .pk-legal .toc nav { position: relative; }
        .pk-legal .toc a {
          display: flex;
          gap: 10px;
          align-items: center;
          padding: 9px 10px;
          border-radius: 10px;
          font-size: 13.5px;
          line-height: 1.35;
          color: var(--ink);
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .pk-legal .toc a span { font-size: 11px; font-weight: 700; opacity: 0.45; width: 18px; flex-shrink: 0; }
        .pk-legal .toc a:hover { background: var(--soft); }
        .pk-legal .toc a.on { background: var(--navy); color: #fff; }
        .pk-legal .toc a.on span { opacity: 0.8; }
        .pk-legal .toc a:focus-visible,
        .pk-legal .other:focus-visible { outline: 2px solid var(--navy); outline-offset: 2px; }

        /* ---------- DOCUMENT ---------- */
        .pk-legal .doc {
          min-width: 0;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 24px;
          padding: 12px clamp(20px, 4vw, 44px) clamp(24px, 4vw, 40px);
          box-shadow: 0 10px 30px rgba(15, 58, 107, 0.07);
        }
        .pk-legal .doc .lead {
          margin: clamp(20px, 3vw, 28px) 0 4px;
          padding-bottom: clamp(8px, 2vw, 12px);
          border-bottom: 1px solid var(--line);
        }
        .pk-legal section {
          padding: clamp(24px, 3.5vw, 34px) 0;
          border-bottom: 1px solid var(--line);
          scroll-margin-top: calc(var(--nav-h) + 20px);
        }
        .pk-legal section:last-of-type { border-bottom: none; }
        .pk-legal .head { display: flex; align-items: center; gap: 14px; margin-bottom: 14px; }
        .pk-legal .num {
          flex-shrink: 0;
          width: 38px;
          height: 38px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: #e8f0fa;
          color: var(--navy);
          font-size: 14px;
          font-weight: 700;
        }
        .pk-legal h2 { margin: 0; font-size: clamp(17px, 2.2vw, 21px); font-weight: 600; line-height: 1.3; color: var(--navy); }
        .pk-legal .doc p { margin: 0 0 12px; font-size: clamp(14.5px, 1.6vw, 15.5px); line-height: 1.75; }
        .pk-legal .doc ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }
        .pk-legal .doc li { position: relative; padding-left: 22px; font-size: clamp(14.5px, 1.6vw, 15.5px); line-height: 1.65; }
        .pk-legal .doc li::before {
          content: "";
          position: absolute;
          left: 2px;
          top: 0.62em;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--navy);
        }

        /* ---------- CONTACT ---------- */
        .pk-legal .contact {
          margin-top: 12px;
          border-radius: 20px;
          background: linear-gradient(135deg, #0a2b50, #0f3a6b);
          color: #fff;
          padding: clamp(20px, 3.5vw, 32px);
        }
        .pk-legal .contact h3 { margin: 0 0 6px; font-size: clamp(16px, 2vw, 19px); font-weight: 600; }
        .pk-legal .contact p { margin: 0 0 16px; font-size: 14px; color: #cfdcee; line-height: 1.6; }
        .pk-legal .contact .rows { display: grid; gap: 10px; font-size: 14px; line-height: 1.6; }
        .pk-legal .contact a { color: #fff; text-underline-offset: 3px; }

        .pk-legal .other {
          margin-top: 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          min-height: 56px;
          padding: 16px 22px;
          border: 1px solid var(--line);
          border-radius: 16px;
          text-decoration: none;
          color: var(--navy);
          font-weight: 600;
          font-size: 15px;
          transition: background 0.15s, border-color 0.15s;
        }
        .pk-legal .other:hover { background: var(--soft); border-color: var(--navy); }

        /* ---------- TABLET + MOBILE: TOC becomes a sticky pill bar ---------- */
        @media (max-width: 900px) {
          .pk-legal { --nav-h: 72px; }
          .pk-legal .wrap { grid-template-columns: minmax(0, 1fr); gap: 16px; margin-top: -24px; }

          .pk-legal .toc {
            position: sticky;
            top: calc(var(--nav-h) + 8px);
            z-index: 5;
            max-height: none;
            overflow: visible;
            padding: 8px;
            border-radius: 16px;
          }
          .pk-legal .toc p { display: none; }
          .pk-legal .toc nav {
            display: flex;
            gap: 6px;
            overflow-x: auto;
            scroll-snap-type: x proximity;
            scrollbar-width: none;
            -webkit-overflow-scrolling: touch;
            mask-image: linear-gradient(90deg, transparent 0, #000 12px, #000 calc(100% - 24px), transparent 100%);
            -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 12px, #000 calc(100% - 24px), transparent 100%);
            padding: 0 12px;
          }
          .pk-legal .toc nav::-webkit-scrollbar { display: none; }
          .pk-legal .toc a {
            white-space: nowrap;
            flex-shrink: 0;
            scroll-snap-align: center;
            min-height: 40px;
            padding: 8px 14px;
            border-radius: 999px;
            background: var(--soft);
          }
          .pk-legal .toc a span { display: none; }

          .pk-legal section { scroll-margin-top: calc(var(--nav-h) + 76px); }
          .pk-legal .doc { border-radius: 20px; }
        }

        /* ---------- SMALL PHONES ---------- */
        @media (max-width: 480px) {
          .pk-legal { --nav-h: 64px; }
          .pk-legal .wrap { margin-top: -20px; }
          .pk-legal .doc { border-radius: 16px; padding-top: 4px; }
          .pk-legal .head { gap: 12px; align-items: flex-start; }
          .pk-legal .num { width: 34px; height: 34px; border-radius: 10px; font-size: 13px; }
          .pk-legal h2 { padding-top: 5px; }
          .pk-legal .contact { border-radius: 16px; }
          .pk-legal .other { padding: 14px 18px; border-radius: 14px; }
        }

        /* ---------- VERY SMALL (≤ 360px) ---------- */
        @media (max-width: 360px) {
          .pk-legal .eyebrow { font-size: 10px; letter-spacing: 0.18em; }
          .pk-legal .doc li { padding-left: 18px; }
        }

        /* ---------- LARGE SCREENS ---------- */
        @media (min-width: 1536px) {
          .pk-legal .hero-in, .pk-legal .wrap { max-width: 1320px; }
          .pk-legal .wrap { grid-template-columns: 300px minmax(0, 1fr); }
        }

        /* ---------- NOTCH / SAFE AREA ---------- */
        @supports (padding: max(0px)) {
          .pk-legal .hero,
          .pk-legal .wrap {
            padding-left: max(var(--gutter), env(safe-area-inset-left));
            padding-right: max(var(--gutter), env(safe-area-inset-right));
          }
          .pk-legal .wrap { padding-bottom: max(48px, env(safe-area-inset-bottom)); }
        }

        /* ---------- PRINT ---------- */
        @media print {
          .pk-legal .toc, .pk-legal .other { display: none; }
          .pk-legal .hero { background: none; color: #000; padding: 0 0 16px; }
          .pk-legal .hero * { color: #000 !important; }
          .pk-legal .wrap { display: block; margin: 0; padding: 0; }
          .pk-legal .doc { border: none; box-shadow: none; padding: 0; }
        }
      `}</style>

      <header className="hero">
        <div className="hero-in">
          <div className="crumbs">
            <Link href="/">Home</Link> / Terms &amp; Conditions
          </div>
          <span className="eyebrow">LEGAL</span>
          <h1>Terms &amp; Conditions</h1>
          <p className="sub">
            Welcome to PKR Estates. We believe that finding a home should be a straightforward and informed experience.
          </p>
          <div className="stamp">Last updated: {UPDATED}</div>
        </div>
      </header>

      <div className="wrap">
        <aside className="toc" aria-label="Table of contents">
          <p>ON THIS PAGE</p>
          <nav ref={navRef}>
            {SECTIONS.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={active === s.id ? "on" : ""}
                aria-current={active === s.id ? "true" : undefined}
                onClick={(e) => goTo(e, s.id)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="doc">
          <p className="lead">
            These Terms and Conditions explain the rules for using our website and the important details to consider when exploring or purchasing a property from PKR Estates LLP. By using pkrestates.com, you agree to the terms below.
          </p>

          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id}>
              <div className="head">
                <div className="num">{String(i + 1).padStart(2, "0")}</div>
                <h2>{s.title}</h2>
              </div>
              {s.body.map((t, k) => (
                <p key={k}>{t}</p>
              ))}
              {s.list && (
                <ul>
                  {s.list.map((t, k) => (
                    <li key={k}>{t}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="contact">
            <h3>Questions about these terms?</h3>
            <p>Our team is happy to help.</p>
            <div className="rows">
              <div>
                Flat A10, Archana Castle, 4/23 Patrick Church Road, St. Thomas Mount, Chennai – 600 016, Tamil Nadu, India
              </div>
              <div>
                <a href="mailto:pkr@pkrestates.com">pkr@pkrestates.com</a>
              </div>
              <div>
                <a href="tel:+919381055555">+91 93810 55555</a>
              </div>
            </div>
          </div>

          <Link href="/privacypolicy" className="other">
            <span>Read our Privacy Policy</span>
            <span aria-hidden="true">→</span>
          </Link>
        </article>
      </div>
    </main>
  );
}
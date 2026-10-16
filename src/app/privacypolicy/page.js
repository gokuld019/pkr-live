"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const UPDATED = "15 October 2026";

const SECTIONS = [
  {
    id: "intro",
    title: "Introduction",
    body: [
      "At PKR Estates, we understand that looking for a home often begins with an online enquiry. When you browse our projects, request a callback or share your contact details with us, you trust us with your personal information.",
      "This Privacy Policy explains what information we may collect through our website, how we use it, when it may be shared and the steps we take to protect it.",
      "This policy applies to visitors using www.pkrestates.com and individuals who contact us through the website.",
    ],
  },
  {
    id: "collect",
    title: "Information We Collect",
    body: [
      "The information we collect depends on how you use our website and interact with our team.",
      "Information you provide to us: When you submit an enquiry, request project details or ask for a callback, we may collect your name and contact number, your email address, the project or property you are interested in, your preferred location, property type or housing requirements if provided, and any additional information you choose to include in your enquiry. We use this information to understand your requirements and respond appropriately.",
      "Information collected when you browse our website: Some technical information may be collected automatically when you visit our website. Depending on the tools and settings in use, this may include your IP address, browser type, device information, pages visited, approximate location and information about how you navigate the website. This information helps us understand website performance, identify technical issues and improve the browsing experience.",
    ],
  },
  {
    id: "use",
    title: "How We Use Your Information",
    body: [
      "We use personal information for purposes connected with your interaction with PKR Estates, including:",
    ],
    list: [
      "Responding to property enquiries and requests for information.",
      "Sharing details about relevant residential projects.",
      "Arranging callbacks, consultations and site visits.",
      "Helping you understand property availability, pricing and other project details.",
      "Maintaining enquiry records and managing customer communication.",
      "Improving our website, content and enquiry process.",
      "Understanding which projects and website pages visitors find useful.",
      "Meeting applicable legal, regulatory and record-keeping requirements.",
    ],
    footer: "We will not use your personal information for unrelated purposes without an appropriate lawful basis.",
  },
  {
    id: "communication",
    title: "Calls, Emails and WhatsApp Communication",
    body: [
      "If you provide your contact details through our website, our team may contact you to respond to your enquiry or discuss the property you are interested in.",
      "Depending on the contact details you provide and the permissions you have given, communication may take place by telephone, email, SMS or WhatsApp.",
      "Promotional messages and marketing communications will be handled in accordance with applicable consent requirements and communication laws. You can ask us to stop promotional communications at any time through the available opt-out method or by contacting us.",
      "Where necessary, we may retain limited information to record your communication preferences and honour your request.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Website Analytics",
    body: [
      "Our website may use cookies and similar technologies to support website functionality, understand visitor activity and improve our services.",
      "Depending on the tools enabled, these technologies may help us:",
    ],
    list: [
      "Remember certain website preferences.",
      "Understand which pages visitors access.",
      "Measure website traffic and performance.",
      "Evaluate the effectiveness of advertising campaigns.",
      "Understand how visitors reach our website.",
    ],
    footer: "Third-party analytics or advertising tools may also use their own cookies or similar technologies, subject to their configurations and applicable requirements. You can manage cookies through your browser settings and any cookie preferences offered on our website. Disabling certain cookies may affect some website features. The specific cookies and tracking technologies used should be confirmed against the website's actual configuration.",
  },
  {
    id: "sharing",
    title: "Sharing Information with Third Parties",
    body: [
      "We do not treat your personal information as information that can be shared without a legitimate reason. However, some services may require access to relevant information so that we can operate our website and respond to your enquiries.",
      "Depending on the services we use, information may be shared with:",
    ],
    list: [
      "Website and hosting providers: To maintain the website and its technical infrastructure.",
      "Customer relationship management and communication providers: To organise enquiries and manage responses.",
      "Analytics and advertising providers: To understand website performance and measure campaigns, where such tools are used.",
      "Authorised sales representatives or relevant project teams: To respond to your enquiry and provide the property information you requested.",
      "Professional advisers and service providers: Where necessary for legitimate business operations or legal compliance.",
      "Government authorities or other authorised parties: Where disclosure is required or permitted by applicable law.",
    ],
    footer: "We expect service providers handling personal information on our behalf to follow appropriate confidentiality and security requirements. We do not sell personal information to third parties as a standalone commercial product. Any sharing will be subject to the applicable purpose, permissions and legal requirements.",
  },
  {
    id: "advertising",
    title: "Advertising and Marketing Measurement",
    body: [
      "PKR Estates may use digital advertising and analytics services to understand how people discover our website and whether campaigns are generating relevant property enquiries.",
      "If advertising tools such as Google Ads, Meta Pixel or similar technologies are used, they may process certain online activity or device information according to their settings and applicable policies.",
      "We will configure these tools and obtain any required permissions in accordance with applicable law.",
      "You can manage available advertising preferences through the relevant platform settings and any cookie controls provided on our website.",
    ],
  },
  {
    id: "security",
    title: "How We Protect Your Information",
    body: [
      "We take reasonable steps to protect the personal information entrusted to us against unauthorised access, misuse, loss or disclosure.",
      "The measures used may include access controls, appropriate technical safeguards and arrangements with service providers.",
      "No website or electronic transmission can be guaranteed to be completely secure. If you have concerns about the information you have shared with us, please contact our team.",
      "We will handle personal data incidents in accordance with applicable legal requirements.",
    ],
  },
  {
    id: "retention",
    title: "How Long We Keep Your Information",
    body: [
      "We retain personal information only for as long as it is reasonably necessary for the purpose for which it was collected, or for any applicable legal, regulatory, contractual or record-keeping requirement.",
      "For example, an enquiry may be retained while our team is responding to your request. Records relating to an actual property transaction may need to be kept for a longer period where required by law or contractual obligations.",
      "When personal information is no longer required, we will take appropriate steps to delete it or otherwise dispose of it in accordance with applicable requirements.",
    ],
  },
  {
    id: "rights",
    title: "Your Privacy Rights",
    body: [
      "Depending on applicable law and the circumstances of the processing, you may have rights concerning your personal information.",
      "These may include requesting access to information about how your data is handled, correcting inaccurate information, requesting deletion where applicable, withdrawing consent where processing relies on consent, and raising a privacy concern.",
      "To exercise an applicable right, please contact us using the details provided below. We may need to verify your identity before acting on a request.",
      "Some information may need to be retained where a legal or contractual obligation applies. We will explain any relevant limitation where required.",
    ],
  },
  {
    id: "children",
    title: "Children's Information",
    body: [
      "Our website is intended for people exploring property information and related services. We do not knowingly seek personal information from children for independent marketing purposes.",
      "Where personal information relating to a child is processed, we will follow the applicable legal requirements, including any relevant consent and protection requirements.",
      "If you believe a child has submitted personal information through our website inappropriately, please contact us so that we can review the matter.",
    ],
  },
  {
    id: "links",
    title: "Links to Other Websites",
    body: [
      "Our website may contain links to external websites, including social media platforms, financial institutions and other third-party services.",
      "Once you visit an external website, its own privacy policy and practices apply. We do not control how independent websites collect or use information.",
      "Please review the relevant privacy policy before submitting personal information through another website.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    body: [
      "Our website, services and data-handling practices may change over time. We may therefore update this Privacy Policy when necessary.",
      "Any updated version will be published on this page with a revised date. We encourage you to review the policy periodically to understand how your information is handled.",
      "Where required, we will provide additional notice or seek consent for changes in accordance with applicable law.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us About Privacy",
    body: [
      "If you have a question about this Privacy Policy, want to update your contact information or wish to raise a concern about the handling of your personal information, please contact PKR Estates through the official contact details published on our website.",
      "PKR Estates LLP",
      "Website: https://pkrestates.com/",
      "Please mention that your query relates to privacy so that it can be directed to the appropriate team. We appreciate the trust you place in PKR Estates when sharing your information with us.",
    ],
  },
];

export default function PrivacyPage() {
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

  // On mobile/tablet the TOC is a horizontal pill bar: keep the active pill centred.
  // On desktop (vertical sidebar) keep the active item visible inside the sidebar.
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
      <title>Privacy Policy | PKR Estates</title>

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
        .pk-legal .sub { max-width: 560px; font-size: clamp(14.5px, 1.8vw, 16.5px); line-height: 1.6; color: #cfdcee; margin: 0; }
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
            <Link href="/">Home</Link> / Privacy Policy
          </div>
          <span className="eyebrow">LEGAL</span>
          <h1>Privacy Policy</h1>
          <p className="sub">
            How PKR Estates collects, uses and protects your personal information.
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
              {s.footer && <p style={{ marginTop: "12px" }}>{s.footer}</p>}
            </section>
          ))}

          <div className="contact">
            <h3>Privacy questions or requests?</h3>
            <p>Write to us to access, correct or delete your data, or to raise a concern.</p>
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

          <Link href="/termsandconditions" className="other">
            <span>Read our Terms &amp; Conditions</span>
            <span aria-hidden="true">→</span>
          </Link>
        </article>
      </div>
    </main>
  );
}
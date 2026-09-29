"use client";

import { useState, useRef, useEffect } from "react";
import { Figtree } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { EASE, useReveal, SplitReveal, WordReveal, FadeUp } from "@/components/motion/reveal";

/* ---------------------------------------------------------
   Figtree font
--------------------------------------------------------- */
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/* ---------------------------------------------------------
   THEME TOKENS
--------------------------------------------------------- */
const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const TEXT_CHARCOAL = "#2D3A46";
const LIGHT_BLUE = "#E8F0F9";
const LIGHT_BLUE_SOFT = "#F0F6FC";
const LINE = "#E0E8F0";

/* WhatsApp number to receive enquiries */
const WHATSAPP_NUMBER = "919381055555";

/* ---------------------------------------------------------
   Icons (inline SVG, no external icon library dependency)
--------------------------------------------------------- */
const Icon = {
  Pin: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 20} height={p.size || 20} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </svg>
  ),
  Phone: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 20} height={p.size || 20} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a1 1 0 0 1-1 1C10.5 20 4 13.5 4 5a1 1 0 0 1 1-1Z" />
    </svg>
  ),
  Mail: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 20} height={p.size || 20} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4.5 6.5 7.5 6 7.5-6" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 20} height={p.size || 20} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  Calendar: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 20} height={p.size || 20} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="15.5" rx="1.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  ),
  Chat: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 20} height={p.size || 20} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5h16v11H9l-5 4v-4H4Z" />
    </svg>
  ),
  File: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 20} height={p.size || 20} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h8l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5M8 13h8M8 17h5" />
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Minus: (p) => (
    <svg viewBox="0 0 24 24" width={p.size || 16} height={p.size || 16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
    </svg>
  ),
};

/* ---------------------------------------------------------
   Static content
--------------------------------------------------------- */
const OTHER_WAYS = [
  { icon: "Calendar", title: "Schedule a Site Visit", desc: "Experience our projects in person" },
  { icon: "Phone", title: "Request a Call Back", desc: "Our team will call you at your convenience" },
  { icon: "Chat", title: "Chat with Us", desc: "Get instant answers to your queries" },
  { icon: "File", title: "Brochure Download", desc: "Get detailed project information" },
];

const FAQS = [
  { q: "How can I schedule a site visit?", a: "Fill out the contact form above or call our office directly, and our team will arrange a convenient time for your visit." },
  { q: "What are the payment options?", a: "We offer flexible payment plans including bank loan assistance, construction-linked plans, and direct booking options." },
  { q: "Do you offer home loans?", a: "Yes, we've partnered with leading banks and NBFCs to help you get the best home loan rates and quick approvals." },
  { q: "Where are your ongoing projects located?", a: "We currently have active apartment, villa, and plot projects across Chennai, Coimbatore, and Bangalore." },
];

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.4277621863025!2d80.1935429!3d13.008409499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52674983f048c3%3A0xf9655e7ba417a69f!2sArchana%20Castle%2C%20Ramapuram%2C%20Parangi%20Malai%2C%20St.Thomas%20Mount%2C%20Tamil%20Nadu%20600016!5e0!3m2!1sen!2sin!4v1789040406224!5m2!1sen!2sin";

const CARD =
  "h-full rounded-2xl border border-[#E0E8F0] bg-white shadow-[0_20px_40px_rgba(15,58,107,0.06)]";

/* ---------------------------------------------------------
   Page
--------------------------------------------------------- */
export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the WhatsApp message with the form details
    const lines = [
      "*New Enquiry — PKR Estates*",
      "",
      `*Name:* ${form.name}`,
      `*Phone:* +91 ${form.phone}`,
      `*Email:* ${form.email}`,
      form.interest ? `*Interested In:* ${form.interest}` : null,
      form.message ? `*Message:* ${form.message}` : null,
    ].filter(Boolean);

    const text = encodeURIComponent(lines.join("\n"));
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    // Open WhatsApp chat in a new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Show "Message Sent!" feedback on the button
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);

    // Reset the form fields
    setForm({ name: "", phone: "", email: "", interest: "", message: "" });
  };

  return (
    <div className={`${figtree.className} bg-white`} style={{ color: DEEP_NAVY }}>
      {/* ---------------- HERO ---------------- */}
      <section className="relative w-full bg-white">
        {/* Mobile-only banner — fixed 380 x 700px, centered, across all mobile screens */}
        <div className="block sm:hidden w-full flex justify-center bg-white">
          <div
            className="relative bg-[#333] bg-cover bg-center"
            style={{ backgroundImage: `url(/mobcus.jpeg)`, width: "380px", height: "700px", maxWidth: "100%" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/10" />
          </div>
        </div>

        {/* Tablet & up banner */}
        <div
          className="hidden sm:flex relative w-full h-[420px] md:h-[560px] lg:h-[680px] xl:h-[750px] 2xl:h-[860px] bg-[#333] bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url(/upcus.jpeg)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent" />
        </div>
      </section>

      {/* ---------------- GET IN TOUCH ---------------- */}
      <section
        id="get-in-touch"
        className="relative z-[5] mx-auto mt-6 max-w-[1240px] px-4 pb-5 sm:mt-12 sm:px-6 sm:pb-8 lg:mt-16 lg:pb-10"
      >
        <div className="grid grid-cols-1 items-stretch gap-3.5 sm:gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-[22px]">
          {/* Form card */}
          <div className={`${CARD} flex flex-col p-4 sm:p-7 lg:p-8`}>
            <SplitReveal
              text="Get in Touch"
              className="mb-1.5 text-lg font-semibold sm:text-2xl text-[#0F3A6B]"
            />
            <WordReveal
              text="Fill out the form and our team will get back to you shortly."
              delay={0.1}
              className="mb-4 text-[13px] sm:mb-6 sm:text-sm text-[#2D3A46]"
            />

            <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
              <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:mb-4 sm:grid-cols-2 sm:gap-4">
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="name" className="text-[12px] font-semibold sm:text-[13px]" style={{ color: DEEP_NAVY }}>
                    <LineReveal>Full Name *</LineReveal>
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="rounded-lg border bg-white px-3.5 py-2.5 text-[13px] focus:outline focus:outline-2 focus:outline-offset-1 sm:py-3 sm:text-sm"
                    style={{ borderColor: LINE, color: DEEP_NAVY }}
                    onFocus={(e) => (e.currentTarget.style.outlineColor = DEEP_NAVY)}
                    onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="phone" className="text-[12px] font-semibold sm:text-[13px]" style={{ color: DEEP_NAVY }}>
                    <LineReveal delay={0.05}>Phone Number *</LineReveal>
                  </label>
                  <div className="flex items-center overflow-hidden rounded-lg border focus-within:outline focus-within:outline-2 focus-within:outline-offset-1" style={{ borderColor: LINE }}>
                    <span className="border-r px-3 py-2.5 text-[13px] sm:py-3 sm:text-sm" style={{ borderColor: LINE, color: TEXT_CHARCOAL }}>+91</span>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      className="w-full min-w-0 flex-1 border-none px-3.5 py-2.5 text-[13px] focus:outline-none sm:py-3 sm:text-sm"
                      style={{ color: DEEP_NAVY }}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:mb-4 sm:grid-cols-2 sm:gap-4">
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="email" className="text-[12px] font-semibold sm:text-[13px]" style={{ color: DEEP_NAVY }}>
                    <LineReveal>Email Address *</LineReveal>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="rounded-lg border bg-white px-3.5 py-2.5 text-[13px] focus:outline focus:outline-2 focus:outline-offset-1 sm:py-3 sm:text-sm"
                    style={{ borderColor: LINE, color: DEEP_NAVY }}
                    onFocus={(e) => (e.currentTarget.style.outlineColor = DEEP_NAVY)}
                    onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                  />
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  <label htmlFor="interest" className="text-[12px] font-semibold sm:text-[13px]" style={{ color: DEEP_NAVY }}>
                    <LineReveal delay={0.05}>Interested In</LineReveal>
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className="rounded-lg border bg-white px-3.5 py-2.5 text-[13px] focus:outline focus:outline-2 focus:outline-offset-1 sm:py-3 sm:text-sm"
                    style={{ borderColor: LINE, color: DEEP_NAVY }}
                    onFocus={(e) => (e.currentTarget.style.outlineColor = DEEP_NAVY)}
                    onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                  >
                    <option value="">Select an option</option>
                    <option value="apartments">Apartments</option>
                    <option value="villas">Villas</option>
                    <option value="plots">Plots</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-3.5 flex flex-1 flex-col gap-1.5 sm:mb-4 sm:gap-2">
                <label htmlFor="message" className="text-[12px] font-semibold sm:text-[13px]" style={{ color: DEEP_NAVY }}>
                  <LineReveal>Your Message</LineReveal>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us how we can help you..."
                  className="min-h-[100px] flex-1 resize-none rounded-lg border bg-white px-3.5 py-2.5 text-[13px] focus:outline focus:outline-2 focus:outline-offset-1 sm:min-h-[110px] sm:py-3 sm:text-sm"
                  style={{ borderColor: LINE, color: DEEP_NAVY }}
                  onFocus={(e) => (e.currentTarget.style.outlineColor = DEEP_NAVY)}
                  onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                />
              </div>

              <FadeUp delay={0.1} amount={0.8} className="mt-1 sm:mt-1.5">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md border-none px-6 py-3 text-[13px] font-semibold text-white transition-colors sm:py-[13px] sm:text-sm"
                  style={{ backgroundColor: DEEP_NAVY }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
                >
                  <SwapText>{submitted ? "Message Sent!" : "Send Message"}</SwapText> {!submitted && <Icon.Arrow />}
                </button>
              </FadeUp>
              <p className="mb-0 mt-2.5 flex items-center gap-1.5 text-[11px] sm:mt-3 sm:text-xs" style={{ color: TEXT_CHARCOAL, opacity: 0.85 }}>
                <span>&#128274;</span>
                <LineReveal delay={0.1}>Your information is safe with us. We respect your privacy.</LineReveal>
              </p>
            </form>
          </div>

          {/* Info card */}
          <div className={`${CARD} flex flex-col p-4 sm:p-7 lg:p-8`}>
            <InfoRow
              icon="Pin"
              title="Visit Our Office"
              text="Flat A10, Archana Castle, 4/23 Patrick Church Road, St. Thomas Mount, Chennai – 600 016, Tamil Nadu, India"
            />
            <InfoRow icon="Phone" title="Call Us" text="+91 93810 55555" />
            <InfoRow icon="Mail" title="Email Us" text="pkr@pkrestates.com" />
            <InfoRow
              icon="Clock"
              title="Working Hours"
              lines={["Mon – Sat: 9:00 AM – 6:00 PM", "Sunday: By Appointment"]}
              last
            />
          </div>
        </div>

        {/* Map card */}
        <div className={`${CARD} mt-3.5 flex flex-col gap-2.5 p-2.5 sm:mt-5 sm:gap-3 sm:p-3 lg:mt-[22px]`}>
          <div className="relative h-[240px] w-full overflow-hidden rounded-[10px] sm:h-[340px] lg:h-[400px]" style={{ backgroundColor: LIGHT_BLUE }}>
            <iframe
              src={MAP_SRC}
              style={{ border: 0 }}
              className="absolute inset-0 h-full w-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="PKR Estates Location"
            />
          </div>

          <FadeUp delay={0.1} amount={0.8}>
            <a
              href="https://maps.google.com/?q=Archana+Castle,+4/23+Patrick+Church+Road,+St.Thomas+Mount,+Chennai+600016"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg p-2.5 text-[12.5px] font-semibold transition-colors sm:p-3 sm:text-[13px]"
              style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LIGHT_BLUE_SOFT)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = LIGHT_BLUE)}
            >
              <Icon.Pin size={16} /> Get Directions <Icon.Arrow />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* ---------------- OTHER WAYS ---------------- */}
      <section className="mx-auto max-w-[1240px] px-4 pb-8 pt-5 sm:px-6 sm:pb-14 sm:pt-8 lg:pb-[60px] lg:pt-10">
        <SplitReveal
          text="Other Ways to Reach Us"
          className="mb-3.5 text-lg font-semibold sm:mb-5 sm:text-2xl lg:mb-[22px] text-[#0F3A6B]"
        />
        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-[18px]">
          {OTHER_WAYS.map((w, i) => {
            const Ico = Icon[w.icon];
            return (
              <a
                href="#"
                className="flex h-full items-center gap-3 rounded-xl border bg-white p-3.5 transition-colors sm:gap-3.5 sm:p-5"
                style={{ borderColor: LINE }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = DEEP_NAVY)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = LINE)}
                key={w.title}
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full sm:h-11 sm:w-11" style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}>
                  <Ico />
                </span>
                <div className="flex flex-1 flex-col gap-0.5 text-[12.5px] sm:gap-1 sm:text-[13.5px]">
                  <strong className="text-[13px] sm:text-[14.5px]" style={{ color: DEEP_NAVY }}>
                    <LineReveal delay={0.08 * i}>{w.title}</LineReveal>
                  </strong>
                  <WordReveal text={w.desc} delay={0.1 + 0.08 * i} className="text-[#2D3A46]" />
                </div>
                <span style={{ color: DEEP_NAVY }}><Icon.Arrow /></span>
              </a>
            );
          })}
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-6 px-4 py-8 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-[0.9fr_1.4fr] lg:py-[60px]">
        <div>
          <p className="mb-3 flex items-center gap-2.5 text-[11px] font-semibold tracking-[1.8px] sm:mb-3.5 sm:text-[12px] sm:tracking-[2px]" style={{ color: DEEP_NAVY }}>
            <span className="inline-block h-px w-6" style={{ backgroundColor: DEEP_NAVY }} />
            <LineReveal>QUICK ANSWERS</LineReveal>
          </p>
          <SplitReveal
            text="Have a Question?"
            className="mb-2 text-xl font-semibold sm:mb-2.5 sm:text-[28px] text-[#0F3A6B]"
          />
          <WordReveal
            text="Find quick answers in our FAQs."
            delay={0.1}
            className="text-[13px] sm:text-base text-[#2D3A46]"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5">
          {FAQS.map((f, i) => (
            <div
              className={`rounded-[10px] border bg-white px-3.5 py-3.5 sm:px-[18px] sm:py-4 ${openFaq === i ? "sm:col-span-2" : ""}`}
              style={{ borderColor: LINE }}
              key={f.q}
            >
              <button
                className="flex w-full items-center justify-between gap-3 border-none bg-transparent p-0 text-left text-[13px] font-semibold sm:text-sm"
                style={{ color: DEEP_NAVY }}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                aria-expanded={openFaq === i}
              >
                <span className="block flex-1">
                  <LineReveal delay={0.06 * i}>{`${i + 1}. ${f.q}`}</LineReveal>
                </span>
                <span className="flex-shrink-0" style={{ color: DEEP_NAVY }}>
                  {openFaq === i ? <Icon.Minus /> : <Icon.Plus />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openFaq === i && (
                  <motion.div
                    key="answer"
                    className="overflow-hidden"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <WordReveal
                      text={f.a}
                      className="pt-2 text-[12.5px] leading-[1.55] sm:pt-2.5 sm:text-[13.5px] sm:leading-[1.6] text-[#2D3A46]"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          <FadeUp delay={0.1} amount={0.8} className="flex justify-end sm:col-start-2 sm:justify-self-end">
            <a
              href="#"
              className="flex items-center justify-end gap-2 text-[13px] font-semibold sm:text-sm"
              style={{ color: DEEP_NAVY }}
            >
              View All FAQs <Icon.Arrow />
            </a>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}

/* ---------------------------------------------------------
   Same line-mask reveal used for the stat labels in AboutStats:
   the text slides up out of an overflow-hidden wrapper once it scrolls into view.
--------------------------------------------------------- */
function LineReveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const show = useReveal(ref, { amount: 0.6 });

  return (
    <span ref={ref} className={`block overflow-hidden py-[0.08em] -my-[0.08em] ${className}`}>
      <motion.span
        className="block"
        initial={{ y: "100%", opacity: 0 }}
        animate={show ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
        transition={{ duration: 0.7, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* Animates dynamic text when it changes ("Send Message" -> "Message Sent!").
   Skips the first render so it doesn't fight the page-load reveal. */
function SwapText({ children }) {
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);

  return (
    <span className="block overflow-hidden py-[0.08em] -my-[0.08em]">
      <motion.span
        key={String(children)}
        className="block"
        initial={mounted.current ? { y: "100%", opacity: 0 } : false}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* Small helper for the "Get in Touch" info column rows */
function InfoRow({ icon, title, text, lines, last }) {
  const Ico = Icon[icon];
  return (
    <div
      className={`flex items-start gap-3 py-3.5 first:pt-0 sm:gap-4 sm:py-4 ${last ? "" : "border-b"}`}
      style={{ borderColor: LINE }}
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14" style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}>
        <Ico size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="mb-0.5 text-[14px] font-semibold sm:mb-1 sm:text-[15px]" style={{ color: DEEP_NAVY }}>
          <LineReveal>{title}</LineReveal>
        </h4>
        {lines ? (
          <div className="m-0 text-[12.5px] leading-[1.55] sm:text-[13.5px] sm:leading-[1.65]" style={{ color: TEXT_CHARCOAL }}>
            {lines.map((line, i) => (
              <LineReveal key={line} delay={0.1 + 0.08 * i}>{line}</LineReveal>
            ))}
          </div>
        ) : (
          <WordReveal
            text={text}
            delay={0.1}
            className="m-0 break-words text-[12.5px] leading-[1.55] sm:text-[13.5px] sm:leading-[1.65] text-[#2D3A46]"
          />
        )}
      </div>
    </div>
  );
}
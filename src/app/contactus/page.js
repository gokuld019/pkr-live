"use client";

import { useState } from "react";
import { Figtree } from "next/font/google";

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
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={`${figtree.className} bg-white`} style={{ color: DEEP_NAVY }}>
      {/* ---------------- HERO ---------------- */}
      <section className="relative w-full bg-white">
        {/* Mobile-only banner — fixed 380 x 700px, centered, across all mobile screens */}
        <div className="block sm:hidden w-full flex justify-center bg-white">
          <div
            className="relative bg-[#333] bg-cover bg-center"
            style={{ backgroundImage: `url(/contactmob.jpeg)`, width: "380px", height: "700px", maxWidth: "100%" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/10" />
          </div>
        </div>

        {/* Tablet & up banner */}
        <div
          className="hidden sm:flex relative w-full h-[420px] md:h-[560px] lg:h-[680px] xl:h-[750px] 2xl:h-[860px] bg-[#333] bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: `url(/contactus.jpg)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent" />
        </div>
      </section>

      {/* ---------------- GET IN TOUCH ---------------- */}
      <section
        id="get-in-touch"
        className="relative z-[5] mx-auto mt-8 max-w-[1240px] px-4 pb-6 sm:mt-12 sm:px-6 sm:pb-8 lg:mt-16 lg:pb-10"
      >
        <div className="grid grid-cols-1 items-stretch gap-4 sm:gap-5 lg:grid-cols-[1.3fr_1fr] lg:gap-[22px]">
          {/* Form card */}
          <div className={`${CARD} flex flex-col p-5 sm:p-7 lg:p-8`}>
            <h2 className="mb-1.5 text-xl font-semibold sm:text-2xl" style={{ color: DEEP_NAVY }}>Get in Touch</h2>
            <p className="mb-5 text-sm sm:mb-6" style={{ color: TEXT_CHARCOAL }}>
              Fill out the form and our team will get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[13px] font-semibold" style={{ color: DEEP_NAVY }}>Full Name *</label>
                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className="rounded-lg border bg-white px-3.5 py-3 text-sm focus:outline focus:outline-2 focus:outline-offset-1"
                    style={{ borderColor: LINE, color: DEEP_NAVY }}
                    onFocus={(e) => (e.currentTarget.style.outlineColor = DEEP_NAVY)}
                    onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-[13px] font-semibold" style={{ color: DEEP_NAVY }}>Phone Number *</label>
                  <div className="flex items-center overflow-hidden rounded-lg border focus-within:outline focus-within:outline-2 focus-within:outline-offset-1" style={{ borderColor: LINE }}>
                    <span className="border-r px-3 py-3 text-sm" style={{ borderColor: LINE, color: TEXT_CHARCOAL }}>+91</span>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      required
                      className="w-full min-w-0 flex-1 border-none px-3.5 py-3 text-sm focus:outline-none"
                      style={{ color: DEEP_NAVY }}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[13px] font-semibold" style={{ color: DEEP_NAVY }}>Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="rounded-lg border bg-white px-3.5 py-3 text-sm focus:outline focus:outline-2 focus:outline-offset-1"
                    style={{ borderColor: LINE, color: DEEP_NAVY }}
                    onFocus={(e) => (e.currentTarget.style.outlineColor = DEEP_NAVY)}
                    onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="interest" className="text-[13px] font-semibold" style={{ color: DEEP_NAVY }}>Interested In</label>
                  <select
                    id="interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className="rounded-lg border bg-white px-3.5 py-3 text-sm focus:outline focus:outline-2 focus:outline-offset-1"
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

              <div className="mb-4 flex flex-1 flex-col gap-2">
                <label htmlFor="message" className="text-[13px] font-semibold" style={{ color: DEEP_NAVY }}>Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us how we can help you..."
                  className="min-h-[110px] flex-1 resize-none rounded-lg border bg-white px-3.5 py-3 text-sm focus:outline focus:outline-2 focus:outline-offset-1"
                  style={{ borderColor: LINE, color: DEEP_NAVY }}
                  onFocus={(e) => (e.currentTarget.style.outlineColor = DEEP_NAVY)}
                  onBlur={(e) => (e.currentTarget.style.outlineColor = 'transparent')}
                />
              </div>

              <button
                type="submit"
                className="mt-1.5 inline-flex w-full items-center justify-center gap-2 rounded-md border-none px-6 py-[13px] text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: DEEP_NAVY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
              >
                {submitted ? "Message Sent!" : "Send Message"} {!submitted && <Icon.Arrow />}
              </button>
              <p className="mb-0 mt-3 flex items-center gap-1.5 text-xs" style={{ color: TEXT_CHARCOAL, opacity: 0.85 }}>
                <span>&#128274;</span> Your information is safe with us. We respect your privacy.
              </p>
            </form>
          </div>

          {/* Info card */}
          <div className={`${CARD} flex flex-col p-5 sm:p-7 lg:p-8`}>
            <InfoRow icon="Pin" title="Visit Our Office">
              Flat A10, Archana Castle, 4/23 Patrick Church Road, St. Thomas Mount, Chennai&nbsp;&ndash;&nbsp;600&nbsp;016, Tamil Nadu, India
            </InfoRow>
            <InfoRow icon="Phone" title="Call Us">
              +91 95436 33333
            </InfoRow>
            <InfoRow icon="Mail" title="Email Us">
              pkr@pkrestates.com
            </InfoRow>
            <InfoRow icon="Clock" title="Working Hours" last>
              Mon &ndash; Sat: 9:00 AM &ndash; 6:00 PM<br />Sunday: By Appointment
            </InfoRow>
          </div>
        </div>

        {/* Map card */}
        <div className={`${CARD} mt-4 flex flex-col gap-3 p-3 sm:mt-5 lg:mt-[22px]`}>
          <div className="relative h-[280px] w-full overflow-hidden rounded-[10px] sm:h-[340px] lg:h-[400px]" style={{ backgroundColor: LIGHT_BLUE }}>
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

          <a
            href="https://maps.google.com/?q=Archana+Castle,+4/23+Patrick+Church+Road,+St.Thomas+Mount,+Chennai+600016"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg p-3 text-[13px] font-semibold transition-colors"
            style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = LIGHT_BLUE_SOFT)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = LIGHT_BLUE)}
          >
            <Icon.Pin size={16} /> Get Directions <Icon.Arrow />
          </a>
        </div>
      </section>

      {/* ---------------- OTHER WAYS ---------------- */}
      <section className="mx-auto max-w-[1240px] px-4 pb-10 pt-6 sm:px-6 sm:pb-14 sm:pt-8 lg:pb-[60px] lg:pt-10">
        <h2 className="mb-4 text-xl font-semibold sm:mb-5 sm:text-2xl lg:mb-[22px]" style={{ color: DEEP_NAVY }}>
          Other Ways to Reach Us
        </h2>
        <div className="grid grid-cols-1 items-stretch gap-3.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-[18px]">
          {OTHER_WAYS.map((w) => {
            const Ico = Icon[w.icon];
            return (
              <a
                href="#"
                className="flex h-full items-center gap-3.5 rounded-xl border bg-white p-4 transition-colors sm:p-5"
                style={{ borderColor: LINE }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = DEEP_NAVY)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = LINE)}
                key={w.title}
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}>
                  <Ico />
                </span>
                <span className="flex flex-1 flex-col gap-1 text-[13.5px]">
                  <strong className="text-[14.5px]" style={{ color: DEEP_NAVY }}>{w.title}</strong>
                  <span style={{ color: TEXT_CHARCOAL }}>{w.desc}</span>
                </span>
                <span style={{ color: DEEP_NAVY }}><Icon.Arrow /></span>
              </a>
            );
          })}
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-8 px-4 py-10 sm:gap-10 sm:px-6 sm:py-14 md:grid-cols-[0.9fr_1.4fr] lg:py-[60px]">
        <div>
          <p className="mb-3.5 flex items-center gap-2.5 text-[12px] font-semibold tracking-[2px]" style={{ color: DEEP_NAVY }}>
            <span className="inline-block h-px w-6" style={{ backgroundColor: DEEP_NAVY }} /> QUICK ANSWERS
          </p>
          <h2 className="mb-2.5 text-2xl font-semibold sm:text-[28px]" style={{ color: DEEP_NAVY }}>Have a Question?</h2>
          <p style={{ color: TEXT_CHARCOAL }}>Find quick answers in our FAQs.</p>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {FAQS.map((f, i) => (
            <div
              className={`rounded-[10px] border bg-white px-4 py-4 sm:px-[18px] ${openFaq === i ? "sm:col-span-2" : ""}`}
              style={{ borderColor: LINE }}
              key={f.q}
            >
              <button
                className="flex w-full items-center justify-between gap-3 border-none bg-transparent p-0 text-left text-sm font-semibold"
                style={{ color: DEEP_NAVY }}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                aria-expanded={openFaq === i}
              >
                <span>{i + 1}. {f.q}</span>
                <span className="flex-shrink-0" style={{ color: DEEP_NAVY }}>
                  {openFaq === i ? <Icon.Minus /> : <Icon.Plus />}
                </span>
              </button>
              {openFaq === i && (
                <p className="mt-2.5 text-[13.5px] leading-[1.6]" style={{ color: TEXT_CHARCOAL }}>{f.a}</p>
              )}
            </div>
          ))}

          <a
            href="#"
            className="flex items-center justify-end gap-2 text-sm font-semibold sm:col-start-2 sm:justify-self-end"
            style={{ color: DEEP_NAVY }}
          >
            View All FAQs <Icon.Arrow />
          </a>
        </div>
      </section>
    </div>
  );
}

/* Small helper for the "Get in Touch" info column rows */
function InfoRow({ icon, title, children, last }) {
  const Ico = Icon[icon];
  return (
    <div
      className={`flex items-start gap-3.5 py-4 first:pt-0 sm:gap-4 ${last ? "" : "border-b"}`}
      style={{ borderColor: LINE }}
    >
      <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14" style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}>
        <Ico size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="mb-1 text-[15px] font-semibold" style={{ color: DEEP_NAVY }}>{title}</h4>
        <p className="m-0 break-words text-[13.5px] leading-[1.65]" style={{ color: TEXT_CHARCOAL }}>{children}</p>
      </div>
    </div>
  );
}
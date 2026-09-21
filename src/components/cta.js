"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Send, Check, AlertTriangle, ChevronRight } from "lucide-react";

const BG_IMAGE = "/CTA1.jpeg";
const MODEL_IMAGE = "/lineart.png";
const LOGO_URL = "/logo.jpeg";

const CREAM = "#FBF8F2";

/* Modal palette — same deep navy used by the EnquireModal in
   project-banner.jsx, so both modals are identical. The GOLD* names
   are kept as aliases so nothing below needs renaming. */
const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const DEEP_NAVY_DARK = "#0A2B50";
const LIGHT_BLUE_SOFT = "#F0F6FC";

const GOLD = DEEP_NAVY;
const GOLD_LIGHT = "#4A6FA5";
const GOLD_DARK = DEEP_NAVY_DARK;
const GOLD_DEEP = DEEP_NAVY_DARK;

const ENQUIRY_API = "https://api.crazystory.in/api/submit-enquiry";
const INQUIRY_TYPES = ["General Enquiry", "Gurudev", "Privana"];

const EASE = [0.22, 1, 0.36, 1];

// WhatsApp number to redirect to after a successful enquiry submission
const WHATSAPP_NUMBER = "919381055555";

/* ------------------------------------------------------------------ */
/*  WHATSAPP HELPER                                                    */
/* ------------------------------------------------------------------ */
function buildWhatsAppUrl({ name, phone, inquiryType, message }) {
  const lines = [
    `Hi PKR Estates, I'm ${name || "a visitor"}.`,
    inquiryType ? `I'm interested in: ${inquiryType}.` : null,
    phone ? `My contact number: ${phone}.` : null,
    message ? `Message: ${message}` : null,
  ].filter(Boolean);
  const text = lines.join(" ");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* Headline stays on ONE line. It's split into words only so they can
   stagger in — the row is `whitespace-nowrap`, so it never breaks.
   Font size is driven by vw (not the container), and the text is about
   13em wide, so ~5.9vw keeps it inside the viewport at every width
   while still capping at 4rem on large screens. */
const HEADLINE_WORDS = ["Crafting", "Your", "Perfect", "Space"];

/* ------------------------------------------------------------------ */
/*  ENQUIRE MODAL — identical to FloatingWidgets version               */
/* ------------------------------------------------------------------ */
function EnquireModal({ open, onClose, presetType }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", inquiryType: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setSubmitting(false);
      setSuccessMessage("");
      setErrorMessage("");
      setFieldErrors({});
      setForm({ name: "", email: "", phone: "", inquiryType: "", message: "" });
    } else if (presetType) {
      setForm((f) => ({ ...f, inquiryType: presetType }));
    }
  }, [open, presetType]);

  if (!open) return null;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setErrorMessage("");
    setFieldErrors({});

    const payload = {
      full_name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      inquiry_type: form.inquiryType,
      message: form.message.trim(),
    };

    try {
      const res = await fetch(ENQUIRY_API, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
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
          const keyMap = { full_name: "name", email: "email", phone: "phone", inquiry_type: "inquiryType", message: "message" };
          Object.entries(data.errors).forEach(([key, val]) => {
            const field = keyMap[key] || key;
            mapped[field] = Array.isArray(val) ? val[0] : String(val);
          });
          setFieldErrors(mapped);
        }
        setErrorMessage(data?.message || "Something went wrong while submitting your enquiry. Please try again.");
        setSubmitting(false);
        return;
      }

      setSuccessMessage(data.message || "Your enquiry has been received. Our team will reach out to you shortly.");
      setSubmitting(false);
      setSubmitted(true);

      // Build the WhatsApp redirect URL from the submitted form data
      const url = buildWhatsAppUrl({
        name: payload.full_name,
        phone: payload.phone,
        inquiryType: payload.inquiry_type,
        message: payload.message,
      });

      // Navigate straight to WhatsApp — no intermediate button/click needed
      window.location.href = url;
    } catch (err) {
      console.error("Enquiry submit failed:", err);
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.");
      setSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-xl border bg-[#F7FAFD] px-4 py-3 text-[14px] text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#0F3A6B]/15 ${
      fieldErrors[field] ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[#0F3A6B]"
    }`;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full w-full max-w-[460px] overflow-y-auto rounded-[22px] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
        style={{ animation: "enquireModalIn 0.35s cubic-bezier(0.22,1,0.36,1)" }}
      >
        <style>{`
          @keyframes enquireModalIn {
            from { opacity: 0; transform: translateY(16px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <div className="relative px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-7" style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)` }}>
          <button onClick={onClose} aria-label="Close" className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 sm:right-4 sm:top-4">
            <X className="h-4 w-4" strokeWidth={2.25} />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md sm:h-11 sm:w-11">
              <img src={LOGO_URL} alt="" className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="m-0 text-[17px] font-bold leading-tight text-white sm:text-[21px]">Let&apos;s Talk</h2>
              <p className="m-0 mt-0.5 text-[11.5px] text-[#f7e6c2] sm:text-[12.5px]">We&apos;ll get back to you within 24 hours</p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center sm:px-8 sm:py-14">
            <div className="flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16" style={{ backgroundColor: `${GOLD}1a` }}>
              <Check className="h-6 w-6 sm:h-7 sm:w-7" style={{ color: GOLD }} strokeWidth={2.5} />
            </div>
            <h3 className="m-0 text-[16px] font-bold text-gray-800 sm:text-[18px]">Thank You!</h3>
            <p className="m-0 max-w-[300px] text-[12.5px] leading-relaxed text-gray-500 sm:text-[13.5px]">{successMessage}</p>
            <p className="m-0 flex items-center gap-2 text-[11px] text-gray-400 sm:text-[12px]">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-500" />
              Redirecting you to WhatsApp...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 px-5 py-5 sm:gap-4 sm:px-8 sm:py-6">
            {errorMessage && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-[12.5px] leading-snug text-red-700 sm:text-[13px]">
                <AlertTriangle className="mt-[1px] h-4 w-4 shrink-0" strokeWidth={2} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-600 sm:text-[12.5px]">
                Full Name <span style={{ color: GOLD }}>*</span>
              </label>
              <input required type="text" name="full_name" placeholder="Enter your name" value={form.name} onChange={handleChange("name")} className={inputClass("name")} />
              {fieldErrors.name && <span className="text-[11px] text-red-600 sm:text-[11.5px]">{fieldErrors.name}</span>}
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-gray-600 sm:text-[12.5px]">
                  Email <span style={{ color: GOLD }}>*</span>
                </label>
                <input required type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange("email")} className={inputClass("email")} />
                {fieldErrors.email && <span className="text-[11px] text-red-600 sm:text-[11.5px]">{fieldErrors.email}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-gray-600 sm:text-[12.5px]">
                  Phone <span style={{ color: GOLD }}>*</span>
                </label>
                <input required type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange("phone")} className={inputClass("phone")} />
                {fieldErrors.phone && <span className="text-[11px] text-red-600 sm:text-[11.5px]">{fieldErrors.phone}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-600 sm:text-[12.5px]">
                Inquiry Type <span style={{ color: GOLD }}>*</span>
              </label>
              <div className="relative">
                <select required name="inquiry_type" value={form.inquiryType} onChange={handleChange("inquiryType")} className={`${inputClass("inquiryType")} appearance-none pr-10`}>
                  <option value="" disabled>
                    Select an option
                  </option>
                  {INQUIRY_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-gray-400" strokeWidth={2.25} />
              </div>
              {fieldErrors.inquiryType && <span className="text-[11px] text-red-600 sm:text-[11.5px]">{fieldErrors.inquiryType}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-600 sm:text-[12.5px]">
                Your Message <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea rows={3} name="message" placeholder="Tell us a bit more..." value={form.message} onChange={handleChange("message")} className={`${inputClass("message")} resize-none`} />
              {fieldErrors.message && <span className="text-[11px] text-red-600 sm:text-[11.5px]">{fieldErrors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl py-3 text-[13.5px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(184,134,11,0.55)] transition-all hover:shadow-[0_14px_30px_-8px_rgba(184,134,11,0.65)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3.5 sm:text-[14.5px]"
              style={{ background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)` }}
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" strokeWidth={2.25} />
                  Submit Enquiry
                </>
              )}
            </button>

            <p className="m-0 text-center text-[10.5px] text-gray-400 sm:text-[11px]">By submitting, you agree to be contacted by PKR Estates regarding your enquiry.</p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO BANNER                                                        */
/* ------------------------------------------------------------------ */
export default function PromiseHeroBanner() {
  const [enquireOpen, setEnquireOpen] = useState(false);

  return (
    <>
      <section
        id="contact"
        className="relative w-full overflow-hidden bg-[#F4F2ED] font-sans"
        style={{
          minHeight: "clamp(420px, 62vw, 660px)",
          height: "clamp(420px, 62vw, 660px)",
        }}
      >
        {/* Background texture */}
        <div className="absolute inset-0 z-0">
          <Image src={BG_IMAGE} alt="" fill priority sizes="100vw" className="object-cover" />
        </div>

        {/* Model cutout */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 0.9 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          className="pointer-events-none absolute bottom-0 right-[2%] z-20 hidden sm:right-[4%] sm:block md:right-[6%]"
          style={{ height: "100%", width: "42%", maxWidth: "420px" }}
        >
          <Image
            src={MODEL_IMAGE}
            alt="Happy resident"
            fill
            priority
            sizes="(max-width: 768px) 42vw, 34vw"
            className="object-contain object-bottom"
          />
        </motion.div>

        {/* Copy block — now centered */}
        <div className="absolute inset-0 z-30 flex items-center justify-center">
          <div className="w-full px-4 text-center sm:px-8">
            <div className="mx-auto max-w-[1200px]">
              <h1
                className="whitespace-nowrap leading-[1.15] tracking-[-0.01em]"
                style={{
                  fontSize: "clamp(1.15rem, 5.4vw, 4rem)",
                  color: CREAM,
                  fontWeight: 300,
                }}
              >
                {HEADLINE_WORDS.map((word, i) => (
                  <motion.span
                    key={word}
                    className="inline-block"
                    style={{ marginRight: i === HEADLINE_WORDS.length - 1 ? 0 : "0.22em" }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.9,
                      ease: EASE,
                      delay: 0.2 + i * 0.09,
                    }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                className="mx-auto mt-3.5 max-w-[420px] text-[12.5px] leading-relaxed sm:mt-6 sm:text-base"
                style={{ color: CREAM }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.85, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
              >
                Thoughtfully designed residences where comfort meets style your new chapter begins here.
              </motion.p>

              <motion.div
                className="mt-5 flex justify-center sm:mt-8"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.85 }}
              >
                <motion.button
                  type="button"
                  onClick={() => setEnquireOpen(true)}
                  className="inline-flex cursor-pointer items-center rounded-md bg-white px-6 py-2.5 text-[10.5px] font-bold tracking-[0.12em] shadow-md sm:px-9 sm:py-3.5 sm:text-xs sm:tracking-[0.15em]"
                  style={{ color: "#0F3A6B" }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  GET IN TOUCH
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquire Modal */}
      <EnquireModal
        open={enquireOpen}
        onClose={() => setEnquireOpen(false)}
        presetType="General Enquiry"
      />
    </>
  );
}
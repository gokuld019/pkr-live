"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

/* ---------------------------------------------------------
   usePageReady
   Resolves true after window "load" (images, fonts, hero
   sliders/videos) + two animation frames, so layout shifts
   during loading can't trigger reveals early.
--------------------------------------------------------- */
let pageReadyGlobal = false;

function usePageReady() {
  const [ready, setReady] = useState(pageReadyGlobal);

  useEffect(() => {
    if (pageReadyGlobal) {
      setReady(true);
      return;
    }

    let raf1 = 0;
    let raf2 = 0;
    let done = false;

    const markReady = () => {
      if (done) return;
      done = true;
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          pageReadyGlobal = true;
          setReady(true);
        });
      });
    };

    if (document.readyState === "complete") markReady();
    else window.addEventListener("load", markReady, { once: true });

    // Safety net if "load" is very slow (e.g. a large hero video)
    const fallback = setTimeout(markReady, 3000);

    return () => {
      window.removeEventListener("load", markReady);
      clearTimeout(fallback);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, []);

  return ready;
}

/* ---------------------------------------------------------
   useReveal
   Like useInView({ once: true }) but only latches to true when
   the page is ready AND the element is really on screen.
--------------------------------------------------------- */
export function useReveal(ref, { amount = 0.3, margin = "0px 0px -10% 0px" } = {}) {
  const ready = usePageReady();
  const inView = useInView(ref, { amount, margin });
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduceMotion) setRevealed(true);
    else if (ready && inView) setRevealed(true);
  }, [ready, inView, reduceMotion]);

  return revealed;
}

/* ---------------------------------------------------------
   SplitReveal: masked word-by-word slide up (headings)
--------------------------------------------------------- */
export function SplitReveal({ text, as: Tag = "h2", className = "", delay = 0, stagger = 0.06 }) {
  const ref = useRef(null);
  const show = useReveal(ref, { amount: 0.5 });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                className="inline-block will-change-transform"
                initial={{ y: "110%" }}
                animate={{ y: show ? "0%" : "110%" }}
                transition={{ duration: 0.9, delay: show ? delay + i * stagger : 0, ease: EASE }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

/* ---------------------------------------------------------
   WordReveal: lightweight word fade for paragraphs (no blur)
--------------------------------------------------------- */
export function WordReveal({ text, as: Tag = "p", className = "", delay = 0, stagger = 0.012 }) {
  const ref = useRef(null);
  const show = useReveal(ref, { amount: 0.25 });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <Fragment key={i}>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: show ? delay + i * stagger : 0, ease: EASE }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}

/* ---------------------------------------------------------
   FadeUp: generic block reveal
--------------------------------------------------------- */
export function FadeUp({ children, className = "", delay = 0, y = 24, amount = 0.3 }) {
  const ref = useRef(null);
  const show = useReveal(ref, { amount });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------
   CountUp: "77+" counts 0 -> 77 and keeps the suffix
--------------------------------------------------------- */
export function CountUp({ value, className = "", delay = 0, duration = 2 }) {
  const wrapRef = useRef(null);
  const numRef = useRef(null);
  const show = useReveal(wrapRef, { amount: 0.6 });

  // Primitive values only, so the effect doesn't restart on every render
  const parsed = /^(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const target = parsed ? parseFloat(parsed[1]) : null;
  const suffix = parsed ? parsed[2] : "";
  const decimals = parsed?.[1].split(".")[1]?.length ?? 0;

  useEffect(() => {
    if (!show || target === null) return;
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (numRef.current) numRef.current.textContent = `${v.toFixed(decimals)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [show, target, suffix, decimals, delay, duration]);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 30 }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      <span className="sr-only">{value}</span>
      <span ref={numRef} aria-hidden="true">
        {target === null ? value : `${(0).toFixed(decimals)}${suffix}`}
      </span>
    </motion.div>
  );
}
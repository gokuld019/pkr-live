"use client";

import { useEffect, useState } from "react";

/**
 * PromoPopup
 * -----------
 * Auto-opening promo modal — single full-bleed image, no overlaid text/content.
 * Uses a separate artwork for mobile (< 768px) and desktop/tablet.
 */

const DESKTOP_IMAGE_URL = "/popup.jpeg";
const MOBILE_IMAGE_URL = "/POP.png";

export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("pkrPromoShown");
    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("pkrPromoShown", "1");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div className="popup-overlay" onClick={() => setOpen(false)}>
      <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* UPDATED: Replaced text '&times;' with a perfectly centered SVG icon */}
        <button
          className="popup-close"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          <svg 
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <picture>
          <source media="(max-width: 767px)" srcSet={MOBILE_IMAGE_URL} />
          <img
            src={DESKTOP_IMAGE_URL}
            alt="Promo offer"
            className="popup-image"
          />
        </picture>
      </div>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 14px;
        }

        .popup-modal {
          position: relative;
          width: fit-content;
          max-width: 92vw;
          max-height: 85vh;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          line-height: 0;
        }

        .popup-image {
          display: block;
          width: auto;
          height: auto;
          max-width: 92vw;
          max-height: 85vh;
          object-fit: contain;
        }

        .popup-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.92);
          cursor: pointer;
          z-index: 2;
          color: #222;
          
          /* Flexbox ensures the SVG is perfectly centered */
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        
        .popup-close:hover {
          background: #fff;
          transform: scale(1.05);
        }

        @media (min-width: 480px) {
          .popup-overlay {
            padding: 16px;
          }
          .popup-modal {
            border-radius: 12px;
            max-height: 88vh;
          }
          .popup-image {
            max-height: 88vh;
          }
          .popup-close {
            top: 12px;
            right: 13px;
            width: 34px;
            height: 34px;
          }
        }

        @media (min-width: 768px) {
          .popup-modal {
            width: 1140px;
            max-width: min(92vw, 1140px);
            max-height: 90vh;
          }
          .popup-image {
            width: 100%;
            max-width: 100%;
            max-height: 90vh;
          }
          .popup-close {
            top: 14px;
            right: 16px;
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
}
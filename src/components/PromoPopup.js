"use client";

import { useEffect, useState } from "react";

/**
 * PromoPopup
 * -----------
 * Auto-opening promo modal — single full-bleed image, no overlaid text/content.
 * Just drop your ready-made promo graphic in and it displays at native aspect
 * ratio inside a fixed max size.
 *
 * EDIT:
 * - IMAGE_URL -> path to your single promo image in /public
 */

const IMAGE_URL = "/popup.jpeg";

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

  if (!open) return null;

  return (
    <div className="popup-overlay" onClick={() => setOpen(false)}>
      <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="popup-close"
          aria-label="Close"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>

        <img src={IMAGE_URL} alt="Promo offer" className="popup-image" />
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
          width: 1140px;
          max-width: min(92vw, 1140px);
          max-height: 85vh;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          line-height: 0;
        }

        .popup-image {
          display: block;
          width: 100%;
          height: auto;
          max-height: 85vh;
          object-fit: contain;
        }

        .popup-close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          background: rgba(255, 255, 255, 0.92);
          font-size: 19px;
          line-height: 1;
          cursor: pointer;
          z-index: 2;
          color: #222;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .popup-close:hover {
          background: #fff;
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
            width: 32px;
            height: 32px;
            font-size: 20px;
          }
        }

        @media (min-width: 768px) {
          .popup-modal {
            max-height: 90vh;
          }
          .popup-image {
            max-height: 90vh;
          }
          .popup-close {
            top: 14px;
            right: 16px;
            width: 34px;
            height: 34px;
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";

const ENQUIRE_LINK = "#contact";
const LOGO_URL = "/logo.jpeg";

export default function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Force preview bubble to show every time this component mounts (every page load)
  useEffect(() => {
    setShowPreview(true);
  }, []);

  const handleChatToggle = () => {
    setChatOpen((prev) => !prev);
    setShowPreview(false);
  };

  return (
    <>
      
        <a href={ENQUIRE_LINK}
        className="fixed top-1/2 right-0 z-[9998] -translate-y-1/2 rotate-180 [writing-mode:vertical-rl] rounded-l-md bg-[#b8860b] px-3.5 py-6 text-[15px] font-bold tracking-wider text-white shadow-[-2px_0_8px_rgba(0,0,0,0.2)] transition-all hover:bg-[#9a6f09] hover:pr-4 no-underline"
      >
        ENQUIRE NOW
      </a>

      <div className="fixed bottom-6 right-5 z-[9998] flex flex-col items-end gap-3 mb-15">
        {showPreview && !chatOpen && (
          <div className="relative flex max-w-[240px] mr-18 mb-[-70] items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-[0_6px_20px_rgba(0,0,0,0.18)]">
            <button
              onClick={() => setShowPreview(false)}
              aria-label="Dismiss"
              className="absolute -left-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[11px] leading-none text-white"
            >
              ✕
            </button>
            <span className="mt-0.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400" />
            <div>
              <div className="text-sm font-bold text-gray-800">We&apos;re Online!</div>
              <div className="text-[13px] text-gray-500">How may I assist you today?</div>
            </div>
          </div>
        )}

        <button
          aria-label="Open chat assistant"
          onClick={handleChatToggle}
          className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-white shadow-[0_6px_16px_rgba(0,0,0,0.25)] ring-2 ring-[#b8860b] transition-transform hover:scale-105"
        >
          <img src={LOGO_URL} alt="Chat" className="h-full w-full object-cover" />
        </button>
      </div>

      {chatOpen && (
        <div className="fixed bottom-[100px] right-5 z-[9999] flex h-[560px] w-[380px] max-w-[calc(100vw-40px)] max-h-[80vh] flex-col overflow-hidden rounded-2xl bg-[#fdfaf3] shadow-[0_12px_40px_rgba(0,0,0,0.3)] max-[480px]:right-3 max-[480px]:bottom-[90px] max-[480px]:w-[calc(100vw-24px)]">
          <div className="flex items-center justify-between bg-[#b8860b] px-4 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-[36px] w-[36px] items-center justify-center overflow-hidden rounded-full bg-white">
                <img src={LOGO_URL} alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">PKR Assistant</div>
                <div className="flex items-center gap-1 text-[11px] text-[#f5deb3]">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400" />
                  Active now
                </div>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              aria-label="Close chat"
              className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white/20 text-base text-white"
            >
              &times;
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-4">
            <div className="rounded-xl bg-white p-3 text-[13.5px] text-gray-800 shadow-sm">
              👋 Hello! Welcome to PKR Estates. How can I help you today?
            </div>

            <button className="flex items-center justify-between rounded-lg border border-[#eee0c8] bg-white px-3.5 py-3 text-left text-[13.5px] font-semibold text-gray-800 hover:border-[#b8860b] hover:bg-[#fdf6e3]">
              Ongoing Projects <span className="text-[#7a1f3d]">→</span>
            </button>
            <button className="flex items-center justify-between rounded-lg border border-[#eee0c8] bg-white px-3.5 py-3 text-left text-[13.5px] font-semibold text-gray-800 hover:border-[#b8860b] hover:bg-[#fdf6e3]">
              Gurudev &amp; Privana <span className="text-[#7a1f3d]">→</span>
            </button>
            <button className="flex items-center justify-between rounded-lg border border-[#eee0c8] bg-white px-3.5 py-3 text-left text-[13.5px] font-semibold text-gray-800 hover:border-[#b8860b] hover:bg-[#fdf6e3]">
              Contact Us <span className="text-[#7a1f3d]">→</span>
            </button>
          </div>

          <div className="flex items-center gap-2 border-t border-[#eee0c8] px-3.5 py-3">
            <input
              type="text"
              placeholder="Message PKR..."
              className="flex-1 rounded-full bg-[#f5efe0] px-3.5 py-2 text-[13px] outline-none"
            />
            <button
              aria-label="Send"
              className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#b8860b] text-white"
            >
              ➤
            </button>
          </div>
          <div className="pb-2.5 pt-1.5 text-center text-[10.5px] text-gray-400">
            Powered by PKR Estates
          </div>
        </div>
      )}
    </>
  );
}
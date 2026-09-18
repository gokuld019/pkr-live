// src/app/emicalculator/page.js
'use client'

import { useState, useMemo, useRef } from "react";
import { Figtree } from "next/font/google";
import {
  Home, Coins, Wallet, Percent, CalendarDays, RotateCcw, ArrowRight,
  Lightbulb, PiggyBank, Landmark, FileText, User, HeartHandshake,
} from "lucide-react";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

const CREAM = "#FFFFFF";
const DEEP_NAVY = "#0F3A6B";
const DEEP_NAVY_HOVER = "#0A2B50";
const DEEP_NAVY_DARK = "#0A2B50";
const TEXT_CHARCOAL = "#2D3A46";
const LIGHT_BLUE = "#E8F0F9";
const LIGHT_BLUE_SOFT = "#F0F6FC";
const LIGHT_BLUE_DEEP = "#D5E1ED";
const LINE = "#E0E8F0";
const TRACK = "#D5E1ED";

// Legacy aliases (kept so nothing else needs renaming)
const GOLD = DEEP_NAVY;
const GOLD_DEEP = DEEP_NAVY;
const GOLD_LIGHT = "#4A6FA5";
const INK = "#1E1B16";
const SUB = TEXT_CHARCOAL;
const CHIP_BG = LIGHT_BLUE_SOFT;

function formatINR(num) {
  return "₹" + Math.round(num).toLocaleString("en-IN");
}

function formatINRShort(num) {
  if (num >= 10000000) return `₹${(num / 10000000).toFixed(2)} Cr`;
  if (num >= 100000) return `₹${(num / 100000).toFixed(2)} L`;
  return formatINR(num);
}

function calcEmiAtRate(principal, rate, years) {
  const monthlyRate = rate / 12 / 100;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export default function EmiCalculatorPage() {
  const root = useRef(null);

  const [propertyValue, setPropertyValue] = useState(7500000);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);
  const [compareTab, setCompareTab] = useState("rate");
  const [hoveredBar, setHoveredBar] = useState(null);

  const downPayment = useMemo(() => Math.round((propertyValue * downPaymentPct) / 100), [propertyValue, downPaymentPct]);
  const loanAmount = useMemo(() => propertyValue - downPayment, [propertyValue, downPayment]);
  const emi = useMemo(() => calcEmiAtRate(loanAmount, interestRate, tenureYears), [loanAmount, interestRate, tenureYears]);
  const totalPayment = useMemo(() => emi * tenureYears * 12, [emi, tenureYears]);
  const totalInterest = useMemo(() => totalPayment - loanAmount, [totalPayment, loanAmount]);

  const principalPct = loanAmount > 0 ? Math.round((loanAmount / totalPayment) * 100) : 0;
  const interestPct = 100 - principalPct;

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const principalDash = (principalPct / 100) * circumference;

  const reset = () => {
    setPropertyValue(7500000);
    setDownPaymentPct(20);
    setInterestRate(8.5);
    setTenureYears(20);
  };

  const potentialSavings = useMemo(() => {
    const lowerRate = Math.max(6, interestRate - 1);
    const lowerEmi = calcEmiAtRate(loanAmount, lowerRate, tenureYears);
    const lowerTotalInterest = lowerEmi * tenureYears * 12 - loanAmount;
    return Math.max(0, totalInterest - lowerTotalInterest);
  }, [interestRate, tenureYears, loanAmount, totalInterest]);

  const compareData = useMemo(() => {
    if (compareTab === "rate") {
      const rates = [7.5, 8.5, 9.5, 10.5];
      return rates.map((val) => ({
        label: `${val}%`,
        emi: calcEmiAtRate(loanAmount, val, tenureYears),
        active: val === 8.5,
      }));
    }
    const tenures = [10, 15, 20, 25];
    return tenures.map((val) => ({
      label: `${val} Yrs`,
      emi: calcEmiAtRate(loanAmount, interestRate, val),
      active: val === 20,
    }));
  }, [compareTab, loanAmount, tenureYears, interestRate]);

  const maxCompareEmi = Math.max(...compareData.map((d) => d.emi));

  return (
    <main
      ref={root}
      className={`${figtree.className} min-h-screen relative overflow-x-hidden`}
      style={{ backgroundColor: CREAM, fontFamily: "var(--font-figtree), sans-serif" }}
    >
      {/* Hero Section */}
      <section className="w-full">
        <div className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] lg:h-[780px] flex overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl mx-3 mt-3 sm:mx-4 sm:mt-4 md:mx-8 md:mt-8">
          <div className="hero-img flex-[1.7] relative bg-cover bg-center mr-23" style={{ backgroundImage: `url(/emi.png)` }} />
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section className="w-full px-4 py-10 sm:py-12 md:px-8 md:py-14 lg:px-16 lg:py-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-start">
          {/* Left: Inputs card */}
          <div className="rounded-2xl border bg-white p-5 sm:p-6 md:p-8 shadow-sm h-full flex flex-col" style={{ borderColor: LINE }}>
            <div className="flex items-start gap-3.5 mb-6 sm:gap-4 sm:mb-8">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: LIGHT_BLUE }}>
                <Home className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} style={{ color: DEEP_NAVY }} />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: DEEP_NAVY }}>
                  Calculate Your EMI
                </h2>
                <p className="text-sm mt-1" style={{ color: TEXT_CHARCOAL }}>
                  Adjust the values to see your estimated monthly EMI.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 sm:gap-7 flex-1">
              <SliderField
                icon={Home}
                label="Property Value"
                value={formatINR(propertyValue)}
                min={2000000}
                max={50000000}
                step={100000}
                current={propertyValue}
                onChange={setPropertyValue}
                minLabel="₹20L"
                maxLabel="₹5Cr"
              />

              <SliderField
                icon={Coins}
                label="Down Payment"
                value={`${formatINR(downPayment)} (${downPaymentPct}%)`}
                min={0}
                max={70}
                step={1}
                current={downPaymentPct}
                onChange={setDownPaymentPct}
                minLabel="0%"
                maxLabel="70%"
              />

              {/* Loan Amount - readonly */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 rounded-xl px-4 py-4" style={{ backgroundColor: LIGHT_BLUE_SOFT }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: LIGHT_BLUE }}>
                  <Wallet className="w-5 h-5" strokeWidth={1.75} style={{ color: DEEP_NAVY }} />
                </div>
                <div className="flex-1 min-w-[110px]">
                  <div className="text-sm font-medium" style={{ color: DEEP_NAVY }}>Loan Amount</div>
                  <div className="text-[11px]" style={{ color: TEXT_CHARCOAL }}>(Auto calculated)</div>
                </div>
                <div className="text-base sm:text-lg font-bold" style={{ color: DEEP_NAVY }}>
                  {formatINR(loanAmount)}
                </div>
              </div>

              <SliderField
                icon={Percent}
                label="Interest Rate (p.a.)"
                value={`${interestRate}%`}
                min={5}
                max={15}
                step={0.1}
                current={interestRate}
                onChange={setInterestRate}
                minLabel="5%"
                maxLabel="15%"
              />

              <SliderField
                icon={CalendarDays}
                label="Loan Tenure"
                value={`${tenureYears} Years`}
                min={5}
                max={30}
                step={1}
                current={tenureYears}
                onChange={setTenureYears}
                minLabel="5 Yrs"
                maxLabel="30 Yrs"
              />
            </div>

            <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between mt-8 pt-6 border-t" style={{ borderColor: LINE }}>
              <button onClick={reset} className="inline-flex items-center justify-center gap-2 text-sm font-semibold transition-colors" style={{ color: TEXT_CHARCOAL }}>
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>

              <button
                className="inline-flex items-center justify-center gap-2 rounded-md px-5 sm:px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 w-full sm:w-auto"
                style={{ backgroundColor: DEEP_NAVY }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = DEEP_NAVY)}
              >
                View Amortization Schedule
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Results card */}
          <div className="rounded-2xl p-5 sm:p-6 md:p-8 h-full flex flex-col" style={{ backgroundColor: LIGHT_BLUE_SOFT }}>
            <div className="flex items-start gap-3.5 mb-6 sm:gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: LIGHT_BLUE }}>
                <PiggyBank className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.75} style={{ color: DEEP_NAVY }} />
              </div>
              <div>
                <div className="text-sm" style={{ color: TEXT_CHARCOAL }}>Your Estimated Monthly EMI</div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 break-words" style={{ color: DEEP_NAVY }}>
                  {formatINR(emi)}
                </div>
              </div>
            </div>

            <div className="h-px w-full mb-6" style={{ backgroundColor: LINE }} />

            <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-3 gap-4 sm:gap-4 mb-8">
              <StatBlock label="Loan Amount" value={formatINR(loanAmount)} />
              <StatBlock label="Total Interest" value={formatINR(totalInterest)} />
              <StatBlock label="Total Payment" value={formatINR(totalPayment)} />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-8 flex-1">
              {/* Donut chart */}
              <div className="relative shrink-0 w-[170px] h-[170px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px] mx-auto sm:mx-0">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r={radius} fill="none" stroke={TRACK} strokeWidth="24" />
                  <circle
                    cx="100" cy="100" r={radius} fill="none"
                    stroke={DEEP_NAVY} strokeWidth="24"
                    strokeDasharray={`${principalDash} ${circumference}`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 0.6s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
                  <div className="text-lg sm:text-xl font-bold" style={{ color: DEEP_NAVY }}>{formatINRShort(totalPayment)}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: TEXT_CHARCOAL }}>Total Payment</div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-4 w-full sm:w-auto">
                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: DEEP_NAVY }} />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: DEEP_NAVY }}>Principal Amount</div>
                    <div className="text-sm" style={{ color: TEXT_CHARCOAL }}>
                      {formatINR(loanAmount)} ({principalPct}%)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: TRACK }} />
                  <div>
                    <div className="text-sm font-semibold" style={{ color: DEEP_NAVY }}>Total Interest</div>
                    <div className="text-sm" style={{ color: TEXT_CHARCOAL }}>
                      {formatINR(totalInterest)} ({interestPct}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip callout */}
            <div className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: LIGHT_BLUE }}>
              <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: DEEP_NAVY }} />
              <p className="text-sm" style={{ color: TEXT_CHARCOAL }}>
                A lower interest rate can save you up to{" "}
                <span className="font-bold" style={{ color: DEEP_NAVY }}>
                  {formatINRShort(potentialSavings)}
                </span>{" "}
                over your loan tenure!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison + Banking Partners Section */}
      <section className="w-full px-4 py-4 pb-12 sm:pb-14 md:px-8 md:pb-16 lg:px-16">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-5 sm:gap-6">
          {/* Top: Comparison chart + Living room image */}
          <div className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]" style={{ backgroundColor: LIGHT_BLUE_SOFT }}>
            {/* Left: chart */}
            <div className="p-5 sm:p-6 md:p-8 flex flex-col">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: DEEP_NAVY }}>
                See How Small Changes Make a Big Difference
              </h3>
              <p className="text-sm mt-2 mb-6" style={{ color: TEXT_CHARCOAL }}>
                Compare EMIs for different interest rates and loan tenures.
              </p>

              {/* Tabs */}
              <div className="flex items-center gap-1 mb-10 w-full sm:w-fit overflow-x-auto">
                <button
                  onClick={() => setCompareTab("rate")}
                  className="text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap"
                  style={{
                    color: compareTab === "rate" ? "#fff" : DEEP_NAVY,
                    backgroundColor: compareTab === "rate" ? DEEP_NAVY : "transparent",
                  }}
                >
                  By Interest Rate
                </button>
                <button
                  onClick={() => setCompareTab("tenure")}
                  className="text-sm font-semibold px-3.5 sm:px-4 py-2 rounded-full transition-all duration-300 whitespace-nowrap"
                  style={{
                    color: compareTab === "tenure" ? "#fff" : DEEP_NAVY,
                    backgroundColor: compareTab === "tenure" ? DEEP_NAVY : "transparent",
                  }}
                >
                  By Loan Tenure
                </button>
              </div>

              {/* Bar chart */}
              <div className="relative flex-1 min-h-[200px] sm:min-h-[220px]">
                <div className="relative flex items-end justify-between gap-2 sm:gap-3 md:gap-5 h-full pb-9">
                  {compareData.map((item) => {
                    const heightPct = Math.max((item.emi / maxCompareEmi) * 100, 10);
                    const isActive = item.active;
                    const isHovered = hoveredBar === item.label;
                    const emphasize = isActive || isHovered;

                    return (
                      <div
                        key={item.label}
                        className="relative flex flex-col items-center justify-end flex-1 h-full cursor-pointer"
                        onMouseEnter={() => setHoveredBar(item.label)}
                        onMouseLeave={() => setHoveredBar(null)}
                      >
                        {/* Value badge */}
                        <div
                          className="absolute left-1/2 -translate-x-1/2 rounded-lg px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all duration-300"
                          style={{
                            bottom: `calc(${heightPct}% + 12px)`,
                            backgroundColor: emphasize ? DEEP_NAVY : "transparent",
                            color: emphasize ? "#fff" : DEEP_NAVY,
                          }}
                        >
                          {formatINR(item.emi)}
                        </div>

                        {/* Bar */}
                        <div
                          className="relative w-full max-w-[40px] sm:max-w-[48px] rounded-t-[10px] overflow-hidden transition-all duration-500 ease-out"
                          style={{
                            height: `${heightPct}%`,
                            backgroundColor: emphasize ? DEEP_NAVY : TRACK,
                          }}
                        />

                        {/* Label */}
                        <span
                          className="absolute -bottom-7 text-[11px] sm:text-xs transition-all duration-300"
                          style={{
                            color: emphasize ? DEEP_NAVY : TEXT_CHARCOAL,
                            fontWeight: emphasize ? 700 : 500,
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right: image with quote */}
            <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-0">
              <img src="/emi2.png" alt="Modern living room" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>

          {/* Bottom: Benefits + Banking Partners */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
            {/* Home Loan Benefits */}
            <div className="rounded-2xl border bg-white p-5 sm:p-6 md:p-8 h-full" style={{ borderColor: LINE }}>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-5 sm:mb-6" style={{ color: DEEP_NAVY }}>
                Home Loan Benefits
              </h3>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-5 sm:gap-6">
                {[
                  { icon: Landmark, text: ["Tax Benefits", "Under Section 80C & 24(b)"] },
                  { icon: FileText, text: ["Flexible", "Tenure Options"] },
                  { icon: User, text: ["Attractive", "Interest Rates"] },
                  { icon: HeartHandshake, text: ["Build Long-Term", "Wealth"] },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: LIGHT_BLUE }}>
                        <Icon className="w-5 h-5" strokeWidth={1.75} style={{ color: DEEP_NAVY }} />
                      </div>
                      <p className="text-sm leading-snug" style={{ color: DEEP_NAVY }}>
                        <span className="font-semibold">{item.text[0]}</span>
                        <br />
                        <span style={{ color: TEXT_CHARCOAL }}>{item.text[1]}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Banking Partners */}
            <div className="rounded-2xl border bg-white p-5 sm:p-6 md:p-8 h-full flex flex-col" style={{ borderColor: LINE }}>
              <h3 className="text-base sm:text-lg md:text-xl font-bold" style={{ color: DEEP_NAVY }}>
                Our Banking Partners
              </h3>
              <p className="text-sm mt-1 mb-6" style={{ color: TEXT_CHARCOAL }}>
                We work with leading banks to help you get the best home loan offers.
              </p>

              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-auto">
                {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak"].map((bank) => (
                  <span
                    key={bank}
                    className="inline-flex items-center rounded-full px-3.5 sm:px-4 py-2 text-[13px] sm:text-sm font-semibold border transition-colors"
                    style={{ borderColor: LINE, color: DEEP_NAVY, backgroundColor: LIGHT_BLUE_SOFT }}
                  >
                    {bank}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SliderField({ icon: Icon, label, value, min, max, step, current, onChange, minLabel, maxLabel }) {
  const pct = ((current - min) / (max - min)) * 100;

  return (
    <div className="flex items-start gap-3.5 sm:gap-4">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: LIGHT_BLUE }}>
        <Icon className="w-5 h-5" strokeWidth={1.75} style={{ color: DEEP_NAVY }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mb-2">
          <span className="text-sm font-medium" style={{ color: TEXT_CHARCOAL }}>{label}</span>
          <span className="text-sm font-bold" style={{ color: DEEP_NAVY }}>{value}</span>
        </div>

        <div className="relative h-1.5 rounded-full" style={{ backgroundColor: LINE }}>
          <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${pct}%`, backgroundColor: DEEP_NAVY }} />
          <input
            type="range"
            min={min} max={max} step={step} value={current}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer"
          />
          <div
            className="absolute top-1/2 w-4 h-4 rounded-full bg-white border-2 shadow -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            style={{ left: `${pct}%`, borderColor: DEEP_NAVY }}
          />
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px]" style={{ color: TEXT_CHARCOAL }}>{minLabel}</span>
          <span className="text-[11px]" style={{ color: TEXT_CHARCOAL }}>{maxLabel}</span>
        </div>
      </div>
    </div>
  );
}

function StatBlock({ label, value }) {
  return (
    <div className="min-w-0">
      <div className="text-[11px] mb-1" style={{ color: TEXT_CHARCOAL }}>{label}</div>
      <div className="text-[13px] sm:text-sm md:text-base font-bold break-words" style={{ color: DEEP_NAVY }}>{value}</div>
    </div>
  );
}
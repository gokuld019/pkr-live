// src/app/emicalculator/page.js
'use client'

import { useState, useMemo, useRef } from "react";
import { Figtree } from "next/font/google";
import {
  Home,
  Coins,
  Wallet,
  Percent,
  CalendarDays,
  RotateCcw,
  ArrowRight,
  Lightbulb,
  PiggyBank,
  Landmark,
  FileText,
  User,
  HeartHandshake,
} from "lucide-react";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
});

const CREAM = "#FBF8F2";
const GOLD = "#B08D3F";
const GOLD_DEEP = "#8A6B2E";
const NAVY = "#0F1C2E";
const LINE = "#E8DFCB";

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

  const downPayment = useMemo(
    () => Math.round((propertyValue * downPaymentPct) / 100),
    [propertyValue, downPaymentPct]
  );

  const loanAmount = useMemo(() => propertyValue - downPayment, [propertyValue, downPayment]);

  const emi = useMemo(() => {
    return calcEmiAtRate(loanAmount, interestRate, tenureYears);
  }, [loanAmount, interestRate, tenureYears]);

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
        <div className="relative w-full h-[400px] md:h-[520px] flex overflow-hidden rounded-2xl md:rounded-3xl mx-4 mt-4 md:mx-8 md:mt-8">
          <div
            className="hero-img flex-[1.7] relative bg-cover bg-center"
            style={{ backgroundImage: `url(/mission.jpeg)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section className="w-full px-4 py-16 md:px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: Inputs card */}
          <div
            className="rounded-2xl border bg-white p-6 md:p-8 shadow-sm h-full flex flex-col"
            style={{ borderColor: LINE }}
          >
            <div className="flex items-start gap-4 mb-8">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: "#F3ECDA" }}
              >
                <Home className="w-6 h-6" style={{ color: GOLD_DEEP }} strokeWidth={1.75} />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold" style={{ color: NAVY }}>
                  Calculate Your EMI
                </h2>
                <p className="text-sm text-neutral-500 mt-1">
                  Adjust the values to see your estimated monthly EMI.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-7 flex-1">
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
              <div className="flex items-center gap-4 rounded-xl px-4 py-4" style={{ backgroundColor: "#F7F4EC" }}>
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "#EFE7D3" }}
                >
                  <Wallet className="w-5 h-5" style={{ color: GOLD_DEEP }} strokeWidth={1.75} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-700">Loan Amount</div>
                  <div className="text-[11px] text-neutral-400">(Auto calculated)</div>
                </div>
                <div className="text-lg font-bold" style={{ color: NAVY }}>
                  {formatINR(loanAmount)}
                </div>
              </div>

              <SliderField
                icon={Percent}
                label="Interest Rate (p.a.)"
                value={`${interestRate}%`}
                min={6}
                max={12}
                step={0.1}
                current={interestRate}
                onChange={setInterestRate}
                minLabel="6%"
                maxLabel="12%"
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

            <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: LINE }}>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>

              <button
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: GOLD_DEEP }}
              >
                View Amortization Schedule
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Results card */}
          <div className="rounded-2xl p-6 md:p-8 text-white h-full flex flex-col" style={{ backgroundColor: NAVY }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-white/10">
                <PiggyBank className="w-6 h-6" style={{ color: GOLD }} strokeWidth={1.75} />
              </div>
              <div>
                <div className="text-sm text-white/70">Your Estimated Monthly EMI</div>
                <div className="text-3xl md:text-4xl font-bold mt-1" style={{ color: GOLD }}>
                  {formatINR(emi)}
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-white/10 mb-6" />

            <div className="grid grid-cols-3 gap-4 mb-8">
              <StatBlock label="Loan Amount" value={formatINR(loanAmount)} />
              <StatBlock label="Total Interest" value={formatINR(totalInterest)} />
              <StatBlock label="Total Payment" value={formatINR(totalPayment)} />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 flex-1">
              {/* Donut chart */}
              <div className="relative shrink-0 w-[200px] h-[200px] mx-auto sm:mx-0">
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r={radius} fill="none" stroke="#2E5AAC" strokeWidth="24" />
                  <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    stroke={GOLD}
                    strokeWidth="24"
                    strokeDasharray={`${principalDash} ${circumference}`}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 0.6s ease" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-xl font-bold">{formatINRShort(totalPayment)}</div>
                  <div className="text-[11px] text-white/60 mt-0.5">Total Payment</div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex flex-col gap-4 w-full sm:w-auto">
                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: GOLD }} />
                  <div>
                    <div className="text-sm font-semibold">Principal Amount</div>
                    <div className="text-sm text-white/70">
                      {formatINR(loanAmount)} ({principalPct}%)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: "#2E5AAC" }} />
                  <div>
                    <div className="text-sm font-semibold">Total Interest</div>
                    <div className="text-sm text-white/70">
                      {formatINR(totalInterest)} ({interestPct}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tip callout */}
            <div className="flex items-start gap-3 rounded-xl p-4" style={{ backgroundColor: "#EFE7D3" }}>
              <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: GOLD_DEEP }} />
              <p className="text-sm" style={{ color: NAVY }}>
                A lower interest rate can save you up to{" "}
                <span className="font-bold" style={{ color: GOLD_DEEP }}>
                  {formatINRShort(potentialSavings)}
                </span>{" "}
                over your loan tenure!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison + Banking Partners Section */}
      <section className="w-full px-4 py-4 pb-16 md:px-8 lg:px-16">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-6">
          {/* Top: Comparison chart + Living room image */}
          <div
            className="rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]"
            style={{ backgroundColor: "#F7F4EC" }}
          >
            {/* Left: chart */}
            <div className="p-6 md:p-8 flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold" style={{ color: NAVY }}>
                See How Small Changes Make a Big Difference
              </h3>
              <p className="text-sm text-neutral-500 mt-2 mb-6">
                Compare EMIs for different interest rates and loan tenures.
              </p>

              {/* Tabs */}
              <div className="flex items-center gap-1 mb-8 rounded-full p-1 w-fit" style={{ backgroundColor: "#EFE7D3" }}>
                <button
                  onClick={() => setCompareTab("rate")}
                  className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                  style={{
                    color: compareTab === "rate" ? "#fff" : NAVY,
                    backgroundColor: compareTab === "rate" ? GOLD_DEEP : "transparent",
                  }}
                >
                  By Interest Rate
                </button>
                <button
                  onClick={() => setCompareTab("tenure")}
                  className="text-sm font-semibold px-4 py-2 rounded-full transition-colors"
                  style={{
                    color: compareTab === "tenure" ? "#fff" : NAVY,
                    backgroundColor: compareTab === "tenure" ? GOLD_DEEP : "transparent",
                  }}
                >
                  By Loan Tenure
                </button>
              </div>

              {/* Bar chart */}
              <div className="flex items-end justify-between gap-4 md:gap-6 h-[200px] flex-1">
                {compareData.map((item) => {
                  const heightPct = Math.max((item.emi / maxCompareEmi) * 100, 8);
                  const isActive = item.active;
                  return (
                    <div key={item.label} className="flex flex-col items-center justify-end flex-1 h-full group">
                      <span
                        className="text-sm font-bold mb-2 transition-transform group-hover:-translate-y-0.5"
                        style={{ color: isActive ? GOLD_DEEP : NAVY }}
                      >
                        {formatINR(item.emi)}
                      </span>
                      <div
                        className="w-full max-w-[64px] rounded-t-xl transition-all duration-500 ease-out shadow-sm group-hover:opacity-90"
                        style={{
                          height: `${heightPct}%`,
                          background: isActive
                            ? `linear-gradient(180deg, ${GOLD} 0%, ${GOLD_DEEP} 100%)`
                            : "linear-gradient(180deg, #D5DEEA 0%, #C7D2E0 100%)",
                        }}
                      />
                      <div className="w-full max-w-[64px] h-[3px] rounded-full mt-0" style={{ backgroundColor: isActive ? GOLD_DEEP : "#B9C3D1" }} />
                      <span
                        className="text-xs mt-3"
                        style={{ color: isActive ? NAVY : "#9CA3AF", fontWeight: isActive ? 700 : 500 }}
                      >
                        {item.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: image with quote */}
            <div className="relative min-h-[280px] lg:min-h-0">
              <img
                src="/livingroom.jpeg"
                alt="Modern living room"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(247,244,236,0.95) 0%, rgba(247,244,236,0.5) 35%, transparent 60%)",
                }}
              />
              <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-8 max-w-[260px]">
                <p className="text-lg md:text-xl leading-snug italic" style={{ color: NAVY }}>
                  &ldquo;Invest in a home that grows with your aspirations.&rdquo;
                </p>
                <span className="block h-px w-8 mt-4" style={{ backgroundColor: GOLD }} />
              </div>
            </div>
          </div>

          {/* Bottom: Benefits + Banking Partners */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {/* Home Loan Benefits */}
            <div className="rounded-2xl border bg-white p-6 md:p-8 h-full" style={{ borderColor: LINE }}>
              <h3 className="text-lg md:text-xl font-bold mb-6" style={{ color: NAVY }}>
                Home Loan Benefits
              </h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Landmark, text: ["Tax Benefits", "Under Section 80C & 24(b)"] },
                  { icon: FileText, text: ["Flexible", "Tenure Options"] },
                  { icon: User, text: ["Attractive", "Interest Rates"] },
                  { icon: HeartHandshake, text: ["Build Long-Term", "Wealth"] },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "#F3ECDA" }}
                      >
                        <Icon className="w-5 h-5" style={{ color: GOLD_DEEP }} strokeWidth={1.75} />
                      </div>
                      <p className="text-sm leading-snug" style={{ color: NAVY }}>
                        <span className="font-semibold">{item.text[0]}</span>
                        <br />
                        <span className="text-neutral-500">{item.text[1]}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Banking Partners */}
            <div className="rounded-2xl border bg-white p-6 md:p-8 h-full flex flex-col" style={{ borderColor: LINE }}>
              <h3 className="text-lg md:text-xl font-bold" style={{ color: NAVY }}>
                Our Banking Partners
              </h3>
              <p className="text-sm text-neutral-500 mt-1 mb-6">
                We work with leading banks to help you get the best home loan offers.
              </p>

              {/* Badge-chip style partner strip.
                  No official npm/Next.js package ships real bank logos (they're
                  trademarked assets). Drop official files in /public/banks/ and
                  swap each chip below for:
                  <Image src="/banks/sbi.png" alt="SBI" width={72} height={24} />
              */}
              <div className="flex flex-wrap items-center gap-3 mt-auto">
                {["SBI", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak"].map((bank) => (
                  <span
                    key={bank}
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold border transition-colors hover:bg-[#F7F4EC]"
                    style={{ borderColor: LINE, color: NAVY }}
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
    <div className="flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
        style={{ backgroundColor: "#F3ECDA" }}
      >
        <Icon className="w-5 h-5" style={{ color: GOLD_DEEP }} strokeWidth={1.75} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-neutral-700">{label}</span>
          <span className="text-sm font-bold" style={{ color: NAVY }}>
            {value}
          </span>
        </div>

        <div className="relative h-1.5 rounded-full" style={{ backgroundColor: LINE }}>
          <div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ width: `${pct}%`, backgroundColor: GOLD_DEEP }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={current}
            onChange={(e) => onChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-1.5 opacity-0 cursor-pointer"
          />
          <div
            className="absolute top-1/2 w-4 h-4 rounded-full bg-white border-2 shadow -translate-y-1/2 -translate-x-1/2 pointer-events-none"
            style={{ left: `${pct}%`, borderColor: GOLD_DEEP }}
          />
        </div>

        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px] text-neutral-400">{minLabel}</span>
          <span className="text-[11px] text-neutral-400">{maxLabel}</span>
        </div>
      </div>
    </div>
  );
}

function StatBlock({ label, value }) {
  return (
    <div>
      <div className="text-[11px] text-white/60 mb-1">{label}</div>
      <div className="text-sm md:text-base font-bold">{value}</div>
    </div>
  );
}
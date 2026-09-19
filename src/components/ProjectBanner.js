// src/components/project-banner.jsx
'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Figtree } from 'next/font/google'
import * as THREE from 'three'
import {
  Download, ChevronLeft, ChevronRight, MapPin, School, Hospital, TrainFront, Bus, Plane,
  Building2, BedDouble, Bath, Sofa, Play, Maximize2, Sparkles, Images, X, ArrowUpRight,
  ArrowRight, Maximize, Tag, Layers, FileText, Leaf, Users, Gem, Ruler, CalendarCheck,
  ShieldCheck, Waves, Landmark, Baby, Gamepad2, Zap, Heart, ShoppingBag, Trees,
  ArrowUpDown, Recycle, Car, Sun, LayoutGrid, ZoomIn, ZoomOut, Toilet, CookingPot,
  Fence, Navigation, Coins, Home, Phone, Navigation2, Move3d, Compass, RefreshCw,
  Send, Check, AlertTriangle, MapPinned, ParkingSquare, Expand,
} from 'lucide-react'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const EASE = [0.22, 1, 0.36, 1]
const FONT = figtree.style.fontFamily

// ============ THEME TOKENS ============
const DEEP_NAVY = '#0F3A6B'
const DEEP_NAVY_HOVER = '#0A2B50'
const DEEP_NAVY_DARK = '#0A2B50'
const TEXT_CHARCOAL = '#2D3A46'
const LIGHT_BLUE = '#E8F0F9'
const LIGHT_BLUE_SOFT = '#F0F6FC'

const GOLD = DEEP_NAVY
const GOLD_HOVER = DEEP_NAVY_HOVER
const GOLD_DARK = DEEP_NAVY_DARK

const LOGO_URL = '/logo.jpeg'
const ENQUIRY_API = 'https://api.crazystory.in/api/submit-enquiry'

// Mobile banner is a dedicated 380 x 700 artwork
const MOBILE_BANNER_W = 380
const MOBILE_BANNER_H = 700

const landmarkIconMap = {
  Schools: School, Hospitals: Hospital, 'Railway Station': TrainFront,
  'Bus Stand': Bus, Airport: Plane,
}

function getLandmarkIcon(label) {
  if (landmarkIconMap[label]) return landmarkIconMap[label]
  const match = Object.entries(landmarkIconMap).find(([key]) => label?.includes(key))
  return match ? match[1] : MapPin
}

const highlightIconMap = { leaf: Leaf, family: Users, gem: Gem }

const defaultHighlights = [
  { icon: 'leaf', label: 'Thoughtful Design' },
  { icon: 'family', label: 'Family Friendly' },
  { icon: 'gem', label: 'A Brighter Tomorrow' },
]

const DEFAULT_QUICK_FACTS = [
  { label: 'Type', value: '1 & 2 BHK Apartments', icon: 'type' },
  { label: 'Development Size', value: '11.57 Acres', icon: 'size' },
  { label: 'No. of Units', value: '90', icon: 'units' },
  { label: 'Price / Sq.Ft', value: '₹ 6299 per / Sq.Ft', icon: 'price' },
  { label: 'Floors', value: 'Stilt + 5', icon: 'floors' },
  { label: 'RERA Number', value: 'TN/35/Layout/1718/2024', icon: 'rera' },
]

const factIconMap = {
  type: Building2, units: Building2, floors: Layers, unitSize: Ruler,
  size: Maximize, price: Tag, rera: FileText, possession: CalendarCheck, approval: ShieldCheck,
}

function getFactIcon(label = '') {
  const l = label.toLowerCase()
  if (l.includes('unit size')) return Ruler
  if (l.includes('size') || l.includes('acre')) return Maximize
  if (l.includes('price')) return Tag
  if (l.includes('floor')) return Layers
  if (l.includes('rera')) return FileText
  if (l.includes('possession')) return CalendarCheck
  if (l.includes('approv')) return ShieldCheck
  return Building2
}

const amenityIconMap = {
  'Swimming Pool': Waves, 'Club House': Landmark, "Children's Play Area": Baby,
  'Landscaped Gardens': Leaf, 'Walking Track': Users, 'Indoor Games': Gamepad2,
  '24/7 Security': ShieldCheck, 'EV Charging': Zap, Shops: ShoppingBag,
  'Security Cabin with CCTV': ShieldCheck, Park: Trees, 'Avenue Trees': Trees,
  Elevator: ArrowUpDown, 'Sewage Treatment Plant (STP)': Recycle, 'Car Parking': Car,
}

function getAmenityIcon(label = '') {
  if (amenityIconMap[label]) return amenityIconMap[label]
  const l = label.toLowerCase()
  if (l.includes('parking')) return Car
  if (l.includes('park') || l.includes('tree') || l.includes('garden')) return Trees
  if (l.includes('shop')) return ShoppingBag
  if (l.includes('elevator') || l.includes('lift')) return ArrowUpDown
  if (l.includes('stp') || l.includes('sewage') || l.includes('recycle')) return Recycle
  if (l.includes('security') || l.includes('cctv')) return ShieldCheck
  if (l.includes('play')) return Baby
  if (l.includes('walk')) return Users
  return Sparkles
}

const DEFAULT_AMENITIES_TABS = [
  { title: 'Swimming Pool', eyebrow: 'Rejuvenate', description: 'Take a refreshing break and unwind in our beautifully designed swimming pool, crafted for relaxation and recreation.', tags: ['Modern Design', 'Spacious Deck', 'Relax & Unwind'], image: '/amenities/amenities.jpeg' },
  { title: 'Club House', eyebrow: 'Gather', description: 'A welcoming space for residents to meet, celebrate and unwind together.', tags: ['Event Ready', 'Community Hub', 'All-Day Access'], image: '/amenities/amenities3.jpeg' },
  { title: "Children's Play Area", eyebrow: 'Play', description: 'A safe, cheerful play zone designed to keep the little ones active and happy.', tags: ['Soft Flooring', 'Supervised', 'Age Friendly'], image: '/amenities/amenities4.jpeg' },
  { title: 'Landscaped Gardens', eyebrow: 'Breathe', description: 'Lush green pockets threaded through the community for quiet morning walks.', tags: ['Native Plants', 'Shaded Paths', 'Fresh Air'], image: '/amenities/amenities5.jpeg' },
  { title: 'Walking Track', eyebrow: 'Move', description: 'A dedicated track for your daily walk, jog or evening stroll.', tags: ['Non-Slip Surface', 'Well Lit', 'Full Loop'], image: '/amenities/amenities6.jpeg' },
  { title: 'Indoor Games', eyebrow: 'Unwind', description: 'A dedicated room for table tennis, carrom and more, for every age group.', tags: ['Multiple Games', 'Climate Controlled', 'Open Daily'], image: '/amenities/amenities7.jpeg' },
  { title: '24/7 Security', eyebrow: 'Assurance', description: 'Round-the-clock surveillance and trained personnel for complete peace of mind.', tags: ['CCTV Covered', 'Manned Gates', 'Visitor Log'], image: '/amenities/amenities.jpeg' },
  { title: 'EV Charging', eyebrow: 'Sustain', description: 'Dedicated charging points in the parking bay, ready for your electric vehicle.', tags: ['Fast Charging', 'Covered Bay', 'Metered'], image: '/amenities/amenities3.jpeg' },
]

const DEFAULT_AMENITY_STATS = [
  { icon: 'leaf', value: '25+', label: 'Lifestyle Amenities' },
  { icon: 'users', value: 'Spacious', label: 'Community Living' },
  { icon: 'shield', value: 'Safe & Secure', label: 'Environment' },
  { icon: 'heart', value: 'Designed for', label: 'All Age Groups' },
]

const amenityStatIconMap = { leaf: Leaf, users: Users, shield: ShieldCheck, heart: Heart }

const FLOOR_PLAN_HIGHLIGHTS = [
  { icon: LayoutGrid, label: ['Efficient', 'Layouts'] },
  { icon: Sun, label: ['Abundant', 'Natural Light'] },
  { icon: Layers, label: ['Optimal', 'Space Utilisation'] },
]

function getRoomIcon(label = '') {
  const l = label.toLowerCase()
  if (l.includes('bed')) return BedDouble
  if (l.includes('toilet')) return Toilet
  if (l.includes('bath')) return Bath
  if (l.includes('living') || l.includes('hall')) return Sofa
  if (l.includes('kitchen')) return CookingPot
  if (l.includes('balcon')) return Fence
  return Sparkles
}

function planMatchesTab(plan, label) {
  if (!label) return true
  if (plan.type) return plan.type === label
  return (plan.title || '').toLowerCase().startsWith(label.toLowerCase())
}

function splitPlanTitle(plan) {
  const title = plan?.title || ''
  const [config, ...rest] = title.split('·').map((s) => s.trim())
  return { config: plan?.config || config, facing: plan?.facing || rest.join(' · ') }
}

function formatArea(area = '') {
  const value = String(area).trim()
  return /\d/.test(value) ? value : ''
}

function getPlanRooms(plan) {
  if (!plan) return []
  if (plan.rooms?.length) return plan.rooms
  if (plan.features?.length) return plan.features.map((f) => f.label)
  return []
}

const DEFAULT_TYPE_INFO = [
  [/^studio/i, 'Compact, self-contained homes where the living, sleeping and kitchenette zones flow into one bright, easy-to-maintain space — ideal for singles, students and first-time buyers.'],
  [/^1\s*bhk/i, 'A private bedroom with a separate living and kitchen area — the right balance of comfort and affordability for couples, small families and investors.'],
  [/^3\s*bhk/i, 'Our most spacious configuration, with three bedrooms, generous common areas and ample storage — built for larger families who want room to grow.'],
  [/^2\s*bhk.*2\s*t/i, 'Two bedrooms with two full bathrooms, so mornings never clash. A wide living-cum-dining area keeps the home social while the bedrooms stay private.'],
  [/^2\s*bhk.*1\s*t/i, 'Two well-proportioned bedrooms sharing a single bathroom — an efficient plan that puts more of the carpet area into the living and bedroom spaces.'],
  [/^2\s*bhk/i, 'Two well-proportioned bedrooms around a shared living-cum-dining space, planned for growing families who want comfort without wasted corridors.'],
]

function getPlanGroupInfo(label, project, block) {
  const custom = block?.tabInfo?.[label] || project?.floorPlanTypeInfo?.[label]
  if (custom) return custom
  const match = DEFAULT_TYPE_INFO.find(([pattern]) => pattern.test(label || ''))
  if (match) return match[1]
  return 'Layouts planned around easy circulation, cross ventilation and natural light — with every square foot put to use.'
}

const DEFAULT_PLOT_TABS = [
  { id: 'all', label: 'All Plots' },
  { id: 'residential', label: 'Residential' },
  { id: 'premium', label: 'Premium' },
  { id: 'corner', label: 'Corner Plots' },
]

const DEFAULT_PLOT_PRICING = [
  { sqft: 600, priceLakhs: 28.5, categories: ['residential'] },
  { sqft: 800, priceLakhs: 36.8, categories: ['residential'] },
  { sqft: 1000, priceLakhs: 45, categories: ['residential', 'corner'] },
  { sqft: 1200, priceLakhs: 52.5, categories: ['residential'] },
  { sqft: 1500, priceLakhs: 63, categories: ['premium'] },
  { sqft: 1800, priceLakhs: 74.5, categories: ['premium', 'corner'] },
  { sqft: 2400, priceLakhs: 96, categories: ['premium', 'corner'] },
  { sqft: 3000, priceLakhs: 122, categories: ['premium'] },
]

// Last column is now an Enquire action (replaces the old Status column)
const PLOT_TABLE_HEADERS = [
  ['Plot Size', '(Sq.Ft.)'], ['Plot Size', '(Sq.Yd.)'],
  ['Price', '(₹ Lakhs)'], ['Enquire', ''],
]

const PLOT_FEATURES = [
  { icon: ShieldCheck, title: 'Clear Titles', text: ['Hassle-free', 'ownership'] },
  { icon: Coins, title: 'Competitive Pricing', text: ['Great value', 'for your investment'] },
  { icon: Leaf, title: 'Future Growth', text: ['A location with', 'lasting potential'] },
]

const PLOT_BENEFITS = [
  { icon: Home, title: 'Multiple Plot Sizes', text: 'Options for every need' },
  { icon: Coins, title: 'Transparent Pricing', text: 'No hidden costs' },
  { icon: FileText, title: 'Easy Purchase Process', text: 'Simple & secure' },
  { icon: Leaf, title: 'A Greener, Healthier Lifestyle', text: 'Thoughtfully planned spaces' },
]

function formatPlotPrice(plot) {
  if (plot.priceLabel) return plot.priceLabel
  const lakhs = Number(plot.priceLakhs)
  if (!Number.isFinite(lakhs)) return '—'
  if (lakhs >= 100) return `₹ ${(lakhs / 100).toFixed(2)} Cr`
  return `₹ ${lakhs.toFixed(2)}`
}

function getPlotSqYd(plot) {
  if (plot.sqyd) return plot.sqyd
  const sqft = Number(plot.sqft)
  return Number.isFinite(sqft) ? Math.round(sqft / 9) : '—'
}

function PlotCell({ children, divider = true }) {
  return (
    <div className="relative flex items-center justify-center px-1.5 sm:px-3">
      {divider && <span className="absolute left-0 top-1/2 h-6 w-px -translate-y-1/2 bg-[#E0E8F0]" />}
      {children}
    </div>
  )
}

const masterPlanIconMap = { site: MapPinned, parking: ParkingSquare }

function getMasterPlanIcon(id = '') {
  return masterPlanIconMap[id] || MapPinned
}

/* ==================================================================
   ENQUIRE MODAL
================================================================== */
function EnquireModal({ open, onClose, presetType = '', projectName = '' }) {
  const INQUIRY_TYPES = ['General Enquiry', 'Gurudev', 'Privana']
  const [form, setForm] = useState({ name: '', email: '', phone: '', inquiryType: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [open, onClose])

  useEffect(() => {
    if (!open) {
      setSubmitted(false); setSubmitting(false); setSuccessMessage(''); setErrorMessage(''); setFieldErrors({})
      setForm({ name: '', email: '', phone: '', inquiryType: '', message: '' })
    } else if (presetType) {
      setForm((f) => ({ ...f, inquiryType: presetType }))
    }
  }, [open, presetType])

  if (!open) return null

  const handleChange = (field) => (e) => {
    const value = e.target.value
    setForm((f) => ({ ...f, [field]: value }))
    setFieldErrors((errs) => { if (!errs[field]) return errs; const next = { ...errs }; delete next[field]; return next })
    if (errorMessage) setErrorMessage('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true); setErrorMessage(''); setFieldErrors({})

    const payload = {
      full_name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(),
      inquiry_type: form.inquiryType, message: form.message.trim(),
    }

    try {
      const res = await fetch(ENQUIRY_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      let data = null
      try { data = await res.json() } catch { data = null }

      if (!res.ok || !data || data.status !== true) {
        if (data?.errors && typeof data.errors === 'object') {
          const mapped = {}
          const keyMap = { full_name: 'name', email: 'email', phone: 'phone', inquiry_type: 'inquiryType', message: 'message' }
          Object.entries(data.errors).forEach(([key, val]) => {
            const field = keyMap[key] || key
            mapped[field] = Array.isArray(val) ? val[0] : String(val)
          })
          setFieldErrors(mapped)
        }
        setErrorMessage(data?.message || 'Something went wrong while submitting your enquiry. Please try again.')
        setSubmitting(false); return
      }

      setSuccessMessage(data.message || 'Your enquiry has been received. Our team will reach out to you shortly.')
      setSubmitting(false); setSubmitted(true)
    } catch (err) {
      console.error('Enquiry submit failed:', err)
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.")
      setSubmitting(false)
    }
  }

  const inputClass = (field) =>
    `w-full rounded-xl border bg-[#F7FAFD] px-4 py-3 text-[14px] text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#0F3A6B]/15 ${
      fieldErrors[field] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#0F3A6B]'
    }`

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-4 py-8 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-full w-full max-w-[460px] overflow-y-auto rounded-[22px] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]"
        style={{ animation: 'enquireModalIn 0.35s cubic-bezier(0.22,1,0.36,1)', fontFamily: FONT }}
      >
        <style>{`
          @keyframes enquireModalIn {
            from { opacity: 0; transform: translateY(16px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <div className="relative px-6 pb-8 pt-7 sm:px-8" style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}>
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25">
            <X className="h-4 w-4" strokeWidth={2.25} />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md">
              <img src={LOGO_URL} alt="" className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="m-0 text-[19px] font-bold leading-tight text-white sm:text-[21px]">
                {projectName ? `Enquire about ${projectName}` : "Let's Talk"}
              </h2>
              <p className="m-0 mt-0.5 text-[12.5px] text-[#B8CFE8]">We&apos;ll get back to you within 24 hours</p>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 px-6 py-14 text-center sm:px-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: `${DEEP_NAVY}1a` }}>
              <Check className="h-7 w-7" style={{ color: DEEP_NAVY }} strokeWidth={2.5} />
            </div>
            <h3 className="m-0 text-[18px] font-bold text-gray-800">Thank You!</h3>
            <p className="m-0 max-w-[300px] text-[13.5px] leading-relaxed text-gray-500">{successMessage}</p>
            <button onClick={onClose} className="mt-3 rounded-full px-6 py-2.5 text-[13.5px] font-bold text-white transition-transform hover:scale-[1.03]" style={{ backgroundColor: DEEP_NAVY }}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-6 py-6 sm:px-8">
            {errorMessage && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] leading-snug text-red-700">
                <AlertTriangle className="mt-[1px] h-4 w-4 shrink-0" strokeWidth={2} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold text-gray-600">
                Full Name <span style={{ color: DEEP_NAVY }}>*</span>
              </label>
              <input required type="text" name="full_name" placeholder="Enter your name" value={form.name} onChange={handleChange('name')} className={inputClass('name')} />
              {fieldErrors.name && <span className="text-[11.5px] text-red-600">{fieldErrors.name}</span>}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-gray-600">
                  Email <span style={{ color: DEEP_NAVY }}>*</span>
                </label>
                <input required type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange('email')} className={inputClass('email')} />
                {fieldErrors.email && <span className="text-[11.5px] text-red-600">{fieldErrors.email}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12.5px] font-semibold text-gray-600">
                  Phone <span style={{ color: DEEP_NAVY }}>*</span>
                </label>
                <input required type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange('phone')} className={inputClass('phone')} />
                {fieldErrors.phone && <span className="text-[11.5px] text-red-600">{fieldErrors.phone}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold text-gray-600">
                Inquiry Type <span style={{ color: DEEP_NAVY }}>*</span>
              </label>
              <div className="relative">
                <select required name="inquiry_type" value={form.inquiryType} onChange={handleChange('inquiryType')} className={`${inputClass('inquiryType')} appearance-none pr-10`}>
                  <option value="" disabled>Select an option</option>
                  {INQUIRY_TYPES.map((type) => (<option key={type} value={type}>{type}</option>))}
                </select>
                <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-gray-400" strokeWidth={2.25} />
              </div>
              {fieldErrors.inquiryType && <span className="text-[11.5px] text-red-600">{fieldErrors.inquiryType}</span>}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12.5px] font-semibold text-gray-600">
                Your Message <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea rows={3} name="message" placeholder="Tell us a bit more..." value={form.message} onChange={handleChange('message')} className={`${inputClass('message')} resize-none`} />
              {fieldErrors.message && <span className="text-[11.5px] text-red-600">{fieldErrors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-[14.5px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(15,58,107,0.55)] transition-all hover:shadow-[0_14px_30px_-8px_rgba(15,58,107,0.65)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
              style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
            >
              {submitting ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Sending...</>
              ) : (
                <><Send className="h-4 w-4" strokeWidth={2.25} />Submit Enquiry</>
              )}
            </button>

            <p className="m-0 text-center text-[11px] text-gray-400">By submitting, you agree to be contacted by PKR Estates regarding your enquiry.</p>
          </form>
        )}
      </div>
    </div>
  )
}

/* ==================================================================
   BUTTON SYSTEM
================================================================== */
function SolidButton({ children, href, onClick, className = '', icon: Icon, type = 'button', fullWidth = false }) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href} onClick={onClick} type={!href ? type : undefined}
      style={{ fontFamily: FONT, backgroundColor: DEEP_NAVY }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = DEEP_NAVY }}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-md px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_4px_14px_-4px_rgba(15,58,107,0.4)] transition-all duration-200 hover:shadow-[0_6px_20px_-4px_rgba(15,58,107,0.55)] active:scale-[0.98] ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.25} />}
      <span>{children}</span>
    </Comp>
  )
}

function OutlineButton({ children, href, onClick, className = '', icon: Icon, type = 'button', fullWidth = false }) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href} onClick={onClick} type={!href ? type : undefined}
      style={{ fontFamily: FONT }}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-md border border-white/60 bg-transparent px-6 py-3.5 text-[14px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-[0.98] ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.25} />}
      <span>{children}</span>
    </Comp>
  )
}

function AccentOutlineButton({ children, href, onClick, className = '', icon: Icon, type = 'button', fullWidth = false }) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href} onClick={onClick} type={!href ? type : undefined}
      style={{ fontFamily: FONT, color: DEEP_NAVY, borderColor: `${DEEP_NAVY}80` }}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-md border bg-white px-6 py-3.5 text-[14px] font-bold transition-all duration-200 hover:border-current hover:bg-[#F0F6FC] active:scale-[0.98] ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.25} />}
      <span>{children}</span>
    </Comp>
  )
}

function IconCircleButton({ onClick, ariaLabel, variant = 'light', children, className = '' }) {
  const styles = {
    light: 'bg-white text-[#141414] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)] hover:scale-[1.06]',
    dark: 'text-white shadow-[0_8px_24px_-10px_rgba(15,58,107,0.5)] hover:scale-[1.06]',
    gold: 'text-white shadow-[0_8px_24px_-10px_rgba(15,58,107,0.65)] hover:scale-[1.06]',
    ghost: 'bg-white/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/20 hover:border-white/40',
  }
  const bgStyle = variant === 'dark' || variant === 'gold' ? { backgroundColor: DEEP_NAVY } : {}
  return (
    <button
      onClick={onClick} aria-label={ariaLabel} style={bgStyle}
      onMouseEnter={(e) => { if (variant === 'dark' || variant === 'gold') e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER }}
      onMouseLeave={(e) => { if (variant === 'dark' || variant === 'gold') e.currentTarget.style.backgroundColor = DEEP_NAVY }}
      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 active:scale-95 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

function RevealText({ as: Tag = 'p', text, className = '', delay = 0, amount = 0.4, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })
  return (
    <Tag ref={ref} className={className} style={{ fontFamily: FONT }}>
      <motion.span initial={{ opacity: 0, y: 22 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: EASE }} style={{ display: 'inline-block' }}>
        {text}
      </motion.span>
    </Tag>
  )
}

function FadeUp({ children, delay = 0, className = '', amount = 0.3, once = true, y = 24 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay, ease: EASE }} className={className}>
      {children}
    </motion.div>
  )
}

function Eyebrow({ icon: Icon, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[#0F3A6B]/25 bg-[#0F3A6B]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[2.5px] text-[#0F3A6B] ${className}`}
      style={{ fontFamily: FONT }}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}

/* ==================================================================
   TRUE 360° PANORAMA VIEWER
================================================================== */
const INITIAL_FOV = 75
const MIN_FOV = 28
const MAX_FOV = 100

function usePanoramaViewer(containerRef, imageSrc, active) {
  const stateRef = useRef({})
  useEffect(() => {
    if (!active || !imageSrc || !containerRef.current) return
    const container = containerRef.current
    let width = container.clientWidth
    let height = container.clientHeight
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(INITIAL_FOV, width / height, 0.1, 1000)
    camera.position.set(0, 0, 0.01)
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(width, height)
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    renderer.domElement.style.display = 'block'
    container.appendChild(renderer.domElement)
    const geometry = new THREE.SphereGeometry(500, 64, 48)
    geometry.scale(-1, 1, 1)
    const loader = new THREE.TextureLoader()
    loader.crossOrigin = 'anonymous'
    const material = new THREE.MeshBasicMaterial({ color: 0x1a1a1a })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    let isDragging = false
    let lastX = 0
    let lastY = 0
    let lon = -90 // Start looking at the center of the image
    let lat = 0
    let targetFov = INITIAL_FOV
    let currentFov = INITIAL_FOV
    let pinchStartDist = null
    let pinchStartFov = INITIAL_FOV
    loader.load(imageSrc, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
      material.map = texture
      material.color.set(0xffffff)
      material.needsUpdate = true
      stateRef.current.loaded = true
      stateRef.current.onLoad?.()
    }, undefined, (err) => { stateRef.current.onError?.(err) })

    function getXY(e) {
      if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY }
      return { x: e.clientX, y: e.clientY }
    }
    function onPointerDown(e) {
      if (e.touches && e.touches.length === 2) {
        pinchStartDist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
        pinchStartFov = targetFov
        isDragging = false; return
      }
      isDragging = true
      const { x, y } = getXY(e)
      lastX = x; lastY = y
    }
    function onPointerMove(e) {
      if (e.touches && e.touches.length === 2 && pinchStartDist !== null) {
        const dist = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY)
        const ratio = pinchStartDist / dist
        targetFov = Math.max(MIN_FOV, Math.min(MAX_FOV, pinchStartFov * ratio)); return
      }
      if (!isDragging) return
      const { x, y } = getXY(e)
      const dx = x - lastX
      const dy = y - lastY
      lastX = x; lastY = y
      lon -= dx * 0.15
      lat += dy * 0.15
      lat = Math.max(-85, Math.min(85, lat))
    }
    function onPointerUp() { isDragging = false; pinchStartDist = null }
    function onWheel(e) { e.preventDefault(); targetFov = Math.max(MIN_FOV, Math.min(MAX_FOV, targetFov + e.deltaY * 0.04)) }

    container.addEventListener('mousedown', onPointerDown)
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('mouseup', onPointerUp)
    container.addEventListener('touchstart', onPointerDown, { passive: true })
    container.addEventListener('touchmove', onPointerMove, { passive: true })
    container.addEventListener('touchend', onPointerUp)
    container.addEventListener('wheel', onWheel, { passive: false })

    let raf
    function animate() {
      raf = requestAnimationFrame(animate)
      currentFov += (targetFov - currentFov) * 0.12
      camera.fov = currentFov
      camera.updateProjectionMatrix()
      const phi = THREE.MathUtils.degToRad(90 - lat)
      const theta = THREE.MathUtils.degToRad(lon)
      const x = 500 * Math.sin(phi) * Math.cos(theta)
      const y = 500 * Math.cos(phi)
      const z = 500 * Math.sin(phi) * Math.sin(theta)
      camera.lookAt(x, y, z)
      renderer.render(scene, camera)
    }
    animate()

    function onResize() {
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', onResize)

    stateRef.current.setZoom = (delta) => { targetFov = Math.max(MIN_FOV, Math.min(MAX_FOV, targetFov + delta)) }
    stateRef.current.resetZoom = () => { targetFov = INITIAL_FOV; lon = -90; lat = 0 }
    stateRef.current.getFov = () => currentFov

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('mouseup', onPointerUp)
      container.removeEventListener('mousedown', onPointerDown)
      container.removeEventListener('touchstart', onPointerDown)
      container.removeEventListener('touchmove', onPointerMove)
      container.removeEventListener('touchend', onPointerUp)
      container.removeEventListener('wheel', onWheel)
      geometry.dispose()
      material.map?.dispose()
      material.dispose()
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [active, imageSrc, containerRef])
  return stateRef
}

function Panorama360Modal({ open, onClose, imageSrc, title, subtitle }) {
  const containerRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const [fovDisplay, setFovDisplay] = useState(INITIAL_FOV)
  const viewer = usePanoramaViewer(containerRef, imageSrc, open)

  useEffect(() => {
    if (!open) { setLoaded(false); setError(false); setFovDisplay(INITIAL_FOV); return }
    viewer.current.onLoad = () => setLoaded(true)
    viewer.current.onError = () => setError(true)
  }, [open, viewer])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    const id = setInterval(() => { if (viewer.current.getFov) setFovDisplay(Math.round(viewer.current.getFov())) }, 150)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); clearInterval(id) }
  }, [open, onClose, viewer])

  const zoomIn = () => viewer.current.setZoom?.(-10)
  const zoomOut = () => viewer.current.setZoom?.(10)
  const resetZoom = () => viewer.current.resetZoom?.()
  const zoomPercent = Math.round((INITIAL_FOV / Math.max(fovDisplay, 1)) * 100)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-0 z-[200] bg-[#0a0a0a]"
          style={{ fontFamily: FONT }}
        >
          <div ref={containerRef} className="absolute inset-0 cursor-grab select-none active:cursor-grabbing" style={{ touchAction: 'none' }} />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)]" />

          {error && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0a0a0a] px-6 text-center">
              <p className="m-0 text-sm text-white/70">Couldn&apos;t load the panoramic image.<br />Make sure it&apos;s a true equirectangular (2:1) photo.</p>
              <IconCircleButton onClick={onClose} ariaLabel="Close" variant="ghost"><X className="h-4 w-4" strokeWidth={2} /></IconCircleButton>
            </div>
          )}

          {!loaded && !error && (
            <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-[#0a0a0a]">
              <div className="relative h-14 w-14">
                <div className="absolute inset-0 rounded-full border-2 border-white/10" />
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent" style={{ borderTopColor: DEEP_NAVY, animationDuration: '0.9s' }} />
              </div>
              <p className="m-0 text-[12px] font-semibold uppercase tracking-[3px] text-white/50">Loading View</p>
            </motion.div>
          )}

          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-5 sm:p-7">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -10 }} transition={{ duration: 0.5, ease: EASE }}>
              {title && <p className="m-0 text-[15px] font-semibold tracking-wide text-white sm:text-[18px]">{title}</p>}
              {subtitle && <p className="m-0 mt-1 text-[11px] font-medium uppercase tracking-[2.5px] text-[#B8CFE8]">{subtitle}</p>}
            </motion.div>
            <IconCircleButton onClick={onClose} ariaLabel="Close view" variant="ghost" className="pointer-events-auto !h-10 !w-10">
              <X className="h-4 w-4" strokeWidth={2} />
            </IconCircleButton>
          </div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 16 }} transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex flex-col items-center gap-4 p-5 sm:p-8">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-2.5 py-2 backdrop-blur-xl">
              <IconCircleButton onClick={zoomOut} ariaLabel="Zoom out" variant="ghost" className="!h-9 !w-9"><ZoomOut className="h-4 w-4" strokeWidth={2} /></IconCircleButton>
              <span className="min-w-[42px] text-center text-[12px] font-semibold tabular-nums text-white/80">{zoomPercent}%</span>
              <IconCircleButton onClick={zoomIn} ariaLabel="Zoom in" variant="ghost" className="!h-9 !w-9"><ZoomIn className="h-4 w-4" strokeWidth={2} /></IconCircleButton>
              <span className="mx-0.5 h-6 w-px bg-white/15" />
              <button onClick={resetZoom} aria-label="Reset view" className="flex h-9 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 text-[12px] font-bold text-white/80 transition-all duration-300 hover:bg-white/20">
                <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} /><span className="hidden sm:inline">Reset</span>
              </button>
            </div>
            <p className="pointer-events-none flex items-center gap-2 px-2 text-center text-[10px] font-medium uppercase tracking-[1.5px] text-white/40 sm:text-[11px] sm:tracking-[2px]">
              <Move3d className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />Drag to look around · Scroll or pinch to zoom
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ProjectBanner({ project }) {
  const amenityTabs = project?.amenityTabs?.length
    ? project.amenityTabs
    : project?.amenities?.length
      ? project.amenities.map((a) => ({
          title: a.title, eyebrow: a.tagline || 'Explore',
          description: a.description || `Discover the ${a.title.toLowerCase()} at ${project.name || 'this project'} — thoughtfully designed for everyday comfort.`,
          tags: a.tags || ['Thoughtful Design', 'Family Friendly', 'Everyday Comfort'],
          image: a.image, gallery: a.gallery || (a.image ? [a.image] : []),
        }))
      : DEFAULT_AMENITIES_TABS

  const amenityStats = project?.amenityStats?.length ? project.amenityStats : DEFAULT_AMENITY_STATS

  const [activeAmenity, setActiveAmenity] = useState(0)
  const [amenityImgIndex, setAmenityImgIndex] = useState(0)
  const amenitiesRef = useRef(null)

  const current = amenityTabs[activeAmenity]
  const amenityGalleryCount = current?.gallery?.length || 1

  const goAmenityPrev = () => setAmenityImgIndex((i) => (i === 0 ? amenityGalleryCount - 1 : i - 1))
  const goAmenityNext = () => setAmenityImgIndex((i) => (i === amenityGalleryCount - 1 ? 0 : i + 1))
  const goPrevAmenityTab = () => setActiveAmenity((i) => (i === 0 ? amenityTabs.length - 1 : i - 1))
  const goNextAmenityTab = () => setActiveAmenity((i) => (i + 1) % amenityTabs.length)

  useEffect(() => { setAmenityImgIndex(0) }, [activeAmenity])

  const galleryItems = (project?.galleryImages || []).map((g) => g.image)
  const galleryTitles = (project?.galleryImages || []).map((g) => g.title || '')
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [paused, setPaused] = useState(false)
  const galleryRef = useRef(null)

  const galleryPrev = useCallback(() => { setDirection(-1); setGalleryIndex((i) => (i === 0 ? galleryItems.length - 1 : i - 1)) }, [galleryItems.length])
  const galleryNext = useCallback(() => { setDirection(1); setGalleryIndex((i) => (i === galleryItems.length - 1 ? 0 : i + 1)) }, [galleryItems.length])
  const goToGallery = (i) => { setDirection(i > galleryIndex ? 1 : -1); setGalleryIndex(i) }

  useEffect(() => {
    if (galleryItems.length < 2 || paused || lightboxOpen) return
    const id = setInterval(galleryNext, 5000)
    return () => clearInterval(id)
  }, [galleryItems.length, paused, lightboxOpen, galleryNext])

  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') galleryPrev()
      if (e.key === 'ArrowRight') galleryNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [lightboxOpen, galleryPrev, galleryNext])

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 1.03 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.99 }),
  }

  /* ================= FLOOR PLANS — nested blocks support ================= */
  const floorPlanBlocks = project?.floorPlanBlocks || []
  const hasFloorPlanBlocks = floorPlanBlocks.length > 0
  const [activeBlock, setActiveBlock] = useState(0)
  const currentFloorBlock = hasFloorPlanBlocks ? floorPlanBlocks[activeBlock] : null

  const floorPlanTabs = hasFloorPlanBlocks ? (currentFloorBlock?.tabs || []) : (project?.floorPlanTabs || [])
  const allFloorPlans = hasFloorPlanBlocks ? (currentFloorBlock?.plans || []) : (project?.floorPlans || [])

  const floorPlansRef = useRef(null)

  // Each unit type becomes its own titled group (heading + description + grid)
  const floorPlanGroups = (
    floorPlanTabs.length
      ? floorPlanTabs.map((label) => ({ label, plans: allFloorPlans.filter((p) => planMatchesTab(p, label)) }))
      : [{ label: '', plans: allFloorPlans }]
  ).filter((group) => group.plans.length > 0)

  const totalFloorPlans = floorPlanGroups.reduce((sum, g) => sum + g.plans.length, 0)

  /* ---- Unit explorer: the list scrolls inside its own pane, not the page ---- */
  const [picked, setPicked] = useState(null)

  // Derived, so switching block auto-falls back to that block's first unit
  const firstGroup = floorPlanGroups[0]
  const selection =
    picked && floorPlanGroups.some((g) => g.label === picked.label && g.plans.includes(picked.plan))
      ? picked
      : firstGroup
        ? { plan: firstGroup.plans[0], label: firstGroup.label }
        : null

  const selectedPlan = selection?.plan || null
  const selectedGroupLabel = selection?.label || ''
  const selectedPlanImage = selectedPlan ? (selectedPlan.image3d || selectedPlan.image) : null

  const railRef = useRef(null)
  const railGroupRefs = useRef({})
  // Mobile / tablet horizontal unit strip (the vertical rail is desktop-only)
  const stripRef = useRef(null)
  const stripGroupRefs = useRef({})

  // Scroll the rail / strip itself — never the page
  const scrollRailTo = (label) => {
    const rail = railRef.current
    const target = railGroupRefs.current[label]
    if (rail && target && rail.offsetParent !== null) {
      rail.scrollTo({ top: target.offsetTop - rail.offsetTop, behavior: 'smooth' })
    }
    const strip = stripRef.current
    const stripTarget = stripGroupRefs.current[label]
    if (strip && stripTarget && strip.offsetParent !== null) {
      strip.scrollTo({ left: Math.max(0, stripTarget.offsetLeft - 8), behavior: 'smooth' })
    }
  }

  const [lightboxPlan, setLightboxPlan] = useState(null)
  const [floorLightboxZoom, setFloorLightboxZoom] = useState(1)

  const openPlanLightbox = useCallback((plan) => {
    setFloorLightboxZoom(1)
    setLightboxPlan(plan)
  }, [])

  // Close the viewer when the block changes, and reset the mobile strip
  useEffect(() => {
    setLightboxPlan(null)
    stripRef.current?.scrollTo({ left: 0 })
  }, [activeBlock])

  useEffect(() => {
    if (!lightboxPlan) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightboxPlan(null)
      if (e.key === '+' || e.key === '=') setFloorLightboxZoom((z) => Math.min(4, z + 0.25))
      if (e.key === '-') setFloorLightboxZoom((z) => Math.max(0.5, z - 0.25))
      if (e.key === '0') setFloorLightboxZoom(1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow }
  }, [lightboxPlan])

  /* ================= MASTER PLAN — Site Plan / Parking Plan ================= */
  const masterPlan = project?.masterPlan || null
  const masterPlanTabs = masterPlan?.tabs?.length ? masterPlan.tabs : []
  const hasMasterPlan = masterPlanTabs.length > 0
  const [activeMasterTab, setActiveMasterTab] = useState(0)
  const [masterZoom, setMasterZoom] = useState(false)
  const [masterLightboxOpen, setMasterLightboxOpen] = useState(false)
  const [masterLightboxZoom, setMasterLightboxZoom] = useState(1)
  const masterPlanRef = useRef(null)
  const masterPlanInView = useInView(masterPlanRef, { once: true, margin: '-100px' })
  const currentMasterTab = masterPlanTabs[activeMasterTab]

  const openMasterLightbox = useCallback(() => {
    setMasterLightboxZoom(1)
    setMasterLightboxOpen(true)
  }, [])

  useEffect(() => {
    if (!masterLightboxOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') setMasterLightboxOpen(false)
      if (e.key === '+' || e.key === '=') setMasterLightboxZoom((z) => Math.min(4, z + 0.25))
      if (e.key === '-') setMasterLightboxZoom((z) => Math.max(0.5, z - 0.25))
      if (e.key === '0') setMasterLightboxZoom(1)
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prevOverflow }
  }, [masterLightboxOpen])

  const plotTabs = project?.plotPricingTabs?.length ? project.plotPricingTabs : DEFAULT_PLOT_TABS
  const plotRows = project?.plotPricing?.length ? project.plotPricing : DEFAULT_PLOT_PRICING
  const [plotFilter, setPlotFilter] = useState('all')
  const plotPricingRef = useRef(null)

  const filteredPlots = plotFilter === 'all' ? plotRows : plotRows.filter((p) => (p.categories || []).includes(plotFilter))

  const locationRef = useRef(null)
  const locationInView = useInView(locationRef, { once: true, margin: '-100px' })
  const tourRef = useRef(null)
  const tourInView = useInView(tourRef, { once: true, margin: '-100px' })

  const [tour360Open, setTour360Open] = useState(false)
  const [enquireOpen, setEnquireOpen] = useState(false)
  const [enquirePreset, setEnquirePreset] = useState('')
  const [enquireContext, setEnquireContext] = useState('')

  const openEnquire = (presetType = '', context = '') => {
    setEnquirePreset(presetType); setEnquireContext(context); setEnquireOpen(true)
  }

  if (!project) return null

  const highlights = project.highlights?.length ? project.highlights : defaultHighlights
  const quickFacts = project.quickFacts && project.quickFacts.length >= 6 ? project.quickFacts : DEFAULT_QUICK_FACTS
  const factsCount = quickFacts.length
  const lastRowStart = factsCount - (factsCount % 2 === 0 ? 2 : 1)
  // Plot pricing CTA image — per project, falls back to the shared artwork
  const plotCtaImage = project.plotPricingCtaImage || '/plot.png'

  // ============ 360° TOUR — separate thumbnail + panorama per project ============
  const panoramaSrc = project.tour360Image || project.tourImage
  const tourThumbnail = project.tourThumbnail || project.tourImage || project.tour360Image

  return (
    <div className={`${figtree.className} w-full overflow-x-clip`} style={{ fontFamily: FONT }}>
      {/* ================= Banner ================= */}
      <section className="relative w-full" style={{ fontFamily: FONT }}>
        {/* Desktop / tablet-landscape banner (unchanged) */}
        <div
          className="relative hidden w-full items-center justify-center overflow-hidden bg-[#333] bg-cover bg-center md:flex md:min-h-[750px]"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />

        {/* Mobile banner — dedicated 380 x 700 artwork.
            Exactly 380x700 on a 380px screen; scales to full width (height capped at 700) on wider phones. */}
        <div className="relative w-full bg-[#333] md:hidden">
          <div
            role="img"
            aria-label={project.name ? `${project.name} banner` : 'Project banner'}
            className="relative mx-auto w-full overflow-hidden bg-[#333] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${project.heroImageMobile || project.heroImage})`,
              aspectRatio: `${MOBILE_BANNER_W} / ${MOBILE_BANNER_H}`,
              maxHeight: `${MOBILE_BANNER_H}px`,
            }}
          />
        </div>
      </section>

      {/* ================= Overview ================= */}
      <section className="relative w-full overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-16 lg:py-24" style={{ fontFamily: FONT }}>
        <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-stretch gap-10 lg:grid-cols-[1fr_0.95fr_1.1fr] lg:gap-8">
          <div>
            <FadeUp>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-[11.5px] font-medium uppercase tracking-[3px] sm:text-[12px] sm:tracking-[3.5px]" style={{ color: DEEP_NAVY }}>
                  {project.eyebrow || 'More than just a home'}
                </span>
              </div>
            </FadeUp>

            <RevealText
              as="h2"
              className="mb-5 text-[32px] font-semibold leading-[1.12] tracking-tight text-[#1f2029] sm:text-[36px] md:text-[46px] xl:text-[52px]"
              text={
                <>
                  {project.heading?.[0] || 'Designed for a'}
                  <br />
                  <span style={{ color: DEEP_NAVY }}>{project.heading?.[1] || 'Better Way of Life'}</span>
                </>
              }
              delay={0.1}
            />

            <FadeUp delay={0.2}>
              <p className="mb-8 max-w-[610px] text-[15px] leading-[1.85] md:text-base" style={{ color: TEXT_CHARCOAL }}>
                {project.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mb-2 flex flex-wrap items-center gap-3 lg:mb-8">
                <AccentOutlineButton onClick={() => openEnquire(project.name || '', 'Brochure')} icon={Download}>
                  Download Brochure
                </AccentOutlineButton>
                <AccentOutlineButton href="tel:+919543633333" icon={Phone}>Call Us</AccentOutlineButton>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.15} className="relative h-full">
            <img src={project.aboutImage} alt={project.name || 'Project'} className="h-[340px] w-full rounded-[16px] object-cover shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] sm:h-[440px] md:h-[560px] lg:h-full" />
          </FadeUp>

          <FadeUp delay={0.25} amount={0.1} className="h-full">
            <div className="relative flex h-full flex-col justify-center rounded-[22px] border border-[#E0E8F0] bg-white px-5 py-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] sm:px-6 sm:py-8 md:px-7 md:py-10">
              <div className="pointer-events-none absolute left-1/2 top-8 bottom-8 hidden w-px -translate-x-1/2 bg-[#E8EFF7] sm:block" />
              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {quickFacts.map((fact, i) => {
                  const FactIcon = factIconMap[fact.icon] || getFactIcon(fact.label)
                  const isRight = i % 2 === 1
                  const isLastRow = i >= lastRowStart
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-4 border-b border-[#E8EFF7] py-5 sm:py-7 ${isLastRow ? 'sm:border-b-0' : ''} ${i === factsCount - 1 ? 'border-b-0' : ''} ${isRight ? 'sm:pl-6' : 'sm:pr-4'}`}
                    >
                      <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl sm:h-[60px] sm:w-[60px]" style={{ backgroundColor: LIGHT_BLUE }}>
                        <FactIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} style={{ color: DEEP_NAVY }} />
                      </span>
                      <div className="min-w-0 pt-1">
                        <p className="m-0 mb-1.5 text-[11.5px] font-semibold uppercase tracking-[1.5px] sm:text-[12.5px]" style={{ color: TEXT_CHARCOAL, opacity: 0.55 }}>{fact.label}</p>
                        <p className="m-0 break-words text-[16px] font-bold leading-snug sm:text-[17px]" style={{ color: DEEP_NAVY }}>{fact.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ================= Amenities ================= */}
      {amenityTabs.length > 0 && (
        <section ref={amenitiesRef} className="relative w-full overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-20 md:px-10 lg:px-16 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#0F3A6B]/[0.05] blur-[120px]" />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="mb-10 grid grid-cols-1 gap-8 sm:mb-12 lg:grid-cols-[0.85fr_1.9fr_0.2fr] lg:items-start lg:gap-6">
              <div>
                <FadeUp>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-[11.5px] font-medium uppercase tracking-[3px] sm:text-[12px] sm:tracking-[3.5px]" style={{ color: DEEP_NAVY }}>Life at its finest</span>
                  </div>
                </FadeUp>

                <RevealText
                  as="h2"
                  text={<>
                    World-Class<br />Amenities for a<br />
                    <span style={{ color: DEEP_NAVY }}>Better Tomorrow</span>
                  </>}
                  className="mb-5 text-[30px] font-semibold leading-[1.14] tracking-tight text-[#1f2029] sm:text-[32px] md:text-[42px]"
                  delay={0.1}
                />

                <FadeUp delay={0.2}>
                  <p className="mb-2 max-w-[380px] text-[14px] leading-[1.8] sm:mb-7 sm:text-[15px]" style={{ color: TEXT_CHARCOAL }}>
                    {project.amenitiesDescription || 'Thoughtfully curated spaces and modern conveniences that bring comfort, community and a healthier lifestyle together at Gurudev.'}
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.2}>
                <div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 md:grid-cols-5">
                  {amenityTabs.map((tab, i) => {
                    const TabIcon = getAmenityIcon(tab.title)
                    const isActive = i === activeAmenity
                    return (
                      <button key={tab.title + i} onClick={() => setActiveAmenity(i)} className="group flex flex-col items-center gap-2.5 text-center sm:gap-3">
                        <span
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-16 sm:w-16 ${isActive ? 'text-white shadow-[0_10px_28px_-12px_rgba(15,58,107,0.75)]' : ''}`}
                          style={isActive ? { backgroundColor: DEEP_NAVY } : { backgroundColor: LIGHT_BLUE }}
                        >
                          <TabIcon className={`h-5 w-5 transition-colors duration-300 sm:h-6 sm:w-6`} style={{ color: isActive ? '#FFFFFF' : DEEP_NAVY }} strokeWidth={1.5} />
                        </span>
                        <span className={`text-[12px] font-semibold leading-snug sm:text-[13px]`} style={{ color: isActive ? '#141414' : TEXT_CHARCOAL }}>
                          {tab.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </FadeUp>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.7fr]">
              <FadeUp delay={0.2}>
                <div className="flex h-full flex-col rounded-[24px] p-6 sm:p-7" style={{ backgroundColor: LIGHT_BLUE_SOFT }}>
                  <Eyebrow className="mb-4 self-start !bg-transparent !border-0 !px-0 !py-0">{current?.eyebrow}</Eyebrow>
                  <h3 className="mb-3 text-[24px] font-semibold leading-tight text-[#1f2029] sm:text-[26px] md:text-[30px]">{current?.title}</h3>
                  <p className="mb-2 text-[14px] leading-[1.75] sm:mb-7" style={{ color: TEXT_CHARCOAL }}>{current?.description}</p>
                </div>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="relative h-[320px] w-full overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] sm:h-[420px] md:h-[480px]">
                  <AnimatePresence>
                    <motion.img
                      key={`${activeAmenity}-${amenityImgIndex}`}
                      src={current?.gallery?.[amenityImgIndex] || current?.image}
                      alt={current?.title}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute bottom-4 right-4 max-w-[60%] truncate rounded-full bg-black/70 px-3.5 py-1.5 text-[12px] font-semibold text-white backdrop-blur sm:bottom-5 sm:right-5 sm:max-w-none sm:px-4 sm:text-[13px]">{current?.title}</span>

                  <IconCircleButton onClick={goPrevAmenityTab} ariaLabel="Previous amenity" variant="light" className="!absolute !left-3 !top-1/2 !h-10 !w-10 !-translate-y-1/2 sm:!left-7 sm:!h-11 sm:!w-11">
                    <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                  </IconCircleButton>
                  <IconCircleButton onClick={goNextAmenityTab} ariaLabel="Next amenity" variant="light" className="!absolute !right-3 !top-1/2 !h-10 !w-10 !-translate-y-1/2 sm:!right-7 sm:!h-11 sm:!w-11">
                    <ChevronRight className="h-5 w-5" strokeWidth={2} />
                  </IconCircleButton>

                  {amenityGalleryCount > 1 && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 sm:bottom-5 sm:left-1/2 sm:-translate-x-1/2">
                      <IconCircleButton onClick={goAmenityPrev} ariaLabel="Previous image" variant="light" className="!h-9 !w-9">
                        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                      </IconCircleButton>
                      <IconCircleButton onClick={goAmenityNext} ariaLabel="Next image" variant="dark" className="!h-9 !w-9">
                        <ChevronRight className="h-4 w-4" strokeWidth={2} />
                      </IconCircleButton>
                    </div>
                  )}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      )}

      {/* ================= Gallery ================= */}
      {galleryItems.length > 0 && (
        <section ref={galleryRef} className="relative w-full overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-20 md:py-24 lg:px-16 lg:py-28" style={{ fontFamily: FONT }}>
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between md:mb-14">
              <div>
                <RevealText
                  as="h2"
                  text={project.galleryHeading?.join(' ') || 'Gallery'}
                  className="text-[32px] font-bold leading-[1.08] tracking-tight text-[#141414] sm:text-[42px] md:text-[54px]"
                  delay={0.1}
                />
              </div>

              <FadeUp delay={0.2} className="flex items-center gap-4 self-start sm:self-auto">
                <span className="text-[13px] font-semibold tabular-nums text-[#9a9a9a]">
                  <span style={{ color: DEEP_NAVY }}>{String(galleryIndex + 1).padStart(2, '0')}</span>{' / '}{String(galleryItems.length).padStart(2, '0')}
                </span>
                {galleryItems.length > 1 && (
                  <div className="flex items-center gap-2">
                    <IconCircleButton onClick={galleryPrev} ariaLabel="Previous image" variant="light"><ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2} /></IconCircleButton>
                    <IconCircleButton onClick={galleryNext} ariaLabel="Next image" variant="dark"><ChevronRight className="h-[18px] w-[18px]" strokeWidth={2} /></IconCircleButton>
                  </div>
                )}
              </FadeUp>
            </div>

            <FadeUp delay={0.15}>
              <div
                className="relative h-[320px] w-full overflow-hidden rounded-[24px] bg-[#1a1a1a] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] sm:h-[440px] sm:rounded-[32px] md:h-[560px] lg:h-[680px]"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.img
                    key={galleryIndex}
                    src={galleryItems[galleryIndex]}
                    alt={galleryTitles[galleryIndex] || 'Gallery'}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: EASE }}
                    drag={galleryItems.length > 1 ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.15}
                    onDragEnd={(_, info) => { if (info.offset.x < -80) galleryNext(); else if (info.offset.x > 80) galleryPrev() }}
                    onClick={() => setLightboxOpen(true)}
                    className="absolute inset-0 h-full w-full cursor-zoom-in select-none object-cover"
                    draggable={false}
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20" />

                <IconCircleButton onClick={() => setLightboxOpen(true)} ariaLabel="Open fullscreen" variant="light" className="!absolute !right-4 !top-4 !bg-white/10 !text-white backdrop-blur-md hover:!bg-white/25 sm:!right-6 sm:!top-6">
                  <Maximize2 className="h-4 w-4" />
                </IconCircleButton>

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div key={`caption-${galleryIndex}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
                      <p className="m-0 mb-1 text-[11px] font-semibold uppercase tracking-[3px] text-[#B8CFE8]">{String(galleryIndex + 1).padStart(2, '0')}</p>
                      {galleryTitles[galleryIndex] && <p className="m-0 text-[19px] font-semibold leading-tight text-white sm:text-3xl">{galleryTitles[galleryIndex]}</p>}
                    </motion.div>
                  </AnimatePresence>

                  {galleryItems.length > 1 && (
                    <div className="pointer-events-auto flex max-w-full flex-wrap items-center gap-1.5">
                      {galleryItems.map((_, i) => (
                        <button key={i} onClick={() => goToGallery(i)} aria-label={`Go to image ${i + 1}`}
                          className={`relative h-1 overflow-hidden rounded-full transition-all duration-500 ${i === galleryIndex ? 'w-12 bg-white/30' : 'w-4 bg-white/30 hover:bg-white/60'}`}>
                          {i === galleryIndex && (
                            <motion.span key={`progress-${galleryIndex}-${paused}`} initial={{ width: paused ? '100%' : '0%' }} animate={{ width: '100%' }} transition={{ duration: paused ? 0 : 5, ease: 'linear' }} className="absolute inset-y-0 left-0 rounded-full bg-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </FadeUp>
          </div>

          <AnimatePresence>
            {lightboxOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 backdrop-blur-sm" onClick={() => setLightboxOpen(false)}>
                <div className="absolute left-5 top-6 text-[13px] font-semibold tabular-nums text-white/60 sm:left-8 sm:top-8">
                  <span className="text-white">{String(galleryIndex + 1).padStart(2, '0')}</span>{' / '}{String(galleryItems.length).padStart(2, '0')}
                </div>

                <IconCircleButton onClick={() => setLightboxOpen(false)} ariaLabel="Close" variant="light" className="!absolute !right-5 !top-5 !bg-white/10 !text-white hover:!bg-white/20 sm:!right-8 sm:!top-8">
                  <X className="h-5 w-5" />
                </IconCircleButton>

                {galleryItems.length > 1 && (
                  <IconCircleButton onClick={(e) => { e?.stopPropagation?.(); galleryPrev() }} ariaLabel="Previous" variant="light" className="!absolute !left-3 !top-1/2 !z-10 !-translate-y-1/2 !bg-white/10 !text-white hover:!bg-white/20 sm:!left-8">
                    <ChevronLeft className="h-5 w-5" />
                  </IconCircleButton>
                )}

                <AnimatePresence mode="wait">
                  <motion.figure key={galleryIndex} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4, ease: EASE }} onClick={(e) => e.stopPropagation()} className="m-0 flex flex-col items-center">
                    <img src={galleryItems[galleryIndex]} alt={galleryTitles[galleryIndex] || ''} className="max-h-[80vh] max-w-full rounded-xl object-contain" />
                    {galleryTitles[galleryIndex] && <figcaption className="mt-5 px-4 text-center text-sm font-medium text-white/80">{galleryTitles[galleryIndex]}</figcaption>}
                  </motion.figure>
                </AnimatePresence>

                {galleryItems.length > 1 && (
                  <IconCircleButton onClick={(e) => { e?.stopPropagation?.(); galleryNext() }} ariaLabel="Next" variant="light" className="!absolute !right-3 !top-1/2 !z-10 !-translate-y-1/2 !bg-white/10 !text-white hover:!bg-white/20 sm:!right-8">
                    <ChevronRight className="h-5 w-5" />
                  </IconCircleButton>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* ================= Floor Plans ================= */}
      {(floorPlanGroups.length > 0 || hasFloorPlanBlocks) && (
        <section ref={floorPlansRef} id="floor-plans" className="relative w-full overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-14 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,58,107,0.05),transparent_60%)]" />

          <div className="relative mx-auto max-w-[1560px]">
            {/* ============ SECTION HEADER ============ */}
            <div className="mb-8 grid grid-cols-1 gap-8 sm:mb-10 lg:mb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12">
              <FadeUp>
                <span className="mb-5 inline-block text-[11.5px] font-medium uppercase tracking-[3px] sm:text-[12px] sm:tracking-[3.5px]" style={{ color: DEEP_NAVY }}>
                  {project.floorPlansEyebrow || 'Floor Plans'}
                </span>

                <h2 className="m-0 mb-5 text-[32px] font-semibold leading-[1.1] tracking-tight text-[#1f2029] sm:text-[36px] md:text-[48px] xl:text-[54px]">
                  {project.floorPlansHeading?.[0] || 'Homes Tailored'}<br />
                  <span style={{ color: DEEP_NAVY }}>{project.floorPlansHeading?.[1] || 'to Your Needs'}</span>
                </h2>

                <p className="m-0 max-w-[560px] text-[15px] leading-[1.75] sm:text-[15.5px]" style={{ color: TEXT_CHARCOAL }}>
                  {project.floorPlansDescription || 'Thoughtfully designed homes with efficient layouts, abundant natural light and optimal space utilisation.'}
                </p>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="grid grid-cols-3 items-stretch sm:flex lg:justify-end">
                  {FLOOR_PLAN_HIGHLIGHTS.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} className="flex items-stretch">
                        <div className={`flex w-full flex-col items-center gap-3 text-center ${i === 0 ? 'pr-2 sm:pr-5' : 'px-2 sm:px-5'}`}>
                          <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full sm:h-[60px] sm:w-[60px]" style={{ backgroundColor: LIGHT_BLUE }}>
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.3} style={{ color: DEEP_NAVY }} />
                          </span>
                          <p className="m-0 text-[12.5px] leading-[1.55] sm:text-[13.5px]" style={{ color: TEXT_CHARCOAL }}>
                            {item.label[0]}<br />{item.label[1]}
                          </p>
                        </div>
                        {i < FLOOR_PLAN_HIGHLIGHTS.length - 1 && <span className="w-px bg-[#E0E8F0]" />}
                      </div>
                    )
                  })}
                </div>
              </FadeUp>
            </div>

            {/* ============ BLOCK SELECTOR (nested mode only) ============ */}
            {hasFloorPlanBlocks && (
              <FadeUp>
                <div className="mb-8">
                  <p className="m-0 mb-3 text-[11px] font-semibold uppercase tracking-[3px]" style={{ color: TEXT_CHARCOAL, opacity: 0.55 }}>
                    Select Block
                  </p>
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    {floorPlanBlocks.map((block, i) => {
                      const isActive = i === activeBlock
                      return (
                        <button
                          key={block.id || block.label || i}
                          onClick={() => setActiveBlock(i)}
                          className={`relative isolate flex items-center gap-2.5 overflow-hidden rounded-2xl border px-4 py-3 text-[13.5px] font-semibold transition-colors duration-300 active:scale-[0.98] sm:px-6 sm:py-3.5 sm:text-[14.5px] ${
                            isActive
                              ? 'border-transparent text-white shadow-[0_16px_34px_-14px_rgba(15,58,107,0.65)]'
                              : 'border-[#D5E1ED] bg-[#F7FAFD] text-[#1f2029] hover:border-[#0F3A6B]/40 hover:bg-[#EDF4FB]'
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="floorPlanBlockBg"
                              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                              className="absolute inset-0 -z-10 rounded-2xl"
                              style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
                            />
                          )}
                          <Building2 className="relative z-[1] h-[18px] w-[18px]" strokeWidth={1.75} />
                          <span className="relative z-[1]">{block.label}</span>
                          {block.tag && (
                            <span
                              className="relative z-[1] ml-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                              style={
                                isActive
                                  ? { backgroundColor: 'rgba(255,255,255,0.18)', color: '#FFFFFF' }
                                  : { backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }
                              }
                            >
                              {block.tag}
                            </span>
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </FadeUp>
            )}

            {/* ============ UNIT EXPLORER ============ */}
            {floorPlanGroups.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-black/10 bg-white p-10 text-center">
                <p className="m-0 text-sm text-[#6b7280]">Floor plans for this block are being finalised.</p>
              </div>
            ) : (
              <>
                {/* Unit-type chips: jump to that heading and select its first unit.
                    Scrolls sideways on mobile so it never wraps into a messy block. */}
                {floorPlanGroups.length > 1 && (
                  <FadeUp delay={0.1}>
                    <div className="-mx-5 mb-5 flex items-center gap-2.5 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
                      <span className="mr-1 shrink-0 text-[11px] font-semibold uppercase tracking-[3px]" style={{ color: TEXT_CHARCOAL, opacity: 0.55 }}>
                        Unit Types
                      </span>
                      {floorPlanGroups.map((group) => {
                        const isActive = group.label === selectedGroupLabel
                        return (
                          <button
                            key={group.label || 'all'}
                            onClick={() => { setPicked({ plan: group.plans[0], label: group.label }); scrollRailTo(group.label) }}
                            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] font-semibold transition-all duration-300 active:scale-[0.97] ${
                              isActive
                                ? 'border-transparent text-white shadow-[0_12px_26px_-14px_rgba(15,58,107,0.7)]'
                                : 'border-[#D5E1ED] bg-white text-[#1f2029] hover:border-[#0F3A6B]/45 hover:bg-[#F0F6FC]'
                            }`}
                            style={isActive ? { backgroundColor: DEEP_NAVY } : undefined}
                          >
                            {group.label || 'All Layouts'}
                            <span
                              className="rounded-full px-2 py-0.5 text-[11px] font-bold tabular-nums"
                              style={isActive
                                ? { backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }
                                : { backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}
                            >
                              {group.plans.length}
                            </span>
                          </button>
                        )
                      })}
                      <span className="ml-auto hidden shrink-0 text-[13px] font-medium tabular-nums sm:inline" style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}>
                        {totalFloorPlans} layouts
                      </span>
                    </div>
                  </FadeUp>
                )}

                <FadeUp delay={0.15} amount={0.1}>
                  <div className="grid grid-cols-1 overflow-hidden rounded-[22px] border border-[#E4ECF4] bg-white shadow-[0_30px_70px_-40px_rgba(0,0,0,0.28)] sm:rounded-[26px] lg:h-[700px] lg:grid-cols-[320px_1fr]">

                    {/* ---------- MOBILE / TABLET: horizontal unit strip ---------- */}
                    <div
                      ref={stripRef}
                      className="relative flex snap-x items-center gap-2.5 overflow-x-auto overscroll-x-contain border-b border-[#E4ECF4] px-4 py-3.5 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden"
                      style={{ backgroundColor: '#FBFDFE' }}
                    >
                      {floorPlanGroups.map((group, gi) => (
                        <div
                          key={group.label || 'all'}
                          ref={(el) => { stripGroupRefs.current[group.label] = el }}
                          className="flex shrink-0 items-center gap-2.5"
                        >
                          {gi > 0 && <span className="mr-1 h-9 w-px shrink-0 bg-[#DCE6F0]" />}
                          {group.label && floorPlanGroups.length > 1 && (
                            <span className="shrink-0 pl-0.5 text-[10.5px] font-bold uppercase leading-tight tracking-[1.6px]" style={{ color: DEEP_NAVY }}>
                              {group.label}
                            </span>
                          )}
                          {group.plans.map((plan, i) => {
                            const isActive = plan === selectedPlan
                            const { facing } = splitPlanTitle(plan)
                            const areaLabel = formatArea(plan.area)
                            const thumb = plan.image3d || plan.image
                            return (
                              <button
                                key={plan.id || `${group.label}-m-${i}`}
                                onClick={() => setPicked({ plan, label: group.label })}
                                aria-current={isActive}
                                className={`flex shrink-0 snap-start items-center gap-2.5 rounded-2xl border py-2 pl-2 pr-4 text-left transition-all duration-200 active:scale-[0.97] ${
                                  isActive
                                    ? 'border-transparent text-white shadow-[0_12px_24px_-14px_rgba(15,58,107,0.75)]'
                                    : 'border-[#D5E1ED] bg-white text-[#1f2029]'
                                }`}
                                style={isActive ? { backgroundColor: DEEP_NAVY } : undefined}
                              >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white" style={!isActive ? { backgroundColor: LIGHT_BLUE } : undefined}>
                                  {thumb ? (
                                    <img src={thumb} alt="" loading="lazy" className="h-full w-full object-contain p-0.5" />
                                  ) : (
                                    <LayoutGrid className="h-[17px] w-[17px]" strokeWidth={1.6} style={{ color: DEEP_NAVY }} />
                                  )}
                                </span>
                                <span className="flex flex-col">
                                  <span className="whitespace-nowrap text-[13px] font-semibold leading-tight">{facing || plan.title}</span>
                                  {areaLabel && <span className="mt-0.5 whitespace-nowrap text-[11px] tabular-nums opacity-70">{areaLabel}</span>}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      ))}
                    </div>

                    {/* ---------- DESKTOP: scrollable unit rail ---------- */}
                    <div
                      ref={railRef}
                      className="hidden overflow-y-auto overscroll-contain border-r border-[#E4ECF4] lg:block"
                      style={{ backgroundColor: '#FBFDFE' }}
                    >
                      {floorPlanGroups.map((group) => (
                        <div key={group.label || 'all'} ref={(el) => { railGroupRefs.current[group.label] = el }}>
                          {/* Sticky heading keeps the unit type visible while scrolling the rail */}
                          <div
                            className="sticky top-0 z-[2] flex items-center justify-between gap-2 border-b border-[#E3ECF5] px-5 py-2.5 backdrop-blur-sm"
                            style={{ backgroundColor: 'rgba(237,244,251,0.94)' }}
                          >
                            <span className="text-[11.5px] font-bold uppercase tracking-[2px]" style={{ color: DEEP_NAVY }}>
                              {group.label || 'All Layouts'}
                            </span>
                            <span className="text-[11px] font-semibold tabular-nums" style={{ color: TEXT_CHARCOAL, opacity: 0.55 }}>
                              {group.plans.length}
                            </span>
                          </div>

                          <ul className="m-0 list-none p-0">
                            {group.plans.map((plan, i) => {
                              const isActive = plan === selectedPlan
                              const { facing } = splitPlanTitle(plan)
                              const areaLabel = formatArea(plan.area)
                              return (
                                <li key={plan.id || `${group.label}-${i}`}>
                                  <button
                                    onClick={() => setPicked({ plan, label: group.label })}
                                    aria-current={isActive}
                                    className={`relative flex w-full items-center gap-3 border-b border-[#EEF3F9] px-5 py-3 text-left transition-colors duration-200 ${
                                      isActive ? 'bg-[#0F3A6B]/[0.07]' : 'hover:bg-[#F1F7FC]'
                                    }`}
                                  >
                                    {isActive && <span className="absolute left-0 top-0 h-full w-[3px]" style={{ backgroundColor: DEEP_NAVY }} />}
                                    <span
                                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
                                      style={{ backgroundColor: isActive ? DEEP_NAVY : LIGHT_BLUE }}
                                    >
                                      <LayoutGrid className="h-[17px] w-[17px]" strokeWidth={1.6} style={{ color: isActive ? '#FFFFFF' : DEEP_NAVY }} />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                      <span className="block truncate text-[13.5px] font-semibold" style={{ color: isActive ? DEEP_NAVY : '#1f2029' }}>
                                        {facing || plan.title}
                                      </span>
                                      {areaLabel && (
                                        <span className="block text-[11.5px] tabular-nums" style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}>{areaLabel}</span>
                                      )}
                                    </span>
                                    <ChevronRight
                                      className={`h-4 w-4 shrink-0 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                                      strokeWidth={2}
                                      style={{ color: DEEP_NAVY }}
                                    />
                                  </button>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* ---------- RIGHT: the selected plan ---------- */}
                    {selectedPlan && (
                      <div className="flex min-w-0 flex-col xl:flex-row">
                        {/* Drawing
                            NOTE: flex-none on mobile — `flex-1` (flex-basis 0) inside an auto-height column
                            collapsed this box to ~0 height, which is why the plan image never showed. */}
                        <div
                          onClick={() => selectedPlanImage && openPlanLightbox(selectedPlan)}
                          className="group relative h-[300px] flex-none cursor-zoom-in overflow-hidden p-3 sm:h-[420px] sm:p-4 lg:h-auto lg:min-h-0 lg:flex-1"
                          style={{ backgroundColor: LIGHT_BLUE_SOFT }}
                        >
                          {selectedPlanImage ? (
                            <AnimatePresence mode="wait">
                              <motion.img
                                key={selectedPlan.id || selectedPlan.title}
                                src={selectedPlanImage}
                                alt={selectedPlan.title}
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: EASE }}
                                className="absolute inset-0 h-full w-full select-none object-contain p-4 sm:p-8"
                                draggable={false}
                              />
                            </AnimatePresence>
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                              <LayoutGrid className="h-8 w-8" strokeWidth={1.4} style={{ color: DEEP_NAVY, opacity: 0.6 }} />
                              <p className="m-0 text-[13px]" style={{ color: TEXT_CHARCOAL, opacity: 0.7 }}>Floor plan image coming soon</p>
                            </div>
                          )}

                          <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#141414]/15 bg-white/90 shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)] sm:right-6 sm:top-6 sm:h-10 sm:w-10">
                            <span className="absolute -top-3 rounded bg-white px-1 text-[9.5px] font-bold leading-none text-[#141414]">N</span>
                            <Navigation className="h-4 w-4 -rotate-45 fill-[#141414] text-[#141414]" strokeWidth={1.5} />
                          </span>

                          <div className="absolute bottom-4 left-4 hidden flex-col items-center gap-1 sm:flex sm:bottom-6 sm:left-6">
                            <span className="h-0 w-0 border-x-[7px] border-b-[11px] border-x-transparent" style={{ borderBottomColor: DEEP_NAVY }} />
                            <span className="text-[12px]" style={{ color: TEXT_CHARCOAL }}>Entry</span>
                          </div>

                          {selectedPlanImage && (
                            <button
                              onClick={(e) => { e.stopPropagation(); openPlanLightbox(selectedPlan) }}
                              aria-label="Enlarge floor plan"
                              className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-[#D5E1ED] bg-white px-3.5 py-2 text-[12px] font-semibold shadow-[0_8px_20px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-[#0F3A6B]/50 hover:bg-[#0F3A6B] hover:text-white active:scale-[0.97] sm:bottom-6 sm:right-6 sm:px-4 sm:py-2.5 sm:text-[12.5px]"
                              style={{ color: DEEP_NAVY }}
                            >
                              <Expand className="h-4 w-4" strokeWidth={2} />
                              Enlarge
                            </button>
                          )}
                        </div>

                        {/* Details for this unit + description for its type */}
                        <div className="flex w-full shrink-0 flex-col border-t border-[#E4ECF4] px-5 py-6 sm:px-7 sm:py-7 xl:w-[330px] xl:overflow-y-auto xl:border-l xl:border-t-0">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={selectedPlan.id || selectedPlan.title}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.35, ease: EASE }}
                              className="flex flex-1 flex-col"
                            >
                              {selectedGroupLabel && (
                                <span className="mb-4 w-fit rounded-full px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[1.5px]" style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}>
                                  {selectedGroupLabel}
                                </span>
                              )}

                              <div className="flex items-start justify-between gap-4">
                                <h3 className="m-0 text-[21px] font-semibold leading-tight text-[#1f2029] sm:text-[23px]">
                                  {splitPlanTitle(selectedPlan).facing || selectedPlan.title}
                                </h3>
                                {formatArea(selectedPlan.area) && (
                                  <span className="shrink-0 whitespace-nowrap pt-1 text-[14px] font-bold tabular-nums sm:text-[15px]" style={{ color: DEEP_NAVY }}>
                                    {formatArea(selectedPlan.area)}
                                  </span>
                                )}
                              </div>

                              <p className="m-0 mt-3 border-b border-[#EDF2F8] pb-5 text-[13.5px] leading-[1.7]" style={{ color: TEXT_CHARCOAL }}>
                                {getPlanGroupInfo(selectedGroupLabel, project, currentFloorBlock)}
                              </p>

                              <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-3.5 px-0 py-5 sm:grid-cols-2 sm:py-6 xl:flex xl:flex-col xl:gap-4">
                                {getPlanRooms(selectedPlan).map((room, i) => {
                                  const RoomIcon = getRoomIcon(room)
                                  return (
                                    <li key={i} className="flex items-center gap-4">
                                      <RoomIcon className="h-[19px] w-[19px] shrink-0" strokeWidth={1.4} style={{ color: DEEP_NAVY }} />
                                      <span className="text-[14.5px]" style={{ color: TEXT_CHARCOAL }}>{room}</span>
                                    </li>
                                  )
                                })}
                              </ul>

                              <div className="mt-auto pt-2">
                                <SolidButton onClick={() => openEnquire(project.name || '', 'Floor Plan')} icon={Download} fullWidth className="!py-3.5 !text-[13.5px]">
                                  Download Floor Plan
                                </SolidButton>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    )}
                  </div>
                </FadeUp>
              </>
            )}
          </div>

          {/* Full-Screen Floor Plan Lightbox */}
          <AnimatePresence>
            {lightboxPlan && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                onClick={() => setLightboxPlan(null)}
                onWheel={(e) => { e.preventDefault(); setFloorLightboxZoom((z) => Math.min(4, Math.max(0.5, z - e.deltaY * 0.0015))) }}
              >
                <button onClick={(e) => { e.stopPropagation(); setLightboxPlan(null) }} aria-label="Close"
                  className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>

                <div className="absolute left-5 top-6 z-10 max-w-[70%] sm:left-8 sm:top-8">
                  <p className="m-0 text-[15px] font-semibold text-white">{splitPlanTitle(lightboxPlan).facing || lightboxPlan.title}</p>
                  <p className="m-0 mt-1 text-[11.5px] font-medium uppercase tracking-[2px] text-white/55">
                    {[splitPlanTitle(lightboxPlan).config, formatArea(lightboxPlan.area)].filter(Boolean).join(' · ')}
                  </p>
                </div>

                <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-2 py-2 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setFloorLightboxZoom((z) => Math.max(0.5, z - 0.25))} aria-label="Zoom out" className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/20">
                    <ZoomOut className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                  <span className="min-w-[60px] text-center text-[13px] font-medium tabular-nums text-white">{Math.round(floorLightboxZoom * 100)}%</span>
                  <button onClick={() => setFloorLightboxZoom((z) => Math.min(4, z + 0.25))} aria-label="Zoom in" className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/20">
                    <ZoomIn className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                  <span className="mx-1 h-6 w-px bg-white/20" />
                  <button onClick={() => setFloorLightboxZoom(1)} aria-label="Reset zoom" className="flex h-10 items-center justify-center rounded-full px-3 text-[12px] font-medium text-white transition hover:bg-white/20">
                    Reset
                  </button>
                </div>

                <motion.div className="flex max-h-full max-w-full items-center justify-center p-4" onClick={(e) => e.stopPropagation()}
                  drag={floorLightboxZoom > 1} dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.1}
                  style={{ cursor: floorLightboxZoom > 1 ? 'grab' : 'default' }}>
                  <motion.img key={lightboxPlan.id || lightboxPlan.title} src={lightboxPlan.image3d || lightboxPlan.image} alt={lightboxPlan.title}
                    animate={{ scale: floorLightboxZoom }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="max-h-[90vh] max-w-[90vw] select-none object-contain" draggable={false} />
                </motion.div>

                <p className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[11px] tracking-wide text-white/50 sm:block">
                  Scroll to zoom · Drag to pan · ESC to close
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* ================= Master Plan — Site Plan & Parking Plan ================= */}
      {hasMasterPlan && (
        <section ref={masterPlanRef} className="relative w-full overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-16 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="pointer-events-none absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-[#0F3A6B]/[0.05] blur-[120px]" />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="mb-8 flex flex-col gap-6 sm:mb-10 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <FadeUp>
                  <span className="mb-5 inline-block text-[11.5px] font-medium uppercase tracking-[3px] sm:text-[12px] sm:tracking-[3.5px]" style={{ color: DEEP_NAVY }}>
                    {masterPlan.eyebrow || 'Master Plan'}
                  </span>
                </FadeUp>

                <RevealText
                  as="h2"
                  text={<>
                    {masterPlan.heading?.[0] || 'Thoughtfully Planned'}<br />
                    <span style={{ color: DEEP_NAVY }}>{masterPlan.heading?.[1] || 'Site & Parking Layout'}</span>
                  </>}
                  className="mb-4 text-[30px] font-semibold leading-[1.12] tracking-tight text-[#1f2029] sm:text-[32px] md:text-[42px] xl:text-[46px]"
                  delay={0.1}
                />

                <FadeUp delay={0.2}>
                  <p className="max-w-[540px] text-[15px] leading-[1.8]" style={{ color: TEXT_CHARCOAL }}>
                    {masterPlan.description || 'Every block, driveway and green pocket is planned around ease of movement and open, breathable spaces.'}
                  </p>
                </FadeUp>
              </div>

              {/* Tab buttons with a small silent video preview */}
              {masterPlanTabs.length > 1 && (
                <FadeUp delay={0.2}>
                  <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                    {masterPlanTabs.map((tab, i) => {
                      const isActive = activeMasterTab === i
                      const TabIcon = getMasterPlanIcon(tab.id)
                      return (
                        <button
                          key={tab.id || tab.label}
                          onClick={() => { setActiveMasterTab(i); setMasterZoom(false) }}
                          className={`group relative flex items-center gap-2.5 overflow-hidden rounded-2xl border px-2.5 py-2.5 transition-all duration-300 sm:gap-3 sm:px-3 ${
                            isActive
                              ? 'border-[#0F3A6B] bg-[#0F3A6B] text-white shadow-[0_16px_34px_-14px_rgba(15,58,107,0.65)]'
                              : 'border-[#D5E1ED] bg-white text-[#1f2029] hover:border-[#0F3A6B]/40 hover:bg-[#F7FAFD]'
                          }`}
                        >
                          <span className="relative flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black/10 sm:h-12 sm:w-16">
                            {tab.video ? (
                              <video
                                src={tab.video}
                                className="h-full w-full object-cover"
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                              />
                            ) : tab.image ? (
                              <img src={tab.image} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <TabIcon className="h-4 w-4" strokeWidth={1.75} />
                            )}
                            <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/25" />
                          </span>

                          <span className="flex min-w-0 items-center gap-2 pr-1">
                            <TabIcon className="hidden h-4 w-4 sm:block" strokeWidth={1.75} />
                            <span className="text-left text-[13px] font-semibold leading-tight sm:whitespace-nowrap sm:text-[14px]">{tab.label}</span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </FadeUp>
              )}
            </div>

            {masterPlan.highlights?.length > 0 && (
              <FadeUp delay={0.25}>
                <div className="mb-8 flex flex-wrap gap-2.5 sm:gap-3">
                  {masterPlan.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 rounded-2xl border border-[#E0E8F0] bg-[#F7FAFD] px-4 py-2.5 sm:px-5 sm:py-3">
                      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: DEEP_NAVY }} />
                      <span className="text-[13px] font-semibold" style={{ color: TEXT_CHARCOAL, opacity: 0.75 }}>{h.label}</span>
                      <span className="text-[13px] font-bold" style={{ color: DEEP_NAVY }}>{h.value}</span>
                    </div>
                  ))}
                </div>
              </FadeUp>
            )}

            <motion.div
              initial={{ opacity: 0, y: 24 }} animate={masterPlanInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, ease: EASE }}
              onClick={openMasterLightbox}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openMasterLightbox() } }}
              aria-label={`View ${currentMasterTab?.label || 'plan'} full screen`}
              className="group relative h-[380px] w-full cursor-zoom-in overflow-hidden rounded-[22px] border border-black/[0.04] bg-[#F7FAFD] shadow-[0_30px_70px_-35px_rgba(0,0,0,0.22)] outline-none transition-shadow duration-500 focus-visible:ring-2 focus-visible:ring-[#0F3A6B]/40 sm:h-[520px] sm:rounded-[26px] md:h-[600px]"
            >
              {currentMasterTab?.video ? (
                <video
                  key={`video-${currentMasterTab?.id || activeMasterTab}`}
                  src={currentMasterTab.video}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : currentMasterTab?.image ? (
                <img
                  src={currentMasterTab.image}
                  alt={currentMasterTab?.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                />
              ) : null}

              <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/45 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/55 to-transparent" />

              <span
                className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[1.6px] text-white shadow-[0_10px_24px_-12px_rgba(15,58,107,0.7)] sm:left-6 sm:top-6 sm:px-4 sm:text-[11.5px] sm:tracking-[1.8px]"
                style={{ backgroundColor: DEEP_NAVY }}
              >
                {currentMasterTab?.label}
              </span>

              <button
                onClick={(e) => { e.stopPropagation(); openMasterLightbox() }}
                aria-label={`View ${currentMasterTab?.label || 'plan'} full screen`}
                className="absolute bottom-4 right-4 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2.5 text-[12.5px] font-semibold tracking-wide text-white backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/20 active:scale-[0.97] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3 sm:text-[13px]"
              >
                <Expand className="h-4 w-4" strokeWidth={2} />
                <span className="hidden sm:inline">Expand Plan</span>
                <span className="sm:hidden">Expand</span>
              </button>

              {masterPlanTabs.length > 1 && (
                <div className="absolute bottom-7 left-4 flex items-center gap-1.5 sm:bottom-8 sm:left-6">
                  {masterPlanTabs.map((tab, i) => (
                    <button key={tab.id || tab.label} onClick={(e) => { e.stopPropagation(); setActiveMasterTab(i); setMasterZoom(false) }} aria-label={`Show ${tab.label}`}
                      className={`h-1.5 rounded-full transition-all duration-500 ${i === activeMasterTab ? 'w-8 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/70'}`} />
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          <AnimatePresence>
            {masterLightboxOpen && currentMasterTab && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm"
                onClick={() => setMasterLightboxOpen(false)}
                onWheel={(e) => { e.preventDefault(); setMasterLightboxZoom((z) => Math.min(4, Math.max(0.5, z - e.deltaY * 0.0015))) }}
              >
                <button onClick={(e) => { e.stopPropagation(); setMasterLightboxOpen(false) }} aria-label="Close"
                  className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20">
                  <X className="h-5 w-5" strokeWidth={2} />
                </button>

                <div className="absolute left-5 top-6 text-[13px] font-semibold uppercase tracking-[1.5px] text-white/70 sm:left-8 sm:top-8">
                  {currentMasterTab?.label}
                </div>

                <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/10 px-2 py-2 backdrop-blur-md" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => setMasterLightboxZoom((z) => Math.max(0.5, z - 0.25))} aria-label="Zoom out" className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/20">
                    <ZoomOut className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                  <span className="min-w-[60px] text-center text-[13px] font-medium tabular-nums text-white">{Math.round(masterLightboxZoom * 100)}%</span>
                  <button onClick={() => setMasterLightboxZoom((z) => Math.min(4, z + 0.25))} aria-label="Zoom in" className="flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/20">
                    <ZoomIn className="h-5 w-5" strokeWidth={1.75} />
                  </button>
                  <span className="mx-1 h-6 w-px bg-white/20" />
                  <button onClick={() => setMasterLightboxZoom(1)} aria-label="Reset zoom" className="flex h-10 items-center justify-center rounded-full px-3 text-[12px] font-medium text-white transition hover:bg-white/20">
                    Reset
                  </button>
                </div>

                <motion.div className="flex max-h-full max-w-full items-center justify-center p-4" onClick={(e) => e.stopPropagation()}
                  drag={masterLightboxZoom > 1} dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} dragElastic={0.1}
                  style={{ cursor: masterLightboxZoom > 1 ? 'grab' : 'default' }}>
                  <motion.img src={currentMasterTab?.image} alt={currentMasterTab?.label}
                    animate={{ scale: masterLightboxZoom }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="max-h-[90vh] max-w-[90vw] select-none object-contain" draggable={false} />
                </motion.div>

                <p className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[11px] tracking-wide text-white/50 sm:block">
                  Scroll to zoom · Drag to pan · ESC to close
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* ================= Plot Sizes & Pricing ================= */}
      {plotRows.length > 0 && (
        <section ref={plotPricingRef} className="relative w-full overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-14 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="relative mx-auto max-w-[1560px]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.35fr] xl:grid-cols-[0.95fr_1.3fr] xl:gap-8">
              <div className="flex flex-col">
                <FadeUp>
                  <div className="mb-6 flex items-center gap-4">
                    <span className="text-[11.5px] font-medium uppercase tracking-[3px] sm:text-[12px] sm:tracking-[3.5px]" style={{ color: DEEP_NAVY }}>
                      {project.plotPricingEyebrow || 'Invest with confidence'}
                    </span>
                  </div>
                </FadeUp>

                <RevealText
                  as="h2"
                  className="mb-5 text-[38px] font-semibold leading-[1.06] tracking-tight text-[#1a1a1a] sm:text-[44px] md:text-[58px] xl:text-[64px]"
                  text={<>
                    {project.plotPricingHeading?.[0] || 'Plot Sizes'}{' '}
                    <span style={{ color: DEEP_NAVY }}>&amp;</span><br />
                    {project.plotPricingHeading?.[1] || 'Pricing'}
                  </>}
                  delay={0.1}
                />

                <FadeUp delay={0.2}>
                  <p className="mb-8 max-w-[430px] text-[15px] leading-[1.55] sm:mb-10 sm:text-[16px]" style={{ color: TEXT_CHARCOAL }}>
                    {project.plotPricingDescription || 'Choose the perfect plot that fits your dreams. Transparent pricing. Timeless value.'}
                  </p>
                </FadeUp>

                <FadeUp delay={0.25}>
                  <div className="mb-8 grid grid-cols-3 sm:mb-10">
                    {PLOT_FEATURES.map((feature, i) => {
                      const FeatureIcon = feature.icon
                      return (
                        <div key={feature.title} className={`flex flex-col items-center px-1.5 text-center sm:px-2 ${i > 0 ? 'border-l border-[#E0E8F0]' : ''}`}>
                          <span className="mb-3 flex h-[52px] w-[52px] items-center justify-center rounded-full sm:mb-4 sm:h-[62px] sm:w-[62px]" style={{ backgroundColor: LIGHT_BLUE }}>
                            <FeatureIcon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.3} style={{ color: DEEP_NAVY }} />
                          </span>
                          <p className="m-0 mb-2 text-[13.5px] font-semibold leading-snug sm:text-[15px]" style={{ color: DEEP_NAVY }}>{feature.title}</p>
                          <p className="m-0 text-[12px] leading-[1.45] sm:text-[13px]" style={{ color: TEXT_CHARCOAL }}>
                            {feature.text[0]}<br />{feature.text[1]}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </FadeUp>

                <FadeUp delay={0.3} className="mt-auto">
                  <div className="relative min-h-[260px] overflow-hidden rounded-[22px] bg-[#1f2a1c] shadow-[0_24px_50px_-28px_rgba(0,0,0,0.45)] sm:h-[240px] sm:min-h-0">
                    {plotCtaImage && (
                      <img src={plotCtaImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

                    <div className="relative flex h-full min-h-[260px] flex-col justify-center p-6 sm:min-h-0 sm:p-8">
                      <h3 className="m-0 mb-3 text-[26px] font-semibold leading-[1.15] text-white sm:text-[30px]">
                        {project.plotPricingCtaHeading?.[0] || 'A Brighter'}<br />
                        {project.plotPricingCtaHeading?.[1] || 'Tomorrow Awaits'}
                      </h3>
                      <p className="m-0 mb-6 max-w-[250px] text-[14px] leading-[1.5] text-white/90">
                        {project.plotPricingCtaText || 'Secure your slice of a better lifestyle today.'}
                      </p>
                      <OutlineButton onClick={() => openEnquire(project.name || '', 'Pricing')} icon={ArrowRight} className="w-fit">
                        Enquire Now
                      </OutlineButton>
                    </div>
                  </div>
                </FadeUp>
              </div>

              <FadeUp delay={0.15} amount={0.1} className="min-w-0">
                <div className="h-full rounded-[22px] border border-[#E0E8F0] bg-white p-3.5 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.22)] sm:rounded-[26px] sm:p-6">
                  <div className="mb-5 flex items-center overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {plotTabs.map((tab, i) => {
                      const isActive = plotFilter === tab.id
                      const prevActive = i > 0 && plotTabs[i - 1].id === plotFilter
                      return (
                        <div key={tab.id} className="flex shrink-0 items-center">
                          {i > 0 && <span className={`h-4 w-px ${isActive || prevActive ? 'bg-transparent' : 'bg-[#E0E8F0]'}`} />}
                          <button onClick={() => setPlotFilter(tab.id)}
                            className={`relative whitespace-nowrap rounded-md px-4 py-2.5 text-[13.5px] font-semibold transition-colors sm:px-6 sm:py-3 sm:text-[14px] ${isActive ? 'text-white' : 'text-[#1a1a1a] hover:text-[#0F3A6B]'}`}>
                            {isActive && (
                              <motion.span layoutId="plotTabPill" transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                                className="absolute inset-0 rounded-md shadow-[0_10px_20px_-10px_rgba(15,58,107,0.8)]" style={{ backgroundColor: DEEP_NAVY }} />
                            )}
                            <span className="relative">{tab.label}</span>
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  {/* Table fits the screen on mobile (no sideways scroll); keeps its min width from sm up */}
                  <div className="sm:overflow-x-auto">
                    <div className="sm:min-w-[540px]">
                      <div className="grid grid-cols-4 rounded-[12px] py-4 text-center sm:rounded-[14px] sm:py-5" style={{ backgroundColor: LIGHT_BLUE }}>
                        {PLOT_TABLE_HEADERS.map((header, i) => (
                          <PlotCell key={i} divider={i > 0}>
                            <p className="m-0 text-[9.5px] font-semibold uppercase leading-[1.6] tracking-[1.2px] sm:text-[11px] sm:tracking-[2.5px]" style={{ color: DEEP_NAVY }}>
                              {header[0]}{header[1] && (<><br />{header[1]}</>)}
                            </p>
                          </PlotCell>
                        ))}
                      </div>

                      {filteredPlots.length === 0 ? (
                        <p className="m-0 py-12 text-center text-[14px]" style={{ color: TEXT_CHARCOAL }}>
                          No plots in this category right now. Try another filter.
                        </p>
                      ) : (
                        <div className="relative">
                          <AnimatePresence initial={false} mode="popLayout">
                            {filteredPlots.map((plot) => (
                              <motion.div key={plot.id || plot.sqft} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.35, ease: EASE }}
                                className="grid grid-cols-4 items-center border-b border-[#E8EFF7] py-3.5 text-center transition-colors hover:bg-[#F7FAFD] sm:py-[18px]">
                                <PlotCell divider={false}><span className="text-[14.5px] tabular-nums sm:text-[17px]" style={{ color: TEXT_CHARCOAL }}>{plot.sqft}</span></PlotCell>
                                <PlotCell><span className="text-[14.5px] tabular-nums sm:text-[17px]" style={{ color: TEXT_CHARCOAL }}>{getPlotSqYd(plot)}</span></PlotCell>
                                <PlotCell><span className="text-[14.5px] font-semibold tabular-nums sm:text-[18px]" style={{ color: DEEP_NAVY }}>{formatPlotPrice(plot)}</span></PlotCell>
                                <PlotCell>
                                  {/* Replaces the old Status pill — opens the same enquiry modal as Download Brochure */}
                                  <button
                                    type="button"
                                    onClick={() => openEnquire(project.name || '', 'Pricing')}
                                    aria-label={`Enquire about the ${plot.sqft} sq.ft plot`}
                                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-[11.5px] font-bold text-white shadow-[0_6px_16px_-8px_rgba(15,58,107,0.6)] transition-all duration-200 hover:shadow-[0_8px_20px_-8px_rgba(15,58,107,0.75)] active:scale-[0.96] sm:px-4 sm:py-2 sm:text-[13px]"
                                    style={{ fontFamily: FONT, backgroundColor: DEEP_NAVY }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = DEEP_NAVY }}
                                  >
                                    <Send className="hidden h-3.5 w-3.5 sm:block" strokeWidth={2.25} />
                                    <span className="sm:hidden">Enquire</span>
                                    <span className="hidden sm:inline">Enquire Now</span>
                                  </button>
                                </PlotCell>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      )}

      {/* ================= 360 Virtual Tour ================= */}
      {(tourThumbnail || panoramaSrc) && (
        <section ref={tourRef} className="w-full bg-white px-5 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-16 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[0.75fr_1.6fr] lg:gap-14">
            <FadeUp>
              <h2 className="mb-5 text-[28px] font-bold leading-[1.15] tracking-tight text-[#141414] sm:text-[30px] md:text-[40px]">
                {project.tourHeading?.[0]}<br />
                {project.tourHeading?.[1]?.split('360°')[0]}
                {project.tourHeading?.[1]?.includes('360°') && (<span style={{ color: DEEP_NAVY }}>360°</span>)}
              </h2>

              <p className="mb-8 max-w-[380px] text-[15px] leading-[1.8]" style={{ color: TEXT_CHARCOAL }}>
                {project.tourDescription}
              </p>

              {panoramaSrc && (
                <SolidButton onClick={() => setTour360Open(true)} icon={Play}>
                  {project.tourCtaLabel || 'Start Cinematic View'}
                </SolidButton>
              )}
            </FadeUp>

            <div className="flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }} animate={tourInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
                className="relative h-[280px] w-full overflow-hidden rounded-[22px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] sm:h-[340px] sm:rounded-[28px] md:h-[460px]">
                <img src={tourThumbnail} alt={`${project.name} 360 tour`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                {panoramaSrc && (
                  <button onClick={() => setTour360Open(true)} aria-label="Open panoramic view"
                    className="group absolute left-1/2 top-1/2 flex h-[96px] w-[96px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white hover:bg-black/35 sm:h-[110px] sm:w-[110px] md:h-[128px] md:w-[128px]">
                    <span className="absolute -inset-[6px] rounded-full border border-white/10" />
                    <Play className="mb-1 h-5 w-5 fill-white" strokeWidth={0} />
                    <span className="text-[10px] font-bold tracking-[2.5px]">360°</span>
                  </button>
                )}

                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3.5 py-2 backdrop-blur-md sm:bottom-6 sm:left-6">
                  <Move3d className="h-3.5 w-3.5 text-white/80" strokeWidth={1.75} />
                  <span className="text-[11px] font-semibold uppercase tracking-[1.5px] text-white/85">Panoramic View</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* Viewer uses the dedicated 360° panorama image, NOT the thumbnail */}
      <Panorama360Modal open={tour360Open} onClose={() => setTour360Open(false)} imageSrc={panoramaSrc} title={project.name} subtitle="Panoramic View" />

      <EnquireModal open={enquireOpen} onClose={() => setEnquireOpen(false)} presetType={enquirePreset} projectName={enquireContext} />

      {/* ================= Location ================= */}
      {project.locationLandmarks?.length > 0 && (
        <section ref={locationRef} className="w-full overflow-hidden bg-white px-5 py-14 sm:px-8 sm:py-16 md:px-10 lg:px-16 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-[0.85fr_1.6fr_0.9fr] lg:gap-12">
            <FadeUp>
              <h2 className="mb-4 text-[26px] font-bold leading-[1.15] tracking-tight text-[#141414] sm:text-[28px] md:text-[38px]">
                {project.locationHeading?.[0]} {project.locationHeading?.[1]}
              </h2>

              <p className="mb-8 max-w-[320px] text-[15px] leading-[1.8]" style={{ color: TEXT_CHARCOAL }}>
                {project.locationDescription}
              </p>

              {project.locationMapUrl && (
                <AccentOutlineButton href={project.locationMapUrl} icon={Navigation2}>Get Directions</AccentOutlineButton>
              )}
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={locationInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="relative h-[320px] w-full overflow-hidden rounded-[22px] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] sm:h-[340px] sm:rounded-[28px] md:h-[400px]"
              style={{ backgroundColor: LIGHT_BLUE }}>
              {project.locationMapEmbed ? (
                <iframe src={project.locationMapEmbed} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title={`${project.name} location map`} className="h-full w-full" />
              ) : project.locationMapImage ? (
                <img src={project.locationMapImage} alt="Location map" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-8 w-8" strokeWidth={1.75} style={{ color: DEEP_NAVY }} />
                    <p className="m-0 text-sm font-semibold" style={{ color: DEEP_NAVY }}>{project.name}</p>
                  </div>
                </div>
              )}
            </motion.div>

            <div className="flex flex-col gap-2.5">
              {project.locationLandmarks.map((item, i) => {
                const LandmarkIcon = getLandmarkIcon(item.label)
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 16 }} animate={locationInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white px-4 py-3.5 transition-all duration-300 hover:border-[#0F3A6B]/30 hover:shadow-[0_10px_24px_-14px_rgba(15,58,107,0.4)]">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors" style={{ backgroundColor: LIGHT_BLUE }}>
                        <LandmarkIcon className="h-4 w-4" strokeWidth={1.75} style={{ color: DEEP_NAVY }} />
                      </div>
                      <p className="m-0 text-sm font-medium" style={{ color: DEEP_NAVY }}>{item.label}</p>
                    </div>
                    <p className="m-0 shrink-0 text-sm font-semibold" style={{ color: DEEP_NAVY }}>{item.distance}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
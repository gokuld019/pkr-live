// src/components/ProjectBanner.js
'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Figtree } from 'next/font/google'
import * as THREE from 'three'
import {
  Download, ChevronLeft, ChevronRight, MapPin, School, Hospital, TrainFront, Bus, Plane,
  Building2, BedDouble, Bath, Sofa, Play, Maximize2, Sparkles, X, ArrowUpRight,
  ArrowRight, Maximize, Tag, Layers, FileText, Leaf, Users, Gem, Ruler, CalendarCheck,
  ShieldCheck, Waves, Landmark, Baby, Gamepad2, Zap, Heart, ShoppingBag, Trees,
  ArrowUpDown, Recycle, Car, Sun, LayoutGrid, ZoomIn, ZoomOut, Toilet, CookingPot,
  Fence, Navigation, Coins, Home, Phone, Navigation2, Move3d, Compass, RefreshCw,
  Send, Check, AlertTriangle, MapPinned, ParkingSquare, Expand, Grid3x3, ChevronDown, ChevronUp,
  ExternalLink, Images,
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

const LOGO_URL = '/logo.jpeg'
const ENQUIRY_API = 'https://gurudev.pkrestates.com/backend/api/submit-enquiry'

const WHATSAPP_NUMBER = '919381055555'

/* ------------------------------------------------------------------ */
/*  WHATSAPP HELPER                                                    */
/* ------------------------------------------------------------------ */
function buildWhatsAppUrl({ name, phone, inquiryType, message, projectName }) {
  const lines = [
    `Hi PKR Estates, I'm ${name || 'a visitor'}.`,
    projectName ? `Regarding: ${projectName}.` : null,
    inquiryType ? `I'm interested in: ${inquiryType}.` : null,
    phone ? `My contact number: ${phone}.` : null,
    message ? `Message: ${message}` : null,
  ].filter(Boolean)
  const text = lines.join(' ')
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

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

function getMasterPlanIcon(id = '') {
  const l = String(id).toLowerCase()
  if (l.includes('park')) return ParkingSquare
  if (l.includes('site')) return MapPinned
  if (l.includes('master') || l.includes('layout')) return Grid3x3
  return Compass
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
]

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
  return { config: plan?.config || config, facing: rest.join(' · ') || plan?.unitLabel || '' }
}

/* ---------------- Facing (compass) helpers ---------------- */

const EMPTY_ROWS = []

const FACING_ORDER = ['East', 'West', 'North', 'South', 'North-East', 'North-West', 'South-East', 'South-West']

const FACING_ANGLE = {
  North: 0, 'North-East': 45, East: 90, 'South-East': 135,
  South: 180, 'South-West': 225, West: 270, 'North-West': 315,
}

const FACING_ALIASES = {
  n: 'North', north: 'North',
  e: 'East', east: 'East',
  s: 'South', south: 'South',
  w: 'West', west: 'West',
  ne: 'North-East', 'north-east': 'North-East', 'east-north': 'North-East',
  nw: 'North-West', 'north-west': 'North-West', 'west-north': 'North-West',
  se: 'South-East', 'south-east': 'South-East', 'east-south': 'South-East',
  sw: 'South-West', 'south-west': 'South-West', 'west-south': 'South-West',
}

function normaliseFacing(raw) {
  if (!raw) return ''
  const key = String(raw)
    .trim()
    .toLowerCase()
    .replace(/facing/g, '')
    .replace(/[^a-z]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return FACING_ALIASES[key] || ''
}

// Unit codes referenced by a plan: "g-1bhk-103" -> 103, "Units A209–A509" -> A209, A509
function getPlanUnitCodes(plan) {
  const source = [plan?.unit, plan?.flatNo, plan?.id, plan?.title].filter(Boolean).join(' ')
  return (source.match(/[A-Za-z]?\d{3,4}/g) || []).map((c) => c.toUpperCase())
}

function lookupFacingFromPricing(plan, rows) {
  if (!rows || !rows.length) return ''
  const codes = getPlanUnitCodes(plan)
  for (const code of codes) {
    const row = rows.find((r) => String(r?.flatNo || r?.id || '').toUpperCase() === code)
    const facing = normaliseFacing(row?.facing)
    if (facing) return facing
  }
  return ''
}

const FACING_IN_TITLE = /(north[-\s]?east|north[-\s]?west|south[-\s]?east|south[-\s]?west|north|south|east|west)(?:[-\s]?facing)?\b/i

// Resolution order: explicit plan.facing -> direction written in the title -> price-list lookup by unit number.
function getPlanFacing(plan, pricingRows) {
  const direct = normaliseFacing(plan?.facing)
  if (direct) return direct

  const match = String(plan?.title || '').match(FACING_IN_TITLE)
  const fromTitle = match ? normaliseFacing(match[1]) : ''
  if (fromTitle) return fromTitle

  return lookupFacingFromPricing(plan, pricingRows)
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

const PLOT_TABLE_HEADERS = [
  ['Plot Size', '(Sq.Ft.)'], ['Plot Size', '(Sq.Yd.)'],
  ['Price', '(₹ Lakhs)'], ['Enquire', ''],
]

const PLOT_FEATURES = [
  { icon: ShieldCheck, title: 'Clear Titles', text: ['Hassle-free', 'ownership'] },
  { icon: Coins, title: 'Competitive Pricing', text: ['Great value', 'for your investment'] },
  { icon: Leaf, title: 'Future Growth', text: ['A location with', 'lasting potential'] },
]

const UNIT_GRID_COLS = 'sm:grid-cols-[1fr_0.85fr_1.3fr_1fr_150px]'
const UNIT_TABLE_HEADERS = ['Flat', 'Type', 'Facing & area', 'Price', '']
const UNITS_PAGE_SIZE = 8

function formatPlotPrice(plot) {
  if (plot.priceLabel) return plot.priceLabel
  const lakhs = Number(plot.priceLakhs)
  if (!Number.isFinite(lakhs)) return '—'
  if (lakhs >= 100) return `₹ ${(lakhs / 100).toFixed(2)} Cr`
  return `₹ ${lakhs.toFixed(2)} L`
}

function formatUnitPrice(amount) {
  const n = Number(amount)
  if (!Number.isFinite(n)) return '—'
  if (n >= 10000000) return `₹ ${trimZeros(n / 10000000)} Cr`
  if (n >= 100000) return `₹ ${trimZeros(n / 100000)} L`
  return `₹ ${n.toLocaleString('en-IN')}`
}

function trimZeros(num) {
  return num.toFixed(2).replace(/\.?0+$/, '')
}

function getPlotSqYd(plot) {
  if (plot.sqyd) return plot.sqyd
  const sqft = Number(plot.sqft)
  return Number.isFinite(sqft) ? Math.round(sqft / 9) : '—'
}

function isSold(row) {
  return String(row?.status || '').toLowerCase() === 'sold'
}

function PlotCell({ children, divider = true }) {
  return (
    <div className="relative flex items-center justify-center px-1.5 sm:px-3">
      {divider && <span className="absolute left-0 top-1/2 h-6 w-px -translate-y-1/2 bg-[#E0E8F0]" />}
      {children}
    </div>
  )
}

function getPricingType(project) {
  if (project?.plotPricing?.length && project.plotPricing[0].flatNo) return 'units'
  return 'plots'
}

/* ==================================================================
   STICKY SUB-MENU
================================================================== */
const pad = (n) => String(n).padStart(2, '0')

function useNavbarOffset(selector, fallback = 0) {
  const [offset, setOffset] = useState(fallback)

  useEffect(() => {
    const el = selector ? document.querySelector(selector) : null
    if (!el) { setOffset(fallback); return }

    let raf = 0
    const measure = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const pos = getComputedStyle(el).position
        const pinned = pos === 'fixed' || pos === 'sticky'
        const next = pinned ? Math.max(0, Math.round(el.getBoundingClientRect().bottom)) : 0
        setOffset((prev) => (prev === next ? prev : next))
      })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    el.addEventListener('transitionend', measure)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
      el.removeEventListener('transitionend', measure)
    }
  }, [selector, fallback])

  return offset
}

/* ================================================================== */
/*  PROJECT SUB-MENU                                                   */
/* ================================================================== */
function ProjectSubMenu({
  items = [],
  projectName = '',
  onEnquire,
  navbarSelector = '[data-site-navbar]',
  fallbackOffset = 0,
  fontFamily,
}) {
  const navOffset = useNavbarOffset(navbarSelector, fallbackOffset)

  const sentinelRef = useRef(null)
  const barRef = useRef(null)
  const scrollerRef = useRef(null)
  const tabRefs = useRef({})
  const lockRef = useRef(null)
  const lockTimer = useRef(null)
  const offsetRef = useRef(navOffset)
  offsetRef.current = navOffset

  const itemsKey = items.map((i) => i.id).join('|')
  const [orderedIds, setOrderedIds] = useState(() => items.map((i) => i.id))

  useEffect(() => {
    const found = items
      .map((item) => ({ id: item.id, el: document.getElementById(item.id) }))
      .filter((x) => x.el)
    found.sort((a, b) =>
      a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    )
    setOrderedIds(found.map((x) => x.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey])

  const ordered = useMemo(
    () => orderedIds.map((id) => items.find((i) => i.id === id)).filter(Boolean),
    [orderedIds, items]
  )

  const [activeId, setActiveId] = useState(items[0]?.id || '')
  const [stuck, setStuck] = useState(false)
  const [edges, setEdges] = useState({ left: false, right: false })

  const sectionProgress = useMotionValue(0)
  const pageProgress = useMotionValue(0)
  const smoothSection = useSpring(sectionProgress, { stiffness: 260, damping: 40, restDelta: 0.001 })
  const smoothPage = useSpring(pageProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  useEffect(() => {
    if (!ordered.length) return
    let raf = 0

    const update = () => {
      raf = 0
      const top = offsetRef.current
      const barH = barRef.current?.offsetHeight || 56

      const sentinel = sentinelRef.current
      if (sentinel) {
        const isStuck = sentinel.getBoundingClientRect().top <= top + 0.5
        setStuck((prev) => (prev === isStuck ? prev : isStuck))
      }

      const probe = top + barH + Math.min(window.innerHeight * 0.3, 180)
      const els = ordered.map((i) => document.getElementById(i.id))

      let idx = 0
      els.forEach((el, i) => { if (el && el.getBoundingClientRect().top <= probe) idx = i })

      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom && !lockRef.current) idx = els.length - 1

      const activeEl = els[idx]
      if (activeEl) {
        const r = activeEl.getBoundingClientRect()
        const p = atBottom ? 1 : (probe - r.top) / Math.max(1, r.height)
        sectionProgress.set(Math.min(1, Math.max(0, p)))
      }

      const first = els.find(Boolean)
      const last = [...els].reverse().find(Boolean)
      if (first && last) {
        const start = first.getBoundingClientRect().top + window.scrollY - probe
        const end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight
        pageProgress.set(Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start))))
      }

      const next = lockRef.current || ordered[idx]?.id
      setActiveId((prev) => (prev === next ? prev : next))
    }

    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ordered, navOffset, sectionProgress, pageProgress])

  useEffect(() => {
    const h = barRef.current?.offsetHeight || 0
    document.documentElement.style.setProperty('--project-subnav-offset', `${navOffset + h}px`)
    return () => document.documentElement.style.removeProperty('--project-subnav-offset')
  }, [navOffset, stuck])

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (!el) return

    const barH = barRef.current?.offsetHeight || 0
    const y = el.getBoundingClientRect().top + window.scrollY - offsetRef.current - barH + 1
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    lockRef.current = id
    setActiveId(id)
    clearTimeout(lockTimer.current)
    const release = () => {
      lockRef.current = null
      clearTimeout(lockTimer.current)
      window.removeEventListener('scrollend', release)
    }
    window.addEventListener('scrollend', release, { once: true })
    lockTimer.current = setTimeout(release, 1200)

    window.scrollTo({ top: Math.max(0, y), behavior: reduce ? 'auto' : 'smooth' })
    window.history.replaceState(null, '', `#${id}`)
  }, [])

  useEffect(() => {
    const hash = decodeURIComponent(window.location.hash.slice(1))
    if (!hash || !items.some((i) => i.id === hash)) return
    const t = setTimeout(() => scrollToSection(hash), 350)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey])

  useEffect(() => () => clearTimeout(lockTimer.current), [])

  const updateEdges = useCallback(() => {
    const s = scrollerRef.current
    if (!s) return
    const left = s.scrollLeft > 4
    const right = s.scrollLeft + s.clientWidth < s.scrollWidth - 4
    setEdges((prev) => (prev.left === left && prev.right === right ? prev : { left, right }))
  }, [])

  useEffect(() => {
    const s = scrollerRef.current
    if (!s) return
    updateEdges()
    s.addEventListener('scroll', updateEdges, { passive: true })
    const ro = new ResizeObserver(updateEdges)
    ro.observe(s)
    return () => { s.removeEventListener('scroll', updateEdges); ro.disconnect() }
  }, [updateEdges, ordered.length])

  useEffect(() => {
    const s = scrollerRef.current
    const t = tabRefs.current[activeId]
    if (!s || !t) return
    const tabLeft = t.offsetLeft
    const tabRight = tabLeft + t.offsetWidth
    const viewLeft = s.scrollLeft
    const viewRight = viewLeft + s.clientWidth
    const fullyVisible = tabLeft >= viewLeft && tabRight <= viewRight
    if (fullyVisible) return
    const target = t.offsetLeft - s.clientWidth / 2 + t.offsetWidth / 2
    s.scrollTo({ left: Math.max(0, target), behavior: 'smooth' })
  }, [activeId])

  const nudge = (dir) => {
    const s = scrollerRef.current
    if (s) s.scrollBy({ left: dir * s.clientWidth * 0.6, behavior: 'smooth' })
  }

  if (!ordered.length) return null

  const activeIndex = Math.max(0, ordered.findIndex((i) => i.id === activeId))
  const activeLabel = ordered[activeIndex]?.label

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-0 w-full" />

      <div
        ref={barRef}
        className="sticky z-40 w-full"
        style={{ top: navOffset, fontFamily }}
      >
        <div
          className={`relative w-full border-b transition-[background-color,box-shadow,border-color] duration-500 ${
            stuck
              ? 'border-[#0F3A6B]/10 bg-white/85 shadow-[0_12px_32px_-20px_rgba(15,58,107,0.45)] backdrop-blur-xl backdrop-saturate-150'
              : 'border-[#E4ECF4] bg-white'
          }`}
        >
          <div className="mx-auto flex max-w-[1560px] items-center gap-3 px-2 sm:px-6 lg:px-10">
            <AnimatePresence initial={false}>
              {stuck && projectName && (
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="hidden shrink-0 items-center gap-3 xl:flex"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:hidden" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <div className="leading-tight">
                    <p className="m-0 max-w-[190px] truncate text-[13.5px] font-bold" style={{ color: DEEP_NAVY }}>
                      {projectName}
                    </p>
                    <p className="m-0 flex items-center gap-1 text-[11.5px] font-medium tabular-nums" style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}>
                      <span className="relative inline-flex overflow-hidden">
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={activeIndex}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="inline-block"
                          >
                            {pad(activeIndex + 1)}
                          </motion.span>
                        </AnimatePresence>
                      </span>
                      <span>of {pad(ordered.length)}</span>
                      <span className="max-w-[110px] truncate">— {activeLabel}</span>
                    </p>
                  </div>
                  <span className="ml-1 h-8 w-px bg-[#E0E8F0]" />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative min-w-0 flex-1">
              <div className={`pointer-events-none absolute inset-y-0 left-0 z-[2] w-14 bg-gradient-to-r from-white via-white/80 to-transparent transition-opacity duration-300 ${edges.left ? 'opacity-100' : 'opacity-0'}`} />
              <div className={`pointer-events-none absolute inset-y-0 right-0 z-[2] w-14 bg-gradient-to-l from-white via-white/80 to-transparent transition-opacity duration-300 ${edges.right ? 'opacity-100' : 'opacity-0'}`} />

              {edges.left && (
                <button
                  type="button"
                  onClick={() => nudge(-1)}
                  aria-label="Scroll sections left"
                  className="absolute left-0 top-1/2 z-[3] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D5E1ED] bg-white text-[#0F3A6B] shadow-[0_6px_16px_-8px_rgba(15,58,107,0.4)] transition hover:border-[#0F3A6B] sm:flex"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
                </button>
              )}
              {edges.right && (
                <button
                  type="button"
                  onClick={() => nudge(1)}
                  aria-label="Scroll sections right"
                  className="absolute right-0 top-1/2 z-[3] hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#D5E1ED] bg-white text-[#0F3A6B] shadow-[0_6px_16px_-8px_rgba(15,58,107,0.4)] transition hover:border-[#0F3A6B] sm:flex"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
                </button>
              )}

              <nav
                ref={scrollerRef}
                aria-label="Project sections"
                className="relative overflow-x-auto py-2 [scrollbar-width:none] sm:py-2.5 [&::-webkit-scrollbar]:hidden"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="mx-auto flex w-max items-center gap-1 px-1 sm:gap-1.5">
                  {ordered.map((item) => {
                    const isActive = item.id === activeId
                    const Icon = item.icon
                    return (
                      <a
                        key={item.id}
                        ref={(el) => { tabRefs.current[item.id] = el }}
                        href={`#${item.id}`}
                        onClick={(e) => { e.preventDefault(); scrollToSection(item.id) }}
                        aria-current={isActive ? 'location' : undefined}
                        className={`relative flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[12.5px] font-semibold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#0F3A6B]/40 focus-visible:ring-offset-2 sm:px-4 sm:py-2.5 sm:text-[13.5px] ${
                          isActive ? 'text-white' : 'text-[#5A6B7B] hover:bg-[#F0F6FC] hover:text-[#0F3A6B]'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="projectSubnavPill"
                            transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                            className="absolute inset-0 rounded-full shadow-[0_10px_22px_-10px_rgba(15,58,107,0.8)]"
                            style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
                          >
                            <span className="absolute bottom-[4px] left-4 right-4 h-[2px] overflow-hidden rounded-full bg-white/20">
                              <motion.span
                                className="absolute inset-0 origin-left rounded-full bg-white/85"
                                style={{ scaleX: smoothSection }}
                              />
                            </span>
                          </motion.span>
                        )}
                        {Icon && (
                          <Icon
                            className="relative z-[1] hidden h-4 w-4 sm:block"
                            strokeWidth={isActive ? 2 : 1.75}
                          />
                        )}
                        <span className="relative z-[1] whitespace-nowrap">{item.label}</span>
                      </a>
                    )
                  })}
                </div>
              </nav>
            </div>

            {onEnquire && (
              <AnimatePresence initial={false}>
                {stuck && (
                  <motion.button
                    type="button"
                    onClick={onEnquire}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="hidden shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_10px_22px_-10px_rgba(15,58,107,0.8)] transition-transform hover:-translate-y-px active:scale-[0.97] md:inline-flex"
                    style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
                  >
                    <Send className="h-3.5 w-3.5" strokeWidth={2.25} />
                    Enquire now
                  </motion.button>
                )}
              </AnimatePresence>
            )}
          </div>

          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 -bottom-px h-[2px] origin-left"
            style={{ scaleX: smoothPage, background: `linear-gradient(90deg, ${DEEP_NAVY} 0%, #3B7BC4 100%)` }}
          />
        </div>
      </div>
    </>
  )
}

/* ==================================================================
   UNIT STATUS PILL + UNIT ROW
================================================================== */
function StatusPill({ sold }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold leading-none ${
        sold ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-700'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${sold ? 'bg-slate-400' : 'bg-emerald-500'}`} />
      {sold ? 'Sold' : 'Available'}
    </span>
  )
}

function UnitRow({ row, onEnquire }) {
  const sold = isSold(row)
  const floor = row.floor?.replace(' Floor', '')
  const area = row.sqft ? `${row.sqft} sq.ft` : ''

  return (
    <div
      className={`group rounded-xl px-2.5 py-2.5 transition-colors duration-200 sm:px-4 sm:py-3 ${
        sold ? 'opacity-55' : 'hover:bg-[#F0F6FC]'
      }`}
    >
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <div className="min-w-0">
          <p className="m-0 text-[14px] font-bold leading-tight tabular-nums" style={{ color: DEEP_NAVY }}>
            {row.flatNo}
            {floor && <span className="ml-2 text-[10.5px] font-medium" style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}>{floor} floor</span>}
          </p>
          <p className="m-0 mt-1 truncate text-[11.5px]" style={{ color: TEXT_CHARCOAL, opacity: 0.75 }}>
            {[row.type, row.facing, area].filter(Boolean).join(' · ')}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span className="text-[13.5px] font-bold tabular-nums leading-none" style={{ color: DEEP_NAVY }}>
            {formatUnitPrice(row.finalTotal)}
          </span>
          {sold ? (
            <StatusPill sold />
          ) : (
            <button
              type="button"
              onClick={onEnquire}
              className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold leading-none text-emerald-700 active:scale-[0.96]"
            >
              Enquire
              <ArrowUpRight className="h-3 w-3" strokeWidth={2.25} />
            </button>
          )}
        </div>
      </div>

      <div className={`hidden items-center gap-4 sm:grid ${UNIT_GRID_COLS}`}>
        <div className="flex flex-col">
          <span className="text-[15px] font-bold leading-tight tabular-nums" style={{ color: DEEP_NAVY }}>{row.flatNo}</span>
          {floor && <span className="mt-0.5 text-[11.5px]" style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}>{floor} floor</span>}
        </div>
        <span className="text-[13.5px] font-medium" style={{ color: TEXT_CHARCOAL }}>{row.type}</span>
        <div className="flex flex-col">
          <span className="text-[13.5px] font-medium" style={{ color: TEXT_CHARCOAL }}>{row.facing}</span>
          <span className="mt-0.5 text-[11.5px] tabular-nums" style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}>{area}</span>
        </div>
        <span className="text-[15px] font-bold tabular-nums" style={{ color: DEEP_NAVY }}>{formatUnitPrice(row.finalTotal)}</span>
        <div className="flex items-center justify-end gap-2">
          <StatusPill sold={sold} />
          {!sold && (
            <button
              type="button"
              onClick={onEnquire}
              aria-label={`Enquire about flat ${row.flatNo}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D5E1ED] bg-white text-[#0F3A6B] transition-all duration-200 hover:border-[#0F3A6B] hover:bg-[#0F3A6B] hover:text-white active:scale-[0.94]"
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

/* ==================================================================
   ENQUIRE MODAL
================================================================== */
function EnquireModal({ open, onClose, presetType = '', projectName = '', context = '', brochureUrl = '' }) {
  const INQUIRY_TYPES = ['General Enquiry', 'Gurudev', 'Privana']
  const [form, setForm] = useState({ name: '', email: '', phone: '', inquiryType: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const isBrochure = Boolean(brochureUrl)
  const showBrochure = isBrochure && submitted

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

    const baseMessage = form.message.trim()
    const payload = {
      full_name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim(),
      inquiry_type: form.inquiryType,
      message: isBrochure ? [`[Brochure download] ${projectName}`, baseMessage].filter(Boolean).join(' — ') : baseMessage,
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

      if (isBrochure) return

      const url = buildWhatsAppUrl({
        name: payload.full_name,
        phone: payload.phone,
        inquiryType: payload.inquiry_type,
        message: payload.message,
        projectName: [projectName, context].filter(Boolean).join(' – '),
      })
      window.location.href = url
    } catch (err) {
      console.error('Enquiry submit failed:', err)
      setErrorMessage("We couldn't reach the server. Please check your connection and try again.")
      setSubmitting(false)
    }
  }

  const inputClass = (field) =>
    `w-full rounded-xl border bg-[#F7FAFD] px-3.5 py-2.5 text-[13.5px] text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-[#0F3A6B]/15 sm:px-4 sm:py-3 sm:text-[14px] ${
      fieldErrors[field] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-[#0F3A6B]'
    }`

  const headerTitle = isBrochure
    ? `${projectName} Brochure`
    : projectName ? `Enquire about ${projectName}` : "Let's Talk"

  const headerSubtitle = isBrochure
    ? (showBrochure ? 'Your brochure is ready' : 'Share your details to view the brochure')
    : "We'll get back to you within 24 hours"

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 px-3 py-6 backdrop-blur-sm sm:px-4 sm:py-8" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative max-h-full w-full overflow-y-auto rounded-[20px] bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)] transition-[max-width] duration-300 sm:rounded-[22px] ${
          showBrochure ? 'max-w-[920px]' : 'max-w-[460px]'
        }`}
        style={{ animation: 'enquireModalIn 0.35s cubic-bezier(0.22,1,0.36,1)', fontFamily: FONT }}
      >
        <style>{`
          @keyframes enquireModalIn {
            from { opacity: 0; transform: translateY(16px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        `}</style>

        <div className="relative px-5 pb-6 pt-6 sm:px-8 sm:pb-8 sm:pt-7" style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}>
          <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25">
            <X className="h-4 w-4" strokeWidth={2.25} />
          </button>
          <div className="flex items-center gap-3 pr-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-md sm:h-11 sm:w-11">
              <img src={LOGO_URL} alt="" className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="m-0 text-[17px] font-bold leading-tight text-white sm:text-[21px]">{headerTitle}</h2>
              <p className="m-0 mt-0.5 text-[12px] text-[#B8CFE8] sm:text-[12.5px]">{headerSubtitle}</p>
            </div>
          </div>
        </div>

        {showBrochure ? (
          <div className="flex flex-col gap-4 px-5 py-5 sm:px-8 sm:py-6">
            <div className="flex items-start gap-3 rounded-xl bg-emerald-50 px-3.5 py-3">
              <Check className="mt-[1px] h-4 w-4 shrink-0 text-emerald-600" strokeWidth={2.5} />
              <p className="m-0 text-[12.5px] leading-snug text-emerald-800 sm:text-[13px]">{successMessage}</p>
            </div>

            <div className="hidden overflow-hidden rounded-xl border border-[#E0E8F0] bg-[#F7FAFD] sm:block">
              <iframe
                src={`${brochureUrl}#view=FitH`}
                title={`${projectName} brochure`}
                className="block h-[60vh] w-full"
              />
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <a
                href={brochureUrl}
                download
                className="flex items-center justify-center gap-2 rounded-xl py-3 text-[13.5px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(15,58,107,0.55)] transition-all active:scale-[0.98] sm:py-3.5 sm:text-[14px]"
                style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
              >
                <Download className="h-4 w-4" strokeWidth={2.25} />
                Download Brochure
              </a>
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border py-3 text-[13.5px] font-bold transition-all hover:bg-[#F0F6FC] active:scale-[0.98] sm:py-3.5 sm:text-[14px]"
                style={{ color: DEEP_NAVY, borderColor: `${DEEP_NAVY}55` }}
              >
                <ExternalLink className="h-4 w-4" strokeWidth={2.25} />
                View Brochure
              </a>
            </div>
          </div>
        ) : submitted ? (
          <div className="flex flex-col items-center gap-3 px-5 py-12 text-center sm:px-8 sm:py-14">
            <div className="flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16" style={{ backgroundColor: `${DEEP_NAVY}1a` }}>
              <Check className="h-7 w-7" style={{ color: DEEP_NAVY }} strokeWidth={2.5} />
            </div>
            <h3 className="m-0 text-[17px] font-bold text-gray-800 sm:text-[18px]">Thank You!</h3>
            <p className="m-0 max-w-[300px] text-[13px] leading-relaxed text-gray-500 sm:text-[13.5px]">{successMessage}</p>
            <p className="m-0 flex items-center gap-2 text-[12px] text-gray-400">
              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-500" />
              Redirecting you to WhatsApp...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 px-5 py-5 sm:gap-4 sm:px-8 sm:py-6">
            {errorMessage && (
              <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] leading-snug text-red-700">
                <AlertTriangle className="mt-[1px] h-4 w-4 shrink-0" strokeWidth={2} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-600 sm:text-[12.5px]">
                Full Name <span style={{ color: DEEP_NAVY }}>*</span>
              </label>
              <input required type="text" name="full_name" placeholder="Enter your name" value={form.name} onChange={handleChange('name')} className={inputClass('name')} />
              {fieldErrors.name && <span className="text-[11.5px] text-red-600">{fieldErrors.name}</span>}
            </div>

            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-gray-600 sm:text-[12.5px]">
                  Email <span style={{ color: DEEP_NAVY }}>*</span>
                </label>
                <input required type="email" name="email" placeholder="you@email.com" value={form.email} onChange={handleChange('email')} className={inputClass('email')} />
                {fieldErrors.email && <span className="text-[11.5px] text-red-600">{fieldErrors.email}</span>}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-gray-600 sm:text-[12.5px]">
                  Phone <span style={{ color: DEEP_NAVY }}>*</span>
                </label>
                <input required type="tel" name="phone" placeholder="+91 00000 00000" value={form.phone} onChange={handleChange('phone')} className={inputClass('phone')} />
                {fieldErrors.phone && <span className="text-[11.5px] text-red-600">{fieldErrors.phone}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-semibold text-gray-600 sm:text-[12.5px]">
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
              <label className="text-[12px] font-semibold text-gray-600 sm:text-[12.5px]">
                Your Message <span className="font-normal text-gray-400">(optional)</span>
              </label>
              <textarea rows={3} name="message" placeholder="Tell us a bit more..." value={form.message} onChange={handleChange('message')} className={`${inputClass('message')} resize-none`} />
              {fieldErrors.message && <span className="text-[11.5px] text-red-600">{fieldErrors.message}</span>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl py-3 text-[14px] font-bold text-white shadow-[0_10px_24px_-8px_rgba(15,58,107,0.55)] transition-all hover:shadow-[0_14px_30px_-8px_rgba(15,58,107,0.65)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 sm:py-3.5 sm:text-[14.5px]"
              style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
            >
              {submitting ? (
                <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />Sending...</>
              ) : isBrochure ? (
                <><Download className="h-4 w-4" strokeWidth={2.25} />Get Brochure</>
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
const BTN_BASE = 'group inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-[13px] font-bold transition-all duration-200 active:scale-[0.98] sm:gap-2.5 sm:px-6 sm:py-3.5 sm:text-[14px]'

function SolidButton({ children, href, onClick, className = '', icon: Icon, type = 'button', fullWidth = false }) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href} onClick={onClick} type={!href ? type : undefined}
      style={{ fontFamily: FONT, backgroundColor: DEEP_NAVY }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = DEEP_NAVY_HOVER }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = DEEP_NAVY }}
      className={`${BTN_BASE} text-white shadow-[0_4px_14px_-4px_rgba(15,58,107,0.4)] hover:shadow-[0_6px_20px_-4px_rgba(15,58,107,0.55)] ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" strokeWidth={2.25} />}
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
      className={`${BTN_BASE} border border-white/60 bg-transparent text-white backdrop-blur-sm hover:border-white hover:bg-white/10 ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" strokeWidth={2.25} />}
      <span>{children}</span>
    </Comp>
  )
}

function AccentOutlineButton({ children, href, onClick, className = '', icon: Icon, type = 'button', fullWidth = false, target, rel }) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href} onClick={onClick} type={!href ? type : undefined} target={target} rel={rel}
      style={{ fontFamily: FONT, color: DEEP_NAVY, borderColor: `${DEEP_NAVY}80` }}
      className={`${BTN_BASE} border bg-white hover:border-current hover:bg-[#F0F6FC] ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0 sm:h-[18px] sm:w-[18px]" strokeWidth={2.25} />}
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
      className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 active:scale-95 sm:h-11 sm:w-11 ${styles[variant]} ${className}`}
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

function SectionEyebrow({ children, className = '' }) {
  return (
    <span
      className={`inline-block text-[10.5px] font-medium uppercase tracking-[2.5px] sm:text-[12px] sm:tracking-[3.5px] ${className}`}
      style={{ color: DEEP_NAVY }}
    >
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
    let lon = -90
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
          title: a.title,
          eyebrow: a.tagline || 'Explore',
          description: a.description || `Discover the ${a.title.toLowerCase()} at ${project.name || 'this project'} — thoughtfully designed for everyday comfort.`,
          tags: a.tags?.length ? a.tags : [],
          image: a.image,
          gallery: a.gallery || (a.image ? [a.image] : []),
        }))
      : DEFAULT_AMENITIES_TABS

  const amenitiesEyebrow = project?.amenitiesEyebrow || 'Life at its finest'
  const amenitiesHeading = project?.amenitiesHeading?.length
    ? project.amenitiesHeading
    : ['World-Class Amenities for a', 'Better Tomorrow']
  const amenitiesDescription =
    project?.amenitiesDescription ||
    `Thoughtfully curated spaces and modern conveniences that bring comfort, community and a healthier lifestyle together at ${project?.name || 'our community'}.`

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
  useEffect(() => { setActiveAmenity(0) }, [project?.slug])

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

  const floorPlanBlocks = project?.floorPlanBlocks || []
  const hasFloorPlanBlocks = floorPlanBlocks.length > 0
  const [activeBlock, setActiveBlock] = useState(0)
  const currentFloorBlock = hasFloorPlanBlocks ? floorPlanBlocks[activeBlock] : null

  const floorPlanTabs = hasFloorPlanBlocks ? (currentFloorBlock?.tabs || []) : (project?.floorPlanTabs || [])
  const allFloorPlans = hasFloorPlanBlocks ? (currentFloorBlock?.plans || []) : (project?.floorPlans || [])

  const floorPlansRef = useRef(null)

  /* ---------------- Facing filter ---------------- */

  const pricingRowsForFacing = project?.plotPricing?.length ? project.plotPricing : EMPTY_ROWS

  const planFacings = useMemo(() => {
    const map = new Map()
    allFloorPlans.forEach((plan) => map.set(plan, getPlanFacing(plan, pricingRowsForFacing)))
    return map
  }, [allFloorPlans, pricingRowsForFacing])

  const facingCounts = useMemo(() => {
    const counts = {}
    allFloorPlans.forEach((plan) => {
      const facing = planFacings.get(plan)
      if (facing) counts[facing] = (counts[facing] || 0) + 1
    })
    return counts
  }, [allFloorPlans, planFacings])

  const facingOptions = useMemo(
    () => FACING_ORDER.filter((facing) => facingCounts[facing]),
    [facingCounts],
  )

  const hasFacingFilter = facingOptions.length > 1

  const [facingFilter, setFacingFilter] = useState('all')

  useEffect(() => { setFacingFilter('all') }, [activeBlock])

  const isFacingFiltered = hasFacingFilter && facingFilter !== 'all'

  const visibleFloorPlans = isFacingFiltered
    ? allFloorPlans.filter((plan) => planFacings.get(plan) === facingFilter)
    : allFloorPlans

  const activeFacingAngle = FACING_ANGLE[facingFilter] ?? -45
  const selectedPlanFacing = (plan) => planFacings.get(plan) || ''

  const floorPlanGroups = (
    floorPlanTabs.length
      ? floorPlanTabs.map((label) => ({ label, plans: visibleFloorPlans.filter((p) => planMatchesTab(p, label)) }))
      : [{ label: '', plans: visibleFloorPlans }]
  ).filter((group) => group.plans.length > 0)

  const totalFloorPlans = floorPlanGroups.reduce((sum, g) => sum + g.plans.length, 0)

  const [picked, setPicked] = useState(null)

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
  const stripRef = useRef(null)
  const stripGroupRefs = useRef({})

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

  const masterPlan = project?.masterPlan || null
  const masterPlanTabs = masterPlan?.tabs?.length ? masterPlan.tabs : []
  const hasMasterPlan = masterPlanTabs.length > 0
  const [activeMasterTab, setActiveMasterTab] = useState(0)
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

  const pricingType = getPricingType(project)
  const isUnits = pricingType === 'units'
  const plotRows = project?.plotPricing?.length ? project.plotPricing : DEFAULT_PLOT_PRICING

  const plotTabs = isUnits
    ? (project?.plotPricingTabs?.length
        ? project.plotPricingTabs
        : [
            { id: 'all', label: 'All' },
            ...[...new Set(plotRows.map((r) => r.type).filter(Boolean))].map((t) => ({ id: t, label: t })),
          ])
    : (project?.plotPricingTabs?.length ? project.plotPricingTabs : DEFAULT_PLOT_TABS)

  const [plotFilter, setPlotFilter] = useState('all')
  const [availableOnly, setAvailableOnly] = useState(false)
  const [unitsVisible, setUnitsVisible] = useState(UNITS_PAGE_SIZE)
  const plotPricingRef = useRef(null)

  const filteredPlots = plotRows.filter((p) => {
    const matchesTab = plotFilter === 'all' || (p.categories || []).includes(plotFilter) || p.type === plotFilter
    const matchesAvail = !(isUnits && availableOnly) || !isSold(p)
    return matchesTab && matchesAvail
  })

  const shownUnits = filteredPlots.slice(0, unitsVisible)
  const remainingUnits = Math.max(0, filteredPlots.length - unitsVisible)
  const canCollapseUnits = unitsVisible > UNITS_PAGE_SIZE && filteredPlots.length > UNITS_PAGE_SIZE

  const availableUnits = isUnits ? plotRows.filter((r) => !isSold(r)) : []
  const soldUnitsCount = isUnits ? plotRows.length - availableUnits.length : 0
  const lowestUnitPrice = availableUnits.length
    ? Math.min(...availableUnits.map((r) => Number(r.finalTotal)).filter(Number.isFinite))
    : null

  const locationRef = useRef(null)
  const locationInView = useInView(locationRef, { once: true, margin: '-100px' })
  const tourRef = useRef(null)
  const tourInView = useInView(tourRef, { once: true, margin: '-100px' })

  const bannerRef = useRef(null)

  const [tour360Open, setTour360Open] = useState(false)
  const [enquireOpen, setEnquireOpen] = useState(false)
  const [enquirePreset, setEnquirePreset] = useState('')
  const [enquireContext, setEnquireContext] = useState('')
  const [enquireBrochure, setEnquireBrochure] = useState('')

  const openEnquire = (presetType = '', context = '') => {
    setEnquirePreset(presetType); setEnquireContext(context); setEnquireBrochure(''); setEnquireOpen(true)
  }

  const openBrochure = () => {
    if (!project?.brochureUrl) return
    setEnquirePreset(project.name || ''); setEnquireContext('Brochure'); setEnquireBrochure(project.brochureUrl); setEnquireOpen(true)
  }

  if (!project) return null

  const quickFacts = project.quickFacts || []
  const factsCount = quickFacts.length
  const lastRowStart = factsCount - (factsCount % 2 === 0 ? 2 : 1)
  const plotCtaImage = project.plotPricingCtaImage || '/plot.png'
  const hasBrochure = Boolean(project.brochureUrl)

  const panoramaSrc = project.tour360Image || project.tourImage
  const tourThumbnail = project.tourThumbnail || project.tourImage || project.tour360Image

  const subMenuItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    amenityTabs.length > 0 && { id: 'amenities', label: 'Amenities', icon: Sparkles },
    galleryItems.length > 0 && { id: 'gallery', label: 'Gallery', icon: Images },
    (floorPlanGroups.length > 0 || hasFloorPlanBlocks) && { id: 'floor-plans', label: 'Floor plans', icon: LayoutGrid },
    hasMasterPlan && { id: 'master-plan', label: 'Master plan', icon: Grid3x3 },
    plotRows.length > 0 && { id: 'price-list', label: 'Pricing', icon: Tag },
    (tourThumbnail || panoramaSrc) && { id: 'tour', label: '360° tour', icon: Move3d },
    project.locationLandmarks?.length > 0 && { id: 'location', label: 'Location', icon: MapPin },
  ].filter(Boolean)

  return (
    <div className={`${figtree.className} w-full overflow-x-clip`} style={{ fontFamily: FONT }}>
      {/* ================= Banner ================= */}
      <section ref={bannerRef} className="relative w-full" style={{ fontFamily: FONT }}>
        <div
          className="relative hidden w-full items-center justify-center overflow-hidden bg-[#333] bg-cover bg-center md:flex md:min-h-[750px]"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
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

      {/* ================= Sticky Sub-Menu ================= */}
      <ProjectSubMenu
        items={subMenuItems}
        projectName={project.name}
        fontFamily={FONT}
        onEnquire={() => openEnquire(project.name || '', 'Sticky menu')}
      />

      {/* ================= Overview ================= */}
      <section id="overview" className="relative w-full overflow-hidden bg-white px-4 py-10 sm:px-8 sm:py-16 md:px-10 lg:px-16 lg:py-24" style={{ fontFamily: FONT }}>
        <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-stretch gap-7 sm:gap-10 lg:grid-cols-[1fr_0.95fr_1.1fr] lg:gap-8">
          <div>
            <FadeUp>
              <div className="mb-3 flex items-center gap-3 sm:mb-5">
                <SectionEyebrow>{project.eyebrow || 'More than just a home'}</SectionEyebrow>
              </div>
            </FadeUp>

            <RevealText
              as="h2"
              className="mb-3 text-[26px] font-semibold leading-[1.15] tracking-tight text-[#1f2029] sm:mb-5 sm:text-[36px] sm:leading-[1.12] md:text-[46px] xl:text-[52px]"
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
              <p className="mb-5 max-w-[610px] text-[13.5px] leading-[1.75] sm:mb-8 sm:text-[15px] sm:leading-[1.85] md:text-base" style={{ color: TEXT_CHARCOAL }}>
                {project.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mb-1 flex flex-wrap items-center gap-2.5 sm:gap-3 lg:mb-8">
                {hasBrochure && (
                  <AccentOutlineButton onClick={openBrochure} icon={Download}>
                    Download Brochure
                  </AccentOutlineButton>
                )}
                <AccentOutlineButton href="tel:+919543633333" icon={Phone}>Call Us</AccentOutlineButton>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.15} className="relative lg:h-full lg:min-h-[420px]">
            <img
              src={project.aboutImage}
              alt={project.name || 'Project'}
              className="h-auto w-full rounded-[14px] object-cover shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] sm:rounded-[16px] lg:absolute lg:inset-0 lg:h-full"
            />
          </FadeUp>

          <FadeUp delay={0.25} amount={0.1} className="h-full">
            <div className="relative flex h-full w-[650px] flex-col justify-center rounded-[18px] border border-[#E0E8F0] bg-white px-4 py-2 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] sm:rounded-[22px] sm:px-6 sm:py-8 md:px-7 md:py-10">
              <div className="pointer-events-none absolute bottom-8 left-1/2 top-8 hidden w-px -translate-x-1/2 bg-[#E8EFF7] sm:block" />
              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {quickFacts.map((fact, i) => {
                  const FactIcon = factIconMap[fact.icon] || getFactIcon(fact.label)
                  const isRight = i % 2 === 1
                  const isLastRow = i >= lastRowStart
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-3 border-b border-[#E8EFF7] py-3.5 sm:gap-4 sm:py-7 ${isLastRow ? 'sm:border-b-0' : ''} ${i === factsCount - 1 ? 'border-b-0' : ''} ${isRight ? 'sm:pl-6' : 'sm:pr-4'}`}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-[60px] sm:w-[60px] sm:rounded-2xl" style={{ backgroundColor: LIGHT_BLUE }}>
                        <FactIcon className="h-[18px] w-[18px] sm:h-6 sm:w-6" strokeWidth={1.5} style={{ color: DEEP_NAVY }} />
                      </span>
                      <div className="flex min-h-[44px] min-w-0 flex-1 flex-col justify-center sm:min-h-[60px] sm:pt-1">
                        <p className="m-0 mb-1 text-[10px] font-semibold uppercase leading-[1.3] tracking-[1.3px] sm:mb-1.5 sm:text-[11.5px] sm:tracking-[1.8px]" style={{ color: TEXT_CHARCOAL, opacity: 0.55 }}>{fact.label}</p>
                        <p className="m-0 break-words text-[13.5px] font-bold leading-[1.35] sm:text-[16px]" style={{ color: DEEP_NAVY }}>{fact.value}</p>
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
        <section ref={amenitiesRef} id="amenities" className="relative w-full overflow-hidden bg-white px-4 py-10 sm:px-8 sm:py-20 md:px-10 lg:px-16 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#0F3A6B]/[0.05] blur-[120px]" />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="mb-7 grid grid-cols-1 gap-6 sm:mb-12 sm:gap-8 lg:grid-cols-[0.85fr_1.9fr_0.2fr] lg:items-start lg:gap-6">
              <div>
                <FadeUp>
                  <div className="mb-3 flex items-center gap-3 sm:mb-5">
                    <SectionEyebrow>{amenitiesEyebrow}</SectionEyebrow>
                  </div>
                </FadeUp>

                <RevealText
                  as="h2"
                  text={<>
                    {amenitiesHeading[0]}<br />
                    <span style={{ color: DEEP_NAVY }}>{amenitiesHeading[1]}</span>
                  </>}
                  className="mb-3 text-[24px] font-semibold leading-[1.18] tracking-tight text-[#1f2029] sm:mb-5 sm:text-[32px] sm:leading-[1.14] md:text-[42px]"
                  delay={0.1}
                />

                <FadeUp delay={0.2}>
                  <p className="mb-0 max-w-[400px] text-[13.5px] leading-[1.75] sm:mb-7 sm:text-[15px] sm:leading-[1.8]" style={{ color: TEXT_CHARCOAL }}>
                    {amenitiesDescription}
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.2}>
                <div className="grid grid-cols-3 gap-x-2 gap-y-4 sm:gap-x-4 sm:gap-y-8 md:grid-cols-5">
                  {amenityTabs.map((tab, i) => {
                    const TabIcon = getAmenityIcon(tab.title)
                    const isActive = i === activeAmenity
                    return (
                      <button key={tab.title + i} onClick={() => setActiveAmenity(i)} className="group flex flex-col items-center gap-2 text-center sm:gap-3">
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-16 sm:w-16 ${isActive ? 'text-white shadow-[0_10px_28px_-12px_rgba(15,58,107,0.75)]' : ''}`}
                          style={isActive ? { backgroundColor: DEEP_NAVY } : { backgroundColor: LIGHT_BLUE }}
                        >
                          <TabIcon className="h-[18px] w-[18px] transition-colors duration-300 sm:h-6 sm:w-6" style={{ color: isActive ? '#FFFFFF' : DEEP_NAVY }} strokeWidth={1.5} />
                        </span>
                        <span className="text-[11px] font-semibold leading-snug sm:text-[13px]" style={{ color: isActive ? '#141414' : TEXT_CHARCOAL }}>
                          {tab.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </FadeUp>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-[1fr_1.7fr]">
              <FadeUp delay={0.2} className="order-2 lg:order-1">
                <div className="flex flex-col rounded-[18px] p-5 sm:rounded-[24px] sm:p-7 lg:h-full" style={{ backgroundColor: LIGHT_BLUE_SOFT }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeAmenity}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="flex flex-1 flex-col"
                    >
                      <span className="mb-2 text-[10.5px] font-semibold uppercase tracking-[2.5px] sm:mb-4 sm:text-[11px]" style={{ color: DEEP_NAVY }}>
                        {current?.eyebrow}
                      </span>
                      <h3 className="m-0 mb-2 text-[20px] font-semibold leading-tight text-[#1f2029] sm:mb-3 sm:text-[26px] md:text-[30px]">{current?.title}</h3>
                      <p className="m-0 text-[13.5px] leading-[1.7] sm:text-[14.5px] sm:leading-[1.75]" style={{ color: TEXT_CHARCOAL }}>{current?.description}</p>

                      {current?.tags?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 sm:mt-6">
                          {current.tags.map((t) => (
                            <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-[#D5E1ED] bg-white px-3 py-1.5 text-[11.5px] font-semibold sm:text-[12.5px]" style={{ color: DEEP_NAVY }}>
                              <Check className="h-3 w-3" strokeWidth={2.5} />
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#DCE7F2] pt-4 sm:mt-auto sm:pt-5">
                        <span className="text-[12px] font-semibold tabular-nums sm:text-[13px]" style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}>
                          <span style={{ color: DEEP_NAVY, opacity: 1 }}>{String(activeAmenity + 1).padStart(2, '0')}</span>
                          {' / '}{String(amenityTabs.length).padStart(2, '0')}
                        </span>
                        <div className="flex items-center gap-2">
                          <IconCircleButton onClick={goPrevAmenityTab} ariaLabel="Previous amenity" variant="light" className="!h-9 !w-9">
                            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                          </IconCircleButton>
                          <IconCircleButton onClick={goNextAmenityTab} ariaLabel="Next amenity" variant="dark" className="!h-9 !w-9">
                            <ChevronRight className="h-4 w-4" strokeWidth={2} />
                          </IconCircleButton>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </FadeUp>

              <FadeUp delay={0.15} className="order-1 lg:order-2">
                <div className="relative h-[240px] w-full overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] sm:h-[420px] md:h-[480px]">
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

                  <span className="absolute bottom-3 right-3 max-w-[60%] truncate rounded-full bg-black/70 px-3 py-1.5 text-[11.5px] font-semibold text-white backdrop-blur sm:bottom-5 sm:right-5 sm:max-w-none sm:px-4 sm:text-[13px]">{current?.title}</span>

                  <IconCircleButton onClick={goPrevAmenityTab} ariaLabel="Previous amenity" variant="light" className="!absolute !left-3 !top-1/2 !h-9 !w-9 !-translate-y-1/2 sm:!left-7 sm:!h-11 sm:!w-11">
                    <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                  </IconCircleButton>
                  <IconCircleButton onClick={goNextAmenityTab} ariaLabel="Next amenity" variant="light" className="!absolute !right-3 !top-1/2 !h-9 !w-9 !-translate-y-1/2 sm:!right-7 sm:!h-11 sm:!w-11">
                    <ChevronRight className="h-5 w-5" strokeWidth={2} />
                  </IconCircleButton>

                  {amenityGalleryCount > 1 && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 sm:bottom-5 sm:left-1/2 sm:-translate-x-1/2">
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
        <section ref={galleryRef} id="gallery" className="relative w-full overflow-hidden bg-white px-4 py-10 sm:px-8 sm:py-20 md:py-24 lg:px-16 lg:py-28" style={{ fontFamily: FONT }}>
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-5 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between sm:gap-5 md:mb-14">
              <div>
                <RevealText
                  as="h2"
                  text={project.galleryHeading?.join(' ') || 'Gallery'}
                  className="text-[24px] font-bold leading-[1.12] tracking-tight text-[#141414] sm:text-[42px] sm:leading-[1.08] md:text-[54px]"
                  delay={0.1}
                />
              </div>

              <FadeUp delay={0.2} className="flex items-center gap-4 self-start sm:self-auto">
                <span className="text-[12px] font-semibold tabular-nums text-[#9a9a9a] sm:text-[13px]">
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
                className="relative h-[240px] w-full overflow-hidden rounded-[18px] bg-[#1a1a1a] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] sm:h-[440px] sm:rounded-[32px] md:h-[560px] lg:h-[680px]"
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

                <IconCircleButton onClick={() => setLightboxOpen(true)} ariaLabel="Open fullscreen" variant="light" className="!absolute !right-3 !top-3 !h-9 !w-9 !bg-white/10 !text-white backdrop-blur-md hover:!bg-white/25 sm:!right-6 sm:!top-6 sm:!h-11 sm:!w-11">
                  <Maximize2 className="h-4 w-4" />
                </IconCircleButton>

                <div className="pointer-events-none absolute bottom-0 left-0 right-0 flex flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div key={`caption-${galleryIndex}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }}>
                      <p className="m-0 mb-1 text-[10px] font-semibold uppercase tracking-[3px] text-[#B8CFE8] sm:text-[11px]">{String(galleryIndex + 1).padStart(2, '0')}</p>
                      {galleryTitles[galleryIndex] && <p className="m-0 text-[16px] font-semibold leading-tight text-white sm:text-3xl">{galleryTitles[galleryIndex]}</p>}
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
        <section ref={floorPlansRef} id="floor-plans" className="relative w-full overflow-hidden bg-white px-4 py-10 sm:px-8 sm:py-16 md:px-10 lg:px-14 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,58,107,0.05),transparent_60%)]" />

          <div className="relative mx-auto max-w-[1560px]">
            <div className="mb-6 grid grid-cols-1 gap-6 sm:mb-10 sm:gap-8 lg:mb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-12">
              <FadeUp>
                <SectionEyebrow className="mb-3 sm:mb-5">{project.floorPlansEyebrow || 'Floor Plans'}</SectionEyebrow>

                <h2 className="m-0 mb-3 text-[26px] font-semibold leading-[1.15] tracking-tight text-[#1f2029] sm:mb-5 sm:text-[36px] sm:leading-[1.1] md:text-[48px] xl:text-[54px]">
                  {project.floorPlansHeading?.[0] || 'Homes Tailored'}<br />
                  <span style={{ color: DEEP_NAVY }}>{project.floorPlansHeading?.[1] || 'to Your Needs'}</span>
                </h2>

                <p className="m-0 max-w-[560px] text-[13.5px] leading-[1.7] sm:text-[15.5px] sm:leading-[1.75]" style={{ color: TEXT_CHARCOAL }}>
                  {project.floorPlansDescription || 'Thoughtfully designed homes with efficient layouts, abundant natural light and optimal space utilisation.'}
                </p>
              </FadeUp>

              <FadeUp delay={0.15}>
                <div className="grid grid-cols-3 items-stretch sm:flex lg:justify-end">
                  {FLOOR_PLAN_HIGHLIGHTS.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div key={i} className="flex items-stretch">
                        <div className={`flex w-full flex-col items-center gap-2 text-center sm:gap-3 ${i === 0 ? 'pr-2 sm:pr-5' : 'px-2 sm:px-5'}`}>
                          <span className="flex h-11 w-11 items-center justify-center rounded-full sm:h-[60px] sm:w-[60px]" style={{ backgroundColor: LIGHT_BLUE }}>
                            <Icon className="h-[18px] w-[18px] sm:h-6 sm:w-6" strokeWidth={1.3} style={{ color: DEEP_NAVY }} />
                          </span>
                          <p className="m-0 text-[11.5px] leading-[1.5] sm:text-[13.5px] sm:leading-[1.55]" style={{ color: TEXT_CHARCOAL }}>
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

            {hasFloorPlanBlocks && (
              <FadeUp>
                <div className="mb-5 sm:mb-8">
                  <p className="m-0 mb-2.5 text-[10.5px] font-semibold uppercase tracking-[2.5px] sm:mb-3 sm:text-[11px] sm:tracking-[3px]" style={{ color: TEXT_CHARCOAL, opacity: 0.55 }}>
                    Select Block
                  </p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    {floorPlanBlocks.map((block, i) => {
                      const isActive = i === activeBlock
                      return (
                        <button
                          key={block.id || block.label || i}
                          onClick={() => setActiveBlock(i)}
                          className={`relative isolate flex items-center gap-2 overflow-hidden rounded-xl border px-3.5 py-2.5 text-[12.5px] font-semibold transition-colors duration-300 active:scale-[0.98] sm:gap-2.5 sm:rounded-2xl sm:px-6 sm:py-3.5 sm:text-[14.5px] ${
                            isActive
                              ? 'border-transparent text-white shadow-[0_16px_34px_-14px_rgba(15,58,107,0.65)]'
                              : 'border-[#D5E1ED] bg-[#F7FAFD] text-[#1f2029] hover:border-[#0F3A6B]/40 hover:bg-[#EDF4FB]'
                          }`}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="floorPlanBlockBg"
                              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                              className="absolute inset-0 -z-10 rounded-xl sm:rounded-2xl"
                              style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
                            />
                          )}
                          <Building2 className="relative z-[1] h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.75} />
                          <span className="relative z-[1]">{block.label}</span>
                          {block.tag && (
                            <span
                              className="relative z-[1] ml-0.5 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide sm:ml-1 sm:px-2.5 sm:text-[10px]"
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

            {hasFacingFilter && (
              <FadeUp delay={0.08}>
                <div className="mb-5 sm:mb-7">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span
                        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white sm:h-[46px] sm:w-[46px]"
                        style={{ borderColor: '#DDE7F1', boxShadow: '0 10px 24px -18px rgba(15,58,107,0.9)' }}
                      >
                        <span className="pointer-events-none absolute inset-[3px] rounded-full border border-dashed" style={{ borderColor: 'rgba(15,58,107,0.14)' }} />
                        <span className="pointer-events-none absolute top-[2px] text-[7px] font-bold leading-none sm:text-[7.5px]" style={{ color: DEEP_NAVY, opacity: 0.55 }}>N</span>
                        <motion.span
                          animate={{ rotate: activeFacingAngle }}
                          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                          className="flex h-full w-full items-center justify-center"
                        >
                          <Navigation2
                            className="h-[15px] w-[15px] sm:h-[17px] sm:w-[17px]"
                            strokeWidth={1.5}
                            style={{ color: DEEP_NAVY, fill: DEEP_NAVY }}
                          />
                        </motion.span>
                      </span>
                      <span
                        className="whitespace-nowrap text-[10.5px] font-semibold uppercase tracking-[2.5px] sm:text-[11px] sm:tracking-[3px]"
                        style={{ color: TEXT_CHARCOAL, opacity: 0.55 }}
                      >
                        Facing
                      </span>
                    </div>

                    <div
                      className="-mx-4 flex items-center gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
                    >
                      <div
                        className="flex shrink-0 items-center gap-1 rounded-full border p-1"
                        style={{ borderColor: '#E3ECF5', backgroundColor: '#F5F9FD' }}
                      >
                        {[{ id: 'all', label: 'All', count: allFloorPlans.length }]
                          .concat(facingOptions.map((facing) => ({ id: facing, label: facing, count: facingCounts[facing] })))
                          .map((option) => {
                            const isActive = option.id === facingFilter
                            const angle = FACING_ANGLE[option.id]
                            return (
                              <button
                                key={option.id}
                                onClick={() => { setFacingFilter(option.id); setPicked(null) }}
                                aria-pressed={isActive}
                                className={`relative isolate flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[12.5px] font-semibold transition-colors duration-300 active:scale-[0.97] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-[13.5px] ${
                                  isActive ? 'text-white' : 'text-[#1f2029] hover:bg-white'
                                }`}
                              >
                                {isActive && (
                                  <motion.span
                                    layoutId="facingFilterPill"
                                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                                    className="absolute inset-0 -z-10 rounded-full"
                                    style={{
                                      background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)`,
                                      boxShadow: '0 14px 28px -16px rgba(15,58,107,0.85)',
                                    }}
                                  />
                                )}
                                {angle === undefined ? (
                                  <Compass
                                    className="relative z-[1] h-[14px] w-[14px] sm:h-[15px] sm:w-[15px]"
                                    strokeWidth={1.8}
                                    style={{ color: isActive ? '#FFFFFF' : DEEP_NAVY }}
                                  />
                                ) : (
                                  <span
                                    className="relative z-[1] flex h-[14px] w-[14px] items-center justify-center sm:h-[15px] sm:w-[15px]"
                                    style={{ transform: `rotate(${angle}deg)` }}
                                  >
                                    <Navigation2
                                      className="h-full w-full"
                                      strokeWidth={1.6}
                                      style={{ color: isActive ? '#FFFFFF' : DEEP_NAVY, fill: isActive ? '#FFFFFF' : DEEP_NAVY }}
                                    />
                                  </span>
                                )}
                                <span className="relative z-[1]">{option.label}</span>
                                <span
                                  className="relative z-[1] rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums sm:px-2 sm:text-[10.5px]"
                                  style={isActive
                                    ? { backgroundColor: 'rgba(255,255,255,0.22)', color: '#FFFFFF' }
                                    : { backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}
                                >
                                  {option.count}
                                </span>
                              </button>
                            )
                          })}
                      </div>

                      <AnimatePresence>
                        {isFacingFiltered && (
                          <motion.button
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.22, ease: EASE }}
                            onClick={() => { setFacingFilter('all'); setPicked(null) }}
                            className="ml-1 flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold transition-colors duration-200 hover:bg-[#F0F6FC] sm:text-[12.5px]"
                            style={{ color: TEXT_CHARCOAL }}
                          >
                            <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
                            Reset
                          </motion.button>
                        )}
                      </AnimatePresence>

                      <span
                        className="ml-auto hidden shrink-0 pl-4 text-[13px] font-medium tabular-nums lg:inline"
                        style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}
                      >
                        {isFacingFiltered
                          ? `${totalFloorPlans} of ${allFloorPlans.length} layouts`
                          : `${allFloorPlans.length} layouts`}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            )}

            {floorPlanGroups.length === 0 ? (
              <div className="rounded-[18px] border border-dashed bg-white px-6 py-12 text-center sm:rounded-3xl sm:px-10" style={{ borderColor: '#D5E1ED' }}>
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: LIGHT_BLUE }}>
                  <Compass className="h-5 w-5" strokeWidth={1.5} style={{ color: DEEP_NAVY }} />
                </span>
                {isFacingFiltered ? (
                  <>
                    <p className="m-0 text-[14.5px] font-semibold text-[#1f2029]">
                      No {facingFilter.toLowerCase()} facing layouts in this block
                    </p>
                    <p className="m-0 mt-1.5 text-[13px]" style={{ color: TEXT_CHARCOAL, opacity: 0.7 }}>
                      Try another direction, or view every layout available here.
                    </p>
                    <button
                      onClick={() => { setFacingFilter('all'); setPicked(null) }}
                      className="mt-5 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold text-white transition-transform duration-200 active:scale-[0.97]"
                      style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
                    >
                      <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
                      Show all layouts
                    </button>
                  </>
                ) : (
                  <p className="m-0 text-sm text-[#6b7280]">Floor plans for this block are being finalised.</p>
                )}
              </div>
            ) : (
              <>
                {floorPlanGroups.length > 1 && (
                  <FadeUp delay={0.1}>
                    <div className="-mx-4 mb-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:mb-5 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
                      <span className="mr-1 shrink-0 text-[10.5px] font-semibold uppercase tracking-[2.5px] sm:text-[11px] sm:tracking-[3px]" style={{ color: TEXT_CHARCOAL, opacity: 0.55 }}>
                        Unit Types
                      </span>
                      {floorPlanGroups.map((group) => {
                        const isActive = group.label === selectedGroupLabel
                        return (
                          <button
                            key={group.label || 'all'}
                            onClick={() => { setPicked({ plan: group.plans[0], label: group.label }); scrollRailTo(group.label) }}
                            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold transition-all duration-300 active:scale-[0.97] sm:gap-2 sm:px-4 sm:py-2 sm:text-[13.5px] ${
                              isActive
                                ? 'border-transparent text-white shadow-[0_12px_26px_-14px_rgba(15,58,107,0.7)]'
                                : 'border-[#D5E1ED] bg-white text-[#1f2029] hover:border-[#0F3A6B]/45 hover:bg-[#F0F6FC]'
                            }`}
                            style={isActive ? { backgroundColor: DEEP_NAVY } : undefined}
                          >
                            {group.label || 'All Layouts'}
                            <span
                              className="rounded-full px-1.5 py-0.5 text-[10.5px] font-bold tabular-nums sm:px-2 sm:text-[11px]"
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
                  <div className="grid grid-cols-1 overflow-hidden rounded-[18px] border border-[#E4ECF4] bg-white shadow-[0_30px_70px_-40px_rgba(0,0,0,0.28)] sm:rounded-[26px] lg:h-[700px] lg:grid-cols-[320px_1fr]">
                    <div
                      ref={stripRef}
                      className="relative flex snap-x items-center gap-2 overflow-x-auto overscroll-x-contain border-b border-[#E4ECF4] px-3 py-3 [scrollbar-width:none] sm:gap-2.5 sm:px-4 sm:py-3.5 lg:hidden [&::-webkit-scrollbar]:hidden"
                      style={{ backgroundColor: '#FBFDFE' }}
                    >
                      {floorPlanGroups.map((group, gi) => (
                        <div
                          key={group.label || 'all'}
                          ref={(el) => { stripGroupRefs.current[group.label] = el }}
                          className="flex shrink-0 items-center gap-2 sm:gap-2.5"
                        >
                          {gi > 0 && <span className="mr-1 h-9 w-px shrink-0 bg-[#DCE6F0]" />}
                          {group.label && floorPlanGroups.length > 1 && (
                            <span className="shrink-0 pl-0.5 text-[10px] font-bold uppercase leading-tight tracking-[1.4px] sm:text-[10.5px] sm:tracking-[1.6px]" style={{ color: DEEP_NAVY }}>
                              {group.label}
                            </span>
                          )}
                          {group.plans.map((plan, i) => {
                            const isActive = plan === selectedPlan
                            const { facing } = splitPlanTitle(plan)
                            const areaLabel = formatArea(plan.area)
                            const planFacing = selectedPlanFacing(plan)
                            const thumb = plan.image3d || plan.image
                            return (
                              <button
                                key={plan.id || `${group.label}-m-${i}`}
                                onClick={() => setPicked({ plan, label: group.label })}
                                aria-current={isActive}
                                className={`flex shrink-0 snap-start items-center gap-2 rounded-xl border py-1.5 pl-1.5 pr-3 text-left transition-all duration-200 active:scale-[0.97] sm:gap-2.5 sm:rounded-2xl sm:py-2 sm:pl-2 sm:pr-4 ${
                                  isActive
                                    ? 'border-transparent text-white shadow-[0_12px_24px_-14px_rgba(15,58,107,0.75)]'
                                    : 'border-[#D5E1ED] bg-white text-[#1f2029]'
                                }`}
                                style={isActive ? { backgroundColor: DEEP_NAVY } : undefined}
                              >
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-10 sm:w-10" style={!isActive ? { backgroundColor: LIGHT_BLUE } : undefined}>
                                  {thumb ? (
                                    <img src={thumb} alt="" loading="lazy" className="h-full w-full object-contain p-0.5" />
                                  ) : (
                                    <LayoutGrid className="h-[17px] w-[17px]" strokeWidth={1.6} style={{ color: DEEP_NAVY }} />
                                  )}
                                </span>
                                <span className="flex flex-col">
                                  <span className="whitespace-nowrap text-[12px] font-semibold leading-tight sm:text-[13px]">{facing || plan.title}</span>
                                  {(areaLabel || planFacing) && (
                                    <span className="mt-0.5 whitespace-nowrap text-[10.5px] opacity-70 sm:text-[11px]">
                                      {[areaLabel, planFacing].filter(Boolean).join(' · ')}
                                    </span>
                                  )}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      ))}
                    </div>

                    <div
                      ref={railRef}
                      className="hidden overflow-y-auto overscroll-contain border-r border-[#E4ECF4] lg:block"
                      style={{ backgroundColor: '#FBFDFE' }}
                    >
                      {floorPlanGroups.map((group) => (
                        <div key={group.label || 'all'} ref={(el) => { railGroupRefs.current[group.label] = el }}>
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
                              const planFacing = selectedPlanFacing(plan)
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
                                      {(areaLabel || planFacing) && (
                                        <span className="mt-0.5 flex items-center gap-1.5 text-[11.5px]" style={{ color: TEXT_CHARCOAL, opacity: 0.6 }}>
                                          {areaLabel && <span className="tabular-nums">{areaLabel}</span>}
                                          {areaLabel && planFacing && <span className="h-2.5 w-px" style={{ backgroundColor: '#C9D7E6' }} />}
                                          {planFacing && (
                                            <span className="flex items-center gap-1">
                                              <span
                                                className="flex h-[11px] w-[11px] items-center justify-center"
                                                style={{ transform: `rotate(${FACING_ANGLE[planFacing] ?? 0}deg)` }}
                                              >
                                                <Navigation2 className="h-full w-full" strokeWidth={1.7} style={{ color: DEEP_NAVY, fill: DEEP_NAVY }} />
                                              </span>
                                              {planFacing}
                                            </span>
                                          )}
                                        </span>
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

                    {selectedPlan && (
                      <div className="flex min-w-0 flex-col xl:flex-row">
                        <div
                          onClick={() => selectedPlanImage && openPlanLightbox(selectedPlan)}
                          className="group relative h-[260px] flex-none cursor-zoom-in overflow-hidden p-3 sm:h-[420px] sm:p-4 lg:h-auto lg:min-h-0 lg:flex-1"
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
                                className="absolute inset-0 h-full w-full select-none object-contain p-3 sm:p-8"
                                draggable={false}
                              />
                            </AnimatePresence>
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                              <LayoutGrid className="h-8 w-8" strokeWidth={1.4} style={{ color: DEEP_NAVY, opacity: 0.6 }} />
                              <p className="m-0 text-[13px]" style={{ color: TEXT_CHARCOAL, opacity: 0.7 }}>Floor plan image coming soon</p>
                            </div>
                          )}

                          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[#141414]/15 bg-white/90 shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)] sm:right-6 sm:top-6 sm:h-10 sm:w-10">
                            <span className="absolute -top-3 rounded bg-white px-1 text-[9.5px] font-bold leading-none text-[#141414]">N</span>
                            <Navigation className="h-3.5 w-3.5 -rotate-45 fill-[#141414] text-[#141414] sm:h-4 sm:w-4" strokeWidth={1.5} />
                          </span>

                          {selectedPlanImage && (
                            <button
                              onClick={(e) => { e.stopPropagation(); openPlanLightbox(selectedPlan) }}
                              aria-label="Enlarge floor plan"
                              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-[#D5E1ED] bg-white px-3 py-1.5 text-[11.5px] font-semibold shadow-[0_8px_20px_-10px_rgba(0,0,0,0.25)] transition-all duration-300 hover:border-[#0F3A6B]/50 hover:bg-[#0F3A6B] hover:text-white active:scale-[0.97] sm:bottom-6 sm:right-6 sm:gap-2 sm:px-4 sm:py-2.5 sm:text-[12.5px]"
                              style={{ color: DEEP_NAVY }}
                            >
                              <Expand className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2} />
                              Enlarge
                            </button>
                          )}
                        </div>

                        <div className="flex w-full shrink-0 flex-col border-t border-[#E4ECF4] px-4 py-5 sm:px-7 sm:py-7 xl:w-[330px] xl:overflow-y-auto xl:border-l xl:border-t-0">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={selectedPlan.id || selectedPlan.title}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.35, ease: EASE }}
                              className="flex flex-1 flex-col"
                            >
                              {(selectedGroupLabel || selectedPlanFacing(selectedPlan)) && (
                                <div className="mb-3 flex flex-wrap items-center gap-2 sm:mb-4">
                                  {selectedGroupLabel && (
                                    <span className="w-fit rounded-full px-3 py-1 text-[10.5px] font-bold uppercase tracking-[1.3px] sm:px-3.5 sm:py-1.5 sm:text-[12px] sm:tracking-[1.5px]" style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}>
                                      {selectedGroupLabel}
                                    </span>
                                  )}
                                  {selectedPlanFacing(selectedPlan) && (
                                    <span
                                      className="flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[1.3px] sm:px-3 sm:py-1.5 sm:text-[11.5px] sm:tracking-[1.5px]"
                                      style={{ borderColor: '#DDE7F1', color: TEXT_CHARCOAL, backgroundColor: '#FBFDFE' }}
                                    >
                                      <span
                                        className="flex h-[13px] w-[13px] items-center justify-center"
                                        style={{ transform: `rotate(${FACING_ANGLE[selectedPlanFacing(selectedPlan)] ?? 0}deg)` }}
                                      >
                                        <Navigation2 className="h-full w-full" strokeWidth={1.6} style={{ color: DEEP_NAVY, fill: DEEP_NAVY }} />
                                      </span>
                                      {selectedPlanFacing(selectedPlan)} Facing
                                    </span>
                                  )}
                                </div>
                              )}

                              <div className="flex items-start justify-between gap-3 sm:gap-4">
                                <h3 className="m-0 text-[18px] font-semibold leading-tight text-[#1f2029] sm:text-[23px]">
                                  {splitPlanTitle(selectedPlan).facing || selectedPlan.title}
                                </h3>
                                {formatArea(selectedPlan.area) && (
                                  <span className="shrink-0 whitespace-nowrap pt-0.5 text-[13px] font-bold tabular-nums sm:pt-1 sm:text-[15px]" style={{ color: DEEP_NAVY }}>
                                    {formatArea(selectedPlan.area)}
                                  </span>
                                )}
                              </div>

                              <p className="m-0 mt-2 border-b border-[#EDF2F8] pb-4 text-[12.5px] leading-[1.65] sm:mt-3 sm:pb-5 sm:text-[13.5px] sm:leading-[1.7]" style={{ color: TEXT_CHARCOAL }}>
                                {getPlanGroupInfo(selectedGroupLabel, project, currentFloorBlock)}
                              </p>

                              <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-2.5 px-0 py-4 sm:gap-x-6 sm:gap-y-3.5 sm:py-6 xl:flex xl:flex-col xl:gap-4">
                                {getPlanRooms(selectedPlan).map((room, i) => {
                                  const RoomIcon = getRoomIcon(room)
                                  return (
                                    <li key={i} className="flex items-center gap-2.5 sm:gap-4">
                                      <RoomIcon className="h-4 w-4 shrink-0 sm:h-[19px] sm:w-[19px]" strokeWidth={1.4} style={{ color: DEEP_NAVY }} />
                                      <span className="text-[12.5px] sm:text-[14.5px]" style={{ color: TEXT_CHARCOAL }}>{room}</span>
                                    </li>
                                  )
                                })}
                              </ul>

                              <div className="mt-auto pt-1 sm:pt-2">
                                <SolidButton onClick={() => openEnquire(project.name || '', `Floor Plan – ${selectedPlan.title}`)} icon={Send} fullWidth className="sm:!py-3.5 sm:!text-[13.5px]">
                                  Enquire Now
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
                    {[
                      splitPlanTitle(lightboxPlan).config,
                      selectedPlanFacing(lightboxPlan) ? `${selectedPlanFacing(lightboxPlan)} Facing` : '',
                      formatArea(lightboxPlan.area),
                    ].filter(Boolean).join(' · ')}
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

      {/* ================= Master Plan ================= */}
      {hasMasterPlan && (
        <section ref={masterPlanRef} id="master-plan" className="relative w-full overflow-hidden bg-white px-4 py-10 sm:px-8 sm:py-16 md:px-10 lg:px-16 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#0F3A6B]/[0.05] blur-[120px]" />
          <div className="relative mx-auto max-w-[1500px]">
            <div className="mb-6 flex flex-col gap-5 sm:mb-10 sm:gap-6 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <FadeUp>
                  <SectionEyebrow className="mb-3 sm:mb-5">{masterPlan.eyebrow || 'Master Plan'}</SectionEyebrow>
                </FadeUp>

                <RevealText
                  as="h2"
                  text={<>
                    {masterPlan.heading?.[0] || 'Thoughtfully Planned'}<br />
                    <span style={{ color: DEEP_NAVY }}>{masterPlan.heading?.[1] || 'Site & Parking Layout'}</span>
                  </>}
                  className="mb-3 text-[24px] font-semibold leading-[1.16] tracking-tight text-[#1f2029] sm:mb-4 sm:text-[32px] sm:leading-[1.12] md:text-[42px] xl:text-[46px]"
                  delay={0.1}
                />

                <FadeUp delay={0.2}>
                  <p className="m-0 max-w-[540px] text-[13.5px] leading-[1.75] sm:text-[15px] sm:leading-[1.8]" style={{ color: TEXT_CHARCOAL }}>
                    {masterPlan.description || 'Every block, driveway and green pocket is planned around ease of movement and open, breathable spaces.'}
                  </p>
                </FadeUp>
              </div>

              {masterPlanTabs.length > 1 && (
                <FadeUp delay={0.2}>
                  <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                    {masterPlanTabs.map((tab, i) => {
                      const isActive = activeMasterTab === i
                      const TabIcon = getMasterPlanIcon(tab.id)
                      return (
                        <button
                          key={tab.id || tab.label}
                          onClick={() => setActiveMasterTab(i)}
                          className={`group relative flex items-center gap-2 overflow-hidden rounded-xl border px-2 py-2 transition-all duration-300 sm:gap-3 sm:rounded-2xl sm:px-3 sm:py-2.5 ${
                            isActive
                              ? 'border-[#0F3A6B] bg-[#0F3A6B] text-white shadow-[0_16px_34px_-14px_rgba(15,58,107,0.65)]'
                              : 'border-[#D5E1ED] bg-white text-[#1f2029] hover:border-[#0F3A6B]/40 hover:bg-[#F7FAFD]'
                          }`}
                        >
                          <span className="relative flex h-10 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black/10 sm:h-12 sm:w-16">
                            {tab.video ? (
                              <video src={tab.video} className="h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" />
                            ) : tab.image ? (
                              <img src={tab.image} alt="" className="h-full w-full object-cover" />
                            ) : (
                              <TabIcon className="h-4 w-4" strokeWidth={1.75} />
                            )}
                            <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/25" />
                          </span>

                          <span className="flex min-w-0 items-center gap-2 pr-1">
                            <TabIcon className="hidden h-4 w-4 sm:block" strokeWidth={1.75} />
                            <span className="text-left text-[12.5px] font-semibold leading-tight sm:whitespace-nowrap sm:text-[14px]">{tab.label}</span>
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
                <div className="mb-5 flex flex-wrap gap-2 sm:mb-8 sm:gap-3">
                  {masterPlan.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 rounded-xl border border-[#E0E8F0] bg-[#F7FAFD] px-3 py-2 sm:gap-2.5 sm:rounded-2xl sm:px-5 sm:py-3">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full sm:h-2 sm:w-2" style={{ backgroundColor: DEEP_NAVY }} />
                      <span className="text-[12px] font-semibold sm:text-[13px]" style={{ color: TEXT_CHARCOAL, opacity: 0.75 }}>{h.label}</span>
                      <span className="text-[12px] font-bold sm:text-[13px]" style={{ color: DEEP_NAVY }}>{h.value}</span>
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
              className="group relative h-[280px] w-full cursor-zoom-in overflow-hidden rounded-[18px] border border-black/[0.04] bg-[#F7FAFD] shadow-[0_30px_70px_-35px_rgba(0,0,0,0.22)] outline-none transition-shadow duration-500 focus-visible:ring-2 focus-visible:ring-[#0F3A6B]/40 sm:h-[520px] sm:rounded-[26px] md:h-[600px]"
            >
              {currentMasterTab?.video ? (
                <video
                  key={`video-${currentMasterTab?.id || activeMasterTab}`}
                  src={currentMasterTab.video}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.03]"
                  autoPlay muted loop playsInline preload="metadata"
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
                className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-[1.4px] text-white shadow-[0_10px_24px_-12px_rgba(15,58,107,0.7)] sm:left-6 sm:top-6 sm:px-4 sm:text-[11.5px] sm:tracking-[1.8px]"
                style={{ backgroundColor: DEEP_NAVY }}
              >
                {currentMasterTab?.label}
              </span>

              <button
                onClick={(e) => { e.stopPropagation(); openMasterLightbox() }}
                aria-label={`View ${currentMasterTab?.label || 'plan'} full screen`}
                className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-2 text-[12px] font-semibold tracking-wide text-white backdrop-blur-xl transition-all duration-300 hover:border-white/60 hover:bg-white/20 active:scale-[0.97] sm:bottom-6 sm:right-6 sm:gap-2.5 sm:px-5 sm:py-3 sm:text-[13px]"
              >
                <Expand className="h-4 w-4" strokeWidth={2} />
                <span className="hidden sm:inline">Expand Plan</span>
                <span className="sm:hidden">Expand</span>
              </button>

              {masterPlanTabs.length > 1 && (
                <div className="absolute bottom-6 left-4 flex items-center gap-1.5 sm:bottom-8 sm:left-6">
                  {masterPlanTabs.map((tab, i) => (
                    <button key={tab.id || tab.label} onClick={(e) => { e.stopPropagation(); setActiveMasterTab(i) }} aria-label={`Show ${tab.label}`}
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

      {/* ================= Pricing & Availability ================= */}
      {plotRows.length > 0 && (
        <section ref={plotPricingRef} id="price-list" className="relative w-full overflow-hidden bg-gradient-to-b from-[#F7FAFD] via-white to-[#F7FAFD] px-4 py-10 sm:px-8 sm:py-16 md:px-10 lg:px-14 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="pointer-events-none absolute -top-20 left-1/3 h-[380px] w-[380px] rounded-full bg-[#0F3A6B]/[0.05] blur-[120px]" />
          <div className="relative mx-auto max-w-[1560px]">
            <div className="grid grid-cols-1 gap-7 sm:gap-10 lg:grid-cols-[1fr_1.35fr] xl:grid-cols-[0.95fr_1.3fr] xl:gap-8">
              <div className="flex flex-col">
                <FadeUp>
                  <div className="mb-3 flex items-center gap-4 sm:mb-6">
                    <SectionEyebrow>{project.plotPricingEyebrow || 'INVEST WITH CONFIDENCE'}</SectionEyebrow>
                  </div>
                </FadeUp>

                <RevealText
                  as="h2"
                  className="mb-3 text-[28px] font-semibold leading-[1.1] tracking-tight text-[#1a1a1a] sm:mb-5 sm:text-[44px] sm:leading-[1.06] md:text-[58px] xl:text-[64px]"
                  text={
                    isUnits ? (
                      <>
                        Homes &<br />
                        <span style={{ color: DEEP_NAVY }}>Pricing</span>
                      </>
                    ) : (
                      <>
                        {project.plotPricingHeading?.[0] || 'Plot Sizes'}{' '}
                        <span style={{ color: DEEP_NAVY }}>&amp;</span><br />
                        {project.plotPricingHeading?.[1] || 'Pricing'}
                      </>
                    )
                  }
                  delay={0.1}
                />

                <FadeUp delay={0.2}>
                  <p className="mb-6 max-w-[430px] text-[13.5px] leading-[1.6] sm:mb-10 sm:text-[16px] sm:leading-[1.55]" style={{ color: TEXT_CHARCOAL }}>
                    {project.plotPricingDescription || 'Choose the perfect home that fits your dreams. Transparent pricing. Timeless value.'}
                  </p>
                </FadeUp>

                <FadeUp delay={0.25}>
                  <div className="mb-6 grid grid-cols-3 sm:mb-10">
                    {PLOT_FEATURES.map((feature, i) => {
                      const FeatureIcon = feature.icon
                      return (
                        <div key={feature.title} className={`flex flex-col items-center px-1.5 text-center sm:px-2 ${i > 0 ? 'border-l border-[#E0E8F0]' : ''}`}>
                          <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-full sm:mb-4 sm:h-[62px] sm:w-[62px]" style={{ backgroundColor: LIGHT_BLUE }}>
                            <FeatureIcon className="h-5 w-5 sm:h-7 sm:w-7" strokeWidth={1.3} style={{ color: DEEP_NAVY }} />
                          </span>
                          <p className="m-0 mb-1 text-[12px] font-semibold leading-snug sm:mb-2 sm:text-[15px]" style={{ color: DEEP_NAVY }}>{feature.title}</p>
                          <p className="m-0 text-[11px] leading-[1.4] sm:text-[13px] sm:leading-[1.45]" style={{ color: TEXT_CHARCOAL }}>
                            {feature.text[0]}<br />{feature.text[1]}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </FadeUp>

                <FadeUp delay={0.3} className="mt-auto">
                  <div className="relative min-h-[210px] overflow-hidden rounded-[18px] bg-[#1f2a1c] shadow-[0_24px_50px_-28px_rgba(0,0,0,0.45)] sm:h-[240px] sm:min-h-0 sm:rounded-[22px]">
                    {plotCtaImage && (
                      <img src={plotCtaImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

                    <div className="relative flex h-full min-h-[210px] flex-col justify-center p-5 sm:min-h-0 sm:p-8">
                      <h3 className="m-0 mb-2 text-[21px] font-semibold leading-[1.2] text-white sm:mb-3 sm:text-[30px] sm:leading-[1.15]">
                        {project.plotPricingCtaHeading?.[0] || 'A Brighter'}<br />
                        {project.plotPricingCtaHeading?.[1] || 'Tomorrow Awaits'}
                      </h3>
                      <p className="m-0 mb-4 max-w-[250px] text-[13px] leading-[1.5] text-white/90 sm:mb-6 sm:text-[14px]">
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
                <div className="h-full rounded-[18px] border border-[#E0E8F0] bg-white p-3 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.22)] sm:rounded-[26px] sm:p-6">

                  {isUnits && (
                    <div className="mb-3 grid grid-cols-3 gap-2 sm:mb-5 sm:gap-3">
                      <div className="rounded-xl bg-[#F0F6FC] px-2.5 py-2 sm:px-4 sm:py-3">
                        <p className="m-0 text-[10.5px] font-medium sm:text-[12px]" style={{ color: TEXT_CHARCOAL, opacity: 0.65 }}>Available</p>
                        <p className="m-0 mt-0.5 text-[15px] font-bold tabular-nums sm:text-[20px]" style={{ color: DEEP_NAVY }}>{availableUnits.length}</p>
                      </div>
                      <div className="rounded-xl bg-[#F0F6FC] px-2.5 py-2 sm:px-4 sm:py-3">
                        <p className="m-0 text-[10.5px] font-medium sm:text-[12px]" style={{ color: TEXT_CHARCOAL, opacity: 0.65 }}>Sold</p>
                        <p className="m-0 mt-0.5 text-[15px] font-bold tabular-nums sm:text-[20px]" style={{ color: DEEP_NAVY }}>{soldUnitsCount}</p>
                      </div>
                      <div className="rounded-xl bg-[#F0F6FC] px-2.5 py-2 sm:px-4 sm:py-3">
                        <p className="m-0 text-[10.5px] font-medium sm:text-[12px]" style={{ color: TEXT_CHARCOAL, opacity: 0.65 }}>Starting from</p>
                        <p className="m-0 mt-0.5 text-[15px] font-bold tabular-nums sm:text-[20px]" style={{ color: DEEP_NAVY }}>
                          {formatUnitPrice(2200000)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 sm:mb-5 sm:gap-y-2.5">
                    <div className="flex min-w-0 items-center gap-1 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                      {plotTabs.map((tab) => {
                        const isActive = plotFilter === tab.id
                        return (
                          <button key={tab.id}
                            onClick={() => { setPlotFilter(tab.id); setUnitsVisible(UNITS_PAGE_SIZE) }}
                            className={`relative shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors sm:px-5 sm:py-2.5 sm:text-[13.5px] ${isActive ? 'text-white' : 'text-[#1a1a1a] hover:bg-[#F0F6FC] hover:text-[#0F3A6B]'}`}>
                            {isActive && (
                              <motion.span layoutId="plotTabPill" transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                                className="absolute inset-0 rounded-lg shadow-[0_10px_20px_-10px_rgba(15,58,107,0.8)]" style={{ backgroundColor: DEEP_NAVY }} />
                            )}
                            <span className="relative">{tab.label}</span>
                          </button>
                        )
                      })}
                    </div>

                    {isUnits && (
                      <button
                        type="button"
                        role="switch"
                        aria-checked={availableOnly}
                        onClick={() => { setAvailableOnly((v) => !v); setUnitsVisible(UNITS_PAGE_SIZE) }}
                        className="inline-flex shrink-0 items-center gap-2 text-[12px] font-semibold sm:gap-2.5 sm:text-[13px]"
                        style={{ color: TEXT_CHARCOAL }}
                      >
                        <span
                          className="relative h-5 w-9 rounded-full transition-colors duration-300"
                          style={{ backgroundColor: availableOnly ? DEEP_NAVY : '#CBD8E6' }}
                        >
                          <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all duration-300 ${availableOnly ? 'left-[18px]' : 'left-0.5'}`} />
                        </span>
                        Available only
                      </button>
                    )}
                  </div>

                  {isUnits ? (
                    <>
                      <div className="overflow-hidden rounded-xl border border-[#E8EFF7] sm:rounded-2xl">
                        <div className="max-h-[460px] overflow-y-auto overscroll-contain [scrollbar-color:#C9D8E8_transparent] [scrollbar-width:thin] sm:max-h-[520px]">
                          <div className={`sticky top-0 z-[2] hidden items-center gap-4 border-b border-[#E3ECF5] px-4 py-3 backdrop-blur-sm sm:grid ${UNIT_GRID_COLS}`} style={{ backgroundColor: 'rgba(232,240,249,0.95)' }}>
                            {UNIT_TABLE_HEADERS.map((header, i) => (
                              <span key={i} className={`text-[12px] font-semibold ${i === UNIT_TABLE_HEADERS.length - 1 ? 'text-right' : ''}`} style={{ color: DEEP_NAVY }}>
                                {header}
                              </span>
                            ))}
                          </div>

                          {filteredPlots.length === 0 ? (
                            <p className="m-0 py-10 text-center text-[13px] sm:py-12 sm:text-[14px]" style={{ color: TEXT_CHARCOAL }}>
                              No units match these filters. Try another type or turn off &ldquo;Available only&rdquo;.
                            </p>
                          ) : (
                            <motion.div
                              key={`${plotFilter}-${availableOnly}`}
                              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE }}
                              className="divide-y divide-[#EEF3F9] p-1 sm:p-1.5"
                            >
                              {shownUnits.map((row, i) => (
                                <UnitRow
                                  key={row.id || row.flatNo || i}
                                  row={row}
                                  onEnquire={() => openEnquire(project.name || '', `Flat ${row.flatNo}`)}
                                />
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {filteredPlots.length > 0 && (
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 sm:mt-4 sm:gap-3">
                          <p className="m-0 text-[11px] sm:text-[12px]" style={{ color: TEXT_CHARCOAL, opacity: 0.65 }}>
                            Showing {shownUnits.length} of {filteredPlots.length} units · Final price includes car park, registration &amp; GST
                          </p>
                          <div className="flex items-center gap-2">
                            {canCollapseUnits && (
                              <button
                                type="button"
                                onClick={() => setUnitsVisible(UNITS_PAGE_SIZE)}
                                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors hover:bg-[#F0F6FC] sm:px-3.5 sm:py-2 sm:text-[12.5px]"
                                style={{ color: TEXT_CHARCOAL }}
                              >
                                Show less
                                <ChevronUp className="h-3.5 w-3.5" strokeWidth={2.25} />
                              </button>
                            )}
                            {remainingUnits > 0 && (
                              <button
                                type="button"
                                onClick={() => setUnitsVisible((v) => v + UNITS_PAGE_SIZE)}
                                className="inline-flex items-center gap-1.5 rounded-full border border-[#D5E1ED] bg-white px-3.5 py-1.5 text-[12px] font-semibold transition-all hover:border-[#0F3A6B] hover:bg-[#0F3A6B] hover:text-white active:scale-[0.97] sm:px-4 sm:py-2 sm:text-[12.5px]"
                                style={{ color: DEEP_NAVY }}
                              >
                                Show {Math.min(UNITS_PAGE_SIZE, remainingUnits)} more
                                <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.25} />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="sm:overflow-x-auto">
                      <div className="sm:min-w-[620px]">
                        <div className="grid grid-cols-4 rounded-[12px] py-3.5 text-center sm:rounded-[14px] sm:py-5" style={{ backgroundColor: LIGHT_BLUE }}>
                          {PLOT_TABLE_HEADERS.map((header, i) => (
                            <PlotCell key={i} divider={i > 0}>
                              <p className="m-0 text-[9px] font-semibold uppercase leading-[1.6] tracking-[1px] sm:text-[11px] sm:tracking-[2.5px]" style={{ color: DEEP_NAVY }}>
                                {header[0]}{header[1] && (<><br />{header[1]}</>)}
                              </p>
                            </PlotCell>
                          ))}
                        </div>

                        {filteredPlots.length === 0 ? (
                          <p className="m-0 py-10 text-center text-[13px] sm:py-12 sm:text-[14px]" style={{ color: TEXT_CHARCOAL }}>
                            No plots in this category right now. Try another filter.
                          </p>
                        ) : (
                          <div className="relative">
                            <AnimatePresence initial={false} mode="popLayout">
                              {filteredPlots.map((row) => (
                                <motion.div key={row.id || row.sqft} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                                  transition={{ duration: 0.35, ease: EASE }}
                                  className="grid grid-cols-4 items-center border-b border-[#E8EFF7] py-3 text-center transition-colors hover:bg-[#F7FAFD] sm:py-[18px]">
                                  <PlotCell divider={false}><span className="text-[13.5px] tabular-nums sm:text-[17px]" style={{ color: TEXT_CHARCOAL }}>{row.sqft}</span></PlotCell>
                                  <PlotCell><span className="text-[13.5px] tabular-nums sm:text-[17px]" style={{ color: TEXT_CHARCOAL }}>{getPlotSqYd(row)}</span></PlotCell>
                                  <PlotCell><span className="text-[13.5px] font-semibold tabular-nums sm:text-[18px]" style={{ color: DEEP_NAVY }}>{formatPlotPrice(row)}</span></PlotCell>
                                  <PlotCell>
                                    <button
                                      type="button"
                                      onClick={() => openEnquire(project.name || '', 'Pricing')}
                                      aria-label="Enquire about this plot"
                                      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[11px] font-bold text-white shadow-[0_6px_16px_-8px_rgba(15,58,107,0.6)] transition-all duration-200 hover:shadow-[0_8px_20px_-8px_rgba(15,58,107,0.75)] active:scale-[0.96] sm:px-4 sm:py-2 sm:text-[13px]"
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
                  )}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>
      )}

      {/* ================= 360 Virtual Tour ================= */}
      {(tourThumbnail || panoramaSrc) && (
        <section ref={tourRef} id="tour" className="w-full bg-white px-4 py-10 sm:px-8 sm:py-16 md:px-10 lg:px-16 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-[0.75fr_1.6fr] lg:gap-14">
            <FadeUp>
              {project.tourEyebrow && <SectionEyebrow className="mb-3 sm:mb-5">{project.tourEyebrow}</SectionEyebrow>}
              <h2 className="mb-3 text-[24px] font-bold leading-[1.18] tracking-tight text-[#141414] sm:mb-5 sm:text-[30px] sm:leading-[1.15] md:text-[40px]">
                {project.tourHeading?.[0]}<br />
                {project.tourHeading?.[1]?.split('360°')[0]}
                {project.tourHeading?.[1]?.includes('360°') && (<span style={{ color: DEEP_NAVY }}>360°</span>)}
              </h2>

              <p className="mb-5 max-w-[380px] text-[13.5px] leading-[1.75] sm:mb-8 sm:text-[15px] sm:leading-[1.8]" style={{ color: TEXT_CHARCOAL }}>
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
                className="relative h-[220px] w-full overflow-hidden rounded-[18px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] sm:h-[340px] sm:rounded-[28px] md:h-[460px]">
                <img src={tourThumbnail} alt={`${project.name} 360 tour`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                {panoramaSrc && (
                  <button onClick={() => setTour360Open(true)} aria-label="Open panoramic view"
                    className="group absolute left-1/2 top-1/2 flex h-[76px] w-[76px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/50 bg-black/20 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white hover:bg-black/35 sm:h-[110px] sm:w-[110px] md:h-[128px] md:w-[128px]">
                    <span className="absolute -inset-[6px] rounded-full border border-white/10" />
                    <Play className="mb-1 h-4 w-4 fill-white sm:h-5 sm:w-5" strokeWidth={0} />
                    <span className="text-[9px] font-bold tracking-[2px] sm:text-[10px] sm:tracking-[2.5px]">360°</span>
                  </button>
                )}

                <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md sm:bottom-6 sm:left-6 sm:px-3.5 sm:py-2">
                  <Move3d className="h-3.5 w-3.5 text-white/80" strokeWidth={1.75} />
                  <span className="text-[10px] font-semibold uppercase tracking-[1.3px] text-white/85 sm:text-[11px] sm:tracking-[1.5px]">Panoramic View</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      <Panorama360Modal open={tour360Open} onClose={() => setTour360Open(false)} imageSrc={panoramaSrc} title={project.name} subtitle="Panoramic View" />

      <EnquireModal
        open={enquireOpen}
        onClose={() => setEnquireOpen(false)}
        presetType={enquirePreset}
        projectName={project.name || ''}
        context={enquireContext}
        brochureUrl={enquireBrochure}
      />

      {/* ================= Location ================= */}
      {project.locationLandmarks?.length > 0 && (
        <section ref={locationRef} id="location" className="w-full overflow-hidden bg-white px-4 py-10 sm:px-8 sm:py-16 md:px-10 lg:px-16 lg:py-24" style={{ fontFamily: FONT }}>
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-[0.85fr_1.6fr_0.9fr] lg:gap-12">
            <FadeUp>
              <h2 className="mb-3 text-[22px] font-bold leading-[1.2] tracking-tight text-[#141414] sm:mb-4 sm:text-[28px] sm:leading-[1.15] md:text-[38px]">
                {project.locationHeading?.[0]} {project.locationHeading?.[1]}
              </h2>

              <p className="mb-5 max-w-[320px] text-[13.5px] leading-[1.75] sm:mb-8 sm:text-[15px] sm:leading-[1.8]" style={{ color: TEXT_CHARCOAL }}>
                {project.locationDescription}
              </p>

              {project.locationMapUrl && (
                <AccentOutlineButton href={project.locationMapUrl} target="_blank" rel="noopener noreferrer" icon={Navigation2}>Get Directions</AccentOutlineButton>
              )}
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={locationInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="relative h-[260px] w-full overflow-hidden rounded-[18px] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] sm:h-[340px] sm:rounded-[28px] md:h-[400px]"
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

            <div className="flex flex-col gap-2 sm:gap-2.5">
              {project.locationLandmarks.map((item, i) => {
                const LandmarkIcon = getLandmarkIcon(item.label)
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: 16 }} animate={locationInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-black/[0.06] bg-white px-3 py-2.5 transition-all duration-300 hover:border-[#0F3A6B]/30 hover:shadow-[0_10px_24px_-14px_rgba(15,58,107,0.4)] sm:gap-4 sm:rounded-2xl sm:px-4 sm:py-3.5">
                    <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors sm:h-10 sm:w-10 sm:rounded-xl" style={{ backgroundColor: LIGHT_BLUE }}>
                        <LandmarkIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} style={{ color: DEEP_NAVY }} />
                      </div>
                      <p className="m-0 text-[13px] font-medium sm:text-sm" style={{ color: DEEP_NAVY }}>{item.label}</p>
                    </div>
                    <p className="m-0 shrink-0 text-[13px] font-semibold sm:text-sm" style={{ color: DEEP_NAVY }}>{item.distance}</p>
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
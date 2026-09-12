// src/components/project-banner.jsx
'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Figtree } from 'next/font/google'
import {
  Download,
  ChevronLeft,
  ChevronRight,
  MapPin,
  School,
  Hospital,
  TrainFront,
  Bus,
  Plane,
  Building2,
  BedDouble,
  Bath,
  Sofa,
  Play,
  Maximize2,
  Sparkles,
  Images,
  X,
  ArrowUpRight,
  ArrowRight,
  Maximize,
  Tag,
  Layers,
  FileText,
  Leaf,
  Users,
  Gem,
  Ruler,
  CalendarCheck,
  ShieldCheck,
  Waves,
  Landmark,
  Baby,
  Gamepad2,
  Zap,
  Heart,
  ShoppingBag,
  Trees,
  ArrowUpDown,
  Recycle,
  Car,
  Plus,
  Sun,
  LayoutGrid,
  ZoomIn,
  ZoomOut,
  Toilet,
  CookingPot,
  Fence,
  Navigation,
  Coins,
  Home,
  Phone,
  Navigation2,
} from 'lucide-react'

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const EASE = [0.22, 1, 0.36, 1]
const FONT = figtree.style.fontFamily

// ============ THEME TOKENS ============
const GOLD = '#a8823c' // primary accent
const GOLD_HOVER = '#8f6d31' // darker gold on hover
const GOLD_DARK = '#8a6a2f' // deep gold for text

const landmarkIconMap = {
  Schools: School,
  Hospitals: Hospital,
  'Railway Station': TrainFront,
  'Bus Stand': Bus,
  Airport: Plane,
}

function getLandmarkIcon(label) {
  if (landmarkIconMap[label]) return landmarkIconMap[label]
  const match = Object.entries(landmarkIconMap).find(([key]) => label?.includes(key))
  return match ? match[1] : MapPin
}

const highlightIconMap = {
  leaf: Leaf,
  family: Users,
  gem: Gem,
}

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
  type: Building2,
  units: Building2,
  floors: Layers,
  unitSize: Ruler,
  size: Maximize,
  price: Tag,
  rera: FileText,
  possession: CalendarCheck,
  approval: ShieldCheck,
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

// ---- Amenities icon map ----
const amenityIconMap = {
  'Swimming Pool': Waves,
  'Club House': Landmark,
  "Children's Play Area": Baby,
  'Landscaped Gardens': Leaf,
  'Walking Track': Users,
  'Indoor Games': Gamepad2,
  '24/7 Security': ShieldCheck,
  'EV Charging': Zap,
  Shops: ShoppingBag,
  'Security Cabin with CCTV': ShieldCheck,
  Park: Trees,
  'Avenue Trees': Trees,
  Elevator: ArrowUpDown,
  'Sewage Treatment Plant (STP)': Recycle,
  'Car Parking': Car,
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
  {
    title: 'Swimming Pool',
    eyebrow: 'Rejuvenate',
    description:
      'Take a refreshing break and unwind in our beautifully designed swimming pool, crafted for relaxation and recreation.',
    tags: ['Modern Design', 'Spacious Deck', 'Relax & Unwind'],
    image: '/amenities/amenities.jpeg',
  },
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

const amenityStatIconMap = {
  leaf: Leaf,
  users: Users,
  shield: ShieldCheck,
  heart: Heart,
}

// ---- Floor plan helpers ----
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
  return {
    config: plan?.config || config,
    facing: plan?.facing || rest.join(' · '),
  }
}

function parseArea(area = '') {
  const match = String(area).match(/[\d,.]+/)
  return match ? match[0] : area
}

function getPlanRooms(plan) {
  if (!plan) return []
  if (plan.rooms?.length) return plan.rooms
  if (plan.features?.length) return plan.features.map((f) => f.label)
  return []
}

// ---- Plot sizes & pricing helpers ----
const DEFAULT_PLOT_TABS = [
  { id: 'all', label: 'All Plots' },
  { id: 'residential', label: 'Residential' },
  { id: 'premium', label: 'Premium' },
  { id: 'corner', label: 'Corner Plots' },
]

const DEFAULT_PLOT_PRICING = [
  { sqft: 600, priceLakhs: 28.5, status: 'available', categories: ['residential'] },
  { sqft: 800, priceLakhs: 36.8, status: 'available', categories: ['residential'] },
  { sqft: 1000, priceLakhs: 45, status: 'available', categories: ['residential', 'corner'] },
  { sqft: 1200, priceLakhs: 52.5, status: 'limited', categories: ['residential'] },
  { sqft: 1500, priceLakhs: 63, status: 'available', categories: ['premium'] },
  { sqft: 1800, priceLakhs: 74.5, status: 'limited', categories: ['premium', 'corner'] },
  { sqft: 2400, priceLakhs: 96, status: 'soldout', categories: ['premium', 'corner'] },
  { sqft: 3000, priceLakhs: 122, status: 'available', categories: ['premium'] },
]

const PLOT_TABLE_HEADERS = [
  ['Plot Size', '(Sq.Ft.)'],
  ['Plot Size', '(Sq.Yd.)'],
  ['Price', '(₹ Lakhs)'],
  ['Status', ''],
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

const PLOT_STATUS = {
  available: { label: 'Available', dot: 'bg-[#3f8f55]', pill: 'bg-[#edf5ee] text-[#3f7f50]' },
  limited: { label: 'Limited', dot: 'bg-[#b07d2a]', pill: 'bg-[#f7efdf] text-[#9a7432]' },
  soldout: { label: 'Sold Out', dot: 'bg-[#d0534a]', pill: 'bg-[#fbeceb] text-[#c24a41]' },
}

function getPlotStatus(status = '') {
  const key = String(status).toLowerCase().replace(/[\s_-]/g, '')
  return PLOT_STATUS[key] || PLOT_STATUS.available
}

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
    <div className="relative flex items-center justify-center px-3">
      {divider && (
        <span className="absolute left-0 top-1/2 h-6 w-px -translate-y-1/2 bg-[#eee8dd]" />
      )}
      {children}
    </div>
  )
}

/* ==================================================================
   BUTTON SYSTEM
================================================================== */
function SolidButton({
  children,
  href,
  onClick,
  className = '',
  icon: Icon,
  type = 'button',
  fullWidth = false,
}) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href}
      onClick={onClick}
      type={!href ? type : undefined}
      style={{
        fontFamily: FONT,
        backgroundColor: GOLD,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = GOLD_HOVER
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = GOLD
      }}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-md px-6 py-3.5 text-[14px] font-bold text-white shadow-[0_4px_14px_-4px_rgba(168,130,60,0.4)] transition-all duration-200 hover:shadow-[0_6px_20px_-4px_rgba(168,130,60,0.55)] active:scale-[0.98] ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {Icon && <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.25} />}
      <span>{children}</span>
    </Comp>
  )
}

function OutlineButton({
  children,
  href,
  onClick,
  className = '',
  icon: Icon,
  type = 'button',
  fullWidth = false,
}) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href}
      onClick={onClick}
      type={!href ? type : undefined}
      style={{ fontFamily: FONT }}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-md border border-white/60 bg-transparent px-6 py-3.5 text-[14px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-[0.98] ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {Icon && <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.25} />}
      <span>{children}</span>
    </Comp>
  )
}

function AccentOutlineButton({
  children,
  href,
  onClick,
  className = '',
  icon: Icon,
  type = 'button',
  fullWidth = false,
}) {
  const Comp = href ? 'a' : 'button'
  return (
    <Comp
      href={href}
      onClick={onClick}
      type={!href ? type : undefined}
      style={{ fontFamily: FONT, color: GOLD, borderColor: `${GOLD}80` }}
      className={`group inline-flex items-center justify-center gap-2.5 rounded-md border bg-white px-6 py-3.5 text-[14px] font-bold transition-all duration-200 hover:border-current hover:bg-[#faf6ef] active:scale-[0.98] ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {Icon && <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={2.25} />}
      <span>{children}</span>
    </Comp>
  )
}

function IconCircleButton({ onClick, ariaLabel, variant = 'light', children, className = '' }) {
  const styles = {
    light:
      'bg-white text-[#141414] shadow-[0_8px_24px_-10px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.35)] hover:scale-[1.06]',
    dark: 'text-white shadow-[0_8px_24px_-10px_rgba(168,130,60,0.5)] hover:scale-[1.06]',
    gold: 'text-white shadow-[0_8px_24px_-10px_rgba(168,130,60,0.65)] hover:scale-[1.06]',
  }
  const bgStyle =
    variant === 'dark'
      ? { backgroundColor: GOLD }
      : variant === 'gold'
        ? { backgroundColor: GOLD }
        : {}
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={bgStyle}
      onMouseEnter={(e) => {
        if (variant === 'dark') e.currentTarget.style.backgroundColor = GOLD_HOVER
        if (variant === 'gold') e.currentTarget.style.backgroundColor = GOLD_HOVER
      }}
      onMouseLeave={(e) => {
        if (variant === 'dark') e.currentTarget.style.backgroundColor = GOLD
        if (variant === 'gold') e.currentTarget.style.backgroundColor = GOLD
      }}
      className={`flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 active:scale-95 ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

function SegmentedToggle({ options, value, onChange, className = '' }) {
  return (
    <div
      className={`relative flex items-center gap-1 rounded-md border border-black/[0.06] bg-white/90 p-1 shadow-[0_4px_14px_-6px_rgba(0,0,0,0.15)] backdrop-blur ${className}`}
    >
      {options.map((opt) => {
        const isActive = value === opt.value
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`relative rounded-[4px] px-4 py-2 text-[13px] font-bold transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-[#141414] hover:text-[#a8823c]'
            }`}
            style={{ fontFamily: FONT }}
          >
            {isActive && (
              <motion.span
                layoutId={`segment-${options.map((o) => o.value).join('-')}`}
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                className="absolute inset-0 rounded-[4px]"
                style={{ backgroundColor: GOLD }}
              />
            )}
            <span className="relative">{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

function RevealText({ as: Tag = 'p', text, className = '', delay = 0, amount = 0.4, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })
  return (
    <Tag ref={ref} className={className} style={{ fontFamily: FONT }}>
      <motion.span
        initial={{ opacity: 0, y: 22 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay, ease: EASE }}
        style={{ display: 'inline-block' }}
      >
        {text}
      </motion.span>
    </Tag>
  )
}

function FadeUp({ children, delay = 0, className = '', amount = 0.3, once = true, y = 24 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function Eyebrow({ icon: Icon, children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-[#a8823c]/25 bg-[#a8823c]/[0.06] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[2.5px] text-[#a8823c] ${className}`}
      style={{ fontFamily: FONT }}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}

export default function ProjectBanner({ project }) {
  // ---------------- Amenities ----------------
  const amenityTabs = project?.amenityTabs?.length
    ? project.amenityTabs
    : project?.amenities?.length
      ? project.amenities.map((a) => ({
          title: a.title,
          eyebrow: a.tagline || 'Explore',
          description:
            a.description ||
            `Discover the ${a.title.toLowerCase()} at ${project.name || 'this project'} — thoughtfully designed for everyday comfort.`,
          tags: a.tags || ['Thoughtful Design', 'Family Friendly', 'Everyday Comfort'],
          image: a.image,
          gallery: a.gallery || (a.image ? [a.image] : []),
        }))
      : DEFAULT_AMENITIES_TABS

  const amenityStats = project?.amenityStats?.length ? project.amenityStats : DEFAULT_AMENITY_STATS

  const [activeAmenity, setActiveAmenity] = useState(0)
  const [amenityImgIndex, setAmenityImgIndex] = useState(0)
  const amenitiesRef = useRef(null)

  const current = amenityTabs[activeAmenity]
  const amenityGalleryCount = current?.gallery?.length || 1

  const goAmenityPrev = () =>
    setAmenityImgIndex((i) => (i === 0 ? amenityGalleryCount - 1 : i - 1))
  const goAmenityNext = () =>
    setAmenityImgIndex((i) => (i === amenityGalleryCount - 1 ? 0 : i + 1))

  const goNextAmenityTab = () =>
    setActiveAmenity((i) => (i + 1) % amenityTabs.length)

  useEffect(() => {
    setAmenityImgIndex(0)
  }, [activeAmenity])

  // ---------------- Gallery ----------------
  const galleryItems = (project?.galleryImages || []).map((g) => g.image)
  const galleryTitles = (project?.galleryImages || []).map((g) => g.title || '')
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [paused, setPaused] = useState(false)
  const galleryRef = useRef(null)

  const galleryPrev = useCallback(() => {
    setDirection(-1)
    setGalleryIndex((i) => (i === 0 ? galleryItems.length - 1 : i - 1))
  }, [galleryItems.length])

  const galleryNext = useCallback(() => {
    setDirection(1)
    setGalleryIndex((i) => (i === galleryItems.length - 1 ? 0 : i + 1))
  }, [galleryItems.length])

  const goToGallery = (i) => {
    setDirection(i > galleryIndex ? 1 : -1)
    setGalleryIndex(i)
  }

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
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightboxOpen, galleryPrev, galleryNext])

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60, scale: 1.03 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60, scale: 0.99 }),
  }

  // ---------------- Floor Plans ----------------
  const floorPlanTabs = project?.floorPlanTabs || []
  const allFloorPlans = project?.floorPlans || []
  const [activeFloorTab, setActiveFloorTab] = useState(0)
  const [activePlanIndex, setActivePlanIndex] = useState(0)
  const [planView, setPlanView] = useState('3d')
  const [planZoom, setPlanZoom] = useState(false)
  const [likedPlans, setLikedPlans] = useState({})
  const pendingPlanIndex = useRef(null)
  const floorPlansRef = useRef(null)
  const floorPlansInView = useInView(floorPlansRef, { once: true, margin: '-100px' })

  const activeTabLabel = floorPlanTabs[activeFloorTab]
  const activePlans = allFloorPlans.filter((p) => planMatchesTab(p, activeTabLabel))
  const planCount = activePlans.length
  const selectedPlan = activePlans[activePlanIndex] || activePlans[0]
  const planKey = selectedPlan ? selectedPlan.id || selectedPlan.title : ''

  useEffect(() => {
    if (pendingPlanIndex.current !== null) {
      setActivePlanIndex(pendingPlanIndex.current)
      pendingPlanIndex.current = null
    } else {
      setActivePlanIndex(0)
    }
    setPlanZoom(false)
  }, [activeFloorTab])

  const floorPlanPrev = () => {
    if (!planCount) return
    setPlanZoom(false)
    setActivePlanIndex((i) => (i === 0 ? planCount - 1 : i - 1))
  }

  const floorPlanNext = () => {
    if (!planCount) return
    setPlanZoom(false)
    setActivePlanIndex((i) => (i === planCount - 1 ? 0 : i + 1))
  }

  const selectFloorPlan = (plan) => {
    const tabIdx = floorPlanTabs.findIndex((t) => planMatchesTab(plan, t))
    const targetTab = tabIdx >= 0 ? tabIdx : activeFloorTab
    const plansInTab = allFloorPlans.filter((p) => planMatchesTab(p, floorPlanTabs[targetTab]))
    const idx = Math.max(plansInTab.indexOf(plan), 0)
    setPlanZoom(false)
    if (targetTab !== activeFloorTab) {
      pendingPlanIndex.current = idx
      setActiveFloorTab(targetTab)
    } else {
      setActivePlanIndex(idx)
    }
  }

  const thumbnailPlans = allFloorPlans.slice(0, 4)

  // ---------------- Plot Sizes & Pricing ----------------
  const plotTabs = project?.plotPricingTabs?.length ? project.plotPricingTabs : DEFAULT_PLOT_TABS
  const plotRows = project?.plotPricing?.length ? project.plotPricing : DEFAULT_PLOT_PRICING
  const [plotFilter, setPlotFilter] = useState('all')
  const plotPricingRef = useRef(null)

  const filteredPlots =
    plotFilter === 'all'
      ? plotRows
      : plotRows.filter((p) => (p.categories || []).includes(plotFilter))

  const locationRef = useRef(null)
  const locationInView = useInView(locationRef, { once: true, margin: '-100px' })

  const tourRef = useRef(null)
  const tourInView = useInView(tourRef, { once: true, margin: '-100px' })

  if (!project) return null

  const highlights = project.highlights?.length ? project.highlights : defaultHighlights

  const quickFacts =
    project.quickFacts && project.quickFacts.length >= 6
      ? project.quickFacts
      : DEFAULT_QUICK_FACTS

  const factsCount = quickFacts.length
  const lastRowStart = factsCount - (factsCount % 2 === 0 ? 2 : 1)

  const { config: selectedConfig, facing: selectedFacing } = splitPlanTitle(selectedPlan)

  return (
    <div className={figtree.className} style={{ fontFamily: FONT }}>
      {/* ================= Banner ================= */}
      <section className="relative flex min-h-[750px] w-full bg-white mt-10" style={{ fontFamily: FONT }}>
        <div
          className="relative flex flex-[1.6] items-center justify-center overflow-hidden bg-[#333] bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
      </section>

      {/* ================= Overview ================= */}
      <section
        className="relative w-full overflow-hidden bg-white px-5 py-16 sm:px-8 md:px-10 lg:px-16 lg:py-24"
        style={{ fontFamily: FONT }}
      >
        <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-stretch gap-10 lg:grid-cols-[1fr_0.95fr_1.1fr] lg:gap-8">
          <div>
            <FadeUp>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-[3.5px] text-[#a8823c]">
                  {project.eyebrow || 'More than just a home'}
                </span>
                <span className="h-px w-14 bg-[#a8823c]/70" />
              </div>
            </FadeUp>

            <RevealText
              as="h2"
              className="mb-5 text-[36px] font-semibold leading-[1.12] tracking-tight text-[#1f2029] md:text-[46px] xl:text-[52px]"
              text={
                <>
                  {project.heading?.[0] || 'Designed for a'}
                  <br />
                  <span className="text-[#a8823c]">
                    {project.heading?.[1] || 'Better Way of Life'}
                  </span>
                </>
              }
              delay={0.1}
            />

            <FadeUp delay={0.2}>
              <p className="mb-8 max-w-[610px] text-[15px] leading-[1.85] text-[#5a5a5a] md:text-base">
                {project.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <AccentOutlineButton
                  href={project.brochureUrl || '#'}
                  icon={Download}
                >
                  Download Brochure
                </AccentOutlineButton>
                <AccentOutlineButton
                  href="tel:+919543633333"
                  icon={Phone}
                >
                  Call Us
                </AccentOutlineButton>
              </div>
            </FadeUp>

            <FadeUp delay={0.35}>
              <div className="flex flex-wrap items-center gap-y-4">
                {highlights.map((h, i) => {
                  const HIcon = highlightIconMap[h.icon] || Sparkles
                  const [first, ...rest] = (h.label || '').split(' ')
                  return (
                    <div key={i} className="flex items-center">
                      <div className="flex items-center gap-3 pr-5">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f6f0e4]">
                          <HIcon className="h-5 w-5 text-[#a8823c]" strokeWidth={1.5} />
                        </span>
                        <p className="m-0 text-[14px] leading-[1.45] text-[#2a2a2a]">
                          {first}
                          <br />
                          {rest.join(' ')}
                        </p>
                      </div>
                      {i < highlights.length - 1 && (
                        <span className="mr-5 h-12 w-px bg-[#e6dfd1]" />
                      )}
                    </div>
                  )
                })}
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.15} className="relative h-full">
            <img
              src={project.aboutImage}
              alt={project.name || 'Project'}
              className="h-[440px] w-full rounded-[16px] object-cover shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] md:h-[560px] lg:h-full"
            />
          </FadeUp>

          <FadeUp delay={0.25} className="h-full">
            <div className="relative flex h-full flex-col justify-center rounded-[22px] border border-[#ece6da] bg-white px-6 py-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.18)] md:px-7 md:py-10">
              <div className="pointer-events-none absolute left-1/2 top-8 bottom-8 hidden w-px -translate-x-1/2 bg-[#efe9de] sm:block" />

              <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                {quickFacts.map((fact, i) => {
                  const FactIcon = factIconMap[fact.icon] || getFactIcon(fact.label)
                  const isRight = i % 2 === 1
                  const isLastRow = i >= lastRowStart
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-5 border-b border-[#efe9de] py-7 ${
                        isLastRow ? 'sm:border-b-0' : ''
                      } ${i === factsCount - 1 ? 'border-b-0' : ''} ${
                        isRight ? 'sm:pl-6' : 'sm:pr-4'
                      }`}
                    >
                      <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-[#f6f0e4]">
                        <FactIcon className="h-7 w-7 text-[#a8823c]" strokeWidth={1.5} />
                      </span>
                      <div className="min-w-0">
                        <p className="m-0 mb-1.5 text-[14px] text-[#7a7a7a]">{fact.label}</p>
                        <p className="m-0 break-words text-[16px] font-semibold leading-snug text-[#1a1a1a]">
                          {fact.value}
                        </p>
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
        <section
          ref={amenitiesRef}
          className="relative w-full overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-16 lg:py-24"
          style={{ fontFamily: FONT }}
        >
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#a8823c]/[0.05] blur-[120px]" />

          <div className="relative mx-auto max-w-[1500px]">
            {/* Header row */}
            <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.9fr_0.2fr] lg:items-start lg:gap-6">
              <div>
                <FadeUp>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-[12px] font-medium uppercase tracking-[3.5px] text-[#a8823c]">
                      Life at its finest
                    </span>
                    <span className="h-px w-14 bg-[#a8823c]/70" />
                  </div>
                </FadeUp>

                <RevealText
                  as="h2"
                  text={
                    <>
                      World-Class
                      <br />
                      Amenities for a
                      <br />
                      <span className="text-[#a8823c]">Better Tomorrow</span>
                    </>
                  }
                  className="mb-5 text-[32px] font-semibold leading-[1.14] tracking-tight text-[#1f2029] md:text-[42px]"
                  delay={0.1}
                />

                <FadeUp delay={0.2}>
                  <p className="mb-7 max-w-[380px] text-[14px] leading-[1.8] text-[#6b6b6b] sm:text-[15px]">
                    {project.amenitiesDescription ||
                      'Thoughtfully curated spaces and modern conveniences that bring comfort, community and a healthier lifestyle together at Gurudev.'}
                  </p>
                </FadeUp>

                <FadeUp delay={0.3}>
                  <SolidButton icon={ArrowRight}>Explore All Amenities</SolidButton>
                </FadeUp>
              </div>

              {/* Tabs */}
              <FadeUp delay={0.2}>
                <div className="grid grid-cols-4 gap-x-4 gap-y-8 sm:grid-cols-8">
                  {amenityTabs.map((tab, i) => {
                    const TabIcon = getAmenityIcon(tab.title)
                    const isActive = i === activeAmenity
                    return (
                      <button
                        key={tab.title + i}
                        onClick={() => setActiveAmenity(i)}
                        className="group flex flex-col items-center gap-3 text-center"
                      >
                        <span
                          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                            isActive
                              ? 'text-white shadow-[0_10px_28px_-12px_rgba(168,130,60,0.75)]'
                              : 'bg-[#efe9de] group-hover:bg-[#e6dcc7]'
                          }`}
                          style={isActive ? { backgroundColor: GOLD } : {}}
                        >
                          <TabIcon
                            className={`h-6 w-6 transition-colors duration-300 ${
                              isActive ? 'text-white' : 'text-[#8a7a5c]'
                            }`}
                            strokeWidth={1.5}
                          />
                        </span>
                        <span
                          className={`text-[13px] font-semibold leading-snug ${
                            isActive ? 'text-[#141414]' : 'text-[#4b4b4b]'
                          }`}
                        >
                          {tab.title}
                        </span>
                        <span
                          className={`h-[2px] w-6 rounded-full transition-colors duration-300 ${
                            isActive ? 'bg-[#a8823c]' : 'bg-transparent'
                          }`}
                        />
                      </button>
                    )
                  })}
                </div>
              </FadeUp>

              <FadeUp delay={0.25} className="hidden justify-self-end lg:flex">
                <div className="flex items-center gap-3 border-l border-[#a8823c]/30 pl-4">
                  <span className="text-[11px] font-semibold uppercase leading-[1.5] tracking-[2px] text-[#a8823c]">
                    More
                    <br />
                    Than
                    <br />
                    Amenities
                  </span>
                </div>
              </FadeUp>
            </div>

            {/* Featured tile row — content left, image right */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.7fr]">
              {/* Detail card (left) */}
              <FadeUp delay={0.2}>
                <div className="flex h-full flex-col rounded-[24px] bg-[#f4f0e6] p-7">
                  <Eyebrow className="mb-4 self-start !bg-transparent !border-0 !px-0 !py-0">
                    {current?.eyebrow}
                  </Eyebrow>
                  <h3 className="mb-3 text-[26px] font-semibold leading-tight text-[#1f2029] md:text-[30px]">
                    {current?.title}
                  </h3>
                  <span className="mb-4 h-[2px] w-10 bg-[#a8823c]" />
                  <p className="mb-7 text-[14px] leading-[1.75] text-[#6b6b6b]">
                    {current?.description}
                  </p>

                  <div className="mt-auto grid grid-cols-3 gap-3">
                    {(current?.tags || []).map((tag, i) => {
                      const [l1, ...rest] = tag.split(' ')
                      return (
                        <div key={i} className="flex flex-col items-start gap-2.5">
                          <Sparkles className="h-5 w-5 text-[#a8823c]" strokeWidth={1.5} />
                          <p className="m-0 text-[13px] font-semibold leading-snug text-[#1a1a1a]">
                            {l1}
                            <br />
                            {rest.join(' ')}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </FadeUp>

              {/* Main image (right) — sharp corners, arrow navigation inside */}
              <FadeUp delay={0.15}>
                <div className="relative h-[340px] w-full overflow-hidden bg-[#1a1a1a] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] sm:h-[420px] md:h-[480px]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`${activeAmenity}-${amenityImgIndex}`}
                      src={current?.gallery?.[amenityImgIndex] || current?.image}
                      alt={current?.title}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <span className="absolute bottom-5 left-5 rounded-full bg-black/70 px-3 py-1.5 text-[12px] font-semibold tabular-nums text-white backdrop-blur">
                    {String(amenityImgIndex + 1).padStart(2, '0')} / {String(amenityGalleryCount).padStart(2, '0')}
                  </span>

                  <span className="absolute bottom-5 right-5 rounded-full bg-black/70 px-4 py-1.5 text-[13px] font-semibold text-white backdrop-blur">
                    {current?.title}
                  </span>

                  {/* Arrow — next amenity, centered vertically on the right */}
                  <IconCircleButton
                    onClick={goNextAmenityTab}
                    ariaLabel="Next amenity"
                    variant="light"
                    className="!absolute !right-5 !top-1/2 !-translate-y-1/2 sm:!right-7"
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={2} />
                  </IconCircleButton>

                  {/* Inline gallery prev/next when multiple images */}
                  {amenityGalleryCount > 1 && (
                    <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2">
                      <IconCircleButton onClick={goAmenityPrev} ariaLabel="Previous" variant="light" className="!h-9 !w-9">
                        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                      </IconCircleButton>
                      <IconCircleButton onClick={goAmenityNext} ariaLabel="Next" variant="dark" className="!h-9 !w-9">
                        <ChevronRight className="h-4 w-4" strokeWidth={2} />
                      </IconCircleButton>
                    </div>
                  )}
                </div>
              </FadeUp>
            </div>

            {/* Bottom stats strip */}
            <div className="mt-12 flex flex-col gap-8 border-t border-[#ece6da] pt-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
                {amenityStats.map((stat, i) => {
                  const StatIcon = amenityStatIconMap[stat.icon] || Sparkles
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <StatIcon className="h-6 w-6 shrink-0 text-[#a8823c]" strokeWidth={1.5} />
                      <p className="m-0 text-[14px] leading-snug text-[#1a1a1a]">
                        <span className="font-bold">{stat.value}</span>
                        <br />
                        <span className="text-[#6b6b6b]">{stat.label}</span>
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#a8823c]/50" />
                <p className="m-0 text-[12px] font-semibold uppercase leading-snug tracking-[2px] text-[#a8823c]">
                  Amenities Today
                  <br />A Brighter Tomorrow
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= Gallery ================= */}
      {galleryItems.length > 0 && (
        <section
          ref={galleryRef}
          className="relative w-full overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 md:py-24 lg:px-16 lg:py-28"
          style={{ fontFamily: FONT }}
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between md:mb-14">
              <div>
                <FadeUp>
                  <Eyebrow icon={Images} className="mb-5">
                    Visual Story
                  </Eyebrow>
                </FadeUp>
                <RevealText
                  as="h2"
                  text={project.galleryHeading?.join(' ') || 'Gallery'}
                  className="text-[32px] font-bold leading-[1.08] tracking-tight text-[#141414] sm:text-[42px] md:text-[54px]"
                  delay={0.1}
                />
              </div>

              <FadeUp delay={0.2} className="flex items-center gap-4 self-start sm:self-auto">
                <span className="text-[13px] font-semibold tabular-nums text-[#9a9a9a]">
                  <span className="text-[#141414]">
                    {String(galleryIndex + 1).padStart(2, '0')}
                  </span>
                  {' / '}
                  {String(galleryItems.length).padStart(2, '0')}
                </span>
                {galleryItems.length > 1 && (
                  <div className="flex items-center gap-2">
                    <IconCircleButton onClick={galleryPrev} ariaLabel="Previous image" variant="light">
                      <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2} />
                    </IconCircleButton>
                    <IconCircleButton onClick={galleryNext} ariaLabel="Next image" variant="dark">
                      <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2} />
                    </IconCircleButton>
                  </div>
                )}
              </FadeUp>
            </div>

            <FadeUp delay={0.15}>
              <div
                className="relative h-[300px] w-full overflow-hidden rounded-[24px] bg-[#1a1a1a] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)] sm:h-[440px] sm:rounded-[32px] md:h-[560px] lg:h-[680px]"
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
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -80) galleryNext()
                      else if (info.offset.x > 80) galleryPrev()
                    }}
                    onClick={() => setLightboxOpen(true)}
                    className="absolute inset-0 h-full w-full cursor-zoom-in select-none object-cover"
                    draggable={false}
                  />
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/20" />

                <IconCircleButton
                  onClick={() => setLightboxOpen(true)}
                  ariaLabel="Open fullscreen"
                  variant="light"
                  className="!absolute !right-4 !top-4 !bg-white/10 !text-white backdrop-blur-md hover:!bg-white/25 sm:!right-6 sm:!top-6"
                >
                  <Maximize2 className="h-4 w-4" />
                </IconCircleButton>

                <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`caption-${galleryIndex}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      <p className="m-0 mb-1 text-[11px] font-semibold uppercase tracking-[3px] text-[#d9b877]">
                        {String(galleryIndex + 1).padStart(2, '0')}
                      </p>
                      {galleryTitles[galleryIndex] && (
                        <p className="m-0 text-xl font-semibold leading-tight text-white sm:text-3xl">
                          {galleryTitles[galleryIndex]}
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {galleryItems.length > 1 && (
                    <div className="flex items-center gap-1.5">
                      {galleryItems.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => goToGallery(i)}
                          aria-label={`Go to image ${i + 1}`}
                          className={`relative h-1 overflow-hidden rounded-full transition-all duration-500 ${
                            i === galleryIndex ? 'w-12 bg-white/30' : 'w-4 bg-white/30 hover:bg-white/60'
                          }`}
                        >
                          {i === galleryIndex && (
                            <motion.span
                              key={`progress-${galleryIndex}-${paused}`}
                              initial={{ width: paused ? '100%' : '0%' }}
                              animate={{ width: '100%' }}
                              transition={{ duration: paused ? 0 : 5, ease: 'linear' }}
                              className="absolute inset-y-0 left-0 rounded-full bg-white"
                            />
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
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 backdrop-blur-sm"
                onClick={() => setLightboxOpen(false)}
              >
                <div className="absolute left-5 top-6 text-[13px] font-semibold tabular-nums text-white/60 sm:left-8 sm:top-8">
                  <span className="text-white">{String(galleryIndex + 1).padStart(2, '0')}</span>
                  {' / '}
                  {String(galleryItems.length).padStart(2, '0')}
                </div>

                <IconCircleButton
                  onClick={() => setLightboxOpen(false)}
                  ariaLabel="Close"
                  variant="light"
                  className="!absolute !right-5 !top-5 !bg-white/10 !text-white hover:!bg-white/20 sm:!right-8 sm:!top-8"
                >
                  <X className="h-5 w-5" />
                </IconCircleButton>

                {galleryItems.length > 1 && (
                  <IconCircleButton
                    onClick={(e) => {
                      e?.stopPropagation?.()
                      galleryPrev()
                    }}
                    ariaLabel="Previous"
                    variant="light"
                    className="!absolute !left-3 !top-1/2 !-translate-y-1/2 !bg-white/10 !text-white hover:!bg-white/20 sm:!left-8"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </IconCircleButton>
                )}

                <AnimatePresence mode="wait">
                  <motion.figure
                    key={galleryIndex}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    onClick={(e) => e.stopPropagation()}
                    className="m-0 flex flex-col items-center"
                  >
                    <img
                      src={galleryItems[galleryIndex]}
                      alt={galleryTitles[galleryIndex] || ''}
                      className="max-h-[80vh] max-w-full rounded-xl object-contain"
                    />
                    {galleryTitles[galleryIndex] && (
                      <figcaption className="mt-5 text-sm font-medium text-white/80">
                        {galleryTitles[galleryIndex]}
                      </figcaption>
                    )}
                  </motion.figure>
                </AnimatePresence>

                {galleryItems.length > 1 && (
                  <IconCircleButton
                    onClick={(e) => {
                      e?.stopPropagation?.()
                      galleryNext()
                    }}
                    ariaLabel="Next"
                    variant="light"
                    className="!absolute !right-3 !top-1/2 !-translate-y-1/2 !bg-white/10 !text-white hover:!bg-white/20 sm:!right-8"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </IconCircleButton>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* ================= Floor Plans ================= */}
      {floorPlanTabs.length > 0 && (
        <section
          ref={floorPlansRef}
          className="relative w-full overflow-hidden bg-white px-5 py-16 sm:px-8 md:px-10 lg:px-14 lg:py-24"
          style={{ fontFamily: FONT }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,130,60,0.05),transparent_60%)]" />

          <div className="relative mx-auto grid max-w-[1560px] grid-cols-1 gap-10 lg:grid-cols-[0.95fr_2.8fr] lg:gap-12">
            {/* ---------- Left column ---------- */}
            <FadeUp className="relative flex flex-col">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-[12px] font-medium uppercase tracking-[3.5px] text-[#a8823c]">
                  {project.floorPlansEyebrow || 'Floor Plans'}
                </span>
                <span className="h-px w-12 bg-[#a8823c]/70" />
              </div>

              <h2 className="mb-6 text-[40px] font-semibold leading-[1.12] tracking-tight text-[#1f2029] md:text-[52px] xl:text-[56px]">
                {project.floorPlansHeading?.[0] || 'Homes Tailored'}
                <br />
                to{' '}
                <span className="text-[#a8823c]">
                  {project.floorPlansHeading?.[1] || 'Your Needs'}
                </span>
              </h2>

              <p className="mb-9 max-w-[400px] text-[16px] leading-[1.7] text-[#5a5a5a]">
                {project.floorPlansDescription ||
                  'Thoughtfully designed 1 & 2 BHK homes with efficient layouts, abundant natural light and optimal space utilisation — available as both East and West facing units.'}
              </p>

              <div className="mb-10 flex items-stretch">
                {FLOOR_PLAN_HIGHLIGHTS.map((item, i) => {
                  const Icon = item.icon
                  return (
                    <div key={i} className="flex items-stretch">
                      <div className={`flex flex-col items-center gap-3 text-center ${i === 0 ? 'pr-3' : 'px-3'}`}>
                        <span className="flex h-[66px] w-[66px] items-center justify-center rounded-full bg-[#f3ede2]">
                          <Icon className="h-7 w-7 text-[#a8823c]" strokeWidth={1.3} />
                        </span>
                        <p className="m-0 text-[14px] leading-[1.6] text-[#3a3a3a]">
                          {item.label[0]}
                          <br />
                          {item.label[1]}
                        </p>
                      </div>
                      {i < FLOOR_PLAN_HIGHLIGHTS.length - 1 && (
                        <span className="mx-2 w-px bg-[#e6dfd1]" />
                      )}
                    </div>
                  )
                })}
              </div>

              <SolidButton
                href={project.floorPlansCtaHref || '#'}
                icon={ArrowUpRight}
                className="mb-12 w-fit"
              >
                {project.floorPlansCtaLabel || 'View All Plans'}
              </SolidButton>

              <div className="mb-12 ml-10 border-l border-[#a8823c]/50 pl-5 sm:ml-16">
                <p className="m-0 text-[22px] italic leading-[1.4] text-[#8a6a2f]">
                  Well Planned
                  <br />
                  for a Brighter Tomorrow
                </p>
                <span className="mt-3 block h-px w-10 bg-[#a8823c]/60" />
              </div>

              <div className="ml-8 mt-auto flex items-center gap-6 text-[12px] font-medium uppercase tracking-[3px] text-[#a8823c]/80 sm:ml-14">
                <span>Live</span>
                <span className="text-[#a8823c]/50">|</span>
                <span>Invest</span>
                <span className="text-[#a8823c]/50">|</span>
                <span>Grow</span>
              </div>
            </FadeUp>

            {/* ---------- Right column ---------- */}
            <div className="min-w-0">
              {/* Tabs + counter */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-1 rounded-md bg-[#f1eee8] p-1">
                  {floorPlanTabs.map((label, i) => (
                    <button
                      key={label}
                      onClick={() => setActiveFloorTab(i)}
                      className={`relative whitespace-nowrap rounded-[4px] px-8 py-3 text-[15px] font-medium transition-colors ${
                        activeFloorTab === i ? 'text-white' : 'text-[#5a5a5a] hover:text-[#141414]'
                      }`}
                    >
                      {activeFloorTab === i && (
                        <motion.span
                          layoutId="floorPlanTabPill"
                          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                          className="absolute inset-0 rounded-[4px] shadow-[0_10px_24px_-12px_rgba(168,130,60,0.6)]"
                          style={{ backgroundColor: GOLD }}
                        />
                      )}
                      <span className="relative">{label}</span>
                    </button>
                  ))}
                </div>

                {planCount > 0 && (
                  <div className="flex items-center gap-4">
                    <IconCircleButton onClick={floorPlanPrev} ariaLabel="Previous plan" variant="light">
                      <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
                    </IconCircleButton>
                    <span className="text-[15px] tabular-nums text-[#4a4a4a]">
                      {String(activePlanIndex + 1).padStart(2, '0')} / {String(planCount).padStart(2, '0')}
                    </span>
                    <IconCircleButton onClick={floorPlanNext} ariaLabel="Next plan" variant="dark">
                      <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
                    </IconCircleButton>
                  </div>
                )}
              </div>

              {planCount === 0 ? (
                <div className="rounded-3xl border border-dashed border-black/10 bg-white p-10 text-center">
                  <p className="m-0 text-sm text-[#6b7280]">
                    No floor plans available for <strong>{activeTabLabel}</strong> yet.
                  </p>
                </div>
              ) : (
                <>
                  {/* Viewer + details */}
                  <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.75fr_1fr]">
                    {/* Viewer */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={floorPlansInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="relative h-[420px] overflow-hidden rounded-[22px] border border-black/[0.04] bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.2)] sm:h-[500px]"
                    >
                      <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-16 pb-24 pt-8 sm:px-24">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${planKey}-${planView}`}
                            src={
                              planView === '2d'
                                ? selectedPlan?.image2d || selectedPlan?.image
                                : selectedPlan?.image3d || selectedPlan?.image
                            }
                            alt={selectedPlan?.title}
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: planZoom ? 1.45 : 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="max-h-full max-w-full select-none object-contain"
                            draggable={false}
                          />
                        </AnimatePresence>
                      </div>

                      {/* Compass */}
                      <span className="absolute right-8 top-9 flex h-10 w-10 items-center justify-center rounded-full border border-[#141414]/70 bg-white shadow-[0_6px_16px_-8px_rgba(0,0,0,0.3)]">
                        <span className="absolute -top-3.5 bg-white px-0.5 text-[10px] font-bold leading-none text-[#141414]">
                          N
                        </span>
                        <Navigation className="h-4 w-4 -rotate-45 fill-[#141414] text-[#141414]" strokeWidth={1.5} />
                      </span>

                      {/* Arrows */}
                      <IconCircleButton
                        onClick={floorPlanPrev}
                        ariaLabel="Previous"
                        variant="light"
                        className="!absolute !left-5 !top-1/2 !-translate-y-1/2 sm:!left-7"
                      >
                        <ChevronLeft className="h-5 w-5" strokeWidth={1.75} />
                      </IconCircleButton>
                      <IconCircleButton
                        onClick={floorPlanNext}
                        ariaLabel="Next"
                        variant="light"
                        className="!absolute !right-5 !top-1/2 !-translate-y-1/2 sm:!right-7"
                      >
                        <ChevronRight className="h-5 w-5" strokeWidth={1.75} />
                      </IconCircleButton>

                      {/* Bottom controls */}
                      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-3">
                        <SegmentedToggle
                          options={[
                            { value: '2d', label: '2D View' },
                            { value: '3d', label: '3D View' },
                          ]}
                          value={planView}
                          onChange={setPlanView}
                        />

                        <div className="hidden flex-col items-center gap-1 sm:flex">
                          <span className="h-0 w-0 border-x-[8px] border-b-[12px] border-x-transparent border-b-[#a8823c]" />
                          <span className="text-[13px] text-[#4a4a4a]">Entry</span>
                        </div>

                        <button
                          onClick={() => setPlanZoom((z) => !z)}
                          className="group flex items-center gap-2 rounded-md border border-black/[0.06] bg-white px-4 py-2.5 text-[13px] font-bold text-[#141414] shadow-[0_6px_18px_-8px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-[#141414] hover:text-white active:scale-[0.97]"
                        >
                          {planZoom ? (
                            <ZoomOut className="h-4 w-4" strokeWidth={1.75} />
                          ) : (
                            <ZoomIn className="h-4 w-4" strokeWidth={1.75} />
                          )}
                          {planZoom ? 'Zoom Out' : 'Zoom In'}
                        </button>
                      </div>
                    </motion.div>

                    {/* Details card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={floorPlansInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
                      className="flex flex-col rounded-[22px] bg-[#f5f0e7] px-7 py-8 sm:px-8"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={planKey}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.4, ease: EASE }}
                          className="flex flex-1 flex-col"
                        >
                          {selectedConfig && (
                            <span className="mb-5 w-fit rounded-full bg-[#ebe0cb] px-4 py-1.5 text-[14px] font-medium text-[#8a6a2f]">
                              {selectedConfig}
                            </span>
                          )}

                          <div className="flex items-end justify-between gap-4 border-b border-[#e2d9c8] pb-5">
                            <h3 className="m-0 text-[24px] font-semibold leading-tight text-[#1f2029] sm:text-[26px]">
                              {selectedFacing || activeTabLabel}
                            </h3>
                            {selectedPlan?.area && (
                              <div className="flex items-stretch gap-5">
                                <span className="w-px bg-[#d9ceb9]" />
                                <div className="text-right">
                                  <p className="m-0 text-[40px] font-semibold leading-none text-[#8a6a2f]">
                                    {parseArea(selectedPlan.area)}
                                  </p>
                                  <p className="m-0 mt-1 text-[13px] text-[#4a4a4a]">Sq.Ft.</p>
                                </div>
                              </div>
                            )}
                          </div>

                          <ul className="m-0 flex list-none flex-col gap-5 border-b border-[#e2d9c8] px-2 py-7">
                            {getPlanRooms(selectedPlan).map((room, i) => {
                              const RoomIcon = getRoomIcon(room)
                              return (
                                <li key={i} className="flex items-center gap-10 sm:gap-12">
                                  <RoomIcon className="h-6 w-6 shrink-0 text-[#a8823c]" strokeWidth={1.3} />
                                  <span className="text-[16px] text-[#3a3a3a]">{room}</span>
                                </li>
                              )
                            })}
                          </ul>

                          <div className="mt-auto flex items-center gap-4 pt-6">
                            <SolidButton
                              href={selectedPlan?.pdf || selectedPlan?.href || selectedPlan?.image}
                              icon={Download}
                              fullWidth
                            >
                              Download Floor Plan
                            </SolidButton>
                            <button
                              onClick={() =>
                                setLikedPlans((s) => ({ ...s, [planKey]: !s[planKey] }))
                              }
                              aria-label="Save plan"
                              className="flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-md border transition-all duration-300 hover:scale-[1.05] active:scale-95"
                              style={{ borderColor: `${GOLD}80`, color: GOLD }}
                            >
                              <Heart
                                className={`h-5 w-5 transition-colors ${
                                  likedPlans[planKey] ? 'fill-current' : ''
                                }`}
                                strokeWidth={1.75}
                              />
                            </button>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Thumbnails */}
                  <div className="mt-6 grid grid-cols-2 items-stretch gap-3 sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_1fr_0.9fr_0.95fr]">
                    {thumbnailPlans.map((plan, i) => {
                      const isActive = plan === selectedPlan
                      const { config } = splitPlanTitle(plan)
                      return (
                        <button
                          key={plan.id || plan.title || i}
                          onClick={() => selectFloorPlan(plan)}
                          className={`flex flex-col rounded-[14px] border-2 bg-white p-3 text-left transition-all duration-300 ${
                            isActive
                              ? 'border-[#a8823c] shadow-[0_10px_24px_-14px_rgba(168,130,60,0.5)]'
                              : 'border-transparent hover:border-[#f0e8d8]'
                          }`}
                        >
                          <img
                            src={plan.thumbnail || plan.image}
                            alt={plan.title}
                            loading="lazy"
                            className="mb-3 h-[100px] w-full object-contain"
                          />
                          <p className="m-0 text-[13px] font-medium text-[#1a1a1a]">{config}</p>
                          {plan.area && (
                            <p className="m-0 mt-0.5 text-[12px] text-[#8a6a2f]">{plan.area}</p>
                          )}
                        </button>
                      )
                    })}

                    
                      <a href={project.floorPlansCtaHref || '#'}
                      className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-[14px] border border-dashed border-[#ddd5c6] p-3 text-center no-underline transition-colors hover:bg-white"
                    >
                      <span
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white"
                        style={{ backgroundColor: GOLD }}
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                      <span className="text-[15px] leading-snug text-[#3a3a3a]">
                        View
                        <br />
                        All Plans
                      </span>
                    </a>

                    <div className="hidden items-center gap-8 pl-4 lg:flex">
                      <span className="h-[120px] w-px bg-[#a8823c]/50" />
                      <div>
                        <p className="m-0 text-[12px] font-semibold uppercase leading-[1.85] tracking-[3px] text-[#a8823c]">
                          Thoughtful
                          <br />
                          Spaces
                          <br />
                          Stronger
                          <br />
                          Tomorrows
                        </p>
                        <span className="mt-2 block h-px w-10 bg-[#a8823c]/60" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ================= Plot Sizes & Pricing ================= */}
      {plotRows.length > 0 && (
        <section
          ref={plotPricingRef}
          className="relative w-full overflow-hidden bg-white px-5 py-16 sm:px-8 md:px-10 lg:px-14 lg:py-24"
          style={{ fontFamily: FONT }}
        >
          <div className="relative mx-auto max-w-[1560px]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.35fr] xl:grid-cols-[0.95fr_1.3fr] xl:gap-8">
              {/* ---------- Left column ---------- */}
              <div className="flex flex-col">
                <FadeUp>
                  <div className="mb-6 flex items-center gap-4">
                    <span className="text-[12px] font-medium uppercase tracking-[3.5px] text-[#a8823c]">
                      {project.plotPricingEyebrow || 'Invest with confidence'}
                    </span>
                    <span className="h-px w-16 bg-[#a8823c]/70" />
                  </div>
                </FadeUp>

                <RevealText
                  as="h2"
                  className="mb-5 text-[44px] font-semibold leading-[1.04] tracking-tight text-[#1a1a1a] md:text-[58px] xl:text-[64px]"
                  text={
                    <>
                      {project.plotPricingHeading?.[0] || 'Plot Sizes'}{' '}
                      <span className="text-[#a8823c]">&amp;</span>
                      <br />
                      {project.plotPricingHeading?.[1] || 'Pricing'}
                    </>
                  }
                  delay={0.1}
                />

                <FadeUp delay={0.2}>
                  <p className="mb-10 max-w-[430px] text-[16px] leading-[1.55] text-[#2f2f2f]">
                    {project.plotPricingDescription ||
                      'Choose the perfect plot that fits your dreams. Transparent pricing. Timeless value.'}
                  </p>
                </FadeUp>

                <FadeUp delay={0.25}>
                  <div className="mb-10 grid grid-cols-3">
                    {PLOT_FEATURES.map((feature, i) => {
                      const FeatureIcon = feature.icon
                      return (
                        <div
                          key={feature.title}
                          className={`flex flex-col items-center px-2 text-center ${
                            i > 0 ? 'border-l border-[#ece5d8]' : ''
                          }`}
                        >
                          <span className="mb-4 flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#f5efe4]">
                            <FeatureIcon className="h-7 w-7 text-[#a8823c]" strokeWidth={1.3} />
                          </span>
                          <p className="m-0 mb-2 text-[15px] font-semibold leading-snug text-[#1a1a1a]">
                            {feature.title}
                          </p>
                          <p className="m-0 text-[13px] leading-[1.45] text-[#5a5a5a]">
                            {feature.text[0]}
                            <br />
                            {feature.text[1]}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                </FadeUp>

                <FadeUp delay={0.3} className="mt-auto">
                  <div className="relative h-[240px] overflow-hidden rounded-[22px] bg-[#1f2a1c] shadow-[0_24px_50px_-28px_rgba(0,0,0,0.45)]">
                    {(project.plotPricingCtaImage || project.aboutImage) && (
                      <img
                        src={project.plotPricingCtaImage || project.aboutImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />

                    <div className="relative flex h-full flex-col justify-center p-7 sm:p-8">
                      <h3 className="m-0 mb-3 text-[26px] font-semibold leading-[1.15] text-white sm:text-[30px]">
                        A Brighter
                        <br />
                        Tomorrow Awaits
                      </h3>
                      <p className="m-0 mb-6 max-w-[250px] text-[14px] leading-[1.5] text-white/90">
                        Secure your slice of a better lifestyle today.
                      </p>
                      <OutlineButton
                        href={project.enquireHref || '#enquire'}
                        icon={ArrowRight}
                        className="w-fit"
                      >
                        Enquire Now
                      </OutlineButton>
                    </div>
                  </div>
                </FadeUp>
              </div>

              {/* ---------- Pricing table ---------- */}
              <FadeUp delay={0.15} className="min-w-0">
                <div className="h-full rounded-[26px] border border-[#efe9de] bg-white p-4 shadow-[0_30px_70px_-35px_rgba(0,0,0,0.22)] sm:p-6">
                  {/* Filter tabs */}
                  <div className="mb-5 flex items-center overflow-x-auto pb-1">
                    {plotTabs.map((tab, i) => {
                      const isActive = plotFilter === tab.id
                      const prevActive = i > 0 && plotTabs[i - 1].id === plotFilter
                      return (
                        <div key={tab.id} className="flex shrink-0 items-center">
                          {i > 0 && (
                            <span
                              className={`h-4 w-px ${
                                isActive || prevActive ? 'bg-transparent' : 'bg-[#e3dccf]'
                              }`}
                            />
                          )}
                          <button
                            onClick={() => setPlotFilter(tab.id)}
                            className={`relative whitespace-nowrap rounded-md px-6 py-3 text-[14px] font-semibold transition-colors ${
                              isActive ? 'text-white' : 'text-[#1a1a1a] hover:text-[#a8823c]'
                            }`}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="plotTabPill"
                                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                                className="absolute inset-0 rounded-md shadow-[0_10px_20px_-10px_rgba(168,130,60,0.8)]"
                                style={{ backgroundColor: GOLD }}
                              />
                            )}
                            <span className="relative">{tab.label}</span>
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <div className="min-w-[540px]">
                      <div className="grid grid-cols-4 rounded-[14px] bg-[#f5f2ec] py-5 text-center">
                        {PLOT_TABLE_HEADERS.map((header, i) => (
                          <PlotCell key={i} divider={i > 0}>
                            <p className="m-0 text-[11px] font-semibold uppercase leading-[1.6] tracking-[2.5px] text-[#2a2a2a]">
                              {header[0]}
                              {header[1] && (
                                <>
                                  <br />
                                  {header[1]}
                                </>
                              )}
                            </p>
                          </PlotCell>
                        ))}
                      </div>

                      {filteredPlots.length === 0 ? (
                        <p className="m-0 py-12 text-center text-[14px] text-[#6b6b6b]">
                          No plots in this category right now. Try another filter.
                        </p>
                      ) : (
                        <div className="relative">
                          <AnimatePresence initial={false} mode="popLayout">
                            {filteredPlots.map((plot) => {
                              const status = getPlotStatus(plot.status)
                              return (
                                <motion.div
                                  key={plot.id || plot.sqft}
                                  layout
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -6 }}
                                  transition={{ duration: 0.35, ease: EASE }}
                                  className="grid grid-cols-4 items-center border-b border-[#f0ebe2] py-[18px] text-center transition-colors hover:bg-[#fbf9f5]"
                                >
                                  <PlotCell divider={false}>
                                    <span className="text-[17px] tabular-nums text-[#2a2a2a]">
                                      {plot.sqft}
                                    </span>
                                  </PlotCell>
                                  <PlotCell>
                                    <span className="text-[17px] tabular-nums text-[#2a2a2a]">
                                      {getPlotSqYd(plot)}
                                    </span>
                                  </PlotCell>
                                  <PlotCell>
                                    <span className="text-[18px] font-semibold tabular-nums text-[#141414]">
                                      {formatPlotPrice(plot)}
                                    </span>
                                  </PlotCell>
                                  <PlotCell>
                                    <span
                                      className={`inline-flex items-center gap-2.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium ${status.pill}`}
                                    >
                                      <span className={`h-2 w-2 rounded-full ${status.dot}`} />
                                      {status.label}
                                    </span>
                                  </PlotCell>
                                </motion.div>
                              )
                            })}
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
      {project.tourImage && (
        <section
          ref={tourRef}
          className="w-full bg-white px-5 py-16 sm:px-8 md:px-10 lg:px-16 lg:py-24"
          style={{ fontFamily: FONT }}
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-[0.75fr_1.6fr] lg:gap-14">
            <FadeUp>
              {project.tourEyebrow && <Eyebrow className="mb-5">{project.tourEyebrow}</Eyebrow>}

              <h2 className="mb-5 text-[30px] font-bold leading-[1.15] tracking-tight text-[#141414] md:text-[40px]">
                {project.tourHeading?.[0]}
                <br />
                {project.tourHeading?.[1]?.split('360°')[0]}
                {project.tourHeading?.[1]?.includes('360°') && (
                  <span className="text-[#a8823c]">360°</span>
                )}
              </h2>

              <p className="mb-8 max-w-[380px] text-[15px] leading-[1.8] text-[#6b7280]">
                {project.tourDescription}
              </p>

              {project.tourUrl && (
                <SolidButton href={project.tourUrl} icon={Play}>
                  {project.tourCtaLabel || 'Start 360° Tour'}
                </SolidButton>
              )}
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={tourInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="relative h-[300px] w-full overflow-hidden rounded-[28px] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.4)] md:h-[460px]"
            >
              <img
                src={project.tourImage}
                alt={`${project.name} 360 tour`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

              
                <a href={project.tourUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start 360 virtual tour"
                className="group absolute left-1/2 top-1/2 flex h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/40 bg-white/10 text-white backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/20 md:h-[170px] md:w-[170px]"
              >
                <span className="absolute inset-0 animate-ping rounded-full border border-white/30 [animation-duration:2.5s]" />
                <span className="text-3xl font-bold leading-none md:text-4xl">360°</span>
                <span className="mt-1.5 text-[10px] font-semibold tracking-[2px] md:text-xs">
                  VIRTUAL TOUR
                </span>
              </a>

              {project.tourTagline?.length > 0 && (
                <div
                  className="absolute bottom-6 right-6 text-right leading-tight text-white"
                  style={{ fontFamily: "'Brush Script MT', cursive" }}
                >
                  {project.tourTagline.map((line, i) => (
                    <p key={i} className="m-0 text-xl italic md:text-2xl">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* ================= Location ================= */}
      {project.locationLandmarks?.length > 0 && (
        <section
          ref={locationRef}
          className="w-full overflow-hidden bg-white px-5 py-16 sm:px-8 md:px-10 lg:px-16 lg:py-24"
          style={{ fontFamily: FONT }}
        >
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.6fr_0.9fr] lg:gap-12">
            <FadeUp>
              <Eyebrow icon={MapPin} className="mb-5">
                Location
              </Eyebrow>

              <h2 className="mb-4 text-[28px] font-bold leading-[1.15] tracking-tight text-[#141414] md:text-[38px]">
                {project.locationHeading?.[0]} {project.locationHeading?.[1]}
              </h2>

              <p className="mb-8 max-w-[320px] text-[15px] leading-[1.8] text-[#6b7280]">
                {project.locationDescription}
              </p>

              {project.locationMapUrl && (
                <AccentOutlineButton href={project.locationMapUrl} icon={Navigation2}>
                  Get Directions
                </AccentOutlineButton>
              )}
            </FadeUp>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={locationInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
              className="relative h-[340px] w-full overflow-hidden rounded-[28px] bg-[#ece8df] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.35)] md:h-[400px]"
            >
              {project.locationMapEmbed ? (
                <iframe
                  src={project.locationMapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title={`${project.name} location map`}
                  className="h-full w-full"
                />
              ) : project.locationMapImage ? (
                <img
                  src={project.locationMapImage}
                  alt="Location map"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-8 w-8 text-[#141414]" strokeWidth={1.75} />
                    <p className="m-0 text-sm font-semibold text-[#141414]">{project.name}</p>
                  </div>
                </div>
              )}
            </motion.div>

            <div className="flex flex-col gap-2.5">
              {project.locationLandmarks.map((item, i) => {
                const LandmarkIcon = getLandmarkIcon(item.label)
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    animate={locationInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-black/[0.06] bg-white px-4 py-3.5 transition-all duration-300 hover:border-[#a8823c]/30 hover:shadow-[0_10px_24px_-14px_rgba(168,130,60,0.4)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#faf9f7] transition-colors group-hover:bg-[#a8823c]">
                        <LandmarkIcon
                          className="h-4 w-4 text-[#a8823c] transition-colors group-hover:text-white"
                          strokeWidth={1.75}
                        />
                      </div>
                      <p className="m-0 text-sm font-medium text-[#141414]">{item.label}</p>
                    </div>
                    <p className="m-0 shrink-0 text-sm font-semibold text-[#a8823c]">{item.distance}</p>
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
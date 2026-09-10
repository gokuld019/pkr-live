// src/components/project-banner.jsx
'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
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
  ExternalLink,
  BedDouble,
  Bath,
  Sofa,
  Play,
  Maximize2,
  Sparkles,
  Images,
  X,
  ArrowUpRight,
} from 'lucide-react'

const GOLD = '#a8823c'
const EASE = [0.22, 1, 0.36, 1]

const featureIconMap = {
  bed: BedDouble,
  bath: Bath,
  living: Sofa,
}

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

/* ---------------------------------------------------------
   Reusable smooth text-reveal primitives
--------------------------------------------------------- */
function RevealText({ as: Tag = 'p', text, className = '', delay = 0, amount = 0.4, once = true }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, amount })
  return (
    <Tag ref={ref} className={className}>
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
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  )
}

export default function ProjectBanner({ project }) {
  /* ---------------- Amenities ---------------- */
  const amenityItems = project?.amenities || []
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(4)
  const totalPages = Math.max(1, Math.ceil(amenityItems.length / perPage))

  const amenitiesRef = useRef(null)
  const isInView = useInView(amenitiesRef, { once: true, margin: '-100px' })

  useEffect(() => {
    const updatePerPage = () => {
      if (window.innerWidth < 640) setPerPage(2)
      else if (window.innerWidth < 1024) setPerPage(3)
      else setPerPage(4)
    }
    updatePerPage()
    window.addEventListener('resize', updatePerPage)
    return () => window.removeEventListener('resize', updatePerPage)
  }, [])

  useEffect(() => {
    if (page >= totalPages) setPage(0)
  }, [totalPages, page])

  const goPrev = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1))
  const goNext = () => setPage((p) => (p === totalPages - 1 ? 0 : p + 1))
  const visible = amenityItems.slice(page * perPage, page * perPage + perPage)

  /* ---------------- Gallery ---------------- */
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

  // Autoplay
  useEffect(() => {
    if (galleryItems.length < 2 || paused || lightboxOpen) return
    const id = setInterval(galleryNext, 5000)
    return () => clearInterval(id)
  }, [galleryItems.length, paused, lightboxOpen, galleryNext])

  // Keyboard controls for lightbox
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

  /* ---------------- Floor plans ---------------- */
  const floorPlanTabs = project?.floorPlanTabs || []
  const allFloorPlans = project?.floorPlans || []
  const [activeFloorTab, setActiveFloorTab] = useState(0)
  const floorPlansRef = useRef(null)
  const floorPlansInView = useInView(floorPlansRef, { once: true, margin: '-100px' })

  const activeTabLabel = floorPlanTabs[activeFloorTab]
  const activePlans = allFloorPlans.filter((p) => p.title === activeTabLabel)

  const [floorPlanPage, setFloorPlanPage] = useState(0)
  const plansPerPage = 2

  useEffect(() => {
    setFloorPlanPage(0)
  }, [activeFloorTab])

  const floorTotalPages = Math.ceil(activePlans.length / plansPerPage) || 1
  const visiblePlans = activePlans.slice(
    floorPlanPage * plansPerPage,
    floorPlanPage * plansPerPage + plansPerPage
  )

  const floorPlanPrev = () => setFloorPlanPage((p) => (p === 0 ? floorTotalPages - 1 : p - 1))
  const floorPlanNext = () => setFloorPlanPage((p) => (p === floorTotalPages - 1 ? 0 : p + 1))

  /* ---------------- Location / Tour ---------------- */
  const locationRef = useRef(null)
  const locationInView = useInView(locationRef, { once: true, margin: '-100px' })

  const tourRef = useRef(null)
  const tourInView = useInView(tourRef, { once: true, margin: '-100px' })

  if (!project) return null

  return (
    <>
      {/* ================= Banner ================= */}
      <section className="relative flex min-h-[750px] w-full bg-[#111]">
        <div
          className="relative flex flex-[1.6] items-center justify-center overflow-hidden bg-[#333] bg-cover bg-center"
          style={{ backgroundImage: `url(${project.heroImage})` }}
        />
      </section>

      {/* ================= Overview ================= */}
      <section
        className="w-full bg-white px-6 py-16 md:px-10 lg:px-16 lg:py-24"
        style={{ fontFamily: "'Figtree', sans-serif" }}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.15fr_0.55fr] lg:gap-8">
          <div>
            <FadeUp>
              <div className="mb-5 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[3px] text-[#a8823c]">
                  {project.eyebrow}
                </span>
                <span className="h-px w-10 bg-[#a8823c]" />
              </div>
            </FadeUp>

            <RevealText
              as="h2"
              className="mb-6 text-[32px] font-semibold leading-[1.2] text-[#1a1a1a] md:text-[40px]"
              text={
                <>
                  {project.heading?.[0]}{' '}
                  <span className="text-[#a8823c]">{project.heading?.[1]}</span>
                </>
              }
              delay={0.1}
            />

            <FadeUp delay={0.2}>
              <p className="mb-8 max-w-[600px] text-base leading-[1.8] text-[#5a5a5a]">
                {project.description}
              </p>
            </FadeUp>

            {project.brochureUrl && (
              <FadeUp delay={0.3}>
                <a
                  href={project.brochureUrl}
                  download
                  className="group inline-flex items-center gap-3 rounded-full bg-[#1a1a1a] py-2 pl-7 pr-2 text-sm font-semibold tracking-wide text-white no-underline transition-colors hover:bg-[#a8823c]"
                >
                  Download Brochure
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-transform duration-300 group-hover:translate-y-0.5">
                    <Download className="h-4 w-4" />
                  </span>
                </a>
              </FadeUp>
            )}
          </div>

          <FadeUp delay={0.15} className="relative">
            <img
              src={project.aboutImage}
              alt={project.name || 'Project'}
              className="h-[420px] w-full rounded-3xl object-cover md:h-[480px]"
            />
          </FadeUp>

          <div className="flex flex-col divide-y divide-[#ece7dc]">
            {project.quickFacts?.map((fact, i) => (
              <FadeUp
                key={i}
                delay={0.1 * i}
                className="flex items-center gap-4 py-6 first:pt-0 last:pb-0"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f6f1e7]">
                  <Building2 className="h-6 w-6 text-[#a8823c]" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="m-0 mb-1 text-sm text-[#7a7a7a]">{fact.label}</p>
                  <p className="m-0 text-base font-semibold text-[#1a1a1a]">{fact.value}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ================= Amenities (white, modern) ================= */}
      {amenityItems.length > 0 && (
        <section
          ref={amenitiesRef}
          className="relative w-full overflow-hidden bg-white px-5 py-16 sm:px-8 sm:py-20 md:px-10 lg:px-16 lg:py-28"
          style={{ fontFamily: "'Figtree', sans-serif" }}
        >
          {/* soft ambient accents */}
          <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#a8823c]/[0.07] blur-[120px]" />
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-[#a8823c]/[0.05] blur-[120px]" />

          <div className="relative mx-auto max-w-[1500px]">
            <div className="mb-10 flex flex-col gap-6 md:mb-14 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <FadeUp>
                  <Eyebrow icon={Sparkles} className="mb-5">
                    Lifestyle
                  </Eyebrow>
                </FadeUp>
                <RevealText
                  as="h2"
                  text={project.amenitiesHeading?.join(' ') || 'Amenities'}
                  className="text-[32px] font-bold leading-[1.08] tracking-tight text-[#141414] sm:text-[42px] md:text-[54px]"
                  delay={0.1}
                />
                {project.amenitiesDescription && (
                  <FadeUp delay={0.2}>
                    <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed text-[#6b6b6b] sm:text-[15px]">
                      {project.amenitiesDescription}
                    </p>
                  </FadeUp>
                )}
              </div>

              {totalPages > 1 && (
                <FadeUp delay={0.2} className="flex shrink-0 items-center gap-4">
                  <span className="text-[13px] font-semibold tabular-nums text-[#9a9a9a]">
                    <span className="text-[#141414]">{String(page + 1).padStart(2, '0')}</span>
                    {' / '}
                    {String(totalPages).padStart(2, '0')}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={goPrev}
                      aria-label="Previous amenities"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-[#141414] transition-all duration-300 hover:border-[#141414] hover:bg-[#141414] hover:text-white"
                    >
                      <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2} />
                    </button>
                    <button
                      onClick={goNext}
                      aria-label="Next amenities"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#141414] text-white transition-all duration-300 hover:bg-[#a8823c]"
                    >
                      <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2} />
                    </button>
                  </div>
                </FadeUp>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:grid-cols-4 sm:grid-cols-3">
              <AnimatePresence mode="wait">
                {visible.map((item, i) => (
                  <motion.div
                    key={`${page}-${item.id || i}`}
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    exit={{ opacity: 0, y: -16, scale: 0.97 }}
                    transition={{ duration: 0.55, delay: 0.07 * i, ease: EASE }}
                    className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-[22px] bg-[#f4f2ee] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.18)] transition-shadow duration-500 hover:shadow-[0_24px_50px_-16px_rgba(168,130,60,0.45)] sm:aspect-[3/4.3]"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />

                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold tabular-nums tracking-wider text-[#141414] backdrop-blur sm:left-4 sm:top-4 sm:text-[11px]">
                      {String(page * perPage + i + 1).padStart(2, '0')}
                    </span>

                    <span className="absolute right-3 top-3 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-[#a8823c] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:right-4 sm:top-4 sm:h-9 sm:w-9">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>

                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                      <div className="rounded-2xl border border-white/15 bg-white/10 px-3.5 py-3 backdrop-blur-md transition-colors duration-300 group-hover:bg-white/15 sm:px-4">
                        <p className="m-0 text-[13px] font-semibold leading-snug text-white sm:text-[15px]">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    aria-label={`Go to page ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === page ? 'w-10 bg-[#a8823c]' : 'w-1.5 bg-black/15 hover:bg-black/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ================= Gallery (no thumbnails, modern) ================= */}
      {galleryItems.length > 0 && (
        <section
          ref={galleryRef}
          className="relative w-full overflow-hidden bg-[#f6f5f2] px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:px-16 lg:py-28"
          style={{ fontFamily: "'Figtree', sans-serif" }}
        >
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-8 flex flex-col gap-5 px-1 sm:flex-row sm:items-end sm:justify-between md:mb-12">
              <div>
                <FadeUp>
                  <Eyebrow icon={Images} className="mb-5">
                    Visual Story
                  </Eyebrow>
                </FadeUp>
                <RevealText
                  as="h2"
                  text={project.galleryHeading?.join(' ') || 'Gallery'}
                  className="text-[30px] font-bold leading-[1.08] tracking-tight text-[#141414] sm:text-[42px] md:text-[54px]"
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
                    <button
                      onClick={galleryPrev}
                      aria-label="Previous image"
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white text-[#141414] transition-all duration-300 hover:border-[#141414] hover:bg-[#141414] hover:text-white"
                    >
                      <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2} />
                    </button>
                    <button
                      onClick={galleryNext}
                      aria-label="Next image"
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#141414] text-white transition-all duration-300 hover:bg-[#a8823c]"
                    >
                      <ChevronRight className="h-[18px] w-[18px]" strokeWidth={2} />
                    </button>
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

                {/* Expand */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  aria-label="Open fullscreen"
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/25 sm:right-6 sm:top-6 sm:h-11 sm:w-11"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                {/* Caption + progress */}
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

          {/* Lightbox */}
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

                <button
                  aria-label="Close"
                  onClick={() => setLightboxOpen(false)}
                  className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
                >
                  <X className="h-5 w-5" />
                </button>

                {galleryItems.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      galleryPrev()
                    }}
                    aria-label="Previous"
                    className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      galleryNext()
                    }}
                    aria-label="Next"
                    className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
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
          className="w-full overflow-hidden bg-white px-6 py-20 md:px-10 lg:px-16 lg:py-28"
          style={{ fontFamily: "'Figtree', sans-serif" }}
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[0.85fr_2.15fr] lg:gap-14">
              <FadeUp>
                <Eyebrow className="mb-5">Floor Plans</Eyebrow>

                <h2 className="mb-4 text-[30px] font-bold leading-[1.15] tracking-tight text-[#141414] md:text-[40px]">
                  {project.floorPlansHeading?.[0]} {project.floorPlansHeading?.[1]}
                </h2>

                <p className="mb-8 max-w-[340px] text-[15px] leading-[1.8] text-[#6b7280]">
                  {project.floorPlansDescription}
                </p>

                {project.floorPlansCtaHref && (
                  <a
                    href={project.floorPlansCtaHref}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#141414] px-6 py-3 text-[13px] font-semibold uppercase tracking-[1.5px] text-[#141414] no-underline transition-colors hover:bg-[#141414] hover:text-white"
                  >
                    {project.floorPlansCtaLabel || 'View All Plans'}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                )}
              </FadeUp>

              <div>
                <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-1 overflow-x-auto rounded-full bg-[#f4f2ee] p-1.5">
                    {floorPlanTabs.map((label, i) => (
                      <button
                        key={label}
                        onClick={() => setActiveFloorTab(i)}
                        className={`relative whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                          activeFloorTab === i ? 'text-white' : 'text-[#6b7280] hover:text-[#141414]'
                        }`}
                      >
                        {activeFloorTab === i && (
                          <motion.span
                            layoutId="floorPlanTabPill"
                            transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                            className="absolute inset-0 rounded-full bg-[#141414]"
                          />
                        )}
                        <span className="relative">{label}</span>
                      </button>
                    ))}
                  </div>

                  {floorTotalPages > 1 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={floorPlanPrev}
                        aria-label="Previous"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-[#141414] transition-colors hover:bg-[#141414] hover:text-white"
                      >
                        <ChevronLeft className="h-4 w-4" strokeWidth={2} />
                      </button>
                      <button
                        onClick={floorPlanNext}
                        aria-label="Next"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#141414] text-white transition-colors hover:bg-[#a8823c]"
                      >
                        <ChevronRight className="h-4 w-4" strokeWidth={2} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <AnimatePresence mode="wait">
                    {visiblePlans.map((plan, i) => (
                      <motion.div
                        key={`${activeFloorTab}-${floorPlanPage}-${plan.id || i}`}
                        initial={{ opacity: 0, y: 24 }}
                        animate={floorPlansInView ? { opacity: 1, y: 0 } : {}}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.5, delay: 0.08 * i, ease: EASE }}
                        className="group overflow-hidden rounded-3xl border border-black/[0.06] bg-[#faf9f7] transition-shadow duration-500 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.25)]"
                      >
                        <div className="bg-white p-4">
                          <img
                            src={plan.image}
                            alt={plan.title}
                            loading="lazy"
                            className="h-[240px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-4 flex items-start justify-between gap-3">
                            <h3 className="m-0 text-lg font-semibold text-[#141414]">{plan.title}</h3>
                            {plan.area && (
                              <span className="shrink-0 rounded-full bg-[#a8823c]/10 px-3 py-1 text-xs font-semibold text-[#a8823c]">
                                {plan.area}
                              </span>
                            )}
                          </div>

                          <div className="mb-5 flex flex-wrap items-center gap-2">
                            {plan.features?.map((feature, fi) => {
                              const FeatureIcon = featureIconMap[feature.icon] || Sofa
                              return (
                                <span
                                  key={fi}
                                  className="flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3 py-1.5 text-[12px] text-[#4b5563]"
                                >
                                  <FeatureIcon className="h-3.5 w-3.5 text-[#a8823c]" strokeWidth={1.75} />
                                  {feature.label}
                                </span>
                              )
                            })}
                          </div>

                          {plan.href && (
                            <a
                              href={plan.href}
                              className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[1.5px] text-[#141414] no-underline transition-colors hover:text-[#a8823c]"
                            >
                              View Floor Plan <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= 360 Virtual Tour ================= */}
      {project.tourImage && (
        <section
          ref={tourRef}
          className="w-full bg-[#f6f5f2] px-6 py-16 md:px-10 lg:px-16 lg:py-24"
          style={{ fontFamily: "'Figtree', sans-serif" }}
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
                <a
                  href={project.tourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#141414] py-2 pl-6 pr-2 text-sm font-semibold text-white no-underline transition-colors hover:bg-[#a8823c]"
                >
                  {project.tourCtaLabel || 'Start 360° Tour'}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white transition-transform group-hover:scale-105">
                    <Play className="h-4 w-4 fill-[#141414] text-[#141414]" />
                  </span>
                </a>
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

              <a
                href={project.tourUrl || '#'}
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
          className="w-full overflow-hidden bg-white px-6 py-20 md:px-10 lg:px-16 lg:py-28"
          style={{ fontFamily: "'Figtree', sans-serif" }}
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
                <a
                  href={project.locationMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-[#141414] px-6 py-3 text-[13px] font-semibold uppercase tracking-[1.5px] text-[#141414] no-underline transition-colors hover:bg-[#141414] hover:text-white"
                >
                  View On Map
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
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
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-black/[0.06] bg-[#faf9f7] px-4 py-3.5 transition-colors hover:border-[#a8823c]/30 hover:bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white transition-colors group-hover:bg-[#a8823c]">
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
    </>
  )
}
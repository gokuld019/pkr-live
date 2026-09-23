// src/components/social-feed-section.jsx
'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Figtree } from 'next/font/google'
import {
  MonitorPlay, Camera, ThumbsUp, Play, ArrowRight, ArrowUpRight, Eye, CalendarDays,
} from 'lucide-react'

/* ================================================================== */
/*  ✏️  EDIT HERE — paste up to 3 post links for each platform          */
/*                                                                    */
/*  Instagram: open the post → ••• → Copy link                         */
/*             e.g. https://www.instagram.com/p/C8abc123XyZ/           */
/*             (reels work too: https://www.instagram.com/reel/...)    */
/*                                                                    */
/*  Facebook:  click the post's date/time → copy the address bar URL   */
/*             e.g. https://www.facebook.com/PKRestates/posts/pfbid0.. */
/*             (videos work too: .../videos/123456789)                 */
/*                                                                    */
/*  Put the newest post first. Empty slots are skipped automatically.  */
/*  YouTube needs nothing: the latest 3 videos appear by themselves.   */
/* ================================================================== */
const PINNED_POSTS = {
  instagram: ['', '', ''],
  facebook: ['', '', ''],
}

/* ------------------------------------------------------------------ */

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

const FONT = figtree.style.fontFamily
const EASE = [0.22, 1, 0.36, 1]

// ============ THEME TOKENS (same as the rest of the site) ============
const DEEP_NAVY = '#0F3A6B'
const DEEP_NAVY_DARK = '#0A2B50'
const TEXT_CHARCOAL = '#2D3A46'
const LIGHT_BLUE = '#E8F0F9'

const FEED_ENDPOINT = '/api/social-feed'
const POSTS_PER_TAB = 3
const NEW_BADGE_DAYS = 7

const TABS = [
  {
    id: 'youtube',
    label: 'YouTube',
    Icon: MonitorPlay,
    handle: '@pkrestatesllp',
    url: 'https://www.youtube.com/@pkrestatesllp',
    cta: 'Visit our channel',
    moreTitle: 'More films on YouTube',
    moreText: 'Walkthroughs, site progress and project films.',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    Icon: Camera,
    handle: '@pkrestates',
    url: 'https://www.instagram.com/pkrestates',
    cta: 'Follow on Instagram',
    moreTitle: 'More on Instagram',
    moreText: 'Reels, launches and behind-the-scenes moments.',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    Icon: ThumbsUp,
    handle: 'PKR Estates',
    url: 'https://www.facebook.com/PKRestates/',
    cta: 'Visit our page',
    moreTitle: 'More on Facebook',
    moreText: 'Project news, offers and event updates.',
  },
]
const TAB_BY_ID = Object.fromEntries(TABS.map((t) => [t.id, t]))

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */
const COMPACT = new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 })

function formatDate(iso) {
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

function isRecent(iso) {
  const t = new Date(iso).getTime()
  return Number.isFinite(t) && Date.now() - t < NEW_BADGE_DAYS * 86400000
}

function instagramEmbedUrl(url = '') {
  const match = url.match(/instagram\.com\/(?:[\w.]+\/)?(p|reel|reels|tv)\/([\w-]+)/i)
  if (!match) return null
  const kind = match[1].toLowerCase() === 'reels' ? 'reel' : match[1].toLowerCase()
  return `https://www.instagram.com/${kind}/${match[2]}/embed/`
}

function facebookEmbedUrl(url, width, height) {
  if (!/facebook\.com|fb\.watch/i.test(url || '')) return null
  const video = /\/videos\/|\/watch\/?\?|\/reel\/|fb\.watch/i.test(url)
  const plugin = video ? 'video' : 'post'
  return `https://www.facebook.com/plugins/${plugin}.php?href=${encodeURIComponent(url)}&show_text=${video ? 'false' : 'true'}&width=${width}&height=${height}`
}

function validLinks(platform, links = []) {
  const check = platform === 'instagram' ? (u) => instagramEmbedUrl(u) : (u) => facebookEmbedUrl(u, 500, 500)
  return links.map((u) => (u || '').trim()).filter((u) => u && check(u)).slice(0, POSTS_PER_TAB)
}

// YouTube's default thumbnail has black bars — try the sharp versions first,
// and zoom the fallback just enough to crop the bars away.
function youtubeThumbs(video) {
  const base = `https://i.ytimg.com/vi/${video.videoId}`
  return video.type === 'short'
    ? [{ src: `${base}/oardefault.jpg`, zoom: 1 }, { src: `${base}/hqdefault.jpg`, zoom: 1.9 }]
    : [{ src: `${base}/maxresdefault.jpg`, zoom: 1 }, { src: `${base}/hqdefault.jpg`, zoom: 1.34 }]
}

/* ------------------------------------------------------------------ */
/*  DATA: latest YouTube videos                                        */
/* ------------------------------------------------------------------ */
function useLatestVideos() {
  const [state, setState] = useState({ status: 'loading', videos: [] })

  useEffect(() => {
    let cancelled = false
    fetch(FEED_ENDPOINT)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        if (!cancelled) setState({ status: 'ready', videos: Array.isArray(data.videos) ? data.videos : [] })
      })
      .catch((err) => {
        console.error('YouTube feed failed to load:', err)
        if (!cancelled) setState({ status: 'error', videos: [] })
      })
    return () => { cancelled = true }
  }, [])

  return state
}

/* ------------------------------------------------------------------ */
/*  LAYOUT PIECES                                                      */
/* ------------------------------------------------------------------ */
// Swipeable row on phones/tablets, three-column grid on desktop
const ROW_CLASS =
  '-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 [scrollbar-width:none] sm:gap-5 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden'

const CARD_WRAP = 'w-[85%] shrink-0 snap-center sm:w-[47%] lg:w-auto'

const CARD_SURFACE =
  'group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E6EDF5] bg-white shadow-[0_18px_40px_-30px_rgba(15,58,107,0.45)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_32px_60px_-30px_rgba(15,58,107,0.5)]'

function CardMotion({ index, children }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
      className={CARD_WRAP}
    >
      {children}
    </motion.article>
  )
}

function SiteButton({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/btn inline-flex items-center gap-2 rounded-md px-5 py-3 text-[11.5px] font-bold uppercase tracking-[1.6px] text-white shadow-[0_10px_24px_-10px_rgba(15,58,107,0.6)] transition-all duration-300 hover:shadow-[0_14px_30px_-10px_rgba(15,58,107,0.7)] active:scale-[0.98] sm:px-6 sm:text-[12px]"
      style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
    </a>
  )
}

/* "See more" card that fills an empty slot */
function MoreCard({ tab, index }) {
  const Icon = tab.Icon
  return (
    <CardMotion index={index}>
      <a
        href={tab.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-2xl p-6 text-white shadow-[0_18px_40px_-28px_rgba(15,58,107,0.7)] transition-transform duration-500 hover:-translate-y-1.5 sm:p-7"
        style={{ background: `linear-gradient(150deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
      >
        <span className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.07] transition-transform duration-700 group-hover:scale-110" />
        <span className="pointer-events-none absolute -bottom-20 -left-14 h-48 w-48 rounded-full bg-white/[0.05]" />

        <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </span>

        <div className="relative">
          <p className="m-0 text-[11px] font-semibold uppercase tracking-[2px] text-[#B8CFE8]">{tab.handle}</p>
          <p className="m-0 mt-2 text-[22px] font-bold leading-[1.2] sm:text-[24px]">{tab.moreTitle}</p>
          <p className="m-0 mt-2 max-w-[260px] text-[13.5px] leading-[1.6] text-white/75">{tab.moreText}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-[11.5px] font-bold uppercase tracking-[1.6px]">
            Open {tab.label}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
          </span>
        </div>
      </a>
    </CardMotion>
  )
}

/* Full-width panel when a platform has no posts to show yet */
function EmptyPanel({ tab }) {
  const Icon = tab.Icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="relative overflow-hidden rounded-2xl px-6 py-10 text-white sm:px-12 sm:py-14"
      style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
    >
      <span className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/[0.06]" />
      <span className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-white/[0.04]" />
      <div className="relative flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4 sm:gap-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
            <Icon className="h-7 w-7" strokeWidth={1.75} />
          </span>
          <div>
            <p className="m-0 text-[11px] font-semibold uppercase tracking-[2px] text-[#B8CFE8]">{tab.handle}</p>
            <p className="m-0 mt-1.5 text-[22px] font-bold leading-tight sm:text-[28px]">{tab.moreTitle}</p>
            <p className="m-0 mt-2 max-w-[440px] text-[14px] leading-[1.6] text-white/75">{tab.moreText}</p>
          </div>
        </div>
        <a
          href={tab.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn inline-flex shrink-0 items-center gap-2 rounded-md bg-white px-6 py-3 text-[12px] font-bold uppercase tracking-[1.6px] transition-transform duration-300 hover:-translate-y-0.5"
          style={{ color: DEEP_NAVY }}
        >
          {tab.cta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" strokeWidth={2.5} />
        </a>
      </div>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  YOUTUBE                                                            */
/* ------------------------------------------------------------------ */
function YouTubeThumb({ video, className = '', fit = 'cover' }) {
  const candidates = useMemo(() => youtubeThumbs(video), [video])
  const [i, setI] = useState(0)
  const current = candidates[i]
  if (!current) return null
  return (
    <img
      src={current.src}
      alt=""
      loading="lazy"
      decoding="async"
      onError={() => setI((n) => n + 1)}
      className={`${className} ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
      style={{ scale: fit === 'contain' ? 1 : current.zoom }}
    />
  )
}

function VideoCard({ video, index }) {
  const [playing, setPlaying] = useState(false)
  const isShort = video.type === 'short'

  return (
    <CardMotion index={index}>
      <div className={CARD_SURFACE}>
        {/* Media */}
        <div className="relative aspect-video overflow-hidden bg-[#0A1422]">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&rel=0&playsinline=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={`Play video: ${video.title}`}
              className="absolute inset-0 block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
            >
              {isShort ? (
                <>
                  <YouTubeThumb video={video} className="absolute inset-0 h-full w-full scale-125 opacity-60 blur-2xl" />
                  <YouTubeThumb video={video} fit="contain" className="absolute inset-0 h-full w-full transition-transform duration-[900ms] group-hover:scale-[1.04]" />
                </>
              ) : (
                <YouTubeThumb video={video} className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]" />
              )}

              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A2B50]/70 via-transparent to-[#0A2B50]/20" />

              <span className="absolute left-3 top-3 flex items-center gap-1.5">
                {isRecent(video.publishedAt) && (
                  <span className="rounded bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-[1.2px]" style={{ color: DEEP_NAVY }}>
                    New
                  </span>
                )}
                {isShort && (
                  <span className="rounded bg-[#0A2B50]/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[1.2px] text-white backdrop-blur">
                    Short
                  </span>
                )}
              </span>

              <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/50 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-[#0F3A6B] sm:h-16 sm:w-16">
                <Play className="ml-0.5 h-5 w-5 fill-current sm:h-6 sm:w-6" strokeWidth={0} />
              </span>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <span className="rounded px-2 py-1 text-[10px] font-bold uppercase tracking-[1.4px]" style={{ backgroundColor: LIGHT_BLUE, color: DEEP_NAVY }}>
              {isShort ? 'YouTube Short' : 'YouTube Video'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[1px]" style={{ color: TEXT_CHARCOAL, opacity: 0.55 }}>
              <CalendarDays className="h-3.5 w-3.5" strokeWidth={2} />
              {formatDate(video.publishedAt)}
            </span>
          </div>

          <h3 className="m-0 line-clamp-2 text-[16px] font-bold leading-snug sm:text-[17px]" style={{ color: DEEP_NAVY }}>
            {video.title}
          </h3>

          <div className="mt-auto flex items-center justify-between gap-3 pt-5">
            {video.views ? (
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold" style={{ color: TEXT_CHARCOAL, opacity: 0.7 }}>
                <Eye className="h-4 w-4" strokeWidth={1.9} />
                {COMPACT.format(video.views)} views
              </span>
            ) : (
              <span />
            )}
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[1.4px] transition-colors hover:opacity-80"
              style={{ color: DEEP_NAVY }}
            >
              {playing ? 'Playing' : 'Watch now'}
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </CardMotion>
  )
}

function VideoSkeleton() {
  return (
    <div className={ROW_CLASS} aria-hidden="true">
      {Array.from({ length: POSTS_PER_TAB }).map((_, i) => (
        <div key={i} className={CARD_WRAP}>
          <div className="overflow-hidden rounded-2xl border border-[#E6EDF5] bg-white">
            <div className="aspect-video animate-pulse bg-[#EDF3F9]" />
            <div className="space-y-3 p-5 sm:p-6">
              <div className="h-4 w-1/3 animate-pulse rounded bg-[#EDF3F9]" />
              <div className="h-5 w-full animate-pulse rounded bg-[#EDF3F9]" />
              <div className="h-5 w-2/3 animate-pulse rounded bg-[#EDF3F9]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function YouTubePanel({ status, videos }) {
  const tab = TAB_BY_ID.youtube
  if (status === 'loading') return <VideoSkeleton />
  const latest = videos.slice(0, POSTS_PER_TAB)
  if (!latest.length) return <EmptyPanel tab={tab} />
  return (
    <div className={ROW_CLASS}>
      {latest.map((video, i) => <VideoCard key={video.id} video={video} index={i} />)}
      {latest.length < POSTS_PER_TAB && <MoreCard tab={tab} index={latest.length} />}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  INSTAGRAM + FACEBOOK (official embeds)                             */
/*  Embeds have a minimum width; on narrow phones we scale them down   */
/*  instead of cutting them off.                                       */
/* ------------------------------------------------------------------ */
function EmbedFrame({ buildSrc, minWidth, maxWidth, title }) {
  const ref = useRef(null)
  const [box, setBox] = useState({ w: 0, h: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width / 10) * 10
      const h = Math.round(entry.contentRect.height / 10) * 10
      setBox((prev) => (prev.w === w && prev.h === h ? prev : { w, h }))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const scale = box.w && box.w < minWidth ? box.w / minWidth : 1
  const renderW = Math.min(maxWidth, Math.max(minWidth, box.w))
  const renderH = Math.round(box.h / scale)
  const src = box.w ? buildSrc(renderW, renderH) : null

  return (
    <div ref={ref} className="absolute inset-0 flex justify-center overflow-hidden bg-white">
      {!loaded && <div className="absolute inset-0 animate-pulse bg-[#EDF3F9]" />}
      {src && (
        <iframe
          key={src}
          src={src}
          title={title}
          width={renderW}
          height={renderH}
          loading="lazy"
          scrolling="no"
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setLoaded(true)}
          className="relative shrink-0 border-0"
          style={{
            width: renderW,
            height: renderH,
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'top center',
          }}
        />
      )}
    </div>
  )
}

function EmbedCard({ platform, url, index }) {
  const tab = TAB_BY_ID[platform]
  const Icon = tab.Icon
  const buildSrc = useCallback(
    (w, h) => (platform === 'instagram' ? instagramEmbedUrl(url) : facebookEmbedUrl(url, w, h)),
    [platform, url]
  )

  return (
    <CardMotion index={index}>
      <div className={CARD_SURFACE}>
        <div className="relative h-[500px] sm:h-[540px]">
          <EmbedFrame
            buildSrc={buildSrc}
            minWidth={platform === 'instagram' ? 326 : 350}
            maxWidth={platform === 'instagram' ? 540 : 500}
            title={`PKR Estates on ${tab.label}`}
          />
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-[#EEF3F9] px-5 py-4">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.4px]" style={{ color: DEEP_NAVY }}>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ backgroundColor: LIGHT_BLUE }}>
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            {tab.label} post
          </span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[1.4px] transition-opacity hover:opacity-75"
            style={{ color: DEEP_NAVY }}
          >
            Open
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </a>
        </div>
      </div>
    </CardMotion>
  )
}

function EmbedPanel({ platform, links }) {
  const tab = TAB_BY_ID[platform]
  const posts = validLinks(platform, links)
  if (!posts.length) return <EmptyPanel tab={tab} />
  return (
    <div className={ROW_CLASS}>
      {posts.map((url, i) => <EmbedCard key={url} platform={platform} url={url} index={i} />)}
      {posts.length < POSTS_PER_TAB && <MoreCard tab={tab} index={posts.length} />}
    </div>
  )
}

/* ================================================================== */
/*  SOCIAL FEED SECTION                                                */
/* ================================================================== */
export default function SocialFeedSection({
  id = 'social',
  eyebrow = 'Follow our journey',
  heading = ['Straight from', 'Our Social Feeds'],
  description = 'Site progress, walkthroughs and handovers at PKR Estates. Catch the latest from our channels.',
  pinned = PINNED_POSTS,
  defaultTab = 'youtube',
}) {
  const { status, videos } = useLatestVideos()
  const [activeTab, setActiveTab] = useState(defaultTab)
  const tab = TAB_BY_ID[activeTab]

  const onTabKey = (e) => {
    const i = TABS.findIndex((t) => t.id === activeTab)
    if (e.key === 'ArrowRight') setActiveTab(TABS[(i + 1) % TABS.length].id)
    if (e.key === 'ArrowLeft') setActiveTab(TABS[(i - 1 + TABS.length) % TABS.length].id)
  }

  return (
    <section
      id={id}
      className={`${figtree.className} relative w-full overflow-hidden bg-white px-4 py-14 sm:px-8 sm:py-20 md:px-10 lg:px-16 lg:py-24`}
      style={{ fontFamily: FONT }}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-[#0F3A6B]/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-[1280px]">
        {/* ================= Header (centred, like the other sections) ================= */}
        <div className="mx-auto mb-8 max-w-[640px] text-center sm:mb-10">
          <span className="text-[10.5px] font-semibold uppercase tracking-[3px] sm:text-[11.5px] sm:tracking-[3.5px]" style={{ color: TEXT_CHARCOAL, opacity: 0.7 }}>
            {eyebrow}
          </span>
          <h2 className="m-0 mt-3 text-[28px] font-bold leading-[1.12] tracking-tight sm:text-[40px] md:text-[46px]" style={{ color: DEEP_NAVY }}>
            {heading[0]}
            <br />
            {heading[1]}
          </h2>
          <p className="m-0 mt-3 text-[13.5px] leading-[1.7] sm:mt-4 sm:text-[15px]" style={{ color: TEXT_CHARCOAL }}>
            {description}
          </p>
        </div>

        {/* ================= Tabs ================= */}
        <div className="mb-8 flex justify-center sm:mb-10">
          <div
            role="tablist"
            aria-label="Social media channels"
            onKeyDown={onTabKey}
            className="flex items-center gap-1 rounded-full border border-[#E0E8F0] bg-white p-1.5 shadow-[0_12px_30px_-20px_rgba(15,58,107,0.45)]"
          >
            {TABS.map((t) => {
              const active = t.id === activeTab
              const Icon = t.Icon
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`social-tab-${t.id}`}
                  aria-selected={active}
                  aria-controls="social-tab-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#0F3A6B]/40 sm:px-6 sm:text-[14px] ${
                    active ? 'text-white' : 'text-[#5A6B7B] hover:text-[#0F3A6B]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="socialTabPill"
                      transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                      className="absolute inset-0 rounded-full shadow-[0_10px_22px_-10px_rgba(15,58,107,0.8)]"
                      style={{ background: `linear-gradient(135deg, ${DEEP_NAVY} 0%, ${DEEP_NAVY_DARK} 100%)` }}
                    />
                  )}
                  <Icon className="relative z-[1] h-4 w-4" strokeWidth={2} />
                  <span className="relative z-[1]">{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ================= Panel ================= */}
        <div id="social-tab-panel" role="tabpanel" aria-labelledby={`social-tab-${activeTab}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              {activeTab === 'youtube' ? (
                <YouTubePanel status={status} videos={videos} />
              ) : (
                <EmbedPanel platform={activeTab} links={pinned[activeTab]} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ================= Footer CTA ================= */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:mt-12">
          <SiteButton href={tab.url}>{tab.cta}</SiteButton>
          <span className="text-[12px] lg:hidden" style={{ color: TEXT_CHARCOAL, opacity: 0.55 }}>
            Swipe the cards to see more
          </span>
        </div>
      </div>
    </section>
  )
}
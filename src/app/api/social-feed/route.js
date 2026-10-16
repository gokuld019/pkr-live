// src/app/api/social-feed/route.js
//
// Returns the latest videos from the PKR Estates YouTube channel.
// Uses YouTube's public RSS feed: no API key, no token, nothing to renew.
// Cached for one hour, so YouTube is contacted at most once an hour.

import { NextResponse } from 'next/server'

export const revalidate = 3600

const CACHE_SECONDS = 3600
const VIDEO_LIMIT = 6
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UC8jgpOkqx32-XoZ_H0ZxOUQ' // @pkrestatesllp

function decodeEntities(str = '') {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&amp;/g, '&')
}

function readTag(xml, name) {
  const match = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`))
  return match ? decodeEntities(match[1].trim()) : ''
}

function readAttr(xml, name, attr) {
  const match = xml.match(new RegExp(`<${name}\\s[^>]*?${attr}="([^"]*)"`))
  return match ? decodeEntities(match[1]) : ''
}

export async function GET() {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, {
      next: { revalidate: CACHE_SECONDS },
    })
    if (!res.ok) throw new Error(`YouTube responded with ${res.status}`)

    const xml = await res.text()
    const entries = xml.split('<entry>').slice(1).map((chunk) => chunk.split('</entry>')[0])

    const videos = entries.slice(0, VIDEO_LIMIT).map((entry) => {
      const videoId = readTag(entry, 'yt:videoId')
      const link = readAttr(entry, 'link', 'href')
      const views = Number(readAttr(entry, 'media:statistics', 'views'))
      return {
        id: videoId,
        videoId,
        type: link.includes('/shorts/') ? 'short' : 'video',
        title: readTag(entry, 'title'),
        url: link || `https://www.youtube.com/watch?v=${videoId}`,
        publishedAt: readTag(entry, 'published'),
        views: views > 0 ? views : null,
      }
    })

    return NextResponse.json(
      { videos, updatedAt: new Date().toISOString() },
      { headers: { 'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=86400` } }
    )
  } catch (err) {
    console.error('[social-feed] YouTube feed failed:', err?.message || err)
    return NextResponse.json({ videos: [], error: true }, { headers: { 'Cache-Control': 'no-store' } })
  }
}
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

import { getUpcomingEvents as getFallbackUpcomingEvents } from '@/frontend/data/events'
import { businessInfo as fallbackBusinessInfo, menuCategories as fallbackMenuItems } from '@/frontend/data/menu'
import type { BusinessInfo, Event, Media, MenuItem } from '@/payload-types'

export type FrontendEvent = {
  date: string
  description?: unknown
  facebookLink?: string | null
  hasOfficialPoster: boolean
  id: number | string
  image: string | null
  time?: string | null
  title: string
}

export type FrontendMenuItem = {
  description?: unknown
  id: number | string
  image: string | null
  order: number
  title: string
}

export type FrontendBusinessInfo = {
  address: {
    googleMapsLink?: string | null
    neighborhood?: string | null
    street?: string | null
  }
  contact: {
    artists?: string | null
    exhibitions?: string | null
    general?: string | null
  }
  hours: {
    lundi: { close?: string | null; open?: string | null }
    'mardi-mercredi': { close?: string | null; open?: string | null }
    'jeudi-vendredi-samedi': { close?: string | null; open?: string | null }
    dimanche: { close?: string | null; open?: string | null }
  }
  message?: string | null
  name?: string | null
  slogan?: string | null
  social: {
    facebook?: string | null
    instagram?: string | null
    onlyfans?: string | null
  }
  tagline?: string | null
}

const getPayloadClient = cache(async () => getPayload({ config: configPromise }))

type MediaSizeKey = 'card' | 'desktop' | 'tablet' | 'thumbnail'
const PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '')

const normalizeMediaURL = (rawURL: string) => {
  if (!rawURL) return null

  if (!rawURL.startsWith('http://') && !rawURL.startsWith('https://')) {
    return rawURL.startsWith('/') ? rawURL : `/${rawURL}`
  }

  try {
    const parsed = new URL(rawURL)
    const isLocalhost = ['localhost', '127.0.0.1', '0.0.0.0'].includes(parsed.hostname)

    if (isLocalhost) {
      if (PUBLIC_SERVER_URL) {
        return `${PUBLIC_SERVER_URL}${parsed.pathname}${parsed.search}${parsed.hash}`
      }

      return `${parsed.pathname}${parsed.search}${parsed.hash}`
    }

    return rawURL
  } catch {
    return rawURL
  }
}

const toMediaURL = (media: number | Media | null | undefined, size?: MediaSizeKey) => {
  if (!media || typeof media !== 'object') return null
  const mediaDoc = media as Media

  const sizedURL = size ? mediaDoc.sizes?.[size]?.url : null
  const rawURL = sizedURL || mediaDoc.url

  if (!rawURL) return null
  return normalizeMediaURL(rawURL)
}

const todayISO = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const formatEvent = (event: Event): FrontendEvent => {
  const imageToUse = event.image || event.facebookCover

  return {
    date: event.date,
    description: undefined,
    facebookLink: event.facebookLink || null,
    hasOfficialPoster: !!event.image && typeof event.image === 'object',
    id: event.slug || event.id,
    image: toMediaURL(imageToUse, 'desktop') || null,
    time: event.time || null,
    title: event.title,
  }
}

// ── Fallback covers depuis Supabase `concerts` (source de vérité EPK) ──
// Le CMS Payload n'a souvent NI `image` NI `facebookCover` peuplé (events créés
// hors importateur FB). Or Supabase `concerts` porte déjà `cover_safe_url` (recadrage
// visage-safe) pour la quasi-totalité des concerts confirmés. Sans ce repli, le
// carrousel affiche des cartes grises (signalé par Cédric 2026-07-29).
// Projet EPK distinct de la base du CMS ; l'anon key est publique par conception
// (rôle anon, exposée côté client — même clé que le pipeline TV labrassee-scripts).
const CONCERTS_SUPABASE_URL =
  process.env.CONCERTS_SUPABASE_URL || 'https://xjlpttrziisldlclhsth.supabase.co'
const CONCERTS_ANON_KEY =
  process.env.CONCERTS_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbHB0dHJ6aWlzbGRsY2xoc3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjkyODMsImV4cCI6MjA5MjA0NTI4M30.JpkTnJF1ZP08ybzFdM8fFUJOTiKYx8ltTe2nxiDPk24'

type ConcertCover = { titre: string; cover: string }

const coverWords = (s: string) =>
  new Set(
    (s || '')
      .toLowerCase()
      .replace(/[—–\-_·•]+/g, ' ')
      .match(/[\p{L}\p{N}]{3,}/gu) || [],
  )

const coverScore = (a: string, b: string) => {
  const wa = coverWords(a)
  const wb = coverWords(b)
  if (wa.size === 0 || wb.size === 0) return 0
  let inter = 0
  for (const w of wa) if (wb.has(w)) inter += 1
  return inter / (wa.size + wb.size - inter)
}

const fetchConcertCoversByDate = async (): Promise<Map<string, ConcertCover[]>> => {
  const map = new Map<string, ConcertCover[]>()
  try {
    const today = todayISO()
    const url =
      `${CONCERTS_SUPABASE_URL}/rest/v1/concerts?date_show=gte.${today}` +
      `&statut=eq.confirme&or=(cover_safe_url.not.is.null,cover_image_url.not.is.null)` +
      `&select=date_show,titre_show,cover_safe_url,cover_image_url`
    const res = await fetch(url, {
      headers: { apikey: CONCERTS_ANON_KEY, Authorization: `Bearer ${CONCERTS_ANON_KEY}` },
      next: { revalidate: 300 },
    })
    if (!res.ok) return map
    const rows: Array<{
      date_show: string
      titre_show: string
      cover_safe_url: string | null
      cover_image_url: string | null
    }> = await res.json()
    for (const r of rows) {
      const cover = r.cover_safe_url || r.cover_image_url
      if (!cover) continue
      const list = map.get(r.date_show) || []
      list.push({ titre: r.titre_show || '', cover })
      map.set(r.date_show, list)
    }
  } catch {
    // Repli silencieux : sans covers Supabase, le carrousel garde son comportement actuel.
  }
  return map
}

// Pour chaque event sans image, tente d'attacher la cover Supabase du même jour
// (match direct si un seul concert ce jour-là, sinon meilleur score de titre).
const applyConcertCoverFallback = async (events: FrontendEvent[]): Promise<void> => {
  const missing = events.filter((e) => !e.image)
  if (missing.length === 0) return
  const byDate = await fetchConcertCoversByDate()
  if (byDate.size === 0) return
  for (const ev of missing) {
    const day = (ev.date || '').slice(0, 10)
    const candidates = byDate.get(day)
    if (!candidates || candidates.length === 0) continue
    let best = candidates[0]
    if (candidates.length > 1) {
      let bestScore = -1
      for (const c of candidates) {
        const s = coverScore(ev.title, c.titre)
        if (s > bestScore) {
          bestScore = s
          best = c
        }
      }
    }
    ev.image = best.cover
  }
}

const formatMenuItem = (item: MenuItem): FrontendMenuItem => ({
  description: item.description,
  id: item.slug || item.id,
  image: toMediaURL(item.image, 'card') || null,
  order: item.order,
  title: item.title,
})

const businessHours: FrontendBusinessInfo['hours'] = {
  lundi: {
    close: '21h30',
    open: '9h00',
  },
  'mardi-mercredi': {
    close: '19h00',
    open: '9h00',
  },
  'jeudi-vendredi-samedi': {
    close: '21h30',
    open: '9h00',
  },
  dimanche: {
    close: '19h00',
    open: '9h00',
  },
}

const formatBusinessInfo = (info: BusinessInfo): FrontendBusinessInfo => ({
  address: {
    googleMapsLink: info.address?.googleMapsLink,
    neighborhood: info.address?.neighborhood,
    street: info.address?.street,
  },
  contact: {
    artists: info.contact?.artists,
    exhibitions: info.contact?.exhibitions,
    general: info.contact?.general,
  },
  hours: businessHours,
  message: info.message,
  name: info.name,
  slogan: info.slogan,
  social: {
    facebook: info.social?.facebook,
    instagram: info.social?.instagram,
    onlyfans: info.social?.onlyfans,
  },
  tagline: info.tagline,
})

export const getBusinessInfoData = cache(async (): Promise<FrontendBusinessInfo> => {
  try {
    const payload = await getPayloadClient()
    const info = await payload.findGlobal({
      slug: 'business-info',
    })

    return formatBusinessInfo(info)
  } catch {
    return fallbackBusinessInfo as FrontendBusinessInfo
  }
})

export const getUpcomingEventsData = cache(async (limit = 50): Promise<FrontendEvent[]> => {
  try {
    const payload = await getPayloadClient()
    const response = await payload.find({
      collection: 'events',
      depth: 1,
      limit,
      overrideAccess: false,
      sort: 'date',
      where: {
        and: [
          { status: { equals: 'published' } },
          { date: { greater_than_equal: todayISO() } },
        ],
      },
    })

    const events = response.docs.map(formatEvent)
    await applyConcertCoverFallback(events)
    return events
  } catch {
    return getFallbackUpcomingEvents().slice(0, limit).map((event) => ({
      date: event.date,
      facebookLink: event.facebookLink || null,
      hasOfficialPoster: true,
      id: event.id,
      image: event.image || null,
      time: event.time || null,
      title: event.title,
    }))
  }
})

export const getMenuItemsData = cache(async (): Promise<FrontendMenuItem[]> => {
  try {
    const payload = await getPayloadClient()
    const response = await payload.find({
      collection: 'menu-items',
      depth: 1,
      limit: 100,
      overrideAccess: false,
      sort: 'order',
      where: {
        status: {
          equals: 'published',
        },
      },
    })

    return response.docs.map(formatMenuItem)
  } catch {
    return [...fallbackMenuItems]
  }
})

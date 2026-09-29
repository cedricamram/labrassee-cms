import type { MetadataRoute } from 'next'

import { getIdsArtistesAvecConcertAVenir } from '@/frontend/lib/surlascene-artiste'

export const revalidate = 3600

// 2026-09-29 : /sitemap.xml répondait 404. Pages publiques seulement :
// /comptoir est retiré (404) et /desabonnement n'a rien à faire dans Google.
const BASE = 'https://www.labrassee.cafe'

const PAGES: Array<{ chemin: string; frequence: MetadataRoute.Sitemap[number]['changeFrequency']; priorite: number }> = [
  { chemin: '/', frequence: 'daily', priorite: 1 },
  { chemin: '/scene', frequence: 'daily', priorite: 0.9 },
  { chemin: '/menu', frequence: 'weekly', priorite: 0.8 },
  { chemin: '/expo', frequence: 'weekly', priorite: 0.7 },
  { chemin: '/boutique', frequence: 'monthly', priorite: 0.5 },
  { chemin: '/proposer', frequence: 'monthly', priorite: 0.5 },
  { chemin: '/proposer/expo', frequence: 'monthly', priorite: 0.4 },
  { chemin: '/proposer/equipement', frequence: 'monthly', priorite: 0.3 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const maintenant = new Date()
  const statiques = PAGES.map((p) => ({
    url: `${BASE}${p.chemin}`,
    lastModified: maintenant,
    changeFrequency: p.frequence,
    priority: p.priorite,
  }))
  // Fiches des artistes qui ont un concert à venir : ce sont elles qui portent
  // le bloc « Event » lu par Google. Un concert passé → la fiche sort d'elle-même.
  const artistes = (await getIdsArtistesAvecConcertAVenir()).map((id) => ({
    url: `${BASE}/scene/${id}`,
    lastModified: maintenant,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  return [...statiques, ...artistes]
}

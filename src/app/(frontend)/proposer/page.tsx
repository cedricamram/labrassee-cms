import React from 'react'
import type { Metadata } from 'next'

import Proposer from '@/frontend/pages/Proposer'
import { getCalendrierMois } from '@/frontend/lib/dates-libres'

export const metadata: Metadata = {
  title: 'Viens te faire voir — La Brassée',
  description:
    "Tu veux exposer aux murs ou jouer sur notre scène ? Modes d'emploi, calendrier des dates libres et contact pour les artistes invité·e·s.",
}

// Le calendrier bouge à chaque nouveau concert ajouté (sync Apple → Supabase
// toutes les 2h). Regen 1h pour rester frais sans flooder.
export const revalidate = 3600

export default async function ProposerPage() {
  // Jusqu'à la fin juillet 2027 (Cédric, 25/11/2026 10h23 : « ouvre jusque juillet ») : même borne que les dépôts
  // scène et pages et que la RPC reserver_date_scene. Calculé, pas écrit en dur : avec « 8 », le calendrier montrait
  // des cases LIBRE que les formulaires refusaient (client mystère du 25/11).
  const now = new Date()
  const nMois = Math.max(3, (2027 - now.getFullYear()) * 12 + (6 - now.getMonth()) + 1)
  const moisCalendrier = await getCalendrierMois(nMois)
  return <Proposer moisCalendrier={moisCalendrier} />
}

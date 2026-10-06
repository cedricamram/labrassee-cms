import React from 'react'
import type { Metadata } from 'next'

import SceneCommentCaMarche from '@/frontend/components/scene/SceneCommentCaMarche'
import SceneAgenda from '@/frontend/components/scene/SceneAgenda'
import { getSceneAgendaShows } from '@/frontend/lib/payload-data'

export const metadata: Metadata = {
  title: 'Les événements — La Brassée',
  description:
    "Concerts, impro, jams et soirées de quartier à La Brassée, plusieurs soirs par semaine. Entrée libre, sans réservation, dès 19 h 30.",
}

// La BD Surlascène est sync 2h depuis le calendrier Apple → regen 5 min suffit
export const revalidate = 300

// Note (2026-05-16) : le dossier technique a été retiré de /scene — il est
// réservé aux artistes qui veulent réserver une date (envoyé en lien personnel
// via le formulaire EPK token-gated, ou disponible sur /proposer).

export default async function ScenePage() {
  const shows = await getSceneAgendaShows(40)

  return (
    <main style={{ width: '100%', background: 'var(--color-dark)' }}>
      {/* 05/10/2026, Cédric : « elle doit parler aux gens qui veulent connaître la
          programmation. pas aux artistes ». L'agenda est le premier écran. Le
          discours aux artistes (en-tête, conditions, candidature) vit dans
          l'onglet « Viens te faire voir » (/proposer). */}
      <SceneAgenda shows={shows} />
      <SceneCommentCaMarche />
    </main>
  )
}

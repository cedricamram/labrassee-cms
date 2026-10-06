import React from 'react'

import { getEventsCarousel } from '@/frontend/lib/payload-data'
import { faitsDeLaSemaine } from '@/frontend/data/faits-maison'
import Home from '@/frontend/pages/Home'

export const revalidate = 300

export default async function HomePage() {
  // Stratégie home (2026-05-16) : carousel spotlight = 1 event passé (hier, tronqué
  // à gauche) + 6 events futurs (aujourd'hui focus + 5 prochains). Reversible via
  // chevrons + drag + clavier. Focus initial = premier event futur.
  const { events, initialIndex } = await getEventsCarousel(1, 6)

  // Bande « Ce qu'on ne dit pas assez » : la sélection tourne chaque lundi
  // (Cédric, 13/08 : « fais vivre la première page »). Calculée ICI, au rendu
  // serveur, pour que le serveur et le navigateur affichent la même semaine.
  // Le revalidate=300 ci-dessus suffit à faire basculer la page : au plus cinq
  // minutes après minuit le lundi, sans cron ni déploiement.
  const faits = faitsDeLaSemaine()

  return (
    <Home events={events} initialIndex={initialIndex} faits={faits} />
  )
}

import React from 'react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getArtisteParId, type FicheArtiste } from '@/frontend/lib/surlascene-artiste'
import ArtistePage from './ArtistePage'

// Regen toutes les 5 min (même cadence que le reste de la section /scene)
export const revalidate = 300

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const fiche = await getArtisteParId(slug)
  if (!fiche) {
    return {
      title: 'Artiste introuvable — La Brassée',
    }
  }
  const { artiste } = fiche
  const description = artiste.bio
    ? artiste.bio.slice(0, 160).replace(/\n/g, ' ')
    : `${artiste.nom_artiste} se produit sur la scène de La Brassée, café de quartier à Rosepatrie, Montréal.`

  return {
    title: `${artiste.nom_artiste} — Sur la scène de La Brassée`,
    description,
    openGraph: {
      title: `${artiste.nom_artiste} — La Brassée`,
      description,
      images: fiche.photoUrl ? [{ url: fiche.photoUrl }] : [],
    },
  }
}


// 2026-09-29 — données structurées « Event » pour Google (bloc INVISIBLE : aucun
// changement d'affichage pour le visiteur). Google ne retient que les pages
// consacrées à UN événement : on ne décrit donc que le PROCHAIN concert de
// l'artiste. Entrée libre, aucune billetterie (principe de La Brassée) : prix 0 $.
function decalageMontreal(dateISO: string): string {
  const nom = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Toronto', timeZoneName: 'longOffset' })
    .formatToParts(new Date(`${dateISO}T12:00:00Z`))
    .find((p) => p.type === 'timeZoneName')?.value
  const m = nom?.match(/GMT([+-]\d{2}:\d{2})/)
  return m ? m[1] : '-05:00'
}

function evenementJsonLd(fiche: FicheArtiste, slug: string) {
  const c = fiche.prochaines[0]
  if (!c) return null
  const url = `https://www.labrassee.cafe/scene/${slug}`
  const heure = c.heure_debut ? c.heure_debut.slice(0, 5) : null
  const debut = heure ? `${c.date_show}T${heure}:00${decalageMontreal(c.date_show)}` : c.date_show
  const image = c.cover_safe_url || c.cover_image_url || fiche.photoUrl || 'https://www.labrassee.cafe/images/og/facade-og.jpg'
  const nom = fiche.artiste.nom_artiste
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: c.titre_show || `${nom} — La Brassée`,
    startDate: debut,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    isAccessibleForFree: true,
    description: c.description_publique || fiche.artiste.bio?.slice(0, 300) || `${nom} sur la scène de La Brassée. Entrée libre.`,
    image: [image],
    url,
    location: {
      '@type': 'Place',
      name: 'La Brassée',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2522, rue Beaubien Est',
        addressLocality: 'Montréal',
        addressRegion: 'QC',
        addressCountry: 'CA',
      },
    },
    performer: { '@type': 'PerformingGroup', name: nom },
    organizer: { '@type': 'Organization', name: 'La Brassée', url: 'https://www.labrassee.cafe' },
    offers: {
      '@type': 'Offer',
      price: 0,
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
      url,
    },
  }
}

export default async function ArtisteSlugPage({ params }: Props) {
  const { slug } = await params
  const fiche = await getArtisteParId(slug)
  if (!fiche) notFound()

  const jsonLd = evenementJsonLd(fiche, slug)

  return (
    <main style={{ width: '100%', background: '#100f09' }}>
      {jsonLd && (
        <script
          type="application/ld+json"
          // < échappé : une bio contenant « </script> » ne peut pas fermer la balise.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      )}
      <ArtistePage fiche={fiche} />
    </main>
  )
}

'use client'

import React from 'react'
import styled from 'styled-components'

// Bande « En dedans » — accueil (Apollon, 10/10/2026, GO de Cédric à 7 h 57).
//
// Pourquoi : jusqu'ici l'accueil montrait la scène et les affiches, jamais la
// pièce elle-même. Celui qui cherche un coin pour s'installer ne voyait ni le
// salon ni le comptoir. Photos prises par Cédric le 04/10/2026.
//
// ⚠️ GARDE-FOUS DE CONTENU :
// · On dit « prends ton temps », jamais « un coin silencieux » : des parents
//   viennent avec bébé le matin, le silence ne se promet pas.
// · Aucun prix : sur l'étagère à thés, les étiquettes de prix sont floutées
//   dans le fichier lui-même.
// · Aucune personne identifiable sur ces trois photos. Si on en ajoute une,
//   il faut l'accord écrit de la personne.

const PHOTOS = [
  {
    fichier: 'salon-bibliotheque',
    alt: 'Le salon de La Brassée : canapés de cuir, tables basses, et la grande bibliothèque sous l’enseigne',
    legende: 'Le salon. Des canapés, une bibliothèque, prends ton temps.',
    portrait: true,
  },
  {
    fichier: 'etagere-thes-entre-voisins',
    alt: 'L’étagère à thés en vrac, avec les bouteilles qui écrivent « Entre voisins »',
    legende: 'Le mur à thés. En vrac, à côté de notre café.',
    portrait: true,
  },
  {
    fichier: 'comptoir-futs',
    alt: 'Le comptoir de La Brassée, les tireuses et l’ardoise des bières en fût',
    legende: 'Le comptoir. La bière en fût, la machine à café, et nous.',
    portrait: false,
  },
]

const Bande = styled.section`
  width: 100%;
  background: var(--color-dark-alt);
  padding: 62px 24px 70px;
`

const Titre = styled.h2`
  font-family: var(--font-din-condensed);
  font-size: clamp(26px, 4vw, 40px);
  color: var(--color-brand);
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.02em;
  margin: 0 0 40px;
`

const Grille = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1.6fr;
  gap: 22px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    & > figure:last-child { grid-column: 1 / -1; }
  }

  /* Sur téléphone on garde deux colonnes : en pleine largeur, les deux photos
     verticales prenaient presque deux écrans à elles seules (mesuré 10/10). */
  @media (max-width: 560px) {
    gap: 14px;
    figcaption { font-size: 14px; }
  }
`

const Figure = styled.figure`
  margin: 0;

  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: ${(p) => (p.$portrait ? '3 / 4' : '4 / 3')};
    object-fit: cover;
    border-radius: 6px;
    background: var(--color-dark);
  }

  figcaption {
    font-family: var(--font-acumin);
    font-size: 16px;
    line-height: 1.4;
    color: var(--color-accent);
    margin-top: 12px;
  }
`

export default function Interieur() {
  return (
    <Bande aria-labelledby="titre-interieur">
      <Titre id="titre-interieur">En dedans</Titre>
      <Grille>
        {PHOTOS.map((p) => (
          <Figure key={p.fichier} $portrait={p.portrait}>
            <img
              src={`/images/interieur/${p.fichier}.jpg`}
              srcSet={`/images/interieur/${p.fichier}-m.jpg 640w, /images/interieur/${p.fichier}.jpg 1200w`}
              sizes={p.portrait ? "(max-width: 900px) 50vw, 400px" : "(max-width: 900px) 100vw, 640px"}
              alt={p.alt}
              width={p.portrait ? 900 : 1200}
              height={p.portrait ? 1200 : 900}
              loading="lazy"
              decoding="async"
            />
            <figcaption>{p.legende}</figcaption>
          </Figure>
        ))}
      </Grille>
    </Bande>
  )
}

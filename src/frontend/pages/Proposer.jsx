'use client'

import React from 'react'
import ProposerHero from '../components/proposer/ProposerHero'
import ProposerCards from '../components/proposer/ProposerCards'
import ProposerCalendrier from '../components/proposer/ProposerCalendrier'

/** @typedef {import('../lib/dates-libres').MoisCalendrier} MoisCalendrier */

// Note (2026-05-17) :
//  - ProposerProgrammation séparée → retirée, intégrée dans ProposerCalendrier
//    (mini-rappel LigneDirectrice au-dessus de chaque mois)
//  - ProposerDossierTech « Pick what you need » → déplacé vers la route
//    `/proposer/equipement` en LECTURE SEULE. La sélection effective du
//    matériel se fera au dépôt définitif (lien token personnel envoyé par
//    Cédric après acceptation de la candidature).

/**
 * @param {{ moisCalendrier?: MoisCalendrier[] }} props
 */
const Proposer = ({ moisCalendrier = [] }) => {
  return (
    <div style={{ width: '100%', background: 'var(--color-dark)' }}>
      <ProposerHero />
      {/* Le calendrier passe AVANT les cartes (Cédric, 2026-08-10) : la première
          question d'un artiste est « quand puis-je jouer ? », et la grille de la
          semaine l'oriente vers le soir où sa formule a le plus de chances. */}
      <ProposerCalendrier mois={moisCalendrier} />
      <ProposerCards />
    </div>
  )
}

export default Proposer

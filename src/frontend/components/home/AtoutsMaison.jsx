'use client'

import React from 'react'
import styled from 'styled-components'

import { faitsDeLaSemaine } from '../../data/faits-maison'

// Bande de faits — accueil (Apollon, 13/08/2026).
//
// Historique en deux temps, et la leçon est dans le deuxième :
// 1. Première version : 7 cartes de texte, 1889 caractères sur l'accueil.
//    Cédric : « trop de textes sur la première page, pas assez visuel. »
// 2. J'ai tout enlevé — 8 chiffres nus, zéro phrase. Cédric : « tu passes
//    encore une fois du noir au blanc, aucune nuance. En nuançant tu vas
//    pouvoir mettre quelques phrases clés. »
// D'où cette version HIÉRARCHISÉE : deux blocs qui portent une histoire
// (la buanderie, le fait-maison — deux phrases chacun, pas trois paragraphes)
// puis une bande de chiffres pour les faits qui n'ont pas besoin de récit.
// La règle qui en sort : doser, pas basculer.
//
// ⚠️ GARDE-FOUS DE CONTENU (chaque ligne a coûté une correction de Cédric) :
// · Le « 100 % » ne vaut QUE pour les PÂTISSERIES. Le salé n'est pas maison —
//   les quiches viennent de Carrément Tarte (Saint-Michel). Ne jamais étendre.
// · Les confitures du Roti ne sont PAS maison (Cédric, 02/07).
// · Le Roti est précuit puis congelé, grillé à la commande — jamais
//   « cuit le matin » ni « sorti du four » (Cédric, 13/08).
// · Les gâteaux entiers sont SUSPENDUS jusqu'à l'hiver (retour quand les
//   smoothies s'arrêtent). Ne pas les remettre sans le dire à Cédric.
// · Aucun superlatif de vente ici sans requête sur la catégorie ENTIÈRE :
//   le « brownie le plus vendu » était faux, il est 9e sur 16.
//
// Le récit des machines de la buanderie (« elles ont vu passer les garde-robes
// du bébé à l'adulte ») est trop bon pour être perdu — il attend sa page.

const Bande = styled.section`
  width: 100%;
  background: var(--color-dark);
  padding: 66px 24px 76px;
`

const Cadre = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`

const Titre = styled.h2`
  font-family: var(--font-din-condensed);
  font-size: clamp(26px, 4vw, 40px);
  color: var(--color-brand);
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.02em;
  margin: 0 0 46px;
`

const Recits = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin-bottom: 62px;

  @media (max-width: 834px) {
    grid-template-columns: 1fr;
    gap: 34px;
    margin-bottom: 48px;
  }
`

const Recit = styled.div`
  border-left: 2px solid var(--color-brand);
  padding-left: 22px;
`

const RecitTitre = styled.h3`
  font-family: var(--font-din-condensed);
  font-size: clamp(19px, 2.4vw, 24px);
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin: 0 0 12px;
`

const Phrase = styled.p`
  font-family: var(--font-acumin);
  font-size: clamp(17px, 2.1vw, 20px);
  line-height: 1.45;
  color: var(--color-brand);
  margin: 0 0 10px;
`

const Suite = styled.p`
  font-family: var(--font-acumin);
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--color-accent);
  margin: 0;
`

const Grille = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 34px 22px;
  border-top: 1px solid rgba(205, 196, 157, 0.16);
  padding-top: 46px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 560px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Pastille = styled.div`
  text-align: center;
`

const Chiffre = styled.div`
  font-family: var(--font-din-condensed);
  font-size: clamp(32px, 4vw, 44px);
  line-height: 1;
  color: var(--color-brand);
  margin-bottom: 9px;
`

const Legende = styled.div`
  font-family: var(--font-acumin);
  font-size: 13.5px;
  line-height: 1.45;
  color: var(--color-accent);
  max-width: 165px;
  margin: 0 auto;
`

/**
 * La sélection tourne chaque lundi (idée de Cédric, 13/08 : « fais vivre la
 * première page »). Elle est calculée CÔTÉ SERVEUR et passée en props : si on
 * la calculait ici, le serveur et le navigateur pourraient tomber sur deux
 * semaines différentes au passage de minuit et l'affichage sauterait.
 * Le repli sert au rendu isolé (tests, Storybook) — en production, page.tsx
 * fournit toujours la sélection.
 *
 * @param {{ faits?: ReturnType<typeof faitsDeLaSemaine> }} props
 */
const AtoutsMaison = ({ faits }) => {
  const { recits, chiffres } = faits || faitsDeLaSemaine()

  return (
  <Bande>
    <Cadre>
      <Titre>Ce qu&apos;on ne dit pas assez</Titre>
      <Recits>
        {recits.map((r) => (
          <Recit key={r.titre}>
            <RecitTitre>{r.titre}</RecitTitre>
            <Phrase>{r.phrase}</Phrase>
            <Suite>{r.suite}</Suite>
          </Recit>
        ))}
      </Recits>
      <Grille>
        {chiffres.map((f) => (
          <Pastille key={f.chiffre}>
            <Chiffre>{f.chiffre}</Chiffre>
            <Legende>{f.legende}</Legende>
          </Pastille>
        ))}
      </Grille>
    </Cadre>
  </Bande>
  )
}

export default AtoutsMaison

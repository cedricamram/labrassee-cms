'use client'

import React from 'react'
import styled from 'styled-components'

// Bande de faits — accueil (Apollon, 13/08/2026).
//
// Historique : première version en 7 cartes de texte (1889 caractères sur
// l'accueil). Cédric, 13/08 : « trop de textes sur la première page, pas assez
// visuel. » Il avait raison — c'était un article, pas une vitrine. Réécrit en
// pastilles chiffrées : le chiffre porte, la légende tient sur une ligne.
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

const Grille = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 44px 30px;

  @media (max-width: 834px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 38px 22px;
  }
`

const Pastille = styled.div`
  text-align: center;
`

const Chiffre = styled.div`
  font-family: var(--font-din-condensed);
  font-size: clamp(38px, 5.4vw, 58px);
  line-height: 1;
  color: var(--color-brand);
  margin-bottom: 9px;
`

const Legende = styled.div`
  font-family: var(--font-acumin);
  font-size: 14.5px;
  line-height: 1.45;
  color: var(--color-accent);
  max-width: 180px;
  margin: 0 auto;
`

const FAITS = [
  { chiffre: '100 %', legende: 'de nos pâtisseries sont faites ici' },
  { chiffre: '0 $', legende: 'de supplément sur les laits végétaux' },
  { chiffre: '40 ¢', legende: 'de moins si vous apportez votre tasse' },
  { chiffre: '32', legende: 'thés et tisanes vendus au poids' },
  { chiffre: '2,50 $', legende: 'la brassée, à notre buanderie' },
  { chiffre: '7 / 7', legende: 'point de cueillette Lufa' },
  { chiffre: 'À table', legende: 'on prend la commande et on vous sert' },
  { chiffre: 'Végé', legende: 'végane et sans gluten, tous les jours' },
]

const AtoutsMaison = () => (
  <Bande>
    <Cadre>
      <Titre>Ce qu&apos;on ne dit pas assez</Titre>
      <Grille>
        {FAITS.map((f) => (
          <Pastille key={f.chiffre}>
            <Chiffre>{f.chiffre}</Chiffre>
            <Legende>{f.legende}</Legende>
          </Pastille>
        ))}
      </Grille>
    </Cadre>
  </Bande>
)

export default AtoutsMaison

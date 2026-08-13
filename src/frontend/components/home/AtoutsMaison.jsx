'use client'

import React from 'react'
import styled from 'styled-components'

// Atouts maison — accueil (Apollon, 13/08/2026).
//
// Quatre faits vrais que le site ne disait NULLE PART, alors qu'ils sont
// notre différence réelle dans le quartier. Constat de Cédric : « plein
// d'infos sur lesquelles nous ne communiquons pas ».
//
// Garde-fous gravés :
// · Les confitures du Roti ne sont PAS maison — ne jamais l'écrire (Cédric, 02/07).
// · Le Roti est pétri, levé et cuit ici, mais PRÉCUIT PUIS CONGELÉ (Cédric,
//   13/08) — il est grillé à la commande, PAS cuit le matin. Ne jamais écrire
//   « cuit le matin » / « sorti du four ». Le fait maison porte sur la
//   fabrication, pas sur une cuisson minute.
// · Le SALÉ n'est pas maison : les quiches viennent de Carrément Tarte
//   (Saint-Michel), Cédric 13/08. Le « cent pour cent » ne vaut QUE pour les
//   pâtisseries. Ne jamais l'étendre à la cuisine salée.
// · Aucun nombre de buanderies annoncé tant que « 2 buanderies » n'est pas levé.
// · Prix taxes incluses, conformes au menu papier.

const Section = styled.section`
  width: 100%;
  padding: 70px 24px 20px;
  background: var(--color-dark);
`

const Cadre = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`

const Intro = styled.h2`
  font-family: var(--font-din-condensed);
  font-size: clamp(28px, 4.6vw, 44px);
  color: var(--color-brand);
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 10px;
`

const SousIntro = styled.p`
  font-family: var(--font-acumin);
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-accent);
  text-align: center;
  max-width: 560px;
  margin: 0 auto 44px;
`

const Grille = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;

  @media (max-width: 834px) {
    grid-template-columns: 1fr;
  }
`

const Carte = styled.article`
  background: var(--color-dark-alt);
  border: 1px solid rgba(205, 196, 157, 0.16);
  border-radius: 6px;
  padding: 28px 26px 26px;
  display: flex;
  flex-direction: column;
`

const CarteLarge = styled(Carte)`
  grid-column: 1 / -1;

  @media (max-width: 834px) {
    grid-column: auto;
  }
`

const Titre = styled.h3`
  font-family: var(--font-din-condensed);
  font-size: clamp(21px, 2.6vw, 27px);
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin: 0 0 12px;
`

const Texte = styled.p`
  font-family: var(--font-acumin);
  font-size: 16px;
  line-height: 1.68;
  color: var(--color-accent);
  margin: 0 0 12px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Fort = styled.strong`
  color: var(--color-white);
  font-weight: 600;
`

const Tarifs = styled.p`
  font-family: var(--font-acumin);
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-white);
  border-top: 1px solid rgba(205, 196, 157, 0.18);
  margin: 18px 0 0;
  padding-top: 14px;
`

const Montant = styled.span`
  font-family: var(--font-din-condensed);
  font-size: 19px;
  color: var(--color-brand);
`

const AtoutsMaison = () => (
  <Section>
    <Cadre>
      <Intro>Ce qu&apos;on ne dit pas assez</Intro>
      <SousIntro>
        Cinq choses qu&apos;on fait ici et qui ne se font pas partout.
      </SousIntro>

      <Grille>
        <Carte>
          <Titre>On lave aussi votre linge</Titre>
          <Texte>
            Oui, La Brassée est un café. C&apos;est aussi une buanderie, au
            2522 Beaubien Est.
          </Texte>
          <Texte>
            Nos machines ne sont plus jeunes. On les répare plutôt que de les
            remplacer, et on les pousse jusqu&apos;au bout. Elles ont vu passer
            des années de linge — et des garde-robes entières, du bébé à
            l&apos;adulte.
          </Texte>
          <Texte>
            Le temps d&apos;une brassée, prenez un café. Un vrai, servi à table.
          </Texte>
          <Tarifs>
            Lavage <Montant>2,50 $ à 3,50 $</Montant> selon la taille de la
            machine et la température.
            <br />
            Séchage <Montant>25 sous</Montant> pour 4 minutes.
          </Tarifs>
        </Carte>

        <Carte>
          <Titre>Cent pour cent de nos pâtisseries sont faites ici</Titre>
          <Texte>
            <Fort>Toutes. Sans exception.</Fort> Le pain du Roti, on le pétrit,
            on le laisse lever et on le cuit dans notre cuisine — puis on le
            grille à la commande. La limonade aussi&nbsp;: un concentré maison,
            trente citrons et neuf oranges par bidon.
          </Texte>
          <Texte>
            Le salé, c&apos;est autre chose. Nos quiches viennent de Carrément
            Tarte, dans Saint-Michel. <Fort>On préfère le dire.</Fort>
          </Texte>
        </Carte>

        <Carte>
          <Titre>Les laits végétaux ne coûtent pas un sou de plus</Titre>
          <Texte>
            Avoine, amande, coco, soya&nbsp;: <Fort>aucun supplément</Fort>.
            Jamais. Le décaféiné non plus.
          </Texte>
          <Texte>
            Ailleurs, c&apos;est soixante-quinze sous de plus par tasse. Chez
            nous, votre latté à l&apos;avoine coûte le prix d&apos;un latté.
          </Texte>
        </Carte>

        <Carte>
          <Titre>Asseyez-vous, on vient à vous</Titre>
          <Texte>
            Pas de file au comptoir, pas de plateau à rapporter. On prend votre
            commande à table et on vous l&apos;apporte.
          </Texte>
          <Texte>
            Même une canette&nbsp;: on l&apos;ouvre devant vous et on la verse
            dans un verre, sur glace, avec une paille.
          </Texte>
        </Carte>
        <CarteLarge>
          <Titre>Votre panier Lufa vous attend ici</Titre>
          <Texte>
            On est un point de cueillette Lufa — et on est ouverts{' '}
            <Fort>sept jours sur sept</Fort>. Votre panier vous attend quand ça
            vous adonne, pas quand ça adonne à un horaire.
          </Texte>
        </CarteLarge>
      </Grille>
    </Cadre>
  </Section>
)

export default AtoutsMaison

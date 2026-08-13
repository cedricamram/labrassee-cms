'use client'

import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { MENU_SALE, MENU_BOISSONS_CHAUDES } from '../../data/menu-texte'

// Menu en TEXTE, sous le feuilletage d'images (option A validée par Cédric
// le 13/08/2026 : « on garde le feuilletage, on ajoute le texte dessous »).
//
// Pourquoi : le feuilletage est beau et imite l'objet papier, mais Google
// n'en lit pas un mot et les lecteurs d'écran non plus. Personne ne pouvait
// chercher « grilled cheese Rosemont » et nous trouver.
//
// Données : `src/frontend/data/menu-texte.js`, extrait du menu papier.

const Bloc = styled.section`
  width: 100%;
  background: var(--color-dark);
  padding: 20px 24px 90px;
`

const Cadre = styled.div`
  max-width: 860px;
  margin: 0 auto;
`

const Entree = styled.div`
  text-align: center;
  border-top: 1px solid rgba(205, 196, 157, 0.2);
  padding-top: 46px;
  margin-bottom: 40px;
`

const GrandTitre = styled.h2`
  font-family: var(--font-din-condensed);
  font-size: clamp(26px, 4vw, 38px);
  color: var(--color-brand);
  text-transform: uppercase;
  margin: 0 0 8px;
`

const Chapeau = styled.p`
  font-family: var(--font-acumin);
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--color-accent);
  max-width: 560px;
  margin: 0 auto;
`

const Partie = styled.h3`
  font-family: var(--font-din-condensed);
  font-size: clamp(22px, 3.2vw, 30px);
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin: 52px 0 4px;
`

const Famille = styled.h4`
  font-family: var(--font-din-condensed);
  font-size: 19px;
  color: var(--color-brand);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 32px 0 0;
`

const Note = styled.p`
  font-family: var(--font-acumin);
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-accent);
  margin: 8px 0 0;
`

const Liste = styled.ul`
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
  border-top: 1px solid rgba(205, 196, 157, 0.2);
`

const Ligne = styled.li`
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 14px 2px;
  border-bottom: 1px solid rgba(205, 196, 157, 0.2);
`

const Nom = styled.span`
  font-family: var(--font-acumin);
  font-size: 16.5px;
  color: var(--color-white);
  flex: 0 1 auto;
`

const Etiquette = styled.em`
  font-style: normal;
  font-family: var(--font-acumin);
  font-size: 11.5px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-dark);
  background: var(--color-brand);
  border-radius: 3px;
  padding: 2px 7px;
  margin-left: 9px;
  white-space: nowrap;
`

const Detail = styled.span`
  display: block;
  font-family: var(--font-acumin);
  font-size: 13.5px;
  line-height: 1.5;
  color: var(--color-accent);
  margin-top: 3px;
`

const Pointilles = styled.span`
  flex: 1 1 auto;
  border-bottom: 1px dotted rgba(205, 196, 157, 0.38);
  transform: translateY(-4px);
  min-width: 18px;
`

const Prix = styled.span`
  font-family: var(--font-din-condensed);
  font-size: 20px;
  color: var(--color-brand);
  white-space: nowrap;
`

const Renvoi = styled.p`
  font-family: var(--font-acumin);
  font-size: 15px;
  line-height: 1.65;
  color: var(--color-accent);
  margin: 26px 0 0;

  a {
    color: var(--color-brand);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`

const Pied = styled.p`
  font-family: var(--font-acumin);
  font-size: 13px;
  color: var(--color-accent);
  text-align: center;
  margin: 54px 0 0;
`

/** Une entrée de menu : nom, étiquette, précision, prix. */
const Item = ({ nom, tag, detail, compo, prix }) => (
  <Ligne>
    <Nom>
      {nom}
      {tag ? <Etiquette>{tag}</Etiquette> : null}
      {compo || detail ? <Detail>{compo || detail}</Detail> : null}
    </Nom>
    <Pointilles aria-hidden="true" />
    {prix ? <Prix>{prix}</Prix> : null}
  </Ligne>
)

const MenuTexte = () => {
  const bc = MENU_BOISSONS_CHAUDES
  const platsDuJour = MENU_SALE.sections[0]

  return (
    <Bloc>
      <Cadre>
        <Entree>
          <GrandTitre>Le menu, en toutes lettres</GrandTitre>
          <Chapeau>
            Le même menu que ci-dessus, écrit — pour le lire au calme, le
            chercher, ou l&apos;entendre. Tous les prix sont taxes incluses.
          </Chapeau>
        </Entree>

        <Partie>{bc.titre}</Partie>
        <Note>{bc.chapeau}</Note>

        <Famille>{bc.cafes.titre}</Famille>
        {bc.cafes.notes.map((n) => (
          <Note key={n}>{n}</Note>
        ))}
        <Liste>
          {bc.cafes.items.map((i) => (
            <Item key={i.nom} {...i} />
          ))}
        </Liste>

        <Famille>{bc.lattes.titre}</Famille>
        {bc.lattes.notes.map((n) => (
          <Note key={n}>{n}</Note>
        ))}
        <Liste>
          {bc.lattes.items.map((i) => (
            <Item key={i.nom} {...i} />
          ))}
        </Liste>

        <Famille>{bc.formatsThe.titre}</Famille>
        <Note>{bc.formatsThe.note}</Note>
        <Liste>
          {bc.formatsThe.items.map((i) => (
            <Item key={i.nom} {...i} />
          ))}
        </Liste>
        <Renvoi>
          Trente-deux thés et tisanes, choisis avec Un Amour des Thés. Ils sont
          tous <Link href="/boutique">disponibles en vrac</Link>, au poids.
        </Renvoi>

        <Famille>{bc.extras.titre}</Famille>
        <Liste>
          {bc.extras.items.map((i) => (
            <Item key={i.nom} {...i} />
          ))}
        </Liste>

        <Partie>{MENU_SALE.titre}</Partie>
        <Note>{MENU_SALE.chapeau}</Note>

        <Famille>{platsDuJour.titre}</Famille>
        <Note>{platsDuJour.note}</Note>
        <Note>{platsDuJour.accompagnement}</Note>
        <Liste>
          {platsDuJour.jours.map((j) => (
            <Ligne key={j.jour}>
              <Nom>
                {j.jour}
                <Detail>
                  {j.viande}
                  {j.vege ? ` — Végé : ${j.vege}` : ''}
                </Detail>
              </Nom>
            </Ligne>
          ))}
        </Liste>

        <Famille>{MENU_SALE.grilledCheese.titre}</Famille>
        <Note>{MENU_SALE.grilledCheese.accompagnement}</Note>
        <Liste>
          {MENU_SALE.grilledCheese.items.map((i) => (
            <Item key={i.nom} {...i} />
          ))}
        </Liste>

        <Famille>
          {MENU_SALE.quiches.titre} — {MENU_SALE.quiches.prix}
        </Famille>
        <Note>{MENU_SALE.quiches.accompagnement}</Note>
        <Liste>
          {MENU_SALE.quiches.items.map((i) => (
            <Item key={i.nom} {...i} />
          ))}
        </Liste>

        <Famille>{MENU_SALE.salades.titre}</Famille>
        <Liste>
          {[...MENU_SALE.salades.repas, ...MENU_SALE.salades.demies].map((i) => (
            <Item key={i.nom} {...i} />
          ))}
        </Liste>

        <Famille>{MENU_SALE.nachos.titre}</Famille>
        <Note>{MENU_SALE.nachos.chapeau}</Note>
        <Liste>
          {MENU_SALE.nachos.items.map((i) => (
            <Item key={i.nom} {...i} />
          ))}
        </Liste>

        <Pied>
          Le menu papier fait foi. Si quelque chose diffère, c&apos;est lui qui
          a raison — venez nous le dire, on corrigera.
        </Pied>
      </Cadre>
    </Bloc>
  )
}

export default MenuTexte

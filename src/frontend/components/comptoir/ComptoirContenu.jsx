'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

/**
 * Page « Passe de notre côté du comptoir » — recrutement.
 * Ouvert le 2026-08-23 par Cédric. Cadre : docs/chantiers/2026-08-23_onglet-comptoir.md
 *
 * ⚠️ TOUT le contenu RH de cette page vient d'Hestia (agent équipe), mesuré sur
 * 9 semaines de `shifts` (29 juin → 24 août 2026). Ne PAS le réécrire au feeling :
 * si un besoin change, on redemande à Hestia. C'est une décision de Cédric — la page
 * n'est volontairement PAS branchée en direct sur la base d'équipe (données publiques).
 */

// ── Section salaire : ÉTEINTE PAR DÉCISION DE CÉDRIC (2026-08-23, 17h04).
// Verbatim : « on n'annonce pas le salaire ». Ce n'est PAS un trou à combler, c'est
// un choix. Ne pas rallumer sans un nouveau geste de Cédric.
//
// Contexte de la décision, pour qui relira : le taux général du salaire minimum au
// Québec est 16,60 $/h depuis le 1er mai 2026 (13,30 $ pour les salariés au
// pourboire) — vérifié à la source, communiqué quebec.ca. Cédric avait 16,50 $ en
// tête ; il vérifie l'écart à la prochaine paie. La page n'attend PAS ce résultat.
//
// Pour rallumer un jour : renseigner les deux constantes ci-dessous, la section
// réapparaît telle quelle.
const TAUX_HORAIRE_DEPART = null
const POURBOIRES_FORMULATION = null

const Page = styled.div`
  background: var(--color-dark);
  color: rgba(255, 255, 255, 0.9);
  font-family: var(--font-din);
`

const Section = styled(motion.section)`
  max-width: 860px;
  margin: 0 auto;
  padding: 72px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);

  @media (max-width: 640px) {
    padding: 52px 20px;
  }
`

const Titre2 = styled.h2`
  color: var(--color-brand);
  font-size: clamp(30px, 4.5vw, 52px);
  font-weight: 200;
  letter-spacing: -1px;
  line-height: 1;
  margin: 0 0 28px 0;
  text-wrap: balance;
`

const Texte = styled.p`
  font-size: clamp(16px, 1.6vw, 19px);
  line-height: 1.75;
  color: rgba(255, 255, 255, 0.86);
  margin: 0 0 20px 0;
  max-width: 68ch;
`

const Fort = styled.strong`
  color: #fff;
  font-weight: 500;
`

const Liste = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 22px;
`

const Item = styled.li`
  font-size: clamp(16px, 1.6vw, 19px);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.86);
  padding-left: 22px;
  position: relative;
  max-width: 68ch;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.72em;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--color-brand);
    opacity: 0.85;
  }
`

const Encadre = styled.div`
  border: 1px solid rgba(247, 209, 53, 0.28);
  background: rgba(247, 209, 53, 0.06);
  border-radius: 14px;
  padding: 26px 28px;
  margin-top: 8px;

  @media (max-width: 640px) {
    padding: 20px;
  }
`

const Chapeau = styled.div`
  color: var(--color-brand);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 13px;
  margin-bottom: 12px;
  opacity: 0.95;
`

const apparition = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55 },
}

export default function ComptoirContenu() {
  return (
    <Page>
      {/* ── Ce qu'on cherche en ce moment ─────────────────────────── */}
      <Section {...apparition}>
        <Titre2>Ce qu&apos;on cherche en ce moment</Titre2>
        <Texte>
          <Fort>Une personne pour le comptoir.</Fort> Entre 20 et 25 heures par semaine,
          sur quatre jours. On ne cherche pas un titre — ici, tout le monde fait le café,
          la caisse, la cuisine, les commandes et l&apos;ouverture. On tient le comptoir
          ensemble.
        </Texte>
        <Encadre>
          <Chapeau>Là où on a le plus besoin de toi</Chapeau>
          <Texte style={{ marginBottom: 0 }}>
            <Fort>Les matins</Fort> — le quart commence à <Fort>8 h</Fort>, une heure
            avant qu&apos;on ouvre la porte — et surtout{' '}
            <Fort>le mardi et le mercredi</Fort>. Ce sont nos deux matins les plus
            minces : il n&apos;y a souvent qu&apos;une seule personne au plancher, et
            c&apos;est là que ça tire.
          </Texte>
        </Encadre>
        <Texte style={{ marginTop: 24 }}>
          On n&apos;est pas dans l&apos;urgence — l&apos;horaire tourne. On ouvre la porte
          parce qu&apos;on veut trouver la bonne personne, pas la première. L&apos;idée,
          c&apos;est quelqu&apos;un qui commence en septembre et qui soit à l&apos;aise
          d&apos;ici la fin du mois.
        </Texte>
      </Section>

      {/* ── Ce que c'est vraiment ─────────────────────────────────── */}
      <Section {...apparition}>
        <Titre2>Ce que c&apos;est vraiment</Titre2>
        <Texte>
          Le matin commence à 8 h, sept jours sur sept : une heure à monter la machine
          et sortir le pain avant que la porte s&apos;ouvre à 9 h. Après, c&apos;est du
          monde qui n&apos;a pas encore parlé à personne — ça va vite, c&apos;est debout,
          et la machine ne pardonne pas l&apos;à-peu-près. Mais on te montre&nbsp;:
          personne n&apos;est né en sachant tirer un espresso.
        </Texte>
        <Texte>
          Les soirs de spectacle, la salle se remplit d&apos;un coup et tu passes du café
          au bar en quinze minutes. Le lundi c&apos;est l&apos;impro, toutes les semaines.
          Le jeudi, le vendredi ou le samedi, c&apos;est souvent du jazz.
        </Texte>
        <Texte>
          Tu vas finir tes journées avec mal aux jambes et de la musique dans la tête.
        </Texte>
        <Texte>
          Et il y a des mardis après-midi tranquilles où on jase avec les habitués pendant
          vingt minutes. <Fort>Ça aussi, c&apos;est la job — c&apos;est même la meilleure
          partie.</Fort>
        </Texte>
      </Section>

      {/* ── Ce qu'on cherche chez toi ─────────────────────────────── */}
      <Section {...apparition}>
        <Titre2>Ce qu&apos;on cherche chez toi</Titre2>
        <Liste>
          <Item>
            <Fort>Quelqu&apos;un de fiable.</Fort> Pas parfait — fiable. Tu dis quand tu
            peux, tu viens quand tu l&apos;as dit, et si ça capote tu appelles au lieu de
            disparaître.
          </Item>
          <Item>
            <Fort>Quelqu&apos;un qui regarde autour.</Fort> Le monde qui cherche une
            place, la tasse vide, le collègue dans le jus. Le voir avant qu&apos;on te le
            demande, c&apos;est les trois quarts de la job.
          </Item>
          <Item>
            <Fort>Quelqu&apos;un qui aime le monde.</Fort> On sert des voisins, pas des
            numéros. Il y a des habitués ici dont on connaît la commande et le prénom des
            enfants.
          </Item>
          <Item>
            <Fort>Quelqu&apos;un qui dit quand ça va pas.</Fort> On ne devine pas. Un
            problème dit le mardi, c&apos;est un problème réglé le mercredi.
          </Item>
        </Liste>
        <Texte style={{ marginTop: 28 }}>
          On ne cherche pas quelqu&apos;un qui va « donner 110 % ». On cherche quelqu&apos;un
          qui va <Fort>encore être là dans six mois</Fort>, et qui va être correct avec
          lui-même en attendant.
        </Texte>
      </Section>

      {/* ── L'expérience ──────────────────────────────────────────── */}
      <Section {...apparition}>
        <Titre2>Est-ce qu&apos;il faut de l&apos;expérience&nbsp;?</Titre2>
        <Texte>
          De l&apos;expérience en café ou en restauration, ça aide pour vrai — c&apos;est
          ce qu&apos;on regarde en premier, on va être honnêtes.
        </Texte>
        <Texte>
          Mais ce qui compte le plus, c&apos;est de{' '}
          <Fort>pouvoir tenir le comptoir tout seul un matin</Fort>, une fois qu&apos;on
          t&apos;a montré. Si tu n&apos;as jamais fait ça et que tu sais quand même que tu
          en es capable, écris-nous pareil et dis-nous pourquoi.
        </Texte>
      </Section>

      {/* ── Ce qu'on ne demande pas ───────────────────────────────── */}
      <Section {...apparition}>
        <Titre2>Ce qu&apos;on ne te demande pas</Titre2>
        <Liste>
          <Item>Pas de CV en bonne et due forme. Un formulaire rempli, ça suffit.</Item>
          <Item>Pas de lettre de motivation. On lit tes trois lignes, c&apos;est bien assez.</Item>
          <Item>Pas de latte art de compétition.</Item>
          <Item>
            <Fort>Pas de « disponibilité totale ».</Fort> Dis-nous tes vraies dispos, on
            bâtit l&apos;horaire avec. C&apos;est comme ça qu&apos;on fonctionne avec tout
            le monde ici.
          </Item>
        </Liste>

        <Titre2 style={{ marginTop: 56 }}>Ce qu&apos;on te demande</Titre2>
        <Liste>
          <Item>
            Pouvoir être là à 8 h au moins deux matins par semaine — oui, ça veut dire
            se lever tôt. Le mardi et le mercredi, c&apos;est là qu&apos;on a le plus
            besoin de quelqu&apos;un.
          </Item>
          <Item>Être capable de tenir le comptoir seul un matin, une fois formé.</Item>
          <Item>Parler français couramment.</Item>
          <Item>Avoir 18 ans — on sert de l&apos;alcool.</Item>
          <Item>Pouvoir travailler légalement au Québec.</Item>
        </Liste>
      </Section>

      {/* ── Salaire : affiché seulement si Cédric a donné le taux ─── */}
      {TAUX_HORAIRE_DEPART && (
        <Section {...apparition}>
          <Titre2>Le salaire</Titre2>
          <Texte>
            À partir de <Fort>{TAUX_HORAIRE_DEPART}/h</Fort>
            {POURBOIRES_FORMULATION ? `, ${POURBOIRES_FORMULATION}` : ''}. Si tu arrives
            avec du métier, on paie plus — on en parle.
          </Texte>
        </Section>
      )}

      {/* ── Comment ça se passe ───────────────────────────────────── */}
      <Section {...apparition}>
        <Titre2>Comment ça se passe</Titre2>
        <Texte>
          Tu remplis le formulaire — ça prend cinq minutes. <Fort>On te répond dans les
          sept jours, même si c&apos;est non.</Fort> Une porte ouverte qui ne répond pas,
          c&apos;est pire qu&apos;une porte fermée.
        </Texte>
        <Texte>
          Si ça clique, on te fait venir prendre un café de ce côté-ci du comptoir, et on
          jase.
        </Texte>
      </Section>
    </Page>
  )
}

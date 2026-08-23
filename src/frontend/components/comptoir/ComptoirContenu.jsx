'use client'

import React from 'react'
import styled from 'styled-components'

/**
 * Page « Passe de notre côté du comptoir » — recrutement.
 * Ouvert le 2026-08-23 par Cédric. Cadre : docs/chantiers/2026-08-23_onglet-comptoir.md
 *
 * ⚠️ VERSION COURTE ÉCRITE PAR HESTIA (2026-08-23 17h50), mot pour mot.
 *
 * Retour de Cédric sur la v1 : « trop de texte à lire sur la page ». J'ai d'abord
 * coupé moi-même — Cédric m'a arrêté : « laisse Hestia faire son propre résumé ».
 * Il avait raison : couper le texte d'un autre, c'est encore toucher à son texte.
 * ~410 mots → ~270. Six sections → trois.
 *
 * QUATRE PHRASES QU'ELLE DÉFEND et qu'on ne coupe pas sans la consulter :
 *   1. « mal aux jambes et de la musique dans la tête » — dit à la fois que c'est
 *      physique et que ça vaut la peine.
 *   2. « encore être là dans six mois » — seul endroit où vit la doctrine de Cédric
 *      sur les gens qui ne sont pas des ressources.
 *   3. le paragraphe sur l'expérience, ENTIER — c'est lui qui décide si quelqu'un
 *      ferme l'onglet ou remplit le formulaire.
 *   4. les mardis où on jase avec les habitués — seule ligne qui promet du calme.
 *      Sans elle, la page ne décrit qu'un rush.
 *
 * ⛔ NE JAMAIS mettre ses chiffres internes sur cette page (79 % d'ouvertures en
 * solo, 137 h à une personne, 33/38 % mardi-mercredi). Ça sert à décider, pas à
 * recruter : « on manque de monde 33 % du temps » fait fuir ceux qu'on veut.
 *
 * ⚠️ Le contenu RH vient d'Hestia, mesuré sur 9 semaines de `shifts`
 * (29 juin → 24 août 2026). Si un besoin change, on lui redemande — la page n'est
 * volontairement PAS branchée en direct sur la base d'équipe.
 *
 * ⚠️ AUCUNE ANIMATION D'APPARITION. Un texte dont la visibilité dépend d'une
 * animation est un texte qu'on risque de ne jamais lire.
 */

// ── Le salaire, tranché par Cédric le 2026-08-23 à 17h58 : « il suffit de dire
// salaire minimum + pourboires ».
//
// Pourquoi c'est la bonne forme : aucun chiffre à maintenir, et la phrase reste
// vraie le jour où le taux change. (Contexte : minimum général QC = 16,60 $/h
// depuis le 1er mai 2026, 13,30 $ au pourboire — vérifié à la source.)
//
// ⚠️ CONSÉQUENCE À CONNAÎTRE : en écrivant ça, la page DÉCLARE PUBLIQUEMENT payer
// au moins le minimum légal. Elle doit donc le rester. Cédric vérifie à la
// prochaine paie que le taux appliqué est bien >= 16,60 $ (il avait 16,50 en tête).
//
// « partagés dans l'équipe » est un fait vérifié, pas une promesse de montant.
// ⛔ NE JAMAIS annoncer un montant de pourboires estimé (Hestia) : une bonne
// semaine devient une promesse, une mauvaise devient un mensonge.

const Page = styled.div`
  background: var(--color-dark);
  color: rgba(255, 255, 255, 0.9);
  font-family: var(--font-din);
`

const Section = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 56px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);

  @media (max-width: 640px) {
    padding: 40px 20px;
  }
`

const Titre2 = styled.h2`
  color: var(--color-brand);
  font-size: clamp(28px, 4vw, 46px);
  font-weight: 200;
  letter-spacing: -1px;
  line-height: 1;
  margin: 0 0 22px 0;
  text-wrap: balance;
`

const Texte = styled.p`
  font-size: clamp(16px, 1.55vw, 18.5px);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.86);
  margin: 0 0 16px 0;
  max-width: 64ch;
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
  gap: 13px;
`

const Item = styled.li`
  font-size: clamp(15.5px, 1.5vw, 18px);
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.86);
  padding-left: 20px;
  position: relative;
  max-width: 64ch;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.68em;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-brand);
    opacity: 0.85;
  }
`

const Encadre = styled.div`
  border: 1px solid rgba(247, 209, 53, 0.28);
  background: rgba(247, 209, 53, 0.06);
  border-radius: 14px;
  padding: 22px 26px;
  margin: 4px 0 18px;

  @media (max-width: 640px) {
    padding: 18px;
  }
`

const Colonnes = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`

const Chapeau = styled.div`
  color: var(--color-brand);
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-size: 12.5px;
  margin-bottom: 14px;
  opacity: 0.95;
`

export default function ComptoirContenu() {
  return (
    <Page>
      {/* ── 1. Ce qu'on cherche ────────────────────────────────── */}
      <Section>
        <Titre2>Ce qu&apos;on cherche</Titre2>
        <Texte>
          On cherche <Fort>une personne pour le comptoir</Fort>. Pas de titre : ici, tout
          le monde fait le café, la caisse, la cuisine et les commandes.
        </Texte>
        <Texte>
          <Fort>20 à 25 heures par semaine, sur 4 jours.</Fort>
        </Texte>
        <Encadre>
          <Texte style={{ marginBottom: 0 }}>
            Ce sont les matins qui nous manquent, surtout <Fort>le mardi et le
            mercredi</Fort>. Le quart commence à 8 h, une heure avant qu&apos;on ouvre la
            porte à 9 h — le temps de tout partir avant le premier client.
          </Texte>
        </Encadre>
        <Texte style={{ marginBottom: 0 }}>
          On n&apos;est pas dans l&apos;urgence. On préfère attendre la bonne personne.
        </Texte>
      </Section>

      {/* ── 2. Ce que c'est vraiment ───────────────────────────── */}
      <Section>
        <Titre2>Ce que c&apos;est vraiment</Titre2>
        <Texte>
          On te montre tout — personne n&apos;est né en sachant tirer un espresso. Mais le
          matin va vite, et c&apos;est debout.
        </Texte>
        <Texte>
          Les soirs de spectacle, la salle se remplit d&apos;un coup et tu passes du café
          au bar en quinze minutes. Le lundi, c&apos;est l&apos;impro. Jeudi, vendredi ou
          samedi, souvent du jazz.
        </Texte>
        <Texte style={{ marginBottom: 0 }}>
          Tu vas finir tes journées avec <Fort>mal aux jambes et de la musique dans la
          tête</Fort>. Et il y a des mardis après-midi où on jase vingt minutes avec les
          habitués. Ça aussi, c&apos;est la job.
        </Texte>
      </Section>

      {/* ── 3. Ce qu'on cherche chez toi ───────────────────────── */}
      <Section>
        <Titre2>Ce qu&apos;on cherche chez toi</Titre2>
        <Liste>
          <Item>
            <Fort>Fiable.</Fort> Tu dis quand tu peux, tu viens quand tu l&apos;as dit, et
            si ça capote tu appelles.
          </Item>
          <Item>
            <Fort>Tu regardes autour.</Fort> La tasse vide, le monde qui cherche une
            place, le collègue dans le jus.
          </Item>
          <Item>
            <Fort>Tu aimes le monde.</Fort> On sert des voisins, pas des numéros.
          </Item>
          <Item>
            <Fort>Tu dis quand ça va pas.</Fort> On ne devine pas.
          </Item>
        </Liste>
        <Texte style={{ marginTop: 22 }}>
          On ne cherche pas quelqu&apos;un qui va « donner 110 % ». On cherche
          quelqu&apos;un qui va <Fort>encore être là dans six mois</Fort>, et qui va être
          correct avec lui-même en attendant.
        </Texte>
        <Texte>
          <Fort>On ne demande pas</Fort> de CV en bonne et due forme, ni de lettre de
          motivation, ni de latte art, ni de « disponibilité totale ». Dis-nous tes vraies
          dispos, on bâtit l&apos;horaire avec — c&apos;est comme ça pour tout le monde ici.
        </Texte>
        <Texte>
          <Fort>On demande</Fort> de pouvoir être là à 8 h au moins deux matins par
          semaine, de tenir le comptoir seul un matin une fois formé, d&apos;avoir 18 ans
          parce qu&apos;on sert de l&apos;alcool, et de pouvoir travailler légalement au
          Québec.
        </Texte>
        <Texte style={{ marginBottom: 0 }}>
          De l&apos;expérience en café ou en resto, ça aide pour vrai, et c&apos;est ce
          qu&apos;on regarde en premier. Mais si tu n&apos;en as pas et que tu sais quand
          même que tu en es capable, <Fort>écris-nous</Fort> et dis-nous pourquoi.
        </Texte>
      </Section>

      {/* ── Le salaire ─────────────────────────────────────────── */}
      <Section>
        <Titre2>Le salaire</Titre2>
        <Texte style={{ marginBottom: 0 }}>
          <Fort>Le salaire minimum, plus les pourboires</Fort> — qui sont partagés dans
          l&apos;équipe.
        </Texte>
      </Section>

    </Page>
  )
}

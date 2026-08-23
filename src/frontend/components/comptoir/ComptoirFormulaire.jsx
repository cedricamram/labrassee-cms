'use client'

import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

/**
 * Formulaire de candidature — « Passe de notre côté du comptoir ».
 * Champs spécifiés par Hestia (2026-08-23). NE PAS ajouter de champ sensible :
 * pas de NAS, pas de date de naissance, pas d'adresse, pas de photo.
 * La grille de dispos est LE champ décisif — c'est elle qui dit si la
 * candidature bouche le trou du mardi/mercredi matin.
 */

const JOURS = [
  ['lundi', 'Lundi'],
  ['mardi', 'Mardi'],
  ['mercredi', 'Mercredi'],
  ['jeudi', 'Jeudi'],
  ['vendredi', 'Vendredi'],
  ['samedi', 'Samedi'],
  ['dimanche', 'Dimanche'],
]
const PLAGES = [
  ['matin', 'Matin'],
  ['midi', 'Midi'],
  ['soir', 'Soir'],
]

const Section = styled.section`
  max-width: 860px;
  margin: 0 auto;
  padding: 72px 24px 110px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);

  @media (max-width: 640px) {
    padding: 52px 20px 80px;
  }
`

const Titre2 = styled.h2`
  color: var(--color-brand);
  font-size: clamp(30px, 4.5vw, 52px);
  font-weight: 200;
  letter-spacing: -1px;
  line-height: 1;
  margin: 0 0 14px 0;
`

const SousTitre = styled.p`
  font-size: clamp(15px, 1.5vw, 18px);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 40px 0;
  max-width: 62ch;
`

const Groupe = styled.div`
  margin-bottom: 30px;
`

const Etiquette = styled.label`
  display: block;
  color: rgba(255, 255, 255, 0.92);
  font-size: 15px;
  letter-spacing: 0.5px;
  margin-bottom: 10px;

  .facultatif {
    color: rgba(255, 255, 255, 0.45);
    font-size: 13px;
    margin-left: 8px;
  }
`

const Aide = styled.p`
  color: rgba(255, 255, 255, 0.5);
  font-size: 13.5px;
  line-height: 1.5;
  margin: 8px 0 0 0;
`

const champ = `
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  padding: 13px 15px;
  color: #fff;
  font-family: inherit;
  font-size: 16px;
  transition: border-color 0.2s ease, background 0.2s ease;

  &::placeholder { color: rgba(255,255,255,0.32); }
  &:focus {
    outline: none;
    border-color: rgba(247, 209, 53, 0.65);
    background: rgba(255, 255, 255, 0.06);
  }
`

const Entree = styled.input`${champ}`
const Zone = styled.textarea`
  ${champ}
  min-height: 130px;
  resize: vertical;
  line-height: 1.6;
`

const Duo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`

/* Champ piège pour les robots — invisible, jamais rempli par un humain. */
const Piege = styled.div`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`

const Grille = styled.div`
  display: grid;
  grid-template-columns: minmax(84px, 1fr) repeat(3, minmax(56px, 82px));
  gap: 6px;
  align-items: center;
`

const EnTete = styled.div`
  color: var(--color-brand);
  font-size: 12.5px;
  text-transform: uppercase;
  letter-spacing: 1.6px;
  text-align: center;
  padding-bottom: 6px;
`

const NomJour = styled.div`
  color: rgba(255, 255, 255, 0.82);
  font-size: 14.5px;
  padding-right: 8px;

  @media (max-width: 420px) {
    font-size: 13px;
  }
`

const Case = styled.button.attrs({ type: 'button' })`
  height: 42px;
  border-radius: 9px;
  border: 1px solid ${(p) => (p.$on ? 'var(--color-brand)' : 'rgba(255,255,255,0.14)')};
  background: ${(p) => (p.$on ? 'var(--color-brand)' : 'rgba(255,255,255,0.03)')};
  color: ${(p) => (p.$on ? 'var(--color-dark)' : 'rgba(255,255,255,0.35)')};
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${(p) => (p.$on ? 'var(--color-brand)' : 'rgba(247,209,53,0.5)')};
  }
`

const Choix = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const Bouton = styled.button`
  background: var(--color-brand);
  color: var(--color-dark);
  border: none;
  border-radius: 999px;
  padding: 16px 40px;
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(247, 209, 53, 0.28);
  }
  &:disabled {
    opacity: 0.55;
    cursor: default;
  }
`

const Message = styled.div`
  margin-top: 18px;
  padding: 14px 18px;
  border-radius: 10px;
  font-size: 15px;
  line-height: 1.6;
  border: 1px solid ${(p) => (p.$erreur ? 'rgba(255,120,110,0.45)' : 'rgba(247,209,53,0.4)')};
  background: ${(p) => (p.$erreur ? 'rgba(255,120,110,0.08)' : 'rgba(247,209,53,0.08)')};
  color: ${(p) => (p.$erreur ? 'rgb(255,178,172)' : 'rgba(255,255,255,0.92)')};
`

const Merci = styled(motion.div)`
  border: 1px solid rgba(247, 209, 53, 0.35);
  background: rgba(247, 209, 53, 0.07);
  border-radius: 16px;
  padding: 40px 34px;
  text-align: center;

  h3 {
    color: var(--color-brand);
    font-size: clamp(26px, 3.5vw, 38px);
    font-weight: 200;
    margin: 0 0 14px 0;
  }
  p {
    color: rgba(255, 255, 255, 0.85);
    font-size: 16px;
    line-height: 1.7;
    margin: 0 auto;
    max-width: 52ch;
  }
`

const MentionVie = styled.p`
  color: rgba(255, 255, 255, 0.42);
  font-size: 13px;
  line-height: 1.6;
  margin: 26px 0 0 0;
  max-width: 62ch;
`

export default function ComptoirFormulaire() {
  const [dispos, setDispos] = useState({})
  const [experience, setExperience] = useState(null)
  const [envoi, setEnvoi] = useState(false)
  const [erreur, setErreur] = useState(null)
  const [envoye, setEnvoye] = useState(false)

  const basculer = (jour, plage) => {
    setDispos((prev) => {
      const actuelles = prev[jour] || []
      const suivantes = actuelles.includes(plage)
        ? actuelles.filter((p) => p !== plage)
        : [...actuelles, plage]
      const copie = { ...prev }
      if (suivantes.length) copie[jour] = suivantes
      else delete copie[jour]
      return copie
    })
  }

  const soumettre = async (e) => {
    e.preventDefault()
    setErreur(null)

    const f = new FormData(e.target)
    const charge = {
      prenom: f.get('prenom'),
      nom: f.get('nom'),
      courriel: f.get('courriel'),
      telephone: f.get('telephone'),
      dispos,
      heures_min: f.get('heures_min'),
      heures_max: f.get('heures_max'),
      debut_possible: f.get('debut_possible'),
      experience,
      experience_detail: f.get('experience_detail'),
      presentation: f.get('presentation'),
      source: f.get('source'),
      site_web: f.get('site_web'), // piège
    }

    setEnvoi(true)
    try {
      const res = await fetch('/api/candidature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(charge),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setErreur(data.erreur || "Ça n'a pas passé. Réessaie dans quelques minutes.")
        setEnvoi(false)
        return
      }
      setEnvoye(true)
    } catch {
      setErreur('Pas de réseau, on dirait. Réessaie dans un instant.')
      setEnvoi(false)
    }
  }

  if (envoye) {
    return (
      <Section id="postuler">
        <Merci initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
          <h3>C&apos;est envoyé.</h3>
          <p>
            On a ta candidature. On te répond dans les sept jours, même si c&apos;est non
            — et si tu as laissé ton courriel, tu as déjà reçu une confirmation.
          </p>
        </Merci>
      </Section>
    )
  }

  return (
    <Section id="postuler">
      <Titre2>Écris-nous</Titre2>
      <SousTitre>
        Cinq minutes, pas plus. Le plus important pour nous, ce sont tes disponibilités —
        c&apos;est ce qui nous dit tout de suite si ça peut marcher.
      </SousTitre>

      <form onSubmit={soumettre}>
        <Piege aria-hidden="true">
          <label>
            Ne remplis pas ce champ
            <input name="site_web" type="text" tabIndex={-1} autoComplete="off" />
          </label>
        </Piege>

        <Groupe>
          <Duo>
            <div>
              <Etiquette htmlFor="prenom">Prénom</Etiquette>
              <Entree id="prenom" name="prenom" required maxLength={80} />
            </div>
            <div>
              <Etiquette htmlFor="nom">Nom</Etiquette>
              <Entree id="nom" name="nom" required maxLength={80} />
            </div>
          </Duo>
        </Groupe>

        <Groupe>
          <Duo>
            <div>
              <Etiquette htmlFor="courriel">Courriel</Etiquette>
              <Entree id="courriel" name="courriel" type="email" maxLength={160} />
            </div>
            <div>
              <Etiquette htmlFor="telephone">Téléphone</Etiquette>
              <Entree id="telephone" name="telephone" type="tel" maxLength={25} />
            </div>
          </Duo>
          <Aide>Un des deux suffit — celui que tu préfères.</Aide>
        </Groupe>

        <Groupe>
          <Etiquette as="div">Tes disponibilités</Etiquette>
          <Aide style={{ margin: '0 0 16px 0' }}>
            Coche tes vraies dispos, pas celles que tu penses qu&apos;on veut voir.
            On bâtit l&apos;horaire avec, comme pour tout le monde ici.
          </Aide>
          <Grille>
            <div />
            {PLAGES.map(([cle, label]) => (
              <EnTete key={cle}>{label}</EnTete>
            ))}
            {JOURS.map(([jour, labelJour]) => (
              <React.Fragment key={jour}>
                <NomJour>{labelJour}</NomJour>
                {PLAGES.map(([plage, labelPlage]) => {
                  const on = (dispos[jour] || []).includes(plage)
                  return (
                    <Case
                      key={plage}
                      $on={on}
                      aria-pressed={on}
                      aria-label={`${labelJour} ${labelPlage}`}
                      onClick={() => basculer(jour, plage)}
                    >
                      {on ? '✓' : ''}
                    </Case>
                  )
                })}
              </React.Fragment>
            ))}
          </Grille>
          <Aide>Le matin commence à 8 h, une heure avant l&apos;ouverture.</Aide>
        </Groupe>

        <Groupe>
          <Duo>
            <div>
              <Etiquette htmlFor="heures_min">Combien d&apos;heures par semaine&nbsp;?</Etiquette>
              <Duo>
                <Entree
                  id="heures_min"
                  name="heures_min"
                  type="number"
                  min={0}
                  max={60}
                  placeholder="de 15"
                />
                <Entree name="heures_max" type="number" min={0} max={60} placeholder="à 25" />
              </Duo>
            </div>
            <div>
              <Etiquette htmlFor="debut_possible">Tu peux commencer quand&nbsp;?</Etiquette>
              <Entree id="debut_possible" name="debut_possible" type="date" />
            </div>
          </Duo>
        </Groupe>

        <Groupe>
          <Etiquette as="div">De l&apos;expérience en café ou en restauration&nbsp;?</Etiquette>
          <Choix>
            <Case
              $on={experience === true}
              style={{ padding: '0 26px', width: 'auto' }}
              onClick={() => setExperience(true)}
            >
              Oui
            </Case>
            <Case
              $on={experience === false}
              style={{ padding: '0 26px', width: 'auto' }}
              onClick={() => setExperience(false)}
            >
              Non
            </Case>
          </Choix>
          <div style={{ marginTop: 14 }}>
            <Entree
              name="experience_detail"
              maxLength={500}
              placeholder={
                experience === false
                  ? 'Pas grave — dis-nous pourquoi tu penses être capable pareil.'
                  : 'En une ligne : où, et combien de temps.'
              }
            />
          </div>
        </Groupe>

        <Groupe>
          <Etiquette htmlFor="presentation">Raconte-nous, en trois lignes</Etiquette>
          <Zone
            id="presentation"
            name="presentation"
            required
            maxLength={2000}
            placeholder="Qui tu es, ce que tu cherches, pourquoi ici."
          />
          <Aide>C&apos;est ça qu&apos;on lit en premier. Pas besoin que ce soit beau.</Aide>
        </Groupe>

        <Groupe>
          <Etiquette htmlFor="source">
            Comment tu nous connais&nbsp;?<span className="facultatif">facultatif</span>
          </Etiquette>
          <Entree
            id="source"
            name="source"
            maxLength={200}
            placeholder="Tu passes souvent, un ami, Instagram…"
          />
        </Groupe>

        <Bouton type="submit" disabled={envoi}>
          {envoi ? 'Un instant…' : 'Envoyer ma candidature'}
        </Bouton>

        {erreur && <Message $erreur>{erreur}</Message>}

        <MentionVie>
          On garde ta candidature six mois, puis elle est supprimée automatiquement. Elle
          n&apos;est lue que par nous, ici. Écris-nous à info@labrassee.cafe si tu veux
          qu&apos;on l&apos;efface avant.
        </MentionVie>
      </form>
    </Section>
  )
}

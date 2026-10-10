'use client'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import {
  JOURS_FR,
  MOIS_FR,
  SURLASCENE_BUCKET_URL,
} from '@/frontend/lib/surlascene-data'
import SceneArtisteModal from './SceneArtisteModal'

/** @typedef {import('../../lib/surlascene-data').SurlasceneShowDetail} SurlasceneShowDetail */

// 05/10/2026 : l'agenda est le PREMIER écran de /scene (Cédric : « elle doit parler
// aux gens qui veulent connaître la programmation. pas aux artistes »). D'où la
// marge sous l'en-tête fixe, et un haut de section court sur téléphone.
const Section = styled.section`
  padding: calc(var(--header-height) + 40px) 24px 80px;
  background: var(--color-dark);

  @media (max-width: 768px) {
    /* L'en-tête fixe fait 56 px sur téléphone (Header.jsx), pas --header-height. */
    padding: 84px 16px 56px;
  }
`

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`

const Label = styled.div`
  color: var(--color-brand);
  font-family: var(--font-din);
  text-transform: uppercase;
  letter-spacing: 5px;
  font-size: 12px;
  text-align: center;
  margin-bottom: 14px;
`

const Titre = styled.h2`
  font-family: var(--font-din);
  font-size: clamp(32px, 5vw, 56px);
  font-weight: 200;
  letter-spacing: 1px;
  text-align: center;
  color: #ffffff;
  margin: 0 0 16px;

  .u { color: var(--color-brand); }
`

const Intro = styled.p`
  text-align: center;
  color: rgba(255, 255, 255, 0.85);
  max-width: 640px;
  margin: 0 auto 40px;
  font-size: 16px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`

const Vide = styled.div`
  text-align: center;
  padding: 60px 24px;
  color: rgba(255, 255, 255, 0.55);
  font-style: italic;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  border-radius: 16px;
`

const CountdownBloc = styled.div`
  background: linear-gradient(135deg, rgba(247, 209, 53, 0.1), rgba(247, 209, 53, 0.02));
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(247, 209, 53, 0.3);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 8px 32px rgba(0, 0, 0, 0.4);
  padding: 28px;
  border-radius: 20px;
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;

  .gauche { flex: 1; min-width: 200px; }
  .label-cd {
    font-family: var(--font-din);
    text-transform: uppercase;
    letter-spacing: 4px;
    font-size: 11px;
    color: rgba(205, 196, 157, 0.6);
    margin-bottom: 6px;
  }
  .titre-cd {
    font-family: var(--font-din);
    font-size: clamp(22px, 3vw, 32px);
    color: var(--color-brand);
    font-weight: 300;
    letter-spacing: 1px;
  }
  .meta-cd { color: rgba(255, 255, 255, 0.85); font-size: 14px; margin-top: 4px; }
  .timer { display: flex; gap: 16px; }
  .ct-cell { text-align: center; min-width: 56px; }
  .num {
    font-family: var(--font-din);
    font-size: 36px;
    color: var(--color-brand);
    font-weight: 300;
    line-height: 1;
  }
  .lbl {
    font-family: var(--font-din);
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.55);
    margin-top: 4px;
  }
`

const Feature = styled.article`
  background: linear-gradient(135deg, rgba(247, 209, 53, 0.1), rgba(247, 209, 53, 0.02));
  backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid rgba(247, 209, 53, 0.3);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 16px 60px rgba(0, 0, 0, 0.5);
  border-radius: 28px;
  padding: 36px;
  margin-bottom: 36px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(247, 209, 53, 0.5);
  }

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    padding: 28px;
    gap: 22px;
  }
`

const PhotoHD = styled.div`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 22px;
  background-color: #0a0905;
  border: 2px solid rgba(247, 209, 53, 0.3);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-din);
  color: rgba(205, 196, 157, 0.6);
  font-size: 86px;

  /* Artistes ENTIERS (06/10/2026) : la photo est affichée en entier (contain) sur un fond
     flou de la même image, jamais recadrée. */
  &::before {
    content: '';
    position: absolute;
    inset: -12px;
    z-index: -1;
    background: var(--photo, none) center / cover no-repeat;
    filter: blur(16px) brightness(0.55);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`

const InfosFeat = styled.div`
  .surtitre {
    font-family: var(--font-din);
    text-transform: uppercase;
    letter-spacing: 5px;
    font-size: 11px;
    color: var(--color-brand);
    margin-bottom: 10px;
  }
  h3 {
    font-family: var(--font-din);
    font-weight: 200;
    font-size: clamp(28px, 4vw, 48px);
    line-height: 1;
    letter-spacing: -1px;
    color: #ffffff;
    margin: 0 0 8px;
  }
  .genre {
    font-family: var(--font-din);
    color: rgba(205, 196, 157, 0.6);
    text-transform: uppercase;
    letter-spacing: 3px;
    font-size: 12px;
    margin-bottom: 14px;
  }
  .perm {
    background: rgba(247, 209, 53, 0.08);
    border-left: 3px solid var(--color-brand);
    padding: 10px 14px;
    border-radius: 8px;
    margin-bottom: 14px;
    color: rgba(255, 255, 255, 0.85);
    font-size: 13px;
  }
  .perm strong {
    color: var(--color-brand);
    font-family: var(--font-din);
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 11px;
    display: block;
    margin-bottom: 2px;
  }
  .when {
    color: rgba(255, 255, 255, 0.85);
    font-size: 15px;
    margin-bottom: 14px;
  }
  .when strong { color: var(--color-brand); font-weight: 500; }
  .bio {
    color: rgba(255, 255, 255, 0.85);
    font-size: 14px;
    line-height: 1.7;
    margin-bottom: 18px;
  }
  .liens { display: flex; gap: 8px; flex-wrap: wrap; }
  .liens a {
    color: var(--color-brand);
    text-decoration: none;
    font-family: var(--font-din);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 6px 12px;
    border-radius: 999px;
    background: rgba(247, 209, 53, 0.15);
    border: 1px solid rgba(247, 209, 53, 0.3);
    transition: all 0.2s ease;
  }
  .liens a:hover {
    background: var(--color-brand);
    color: var(--color-dark);
  }
`

const SubTitle = styled.div`
  font-family: var(--font-din);
  text-transform: uppercase;
  letter-spacing: 4px;
  font-size: 11px;
  color: rgba(205, 196, 157, 0.6);
  margin: 40px 0 16px;
  text-align: center;
`

const Carte = styled.article`
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.15),
    0 8px 32px rgba(0, 0, 0, 0.4);
  position: relative;
  padding: 20px 28px;
  border-radius: 20px;
  margin-bottom: 18px;
  display: grid;
  grid-template-columns: 100px 180px 1fr auto;
  gap: 20px;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(247, 209, 53, 0.3);
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 14px;
    padding: 16px;

    /* La photo passe en haut, pleine largeur ; la pastille de date se pose en coin dessus. */
    .date-bloc {
      position: absolute;
      top: 26px;
      left: 26px;
      z-index: 2;
      padding: 6px 12px;
    }
    .jour-num {
      font-size: 26px;
      margin: 2px 0;
    }
  }

  .date-bloc {
    text-align: center;
    padding: 14px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(247, 209, 53, 0.3);
    border-radius: 14px;
  }
  .jour {
    font-family: var(--font-din);
    text-transform: uppercase;
    color: rgba(205, 196, 157, 0.6);
    font-size: 11px;
    letter-spacing: 2px;
  }
  .jour-num {
    font-family: var(--font-din);
    font-size: 38px;
    font-weight: 400;
    color: var(--color-brand);
    line-height: 1;
    margin: 4px 0;
  }
  .mois {
    font-family: var(--font-din);
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 2px;
    color: rgba(255, 255, 255, 0.85);
  }
  .photo-mini {
    position: relative;
    isolation: isolate;
    overflow: hidden;
    width: 180px;
    aspect-ratio: 4 / 3;
    border-radius: 14px;
    background-color: #0a0905;
    border: 2px solid rgba(247, 209, 53, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(205, 196, 157, 0.6);
    font-family: var(--font-din);
    font-size: 40px;

    @media (max-width: 700px) {
      width: 100%;
    }
  }
  .photo-mini::before {
    content: '';
    position: absolute;
    inset: -12px;
    z-index: -1;
    background: var(--photo, none) center / cover no-repeat;
    filter: blur(16px) brightness(0.55);
  }
  .photo-mini img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
  &.annule {
    cursor: default;
    opacity: 0.72;
  }
  &.annule .photo-mini {
    filter: grayscale(0.55) brightness(0.8);
  }
  &.annule .corps h3 {
    text-decoration: line-through;
    text-decoration-thickness: 1px;
  }
  .badge-annule {
    display: inline-block;
    background: #f7d135;
    color: #0a0907;
    font-weight: 700;
    letter-spacing: 2px;
    padding: 2px 10px;
    border-radius: 6px;
  }
  .corps h3 {
    font-family: var(--font-din);
    font-weight: 300;
    font-size: clamp(22px, 3vw, 28px);
    letter-spacing: 1px;
    color: #ffffff;
    margin: 0 0 6px;
  }
  .corps .type {
    font-family: var(--font-din);
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 11px;
    color: var(--color-brand);
    margin-bottom: 8px;
  }
  .corps .desc {
    color: rgba(255, 255, 255, 0.85);
    font-size: 14px;
  }
  .heures {
    font-family: var(--font-din);
    text-transform: uppercase;
    letter-spacing: 2px;
    font-size: 13px;
    color: #ffffff;
    text-align: right;

    @media (max-width: 700px) {
      grid-column: 1 / -1;
      text-align: left;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.12);
    }
  }
  .heures .h {
    color: var(--color-brand);
    font-size: 18px;
  }
`

function premiereLettre(nom) {
  return ((nom || '?').trim()[0] || '?').toUpperCase()
}

function photoUrl(path) {
  if (!path) return null
  return SURLASCENE_BUCKET_URL + path
}

function buildLiens(a) {
  const l = []
  if (a.spotify_url) l.push({ href: a.spotify_url, label: '🎧 Spotify' })
  if (a.bandcamp_url) l.push({ href: a.bandcamp_url, label: '💿 Bandcamp' })
  if (a.youtube_url) l.push({ href: a.youtube_url, label: '📺 YouTube' })
  if (a.site_web) l.push({ href: a.site_web, label: '🌐 Site' })
  if (a.instagram) {
    const ig = a.instagram.startsWith('http')
      ? a.instagram
      : 'https://instagram.com/' + a.instagram.replace('@', '')
    l.push({ href: ig, label: '📷 Instagram' })
  }
  return l
}

/**
 * @param {{ shows?: SurlasceneShowDetail[] }} props
 */
export default function SceneAgenda({ shows = [] }) {
  const [selectedShow, setSelectedShow] = useState(null)
  const [countdown, setCountdown] = useState({ j: 0, h: 0, m: 0 })
  // Le « prochain show » mis en vedette est toujours une soirée qui a lieu ;
  // les annulées restent dans la liste, marquées « Annulé ».
  const first = shows.find((s) => s.statut !== 'annule')

  useEffect(() => {
    if (!first) return
    const target = new Date(first.date_show + 'T' + (first.heure_debut || '19:30'))
    const tick = () => {
      const diff = target - new Date()
      if (diff <= 0) {
        setCountdown({ j: 0, h: 0, m: 0 })
        return
      }
      setCountdown({
        j: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
      })
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [first])

  if (!shows || shows.length === 0 || !first) {
    return (
      <Section id="agenda">
        <Container>
          <Label>La Brassée · Programmation</Label>
          <Titre>
            Les <span className="u">événements</span>
          </Titre>
          <Intro>
            Entrée libre, sans réservation, dès 19 h 30. Premier arrivé, mieux placé.
          </Intro>
          <Vide>
            L'agenda du moment se précise. Reviens bientôt.
          </Vide>
        </Container>
      </Section>
    )
  }

  const a = first.artiste
  // Priorité image : 1) affiche Facebook (event Payload matché par date)
  // 2) photo artiste déposée (EPK) 3) première lettre du nom (fallback)
  const photoFeat =
    first.coverImage ||
    (a
      ? photoUrl(a.photo_artiste_path) ||
        (a.photos_hd_paths && a.photos_hd_paths[0] && photoUrl(a.photos_hd_paths[0]))
      : null)
  const dF = new Date(first.date_show + 'T' + (first.heure_debut || '19:30'))
  const dateTxt = `${JOURS_FR[dF.getDay()]} ${dF.getDate()} ${MOIS_FR[dF.getMonth()]} · ${
    first.heure_debut ? first.heure_debut.slice(0, 5) : '19:30'
  }`
  const liens = a ? buildLiens(a) : []

  return (
    <Section id="agenda">
      <Container>
        <Label>La Brassée · Programmation</Label>
        <Titre as="h1">
          Les <span className="u">événements</span>
        </Titre>
        <Intro>
          Entrée libre, sans réservation : tu pousses la porte, tu t'installes, et ça
          commence à 19 h 30. Premier arrivé, mieux placé.
        </Intro>

        {first && a && (
          <CountdownBloc>
            <div className="gauche">
              <div className="label-cd">Prochain spectacle</div>
              <div className="titre-cd">{first.titre_show || a.nom_artiste}</div>
              <div className="meta-cd">{dateTxt}</div>
            </div>
            <div className="timer">
              <div className="ct-cell">
                <div className="num">{countdown.j}</div>
                <div className="lbl">jours</div>
              </div>
              <div className="ct-cell">
                <div className="num">{String(countdown.h).padStart(2, '0')}</div>
                <div className="lbl">h</div>
              </div>
              <div className="ct-cell">
                <div className="num">{String(countdown.m).padStart(2, '0')}</div>
                <div className="lbl">min</div>
              </div>
            </div>
          </CountdownBloc>
        )}

        {a && (
          <Feature onClick={() => setSelectedShow(first)}>
            {photoFeat ? (
              <PhotoHD style={{ '--photo': `url('${photoFeat}')` }}>
                <img src={photoFeat} alt="" />
              </PhotoHD>
            ) : (
              <PhotoHD>{premiereLettre(a.nom_artiste)}</PhotoHD>
            )}
            <InfosFeat>
              <div className="surtitre">Prochain spectacle · {dateTxt}</div>
              <h3>{a.nom_artiste}</h3>
              {a.genre && (
                <div className="genre">
                  {a.genre}
                  {a.nb_personnes_scene ? ` · ${a.nb_personnes_scene} sur scène` : ''}
                </div>
              )}
              {a.permanence && a.recurrence_notes && (
                <div className="perm">
                  <strong>⭐ Permanence La Brassée</strong>
                  {a.recurrence_notes}
                </div>
              )}
              <div className="when">
                📍 La Brassée · 2522 Beaubien Est · entrée libre · soundcheck{' '}
                <strong>
                  {first.heure_soundcheck ? first.heure_soundcheck.slice(0, 5) : '1 h avant'}
                </strong>{' '}
                · spectacle <strong>{first.heure_debut ? first.heure_debut.slice(0, 5) : '19:30'}</strong>
              </div>
              {a.bio && <div className="bio">{a.bio}</div>}
              {liens.length > 0 && (
                <div className="liens">
                  {liens.map((l, i) => (
                    <a
                      key={i}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </InfosFeat>
          </Feature>
        )}

        {shows.filter((s) => s !== first).length > 0 && (
          <SubTitle>Les spectacles suivants</SubTitle>
        )}

        {shows.filter((s) => s !== first).map((s) => {
          const art = s.artiste
          const nom = (art && art.nom_artiste) || 'À confirmer'
          const genre =
            (art && art.genre) || (s.type_show || 'Concert').toUpperCase()
          const dd = new Date(s.date_show + 'T' + (s.heure_debut || '19:30'))
          // Priorité image : Facebook (event Payload) > photo artiste > initiale
          const photo =
            s.coverImage ||
            (art
              ? photoUrl(art.photo_artiste_path) ||
                (art.photos_hd_paths && art.photos_hd_paths[0] && photoUrl(art.photos_hd_paths[0]))
              : null)
          const desc =
            (art && art.bio
              ? art.bio.slice(0, 160) + (art.bio.length > 160 ? '…' : '')
              : '') ||
            s.description_publique ||
            (art ? 'Avec ' + nom : 'Programmation à confirmer')
          return (
            <Carte
              id={`concert-${s.id}`}
              key={s.id}
              className={s.statut === 'annule' ? 'annule' : undefined}
              onClick={s.statut === 'annule' ? undefined : () => setSelectedShow(s)}
            >
              <div className="date-bloc">
                <div className="jour">{JOURS_FR[dd.getDay()]}</div>
                <div className="jour-num">{dd.getDate()}</div>
                <div className="mois">{MOIS_FR[dd.getMonth()]}</div>
              </div>
              {photo ? (
                <div className="photo-mini" style={{ '--photo': `url('${photo}')` }}>
                  <img src={photo} alt="" loading="lazy" />
                </div>
              ) : (
                <div className="photo-mini">{premiereLettre(nom)}</div>
              )}
              <div className="corps">
                <div className="type">
                  {s.statut === 'annule' ? <span className="badge-annule">Annulé</span> : s.bandeau ? <span className="badge-annule">{s.bandeau}</span> : genre}
                </div>
                <h3>{s.titre_show || nom}</h3>
                <div className="desc">{desc}</div>
              </div>
              <div className="heures">
                <div className="h">
                  {s.heure_debut ? s.heure_debut.slice(0, 5) : '19:30'}
                </div>
                {s.heure_fin && (
                  <div style={{ opacity: 0.6 }}>→ {s.heure_fin.slice(0, 5)}</div>
                )}
              </div>
            </Carte>
          )
        })}
      </Container>

      {selectedShow && (
        <SceneArtisteModal show={selectedShow} onClose={() => setSelectedShow(null)} />
      )}
    </Section>
  )
}

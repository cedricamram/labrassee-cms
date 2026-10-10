'use client'

import React from 'react'
import styled from 'styled-components'

const Section = styled.section`
  padding: 48px 24px 40px;
  background: var(--color-dark);
`

const Intro = styled.div`
  max-width: 1200px;
  margin: 0 auto 24px;
  text-align: center;

  h2 {
    font-family: var(--font-din);
    font-weight: 200;
    font-size: clamp(24px, 3vw, 34px);
    color: #ffffff;
    margin: 0 0 6px;
    letter-spacing: -0.5px;
  }
  p {
    color: rgba(255, 255, 255, 0.65);
    font-size: 14px;
    margin: 0;
  }
  a {
    color: var(--color-brand);
    text-decoration: none;
  }
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`

const Carte = styled.article`
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 22px;
  padding: 24px 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.3s ease, border-color 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(247, 209, 53, 0.4);
  }
`

const Entete = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const Emoji = styled.div`
  font-size: 40px;
  line-height: 1;
  flex-shrink: 0;
`

const Titres = styled.div`
  min-width: 0;
`

const Eyebrow = styled.div`
  color: var(--color-brand);
  font-family: var(--font-din);
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 10px;
`

const Titre = styled.h2`
  font-family: var(--font-din);
  font-weight: 200;
  font-size: clamp(24px, 2.4vw, 30px);
  letter-spacing: -0.5px;
  color: #ffffff;
  margin: 2px 0 0;
  line-height: 1;
`

const Sous = styled.div`
  color: rgba(205, 196, 157, 0.85);
  font-family: var(--font-din);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 10px;
  margin-top: 3px;
`

const Accroche = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 13.5px;
  line-height: 1.55;
  margin: 2px 0 0;

  strong {
    color: var(--color-brand);
    font-weight: 500;
  }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  padding-top: 6px;
`

const BtnPrimaire = styled.a`
  background: var(--color-brand);
  color: var(--color-dark);
  font-family: var(--font-din);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 11px;
  padding: 11px 18px;
  border-radius: 999px;
  text-decoration: none;
  border: 1px solid var(--color-brand);
  transition: all 0.3s ease;

  &:hover {
    background: transparent;
    color: var(--color-brand);
  }
`

const BtnSecondaire = styled.a`
  background: transparent;
  color: var(--color-brand);
  font-family: var(--font-din);
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 11px;
  padding: 11px 18px;
  border-radius: 999px;
  text-decoration: none;
  border: 1px solid rgba(247, 209, 53, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(247, 209, 53, 0.12);
    border-color: var(--color-brand);
  }
`

export default function ProposerCards() {
  return (
    <Section id="cartes">
      <Intro>
        <h2>Trois façons de te faire voir</h2>
        <p>
          Choisis ta porte, puis repère ta date sur le <a href="#calendrier">calendrier</a> juste en dessous.
        </p>
      </Intro>
      <Container>
        {/* Carte SCÈNE */}
        <Carte>
          <Entete>
            <Emoji>🎤</Emoji>
            <Titres>
              <Eyebrow>Surlascène</Eyebrow>
              <Titre>Sur la scène</Titre>
              <Sous>Musique · poésie · cabaret</Sous>
            </Titres>
          </Entete>
          <Accroche>
            Cinq soirs par semaine, la scène est à qui veut la prendre. Chapeau au
            public et <strong>10 % de la maison</strong> pour les artistes.
          </Accroche>
          <Actions>
            <BtnPrimaire
              href="https://labrassee-surlascene-depot.vercel.app/?candidature=scene"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-event"
            >
              Proposer ma perfo
            </BtnPrimaire>
            <BtnSecondaire href="/proposer/equipement" className="cursor-event">
              L'équipement
            </BtnSecondaire>
          </Actions>
        </Carte>

        {/* Carte MURS */}
        <Carte>
          <Entete>
            <Emoji>🖼️</Emoji>
            <Titres>
              <Eyebrow>Surnosmurs</Eyebrow>
              <Titre>Sur nos murs</Titre>
              <Sous>Expos · galerie</Sous>
            </Titres>
          </Entete>
          <Accroche>
            <strong>4 semaines d'expo</strong>, un vernissage 5 à 7, tes œuvres
            devant nos habitués. Tu repars avec tes ventes.
          </Accroche>
          <Actions>
            <BtnPrimaire
              href="https://labrassee-murs-depot.vercel.app/?candidature=murs"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-event"
            >
              Proposer mon expo
            </BtnPrimaire>
            <BtnSecondaire href="/proposer/expo" className="cursor-event">
              Conditions
            </BtnSecondaire>
          </Actions>
        </Carte>

        {/* Carte PAGES */}
        <Carte>
          <Entete>
            <Emoji>📚</Emoji>
            <Titres>
              <Eyebrow>Surnospages</Eyebrow>
              <Titre>Sur nos pages</Titre>
              <Sous>Rencontres d'auteur·rice · 5 à 7</Sous>
            </Titres>
          </Entete>
          <Accroche>
            <strong>Le dimanche, 17 h – 19 h</strong> : lecture, échange, signature.
            Vente de livres 100 % à toi, aucun cachet.
          </Accroche>
          <Actions>
            <BtnPrimaire
              href="https://labrassee-pages-depot.vercel.app/?candidature=pages"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-event"
            >
              Proposer mon 5 à 7
            </BtnPrimaire>
            <BtnSecondaire href="#calendrier" className="cursor-event">
              Les dimanches
            </BtnSecondaire>
          </Actions>
        </Carte>
      </Container>
    </Section>
  )
}

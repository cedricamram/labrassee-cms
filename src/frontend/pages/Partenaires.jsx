'use client'

import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

/*
 * Chaque carte ci-dessous est adossée à une source vérifiable (10/10/2026, Apollon) :
 *  · menu_v2.json, page « QUI ON EST » → section CE QU'ON DÉFEND → « PRODUITS D'ICI » :
 *    Valens · Île aux Grues · Madison Park · Rosemont · Boréale · Beauregard
 *  · marketing/etiquettes-vitrine-2026-09 (validé par Cédric le 28/09) : la catégorie
 *    Pâtisserie vient de Madeleine, les quiches de Carrément Tarte
 *  · facture Les Fermes Valens 190225 du 2026-09-30 (poulet, bœuf, bacon)
 * Pas d'URL qui n'ait répondu au test. Les cinq partenaires inventés de la version
 * du 24/05 (dont Fermes Lufa et La Grenouille Rouge, introuvables dans nos archives)
 * sont retirés : une page publique ne porte pas un partenariat qu'on ne peut pas prouver.
 */
const partenaires = [
  {
    slug: 'valens',
    nom: 'Les Fermes Valens',
    role: 'Viandes du Québec',
    description:
      'Huntingdon, en Montérégie. Le poulet, le bœuf et le bacon de notre cuisine salée arrivent de chez eux.',
    url: 'https://fermesvalens.com',
  },
  {
    slug: 'ile-aux-grues',
    nom: "Fromagerie de l'Île-aux-Grues",
    role: 'Fromages du Saint-Laurent',
    description:
      "Une fromagerie posée sur une île du fleuve. C'est son cheddar que tu trouves dans notre Cabane à sucre version sandwich.",
    url: 'https://fromagesileauxgrues.com',
  },
  {
    slug: 'madeleine',
    nom: 'Boulangerie Madeleine',
    role: 'Viennoiserie',
    description:
      "Le croissant nature sort de chez elle, et c'est le seul de la vitrine qu'on ne fait pas ici. Celui aux amandes, on le garnit nous-mêmes sur son croissant.",
    url: 'https://patisseriemadeleine.ca',
  },
  {
    slug: 'carrement-tarte',
    nom: 'Carrément Tarte',
    role: 'Quiches',
    description:
      'Les quiches de notre vitrine viennent de chez eux. Tout le reste de la vitrine est fait maison.',
    url: 'https://carrementtarte.com',
  },
  {
    slug: 'beauregard',
    nom: 'Beauregard Brasserie Distillerie',
    role: 'Bières et spiritueux',
    description:
      "Notre coup de cœur permanent parmi les huit fûts du moment. On garde aussi leurs canettes au frais pour l'emporter.",
  },
  {
    slug: 'boreale',
    nom: 'Boréale',
    role: 'Bières',
    description:
      "Les Brasseurs du Nord, une des plus vieilles microbrasseries du Québec. On tient leurs bières, dont les 0 % : ici personne n'a à boire de l'alcool pour être de la soirée.",
    url: 'https://boreale.com',
  },
  {
    slug: 'rosemont',
    nom: 'Rosemont',
    role: 'Spiritueux',
    description:
      'Des spiritueux qui portent le nom de notre quartier. Leur tequila entre dans nos cocktails.',
  },
  {
    slug: 'madison-park',
    nom: 'Madison Park',
    role: 'Gins',
    description:
      'Leur London Dry et leur gin à la bergamote sont sur notre carte de cocktails.',
  },
]

/* ── Styled components ── */

const Page = styled.div`
  width: 100%;
  background: var(--color-dark);
  min-height: 100vh;
`

const Hero = styled.section`
  width: 100%;
  padding: 160px 5vw 80px;

  @media (max-width: 680px) {
    padding: 104px 5vw 40px;
  }

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  position: relative;
  overflow: hidden;
`

const HeroLabel = styled(motion.span)`
  font-family: var(--font-din-condensed);
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--color-brand);
`

const HeroTitle = styled(motion.h1)`
  font-family: var(--font-din);
  font-size: clamp(56px, 10vw, 140px);
  font-weight: 400;
  line-height: 0.9;
  color: var(--color-white);
  text-transform: uppercase;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.15);
  margin: 0;
`

const HeroAccent = styled.span`
  -webkit-text-stroke: 2px var(--color-brand);
  color: transparent;
`

const HeroDivider = styled(motion.div)`
  width: 60px;
  height: 3px;
  background: var(--color-brand);
  margin-top: 8px;
`

const HeroLead = styled(motion.p)`
  font-family: var(--font-acumin);
  font-size: 18px;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  max-width: 520px;
  margin: 0;
`

const Grid = styled.section`
  width: 100%;
  padding: 0 5vw 120px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2px;

  @media (max-width: 680px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled(motion.article)`
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 44px 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: background 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`

const CardRole = styled.span`
  font-family: var(--font-din-condensed);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--color-brand);
`

const CardName = styled.h2`
  font-family: var(--font-din);
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-white);
  line-height: 1.1;
  margin: 0;
`

const CardDesc = styled.p`
  font-family: var(--font-acumin);
  font-size: 15px;
  font-weight: 300;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.55);
  margin: 0;
  flex: 1;
`

const CardLink = styled.a`
  font-family: var(--font-din-condensed);
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--color-brand);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }

  &::after {
    content: '→';
    font-size: 13px;
  }
`

/* ── Animation variants ── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

/* ── Component ── */

const Partenaires = () => {
  return (
    <Page>
      <Hero>
        <HeroLabel
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          La Brassée · Rosemont
        </HeroLabel>

        <HeroTitle
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0, y: 48 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.1 } } }}
        >
          NOS<br />
          <HeroAccent>PARTENAIRES</HeroAccent>
        </HeroTitle>

        <HeroDivider
          initial={{ width: 0 }}
          animate={{ width: 60 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />

        <HeroLead
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5 } } }}
        >
          Ce qu'on te sert ne sort pas de nulle part. Des fermes, une boulangerie,
          une fromagerie, des brasseries et des distilleries du Québec. Voici
          chez qui on achète, et ce qu'on leur prend.
        </HeroLead>
      </Hero>

      <Grid
        as={motion.section}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0, margin: '0px 0px -10% 0px' }}
        variants={stagger}
      >
        {partenaires.map((p) => (
          <Card key={p.slug} variants={fadeUp}>
            <CardRole>{p.role}</CardRole>
            <CardName>{p.nom}</CardName>
            <CardDesc>{p.description}</CardDesc>
            {p.url ? (
              <CardLink href={p.url} target="_blank" rel="noopener noreferrer">
                {p.url.replace(/^https?:\/\//, '')}
              </CardLink>
            ) : null}
          </Card>
        ))}
      </Grid>
    </Page>
  )
}

export default Partenaires

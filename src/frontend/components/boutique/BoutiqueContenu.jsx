'use client'

import React from 'react'
import styled from 'styled-components'

// Boutique — page « À emporter » (Apollon, 13/08/2026).
//
// Raison d'être : le site ne disait NULLE PART qu'on vend du café en grains,
// du thé en vrac et des laits. Cette page est en vrai texte (pas en image,
// contrairement au menu-flipbook) pour être lisible par Google et par les
// lecteurs d'écran.
//
// ⚠️ Prix : source = caisse Koomi, confirmés un par un par Cédric le 13/08.
// Ne JAMAIS repeupler cette page depuis le dump koomi_options.json sans
// confirmation humaine — le dump garde des références retirées de la vente
// (4 cafés fantômes évités le 13/08). Cf. protocole_sourcer_faits_vrais_site_public.

const Page = styled.main`
  width: 100%;
  background: var(--color-dark);
  color: var(--color-white);
  padding: 0 0 80px;
`

const Bande = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
`

const Chapeau = styled(Bande)`
  padding-top: calc(var(--header-height) + 46px);
  padding-bottom: 50px;
  text-align: center;
`

const GrandTitre = styled.h1`
  font-family: var(--font-din-condensed);
  font-size: clamp(38px, 7vw, 68px);
  line-height: 1.05;
  color: var(--color-brand);
  margin: 0 0 18px;
  text-transform: uppercase;
`

const Intro = styled.p`
  font-family: var(--font-acumin);
  font-size: clamp(16px, 2.2vw, 19px);
  line-height: 1.6;
  color: var(--color-accent);
  max-width: 620px;
  margin: 0 auto;
`

const Section = styled(Bande)`
  padding-top: 44px;
  padding-bottom: 4px;
`

const Titre = styled.h2`
  font-family: var(--font-din-condensed);
  font-size: clamp(26px, 4vw, 38px);
  color: var(--color-white);
  margin: 0 0 6px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`

const SousTitre = styled.p`
  font-family: var(--font-acumin);
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-accent);
  margin: 0 0 22px;
`

const Liste = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid rgba(205, 196, 157, 0.22);
`

const Ligne = styled.li`
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding: 15px 2px;
  border-bottom: 1px solid rgba(205, 196, 157, 0.22);
`

const Nom = styled.span`
  font-family: var(--font-acumin);
  font-size: 17px;
  color: var(--color-white);
  flex: 0 1 auto;
`

const Pointilles = styled.span`
  flex: 1 1 auto;
  border-bottom: 1px dotted rgba(205, 196, 157, 0.4);
  transform: translateY(-4px);
  min-width: 20px;
`

const Prix = styled.span`
  font-family: var(--font-din-condensed);
  font-size: 21px;
  color: var(--color-brand);
  white-space: nowrap;
`

const Detail = styled.span`
  display: block;
  font-family: var(--font-acumin);
  font-size: 13.5px;
  color: var(--color-accent);
  margin-top: 3px;
`

const Famille = styled.h3`
  font-family: var(--font-din-condensed);
  font-size: 20px;
  color: var(--color-brand);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 32px 0 0;
`

const Encart = styled.p`
  font-family: var(--font-acumin);
  font-size: 15.5px;
  line-height: 1.65;
  color: var(--color-white);
  background: var(--color-dark-alt);
  border-left: 3px solid var(--color-brand);
  padding: 16px 20px;
  margin: 22px 0 0;
  border-radius: 4px;
`

const Provenance = styled(Bande)`
  padding-top: 64px;
`

const Recit = styled.p`
  font-family: var(--font-acumin);
  font-size: clamp(16px, 2.2vw, 18px);
  line-height: 1.75;
  color: var(--color-white);
  margin: 0 0 16px;
`

const Mention = styled.p`
  font-family: var(--font-acumin);
  font-size: 13px;
  color: var(--color-accent);
  margin: 26px 0 0;
`

/**
 * Thés et tisanes classés par famille — comme sur le menu papier
 * (Cédric, 13/08 : « classe les thés par leur couleur et fais un groupe
 * sans théine, un peu comme sur le menu »).
 *
 * SOURCE DES RÉFÉRENCES : le menu papier
 * (`public/images/menu-v2/boissons_chaudes.png`), désigné par Cédric comme la
 * source de vérité — PAS le dump koomi_options.json, qui garde des références
 * retirées de la vente. Les PRIX viennent de la caisse Koomi (prix au kilo / 10).
 */
const FAMILLES_THE = [
  {
    famille: 'Thés noirs',
    thes: [
      { nom: 'Casablanca', prix: '17,00 $' },
      { nom: 'Thé des Tsars', prix: '17,00 $' },
      { nom: 'English Breakfast', prix: '17,00 $' },
      { nom: 'Grand Earl Grey', prix: '17,00 $' },
      { nom: 'Earl Grey Cream', prix: '17,00 $' },
      { nom: 'Masala Chaï', prix: '19,50 $' },
      { nom: 'Pu-Erh Jeune', prix: '19,50 $' },
      { nom: 'Lapsang Souchong', prix: '22,00 $' },
      { nom: 'Darjeeling', prix: '29,50 $' },
    ],
  },
  {
    famille: 'Thés verts',
    thes: [
      { nom: 'Bleuets', prix: '17,00 $' },
      { nom: 'Gunpowder', prix: '17,00 $' },
      { nom: 'Sencha Coing', prix: '17,00 $' },
      { nom: 'Jasmin du Paradis', prix: '17,00 $' },
      { nom: 'Zeste de Citron', prix: '17,00 $' },
    ],
  },
  {
    famille: 'Thés blancs',
    thes: [
      { nom: 'Supérieur', prix: '27,00 $' },
      { nom: 'Pomme-Grenade', prix: '29,50 $' },
    ],
  },
  {
    famille: 'Sans théine',
    thes: [
      { nom: 'Rooibos', prix: '17,00 $' },
      { nom: 'Rooibos Orange-Gingembre', prix: '17,00 $' },
      { nom: 'Rooibos Vanille', prix: '17,00 $' },
      { nom: 'Infusion Bien-Être', prix: '17,00 $' },
      { nom: 'Infusion Digestion', prix: '17,00 $' },
      { nom: "Fleurs d'Hibiscus", prix: '17,00 $' },
      { nom: 'Verveine', prix: '17,00 $' },
      { nom: 'Camomille Menthe', prix: '19,50 $' },
      { nom: 'Shanti Framboise', prix: '22,00 $' },
      { nom: 'Tilleul', prix: '22,00 $' },
    ],
  },
  {
    famille: 'Matchas',
    thes: [
      { nom: 'Régulier', prix: '22,00 $' },
      { nom: 'Mangue', prix: '22,00 $' },
      { nom: 'Earl Grey', prix: '22,00 $' },
      { nom: 'Chaï', prix: '22,00 $' },
    ],
  },
  {
    famille: 'Les inclassables',
    thes: [
      { nom: 'Se Zhong', prix: '17,00 $' },
      { nom: "Wulong Fleur d'Oranger", prix: '22,00 $' },
    ],
  },
]

const LAITS = [
  { nom: 'Henrietta — brique', prix: '6,00 $' },
  { nom: 'Henrietta — pinte', prix: '6,00 $' },
  { nom: 'Lait végétal — pinte', prix: '6,00 $' },
  { nom: 'Barista Amande — brique', prix: '6,50 $' },
  { nom: 'Barista Coco — brique', prix: '6,50 $' },
  { nom: 'Barista Soya — brique', prix: '6,50 $' },
  { nom: 'Oatly — brique', prix: '6,50 $' },
]

const BoutiqueContenu = () => (
  <Page>
    <Chapeau>
      <GrandTitre>Repartez avec</GrandTitre>
      <Intro>
        Le café qu&apos;on vous sert, on le vend aussi — et on vous le moud
        devant vous. Les thés, les laits&nbsp;: tout ce qu&apos;il faut pour
        refaire chez vous ce que vous aimez ici.
      </Intro>
    </Chapeau>

    <Section>
      <Titre>Notre café en grains</Titre>
      <SousTitre>
        Une seule ferme, un seul café. Celui qu&apos;on vous sert est celui
        qu&apos;on vous vend.
      </SousTitre>
      <Liste>
        <Ligne>
          <Nom>
            Colombien Las Rosas
            <Detail>300 g</Detail>
          </Nom>
          <Pointilles aria-hidden="true" />
          <Prix>19,00 $</Prix>
        </Ligne>
        <Ligne>
          <Nom>
            Colombien décaféiné
            <Detail>300 g</Detail>
          </Nom>
          <Pointilles aria-hidden="true" />
          <Prix>19,00 $</Prix>
        </Ligne>
      </Liste>
      <Encart>
        <strong>Pas de taxes sur le café en vrac&nbsp;: 19&nbsp;$, c&apos;est
        19&nbsp;$.</strong>
        <br />
        Et on vous le moud devant vous, au grain qu&apos;il vous faut — filtre,
        espresso, piston. Dites-nous simplement comment vous le préparez.
      </Encart>
    </Section>

    <Section>
      <Titre>Thés et tisanes en vrac</Titre>
      <SousTitre>
        Trente-deux références choisies avec Un Amour des Thés, à Montréal.
        Servis au poids — du grammage que vous voulez.
      </SousTitre>
      {FAMILLES_THE.map((groupe) => (
        <React.Fragment key={groupe.famille}>
          <Famille>{groupe.famille}</Famille>
          <Liste>
            {groupe.thes.map((the) => (
              <Ligne key={the.nom}>
                <Nom>{the.nom}</Nom>
                <Pointilles aria-hidden="true" />
                <Prix>{the.prix}</Prix>
              </Ligne>
            ))}
          </Liste>
        </React.Fragment>
      ))}
      <Mention>Prix aux 100 g, taxes incluses.</Mention>
    </Section>

    <Section>
      <Titre>Les laits, à emporter</Titre>
      <SousTitre>Ceux qu&apos;on utilise derrière le comptoir.</SousTitre>
      <Liste>
        {LAITS.map((lait) => (
          <Ligne key={lait.nom}>
            <Nom>{lait.nom}</Nom>
            <Pointilles aria-hidden="true" />
            <Prix>{lait.prix}</Prix>
          </Ligne>
        ))}
      </Liste>
      <Mention>Taxes incluses.</Mention>
    </Section>

    <Section>
      <Titre>Et puis, sur les tablettes</Titre>
      <SousTitre>Les petites choses qu&apos;on garde au comptoir.</SousTitre>
      <Liste>
        <Ligne>
          <Nom>
            Savon à lessive
            <Detail>Pour la buanderie, ou pour rapporter</Detail>
          </Nom>
          <Pointilles aria-hidden="true" />
          <Prix>1,00 $</Prix>
        </Ligne>
        <Ligne>
          <Nom>Infuseur à thé</Nom>
          <Pointilles aria-hidden="true" />
          <Prix>10,00 $</Prix>
        </Ligne>
        <Ligne>
          <Nom>Cahier Gribouille</Nom>
          <Pointilles aria-hidden="true" />
          <Prix>2,00 $</Prix>
        </Ligne>
        <Ligne>
          <Nom>
            Les Zempotés
            <Detail>190 ml — aussi en supplément sur votre croissant</Detail>
          </Nom>
          <Pointilles aria-hidden="true" />
          <Prix>—</Prix>
        </Ligne>
        <Ligne>
          <Nom>Autocollants</Nom>
          <Pointilles aria-hidden="true" />
          <Prix>—</Prix>
        </Ligne>
        <Ligne>
          <Nom>
            Carte-cadeau
            <Detail>Le montant que vous voulez</Detail>
          </Nom>
          <Pointilles aria-hidden="true" />
          <Prix>—</Prix>
        </Ligne>
      </Liste>
      <Mention>Taxes incluses. Demandez-nous les prix du moment.</Mention>
    </Section>

    <Provenance>
      <Titre>Si on peut l&apos;avoir local, on le prend local</Titre>
      <Recit>
        Nos bières viennent de Beauregard. Notre eau pétillante, c&apos;est
        Montellier. Nos jus, Oasis et Héritage. Nos boissons, Gutsy et Guru.
        Nos viandes viennent des Fermes Valens. Nos thés, on les choisit avec
        Un Amour des Thés, à Montréal. Nos quiches, de Carrément Tarte, dans
        Saint-Michel.
      </Recit>
      <Recit>
        Le café, lui, ne pousse pas au Québec. Alors on va le chercher là où il
        pousse&nbsp;: à la ferme Las Rosas, en Colombie.
      </Recit>
      <Recit>
        Et nos pâtisseries&nbsp;? Cent pour cent d&apos;entre elles sortent de
        notre cuisine. Toutes.
      </Recit>
    </Provenance>
  </Page>
)

export default BoutiqueContenu

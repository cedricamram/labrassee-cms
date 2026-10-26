import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

import { casse, dateFr, getMenuVivant, getPotageDuJour, prixFr, type Produit, type Section } from '@/frontend/lib/menu-vivant'
import s from './menu-vivant.module.css'

// Projet « Menu vivant par QR » (idée de Sébastien, GO Cédric 29/09/2026).
// Le MENU PAPIER, lisible au téléphone, dont les prix suivent la caisse.
// EN APERÇU tant que Cédric ne l’a pas validé : hors Google (noindex), absent du plan
// du site et de la navigation. Esprit simple comme la carte actuelle (Cédric, 29/09).
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Le menu du jour — La Brassée',
  description: 'Le menu de La Brassée, à jour avec la caisse. Les prix incluent les taxes.',
  robots: { index: false, follow: false },
}

function LigneProduit({ p }: { p: Produit }) {
  const prix = p.formats && p.formats.length
    ? p.formats.map((f) => `${f.libelle} ${prixFr(f.ttc)}`).join(' · ')
    : p.prix_texte
    ? p.prix_texte.replace(/·/g, '/') + ' $'
    : p.prix && p.prix.length
      ? p.prix.map(prixFr).join(' / ')
      : null
  return (
    <li className={s.produit}>
      <div className={s.ligne}>
        <span className={s.nom}>
          {casse(p.nom)}
          {p.format && <span className={s.format}> · {p.format}</span>}
        </span>
        {prix && <span className={s.prix}>{prix}</span>}
      </div>
      {(p.detail || p.etiquette) && (
        <p className={s.saveurs}>{[p.etiquette, p.detail].filter(Boolean).join(' · ')}</p>
      )}
    </li>
  )
}

function BlocSection({ sec }: { sec: Section }) {
  return (
    <div className={s.bloc}>
      {sec.titre && <h3 className={s.blocTitre}>{casse(sec.titre)}</h3>}
      {sec.sous_titre && <p className={s.note}>{sec.sous_titre}</p>}
      {sec.encadres?.map((e, i) => (
        <div key={i} className={s.encadre}>
          {e.titre && <p className={s.encadreTitre}>{casse(e.titre)}</p>}
          {e.texte && <p>{e.texte}</p>}
          {e.prix && <p className={s.encadrePrix}>{e.prix}</p>}
        </div>
      ))}
      {sec.jours && (
        <ul className={s.liste}>
          {sec.jours.map((j, i) => (
            <li key={i} className={s.produit}>
              <p className={s.groupe}>{casse(j.day)}</p>
              {j.text ? (
                <p className={s.saveurs}>{j.text}</p>
              ) : (
                <p className={s.saveurs}>{[j.viande && j.viande !== '—' ? j.viande : null, j.vg && j.vg !== '—' ? `Végé : ${j.vg}` : null].filter(Boolean).join(' · ')}</p>
              )}
            </li>
          ))}
        </ul>
      )}
      {sec.listes?.map((l) => (
        <div key={l.titre} className={s.produit}>
          <p className={s.groupe}>{casse(l.titre)}</p>
          <p className={s.saveurs}>{l.noms.join(' · ')}</p>
        </div>
      ))}
      {sec.produits && (
        <ul className={s.liste}>
          {sec.produits.map((p, i) => <LigneProduit key={i} p={p} />)}
        </ul>
      )}
      {sec.groupes?.map((g, i) => (
        <div key={i}>
          {g.titre && <p className={s.groupe}>{casse(g.titre)}</p>}
          <ul className={s.liste}>
            {g.produits.map((p, k) => <LigneProduit key={k} p={p} />)}
          </ul>
        </div>
      ))}
    </div>
  )
}


// PAUSE (Cédric, 26/10/2026 11h53 : « Oui, en pause jusqu'au 02/11 »). Cette page (adresse du QR du
// menu papier) publiait le menu vivant de PRINTEMPS : des prix plus bas que la caisse (poulet au
// beurre 14,00 contre 16,50) et d'autres plus hauts. Même message que /menu (Menu.jsx, 25/10).
// Retour arrière : voir REOUVERTURE / PAUSE_FORCEE ci-dessous (ou annuler ce commit). Rien n'est supprimé ;
// réouverture prévue le lundi 02/11 avec la base V8.4 (Héphaïstos + Apollon).
// Réouverture AUTOMATIQUE : la page se recalcule toutes les 10 min (revalidate = 600) ; elle sort de la pause
// le lundi 02/11/2026 à 5 h 50 (Montréal, EST = UTC-5), juste après la publication de 5 h 45 avec la base V8.4.
// Forcer la pause : PAUSE_FORCEE = true. Forcer la réouverture : PAUSE_FORCEE = false et date dans le passé.
const PAUSE_FORCEE = false
const REOUVERTURE = new Date('2026-11-02T05:50:00-05:00')
// L'aperçu (préversion de la branche apercu-menu-v84, jamais la production) ignore la pause.
const APERCU = process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_GIT_COMMIT_REF === 'apercu-menu-v84'
const MENU_AUJOURDHUI_SUSPENDU = () => !APERCU && (PAUSE_FORCEE || Date.now() < REOUVERTURE.getTime())

function MenuEnPause() {
  return (
    <div style={{ width: '100%', background: 'var(--color-dark)' }}>
      <section
        style={{
          minHeight: '100vh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', maxWidth: 640, margin: '0 auto',
          padding: '96px 24px', textAlign: 'center', color: 'var(--color-white, #f1efe4)',
        }}
      >
        <img src="/picto_maia_white.svg" alt="La Brassée" width={88} height={88} style={{ marginBottom: 28, opacity: 0.95 }} />
        <h1 style={{ fontSize: '2.2rem', marginBottom: 16 }}>Le menu est en train de changer</h1>
        <p style={{ fontSize: '1.15rem', lineHeight: 1.6, marginBottom: 12 }}>
          On met la carte à jour pour l’automne. Pour les prix et ce qui est servi aujourd’hui,
          demande-nous au comptoir : tout est à jour en salle.
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.6, opacity: 0.85, marginBottom: 28 }}>
          Café, plats du jour, grilled cheese, scones maison, bières d’ici, vins et cocktails : on est ouvert tous les jours.
        </p>
        <Link
          href="/"
          style={{
            color: 'var(--color-dark, #100f09)', background: 'var(--color-brand, #f7d135)', borderRadius: 999,
            padding: '12px 28px', fontWeight: 700, textDecoration: 'none',
          }}
        >
          Voir les horaires et l’accueil
        </Link>
      </section>
    </div>
  )
}

export default async function MenuAujourdhuiPage() {
  if (MENU_AUJOURDHUI_SUSPENDU()) return <MenuEnPause />

  const [menu, potages] = await Promise.all([getMenuVivant(), getPotageDuJour()])

  if (!menu) {
    return (
      <main className={s.page}>
        <h1 className={s.titre}>Le menu</h1>
        <p className={s.vide}>
          Le menu à jour est momentanément indisponible. Tu peux consulter{' '}
          <a href="/menu">notre menu complet</a> ou demander au comptoir.
        </p>
      </main>
    )
  }

  return (
    <main className={s.page}>
      <header className={s.entete}>
        <h1 className={s.titre}>Le menu</h1>
        <p className={s.maj}>Prix à jour au {dateFr(menu.koomi_lu_le)} · taxes incluses</p>
      </header>

      {potages.length > 0 && (
        <section className={s.section} aria-labelledby="t-aujourdhui">
          <h2 id="t-aujourdhui" className={s.sectionTitre}>Aujourd&apos;hui</h2>
          <div className={s.bloc}>
            <ul className={s.liste}>
              {potages.map((nom) => (
                <li key={nom} className={s.produit}>
                  <div className={s.ligne}>
                    <span className={s.nom}>{nom}</span>
                  </div>
                  <p className={s.saveurs}>Le potage du moment, tant qu&apos;il en reste</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <nav className={s.raccourcis} aria-label="Pages du menu">
        {menu.pages.map((p) => (
          <a key={p.id} href={`#${p.id}`} className={s.puce}>{casse(p.titre)}</a>
        ))}
      </nav>

      {menu.pages.map((p) => (
        <section key={p.id} id={p.id} className={s.section} aria-labelledby={`t-${p.id}`}>
          <h2 id={`t-${p.id}`} className={s.sectionTitre}>{casse(p.titre)}</h2>
          {p.sous_titre && <p className={s.note}>{p.sous_titre}</p>}
          {p.sections.map((sec, i) => <BlocSection key={i} sec={sec} />)}
        </section>
      ))}

      <footer className={s.pied}>
        <p>C’est le menu de nos tables, avec les prix de la caisse. Une allergie, une question ? Demande-nous au comptoir.</p>
        {(menu.controle?.filtres_inactifs_koomi?.length ?? 0) > 0 && (
          <p className={s.note}>Certains produits ne sont pas disponibles en ce moment et n&apos;apparaissent pas ici.</p>
        )}
      </footer>
    </main>
  )
}

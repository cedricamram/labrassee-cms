import React from 'react'
import type { Metadata } from 'next'

import { casse, dateFr, getMenuVivant, prixFr, type Produit, type Section } from '@/frontend/lib/menu-vivant'
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

export default async function MenuAujourdhuiPage() {
  const menu = await getMenuVivant()

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

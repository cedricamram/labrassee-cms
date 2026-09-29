import React from 'react'
import type { Metadata } from 'next'

import { dateFr, getMenuVivant, prixFr } from '@/frontend/lib/menu-vivant'
import s from './menu-vivant.module.css'

// Projet « Menu vivant par QR » (idée de Sébastien, GO Cédric 29/09/2026).
// Le menu que lit le client en scannant le QR de sa table : construit chaque matin
// depuis la caisse (Koomi, lecture seule). EN APERÇU tant que Cédric ne l'a pas
// validé : hors Google (noindex), absent du plan du site et du menu de navigation.
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Le menu du jour — La Brassée',
  description: 'Le menu de La Brassée, à jour avec la caisse. Les prix incluent les taxes.',
  robots: { index: false, follow: false },
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
        <p className={s.maj}>À jour au {dateFr(menu.koomi_lu_le)} · les prix incluent les taxes</p>
      </header>

      <nav className={s.raccourcis} aria-label="Catégories du menu">
        {menu.sections.map((sec) => (
          <a key={sec.id} href={`#${sec.id}`} className={s.puce}>
            {sec.titre.replace(/\s*\(.*\)$/, '')}
          </a>
        ))}
      </nav>

      {menu.sections.map((sec) => (
        <section key={sec.id} id={sec.id} className={s.section} aria-labelledby={`t-${sec.id}`}>
          <h2 id={`t-${sec.id}`} className={s.sectionTitre}>{sec.titre}</h2>
          {sec.note && <p className={s.note}>{sec.note}</p>}
          <ul className={s.liste}>
            {sec.produits.map((p) => (
              <li key={p.nom} className={s.produit}>
                {p.choix ? (
                  <>
                    <p className={s.groupe}>{p.nom}</p>
                    <ul className={s.choix}>
                      {p.choix.map((c) => (
                        <li key={c.nom} className={s.ligne}>
                          <span className={s.nom}>{c.nom}</span>
                          <span className={s.prix}>{prixFr(c.ttc)}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className={s.ligne}>
                    <span className={s.nom}>{p.nom}</span>
                    {p.prix && (
                      <span className={s.prix}>
                        {p.prix
                          .map((x) => (x.libelle ? `${x.libelle} ${prixFr(x.ttc)}` : prixFr(x.ttc)))
                          .join(' · ')}
                      </span>
                    )}
                  </div>
                )}
                {p.saveurs && p.saveurs.length > 0 && <p className={s.saveurs}>{p.saveurs.join(' · ')}</p>}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <footer className={s.pied}>
        <p>Ce menu suit la caisse et se met à jour chaque matin. S’il diffère du menu papier, c’est celui-ci qui fait foi.</p>
        <p>Une allergie, une question ? Demande-nous au comptoir.</p>
      </footer>
    </main>
  )
}

'use client'

import React, { useMemo, useState } from 'react'
import s from '../menu-vivant.module.css'
import k from './karaoke.module.css'

type Section = { titre: string; chansons: string[] }

const sansAccent = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

export default function KaraokeListe({ sections }: { sections: Section[] }) {
  const [q, setQ] = useState('')
  const filtre = sansAccent(q.trim().replace(/[’']/g, ' '))
  const mots = useMemo(() => filtre.split(/\s+/).filter(Boolean), [filtre])
  const visibles = useMemo(
    () =>
      sections
        .map((sec) => ({
          ...sec,
          // chaque mot tapé doit se trouver quelque part dans « titre - artiste », dans n'importe quel ordre
          chansons: mots.length ? sec.chansons.filter((c) => { const t = sansAccent(c.replace(/[’']/g, ' ')); return mots.every((m) => t.includes(m)) }) : sec.chansons,
        }))
        .filter((sec) => sec.chansons.length > 0),
    [sections, mots],
  )
  const total = visibles.reduce((n, sec) => n + sec.chansons.length, 0)

  return (
    <>
      <div className={k.recherche}>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Un titre, un chanteur ou un mot"
          aria-label="Chercher une chanson ou un artiste"
          className={k.champ}
          autoComplete="off"
          enterKeyHint="search"
        />
        {filtre && <p className={s.note}>{total === 0 ? 'Rien trouvé : essaie un autre mot.' : `${total} résultat${total > 1 ? 's' : ''}`}</p>}
      </div>
      {visibles.map((sec) => (
        <section key={sec.titre} className={s.section}>
          <h2 className={s.sectionTitre}>{sec.titre.charAt(0) + sec.titre.slice(1).toLowerCase()}</h2>
          <ul className={k.liste}>
            {sec.chansons.map((c, i) => (
              <li key={i} className={k.chanson}>{c}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}

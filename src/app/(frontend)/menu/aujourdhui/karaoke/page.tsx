import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

import liste from '@/frontend/data/karaoke-20261120.json'
import KaraokeListe from './KaraokeListe'
import s from '../menu-vivant.module.css'

// La liste des chansons du Super karaoké du 20/11/2026 (domlebo, 19 h 30), accessible depuis le QR du menu
// (Cédric, 20/11/2026 18 h 29). Les chansons sont recopiées telles quelles du PDF de Cédric ; rien n'est réécrit.
export const metadata: Metadata = {
  title: 'Super karaoké — La Brassée',
  description: 'La liste des chansons du Super karaoké 100 % franco.',
  robots: { index: false, follow: false },
}

export default function KaraokePage() {
  return (
    <main className={s.page}>
      <header className={s.entete}>
        <h1 className={s.titre}>Super karaoké</h1>
        <p className={s.maj}>{liste.titre.replace('SUPER KARAOKÉ du ', 'Le ')}</p>
      </header>
      <KaraokeListe sections={liste.sections} />
      <p className={s.pied}>
        <Link href="/menu/aujourdhui">← Voir le menu</Link>
      </p>
    </main>
  )
}

'use client'

import React from 'react'
import Link from 'next/link'
import MenuFlipbook from '../components/menu/MenuFlipbook'
import MenuTexte from '../components/menu/MenuTexte'

// VARIANTE B — préparée par Apollon le 25/10/2026, NON APPLIQUÉE.
// Tant que le menu papier V8.4 n'est pas validé par Cédric, les 8 images
// (édition de printemps, prix périmés) et le menu texte (menu-texte.js, mêmes
// prix périmés) sont suspendus. Pour revenir en arrière : mettre
// MENU_EN_LIGNE_SUSPENDU à false (ou annuler le commit). Les PNG et menu-texte.js
// restent dans le dépôt, rien n'est supprimé.
const MENU_EN_LIGNE_SUSPENDU = true

const MenuEnPause = () => (
  <section
    style={{
      minHeight: '100vh',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 640,
      margin: '0 auto',
      padding: '96px 24px',
      textAlign: 'center',
      color: 'var(--color-white, #f1efe4)',
    }}
  >
    <img
      src="/picto_maia_white.svg"
      alt="La Brassée"
      width={88}
      height={88}
      style={{ marginBottom: 28, opacity: 0.95 }}
    />
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
        color: 'var(--color-dark, #100f09)',
        background: 'var(--color-brand, #f7d135)',
        borderRadius: 999,
        padding: '12px 28px',
        fontWeight: 700,
        textDecoration: 'none',
      }}
    >
      Voir les horaires et l’accueil
    </Link>
  </section>
)

const Menu = () => {
  if (MENU_EN_LIGNE_SUSPENDU) {
    return (
      <div style={{ width: '100%', background: 'var(--color-dark)' }}>
        <MenuEnPause />
      </div>
    )
  }
  return (
    <div style={{ width: '100%', background: 'var(--color-dark)' }}>
      <MenuFlipbook />
      <MenuTexte />
    </div>
  )
}

export default Menu

import type { Metadata } from 'next'
import React from 'react'

import Analytics from '@/frontend/components/analytics/Analytics'
import FrontendShell from '@/frontend/components/layout/FrontendShell'
import StyledComponentsRegistry from '@/frontend/components/layout/StyledComponentsRegistry'
import { getBusinessInfoData } from '@/frontend/lib/payload-data'
import '@/frontend/styles/app.css'

const DESCRIPTION =
  "Café de quartier au 2522 Beaubien Est, dans Rosemont–La Petite-Patrie. 100 % de nos pâtisseries sont faites maison. Café en grains, thés en vrac et laits à emporter. Buanderie sur place. Concerts et expositions toute l'année."
const TITRE = 'La Brassée — Café, buanderie et scène · Rosemont–La Petite-Patrie'

// 2026-09-29 : sans Open Graph, un lien partagé sur Facebook, Instagram ou Messenger
// s'affichait sans image. L'aperçu par défaut est la façade (enseigne visible) ;
// /scene/[slug] garde son propre aperçu.
export const metadata: Metadata = {
  metadataBase: new URL('https://www.labrassee.cafe'),
  description: DESCRIPTION,
  title: TITRE,
  alternates: { canonical: './' },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    siteName: 'La Brassée',
    title: TITRE,
    description: DESCRIPTION,
    images: [{ url: '/images/og/facade-og.jpg', width: 1200, height: 630, alt: 'La façade de La Brassée, rue Beaubien Est' }],
  },
  twitter: { card: 'summary_large_image', title: TITRE, description: DESCRIPTION, images: ['/images/og/facade-og.jpg'] },
}

export default async function FrontendLayout(props: { children: React.ReactNode }) {
  const { children } = props
  const businessInfo = await getBusinessInfoData()

  return (
    <html lang="fr-CA" className="app-loading">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/brand/icon-cafe-32.png?v=3" />
        <link rel="icon" type="image/png" sizes="512x512" href="/images/brand/icon-cafe-512.png?v=3" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
        {/* Trois feuilles de style EXTERNES (Typekit, Font Awesome ~102 Ko, Themify) : en
            rendu-bloquant, le téléphone n'affichait RIEN tant qu'elles n'étaient pas
            revenues (mesuré 05/10 : cdnjs ~0,8 s de plus sur le chemin critique, depuis
            un wifi — pire sur LTE). On les charge sans bloquer : media="print" jusqu'à
            l'arrivée, puis « all ». Contrepartie assumée : le texte s'affiche d'abord dans
            la police de repli et les icônes arrivent un instant après. <noscript> : sans
            JavaScript, elles se chargent normalement. */}
        <link rel="stylesheet" href="https://use.typekit.net/ovt4lgv.css" media="print" data-async-css="" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
          media="print"
          data-async-css=""
        />
        <link
          href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css"
          rel="stylesheet"
          media="print"
          data-async-css=""
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.querySelectorAll('link[data-async-css]').forEach(function(l){function ok(){l.media='all'}if(l.sheet){ok()}else{l.addEventListener('load',ok);l.addEventListener('error',ok)}})",
          }}
        />
        <noscript>
          <link rel="stylesheet" href="https://use.typekit.net/ovt4lgv.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css" />
        </noscript>
      </head>
      <body className="app-loading">
        <StyledComponentsRegistry>
          <FrontendShell businessInfo={businessInfo}>{children}</FrontendShell>
        </StyledComponentsRegistry>
        <Analytics />
      </body>
    </html>
  )
}

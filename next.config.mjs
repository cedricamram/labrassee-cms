import { withPayload } from '@payloadcms/next/withPayload'

// 2026-09-29 — en-têtes de sécurité de base (mesurés absents depuis dehors) et
// redirections des liens cassés publiés ailleurs. Pas de CSP ici : Typekit,
// FontAwesome, Themify et l'analytique demandent une liste précise, à poser
// séparément et à vérifier page par page.
const ENTETES_SECURITE = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  compiler: {
    styledComponents: true,
  },
  output: 'standalone',
  // `x-powered-by: Next.js` annonçait la technologie à qui la cherchait.
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: ENTETES_SECURITE }]
  },
  async redirects() {
    return [
      // murs-publique/index.html:756 pointait vers /evenements (404).
      { source: '/evenements', destination: '/scene', permanent: true },
      { source: '/murs', destination: '/expo', permanent: true },
      // QR du menu imprimé (Hermès 29/10 12h59, feu vert) : adresse courte en majuscules pour un QR de 25 modules
      // lisible à 1,5 cm. TEMPORAIRE exprès (307) : un QR imprimé ne se réimprime pas, sa destination doit pouvoir changer.
      { source: '/M', destination: '/menu/aujourdhui', permanent: false },
      { source: '/m', destination: '/menu/aujourdhui', permanent: false },
    ]
  },
}

export default withPayload(nextConfig)

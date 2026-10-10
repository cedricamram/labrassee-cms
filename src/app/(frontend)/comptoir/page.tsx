import { notFound } from 'next/navigation'

// 2026-09-28 — La Brassée ne recrute plus (décision de Cédric) : la page
// « Passe de notre côté du comptoir » est retirée du site et du menu.
// Le composant `@/frontend/pages/Comptoir` et l'API /api/candidature restent
// dans le dépôt pour la prochaine embauche : pour rouvrir, restaurer ce fichier
// (git log -- "src/app/(frontend)/comptoir/page.tsx") et le lien du Header.
export default function ComptoirPage() {
  notFound()
}

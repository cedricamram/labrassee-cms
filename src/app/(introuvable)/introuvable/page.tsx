import { notFound } from 'next/navigation'

// Toute adresse que rien d'autre ne sert arrive ici (next.config, rewrites « fallback » : les pages, l'admin, les API,
// les fichiers et les redirections passent avant). PAS de route attrape-tout : avec « [...] », le contrôle de code de Next
// prend chaque lien <a> du site pour un lien vers une page et refuse la construction.
// /comptoir arrive ici aussi (La Brassée ne recrute plus, décision de Cédric du 28/09). Pour le rouvrir : restaurer
// "src/app/(frontend)/comptoir/page.tsx" (git log) et le lien du Header ; le composant et l'API sont restés dans le dépôt.
export default function Introuvable() {
  notFound()
}

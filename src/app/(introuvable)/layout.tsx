// 2026-11-25 — même habillage que le site (menu, bas de page), mais HORS de l'écran de chargement de (frontend) :
// sous un loading.tsx, Next répond « 200 » avant de savoir que la page n'existe pas. Ici l'adresse inconnue répond un vrai 404.
export { default, metadata } from '../(frontend)/layout'

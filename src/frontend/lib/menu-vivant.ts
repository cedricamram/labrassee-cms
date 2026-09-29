/**
 * Menu vivant — lit le menu publié depuis Koomi (table public.menu_vivant).
 * Projet « Menu vivant par QR » (idée de Sébastien, GO Cédric 29/09/2026).
 * Construit chaque matin sur le Mac par ~/labrassee-scripts/bin/menu_v2/menu_vivant.py
 * (lecture seule de Koomi). Le site ne fait que lire.
 */
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './surlascene-data'

export type Prix = { libelle?: string; ttc: number }
export type Choix = { nom: string; ttc: number }
export type Produit = { nom: string; prix?: Prix[]; choix?: Choix[]; saveurs?: string[] }
export type Section = { id: string; titre: string; note: string | null; produits: Produit[] }
export type MenuVivant = { koomi_lu_le: string; genere_le: string; sections: Section[] }

export async function getMenuVivant(): Promise<MenuVivant | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/menu_vivant?select=contenu&id=eq.1`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
      next: { revalidate: 600, tags: ['menu-vivant'] },
    })
    if (!res.ok) {
      console.error('[menu-vivant] lecture impossible', res.status)
      return null
    }
    const rows = (await res.json()) as Array<{ contenu: MenuVivant }>
    return rows[0]?.contenu ?? null
  } catch (e) {
    console.error('[menu-vivant] erreur', e)
    return null
  }
}

export function prixFr(n: number): string {
  return n.toLocaleString('fr-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' $'
}

export function dateFr(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-CA', {
    timeZone: 'America/Toronto', weekday: 'long', day: 'numeric', month: 'long',
  })
}

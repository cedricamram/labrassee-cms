/**
 * Menu vivant — lit le menu publié (table public.menu_vivant).
 * Projet « Menu vivant par QR » (idée de Sébastien, GO Cédric 29/09/2026).
 *
 * v2 (Cédric, 29/09 21h33) : le contenu est le MENU PAPIER (menu_data.json, le fichier
 * même qui produit la carte imprimée) ; la caisse (Koomi, lecture seule) ne fait que
 * tenir les prix. Construit sur le Mac par ~/labrassee-scripts/bin/menu_v2/menu_vivant.py.
 */
import { SUPABASE_ANON_KEY, SUPABASE_URL } from './surlascene-data'

export type Produit = {
  nom: string
  detail?: string
  format?: string
  etiquette?: string
  prix?: number[]
  prix_texte?: string
  /** Tableau à colonnes du papier : « Court ou allongé » 3,60 $ … */
  formats?: { libelle: string; ttc: number }[]
}
export type Section = {
  titre?: string
  sous_titre?: string
  produits?: Produit[]
  groupes?: { titre?: string; produits: Produit[] }[]
  jours?: { day?: string; vg?: string; viande?: string; text?: string }[]
  listes?: { titre: string; noms: string[] }[]
  encadres?: { titre?: string; texte?: string; prix?: string }[]
}
export type Page = { id: string; titre: string; sous_titre?: string; sections: Section[] }
export type CorrespondanceKoomi = { id: number; statut: string; nom: string }
export type Controle = {
  retrouves_en_caisse: number
  corriges: { produit: string; papier: number; caisse: number }[]
  non_retrouves: string[]
  filtres_inactifs_koomi: string[]
}
export type MenuVivant = {
  version: number
  koomi_lu_le: string
  /** Date de l'audit Koomi (statuts Active/Inactive) utilisé pour le filtrage. */
  koomi_audit_le?: string
  genere_le: string
  pages: Page[]
  /** Table de correspondance nom_normalisé → {id Koomi, statut, nom original}. */
  correspondances_koomi?: Record<string, CorrespondanceKoomi>
  controle?: Controle
}

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
    const menu = rows[0]?.contenu
    // Un document d'un autre format (v1) ne s'affiche pas à moitié : repli honnête.
    return menu && menu.version >= 2 && Array.isArray(menu.pages) ? menu : null
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

/** « GRILLED CHEESE » → « Grilled cheese » : le papier est en capitales, l'écran se lit mieux sans. */
export function casse(s?: string): string {
  if (!s) return ''
  if (s !== s.toUpperCase()) return s
  const bas = s.toLocaleLowerCase('fr-CA')
  return bas.charAt(0).toLocaleUpperCase('fr-CA') + bas.slice(1)
}

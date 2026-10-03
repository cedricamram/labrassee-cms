import crypto from 'node:crypto'
import { revalidatePath, revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

// Rafraîchir le menu vivant À LA DEMANDE, au lieu de subir les 600 s de l'ISR.
//
// POURQUOI CETTE ROUTE EXISTE — condition de la MISE EN SERVICE publique du QR,
// portée par Hermès (directive 56b8ae4c, 02/10/2026) : la page /menu/aujourdhui
// porte `export const revalidate = 600` et le dépôt n'avait AUCUN revalidateTag.
// Donc après une correction de prix publiée, jusqu'à 10 minutes d'attente, et
// aucun moyen de forcer. Tant que la page est en aperçu (noindex) ça ne mord pas ;
// le jour où elle est publique, ça mord.
// Le tag est DÉJÀ posé sur le fetch (src/frontend/lib/menu-vivant.ts) : il ne
// manquait que ce qui le déclenche.
//
// FERMÉE PAR DÉFAUT : sans MENU_VIVANT_REVALIDATE_SECRET en environnement, la
// route refuse. Un secret absent n'ouvre jamais la porte.
// POST SEULEMENT : une revalidation en GET se ferait tirer par un préchargement
// ou un robot, donc par n'importe qui.

const TAG = 'menu-vivant'
const CHEMIN = '/menu/aujourdhui'

/** Comparaison à temps constant — une égalité de chaîne fuit par sa durée. */
function memeSecret(donne: string, attendu: string): boolean {
  const a = Buffer.from(donne)
  const b = Buffer.from(attendu)
  // timingSafeEqual exige des longueurs égales : on hache pour les égaliser au
  // lieu de comparer les tailles, qui fuirait la longueur du secret.
  return crypto.timingSafeEqual(
    crypto.createHash('sha256').update(a).digest(),
    crypto.createHash('sha256').update(b).digest(),
  )
}

export async function POST(request: Request) {
  const attendu = process.env.MENU_VIVANT_REVALIDATE_SECRET
  if (!attendu) {
    // 503 et pas 401 : une clé ABSENTE et une clé FAUSSE ne doivent pas se
    // ressembler, sinon on cherche le mauvais défaut pendant une heure.
    return NextResponse.json(
      { ok: false, raison: 'MENU_VIVANT_REVALIDATE_SECRET absent de cet environnement' },
      { status: 503 },
    )
  }

  const donne =
    request.headers.get('x-revalidate-secret') ||
    new URL(request.url).searchParams.get('secret') ||
    ''
  if (!donne || !memeSecret(donne, attendu)) {
    return NextResponse.json({ ok: false, raison: 'secret refusé' }, { status: 401 })
  }

  // Les deux, et c'est voulu : `revalidateTag` purge la donnée (le fetch tagué),
  // `revalidatePath` purge la page rendue. Oublier le second laisserait la page
  // servir son HTML en cache jusqu'au bout des 600 s.
  revalidateTag(TAG)
  revalidatePath(CHEMIN)

  return NextResponse.json({
    ok: true,
    tag: TAG,
    chemin: CHEMIN,
    quand: new Date().toLocaleString('fr-CA', { timeZone: 'America/Toronto' }),
  })
}

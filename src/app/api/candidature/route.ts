import { NextResponse } from 'next/server'

/**
 * Dépôt d'une candidature — page « Passe de notre côté du comptoir ».
 * Ouvert le 2026-08-23. Cadre : docs/chantiers/2026-08-23_onglet-comptoir.md
 *
 * ⚠️ Écrit dans `candidatures`, JAMAIS dans `recruitment_profiles` (dossier
 * d'embauche : NAS, bancaire, TD1 — ne se remplit qu'après embauche).
 * ⚠️ N'accepte AUCUN champ sensible : ni NAS, ni date de naissance, ni adresse.
 *    Tout champ inconnu envoyé par le client est ignoré, pas stocké.
 */

const SUPABASE_URL = 'https://xjlpttrziisldlclhsth.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbHB0dHJ6aWlzbGRsY2xoc3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjkyODMsImV4cCI6MjA5MjA0NTI4M30.JpkTnJF1ZP08ybzFdM8fFUJOTiKYx8ltTe2nxiDPk24'

const RESEND_BASE_URL = 'https://api.resend.com'
const FROM_ADDRESS = 'La Brassée <info@labrassee.cafe>'

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 heure
const RATE_LIMIT_MAX_PER_EMAIL = 2
const RATE_LIMIT_MAX_PER_IP = 6

const rateLimitEmail = new Map<string, number[]>()
const rateLimitIP = new Map<string, number[]>()

const JOURS = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
const PLAGES = ['matin', 'midi', 'soir']

function checkRateLimit(store: Map<string, number[]>, key: string, max: number): boolean {
  const now = Date.now()
  const recent = (store.get(key) || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  store.set(key, recent)
  return recent.length > max
}

function getClientIP(request: Request): string {
  const fwd = request.headers.get('x-forwarded-for') || ''
  const real = request.headers.get('x-real-ip') || ''
  return fwd.split(',')[0]?.trim() || real || 'unknown'
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function texte(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null
  const t = v.trim()
  if (!t) return null
  return t.slice(0, max)
}

/** Ne garde que les jours/plages connus — rien d'autre n'entre en base. */
function nettoyerDispos(v: unknown): Record<string, string[]> {
  const out: Record<string, string[]> = {}
  if (!v || typeof v !== 'object') return out
  for (const [jour, plages] of Object.entries(v as Record<string, unknown>)) {
    if (!JOURS.includes(jour) || !Array.isArray(plages)) continue
    const gardees = plages.filter((p) => typeof p === 'string' && PLAGES.includes(p))
    if (gardees.length) out[jour] = [...new Set(gardees as string[])]
  }
  return out
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ erreur: 'Requête invalide.' }, { status: 400 })
    }

    // Piège à robots : un champ invisible que seul un script remplit.
    if (texte((body as Record<string, unknown>).site_web, 200)) {
      // On répond « ok » pour ne pas renseigner le robot, sans rien enregistrer.
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    const prenom = texte((body as Record<string, unknown>).prenom, 80)
    const nom = texte((body as Record<string, unknown>).nom, 80)
    const courrielBrut = texte((body as Record<string, unknown>).courriel, 160)
    const telephone = texte((body as Record<string, unknown>).telephone, 25)
    const presentation = texte((body as Record<string, unknown>).presentation, 2000)

    if (!prenom || !nom) {
      return NextResponse.json({ erreur: 'Il nous faut ton prénom et ton nom.' }, { status: 400 })
    }
    if (!courrielBrut && !telephone) {
      return NextResponse.json(
        { erreur: 'Laisse-nous au moins un courriel ou un numéro pour te répondre.' },
        { status: 400 },
      )
    }
    const courriel = courrielBrut ? courrielBrut.toLowerCase() : null
    if (courriel && !isValidEmail(courriel)) {
      return NextResponse.json({ erreur: "Ce courriel n'a pas l'air valide." }, { status: 400 })
    }
    if (!presentation || presentation.length < 10) {
      return NextResponse.json(
        { erreur: 'Raconte-nous un peu qui tu es — quelques lignes suffisent.' },
        { status: 400 },
      )
    }

    const dispos = nettoyerDispos((body as Record<string, unknown>).dispos)
    if (Object.keys(dispos).length === 0) {
      return NextResponse.json(
        { erreur: 'Coche au moins une disponibilité — c’est ce qui nous sert le plus.' },
        { status: 400 },
      )
    }

    const ip = getClientIP(request)
    if (checkRateLimit(rateLimitIP, ip, RATE_LIMIT_MAX_PER_IP)) {
      return NextResponse.json({ erreur: 'Trop de tentatives. Réessaie plus tard.' }, { status: 429 })
    }
    if (courriel && checkRateLimit(rateLimitEmail, courriel, RATE_LIMIT_MAX_PER_EMAIL)) {
      return NextResponse.json(
        { erreur: 'On a déjà reçu ta candidature. On te répond bientôt.' },
        { status: 429 },
      )
    }

    const nombre = (v: unknown): number | null => {
      const n = typeof v === 'number' ? v : parseInt(String(v ?? ''), 10)
      return Number.isFinite(n) && n >= 0 && n <= 60 ? n : null
    }
    const dateISO = (v: unknown): string | null => {
      const t = texte(v, 10)
      return t && /^\d{4}-\d{2}-\d{2}$/.test(t) ? t : null
    }

    // Liste blanche stricte : rien d'autre ne part vers la base.
    const ligne = {
      prenom,
      nom,
      courriel,
      telephone,
      dispos,
      heures_min: nombre((body as Record<string, unknown>).heures_min),
      heures_max: nombre((body as Record<string, unknown>).heures_max),
      debut_possible: dateISO((body as Record<string, unknown>).debut_possible),
      experience:
        typeof (body as Record<string, unknown>).experience === 'boolean'
          ? ((body as Record<string, unknown>).experience as boolean)
          : null,
      experience_detail: texte((body as Record<string, unknown>).experience_detail, 500),
      presentation,
      source: texte((body as Record<string, unknown>).source, 200),
      statut: 'nouvelle',
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/candidatures`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(ligne),
    })

    if (!res.ok) {
      console.error('candidature insert', res.status, await res.text())
      return NextResponse.json(
        { erreur: "Ça n'a pas passé de notre côté. Réessaie dans quelques minutes." },
        { status: 502 },
      )
    }

    // ── Accusé de réception. Signé « La Brassée » — jamais un nom d'agent.
    if (courriel && process.env.RESEND_API_KEY) {
      const html = `<p>Salut ${prenom},</p>
<p>On a bien reçu ta candidature pour le comptoir. Merci d'avoir pris le temps.</p>
<p><strong>On te répond dans les sept jours, même si c'est non.</strong> Une porte ouverte qui ne répond pas, c'est pire qu'une porte fermée.</p>
<p>Si ça clique, on t'invite à venir prendre un café de ce côté-ci du comptoir, et on jase.</p>
<p>— La Brassée<br>2522 Beaubien Est, Montréal<br><a href="https://labrassee.cafe">labrassee.cafe</a></p>
<p style="font-size:12px;color:#777;margin-top:24px">On garde ta candidature six mois, puis elle est supprimée. Écris-nous à info@labrassee.cafe si tu veux qu'on l'efface avant.</p>`

      const text = `Salut ${prenom},

On a bien reçu ta candidature pour le comptoir. Merci d'avoir pris le temps.

On te répond dans les sept jours, même si c'est non. Une porte ouverte qui ne répond pas, c'est pire qu'une porte fermée.

Si ça clique, on t'invite à venir prendre un café de ce côté-ci du comptoir, et on jase.

— La Brassée
2522 Beaubien Est, Montréal
labrassee.cafe

On garde ta candidature six mois, puis elle est supprimée. Écris-nous à info@labrassee.cafe si tu veux qu'on l'efface avant.`

      await fetch(`${RESEND_BASE_URL}/emails`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: FROM_ADDRESS,
          to: [courriel],
          subject: 'On a reçu ta candidature',
          html,
          text,
        }),
      }).catch((err) => console.error('Resend error', err))
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('candidature route', err)
    return NextResponse.json({ erreur: 'Erreur inattendue.' }, { status: 500 })
  }
}

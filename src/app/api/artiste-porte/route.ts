import { NextResponse } from 'next/server'

const SUPABASE_URL = 'https://xjlpttrziisldlclhsth.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbHB0dHJ6aWlzbGRsY2xoc3RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NjkyODMsImV4cCI6MjA5MjA0NTI4M30.JpkTnJF1ZP08ybzFdM8fFUJOTiKYx8ltTe2nxiDPk24'

const RESEND_BASE_URL = 'https://api.resend.com'
const FROM_ADDRESS = 'La Brassée <info@labrassee.cafe>'

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 heure
const RATE_LIMIT_MAX_PER_EMAIL = 3
const RATE_LIMIT_MAX_PER_IP = 10

// Rate limiting en mémoire (se réinitialise au redémarrage du container Vercel)
const rateLimitEmail = new Map<string, number[]>()
const rateLimitIP = new Map<string, number[]>()

const ALLOWED_ORIGINS = new Set([
  'https://scene-depot.labrassee.cafe',
  'https://labrassee-murs-depot.vercel.app',
  'https://labrassee-pages-depot.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001',
])

const PLATEFORMES = new Set(['scene', 'murs', 'pages'])

function checkRateLimit(store: Map<string, number[]>, key: string, max: number): boolean {
  const now = Date.now()
  const prev = store.get(key) || []
  const recent = prev.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS)
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

function corsHeaders(origin: string | null) {
  const allowed = origin && ALLOWED_ORIGINS.has(origin) ? origin : null
  if (!allowed) return {}
  return {
    'Access-Control-Allow-Origin': allowed,
    'Vary': 'Origin',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin')
  return new Response(null, { status: 204, headers: corsHeaders(origin) })
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  const headers = corsHeaders(origin)

  try {
    const body = await request.json().catch(() => ({})) as { courriel?: string; plateforme?: string }
    const courriel = (body.courriel || '').trim().toLowerCase()
    const plateforme = (body.plateforme || 'scene').trim()

    if (!isValidEmail(courriel)) {
      return NextResponse.json({ ok: true }, { headers })
    }
    if (!PLATEFORMES.has(plateforme)) {
      return NextResponse.json({ ok: true }, { headers })
    }

    // Rate limiting
    const ip = getClientIP(request)
    if (checkRateLimit(rateLimitEmail, courriel, RATE_LIMIT_MAX_PER_EMAIL)) {
      return NextResponse.json({ ok: true }, { headers })
    }
    if (checkRateLimit(rateLimitIP, ip, RATE_LIMIT_MAX_PER_IP)) {
      return NextResponse.json({ ok: true }, { headers })
    }

    // Appel RPC SECURITY DEFINER — lookup + création si inconnu (scene seulement)
    const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/artiste_porte_obtenir_lien`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_courriel: courriel, p_plateforme: plateforme }),
    })

    if (!rpcRes.ok) {
      console.error('artiste_porte RPC error', rpcRes.status, await rpcRes.text())
      return NextResponse.json({ ok: true }, { headers })
    }

    const rpcData = (await rpcRes.json()) as { ok?: boolean; lien?: string | null }
    const lien = rpcData?.lien

    // Si lien disponible → envoyer l'email
    if (lien) {
      const resendKey = process.env.RESEND_API_KEY
      if (resendKey) {
        const html = `<p>Salut,</p>
<p>Voici le lien de ton dossier à La Brassée. Il ouvre ta fiche, tes photos, et les soirs encore libres sur notre scène.</p>
<p><a href="${lien}" style="display:inline-block;margin:16px 0;padding:12px 24px;background:#f7d135;color:#1a1a1a;text-decoration:none;border-radius:6px;font-weight:600">Ouvrir mon dossier →</a></p>
<p>Garde-le : c'est le même à chaque fois. Tu peux y revenir quand tu veux, pour choisir une date ou pour mettre tes photos à jour.</p>
<p>Au plaisir de t'entendre,</p>
<p>— La Brassée<br>2522 Beaubien Est, Montréal<br><a href="https://labrassee.cafe">labrassee.cafe</a></p>`

        const text = `Salut,

Voici le lien de ton dossier à La Brassée. Il ouvre ta fiche, tes photos, et les soirs encore libres sur notre scène.

${lien}

Garde-le : c'est le même à chaque fois. Tu peux y revenir quand tu veux, pour choisir une date ou pour mettre tes photos à jour.

Au plaisir de t'entendre,

— La Brassée
2522 Beaubien Est, Montréal
labrassee.cafe`

        await fetch(`${RESEND_BASE_URL}/emails`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: FROM_ADDRESS,
            to: [courriel],
            subject: 'Ton dossier à La Brassée',
            html,
            text,
          }),
        }).catch((err) => console.error('Resend error', err))
      }
    }

    return NextResponse.json({ ok: true }, { headers })
  } catch (err) {
    console.error('artiste-porte error', err)
    return NextResponse.json({ ok: true }, { headers })
  }
}

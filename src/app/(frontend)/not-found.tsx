import Link from 'next/link'

// 2026-11-25 — client mystère, impasse n° 13 : une adresse inconnue tombait sur la page anglaise de Next, sans menu ni issue.
// Le menu et le bas de page viennent de l'habillage du site ; ici on le dit en français et on offre des chemins qui existent.
const CHEMINS = [
  { href: '/', texte: 'Accueil' },
  { href: '/menu', texte: 'Le menu' },
  { href: '/scene', texte: 'La scène' },
  { href: '/expo', texte: 'Sur nos murs' },
  { href: '/proposer', texte: 'Proposer quelque chose' },
]

export default function Introuvable() {
  return (
    <section
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.25rem',
        padding: '104px 20px 64px',
        textAlign: 'center',
        color: 'var(--color-white, #f1efe4)',
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: 'var(--font-din)',
          fontSize: 'clamp(2.5rem, 9vw, 4.5rem)',
          textTransform: 'uppercase',
          color: 'var(--color-brand, #f7d135)',
        }}
      >
        Page introuvable
      </h1>
      <p style={{ margin: 0, maxWidth: '30rem', lineHeight: 1.5 }}>
        Cette adresse ne mène nulle part chez nous. Elle a peut-être changé.
      </p>
      <nav aria-label="Où aller" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', maxWidth: '34rem' }}>
        {CHEMINS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            style={{ padding: '10px 18px', border: '1px solid var(--color-brand, #f7d135)', borderRadius: '999px', color: 'inherit', textDecoration: 'none' }}
          >
            {c.texte}
          </Link>
        ))}
      </nav>
      <p style={{ margin: 0, fontSize: '0.95rem' }}>
        Artiste de la scène ?{' '}
        <a href="mailto:surlascene@labrassee.cafe" style={{ color: 'var(--color-brand, #f7d135)' }}>
          surlascene@labrassee.cafe
        </a>
      </p>
    </section>
  )
}

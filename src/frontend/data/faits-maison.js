// Réservoir de faits pour l'accueil + rotation hebdomadaire.
//
// Idée de Cédric, 13/08/2026 : « fais vivre la première page… change chaque
// lundi quelques chiffres clés, les deux phrases choc. Ainsi on aura une
// première page vivante. »
//
// Fonctionnement : aucune infrastructure. La page d'accueil a revalidate=300,
// donc elle se régénère toutes les 5 minutes ; la sélection est calculée à
// partir de la DATE au moment du rendu. Le lundi à 00 h 00 (Montréal), la
// page bascule toute seule. Pas de cron, pas de déploiement, rien à surveiller.
//
// ⚠️ TOUT CE FICHIER EST DU CONTENU PUBLIC. Un fait ajouté ici finira affiché
// sans repasser devant personne — c'est le prix de la rotation automatique.
// Donc : rien n'entre ici qui n'ait été vérifié à la source ET confirmé par
// Cédric. Les prix engagent la caisse (zone rouge).
//
// Garde-fous de contenu (chacun a coûté une correction) :
// · Le « 100 % » ne vaut QUE pour les pâtisseries — le salé vient de
//   Carrément Tarte (Saint-Michel). Les confitures ne sont pas maison.
// · Le Roti est précuit puis congelé, grillé à la commande — jamais « cuit
//   le matin » ni « sorti du four ».
// · Les gâteaux entiers sont suspendus jusqu'à l'hiver (retour quand les
//   smoothies s'arrêtent) — ne pas les remettre ici sans le dire à Cédric.
// · Aucun superlatif de vente sans requête sur la catégorie ENTIÈRE.
// · Les 731 soirées partent d'octobre 2021 : c'est un PLANCHER, pas un total
//   depuis l'ouverture. D'où « depuis 2021 » écrit noir sur blanc.

/**
 * Numéro de semaine depuis le lundi 10 août 2026, en heure de Montréal.
 * Testé sur 9 cas, dont la bascule minuit Montréal (dim 23 h 59 EDT reste sur
 * la semaine courante, lun 00 h 01 EDT passe à la suivante) — le piège aurait
 * fait tourner la page le dimanche soir si on avait lu la date en UTC.
 */
export function indexSemaineMontreal(dateISO) {
  const d = dateISO ? new Date(dateISO) : new Date()
  const [a, m, j] = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(d)
    .split('-')
    .map(Number)
  const jours = Math.floor(Date.UTC(a, m - 1, j) / 86400000)
  const ancrage = Math.floor(Date.UTC(2026, 7, 10) / 86400000)
  return Math.floor((jours - ancrage) / 7)
}

// `sujet` sert à ne jamais afficher le même thème deux fois dans la semaine
// (un récit sur la buanderie + le chiffre « 2,50 $ la brassée » = redite).
export const RECITS = [
  {
    sujet: 'buanderie',
    titre: 'On lave aussi votre linge',
    phrase: 'Nos machines ne sont plus jeunes. On les répare plutôt que de les remplacer.',
    suite:
      'Elles ont vu passer des années de linge — et des garde-robes entières, du bébé à l’adulte. Lavage 2,50 $ à 3,50 $, séchage 25 sous.',
  },
  {
    sujet: 'maison',
    titre: 'Cent pour cent de nos pâtisseries sortent de notre cuisine',
    phrase: 'Toutes. Sans exception.',
    suite:
      'Le salé, c’est autre chose : nos quiches viennent de Carrément Tarte, dans Saint-Michel. On préfère le dire.',
  },
  {
    sujet: 'scene',
    titre: 'Plus de sept cents soirées depuis 2021',
    phrase: 'Notre scène n’est pas un à-côté.',
    suite:
      'Concerts, jazz, choro, poésie, impro, karaoké, micro ouvert. Les soirs de concert, dix pour cent de votre facture vont directement à l’artiste.',
  },
  {
    sujet: 'cafe',
    titre: 'Une seule ferme, un seul café',
    phrase: 'Celui qu’on vous sert est celui qu’on vous vend.',
    suite:
      'Le colombien Las Rosas, 19 $ les 300 g — pas de taxes sur le café en vrac, et on vous le moud devant vous.',
  },
  {
    sujet: 'service',
    titre: 'Asseyez-vous, on vient à vous',
    phrase: 'Pas de file au comptoir, pas de plateau à rapporter.',
    suite:
      'On prend votre commande à table et on vous l’apporte. Même une canette : on l’ouvre devant vous et on la verse.',
  },
  {
    sujet: 'vege',
    titre: 'Végane et sans gluten, tous les jours',
    phrase: 'Il y a toujours quelque chose pour vous, sans avoir à demander.',
    suite:
      'Brownie végane sans gluten, muffins véganes, salade végane, une option végé sur presque chaque plat du jour et trois quiches sur quatre.',
  },
  {
    sujet: 'the',
    titre: 'Trente-deux thés, vendus au poids',
    phrase: 'Du grammage que vous voulez.',
    suite:
      'Noirs, verts, blancs, matchas, sans théine — choisis avec Un Amour des Thés, à Montréal. Repartez avec ce que vous venez de boire.',
  },
  {
    sujet: 'lufa',
    titre: 'Votre panier Lufa vous attend ici',
    phrase: 'On est ouverts sept jours sur sept.',
    suite:
      'Votre panier vous attend quand ça vous adonne, pas quand ça adonne à un horaire.',
  },
]

export const CHIFFRES = [
  { sujet: 'vege', chiffre: '0 $', legende: 'de supplément sur les laits végétaux' },
  { sujet: 'tasse', chiffre: '40 ¢', legende: 'de moins si vous apportez votre tasse' },
  { sujet: 'the', chiffre: '32', legende: 'thés et tisanes vendus au poids' },
  { sujet: 'lufa', chiffre: '7 / 7', legende: 'point de cueillette Lufa' },
  { sujet: 'service', chiffre: 'À table', legende: 'on prend la commande et on vous sert' },
  { sujet: 'vege', chiffre: 'Végé', legende: 'végane et sans gluten, tous les jours' },
  { sujet: 'scene', chiffre: '731', legende: 'soirées de spectacle depuis 2021' },
  { sujet: 'cafe', chiffre: '19 $', legende: 'les 300 g de café colombien, sans taxes' },
  { sujet: 'buanderie', chiffre: '2,50 $', legende: 'la brassée, à notre buanderie' },
  { sujet: 'maison', chiffre: '100 %', legende: 'de nos pâtisseries sont faites ici' },
  { sujet: 'scene', chiffre: '10 %', legende: 'de votre facture à l’artiste, les soirs de concert' },
  { sujet: 'buanderie', chiffre: '25 ¢', legende: 'le séchage, pour quatre minutes' },
  { sujet: 'cafe', chiffre: 'Moulu', legende: 'devant vous, au grain que vous voulez' },
]

// Deux récits par semaine — c'est la taille des paires ci-dessous.
const NB_CHIFFRES = 6

// Toutes les PAIRES possibles de récits (8 récits → 28 paires), plutôt que
// deux récits consécutifs. Prendre 2 à la file donnait toujours les mêmes
// couples et bouclait en 4 semaines ; en parcourant les paires, le cycle passe
// à 28 semaines — plus de six mois avant de revoir le même duo.
const PAIRES = (() => {
  const out = []
  for (let i = 0; i < RECITS.length; i += 1) {
    for (let j = i + 1; j < RECITS.length; j += 1) out.push([i, j])
  }
  return out
})()

/**
 * Sélection de la semaine. Déterministe : même semaine → même page.
 * Les récits parcourent les 28 paires possibles ; les chiffres avancent de 6
 * (13 et 6 premiers entre eux → cycle long) et on écarte ceux dont le sujet
 * est déjà porté par un récit du jour, pour ne jamais dire deux fois la même
 * chose sur la même page.
 */
export function faitsDeLaSemaine(dateISO) {
  const s = indexSemaineMontreal(dateISO)
  const mod = (n, len) => ((n % len) + len) % len

  // Pas de 17 : premier avec 28, donc les 28 paires passent toutes — et c'est
  // celui qui disperse le mieux les sujets sur le cycle (banc comparatif des 12
  // pas possibles). À la file, l'ordre naturel des paires sortait la buanderie
  // sept lundis d'affilée.
  const recits = PAIRES[mod(s * 17, PAIRES.length)].map((i) => RECITS[i])
  const dejaDits = new Set(recits.map((r) => r.sujet))

  const dispo = CHIFFRES.filter((c) => !dejaDits.has(c.sujet))
  const depart = mod(s * NB_CHIFFRES, dispo.length)
  const chiffres = []
  const vus = new Set()
  for (let i = 0; chiffres.length < NB_CHIFFRES && i < dispo.length; i += 1) {
    const c = dispo[mod(depart + i, dispo.length)]
    if (vus.has(c.chiffre)) continue // jamais deux fois le même chiffre affiché
    vus.add(c.chiffre)
    chiffres.push(c)
  }
  return { semaine: s, recits, chiffres }
}

# Corrections de bugs

## 2026-06-05 — Carrousel d'accueil « déconnant » (erreur d'hydratation React #418)

**Symptôme.** Le carrousel des prochains événements sur la page d'accueil
sautait, se positionnait sur le mauvais événement et affichait parfois la
mauvaise date (un jour de décalage). La console de production journalisait une
`Minified React error #418` à chaque chargement.

**Cause racine.** Dans `src/frontend/components/home/EventCard.jsx`, les dates
étaient formatées avec `new Date(date).toLocaleDateString('fr-FR', …)` **sans
option `timeZone`**. Le rendu serveur (Vercel tourne en UTC) et le rendu client
(navigateur en heure de Montréal, UTC−4) produisaient donc des libellés
différents pour une même date stockée à minuit UTC :

- serveur → « vendredi 5 juin »
- client → « jeudi 4 juin » (minuit UTC = 20 h la veille à Montréal)

Ce texte divergent déclenchait une erreur d'hydratation : React rejetait le DOM
rendu côté serveur et re-rendait toute la section côté client, ce qui
réinitialisait Swiper et framer-motion — d'où le carrousel instable.

**Correctif.**

1. `EventCard.jsx` — un événement est un **jour civil**, pas un instant précis.
   On ne lit plus que la portion `YYYY-MM-DD` de la date, on l'ancre à **midi
   UTC** et on la formate en `timeZone: 'UTC'`. Le résultat est identique côté
   serveur et côté client par construction : plus aucun écart d'hydratation, et
   le bon jour s'affiche. Le badge « CE JEUDI / CE VENDREDI » est calculé de la
   même manière, avec « aujourd'hui » obtenu en `America/Toronto`.
2. `src/frontend/lib/payload-data.ts` — `todayISO()` utilisait le fuseau du
   serveur (UTC), ce qui décalait d'un jour le découpage passé/futur des
   événements Payload en soirée. Aligné sur `America/Toronto`, cohérent avec la
   logique Surlascène (`todayMontrealISO`).

**Vérification.** `tsc --noEmit`, `next lint` et `next build` passent. Build de
production servi en local : l'erreur #418 a disparu et le carrousel se centre
correctement sur l'événement du jour.

# Chantier — onglet « Passe de notre côté du comptoir »

> Ouvert le **dimanche 23 août 2026, 16h44** (Montréal) par Cédric, qualifié « urgent ».
> Branche : `feat/onglet-passe-de-notre-cote-du-comptoir`
>
> ⚠️ **CE FICHIER A DEUX USAGES.** C'est le cadre du chantier ET la spécification
> de ce que le Dé devra savoir refaire seul. Cédric, 16h51 : « il va falloir ensuite
> que tu rendes le Dé capable de refaire tout ce qu'on est en train de faire. »
> Donc : on trace pendant, pas après. Une doc écrite de mémoire aurait menti.

---

## 1. La demande, verbatim

> « il faut d'urgence qu'on crée un onglet "passe de notre coté du comptoir" »
> « hestia connait nos besoins »
> « apollon fera le relai sur les reseaux sociaux »
> « elle gere l'humain. tu gere la machine. »
> « preference pour quelquun avec experience. mais comme je t'ai dis. vois ca avec hestia. »

**Ce que Cédric a tranché lui-même :** le titre, le principe, le partage des rôles.
**Ce qu'il a délégué :** tout le contenu RH → Hestia. Tout le technique → Héphaïstos.
**Ce qu'il n'a PAS eu à faire :** aucune tâche. Il a nommé un besoin et réparti.

## 2. Le partage des territoires (posé par Cédric, pas déduit)

| Agent | Territoire | Dans ce chantier |
|---|---|---|
| 🔨 Héphaïstos | la machine | la page, l'onglet, le formulaire, la mise en ligne |
| 🔥 Hestia | l'humain | les besoins réels, les arbitrages RH, les textes de fond |
| ☀️ Apollon | la parole publique | le relais réseaux sociaux, APRÈS mise en ligne |

**Règle observée :** aucun agent n'écrit sur le territoire d'un autre. Héphaïstos ne
décide pas du niveau d'expérience exigé ; Hestia ne touche pas au code.

## 3. Décisions d'architecture

**Contenu éditorial, PAS de branchement automatique sur la base d'équipe.**
Tranché par Cédric (« a définitivement »). Deux raisons, dont une seule était connue de lui :
- la sienne : garder un motif récurrent d'échange entre Héphaïstos et Hestia ;
- la technique : une lecture en direct exposerait des trous d'horaire réels sur une page
  publique, et `staff_employees` est fermée en lecture depuis le 18/08. La voie
  automatique aurait forcé une porte verrouillée exprès.

## 4. Journal des gestes (chronologique, horodaté Montréal)

| Heure | Geste | Résultat |
|---|---|---|
| 16h44 | Demande de Cédric | — |
| 16h45 | Lecture de la structure du site (routes, Header, patron `/proposer`) | 6 onglets, ton relevé |
| 16h46 | Recherche Hub « recrutement » / « embauche » | 0 résultat — chantier neuf |
| 16h46 | `cedric_observations` — tags équipe, pertinence ≥ 4 | rien sur le recrutement |
| 16h46 | Directive Hub → Hestia (besoins, bornes PII) | déposée |
| 16h49 | `ListAgents` — chercher une session Hestia vivante | aucune identifiable |
| 16h50 | Convocation d'Hestia avec mandat complet (A besoins / B arbitrages / C textes) | en cours |
| 16h52 | Branche + cadre + journal | ce fichier |

## 5. Bornes tenues

- Page publique → **zéro donnée nominative**, zéro dispo individuelle.
- Aucun chiffre inventé : ce qui manque est marqué « manquant, Cédric tranche ».
- Rien n'est publié sans le GO de Cédric. Apollon ne relaie qu'après mise en ligne.

## 6. Ce que le Dé devra savoir refaire (extrait de spécification)

1. **Recevoir un besoin en langage courant** et le qualifier (ici : une page, un titre, une urgence).
2. **Cartographier le terrain avant d'agir** — structure existante, ton existant, ce qui est
   déjà gravé. Ne pas réinventer ce qui existe.
3. **Reconnaître les territoires** et router chaque question vers qui la détient.
4. **Solliciter avec un mandat borné** — la question, les limites (PII), le format de retour.
5. **Travailler en parallèle** pendant que la réponse se prépare, au lieu d'attendre.
6. **Distinguer trois natures** dans toute réponse : ce qui est mesuré, ce qui est
   recommandé, ce qui manque et remonte au patron.
7. **Ne jamais publier sans le geste du patron.**

⚠️ Point le plus difficile à reproduire, à noter honnêtement : le point 3 repose sur une
carte des territoires qui existe parce que Cédric l'a construite pendant des mois. Un Dé
neuf chez un autre commerçant n'a pas cette carte. **La fabriquer est le vrai travail.**

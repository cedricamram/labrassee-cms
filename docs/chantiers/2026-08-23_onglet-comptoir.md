# Chantier — onglet « Passe de notre côté du comptoir »

> Ouvert le **dimanche 23 août 2026, ~16h41** (Montréal) par Cédric.
> ⚠️ Corrigé après coup : la première version datait l'ouverture de 16h44, à l'énoncé de la
> tâche. Cédric a relevé l'erreur — « ça a commencé exactement à : *attends. nouveau chantier
> urgent.* » L'ouverture précède la demande de trois messages.
> Branche : `feat/onglet-passe-de-notre-cote-du-comptoir`
>
> ⚠️ **CE FICHIER A DEUX USAGES.** C'est le cadre du chantier ET la spécification
> de ce que le Dé devra savoir refaire seul. Cédric, 16h51 : « il va falloir ensuite
> que tu rendes le Dé capable de refaire tout ce qu'on est en train de faire. »
> Donc : on trace pendant, pas après. Une doc écrite de mémoire aurait menti.

---

## 1. La demande, verbatim — dans l'ordre réel

**L'ouverture, sans objet :**
> « attends. nouveau chantier urgent. »

**La vérification des territoires, AVANT toute tâche :**
> « si je ne me trompe pas tu es le grand manitou du site internet »
> « et Hestia est la grande patronne de l'equip »

**Puis seulement la demande :**
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
| ~16h41 | « attends. nouveau chantier urgent. » — **ouverture sans objet** | bascule de contexte : on quittait PME MTL |
| 16h42 | Vérification du territoire site → Héphaïstos | confirmé, 5 sites listés en retour |
| 16h43 | Vérification du territoire équipe → Hestia | confirmé |
| 16h44 | **La demande** : le titre de l'onglet | — |
| 16h45 | Lecture de la structure du site (routes, Header, patron `/proposer`) | 6 onglets, ton relevé |
| 16h46 | Recherche Hub « recrutement » / « embauche » | 0 résultat — chantier neuf |
| 16h46 | `cedric_observations` — tags équipe, pertinence ≥ 4 | rien sur le recrutement |
| 16h46 | Directive Hub → Hestia (besoins, bornes PII) | déposée |
| 16h49 | `ListAgents` — chercher une session Hestia vivante | aucune identifiable |
| 16h50 | Convocation d'Hestia avec mandat complet (A besoins / B arbitrages / C textes) | en cours |
| 16h52 | Branche + cadre + journal | ce fichier |
| 16h56 | Hestia rend : besoin mesuré sur 9 semaines, 3 arbitrages, 2 textes | 866 h de plancher analysées |
| 16h57 | Elle attrape 2 pièges que je n'avais pas vus | `recruitment_profiles` (NAS) · deux registres d'employés |
| 16h58 | Cédric tranche : pas de salaire annoncé, français, 18 ans | gravé dans le code |
| 17h01 | Vérification à la source du salaire minimum QC | 16,60 $ (Cédric croyait 16,50) → dette posée |
| 17h05 | Table `candidatures` + RLS, 4 gardes vérifiés depuis dehors | 201 / [] / 401 / 400 |
| 17h12 | Page + formulaire + API, build vert | `/comptoir` 6,4 kB |
| 17h20 | Test bout en bout de la porte (5 cas dont robot et injection) | robot absent, injection neutralisée |
| 17h28 | Réveil quotidien d'Hestia 9h30 sur les candidatures | LaunchAgent chargé, essai à blanc OK |

## 4bis. Deux erreurs de méthode commises pendant ce chantier (à garder)

**① Dater le chantier de la première tâche.** J'ai écrit « ouvert à 16h44 », à
l'énoncé de la demande. Cédric a corrigé : ça a commencé à « attends, nouveau
chantier urgent », trois messages plus tôt. **Je compte le travail, pas la
conversation qui le rend possible.**

**② Conclure d'une mesure faussée par l'instrument.** J'ai constaté 5 sections de
la page à `opacity: 0` dans le navigateur et j'en ai conclu que l'animation au
défilement était cassée — j'ai modifié le code sur cette base. La vraie cause :
le panneau navigateur ne rend pas les animations quand il est masqué. L'écran de
chargement du site était figé pour la même raison, ce qui aurait dû m'alerter
plus tôt (un composant que je n'ai pas touché échouait de la même façon).
**Règle : quand ma mesure accuse mon propre code, vérifier d'abord si quelque
chose que je n'ai PAS touché échoue pareil.**
La correction a été conservée, mais pour une autre raison, assumée : sur une page
publique longue, un texte dont la visibilité dépend d'une animation est un texte
qu'on risque de ne jamais lire.

## 5. Bornes tenues

- Page publique → **zéro donnée nominative**, zéro dispo individuelle.
- Aucun chiffre inventé : ce qui manque est marqué « manquant, Cédric tranche ».
- Rien n'est publié sans le GO de Cédric. Apollon ne relaie qu'après mise en ligne.

## 6. Ce que le Dé devra savoir refaire (extrait de spécification)

0. **Reconnaître l'ouverture d'un chantier AVANT d'en connaître l'objet.** « attends,
   nouveau chantier urgent » ne contient aucune tâche — c'est pourtant le premier geste.
   Un Dé qui n'écoute que les phrases contenant une demande rate la mise en place.
   Effets attendus dès ce signal : suspendre le travail en cours sans le perdre, se rendre
   disponible, ne rien présumer de la suite.
1. **Laisser le patron vérifier ses territoires.** Il a demandé « le site, c'est toi ? »,
   « Hestia, l'équipe ? » AVANT d'énoncer la tâche. Il ne suppose pas la carte : il la
   confirme. Répondre par une confirmation UTILE (ici : la liste des cinq sites, pour qu'il
   précise lequel) plutôt que par un simple « oui ».
2. **Recevoir un besoin en langage courant** et le qualifier (ici : une page, un titre, une urgence).
3. **Cartographier le terrain avant d'agir** — structure existante, ton existant, ce qui est
   déjà gravé. Ne pas réinventer ce qui existe.
4. **Reconnaître les territoires** et router chaque question vers qui la détient.
5. **Solliciter avec un mandat borné** — la question, les limites (PII), le format de retour.
6. **Travailler en parallèle** pendant que la réponse se prépare, au lieu d'attendre.
7. **Distinguer trois natures** dans toute réponse : ce qui est mesuré, ce qui est
   recommandé, ce qui manque et remonte au patron.
8. **Ne jamais publier sans le geste du patron.**

⚠️ Point le plus difficile à reproduire, à noter honnêtement : le point 4 repose sur une
carte des territoires qui existe parce que Cédric l'a construite pendant des mois. Un Dé
neuf chez un autre commerçant n'a pas cette carte. **La fabriquer est le vrai travail.**

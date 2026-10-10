# CLOUD.md — reprendre le travail sur le site depuis le cloud (sans le Mac de Cédric)

> Écrit le 06/10/2026 par Héphaïstos, à la demande de Cédric : « occupe-toi en priorité du cloud pour qu'on puisse travailler jusque vendredi ».
> Une session cloud clone CE dépôt. Elle n'a **ni** les fichiers du Mac, **ni** les outils locaux, **ni** le simulateur iPhone, **ni** la base de production. Ce fichier dit quoi faire malgré ça.

## Qui décide quoi
- **Cédric** est le patron. Tutoiement, français québécois, jamais de « vous ». Il se repose parfois : on ne lui écrit pas pour une question qui peut attendre.
- **Apollon** (marketing, textes publics, le « quoi » du site) et **Héphaïstos** (technique, vitesse, plomberie) ont la main sur tout `labrassee.cafe`, dans les limites ci-dessous.
- **Athéna** valide à la place de Cédric quand un GO est nécessaire : un GO ne vaut que s'il porte sur un objet précis (PR), est **réversible**, et dit ce qui a été regardé. Doute = pas de GO, on le note pour son réveil.
- Délégation de Cédric (05/10/2026, 23 h 36, verbatim) : « pour ce soir je vous donne la main sur le site au complet. amélioration de l'expérience client. et si besoin d'une validation, je mets athéna à la validation pour qu'elle parle pour moi. n'oubliez pas. vision humain pas IA ».

## Les limites qui ne bougent pas
1. **Aucun prix** dans ce qu'on écrit ou affiche de nouveau. Le contenu du menu (plats, prix) appartient à Cédric.
2. **Rien d'écrit dans la base de production** (Supabase) ni **aucun courriel à un tiers** sans Cédric : une session cloud n'y a de toute façon pas accès. Si une correction exige un changement en base, **prépare le SQL** (avec sauvegarde et retour arrière) et laisse-le à Cédric.
3. Pas d'argent, pas de suppression définitive, pas de secrets dans le dépôt.
4. Heure de **Montréal** partout (America/Toronto), jamais UTC.

## Le regard : humain, pas IA
Regarde le site comme un **client sur son téléphone** (375 × 812), doigt en main : ce qu'on comprend en 3 secondes, ce qui se coupe, ce qui est trop petit, la première impression sans défiler. Pas le code, pas la console. Si tu ne peux pas voir le rendu (pas de navigateur mobile dans le cloud), **dis-le** : ne déclare jamais « vérifié sur iPhone ».

## Règles de contenu déjà tranchées par Cédric
- La page **Événements** parle aux **gens qui veulent connaître la programmation**, pas aux artistes. L'agenda est le premier écran. Le discours aux artistes est sorti (il vit sous « Viens te faire voir »).
- On doit **voir que c'est La Brassée** dès l'accueil (signature au-dessus du titre ; logo = le picto jaune en trait, sans fond ; jamais l'abeille).
- **Menu** : la page « PRINTEMPS 2026 » est retirée (06/10) ; l'avis dit « On travaille fort sur le menu d'automne-hiver. En attendant, voici celui d'en ce moment… ». Le contenu du menu ne se touche pas sans Cédric.
- « Jam » reste dans la description de /scene (exception décidée par Cédric le 06/10).
- Une soirée porte **le même nom partout** (accueil, /scene, Facebook, Eventbrite).
- On écrit le français correct (Loi 101).

## Comment travailler ici
- Next.js + Payload CMS, `pnpm`, Node 22. Voir `AGENTS.md`.
- **Une branche, une PR, un aperçu Vercel**, puis fusion. Jamais de commit direct sur `main`. Les aperçus Vercel sont **protégés** (connexion Vercel) : le cloud ne peut pas les ouvrir sans l'accès Vercel ; décris alors ce que tu as lu dans le diff et ce que tu n'as pas pu voir.
- Après une fusion, **la production se reconstruit** : regarde-la (HTML servi, `curl -L https://www.labrassee.cafe/...`) et prépare le **revert** (un commit) avant de dire « fini ».
- Petits changements, un à la fois. Chaque PR dit ce qui change, ce qui ne change pas, et comment revenir en arrière.

## État au 06/10/2026, 11 h 30 (Montréal)
**En ligne :** accueil sur téléphone (soirée visible sans défiler), vraies affiches, bandeau « En attente de confirmation » (colonne `concerts.bandeau`), fond de scène HD, signature « La Brassée », page Événements pour le public, vitesse mobile (couvertures lazy sauf 2, feuilles externes non bloquantes), menu : consigne tactile + avis, page de printemps retirée.
**À faire / ouvert :**
- `/partenaires` (PR #6, ancienne, logos manquants) : à trancher par Apollon.
- QR du menu vivant (PR #12) : fusion prévue le soir même avec les cartons.
- Le menu en image est illisible à 375 px sans zoom : le menu vivant par QR le règle.
- Photos du violoncelle pour le fond (originaux exportés, à intégrer).
- Galerie `/murs` : liste des œuvres d'Antoine Falardeau (inscription en base = Cédric).
- Hero : repli si la photo de fond tarde (pas de fond noir) — fait dans la signature ; à re-vérifier sur connexion lente.

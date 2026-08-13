// Version TEXTE du menu — source de vérité : le menu papier
// (`public/images/menu-v2/*.png`), désigné par Cédric le 13/08/2026.
//
// Pourquoi ce fichier existe : le menu du site est un feuilletage d'images.
// Google n'en lit pas un mot, les lecteurs d'écran non plus, et personne ne
// peut chercher « grilled cheese Rosemont » et nous trouver. Option A validée
// par Cédric : on garde le feuilletage, on ajoute ce texte dessous.
//
// ⚠️ Quand le menu papier change, ce fichier change. Ne jamais le repeupler
// depuis le dump Koomi — il garde des références retirées de la vente.
// Prix TAXES INCLUSES (mention imprimée sur chaque page du menu).

export const MENU_SALE = {
  titre: 'Côté salé',
  chapeau: 'Plats du jour, grilled cheese, quiches et petits creux — viandes des Fermes Valens.',
  sections: [
    {
      titre: 'Plats du jour',
      note: 'Stocks limités · ou presque. SG = sans gluten · VG = végé.',
      accompagnement: 'Salade verte 2,50 $ · demi-salade du jour 4,50 $',
      jours: [
        { jour: 'Lundi', viande: 'Pâté au poulet 12,50 $ · Pâté à la viande 14,50 $', vege: null },
        { jour: 'Mardi', viande: 'Bœuf bourguignon (SG) 14,50 $', vege: null },
        { jour: 'Mercredi', viande: 'Lasagne mexicaine au bœuf (SG) 14,00 $', vege: 'Lasagne mexicaine (SG) 12,50 $' },
        { jour: 'Jeudi', viande: 'Poulet au beurre (SG) 14,00 $', vege: 'Tofu au beurre (SG) 12,50 $' },
        { jour: 'Vendredi', viande: 'Lasagne bœuf-ricotta 14,50 $', vege: 'Lasagne aux légumes (SG) 12,50 $' },
        { jour: 'Samedi et dimanche', viande: 'Focaccia poulet-bacon 13,00 $', vege: "Focaccia à l'inspiration 11,00 $" },
        { jour: 'Tous les jours', viande: 'Croissant déjeuner — œufs brouillés, épinards, cheddar, érable 9,50 $', vege: null },
      ],
    },
  ],
  grilledCheese: {
    titre: 'Grilled cheese',
    accompagnement: 'Salade verte 2,50 $ · demi-salade du jour 4,50 $',
    items: [
      { nom: 'Cabane', tag: '100 % canadien', compo: 'Philadelphia · BBQ à l’érable · porc · oignons · cheddar · pain ciabatta', prix: '15,00 $' },
      { nom: 'STM', tag: 'Végé', compo: 'Shiitakés · créminis · estragon · cheddar fort · miso · pain 9 grains', prix: '12,50 $' },
      { nom: 'Croc', tag: '100 % canadien', compo: 'Jambon · tête dure · béchamel · cornichons · pain blanc', prix: '11,50 $' },
      { nom: 'Hameçon', tag: 'Saumon', compo: 'Saumon fumé · brie · abricots · aneth · mozzarella · pain à l’avoine', prix: '11,50 $' },
      { nom: 'Bec', tag: '100 % canadien', compo: 'Bacon · beurre d’érable · cheddar · pain au quinoa', prix: '11,25 $' },
      { nom: 'Ti Brunch', tag: 'Brunch', compo: 'Provolone · omelette · poivrons · paprika · mozzarella · érable', prix: '11,00 $' },
    ],
  },
  quiches: {
    titre: 'Quiches',
    prix: '11,00 $',
    accompagnement: 'Salade verte 2,50 $ · demi-salade du jour 4,50 $',
    items: [
      { nom: 'Lorraine', tag: 'Bacon' },
      { nom: 'Champignon-parmesan', tag: 'Végé' },
      { nom: 'Poireaux-brie', tag: 'Végé' },
      { nom: 'Chèvre-épinards', tag: 'Végé' },
    ],
  },
  salades: {
    titre: 'Salades',
    repas: [
      { nom: 'Salade du jour', prix: '12,50 $' },
      { nom: 'Salade végane', detail: 'Pois chiches', prix: '11,00 $' },
      { nom: 'Salade de thon', prix: '11,00 $' },
    ],
    demies: [
      { nom: 'Demi-salade du jour', detail: 'Seule', prix: '7,00 $' },
      { nom: 'Demi-salade verte', detail: 'Seule', prix: '4,00 $' },
    ],
  },
  nachos: {
    titre: 'Nachos, à partager',
    chapeau: 'Tortillas de maïs généreusement garnies — mozzarella · oignons · olives · poivrons · salsa à la mangue · crème sûre.',
    items: [
      { nom: 'La Brassée', detail: 'Pour une personne', prix: '11,00 $' },
      { nom: 'Double Brassée', detail: 'Pour deux', prix: '19,00 $' },
    ],
  },
}

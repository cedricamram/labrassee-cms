export const CATEGORIE_COLORS = { concert:'#f7d135', vernissage:'#c98a4f', auteur:'#5f8fd6' };

export function classifierConcert(row) {
  if (!row) return null;
  const t = (row.type_show || '').trim().toLowerCase();
  const s = row.statut === 'confirme' ? 'confirme' : 'option';
  return {
    categorie: t === 'auteur' || t === 'litteraire' ? 'auteur' : t === 'vernissage' ? 'vernissage' : 'concert',
    statut: s
  };
}

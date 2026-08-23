import React from 'react'
import type { Metadata } from 'next'

import Comptoir from '@/frontend/pages/Comptoir'

export const metadata: Metadata = {
  title: 'Passe de notre côté du comptoir — La Brassée',
  description:
    "On cherche quelqu'un pour le comptoir : 20 à 25 h par semaine, surtout les matins du mardi et du mercredi. Pas de CV exigé, pas de lettre de motivation — dis-nous tes vraies dispos.",
}

export default function ComptoirPage() {
  return <Comptoir />
}

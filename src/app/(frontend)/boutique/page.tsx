import React from 'react'
import type { Metadata } from 'next'

import Boutique from '@/frontend/pages/Boutique'

export const metadata: Metadata = {
  title: 'À emporter — La Brassée',
  description:
    "Café en grains colombien Las Rosas (19 $ les 300 g, sans taxes, moulu devant vous), thés et tisanes en vrac au poids, laits Henrietta, Oatly et Barista. À emporter au 2522 Beaubien Est, Montréal.",
}

export default function BoutiquePage() {
  return <Boutique />
}

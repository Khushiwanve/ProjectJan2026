import React from 'react';
import CuratedPage from '../Components/CuratedPage';
import { RETRO_BOLLYWOOD_TITLES } from '../Data/curatedTitles';

export default function OldBollywood() {
  return (
    <CuratedPage
      titles={RETRO_BOLLYWOOD_TITLES}
      eyebrow="Timeless classics"
      heading="Retro"
      accent="Nova"
      subheading="The golden-era films that defined Indian cinema."
    />
  );
}

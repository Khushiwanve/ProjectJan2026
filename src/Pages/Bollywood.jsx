import React from 'react';
import CuratedPage from '../Components/CuratedPage';
import { BOLLYWOOD_TITLES } from '../Data/curatedTitles';

export default function Bollywood() {
  return (
    <CuratedPage
      titles={BOLLYWOOD_TITLES}
      eyebrow="Hand-picked"
      heading="Bollywood"
      accent="Picks"
      subheading="Modern Hindi cinema favorites — drama, comedy, and everything in between."
    />
  );
}

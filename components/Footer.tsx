import React from 'react';
import MusicPlayer from '@/components/MusicPlayer';
import EffectsLegend from '@/components/EffectsLegend';

const Footer = () => {
  return (
    <footer className="fixed right-4 bottom-4 left-4 z-50 text-white">
      <div className="-mb-2 grid grid-cols-12 items-center">
        <div className="col-span-2 flex flex-col">
          <span className="text-md font-medium tracking-tight">Rafał Ziółek</span>
          <span className="text-md font-medium tracking-tight">(ラファウジュウウェク)</span>
        </div>

        <EffectsLegend />

        <MusicPlayer className="col-span-8 justify-self-end" />
      </div>
    </footer>
  );
};

export default Footer;

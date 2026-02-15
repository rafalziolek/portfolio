import React from 'react';
import MusicPlayer from '@/components/MusicPlayer';
import EffectsLegend from '@/components/EffectsLegend';

const Footer = () => {
  return (
    <footer className="fixed right-4 bottom-6 left-4 z-50">
      <div className="-mb-2 grid grid-cols-12 items-center">
        <EffectsLegend />

        {/* <MusicPlayer className="col-span-10 justify-self-end" /> */}
      </div>
    </footer>
  );
};

export default Footer;

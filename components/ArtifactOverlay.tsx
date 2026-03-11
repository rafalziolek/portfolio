'use client';

import Image from 'next/image';
import { useHoverArtifact } from '@/context/HoverArtifactContext';
import WarsawClock from './WarsawClock';

const ArtifactOverlay = () => {
  const { activeArtifacts } = useHoverArtifact();

  const showClock = activeArtifacts.has('warsaw-clock');
  const showPhoto = activeArtifacts.has('rafal-photo');

  if (!showClock && !showPhoto) return null;

  return (
    <>
      {showClock && (
        <div
          className="pointer-events-none fixed right-2 bottom-2 z-30 flex items-center justify-center"
          aria-hidden="true"
        >
          <WarsawClock />
        </div>
      )}
      {showPhoto && (
        <div
          className="pointer-events-none fixed right-2 bottom-2 z-30 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="h-[30vh] w-auto overflow-hidden rounded-lg">
            <Image
              src="/profile.png"
              alt="Rafał Ziolek"
              width={500}
              height={500}
              className="h-[45vh] w-auto max-w-none -translate-y-[15%] grayscale"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ArtifactOverlay;

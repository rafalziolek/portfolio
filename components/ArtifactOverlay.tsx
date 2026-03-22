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
          className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
          aria-hidden="true"
        >
          <WarsawClock />
        </div>
      )}
      {showPhoto && (
        <div
          className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="h-[min(50vh,90vw)] w-[min(50vh,90vw)] max-h-120 max-w-120 overflow-hidden rounded-full">
            <Image
              src="/profile.png"
              alt="Rafał Ziolek"
              width={500}
              height={500}
              className="h-full w-full object-cover grayscale"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ArtifactOverlay;

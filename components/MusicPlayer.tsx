import React from 'react';
import Image from 'next/image';

const MusicPlayer = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center justify-end gap-4 ${className}`}>
      <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
        {/* Rotating Vinyl/CD */}
        <div className="animate-spin-slow relative h-full w-full overflow-hidden rounded-full">
          <Image src="/album-thumbnail.jpg" alt="Album Art" fill className="object-cover" />
          {/* Internal rings/sheen for CD effect can be added here if needed */}
        </div>

        {/* Center Hole / Spindle */}
        <div className="absolute top-1/2 left-1/2 z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-black backdrop-blur-sm" />
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-medium">Amira kitchen</span>
        <span className="text-lg">Westside Gunn</span>
      </div>
    </div>
  );
};

export default MusicPlayer;

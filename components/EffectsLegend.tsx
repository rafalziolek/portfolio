'use client';

import { usePathname } from 'next/navigation';
import { useEffects } from '@/context/EffectsContext';

const EffectsLegend = () => {
  const { isEnabled } = useEffects();
  const pathname = usePathname();

  if (pathname !== '/') {
    return <div className="col-span-2" />;
  }

  return (
    <div className="col-span-2 flex flex-col">
      <span className="text-md inline-flex items-center font-semibold tracking-tight">
        Press{' '}
        <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-sm bg-gray-300 font-mono text-xs text-black backdrop-blur-sm">
          E
        </span>
      </span>
      <span className="text-md font-medium tracking-tight">
        To turn {isEnabled ? 'off' : 'on'} effects
      </span>
    </div>
  );
};

export default EffectsLegend;

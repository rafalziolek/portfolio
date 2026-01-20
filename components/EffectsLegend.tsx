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
      <span className="text-md inline-flex items-center font-medium tracking-tight">
        Press{' '}
        <span className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-sm bg-black text-xs text-neutral-400 backdrop-blur-sm dark:bg-gray-400 dark:text-black">
          E
        </span>
      </span>
      <span className="text-md tracking-tight">To turn {isEnabled ? 'off' : 'on'} effects</span>
    </div>
  );
};

export default EffectsLegend;

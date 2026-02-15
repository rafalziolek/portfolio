'use client';

import { usePathname } from 'next/navigation';
import { useEffects } from '@/context/EffectsContext';

const EffectsLegend = () => {
  const { isEnabled, isKeyPressed } = useEffects();
  const pathname = usePathname();

  if (pathname !== '/') {
    return <div className="col-span-2" />;
  }

  return (
    <div className="col-span-2 flex flex-col text-sm">
      <span className="text-md inline-flex items-center font-medium tracking-tight">
        Press{' '}
        <span
          className={`ml-1.5 inline-flex transform items-center justify-center rounded-sm bg-black pr-[5px] pl-[4px] text-xs backdrop-blur-sm transition-transform duration-100 ease-in-out dark:bg-neutral-400 dark:text-black ${
            isKeyPressed ? 'scale-80' : 'scale-100'
          }`}
        >
          E
        </span>
      </span>
      <span className="text-md tracking-tight">To turn {isEnabled ? 'off' : 'on'} effects</span>
    </div>
  );
};

export default EffectsLegend;

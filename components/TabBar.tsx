'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { tabTransition, type Tab } from '@/lib/tabs';

export default function TabBar() {
  const pathname = usePathname();

  const activeTab: Tab = pathname === '/works' ? 'works' : 'info';

  return (
    <nav>
      <div className="relative flex h-[52px] w-[186px] items-center rounded-full bg-[rgba(227,227,227,0.8)] p-1 backdrop-blur-[5px]">
        <motion.div
          className="absolute top-1 bottom-1 w-[89px] rounded-full bg-white shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)]"
          animate={{ left: activeTab === 'info' ? 4 : 93 }}
          transition={tabTransition}
        />

        <Link
          href="/"
          className="font-gyre-heros relative z-10 flex h-full flex-1 items-center justify-center text-[21px] tracking-[-0.03em] text-black"
        >
          Info
        </Link>

        <Link
          href="/works"
          className="font-gyre-heros relative z-10 flex h-full flex-1 items-center justify-center text-[21px] tracking-[-0.03em] text-black"
        >
          Works
        </Link>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { tabTransition, type Tab } from '@/lib/tabs';

const tabs: Array<{ id: Tab; href: string; label: string }> = [
  { id: 'info', href: '/', label: 'Info' },
  { id: 'works', href: '/works', label: 'Works' },
];

export default function TabBar() {
  const pathname = usePathname();
  const activeTab: Tab = pathname === '/works' ? 'works' : 'info';
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  return (
    <nav aria-label="Primary tabs">
      <div className="relative flex h-[52px] w-full max-w-[320px] min-w-[220px] items-center rounded-full bg-[rgba(227,227,227,0.8)] p-1 backdrop-blur-[5px] dark:bg-[rgba(38,38,38,0.78)]">
        <motion.span
          className="pointer-events-none absolute top-1 bottom-1 bg-white will-change-transform dark:bg-[rgba(255,255,255,0.1)]"
          style={{
            borderRadius: 999,
            left: 4,
            width: 'calc(50% - 4px)',
          }}
          initial={{ x: `${activeIndex * 100}%` }}
          animate={{
            x: `${activeIndex * 100}%`,
          }}
          transition={tabTransition}
        />

        {tabs.map((tab) => (
          <Link
            key={tab.id}
            href={tab.href}
            className="relative flex h-full flex-1 items-center justify-center rounded-full"
          >
            <span className="relative z-10 text-[17px] tracking-[-0.03em] text-black md:text-[22px] dark:text-white">
              {tab.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

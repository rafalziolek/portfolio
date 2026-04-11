'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Tab } from '@/lib/tabs';

const navItems: Array<{ id: Tab; href: string; label: string }> = [
  { id: 'works', href: '/', label: 'Works' },
  { id: 'info', href: '/info', label: 'Information' },
];

export default function TopNav() {
  const pathname = usePathname();
  const activeTab: Tab = pathname === '/info' ? 'info' : 'works';

  return (
    <header className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center p-4 lg:grid lg:grid-cols-3">
      {/* Name + subtitle */}
      <div className="hidden flex-col items-start px-4 lg:flex">
        <Link href="/" className="leading-[1.3]">
          Rafał Ziółek
        </Link>
        <span className="leading-[1.3] opacity-50">Software designer</span>
      </div>

      {/* Nav links in pill */}
      <nav aria-label="Primary" className="lg:justify-self-center">
        <div className="flex items-center gap-6 rounded-full bg-[rgba(227,227,227,0.9)] px-7 py-4 backdrop-blur-[10px] dark:bg-[rgba(40,40,40,0.9)]">
          {navItems.map((navItem) => (
            <Link
              key={navItem.id}
              href={navItem.href}
              className={activeTab === navItem.id ? 'opacity-100' : 'opacity-50'}
            >
              {navItem.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Email */}
      <div className="hidden items-center justify-end px-4 lg:flex">
        <a href="mailto:rafal.ziolek@icloud.com">rafal.ziolek@icloud.com</a>
      </div>
    </header>
  );
}

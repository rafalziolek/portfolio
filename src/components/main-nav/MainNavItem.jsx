'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
function MainNavItem({ children, glyphLetter, glyphColor, href }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-[var(--space-xxs)] text-[var(--font-size-body)] font-[var(--font-weight-m)] text-[var(--color-foreground-primary-inverted)] ${isActive ? "[&_.link-label]:underline" : ""}`}
    >
      {glyphLetter ? (
        <span
          className={`inline-flex size-2 items-center justify-center rounded-full bg-white text-[var(--font-size-caption)] leading-6 ${isActive ? glyphColor === 'blue' ? 'bg-[var(--color-blue)] text-[var(--color-foreground-primary-inverted)]' : 'bg-[var(--color-orange)] text-[var(--color-foreground-primary-inverted)]' : ''}`}
        >
          {/* {glyphLetter} */}
        </span>
      ) : (
        ''
      )}
      <span className="link-label group-hover:underline">{children}</span>
    </Link>
  );
}

export default MainNavItem;

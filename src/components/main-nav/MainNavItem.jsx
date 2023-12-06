'use client';
import styles from './MainNav.module.scss';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
function MainNavItem({ children, glyphLetter, glyphColor, href }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`${styles['main-nav-link']} ${isActive ? styles.active : ''}`}
    >
      {glyphLetter ? (
        <span
          className={`${styles['link-glyph']} ${
            isActive ? styles[`link-glyph-${glyphColor}`] : ''
          }`}
        >
          {/* {glyphLetter} */}
        </span>
      ) : (
        ''
      )}
      <span className={styles['link-label']}>{children}</span>
    </Link>
  );
}

export default MainNavItem;

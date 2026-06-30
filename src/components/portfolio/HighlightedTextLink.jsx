'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const BLINK_INTERVAL_MS = 450;
const BASE_CLASS_NAME =
  'inline-block px-0.5 leading-none text-neutral-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-200';

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);

    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  return prefersReducedMotion;
}

function useBlinkingBackground() {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHighlightVisible, setIsHighlightVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isActive = isHovered || isFocused;

  useEffect(() => {
    if (!isActive) {
      setIsHighlightVisible(false);
      return undefined;
    }

    setIsHighlightVisible(true);

    if (prefersReducedMotion) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setIsHighlightVisible((isVisible) => !isVisible);
    }, BLINK_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [isActive, prefersReducedMotion]);

  return {
    className: `${BASE_CLASS_NAME} ${
      isActive && !isHighlightVisible ? 'bg-transparent' : 'bg-neutral-700'
    }`,
    eventHandlers: {
      onBlur: () => setIsFocused(false),
      onFocus: () => setIsFocused(true),
      onPointerEnter: () => setIsHovered(true),
      onPointerLeave: () => setIsHovered(false),
    },
  };
}

export default function HighlightedTextLink({ children, href }) {
  const { className, eventHandlers } = useBlinkingBackground();

  if (!href) {
    return (
      <span className={className} {...eventHandlers}>
        {children}
      </span>
    );
  }

  if (href.startsWith('/')) {
    return (
      <Link className={className} href={href} {...eventHandlers}>
        {children}
      </Link>
    );
  }

  return (
    <a className={className} href={href} {...eventHandlers}>
      {children}
    </a>
  );
}

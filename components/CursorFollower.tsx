'use client';

import { motion, useMotionValue, useSpring, MotionValue, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const PLACEHOLDER_IMAGES = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
  'bg-purple-500',
];

const CursorWindow = ({
  x,
  y,
  activeIndex,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  activeIndex: number;
}) => {
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0.9, filter: 'blur(0px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
      transition={{ duration: 0.2 }}
      className={`fixed top-0 left-0 h-[300px] w-[300px] pointer-events-none z-50 flex items-center justify-center text-white text-2xl font-bold rounded-xl shadow-lg transition-colors duration-200 ${PLACEHOLDER_IMAGES[activeIndex]}`}
    >
      Image {activeIndex + 1}
    </motion.div>
  );
};

const CursorFollower = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  // Track window focus explicitly
  const [isWindowFocused, setIsWindowFocused] = useState(() =>
    typeof window !== 'undefined' ? document.hasFocus() : true
  );

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => {
      setIsWindowFocused(false);
      setIsVisible(false); // Immediately hide on blur
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  useEffect(() => {
    let cumulativeDistance = 0;
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // 1. Focus Check
      if (!isWindowFocused) {
        setIsVisible(false);
        return;
      }

      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }

      // 2. Geometric Blocking Check & Interactive Elements Check
      let shouldHide = false;

      // Check explicit blocking containers primarily
      const blockers = document.querySelectorAll('[data-hide-cursor]');
      for (const blocker of blockers) {
        const rect = blocker.getBoundingClientRect();
        const padding = 150;
        if (
          e.clientX >= rect.left - padding &&
          e.clientX <= rect.right + padding &&
          e.clientY >= rect.top - padding &&
          e.clientY <= rect.bottom + padding
        ) {
          shouldHide = true;
          break;
        }
      }

      // Also check standard interactive elements if not already hidden
      if (!shouldHide) {
        const target = e.target as HTMLElement;
        const isInteractive = target.closest('a, button, input, textarea, select, [role="button"]');
        if (isInteractive) {
          shouldHide = true;
        }
      }

      if (shouldHide) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Update position
      x.set(e.clientX - 300);
      y.set(e.clientY - 300);

      // Distance logic
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      cumulativeDistance += distance;

      if (cumulativeDistance > 50) {
        setActiveIndex((prev) => (prev + 1) % PLACEHOLDER_IMAGES.length);
        cumulativeDistance = 0;
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const handleMouseLeave = () => {
      leaveTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, [x, y, isWindowFocused]); // Re-bind if focus state changes, though mostly handled by ref checking or just the state in closure

  return (
    <AnimatePresence>
      {isVisible && <CursorWindow x={x} y={y} activeIndex={activeIndex} />}
    </AnimatePresence>
  );
};

export default CursorFollower;

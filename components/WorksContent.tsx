'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { PROJECTS as BASE_PROJECTS } from '@/lib/data';
import WorkItem from './WorkItem';

// Duplicate items for testing scroll
const PROJECTS = [...BASE_PROJECTS, ...BASE_PROJECTS, ...BASE_PROJECTS].map((p, i) => ({
  ...p,
  id: `${p.id}-${i}`,
}));

// Persists across SPA navigations, resets on hard refresh
let hasAnimationPlayed = false;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

export default function WorksContent() {
  const shouldAnimate = !hasAnimationPlayed;

  const viewportRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const offsetY = useMotionValue(0);

  const directionRef = useRef(1); // 1 = down, -1 = up
  const pausedRef = useRef(false);
  const currentOffsetRef = useRef(0);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);

  const getMaxScroll = () => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return 0;
    return Math.max(0, content.scrollHeight - viewport.clientHeight);
  };

  // Auto-scroll loop using transform (sub-pixel smooth)
  useEffect(() => {
    hasAnimationPlayed = true;

    const step = () => {
      if (!pausedRef.current) {
        const maxScroll = getMaxScroll();
        if (maxScroll > 0) {
          currentOffsetRef.current += directionRef.current * 0.15;

          // Bounce at boundaries
          if (currentOffsetRef.current >= maxScroll) {
            currentOffsetRef.current = maxScroll;
            directionRef.current = -1;
          } else if (currentOffsetRef.current <= 0) {
            currentOffsetRef.current = 0;
            directionRef.current = 1;
          }

          offsetY.set(-currentOffsetRef.current);
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafRef.current);
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [offsetY]);

  // Pause on user input, sync transform offset, resume in their direction
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const pauseAndResume = (scrollDirection?: number) => {
      if (scrollDirection) {
        directionRef.current = scrollDirection;
      }

      // Flip at boundaries
      const maxScroll = getMaxScroll();
      if (currentOffsetRef.current >= maxScroll) {
        directionRef.current = -1;
      } else if (currentOffsetRef.current <= 0) {
        directionRef.current = 1;
      }

      pausedRef.current = true;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = setTimeout(() => {
        pausedRef.current = false;
      }, 1500);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) return;

      // Update offset from user scroll
      currentOffsetRef.current = Math.min(
        maxScroll,
        Math.max(0, currentOffsetRef.current + e.deltaY),
      );
      offsetY.set(-currentOffsetRef.current);

      pauseAndResume(e.deltaY !== 0 ? Math.sign(e.deltaY) : undefined);
    };

    const handleTouchStart = () => {
      pausedRef.current = true;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };

    let lastTouchY = 0;

    const handleTouchStartCapture = (e: TouchEvent) => {
      lastTouchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const delta = lastTouchY - touchY;
      lastTouchY = touchY;

      const maxScroll = getMaxScroll();
      if (maxScroll <= 0) return;

      currentOffsetRef.current = Math.min(
        maxScroll,
        Math.max(0, currentOffsetRef.current + delta),
      );
      offsetY.set(-currentOffsetRef.current);

      if (delta !== 0) {
        directionRef.current = Math.sign(delta);
      }

      e.preventDefault();
    };

    const handleTouchEnd = () => {
      resumeTimeoutRef.current = setTimeout(() => {
        const maxScroll = getMaxScroll();
        if (currentOffsetRef.current >= maxScroll) {
          directionRef.current = -1;
        } else if (currentOffsetRef.current <= 0) {
          directionRef.current = 1;
        }
        pausedRef.current = false;
      }, 1500);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];
      if (scrollKeys.includes(e.key)) {
        e.preventDefault();
        const dir = ['ArrowUp', 'PageUp', 'Home'].includes(e.key) ? -1 : 1;
        const amount = ['PageDown', 'PageUp'].includes(e.key)
          ? 200
          : e.key === 'Home' || e.key === 'End'
            ? getMaxScroll()
            : 40;
        const maxScroll = getMaxScroll();

        if (e.key === 'Home') {
          currentOffsetRef.current = 0;
        } else if (e.key === 'End') {
          currentOffsetRef.current = maxScroll;
        } else {
          currentOffsetRef.current = Math.min(
            maxScroll,
            Math.max(0, currentOffsetRef.current + dir * amount),
          );
        }
        offsetY.set(-currentOffsetRef.current);
        pauseAndResume(dir);
      }
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    viewport.addEventListener('touchstart', handleTouchStart, { passive: true });
    viewport.addEventListener('touchstart', handleTouchStartCapture, { passive: true });
    viewport.addEventListener('touchmove', handleTouchMove, { passive: false });
    viewport.addEventListener('touchend', handleTouchEnd, { passive: true });
    viewport.addEventListener('keydown', handleKeyDown);

    return () => {
      viewport.removeEventListener('wheel', handleWheel);
      viewport.removeEventListener('touchstart', handleTouchStart);
      viewport.removeEventListener('touchstart', handleTouchStartCapture);
      viewport.removeEventListener('touchmove', handleTouchMove);
      viewport.removeEventListener('touchend', handleTouchEnd);
      viewport.removeEventListener('keydown', handleKeyDown);
    };
  }, [offsetY]);

  return (
    <div ref={viewportRef} className="h-full w-full overflow-hidden">
      <motion.div
        ref={contentRef}
        style={{ y: offsetY }}
        className="px-4 pt-[15vh] pb-[40vh] lg:px-8"
      >
        <motion.div
          variants={container}
          initial={shouldAnimate ? 'hidden' : 'show'}
          animate="show"
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {PROJECTS.map((project) => (
            <WorkItem key={project.id} project={project} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

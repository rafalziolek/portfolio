'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useEffects } from '@/context/EffectsContext';

import { PROJECTS } from '@/lib/data';
import Image from 'next/image';

/* Removed PLACEHOLDER_IMAGES */

interface TrailItem {
  id: string;
  x: number;
  y: number;
  imageIndex: number;
}

interface CursorFollower2Props {
  threshold?: number; // Distance in pixels
  timeThreshold?: number; // Time in ms (if we were to use time-based)
  timeout?: number; // Time to live in ms
  triggerType?: 'distance' | 'time';
}

const CursorFollower2 = ({
  threshold = 40,
  triggerType = 'distance',
  timeout = 2000,
}: CursorFollower2Props) => {
  const { isEnabled } = useEffects();
  /* Removed local isEnabled state */
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isWindowFocused, setIsWindowFocused] = useState(() =>
    typeof window !== 'undefined' ? document.hasFocus() : true
  );

  // Refs for tracking movement/time without re-renders
  const lastSpawnRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const activeIndexRef = useRef(0);

  // Sync ref with state
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  /* Removed local keydown listener */

  useEffect(() => {
    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const removeTrailItem = (id: string) => {
    setTrail((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (!isEnabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      // 1. Focus Check
      if (!isWindowFocused) return;

      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
      const now = Date.now();

      // 2. Geometric Blocking Check & Interactive Elements Check
      let shouldHide = false;

      // Check explicit blocking containers primarily
      const blockers = document.querySelectorAll('[data-hide-cursor]');
      for (const blocker of blockers) {
        const rect = blocker.getBoundingClientRect();
        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
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
        // Reset the tracker so we don't spawn immediately after leaving a blocked area based on old position
        lastSpawnRef.current = { x: clientX, y: clientY, time: now };
        return;
      }

      if (!lastSpawnRef.current) {
        lastSpawnRef.current = { x: clientX, y: clientY, time: now };
        return;
      }

      const last = lastSpawnRef.current;
      let shouldSpawn = false;

      if (triggerType === 'distance') {
        const deltaX = clientX - last.x;
        const deltaY = clientY - last.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        // Ensure strictly greater or equal to threshold
        if (distance >= threshold) {
          shouldSpawn = true;
        }
      } else if (triggerType === 'time') {
        if (now - last.time >= threshold) {
          shouldSpawn = true;
        }
      }

      if (shouldSpawn) {
        const newItem: TrailItem = {
          id: Math.random().toString(36).substr(2, 9),
          x: clientX,
          y: clientY,
          imageIndex: activeIndexRef.current,
        };

        setTrail((prev) => [...prev, newItem]);

        // Setup cleanup for this item
        setTimeout(() => {
          removeTrailItem(newItem.id);
        }, timeout);

        // Update state for next cycle
        lastSpawnRef.current = { x: clientX, y: clientY, time: now };
        setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [threshold, triggerType, timeout, isWindowFocused, isEnabled]);

  // Clear trail state if disabled (state derivation pattern)
  if (!isEnabled && trail.length > 0) {
    setTrail([]);
  }

  if (!isEnabled) return null;

  return (
    <>
      {/* Render the Trail */}
      <AnimatePresence>
        {trail.map((item) => {
          const project = PROJECTS[item.imageIndex % PROJECTS.length];
          const aspect = project.src.width / project.src.height;
          let width, height;

          if (project.src.height > project.src.width) {
            // Portrait: Width = 150px
            width = 150;
            height = 150 / aspect;
          } else {
            // Landscape/Square: Height = 150px
            height = 150;
            width = 150 * aspect;
          }

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, scale: 1 }} // Instant appear
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1, transition: { duration: 0.5 } }} // Fade out animation without scale change
              style={{
                position: 'fixed',
                left: item.x,
                top: item.y,
                width,
                height,
                transform: 'translate(-50%, -50%)', // Center on coordinates
              }}
              className={`pointer-events-none z-40 flex items-center justify-center overflow-hidden`}
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="300px" // Safe upper bound
                className="object-cover"
              />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Render the "Head" (Follower) - optional, but keeps the "tracking" feeling */}
      {!!isWindowFocused && (
        <div
          className={`pointer-events-none fixed z-50 transition-transform duration-75`}
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -50%)',
            opacity: isWindowFocused ? 1 : 0,
          }}
        />
      )}
    </>
  );
};

export default CursorFollower2;

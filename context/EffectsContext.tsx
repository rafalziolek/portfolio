'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface EffectsContextType {
  isEnabled: boolean;
  toggleEffects: () => void;
  isKeyPressed: boolean;
}

const EffectsContext = createContext<EffectsContextType | undefined>(undefined);

export const EffectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  const toggleEffects = () => setIsEnabled((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input field to avoid accidental toggles
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable) {
        return;
      }

      if (e.key.toLowerCase() === 'e') {
        if (!e.repeat) {
          toggleEffects();
        }
        setIsKeyPressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable) {
        return;
      }

      if (e.key.toLowerCase() === 'e') {
        setIsKeyPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <EffectsContext.Provider value={{ isEnabled, toggleEffects, isKeyPressed }}>
      {children}
    </EffectsContext.Provider>
  );
};

export const useEffects = () => {
  const context = useContext(EffectsContext);
  if (context === undefined) {
    throw new Error('useEffects must be used within an EffectsProvider');
  }
  return context;
};

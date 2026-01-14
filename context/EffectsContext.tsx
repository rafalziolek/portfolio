'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface EffectsContextType {
  isEnabled: boolean;
  toggleEffects: () => void;
}

const EffectsContext = createContext<EffectsContextType | undefined>(undefined);

export const EffectsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleEffects = () => setIsEnabled((prev) => !prev);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input field to avoid accidental toggles
      const target = e.target as HTMLElement;
      if (['INPUT', 'TEXTAREA'].includes(target.tagName) || target.isContentEditable) {
        return;
      }

      if (e.key.toLowerCase() === 'e') {
        toggleEffects();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <EffectsContext.Provider value={{ isEnabled, toggleEffects }}>
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

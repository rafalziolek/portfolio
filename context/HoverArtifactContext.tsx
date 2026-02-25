'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface HoverArtifactContextType {
  activeArtifacts: Set<string>;
  addArtifact: (id: string) => void;
  removeArtifact: (id: string) => void;
}

const HoverArtifactContext = createContext<HoverArtifactContextType | undefined>(undefined);

export const HoverArtifactProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeArtifacts, setActiveArtifacts] = useState<Set<string>>(new Set());

  const addArtifact = useCallback((id: string) => {
    setActiveArtifacts((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const removeArtifact = useCallback((id: string) => {
    setActiveArtifacts((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ activeArtifacts, addArtifact, removeArtifact }),
    [activeArtifacts, addArtifact, removeArtifact]
  );

  return <HoverArtifactContext.Provider value={value}>{children}</HoverArtifactContext.Provider>;
};

export const useHoverArtifact = () => {
  const context = useContext(HoverArtifactContext);
  if (context === undefined) {
    throw new Error('useHoverArtifact must be used within a HoverArtifactProvider');
  }
  return context;
};

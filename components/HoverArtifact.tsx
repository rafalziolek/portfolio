'use client';

import { useCallback } from 'react';
import { useHoverArtifact } from '@/context/HoverArtifactContext';

interface HoverArtifactProps {
  children: React.ReactNode;
  artifactId: string;
}

const HoverArtifact = ({ children, artifactId }: HoverArtifactProps) => {
  const { addArtifact, removeArtifact } = useHoverArtifact();

  const handleMouseEnter = useCallback(() => addArtifact(artifactId), [addArtifact, artifactId]);
  const handleMouseLeave = useCallback(
    () => removeArtifact(artifactId),
    [removeArtifact, artifactId]
  );

  return (
    <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </span>
  );
};

export default HoverArtifact;

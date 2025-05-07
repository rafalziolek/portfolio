"use client";
import React, { createContext, useState } from "react";

export const ProjectContext = createContext(null);

export function ProjectProvider({ children }) {
  const [currentProject, setCurrentProject] = useState(null);
  const [isAnyProjectHovered, setIsAnyProjectHovered] = useState(false);

  return (
    <ProjectContext.Provider
      value={{
        currentProject,
        setCurrentProject,
        isAnyProjectHovered,
        setIsAnyProjectHovered,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

"use client";
import React, { createContext, useState, useContext } from "react";

const SectionContext = createContext(null);

export const SectionProvider = ({ children }) => {
  const [currentSection, setCurrentSection] = useState("projects"); // Default section changed to projects

  return (
    <SectionContext.Provider value={{ currentSection, setCurrentSection }}>
      {children}
    </SectionContext.Provider>
  );
};

export const useSection = () => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
};

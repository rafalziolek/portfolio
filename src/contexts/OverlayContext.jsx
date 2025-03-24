"use client";
import React, { createContext, useState, useContext } from "react";

export const OverlayContext = createContext();

export function OverlayProvider({ children }) {
  const [isOverlayShown, setIsOverlayShown] = useState(false);

  return (
    <OverlayContext.Provider value={{ isOverlayShown, setIsOverlayShown }}>
      {children}
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (context === undefined) {
    throw new Error("useOverlay must be used within an OverlayProvider");
  }
  return context;
}

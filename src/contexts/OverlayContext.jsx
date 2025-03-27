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

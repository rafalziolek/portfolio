"use client";

import { useEffect, useState } from "react";

export default function MouseCoordinates() {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    let frame;

    const updateCoordinates = (event) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setCoordinates({ x: Math.round(event.clientX), y: Math.round(event.clientY) });
      });
    };

    window.addEventListener("pointermove", updateCoordinates, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", updateCoordinates);
    };
  }, []);

  return (
    <output className="fixed bottom-4 left-4 z-100 flex items-center gap-2 whitespace-nowrap font-['SFMono-Regular',Consolas,'Liberation_Mono',monospace] text-[12px] text-black opacity-80 max-[620px]:hidden" aria-label="Pointer coordinates">
      <span>{coordinates?.x ?? "—"}(X)</span>
      <span>{coordinates?.y ?? "—"}(Y)</span>
    </output>
  );
}

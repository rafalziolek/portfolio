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
    <output className="fixed bottom-6 left-8 z-100 flex items-center gap-4 whitespace-nowrap font-['SFMono-Regular',Consolas,'Liberation_Mono',monospace] text-[12px] text-black max-[620px]:bottom-[18px] max-[620px]:left-4" aria-label="Pointer coordinates">
      <span>X {coordinates?.x ?? "—"}</span>
      <span>Y {coordinates?.y ?? "—"}</span>
    </output>
  );
}

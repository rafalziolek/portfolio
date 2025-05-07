"use client";

import { usePathname } from "next/navigation";
import ThumbnailStrip from "./ThumbnailStrip"; // Assuming this is the correct path

export default function ConditionalThumbnailStrip() {
  const pathname = usePathname();

  // Only render ThumbnailStrip on the main /works page
  if (pathname !== "/works") {
    return null;
  }

  return <ThumbnailStrip />;
}

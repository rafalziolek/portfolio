import { bits } from "@/data/bits.mjs";
import BitsGallery from "@/components/portfolio/BitsGallery";

export default function Bits() {
  return (
    <main className="min-h-screen text-black">
      <BitsGallery bits={bits} />
    </main>
  );
}

import { bits } from "@/data/bits.mjs";
import BitsGallery from "@/components/portfolio/BitsGallery";

export default function Bits() {
  return (
    <main className="min-h-screen bg-black text-white">
      <BitsGallery bits={bits} />
    </main>
  );
}

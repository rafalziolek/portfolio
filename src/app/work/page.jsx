import { bits } from "@/data/bits.mjs";
import Image from "next/image";

export default function Bits() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="columns-6 gap-[2px] pt-[150px] max-[960px]:columns-3 max-[620px]:columns-2 max-[620px]:pt-[166px]" aria-label="Design bits">
        {bits.map((bit) => (
          <figure className="mb-[2px] break-inside-avoid [&_img]:block [&_img]:h-auto [&_img]:w-full" key={bit.src}>
            <Image
              src={bit.src}
              alt={bit.alt}
              width={bit.width}
              height={bit.height}
              sizes="(max-width: 640px) 50vw, (max-width: 960px) 33vw, 17vw"
            />
          </figure>
        ))}
      </section>
    </main>
  );
}

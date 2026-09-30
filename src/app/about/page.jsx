import Image from "next/image";

const outsideWork = [
  {
    src: "/about/photography.jpg",
    alt: "A photography shoot in a studio",
    label: "Photography",
    aspect: "aspect-[317/300]",
  },
  {
    src: "/about/running-01.png",
    alt: "Prints and artwork arranged in a studio",
    label: "Learning 日本語",
    aspect: "aspect-[317/393]",
  },
  {
    src: "/about/running-02.png",
    alt: "Rafał running outdoors",
    label: "Working out",
    aspect: "aspect-[317/393]",
  },
  {
    src: "/about/baking.png",
    alt: "Freshly baked bread",
    label: "Baking",
    aspect: "aspect-[317/305]",
  },
];

export default function About() {
  return (
    <main className="about-page min-h-screen bg-black px-4 pt-[195px] pb-24 text-white">
      <div className="mx-auto flex w-full max-w-[650px] flex-col gap-16">
        <section className="mx-auto w-full max-w-[600px] text-[16px] leading-[1.5]">
          <div className="flex flex-col gap-6">
            <p className="m-0">
              I am a designer and developer from Warsaw, working primarily with
              software. Currently I’m a Senior Product Designer at Netflix,
              where I work on Hawkins Pro, our design system. Previously I
              spent time at Docplanner.
            </p>

            <p className="m-0">
              My work moves between design and engineering, with human-computer
              interaction at the center. I am interested in the mental models
              behind interfaces, and in carrying them through interaction,
              visual form, and implementation.
            </p>

            <p className="m-0">
              I want form and function to strengthen one another, so that a
              product serves its purpose with clarity and beauty.
            </p>
          </div>
        </section>

        <OutsideWork />
      </div>
    </main>
  );
}

function OutsideWork() {
  return (
    <section className="flex w-full flex-col gap-4">
      <div className="w-full px-4 pt-4 pb-2">
        <h2 className="mx-auto m-0 w-full max-w-[600px] text-[16px] leading-[1.5] font-[450]">
          Outside of work
        </h2>
      </div>

      <div className="grid grid-cols-2 items-start gap-4">
        <div className="flex flex-col gap-10">
          {outsideWork.slice(0, 2).map((item) => (
            <OutsideWorkPhoto item={item} key={item.src} />
          ))}
        </div>
        <div className="flex flex-col gap-[35px]">
          {outsideWork.slice(2).map((item) => (
            <OutsideWorkPhoto item={item} key={item.src} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OutsideWorkPhoto({ item }) {
  return (
    <figure className="m-0 flex w-full flex-col gap-1">
      <div className={`relative w-full overflow-hidden ${item.aspect}`}>
        <Image
          className="object-cover"
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 682px) calc((100vw - 48px) / 2), 317px"
        />
      </div>
      <figcaption className="portfolio-mono text-[12.5px] leading-[21px] uppercase text-[#a2a2a2]">
        {item.label}
      </figcaption>
    </figure>
  );
}

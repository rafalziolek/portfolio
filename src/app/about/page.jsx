import Image from "next/image";
import { homepageSocialLinks } from "@/data/homepage.mjs";
import { portfolioContentTop } from "@/helpers/portfolio-layout.mjs";
// Cylinder version preserved for later in AboutPhotoGallery.jsx.

const outsideDesign = [
  {
    src: "/about/photography.jpg",
    alt: "A photography shoot in a studio",
    label: "Photography",
    aspect: "aspect-[276/300]",
  },
  {
    src: "/about/running-01.png",
    alt: "Running gear and prints in a studio",
    label: "Running",
    aspect: "aspect-[276/393]",
  },
  {
    src: "/about/running-02.png",
    alt: "Rafał outdoors after a run",
    label: "Running",
    aspect: "aspect-[276/393]",
  },
  {
    src: "/about/baking.png",
    alt: "Freshly baked bread",
    label: "Baking",
    aspect: "aspect-[276/305]",
  },
];

export default function About() {
  return (
    <main
      className="about-page min-h-screen bg-black text-white"
      style={{ paddingTop: portfolioContentTop }}
    >
      <div className="mx-auto flex min-h-[1703px] w-[min(800px,100%)] flex-col gap-16">
        <section className="w-full px-4">
          <div className="flex w-full flex-col items-start gap-12">
            <div className="flex w-full flex-col items-start gap-8 text-[24px] leading-[30px] font-normal tracking-[-0.025em] [text-wrap:pretty]">
              <p className="m-0">
                I am a designer and developer from Warsaw, working primarily
                with software. Currently I’m a Senior Product Designer at
                Docplanner, where I work across several products, but my main
                focus is Watson, our design system.
              </p>

              <p className="m-0">
                My work moves between design and engineering, with
                human-computer interaction at the center. I am interested in
                the mental models behind interfaces, and in carrying them
                through interaction, visual form, and implementation.
              </p>

              <p className="m-0 leading-[33px]">
                I want form and function to strengthen one another, so that a
                product serves its purpose with clarity and beauty.
              </p>

              <span className="flex items-center gap-[10px] rounded-[5px] border border-[#222] bg-[#222] py-[5px] pr-[14px] pl-4 text-[19px] leading-[27px] font-normal tracking-normal">
                <span className="font-[Arial]">Resume</span>
                <span className="text-[12px] leading-[14px]" aria-hidden="true">
                  ↓
                </span>
              </span>
            </div>
          </div>
        </section>

        <div className="flex w-full flex-col gap-16">
          <OutsideDesign />
          <Connect />
        </div>
      </div>
    </main>
  );
}

function OutsideDesign() {
  return (
    <section className="flex w-full flex-col gap-4 px-4">
      <h2 className="m-0 text-[15px] leading-[18.75px] font-bold text-white/50">
        Outside of design
      </h2>

      <div className="grid grid-cols-2 items-start gap-4">
        <div className="flex flex-col gap-10">
          {outsideDesign.slice(0, 2).map((item) => (
            <OutsideDesignPhoto item={item} key={item.src} />
          ))}
        </div>
        <div className="flex flex-col gap-[35px]">
          {outsideDesign.slice(2).map((item) => (
            <OutsideDesignPhoto item={item} key={item.src} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OutsideDesignPhoto({ item }) {
  return (
    <figure className="m-0 flex w-full flex-col gap-1">
      <div className={`relative w-full overflow-hidden ${item.aspect}`}>
        <Image
          className="object-cover"
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 800px) calc((100vw - 48px) / 2), 376px"
        />
      </div>
      <figcaption className="text-[15px] leading-[18.75px]">
        {item.label}
      </figcaption>
    </figure>
  );
}

function Connect() {
  return (
    <section className="flex w-full flex-col gap-2 px-4">
      <h2 className="m-0 text-[15px] leading-[18.75px] font-bold text-white/50">
        Connect
      </h2>
      <div className="flex flex-col text-[17px] leading-[21.25px]">
        {homepageSocialLinks.map((item) => (
          <a
            className="w-fit text-white no-underline hover:animate-[link-blink_500ms_steps(1,end)_infinite] motion-reduce:hover:animate-none motion-reduce:hover:bg-white motion-reduce:hover:text-black focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
            href={item.href}
            key={item.label}
          >
            {item.label}
          </a>
        ))}
      </div>
    </section>
  );
}

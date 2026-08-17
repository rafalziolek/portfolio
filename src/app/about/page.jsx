import Image from "next/image";
import { homepageSocialLinks } from "@/data/homepage.mjs";
// Cylinder version preserved for later in AboutPhotoGallery.jsx.

const outsideDesign = [
  {
    src: "/about/tinkering.png",
    alt: "Color experiments on a laptop and tablet",
    label: "Tinkering with colors",
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
    <main className="about-page min-h-screen bg-black pt-[168px] text-white">
      <div className="mx-auto flex min-h-[1703px] w-[min(600px,100%)] flex-col gap-16">
        <section className="w-full px-4">
          <div className="flex w-full flex-col items-start gap-12">
            <h1 className="m-0 w-full text-center text-[40px] leading-[1.5] font-medium tracking-[-0.8px]">
              Info
            </h1>

            <div className="flex w-full flex-col items-start gap-6 text-[16px] leading-6 font-normal tracking-normal">
              <p className="m-0">
                I am a designer and developer from Warsaw, working primarily
                with software. Currently I’m a Senior Product Designer at
                Docplanner, where I work across several products, but my main
                focus is Watson, our design system.
              </p>

              <div>
                <p className="m-0">
                  My work moves between design and engineering, with
                  human-computer interaction at the center. I am interested in
                  the mental models behind interfaces, and in carrying them
                  through interaction, visual form, and implementation.
                </p>
                <p className="mt-6 mb-0">
                  I want form and function to strengthen one another, so that a
                  product serves its purpose with clarity and beauty.
                </p>
              </div>

              <span className="flex h-[26px] items-center gap-1 rounded-[2px] border border-[#191919] bg-[#191919] px-2 text-[16px] leading-[15px] tracking-[-0.005em]">
                Resume
                <span className="text-[14px] leading-none" aria-hidden="true">
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

        <footer className="mt-auto px-4 pb-[18px] text-[12.5px] leading-[18px] text-[#a2a2a2]">
          Shout out to{" "}
          <Image
            className="mx-1 inline-block h-[17px] w-6 rounded-[1px] object-cover align-middle opacity-90"
            src="/tesla.jpg"
            alt=""
            width={24}
            height={17}
          />
          Tesla and{" "}
          <Image
            className="mx-1 inline-block h-[17px] w-6 rounded-[1px] object-cover align-middle opacity-90"
            src="/newton.jpg"
            alt=""
            width={24}
            height={17}
          />
          Newton, for providing emotional support while building this website.
        </footer>
      </div>
    </main>
  );
}

function OutsideDesign() {
  return (
    <section className="flex w-full flex-col gap-4 px-4">
      <h2 className="m-0 text-[12.5px] leading-[21px] font-normal tracking-[-0.0007em] text-[#a2a2a2]">
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
          sizes="(max-width: 600px) calc((100vw - 48px) / 2), 276px"
        />
      </div>
      <figcaption className="text-[12.5px] leading-[23px] tracking-[-0.0007em]">
        {item.label}
      </figcaption>
    </figure>
  );
}

function Connect() {
  return (
    <section className="flex w-full flex-col gap-2 px-4">
      <h2 className="m-0 text-[12.5px] leading-[21px] font-normal tracking-[-0.0007em] text-[#a2a2a2]">
        Connect
      </h2>
      <div className="flex flex-col text-[16px] leading-6">
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

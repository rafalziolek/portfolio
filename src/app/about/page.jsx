import { homepageSections } from "@/data/portfolio.mjs";
import Image from "next/image";

export default function About() {
  const [intro, workedWith, outsideDesign, connect] = homepageSections;

  return (
    <main className="min-h-screen bg-white font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[14px] leading-[1.3] text-black">
      <article className="mx-auto w-[min(536px,calc(100%-40px))] py-[208px] max-[620px]:pt-[190px] max-[620px]:pb-[168px]">
        <div className="mb-12 [&_p]:m-0 [&_p+p]:mt-[18px]">
          {intro.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <AboutSection section={workedWith} showMeta />
        <AboutSection section={outsideDesign} />
        <AboutSection section={connect} />

        <figure className="mt-[92px] aspect-[274/352] w-[292px] overflow-hidden max-[620px]:w-[min(292px,100%)] [&_img]:block [&_img]:h-[128.03%] [&_img]:w-[123.36%] [&_img]:max-w-none [&_img]:-translate-y-[27.94%] [&_img]:object-cover">
          <Image
            src="/home/portrait-about.jpg"
            alt="Rafał sitting by the sea"
            width={1536}
            height={2048}
            sizes="292px"
          />
        </figure>
      </article>
    </main>
  );
}

function AboutSection({ section, showMeta = false }) {
  return (
    <section className="mb-12">
      <h2 className="mb-3 font-['SFMono-Regular',Consolas,'Liberation_Mono',monospace] text-[10px] leading-[1.3] font-medium uppercase">{section.heading}</h2>
      <div className="flex flex-col items-start gap-[2px]">
        {section.items.map((item) => (
          <div className="flex w-full gap-1" key={item.label}>
            {item.href ? <a className="shrink-0 bg-[rgba(228,228,228,0.59)] text-inherit no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff6347]" href={item.href}>{item.label}</a> : <span>{item.label}</span>}
            {showMeta && <span>{item.meta}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

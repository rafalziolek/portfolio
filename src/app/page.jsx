import { homepageProjects } from "@/data/homepage.mjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative min-h-[3935px] overflow-hidden bg-white font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[14px] leading-[1.3] text-black max-[620px]:min-h-[3340px]">
      <section className="flex flex-col items-center gap-1 pt-[119px] pb-1 max-[620px]:pt-[164px]" aria-label="Projects">
        {homepageProjects.map((project, index) => {
          const image = (
            <span className={`relative block shrink-0 box-border overflow-hidden [&_img]:block [&_img]:w-full [&_img]:max-w-none ${
              index === 0
                ? "h-[801px] w-[370px] rounded-[64px] border border-white/15 [&_img]:h-full [&_img]:object-cover max-[620px]:h-auto max-[620px]:w-[min(370px,calc(100vw-32px))] max-[620px]:aspect-[370/801] max-[620px]:rounded-[clamp(40px,16vw,65px)]"
                : index === 1
                  ? "h-[859px] w-[396px] rounded-[64px] [&_img]:h-auto max-[620px]:h-auto max-[620px]:w-[min(396px,calc(100vw-32px))] max-[620px]:aspect-[396/859] max-[620px]:rounded-[clamp(40px,16vw,65px)]"
                  : "h-[859px] w-[396px] rounded-[65px] border border-white [&_img]:h-full [&_img]:object-cover max-[620px]:h-auto max-[620px]:w-[min(396px,calc(100vw-32px))] max-[620px]:aspect-[396/859] max-[620px]:rounded-[clamp(40px,16vw,65px)]"
            }`}>
              <Image
                src={project.image}
                alt={project.alt}
                width={project.width}
                height={project.height}
                sizes="(max-width: 620px) calc(100vw - 32px), 396px"
                priority={index === 0}
              />
            </span>
          );

          return (
            <article className="flex h-[977px] w-full box-border items-center justify-center rounded-[5px] p-2 max-[620px]:h-[805px]" key={project.image}>
              {project.href ? (
                <Link className="flex h-full w-full items-center justify-center focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-[#0092e7]" href={project.href} aria-label={project.label}>
                  {image}
                </Link>
              ) : (
                image
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}

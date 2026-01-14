import Button from '@components/Button';
import CursorFollower2 from '@components/CursorFollower2';

export default function Home() {
  return (
    <div data-hide-cursor className="align-start flex max-w-[580px] flex-col justify-start p-6">
      <h1 className="font-gyre-heros pb-9 text-[3.375rem] leading-[0.9em] tracking-[-0.035em]">
        I'm a software designer based in Warsaw.
      </h1>
      <div className="flex flex-col pb-11">
        <p className="text-lg leading-[1.4em] font-medium tracking-tighter">
          Currently at Docplanner, where I'm building design systems for both web and mobile apps.
          Earlier, I worked with Semiflat, helping early-stage startups shape their products and
          design systems.
        </p>

        <div className="flex gap-3.5 pt-5">
          <a
            className="text-lg leading-[1.4em] font-medium tracking-tighter underline decoration-white/40 decoration-dotted decoration-1 underline-offset-4"
            href="x.com/rafal_ziolek"
          >
            x.com
          </a>
          <a
            className="text-lg leading-[1.4em] font-medium tracking-tighter underline decoration-white/40 decoration-dotted decoration-1 underline-offset-4"
            href="mailto:rafal.ziolek@icloud.com"
          >
            Email
          </a>
          <a
            className="text-lg leading-[1.4em] font-medium tracking-tighter underline decoration-white/40 decoration-dotted decoration-1 underline-offset-5"
            href="https://arena.co/rafal-ziolek"
          >
            Are.na
          </a>
          <a
            className="text-lg leading-[1.4em] font-medium tracking-tighter underline decoration-white/40 decoration-dotted decoration-1 underline-offset-4"
            href="https://rafal-ziolek.github.io/resume.pdf"
          >
            Résumé
          </a>
        </div>
      </div>
      <Button iconStart="plus" label="More" href="/about" />
      <CursorFollower2 threshold={80} />
    </div>
  );
}

import Button from '@components/Button';
import CursorFollower2 from '@components/CursorFollower2';

export default function Home() {
  return (
    <div data-hide-cursor className="align-start flex max-w-[500px] flex-col justify-start p-6">
      <h1 className="font-gyre-heros pb-8 text-5xl leading-[1em] tracking-[-0.03em] text-pretty">
        I'm a software designer based in Warsaw.
      </h1>
      <div className="flex flex-col pb-10">
        <p className="text-md leading-snug font-normal tracking-tight text-pretty dark:font-normal">
          Currently at Docplanner, where I'm building design systems for both web and mobile apps.
          Earlier, I worked with Semiflat, helping early-stage startups shape their products and
          design systems.
        </p>

        <div className="flex gap-3.5 pt-6">
          <a
            className="text-md leading-normal font-normal tracking-tight underline decoration-dotted decoration-1 underline-offset-4 dark:font-normal dark:decoration-white/40"
            href="https://x.com/rafal_ziolek"
          >
            x.com
          </a>
          <a
            className="text-md leading-normal font-normal tracking-tight underline decoration-dotted decoration-1 underline-offset-4 dark:font-normal dark:decoration-white/40"
            href="mailto:rafal.ziolek@icloud.com"
          >
            Email
          </a>
          <a
            className="text-md leading-normal font-normal tracking-tight underline decoration-dotted decoration-1 underline-offset-4 dark:font-normal dark:decoration-white/40"
            href="https://are.na/rafal-ziolek"
          >
            Are.na
          </a>
          <a
            className="text-md leading-normal font-normal tracking-tight underline decoration-dotted decoration-1 underline-offset-4 dark:font-normal dark:decoration-white/40"
            href="https://rafal-ziolek.github.io/resume.pdf"
          >
            Résumé
          </a>
        </div>
      </div>
      <Button iconStart="plus" label="More" href="/about" />
      <CursorFollower2 threshold={120} />
    </div>
  );
}

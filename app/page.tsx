import Button from '@components/Button';
import CursorFollower from '@components/CursorFollower';

export default function Home() {
  return (
    <div data-hide-cursor className="flex flex-col justify-start align-start max-w-[580px] p-6">
      <h1 className="text-[3.375rem] tracking-[-0.035em] font-gyre-heros leading-[0.9em] pb-9">
        I'm a software designer based in Warsaw.
      </h1>
      <div className="flex flex-col pb-11">
        <p className="text-lg leading-[1.4em] tracking-tighter font-medium">
          Currently at Docplanner, where I'm building design systems for both web and mobile apps.
          Earlier, I worked with Semiflat, helping early-stage startups shape their products and
          design systems.
        </p>

        <div className="flex gap-3.5 pt-5">
          <a
            className="text-lg leading-[1.4em]  font-medium tracking-tighter underline  underline-offset-4 decoration-white/40 decoration-1 decoration-dotted"
            href="x.com/rafal_ziolek"
          >
            x.com
          </a>
          <a
            className="text-lg leading-[1.4em]  font-medium tracking-tighter underline  underline-offset-4 decoration-white/40 decoration-1 decoration-dotted"
            href="mailto:rafal.ziolek@icloud.com"
          >
            Email
          </a>
          <a
            className="text-lg leading-[1.4em]  font-medium tracking-tighter underline  underline-offset-5 decoration-white/40 decoration-1 decoration-dotted"
            href="https://arena.co/rafal-ziolek"
          >
            Are.na
          </a>
          <a
            className="text-lg leading-[1.4em]  font-medium tracking-tighter underline  underline-offset-4 decoration-white/40 decoration-1 decoration-dotted"
            href="https://rafal-ziolek.github.io/resume.pdf"
          >
            Résumé
          </a>
        </div>
      </div>
      <Button iconStart="plus" label="More" />
      <CursorFollower />
    </div>
  );
}

import ArtifactOverlay from '@components/ArtifactOverlay';
import CursorFollower2 from '@components/CursorFollower2';
import HoverArtifact from '@components/HoverArtifact';
import Link from '@components/Link';
import { HoverArtifactProvider } from '@/context/HoverArtifactContext';

export default function Home() {
  return (
    <HoverArtifactProvider>
      <div data-hide-cursor className="align-start flex max-w-[480px] flex-col justify-start p-6">
        <h1
          className="pb-12 text-[54px] leading-[1em] tracking-[-0.03em] text-pretty"
          style={{ fontFamily: 'OT Neue Montreal medium' }}
        >
          I'm a software designer,
          <br /> based in <HoverArtifact artifactId="warsaw-clock">Warsaw</HoverArtifact>.
        </h1>
        <div className="flex flex-col gap-10 pb-10 text-xl leading-[1.3] !font-medium tracking-tight text-pretty dark:font-normal">
          <p>
            I'm <HoverArtifact artifactId="rafal-photo">Rafał</HoverArtifact>, a self-taught
            designer and developer. Currently I work at{' '}
            <Link href="https://www.docplanner.com">Docplanner</Link>. Previously helped startups
            shape their products at <Link href="https://semiflat.com">Semiflat</Link>.
          </p>

          <p>
            The best digital experiences emerge when design and code work as one. That's where I
            find myself working best.
          </p>

          <p>
            I believe in prototypes over processes, and designing from deep understanding. To design
            something really well, you have to get it.
          </p>

          <p>
            Outside of design I am a photographer, and an avid baker (ask me about vegan
            croissants).
          </p>

          <p>...</p>

          <p>
            Find me on <Link href="https://x.com/rafal_ziolek">x.com</Link>,{' '}
            <Link href="https://are.na/rafal-ziolek">Are.na</Link>, or contact me by{' '}
            <Link href="mailto:rafal.ziolek@icloud.com">email</Link>.
          </p>
        </div>
        <CursorFollower2 threshold={120} />
      </div>
      <ArtifactOverlay />
    </HoverArtifactProvider>
  );
}

import CursorFollower2 from '@components/CursorFollower2';
import Link from '@components/Link';

export default function Home() {
  return (
    <div data-hide-cursor className="align-start flex max-w-[480px] flex-col justify-start p-6">
      <h1
        className="pb-12 text-[42px] leading-[1em] tracking-[-0.035em] text-pretty"
        style={{ fontFamily: 'OT Neue Montreal medium' }}
      >
        I’m a software designer
        <br /> based in Warsaw.
      </h1>
      <div className="text-md flex flex-col gap-5 pb-10 leading-snug font-normal tracking-tight text-pretty dark:font-normal">
        <p>I'm Rafał, self taught designer and developer based in Warsaw, Poland.</p>
        <p>
          Currently building design systems at{' '}
          <Link href="https://www.docplanner.com">Docplanner</Link>.<br />
          Previously helped startups shape their products at{' '}
          <Link href="https://semiflat.com">Semiflat</Link>.
        </p>

        <p>
          The best digital experiences emerge when design and code work as one. That’s where I find
          myself working best.
        </p>
        <p>
          I believe in prototypes over processes, and designing from deep understanding. To design
          something really well, you have to get it.
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
  );
}

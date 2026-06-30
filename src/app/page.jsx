import HomeIntro from "@/components/portfolio/HomeIntro";
import SelectedWorksButton from "@/components/portfolio/SelectedWorksButton";
import { cta, homepageSections } from "@/data/portfolio.mjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between gap-20 bg-black px-5 py-20 text-neutral-200">
      <div className="mx-auto flex w-full max-w-[450px] justify-center items-start">
        <HomeIntro sections={homepageSections} />
      </div>
      <div className="flex mx-auto w-full max-w-[450px] flex-none content-center justify-center">
        <SelectedWorksButton style={{ width: "80%" }} href={cta.href}>
          {cta.label}
        </SelectedWorksButton>
      </div>
    </main>
  );
}

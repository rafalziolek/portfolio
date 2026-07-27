import { homepageProjects } from "@/data/homepage.mjs";
import ProjectGallery from "@/components/portfolio/ProjectGallery";

export default function Home() {
  return (
    <main className="relative min-h-[3935px] overflow-hidden bg-white font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[14px] leading-[1.3] text-black max-[620px]:min-h-[3340px]">
      <ProjectGallery projects={homepageProjects} />
    </main>
  );
}

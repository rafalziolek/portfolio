import { homepageProjects } from "@/data/homepage.mjs";
import ProjectGallery from "@/components/portfolio/ProjectGallery";

export default function Home() {
  return (
    <main className="relative min-h-screen w-max min-w-full overscroll-y-none bg-black pb-8 leading-[1.3] text-white">
      <ProjectGallery projects={homepageProjects} />
    </main>
  );
}

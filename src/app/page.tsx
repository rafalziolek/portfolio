import MainNav from "@/components/MainNav";
import ProjectList from "@/components/ProjectList";

export default function Home() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center uppercase text-xl leading-[1.33] tracking-[-0.02em] font-[500] text-center mx-auto">
        <div className="w-full max-w-[420px] flex flex-col gap-6 items-center">
          <h1>Rafa designs things</h1>
          <p>Primarily software, but occasionally other items as well.</p>
          <div className="h-[250px] w-[180px] bg-neutral-200 my-6"></div>
          <p>
            He balances interaction, experience, and appearance, integrating
            details into cohesive systems.
          </p>

          <p>
            Connect with him on x.com,{" "}
            <a href="https://www.instagram.com/rafal.ziolek/">Instagram</a> or
            via email
          </p>
        </div>
      </div>

      <ProjectList />
      <MainNav />
    </>
  );
}

"use client";

import MainNav from "@/components/MainNav";
import ProjectList from "@/components/ProjectList";
import { useState } from "react";
import AboutModal from "@/components/AboutModal";

export default function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center uppercase text-md leading-[1.4] tracking-[-0.005em] font-[600] text-center mx-auto">
        <div className="w-full max-w-[400px] flex flex-col gap-4 items-center">
          <h1>Rafa designs things</h1>
          <p>Primarily software, but occasionally other items as well.</p>
          <div className="flex flex-col gap-2 items-center justify-center py-16 px-0 rounded-lg w-full">
            <div className="flex h-[160px] items-center justify-center relative w-[207px] ">
              <div className="flex-none rotate-[5.683deg]">
                <div className="w-[160px] h-[207px] bg-neutral-200 rounded-lg" />
              </div>
            </div>
          </div>
          <p>
            He balances interaction, experience, and appearance, integrating
            details into cohesive systems.
          </p>

          <p>
            Connect with him on{" "}
            <a
              className="underline decoration-1 underline-offset-2 decoration-black"
              href="https://x.com/rafal_ziolek"
              target="_blank"
            >
              x.com
            </a>
            ,{" "}
            <a
              className="underline decoration-1 underline-offset-2 decoration-black"
              href="https://www.instagram.com/rafal.ziolek/"
              target="_blank"
            >
              Instagram
            </a>{" "}
            or via email
          </p>
        </div>
      </div>

      <ProjectList />
      <MainNav
        onAboutClick={() => setIsAboutOpen(true)}
        isAboutOpen={isAboutOpen}
      />

      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </>
  );
}

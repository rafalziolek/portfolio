"use client";

import MainNav from "@/components/MainNav";
import ProjectList from "@/components/ProjectList";
import { useState } from "react";
import AboutModal from "@/components/AboutModal";
import Text from "@/components/Text";
import Image from "next/image";

export default function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center text-center  mx-auto text-neutral-200">
        <div className="w-full max-w-[360px] flex flex-col gap-6 items-start">
          <div className="flex flex-col gap-3 items-center justify-center">
            {/* <AboutModal /> */}
            <Text variant="lead" isUppercase font="sans" className="!">
              Rafa designs things.{" "}
            </Text>

            <Text variant="heading-lg" isUppercase>
              Primarily software, but sometimes other things too.
            </Text>
          </div>
          <div className="flex flex-col gap-2 items-center justify-center py-14 px-0 rounded-lg w-full">
            <div className="flex h-[130px] items-center justify-center relative ">
              <div className="flex-none rotate-[2.683deg]">
                <Image
                  src="/image 50.png"
                  alt="Profile photo"
                  width={160}
                  height={207}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-start justify-center">
            <Text variant="heading-lg" isUppercase>
              He blends interactions, experience and aesthetics into cohesive,{" "}
              <br /> detail-driven systems.
            </Text>

            <Text variant="heading-lg" isUppercase>
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
            </Text>
          </div>
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

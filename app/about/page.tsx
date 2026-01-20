import Button from '@/components/Button';
import React from 'react';
import CursorFollower2 from '@/components/CursorFollower2';
import Image from 'next/image';
import LearningSection from '@/components/LearningSection';
import LikeDislikeGraph from '@/components/LikeDislikeGraph';

export default function About() {
  return (
    <div data-hide-cursor className="relative min-h-screen w-full pb-24">
      <Button iconStart="close" aria-label="close" href="/" className="fixed top-4 left-4 z-50" />

      <div className="grid min-h-screen grid-cols-[1fr_minmax(0,500px)_1fr]">
        {/* Left Column */}
        <div />

        {/* Center Column */}
        <div className="flex flex-col justify-center pt-40">
          <h1 className="font-gyre-heros pb-12 text-5xl leading-none tracking-[-0.02em] text-pretty">
            About
          </h1>

          <div className="flex flex-col gap-24">
            <div className="flex flex-col gap-9">
              <p className="text-md leading-normal font-normal tracking-tight text-pretty">
                Hi, I am Rafal Ziolek, I'm self-taught product designer and developer, based in
                Warsaw, Poland.
              </p>

              <p className="text-md leading-normal font-normal tracking-tight text-pretty">
                I focus on the intersection of form and function to create experiences that
                effortlessly become an extension of oneself. I&nbsp;believe in ideas over opinions,
                prototypes as the most valuable tool for collaboration, and exploring one hundred
                ideas to find the right one.
              </p>
              <p className="text-md leading-normal font-normal tracking-tight text-pretty">
                Currently I am at Docplanner, where I'm building design systems for both web and
                mobile apps. Earlier, I worked with Semiflat, helping early-stage startups shape
                their products and design systems.
              </p>
              <div className="flex gap-3.5 font-normal">
                <a
                  className="text-md leading-normal tracking-tight underline decoration-white/40 decoration-dotted decoration-1 underline-offset-4"
                  href="x.com/rafal_ziolek"
                >
                  x.com
                </a>
                <a
                  className="text-md leading-normal tracking-tight underline decoration-white/40 decoration-dotted decoration-1 underline-offset-4"
                  href="mailto:rafal.ziolek@icloud.com"
                >
                  Email
                </a>
                <a
                  className="text-md leading-normal tracking-tight underline decoration-white/40 decoration-dotted decoration-1 underline-offset-5"
                  href="https://arena.co/rafal-ziolek"
                >
                  Are.na
                </a>
                <a
                  className="text-md leading-normal tracking-tight underline decoration-white/40 decoration-dotted decoration-1 underline-offset-4"
                  href="https://rafal-ziolek.github.io/resume.pdf"
                >
                  Résumé
                </a>
              </div>
            </div>

            {/* Placeholder for Image - matching aspect ratio from screenshot approx 16:9 or similar */}
            <div className="relative -mx-[100px] flex aspect-[4/2.7] items-center overflow-hidden rounded-xl bg-neutral-900 contrast-[1.1] grayscale">
              {/* Image would go here. Using a div for now as requested 'don't focus on photos' */}
              <Image
                src="/profile.png"
                alt="Rafał Ziołek"
                width={2855}
                height={2773}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-48">
              <div className="w-full text-left">
                <span className="text-md mb-4 block font-medium tracking-tight opacity-50">
                  Design should be honest
                </span>
                <p className="text-md leading-normal font-medium tracking-tight">
                  I obsess over the pixels and the system they live in. Design should be honest—no
                  dark patterns, no fluff—just stuff that works, feels right, and makes sense for
                  both the person using it and the people building it.
                </p>
              </div>

              <div className="w-full text-left">
                <span className="text-md mb-6 block font-medium tracking-tight opacity-50">
                  Currently learning
                </span>

                <LearningSection />
              </div>

              <div className="grid w-full grid-cols-2 gap-8 text-left">
                <div>
                  <span className="text-md mb-4 block font-medium tracking-tight opacity-50">
                    Things I like
                  </span>
                  <ul className="text-md list-inside list-image-none leading-normal font-medium tracking-tight">
                    <li>Bad bitches</li>
                    <li>Star Wars</li>
                    <li>Cooking</li>
                    <li>Coffee</li>
                    <li>Coke Zero</li>
                    <li>To Pimp a Butterfly</li>
                    <li>Cowboy Bebop</li>
                    <li>Hybrid training</li>
                  </ul>
                </div>

                <div>
                  <span className="text-md mb-4 block font-medium tracking-tight opacity-50">
                    Things I dislike
                  </span>
                  <ul className="text-md leading-normal font-medium tracking-tight">
                    <li>Bad bitches</li>
                    <li>OKRs</li>
                    <li>Small talk</li>
                  </ul>
                </div>
              </div>
              {/* <LikeDislikeGraph /> */}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div />
      </div>
      {/* <CursorFollower2 threshold={80} /> */}
    </div>
  );
}

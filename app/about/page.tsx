import Button from '@/components/Button';
import React from 'react';
import CursorFollower2 from '@/components/CursorFollower2';
import Image from 'next/image';
import { Icon } from '@/components/Icon';

export default function About() {
  return (
    <div data-hide-cursor className="relative min-h-screen w-full">
      <Button iconStart="close" aria-label="close" href="/" className="fixed top-4 left-4 z-50" />

      <div className="grid min-h-screen grid-cols-[1fr_minmax(0,470px)_1fr]">
        {/* Left Column */}
        <div />

        {/* Center Column */}
        <div className="flex flex-col items-center justify-center pt-40 text-center">
          <h1 className="font-gyre-heros pb-9 text-[3.375rem] leading-[0.9em] tracking-[-0.035em]">
            I’m a Rafa. Software designer and developer living in Warsaw.
          </h1>

          <div className="flex flex-col items-center gap-24">
            <div className="flex flex-col items-center gap-9">
              <p className="text-lg leading-[1.4em] font-medium tracking-tighter">
                Currently at Docplanner, where I'm building design systems for both web and mobile
                apps. Earlier, I worked with Semiflat, helping early-stage startups shape their
                products and design systems.
              </p>
              <div className="flex gap-3.5">
                <a
                  className="text-lg leading-[1.4em] font-medium tracking-tighter underline decoration-white/40 decoration-dotted decoration-1 underline-offset-4"
                  href="x.com/rafal_ziolek"
                >
                  x.com
                </a>
                <a
                  className="text-lg leading-[1.4em] font-medium tracking-tighter underline decoration-white/40 decoration-dotted decoration-1 underline-offset-4"
                  href="mailto:rafal.ziolek@icloud.com"
                >
                  Email
                </a>
                <a
                  className="text-lg leading-[1.4em] font-medium tracking-tighter underline decoration-white/40 decoration-dotted decoration-1 underline-offset-5"
                  href="https://arena.co/rafal-ziolek"
                >
                  Are.na
                </a>
                <a
                  className="text-lg leading-[1.4em] font-medium tracking-tighter underline decoration-white/40 decoration-dotted decoration-1 underline-offset-4"
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
            <div className="flex flex-col gap-16">
              <div className="w-full text-left">
                <span className="mb-2 block text-lg font-medium tracking-tighter text-neutral-500">
                  Design should be honest
                </span>
                <p className="text-lg leading-[1.4em] font-medium tracking-tighter text-neutral-300">
                  I obsess over the pixels and the system they live in. Design should be honest—no
                  dark patterns, no fluff—just stuff that works, feels right, and makes sense for
                  both the person using it and the people building it.
                </p>
              </div>

              <hr className="w-full border-t border-neutral-900/80" />

              <div className="w-full text-left">
                <span className="mb-8 block text-lg font-medium tracking-tighter text-neutral-500">
                  I am currently learning
                </span>

                <div className="relative h-[240px] w-full">
                  {/* Visual Lines (SVG) */}
                  <svg className="pointer-events-none absolute inset-0 h-full w-full">
                    {/* Line to React Native */}
                    <line x1="30" y1="30" x2="280" y2="50" stroke="#ffffff" strokeWidth="1" />
                    <path
                      d="M280 50 l-5 -3 m 5 3 l-5 3"
                      stroke="#ffffff"
                      strokeWidth="1"
                      fill="none"
                    />

                    {/* Line to Japanese */}
                    <line x1="30" y1="30" x2="80" y2="140" stroke="#ffffff" strokeWidth="1" />
                    <path
                      d="M80 140 l-2 -5 m 2 5 l-5 -2"
                      stroke="#ffffff"
                      strokeWidth="1"
                      fill="none"
                    />

                    {/* Line to Vienosserie */}
                    <line x1="30" y1="30" x2="200" y2="150" stroke="#ffffff" strokeWidth="1" />
                    <path
                      d="M200 150 l-5 -2 m 5 2 l-2 -5"
                      stroke="#ffffff"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>

                  {/* Root Node (Brain) */}
                  <div className="absolute top-2 left-2 h-12 w-12 rounded-full bg-black">
                    <Icon name="brain" className="text-white" size={40} />
                  </div>

                  {/* React Native Node */}
                  <div className="absolute top-4 right-0 flex flex-col items-center justify-center rounded-full bg-neutral-800/50 px-5 py-3 backdrop-blur-sm">
                    <span className="text-lg font-semibold text-white">React native</span>
                    <span className="font-mono text-sm text-neutral-400">¯\_(ツ)_/¯</span>
                  </div>

                  {/* Japanese Node */}
                  <div className="absolute top-[120px] left-[20px] flex flex-col items-center justify-center rounded-full bg-neutral-800/50 px-6 py-3 backdrop-blur-sm">
                    <span className="text-lg font-semibold text-white">Japanese</span>
                    <span className="font-mono text-sm text-neutral-400">難しい</span>
                  </div>

                  {/* Vienosserie Node */}
                  <div className="absolute top-[180px] right-12 flex flex-col items-center justify-center rounded-full bg-neutral-800/50 px-6 py-3 backdrop-blur-sm">
                    <span className="text-lg font-semibold text-white">Vienosserie</span>
                    <span className="font-mono text-sm text-neutral-400">BUT VEGAN</span>
                  </div>
                </div>
              </div>

              <hr className="w-full border-t border-neutral-900/80" />

              <div className="grid w-full grid-cols-2 gap-8 text-left">
                <div>
                  <span className="mb-2 block text-lg font-medium tracking-tighter text-neutral-500">
                    Things I like
                  </span>
                  <ul className="list-inside list-image-none text-lg leading-[1.4em] font-medium tracking-tighter text-neutral-300">
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
                  <span className="mb-2 block text-lg font-medium tracking-tighter text-neutral-500">
                    Things I dislike
                  </span>
                  <ul className="text-lg leading-[1.4em] font-medium tracking-tighter text-neutral-300">
                    <li>Bad bitches</li>
                    <li>OKRs</li>
                    <li>Small talk</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div />
      </div>
      <CursorFollower2 threshold={80} />
    </div>
  );
}

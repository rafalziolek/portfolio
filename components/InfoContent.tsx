'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from '@/components/Link';
import HoverArtifact from '@/components/HoverArtifact';
import ArtifactOverlay from '@/components/ArtifactOverlay';
import { HoverArtifactProvider } from '@/context/HoverArtifactContext';

// Persists across SPA navigations, resets on hard refresh
let hasAnimationPlayed = false;

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const item = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    y: '0',
    transition: { duration: 1.2, type: 'spring' as const, bounce: 0 },
  },
};

export default function InfoContent() {
  const shouldAnimate = !hasAnimationPlayed;

  useEffect(() => {
    hasAnimationPlayed = true;
  }, []);

  return (
    <HoverArtifactProvider>
      <motion.div
        variants={container}
        initial={shouldAnimate ? 'hidden' : 'show'}
        animate="show"
        className="will-change-transformfont-gyre-heros dark:text-foreground grid grid-cols-1 p-4 text-[17px] leading-[1.15] tracking-[-0.03em] text-black sm:grid-rows-[auto] sm:gap-x-10 sm:gap-y-0 md:grid-cols-[repeat(16,minmax(0,1fr))] md:p-2 md:text-[22px]"
      >
        {/* Name block */}
        <motion.div
          variants={item}
          className="mb-4 flex flex-col items-start md:col-[6/span_3] md:row-1"
        >
          <span>Rafał Ziółek</span>
          <span className="opacity-50">Software Designer</span>
        </motion.div>

        {/* Bio + work history */}
        <div className="flex flex-col gap-3 md:col-[9/span_8] md:row-1">
          <motion.p variants={item} className="tracking-[-0.04em] text-balance">
            I&rsquo;m{' '}
            <HoverArtifact artifactId="rafal-photo">Rafał</HoverArtifact>
            , a software designer based in{' '}
            <HoverArtifact artifactId="warsaw-clock">Warsaw, Poland</HoverArtifact>
            . Currently I&nbsp;work at Docplanner. Previously, I&nbsp;helped startups shape their
            products at Semiflat.
          </motion.p>

          <motion.p variants={item} className="tracking-[-0.04em] text-balance">
            The best digital experiences emerge when design and code work as one&mdash;That&rsquo;s
            where I&nbsp;find myself working best. I&nbsp;believe in prototypes over processes, and
            designing from deep understanding. To design something really well, you have to get it.
          </motion.p>

          {/* Mobile table: 2 columns (Year / Where) */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 gap-x-2 gap-y-1 pt-3 tracking-[-0.02em] md:hidden"
          >
            <span className="text-[13px] opacity-50">Year</span>
            <span className="text-[13px] opacity-50">Where</span>

            <span className="text-[16px]">2019–Now</span>
            <span className="text-[16px]">Docplanner</span>

            <span className="text-[16px]">2021–2024</span>
            <span className="text-[16px]">Semiflat</span>

            <span className="text-[16px]">2018</span>
            <span className="text-[16px]">Absolent Group</span>

            <span className="text-[16px]">2018</span>
            <span className="text-[16px]">INVO</span>
          </motion.div>

          {/* Desktop table: 3 columns (Year / Where / What) */}
          <motion.div
            variants={item}
            className="hidden grid-cols-[repeat(6,minmax(0,1fr))] gap-x-1 gap-y-1 pt-3 tracking-[-0.02em] md:grid"
          >
            <span className="col-[1/span_2] text-[13px] opacity-50">Year</span>
            <span className="col-[3/span_2] text-[13px] opacity-50">Where</span>
            <span className="col-[5/span_2] text-[13px] opacity-50">What</span>

            <span className="col-[1/span_2] text-[16px]">2019–Now</span>
            <span className="col-[3/span_2] text-[16px]">Docplanner</span>
            <span className="col-[5/span_2] text-[16px]">Product Design</span>

            <span className="col-[1/span_2] text-[16px]">2021–2024</span>
            <span className="col-[3/span_2] text-[16px]">Semiflat</span>
            <span className="col-[5/span_2] text-[16px]">Freelance Product Design</span>

            <span className="col-[1/span_2] text-[16px]">2018</span>
            <span className="col-[3/span_2] text-[16px]">Absolent Group</span>
            <span className="col-[5/span_2] text-[16px]">User Interface Design</span>

            <span className="col-[1/span_2] text-[16px]">2018</span>
            <span className="col-[3/span_2] text-[16px]">INVO</span>
            <span className="col-[5/span_2] text-[16px]">Product Design</span>
          </motion.div>
        </div>

        {/* Divider 1 */}
        <motion.div
          variants={item}
          className="mb-1 flex h-0 w-full flex-col border-b border-dotted border-black/15 pt-10 md:col-[6/span_11] dark:border-white/15"
        />

        {/* Outside of design */}
        <motion.div variants={item} className="mb-2 flex flex-col md:col-[6/span_3]">
          <span>Outside of design</span>
        </motion.div>
        <motion.div variants={item} className="flex flex-col md:col-[9/span_8]">
          <p>
            I am a <Link href="https://www.instagram.com/rafal.ziolek/">photographer</Link> an avid
            baker, and I&rsquo;m learning Japanese [<span className="font-light">日本語</span>].
          </p>
        </motion.div>

        {/* Divider 2 */}
        <motion.div
          variants={item}
          className="mb-2 flex h-0 w-full flex-col border-b border-dotted border-black/15 pt-10 md:col-[6/span_11] dark:border-white/15"
        />

        {/* Connect */}
        <motion.div variants={item} className="mb-2 flex flex-col md:col-[6/span_3]">
          <span>Connect</span>
        </motion.div>
        <motion.div variants={item} className="flex flex-col gap-0 md:col-[9/span_8]">
          <p>
            <Link href="https://x.com/rafal_ziolek">x.com</Link>
            {', '}
            <Link href="https://are.na/rafal-ziolek">Are.na</Link>
            {', '}
            <Link href="mailto:rafal.ziolek@icloud.com">Email</Link>
            {', '}
            <Link href="https://rafal-ziolek.github.io/resume.pdf">Resume</Link>
          </p>
        </motion.div>
      </motion.div>

      <ArtifactOverlay />
    </HoverArtifactProvider>
  );
}

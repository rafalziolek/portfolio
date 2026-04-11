'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from '@/components/Link';

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
    transition: { duration: 1.2, type: 'spring' as const, bounce: 0 },
  },
};

export default function InfoContent() {
  const shouldAnimate = !hasAnimationPlayed;

  useEffect(() => {
    hasAnimationPlayed = true;
  }, []);

  return (
    <motion.div
      variants={container}
      initial={shouldAnimate ? 'hidden' : 'show'}
      animate="show"
      className="flex flex-col gap-12"
    >
      {/* Bio */}
      <div className="flex flex-col gap-6">
        <motion.p variants={item}>
          I&rsquo;m Rafał, a software designer based in Warsaw, Poland. Currently I&nbsp;work at
          Docplanner. Previously, I&nbsp;helped startups shape their products at Semiflat.
        </motion.p>

        <motion.p variants={item}>
          The best digital experiences emerge when design and code work as one&mdash;That&rsquo;s
          where I&nbsp;find myself working best. I&nbsp;believe in prototypes over processes, and
          designing from deep understanding. To design something really well, you have to get it.
        </motion.p>
      </div>

      {/* Outside of design */}
      <motion.div variants={item} className="flex flex-col gap-1">
        <span className="opacity-50">Outside of design</span>
        <div className="flex flex-col">
          <span>Photography</span>
          <span>Baking</span>
          <span>
            Learning Japanese 【<span className="font-light">日本語</span>】
          </span>
        </div>
      </motion.div>

      {/* Social */}
      <motion.div variants={item} className="flex flex-col gap-1">
        <span className="opacity-50">Social</span>
        <div className="flex flex-col">
          <Link href="https://are.na/rafal-ziolek">Are.na</Link>
          <Link href="https://x.com/rafal_ziolek">x.com</Link>
          <Link href="https://www.instagram.com/rafal.ziolek/">Instagram</Link>
        </div>
      </motion.div>

      {/* Listening to */}
      <motion.div variants={item} className="flex flex-col gap-1.5">
        <span className="opacity-50">Listening to</span>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span>Baby Keem &bull; Ca$ino</span>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-full bg-[rgba(227,227,227,0.9)] backdrop-blur-[10px] dark:bg-[rgba(40,40,40,0.9)]"
            >
              <span className="text-sm text-black dark:text-white">􀊄</span>
            </button>
          </div>
          <span className="opacity-50">5 minutes ago</span>
        </div>
      </motion.div>

      {/* Photo */}
      <motion.div variants={item} className="relative w-full">
        <Image
          src="/profile.png"
          alt="Rafał Ziółek portrait"
          width={558}
          height={327}
          className="w-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { ProjectImage } from '@/lib/data';

const item = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1.2, type: 'spring' as const, bounce: 0 },
  },
};

interface WorkItemProps {
  project: ProjectImage;
}

export default function WorkItem({ project }: WorkItemProps) {
  return (
    <motion.div
      variants={item}
      className="group relative flex flex-col items-center justify-center p-4 pb-10"
    >
      <Image
        src={project.src}
        alt={project.alt}
        sizes="(max-width: 1023px) 50vw, 25vw"
        className="max-h-[60vh] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
      />
      {/* Hover label */}
      <div className="absolute bottom-0 left-0 right-0 hidden items-center justify-center gap-2 group-hover:flex">
        <span>{project.title}</span>
        <span className="opacity-30">See project 􀄯</span>
      </div>
    </motion.div>
  );
}

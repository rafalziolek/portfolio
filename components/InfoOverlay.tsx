'use client';

import { motion } from 'framer-motion';

interface InfoOverlayProps {
  children: React.ReactNode;
}

export default function InfoOverlay({ children }: InfoOverlayProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-40 overflow-y-auto bg-[rgba(227,227,227,0.9)] backdrop-blur-[50px] dark:bg-[rgba(0,0,0,0.9)]"
    >
      <div className="mx-auto max-w-[1200px] px-4 pt-24 pb-32 lg:pl-[50%] lg:pr-16">
        {children}
      </div>
    </motion.div>
  );
}

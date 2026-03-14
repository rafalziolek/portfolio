'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';

interface CdDiscProps {
  src: string;
  alt: string;
  size?: number;
  spinning?: boolean;
}

export default function CdDisc({ src, alt, size = 42, spinning = false }: CdDiscProps) {
  const controls = useAnimation();

  useEffect(() => {
    if (spinning) {
      controls.start({
        rotate: 360,
        transition: { repeat: Infinity, duration: 6, ease: 'linear' },
      });
    } else {
      controls.stop();
    }
  }, [spinning, controls]);

  return (
    <motion.div
      animate={controls}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'relative',
        maskImage: 'radial-gradient(circle, transparent 18%, black 19%)',
        WebkitMaskImage: 'radial-gradient(circle, transparent 18%, black 19%)',
      }}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
    </motion.div>
  );
}

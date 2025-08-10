"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "motion/react";
import { useRouter } from "next/navigation";
import Button from "./Button";

interface ProjectNavProps {
  title: string;
  nextProjectSlug?: string;
}

export default function ProjectNav({
  title,
  nextProjectSlug,
}: ProjectNavProps) {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(
    scrollYProgress,
    (v) => `${(v * 100).toFixed(2)}%`
  );
  const [isShown, setIsShown] = React.useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIsShown(v > 0.96);
  });

  const handleClose = () => {
    router.push("/");
  };

  const handleNext = () => {
    if (nextProjectSlug) {
      router.push(`/${nextProjectSlug}`);
    }
  };

  return (
    <motion.nav
      layout
      transition={{
        type: "spring",
        stiffness: 700,
        damping: 40,
        mass: 0.05,
      }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 transform backdrop-blur-md bg-[#e7e7e7] flex flex-row gap-1 items-center justify-start p-1 rounded-full z-50 overflow-hidden"
    >
      {/* Full-width progress overlay with 4% black */}
      <motion.div
        className="absolute left-0 top-0 bottom-0"
        style={{ width: progressWidth, backgroundColor: "rgba(0,0,0,0.04)" }}
      />
      {/* Close Button */}
      <Button
        asMotion
        motionLayout="position"
        onClick={handleClose}
        variant="white"
        className="relative z-10 px-4 font-medium text-lg tracking-tight"
      >
        ×
      </Button>

      {/* Title */}
      <motion.div
        layout="position"
        className={`relative z-10 flex items-center justify-center h-11 pl-3 ${
          isShown ? "pr-3" : "pr-7"
        } rounded-full`}
      >
        <span className="font-medium text-lg text-center whitespace-nowrap tracking-tight text-black">
          {title}
        </span>
      </motion.div>
      <AnimatePresence initial={false} mode="popLayout">
        {isShown && (
          <motion.div
            key="next"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.2 }}
          >
            <Button
              asMotion
              onClick={handleNext}
              variant="filled"
              className="relative px-4 font-medium text-lg tracking-tight"
            >
              Next
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

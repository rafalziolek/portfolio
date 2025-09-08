"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  scale,
} from "motion/react";
import { useRouter } from "next/navigation";
import Button from "./Button";
import Text from "./Text";
import { Close } from "./icons/Close";
import { ArrowRight } from "./icons/ArrowRight";
import { randomUUID } from "crypto";

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

  const handleNext = () => {
    if (nextProjectSlug) {
      router.push(`/${nextProjectSlug}`);
    }
  };

  return (
    <motion.div
      className="fixed bottom-7 left-1/2 -translate-x-1/2 transform flex flex-row gap-1 items-center justify-center rounded-full z-50"
      // transition={{
      //   type: "spring",
      //   stiffness: 700,
      //   damping: 40,
      //   mass: 0.05,
      // }}
      animate={{
        y: isShown ? 4 : 0,
        transition: {
          type: "spring",
          bounce: 0,
        },
      }}
    >
      {/* Full-width progress overlay with 4% black */}
      <motion.button
        layout
        className="w-9 h-9 bg-neutral-800/90 rounded-full flex justify-center items-center"
      >
        <Close size={20} color="white" />
      </motion.button>
      <motion.div
        layout
        style={{
          borderRadius: 999,
        }}
        className="transform backdrop-blur-md bg-neutral-800/90 flex flex-row gap-1 items-center justify-start p-1 z-50 overflow-hidden min-h-9"
      >
        <motion.div
          className="absolute left-0 top-0 bottom-0 bg-neutral-500/20"
          style={{
            width: progressWidth,
          }}
        />
        {/* Close Button */}
        {/* Title */}{" "}
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={isShown ? "shown" : "hidden"}
            className="flex flex-row gap-2 justify-center items-center text-center px-2"
            initial={{ opacity: 0, filter: "blur(6px)", x: -100 }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              x: 0,
              transition: { duration: 0.2 },
            }}
            exit={{
              opacity: 0,
              filter: "blur(6px)",
              x: 100,
              transition: { duration: 0.2 },
            }}
          >
            {isShown && (
              <Text
                as="span"
                variant="body"
                font="mono"
                isUppercase
                className="text-white/50"
              >
                NEXT:
              </Text>
            )}
            <Text
              asMotion
              variant="body"
              font="mono"
              isUppercase
              color="white"
              className="flex items-center justify-center flex-row gap-2"
            >
              {!isShown ? title : nextProjectSlug}
            </Text>
          </motion.div>{" "}
        </AnimatePresence>
        <AnimatePresence initial={false} mode="popLayout">
          {isShown && (
            <motion.div
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.2 }}
            >
              <Button
                onClick={handleNext}
                variant="default"
                iconOnly
                className=" px-4 font-medium text-lg tracking-tight"
              ></Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

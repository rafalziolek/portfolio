"use client";
import React, { useContext } from "react";
import styles from "./AboutSection.module.scss";
import Text from "@/components/Text/Text";
import { OverlayContext } from "@/contexts/OverlayContext";
import { AnimatePresence, motion } from "motion/react";
import ProfilePhoto from "@/components/ProfilePhoto/ProfilePhoto";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/Button/Button";
import List from "@/components/List/List";
import { SquareArrowOutUpRight } from "lucide-react";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      opacity: { duration: 0.3 },
      staggerChildren: 0.1,
      type: "spring",
      bounce: 0,
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      opacity: { duration: 0.3 },
      height: { duration: 0 },
      type: "spring",
      bounce: 0,
    },
  },
};

const paragraphVariants = {
  hidden: {
    opacity: 0,
    translateY: -10,
  },
  visible: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      bounce: 0,
    },
  },
  exit: {
    opacity: 0,
    translateY: -10,
    transition: {
      duration: 0.5,
      bounce: 0,
      type: "spring",
    },
  },
};

export default function MoreSection() {
  const { isOverlayShown, setIsOverlayShown } = useContext(OverlayContext);

  return (
    <>
      <Button
        className={styles.readMoreButton}
        onClick={() => setIsOverlayShown(!isOverlayShown)}
        trailingVisual={
          <AnimatePresence mode="wait" initial={false}>
            {isOverlayShown ? (
              <motion.span
                key="up"
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ marginTop: "4px" }}
              >
                <ChevronUp
                  size={14}
                  strokeWidth={2.5}
                  style={{ color: "var(--color-fg)" }}
                />
              </motion.span>
            ) : (
              <motion.span
                key="down"
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ marginTop: "4px" }}
              >
                <ChevronDown
                  size={14}
                  strokeWidth={2.5}
                  style={{ color: "var(--color-fg)" }}
                />
              </motion.span>
            )}
          </AnimatePresence>
        }
      >
        {"Read "}
        <AnimatePresence mode="wait" initial={false}>
          {isOverlayShown ? (
            <motion.span
              key="less"
              style={{ display: "inline-block" }}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              less
            </motion.span>
          ) : (
            <motion.span
              key="more"
              style={{ display: "inline-block" }}
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              more
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence mode="popLayout">
        {isOverlayShown && (
          <motion.div
            layout
            className={styles.moreWrapper}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.paragraph}
              variants={paragraphVariants}
            >
              <Text tag="p">
                I'm a designer who loves getting into both the nitty-gritty
                details and the big picture.
              </Text>

              <Text tag="p">
                Design for me is not just about making things look good; it's
                about crafting an experience that's intuitive, user-friendly,
                and above all, honest. I aim for transparency, ensuring that
                what's good for the business also benefits the person using it.
              </Text>
              <Text tag="p">
                Beyond the world of UI/UX, I draw inspiration from various
                disciplines and arts, from photography to design as an art form.
                All these feed into a design process that's as versatile as it
                is focused.
              </Text>
              <Text tag="p">
                Although I am first and foremost a designer, I do experiment
                with code to give my designs an extra layer of polish.
              </Text>
              <Text tag="p">
                This hands-on approach helps me understand the possibilities and
                limitations, ensuring that my design ideas are not just visually
                appealing but also practically implementable.
              </Text>
            </motion.div>
            <motion.div
              className={styles.listGroup}
              variants={paragraphVariants}
            >
              <List heading="Who inspires me">
                <List.Item
                  href="https://www.youtube.com/@FaizalWestcott"
                  external
                >
                  Faizal Westcott
                </List.Item>
                <List.Item href="https://www.youtube.com/@GawxArt" external>
                  Gawx
                </List.Item>
                <List.Item href="https://x.com/rsms" external>
                  Rasmus Andersson
                </List.Item>
                <List.Item
                  href="https://music.apple.com/pl/artist/tyler-the-creator/420368335"
                  external
                >
                  Tyler, The Creator
                </List.Item>
              </List>
              <List heading="Learning now">
                <List.Item>Vue.js</List.Item>
                <List.Item>Japanese</List.Item>
              </List>
              <List heading="Random favs">
                <List.Item
                  href="https://en.wikipedia.org/wiki/Star_Wars"
                  external
                >
                  Star Wars
                </List.Item>
                <List.Item
                  href="https://music.apple.com/pl/album/what-a-day/1679454273?i=1679455188"
                  external
                >
                  WHAT A DAY - Tyler The Creator
                </List.Item>
                <List.Item>Cooking</List.Item>
              </List>
            </motion.div>
            <motion.div variants={paragraphVariants}>
              <ProfilePhoto className={styles.photoWrapper} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

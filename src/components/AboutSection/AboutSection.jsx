"use client";
import React, { useContext } from "react";
import styles from "./AboutSection.module.scss";
import Text from "@/components/Text/Text";
import { OverlayContext } from "@/contexts/OverlayContext";
import { AnimatePresence, motion } from "motion/react";
import StyledLink from "@/components/StyledLink/StyledLink";
import ProfilePhoto from "@/components/ProfilePhoto/ProfilePhoto";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/Button/Button";

const containerVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(4px)",
    transition: {
      duration: 0.2,
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
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    translateY: -10,
    transition: {
      duration: 0.3,
    },
  },
};

export default function MoreSection() {
  const { isOverlayShown, setIsOverlayShown } = useContext(OverlayContext);

  return (
    <>
      <Button
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
                style={{ marginTop: "3px" }}
              >
                <ChevronUp size={16} strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span
                key="down"
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ marginTop: "3px" }}
              >
                <ChevronDown size={16} strokeWidth={2.5} />
              </motion.span>
            )}
          </AnimatePresence>
        }
      >
        {isOverlayShown ? "Read less" : "Read more"}
      </Button>
      <AnimatePresence mode="popLayout">
        {isOverlayShown && (
          <motion.div
            className={styles.moreWrapper}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.paragraph}
              variants={paragraphVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
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
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className={styles.list}>
                <Text tag="h4" type="heading">
                  Who inspires me
                </Text>
                <li>
                  <StyledLink label="Faizal Westcott" href="#" />
                </li>
                <li>
                  <StyledLink label="Gawx" href="#" />
                </li>
                <li>
                  <StyledLink label="Rasmus Andersson" href="#" />
                </li>
                <li>
                  <StyledLink label="Tyler The Creator" href="#" />
                </li>
              </ul>
              <ul className={styles.list}>
                <Text tag="h4" type="heading">
                  Learning now
                </Text>
                <li>
                  <Text tag="p">Vue.js</Text>
                </li>
                <li>
                  <Text tag="p">Japanese</Text>
                </li>
              </ul>
              <ul className={styles.list}>
                <Text tag="h4" type="heading">
                  Random favs
                </Text>
                <li>
                  <StyledLink label="Star Wars" href="#" />
                </li>
                <li>
                  <StyledLink label="What a day - Tyler The Creator" href="#" />
                </li>
                <li>
                  <Text tag="span">Cooking</Text>
                </li>
              </ul>
            </motion.div>
            <motion.div>
              <ProfilePhoto
                variants={paragraphVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={styles.photoWrapper}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

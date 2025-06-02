"use client";
import React from "react";
import styles from "./Connect.module.scss";
import Text from "@/components/Text/Text";
import List from "@/components/List/List";
import StyledLink from "@/components/StyledLink/StyledLink";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import EmailButton from "@/components/EmailButton/EmailButton";
const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/rafal.ziolek",
    tag: "/rafal.ziolek",
    external: true,
  },
  {
    name: "GitHub",
    tag: "/rafalziolek",
    href: "https://github.com/rafalziolek",
    external: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/rafal_ziolek",
    tag: "/rafal_ziolek",
    external: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rafal-ziolek/",
    tag: "/rafal-ziolek",
    external: true,
  },
  {
    name: "Are.na",
    href: "https://www.are.na/rafal-ziolek",
    tag: "/rafal-ziolek",
    external: true,
  },
];

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
    transition: {
      duration: 0.2,
      type: "spring",
      bounce: 0,
    },
  },
};

const itemVariants = {
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
      duration: 0.3,
      type: "spring",
      bounce: 0,
    },
  },
};

const Connect = () => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={styles.connectContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.ul className={styles.socialList} variants={itemVariants}>
          <EmailButton label="Email" copyText="rafal.ziolek@icloud.com" />
          {socialLinks.map((link) => (
            <li key={link.name} className={styles.socialListItem}>
              {/* <Text tag="p" type="superscript-small" uppercase>
                {link.name}
              </Text> */}
              <StyledLink
                href={link.href}
                external={link.external}
                label={link.name}
              ></StyledLink>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </AnimatePresence>
  );
};

export default Connect;

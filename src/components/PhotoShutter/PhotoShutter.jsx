"use client";
import React from "react";
import styles from "./PhotoShutter.module.scss";
import Image from "next/image";
import portraitImg from "/public/portrait.png";
import { motion, stagger, useAnimate, useScroll } from "framer-motion";
const MotionImage = motion(Image);

function PhotoShutter({ variants }) {
  const { scrollYProgress } = useScroll({
    offset: ["200px", "300px"],
  });

  const container = {
    show: {
      opacity: 0.7,
      once: true,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };
  const shutter = {
    show: {
      opacity: 1,
      once: true,
      transition: {
        duration: 0,
      },
    },
  };

  return (
    <motion.div
      //   ref={scope}
      className={styles["images-wrapper"]}
      variants={container}
      animate="show"
      style={{ y: scrollYProgress }}
    >
      <MotionImage
        priority
        variants={shutter}
        src={portraitImg}
        alt="Picture of my reflection in the windows, holding a camera"
      ></MotionImage>
      <MotionImage
        priority
        variants={shutter}
        src={portraitImg}
        alt="Picture of my reflection in the windows, holding a camera"
      ></MotionImage>
      <MotionImage
        priority
        variants={shutter}
        src={portraitImg}
        alt="Picture of my reflection in the windows, holding a camera"
      ></MotionImage>{" "}
      <MotionImage
        priority
        variants={shutter}
        src={portraitImg}
        alt="Picture of my reflection in the windows, holding a camera"
      ></MotionImage>{" "}
    </motion.div>
  );
}

export default PhotoShutter;

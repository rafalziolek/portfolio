"use client";
import React from "react";
import styles from "./PhotoShutter.module.scss";
import Image from "next/image";
import portraitImg from "/public/potrait@2x.png";
import { motion, stagger, useAnimate } from "framer-motion";
const MotionImage = motion(Image);

function PhotoShutter({ variants }) {
  const container = {
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const shutter = {
    show: {
      opacity: 1,
    },
  };
  //   const [scope, animate] = useAnimate();
  //   React.useEffect(() => {
  //     animate("img", { opacity: 1 }, { duration: "0.15", delay: stagger(0.15) });
  //   });
  return (
    <motion.div
      //   ref={scope}
      className={styles["images-wrapper"]}
      variants={container}
      animate="show"
    >
      <MotionImage
        variants={shutter}
        src={portraitImg}
        alt="Picture of my reflection in the windows, holding a camera"
      ></MotionImage>
      <MotionImage
        variants={shutter}
        src={portraitImg}
        alt="Picture of my reflection in the windows, holding a camera"
      ></MotionImage>
      <MotionImage
        variants={shutter}
        src={portraitImg}
        alt="Picture of my reflection in the windows, holding a camera"
      ></MotionImage>
    </motion.div>
  );
}

export default PhotoShutter;

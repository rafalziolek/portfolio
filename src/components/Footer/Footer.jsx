"use client";
import { motion } from "motion/react";
import React from "react";
import styles from "./Footer.module.scss";
import Text from "@/components/Text/Text";
import Image from "next/image";
import clsx from "clsx";
import { Button } from "@/components/Button/Button";
export default function Footer({ className }) {
  return (
    <div className={clsx(styles.footer, className)}>
      <Text tag="p" type="caption">
        Shout out to my cats &nbsp;
        <span style={{ whiteSpace: "nowrap" }}>
          <Image
            src="/tesla.jpg"
            height={128}
            width={128}
            alt="Tesla"
            className={styles.image}
          />
          Tesla
        </span>
        &nbsp;and&nbsp;
        <span style={{ whiteSpace: "nowrap" }}>
          <Image
            src="/newton.jpg"
            height={128}
            width={128}
            alt="Newton"
            className={styles.image}
          />
          Newton
        </span>{" "}
        for emotional support while I&nbsp;built this website.
      </Text>
      <Button size="small">Colophon</Button>
    </div>
  );
}

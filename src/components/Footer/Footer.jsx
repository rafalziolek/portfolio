import React from "react";
import styles from "./Footer.module.scss";
import Text from "@/components/Text/Text";
import Image from "next/image";
import clsx from "clsx";
export default function Footer({ className }) {
  return (
    <div className={clsx(styles.footer, className)}>
      <Text tag="p">
        Special thanks to my cats,
        <Image
          src="/tesla.jpg"
          height={128}
          width={128}
          alt="Tesla"
          className={styles.image}
        />
        Tesla and
        <Image
          src="/newton.jpg"
          height={128}
          width={128}
          alt="Newton"
          className={styles.image}
        />
        Newton for providing emotional support while building this website.
      </Text>
    </div>
  );
}

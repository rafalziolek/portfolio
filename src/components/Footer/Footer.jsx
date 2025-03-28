import React from "react";
import styles from "./Footer.module.scss";
import Text from "@/components/Text/Text";
import Image from "next/image";

export default function Footer() {
  return (
    <div className={styles.footer}>
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

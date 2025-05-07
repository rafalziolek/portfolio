"use client";
import React, { useContext } from "react";
import styles from "./Intro.module.scss";
import Text from "@/components/Text/Text";
import StyledLink from "@/components/StyledLink/StyledLink";
import { usePathname } from "next/navigation";
import Navigation from "@/components/Navigation/Navigation";

export default function Intro() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <>
      <div className={styles.intro}>
        <Text type="display" tag="h1">
          Rafał Ziółek — Designer and photographer.
        </Text>
        <Text tag="p" type="display">
          Currently building design systems at&nbsp;Docplanner.
        </Text>
      </div>
    </>
  );
}

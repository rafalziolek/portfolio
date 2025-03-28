"use client";
import React, { useContext } from "react";
import styles from "./Intro.module.scss";
import Text from "@/components/Text/Text";
import StyledLink from "@/components/StyledLink/StyledLink";
import EmailButton from "@/components/EmailButton/EmailButton";

export default function Intro() {
  return (
    <>
      <div className={styles.about}>
        <Text type="display" tag="h1">
          rafal_ziolek
        </Text>
        <div className={styles.intro}>
          <Text tag="p">
            I am a designer and photographer based in Poland — Currently working
            on design systems at Docplanner to help build exceptional experience
            for doctors.
          </Text>
          <div className={styles.links}>
            <StyledLink href="https://x.com/rafal_ziolek" label="x.com" />
            •
            <StyledLink href="https://github.com/rafalziolek" label="Github" />
            •
            <EmailButton label="rafal.ziolek@icloud.com" />
          </div>
        </div>
      </div>
    </>
  );
}

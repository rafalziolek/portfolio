"use client";
import styles from "./HeroSection.module.scss";
import { motion } from "framer-motion";
import Text from "../Text/text";
import CustomLink from "../custom-link/CustomLink";

import Grid from "../Grid/Grid";
import GridItem from "../Grid/GridItem";
import List from "@/components/List/List";
function HeroSection() {
  return (
    <>
      <header className={styles.header}>
        <Grid>
          <GridItem columnSpan={12}>
            <Text as="h1" type="display-heading" indent>
              I am a designer and photographer based in Poland — Currently
              working on design systems at{" "}
              <a href="http://docplanner.com/">Docplanner</a> to help build
              exceptional experience for doctors.{" "}
            </Text>
          </GridItem>
        </Grid>
      </header>
    </>
  );
}

export default HeroSection;

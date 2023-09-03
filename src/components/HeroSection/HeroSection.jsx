"use client";
import styles from "./HeroSection.module.scss";
import { motion } from "framer-motion";
import Text from "../Text/text";
import CustomLink from "../custom-link/CustomLink";
import PhotoShutter from "../PhotoShutter/PhotoShutter";
import Asterisks from "../asterisks/asterisks";
import GradientBar from "../GradientBar/gradientBar";
function HeroSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const variants = {
    hidden: {
      y: "-100px",
      opacity: 0,
    },

    show: {
      opacity: 1,
      y: "0px",
    },
  };
  return (
    <header className={styles.header}>
      <motion.div
        className={styles.stack}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={variants} style={{ zIndex: "1" }}>
          <Text
            className={styles.stack}
            as="h1"
            type="main-heading"
            style={{
              marginBlockEnd: "var(--space-l)",
              maxWidth: "40ch",
            }}
          >
            Product designer and photographer based in Poland. Currently
            building design systems at{" "}
            <CustomLink href="http://docplanner.com/">Docplanner</CustomLink> to
            help achieve quality and consistency at scale.
          </Text>
        </motion.div>
        <motion.div
          variants={variants}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: "var(--space-xl)",
            flexGrow: "1",
          }}
        >
          <div className={styles.stack} style={{ flexGrow: "1" }}>
            {/* Previously */}
            <HeaderList title="Previously">
              <li>
                <CustomLink href="https://invotech.co">INVO</CustomLink>
              </li>
              <li>
                <CustomLink href="https://absolvent.pl">Absolvent</CustomLink>
              </li>
              <li>
                <CustomLink href="https://semiflat.com">Semiflat</CustomLink>
              </li>
            </HeaderList>
            {/* Free time section */}
            <HeaderList title="In free time">
              <li>
                <Text as="span">Street photography</Text>
              </li>
              <li>
                <Text as="span">Cooking</Text>
              </li>
            </HeaderList>
            {/* Find me on */}
            <HeaderList title="Find me on">
              <li>
                <CustomLink href="https://www.linkedin.com/in/rafal-ziolek/">
                  LinkedIn
                </CustomLink>
              </li>
              <li>
                <CustomLink href="https://www.instagram.com/notactualphotographer/">
                  Instagram
                </CustomLink>
              </li>
              <li>
                <CustomLink href="https://twitter.com/rafal_ziolek/">
                  Twitter
                </CustomLink>
              </li>
            </HeaderList>
          </div>
          <PhotoShutter variants={variants} />
        </motion.div>
      </motion.div>
      <div className={styles.divider}>
        <Asterisks rows={3} />
        <GradientBar />
      </div>
    </header>
  );
}

function HeaderList({ children, title }) {
  return (
    <div className={styles["header-list-wrapper"]}>
      <Text className={styles["title"]} as="span">
        {title}
      </Text>
      <ul className={styles["header-list"]}>{children}</ul>
    </div>
  );
}

export default HeroSection;

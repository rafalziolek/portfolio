"use client";
import styles from "./HeroSection.module.scss";
import { motion } from "framer-motion";
import Text from "../Text/text";
import CustomLink from "../custom-link/CustomLink";
import PhotoShutter from "../PhotoShutter/PhotoShutter";
import Asterisks from "../asterisks/asterisks";
import GradientBar from "../GradientBar/gradientBar";
import LinkList from "@/components/LinkList/LinkList";
function HeroSection() {
  return (
    <header className={styles.header}>
      <div className={`${styles.stack}`}>
        <div style={{ zIndex: "1" }}>
          <Text
            className={styles.stack}
            as="h1"
            type="main-heading"
            style={{
              maxWidth: "40ch",
            }}
          >
            Product designer and photographer based in Poland. Currently
            building design systems at{" "}
            <CustomLink href="http://docplanner.com/">Docplanner</CustomLink> to
            help achieve quality and consistency at scale.
          </Text>
        </div>
        <div
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
            <LinkList title="Previously">
              <li>
                <CustomLink href="https://invotech.co">INVO</CustomLink>
              </li>
              <li>
                <CustomLink href="https://absolvent.pl">Absolvent</CustomLink>
              </li>
              <li>
                <CustomLink href="https://semiflat.com">Semiflat</CustomLink>
              </li>
            </LinkList>
            {/* Free time section */}
            <LinkList title="In free time">
              <li>
                <Text as="span">Street photography</Text>
              </li>
              <li>
                <Text as="span">Cooking</Text>
              </li>
            </LinkList>
            {/* Find me on */}
            <LinkList title="Find me on">
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
            </LinkList>
          </div>
        </div>
        <div>
          <Text as="h2" type="heading" color="secondary">
            Design projects{" "}
            <motion.span
              style={{ display: "inline-block" }}
              initial={{ y: "-1px" }}
              animate={{ y: "4px" }}
              transition={{
                type: "tween",
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1,
              }}
            >
              ↓
            </motion.span>
          </Text>
          <Text as="p" type="body" style={{ maxWidth: "40ch" }}>
            Some of my selected works. From projects for clients and companies
            to good and bad explorations{" "}
          </Text>
        </div>
      </div>
      <PhotoShutter />
    </header>
  );
}

export default HeroSection;

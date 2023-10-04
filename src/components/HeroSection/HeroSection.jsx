"use client";
import styles from "./HeroSection.module.scss";
import { motion } from "framer-motion";
import Text from "../Text/text";
import CustomLink from "../custom-link/CustomLink";
import PhotoShutter from "../PhotoShutter/PhotoShutter";
import Asterisks from "../asterisks/asterisks";
import GradientBar from "../GradientBar/gradientBar";
import List from "@/components/List/List";
function HeroSection() {
  return (
    <>
      <PhotoShutter />
      <motion.header
        className={styles.header}
        initial={{ y: "10px", opacity: 0, filter: "blur(10px)" }}
        animate={{ y: "0px", opacity: 1, filter: "blur(0px)" }}
        transition={{ delay: 0.84, duration: 1.5, type: "spring", bounce: 0.2 }}
      >
        <div className={`${styles.stack}`}>
          <div style={{ zIndex: "1" }}>
            <Text
              as="h1"
              type="main-heading"
              style={{
                maxWidth: "40ch",
              }}
            >
              Product designer and photographer based in Poland. Currently
              building design systems at{" "}
              <CustomLink href="http://docplanner.com/">Docplanner</CustomLink>{" "}
              to help achieve quality and consistency at scale.
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
              <List title="Previously">
                <li>
                  <CustomLink href="https://invotech.co">INVO</CustomLink>
                </li>
                <li>
                  <CustomLink href="https://absolvent.pl">Absolvent</CustomLink>
                </li>
                <li>
                  <CustomLink href="https://semiflat.com">Semiflat</CustomLink>
                </li>
              </List>
              {/* Free time section */}
              <List title="In free time">
                <li>
                  <Text as="span">Street photography</Text>
                </li>
                <li>
                  <Text as="span">Cooking</Text>
                </li>
              </List>
              {/* Find me on */}
              <List title="Find me on">
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
              </List>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}

export default HeroSection;

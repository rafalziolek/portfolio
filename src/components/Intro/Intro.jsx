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
        <Text type="body" tag="h1">
          I’m Rafał
          <Text
            type="superscript"
            tag="span"
            color="secondary"
            style={{ verticalAlign: "super" }}
          >
            *
          </Text>{" "}
          {/* <Text
            type="superscript"
            tag="span"
            color="secondary"
            // font="serif"
          >
            {" "}
            *or Rafa
          </Text>{" "} */}
          and I design things. Mostly software, but sometimes other stuff too.{" "}
          <br />
          <br />
          Currently, I work at{" "}
          <StyledLink
            href="https://www.docplanner.com"
            label="Docplanner"
            style={{
              display: "inline",
            }}
          />
          , where I design and develop tools that give designers and developers
          one less thing to worry about. <br />
          <br /> This site is a place to showcase the things I make. If you find
          something interesting here, cool. If not, that’s fine too ✌︎
        </Text>
      </div>
    </>
  );
}

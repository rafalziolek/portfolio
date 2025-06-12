"use client";
import { motion } from "motion/react";
import React from "react";
import styles from "./Footer.module.scss";
import Text from "@/components/Text/Text";
import Image from "next/image";
import clsx from "clsx";
import { CircleHelp } from "lucide-react";
import { Button } from "@/components/Button/Button";
import StyledLink from "@/components/StyledLink/StyledLink";
import NavigationItem from "@/components/Navigation/NavigationItem";
import { usePathname } from "next/navigation";
import List from "@/components/List/List";
export default function Footer({ className }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className={clsx(styles.footer, className)}>
      <Button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        ?
      </Button>
      {isOpen && (
        <div className={styles.footerDialog}>
          <Text tag="p" type="body">
            This website was built with Next.js and Motion, and the typeface
            used is Oracle.
          </Text>
          <List heading="Websites that I took inspiration from" type="small">
            <List.Item>
              <StyledLink
                // type="superscript"
                href="https://taliacotton.com/"
                label="taliacotton.com"
                inverted
              ></StyledLink>
            </List.Item>
            <List.Item>
              <StyledLink
                // type="superscript"
                href="https://www.jipark.org/"
                label="jipark.org"
                inverted
              ></StyledLink>
            </List.Item>
            <List.Item>
              <StyledLink
                // type="superscript"
                href="https://morebymore.com/"
                label="morebymore.com"
                inverted
              ></StyledLink>
            </List.Item>
            <List.Item>
              <StyledLink
                // type="superscript"
                href="https://www.yihui.work/"
                label="yihui.work"
                inverted
              ></StyledLink>
            </List.Item>
          </List>

          <Text tag="p" type="superscript">
            Special shout out to my cats &nbsp;
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
            for providing emotional support while I&nbsp;built this website.
          </Text>
          <Button
            type="subtle"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
}

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
export default function Footer({ className }) {
  return (
    <div className={clsx(styles.footer, className)}>
      <NavigationItem href="/colophon" label="Colophon" />
    </div>
  );
}

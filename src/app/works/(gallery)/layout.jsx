import Gallery from "@/components/layouts/Gallery/Gallery";
import React from "react";
import FadeOut from "@/components/FadeOut/FadeOut";
import styles from "./layout.module.scss";
import { Button } from "@/components/Button/Button";
import { ChevronLeft } from "lucide-react";
import Footer from "@/components/Footer/Footer";
export default function GalleryLayout({ children }) {
  return (
    <>
      {children}
      {/* <FadeOut /> */}
    </>
  );
}

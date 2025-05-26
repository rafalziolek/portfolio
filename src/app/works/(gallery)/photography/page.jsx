import Gallery from "@/components/layouts/Gallery/Gallery";
import Text from "@/components/Text/Text";
import React from "react";
import styles from "./page.module.scss";
import { CornerUpLeft } from "lucide-react";
import StyledLink from "@/components/StyledLink/StyledLink";
import { getImagesData } from "@/utils";
import { agata, kurs, modelTestCinta, NikolaCinta, toSort } from "./config";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";

export default async function PhotographyPage() {
  const photoItems = await getImagesData("public/photography");

  return (
    <>
      <div className={styles.container}>
        <ImageCarousel images={agata} />
        <ImageCarousel images={kurs} />
        <ImageCarousel images={modelTestCinta} />
        <ImageCarousel images={NikolaCinta} />
        <ImageCarousel images={toSort} />
      </div>
    </>
  );
}

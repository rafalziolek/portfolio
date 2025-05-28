import Gallery from "@/components/layouts/Gallery/Gallery";
import Text from "@/components/Text/Text";
import React from "react";
import styles from "./page.module.scss";
import { CornerUpLeft } from "lucide-react";
import StyledLink from "@/components/StyledLink/StyledLink";
import { getImagesData } from "@/utils";
import { agata, kurs, modelTestCinta, NikolaCinta, toSort } from "./config";
import ImageCarousel, {
  CarouselProvider,
} from "@/components/ImageCarousel/ImageCarousel";

export default async function PhotographyPage() {
  const photoItems = await getImagesData("public/photography");

  return (
    <>
      <div className={styles.container}>
        <CarouselProvider>
          <ImageCarousel
            images={modelTestCinta}
            id="modelTestCinta"
            title="Model Tests"
          />
          <ImageCarousel
            images={NikolaCinta}
            id="NikolaCinta"
            title="Model Tests"
          />
          <ImageCarousel
            images={agata}
            id="agata"
            title="Personal Photoshoot"
          />
          <ImageCarousel images={kurs} id="kurs" title="Kurs" />

          <ImageCarousel images={toSort} id="toSort" title="To Sort" />
        </CarouselProvider>
      </div>
    </>
  );
}

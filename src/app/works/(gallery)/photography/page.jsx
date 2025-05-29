import React from "react";
import styles from "./page.module.scss";
import { getImagesData } from "@/utils";
import { agata, kurs, modelTestCinta, NikolaCinta, toSort } from "./config";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import CarouselTextOverlay from "@/components/CarouselTextOverlay/CarouselTextOverlay";

const carouselConfig = [
  { images: modelTestCinta, id: "modelTestCinta", title: "Model Tests" },
  { images: NikolaCinta, id: "NikolaCinta", title: "Model Tests" },
  { images: agata, id: "agata", title: "Personal Photoshoot" },
  { images: kurs, id: "kurs", title: "Kurs" },
  { images: toSort, id: "toSort", title: "To Sort" },
];

export default async function PhotographyPage() {
  const photoItems = await getImagesData("public/photography");

  return (
    <>
      <div className={styles.container}>
        {carouselConfig.map((config) => (
          <ImageCarousel
            key={config.id}
            images={config.images}
            id={config.id}
            title={config.title}
          />
        ))}
      </div>
      <CarouselTextOverlay carousels={carouselConfig} />
    </>
  );
}

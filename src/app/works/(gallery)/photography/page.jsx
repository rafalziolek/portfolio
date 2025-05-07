import Gallery from "@/components/layouts/Gallery/Gallery";
import Text from "@/components/Text/Text";
import React from "react";
import styles from "./page.module.scss";
import { CornerUpLeft } from "lucide-react";
import StyledLink from "@/components/StyledLink/StyledLink";
import { getImagesData } from "@/utils";
import images from "./config";
export default async function PhotographyPage() {
  const photoItems = await getImagesData("public/photography");

  return (
    <>
      {" "}
      <div className={styles.gallery}>
        <Gallery images={images} />
      </div>
    </>
  );
}

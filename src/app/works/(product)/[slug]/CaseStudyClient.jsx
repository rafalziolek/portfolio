"use client";
import React, { useState, useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import Text from "@/components/Text/Text";
import styles from "./page.module.scss";
import { Button } from "@/components/Button/Button";
import ImageCarousel from "@/components/ImageCarousel/ImageCarousel";
import DescriptionPopover from "@/components/DescriptionPopover/DescriptionPopover";

export default function CaseStudyClient({
  frontmatter,
  images,
  company,
  year,
}) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [totalImages, setTotalImages] = useState(images.length);

  const carouselId = frontmatter.title?.toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    // Listen for custom events from the carousel
    const handleCarouselUpdate = (event) => {
      const { id, currentImage: current, totalImages: total } = event.detail;
      // Only update if this event is from our carousel
      if (id === carouselId) {
        setCurrentImage(current);
        setTotalImages(total);
      }
    };

    window.addEventListener("carouselUpdate", handleCarouselUpdate);
    return () =>
      window.removeEventListener("carouselUpdate", handleCarouselUpdate);
  }, [carouselId]);

  const handleDescriptionClick = () => {
    console.log("Description button clicked!");
    console.log("Setting isPopoverOpen to true");
    setIsPopoverOpen(true);
  };

  console.log("Render - isPopoverOpen:", isPopoverOpen);

  return (
    <>
      {images.length > 0 && (
        <div className={styles.carouselContainer}>
          <ImageCarousel
            images={images}
            id={carouselId}
            title={frontmatter.title}
          />
        </div>
      )}

      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Text tag="span" type="superscript-small" uppercase>
            Project information
          </Text>
          <Text tag="span" type="body">
            {frontmatter.abstract}
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-48)",
            justifyContent: "start",
            flex: "1 2 0",
          }}
        >
          <div className={styles.detailItem}>
            <Text
              tag="h4"
              type="superscript-small"
              uppercase
              className={styles.detailHeader}
            >
              Role
            </Text>
            <Text tag="span" type="body" className={styles.detailDescription}>
              Designer
            </Text>
          </div>
          <div className={styles.detailItem}>
            <Text
              tag="h4"
              type="superscript-small"
              uppercase
              className={styles.detailHeader}
            >
              Company
            </Text>
            <Text tag="span" type="body" className={styles.detailDescription}>
              {company}
            </Text>
          </div>
          <div className={styles.detailItem}>
            <Text
              tag="h4"
              type="superscript-small"
              uppercase
              className={styles.detailHeader}
            >
              Year
            </Text>
            <Text tag="span" type="body" className={styles.detailDescription}>
              {year}
            </Text>
          </div>
          <div className={styles.detailItem}>
            <Text
              tag="h4"
              type="superscript-small"
              uppercase
              className={styles.detailHeader}
            >
              Credits
            </Text>
            <Text tag="span" type="body">
              Josep Martins
            </Text>
            <Text tag="span" type="body">
              Juan Sancho
            </Text>
            <Text tag="span" type="body">
              Nikki Plyem
            </Text>
          </div>
        </div>
      </header>
      <div className={styles.bottomDescription}>
        {images.length > 0 && (
          <Text type="body" className={styles.imageCounter}>
            {currentImage + 1} of {totalImages}
          </Text>
        )}
      </div>

      <DescriptionPopover
        isOpen={isPopoverOpen}
        onClose={() => {
          console.log("Closing popover");
          setIsPopoverOpen(false);
        }}
        frontmatter={frontmatter}
      />
    </>
  );
}

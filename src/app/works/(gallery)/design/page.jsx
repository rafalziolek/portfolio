import Gallery from "@/components/layouts/Gallery/Gallery";
import Text from "@/components/Text/Text";
import React from "react";
import styles from "./page.module.scss";
import { Button } from "@/components/Button/Button";
import { CornerUpLeft } from "lucide-react";
import images from "./config";

export default async function DesignPage() {
  return (
    <>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Gallery images={images} />
      </React.Suspense>
    </>
  );
}

import Corner from "../Corner/Corner";
import styles from "./ProjectImage.module.scss";
import Image from "next/image";

function ProjectImage({ width, height, alt, src, size = "medium" }) {
  return (
    <div className={`${styles["img-wrapper"]} ${styles[size]}`}>
      <Image width={width} height={height} src={src} alt={alt} />
      {/* <div className={styles["corner-wrapper"]}>
        <Corner flip />
        <Corner />
      </div> */}
    </div>
  );
}

export default ProjectImage;

import Corner from "../Corner/Corner";
import Image from "next/image";

function ProjectImage({ width, height, alt, src, size = "medium" }) {
  return (
    <div className={`relative max-[640px]:col-span-12 ${size === "large" ? "col-span-12" : size === "medium" ? "col-span-6" : "col-span-4"}`}>
      <Image width={width} height={height} src={src} alt={alt} />
      {/* <div className={styles["corner-wrapper"]}>
        <Corner flip />
        <Corner />
      </div> */}
    </div>
  );
}

export default ProjectImage;

import Image from "next/image";
import styles from "./project.module.scss";
import Text from "../Text/text";
import CustomLink from "../custom-link/CustomLink";
import Link from "next/link";

function Project({
  title,
  projectName,
  children,
  size = "medium",
  desc,
  path,
  aspectRatio = "1/1",
}) {
  const PROJECT_PATH = `/projects/${projectName}`;

  return (
    <article
      className={`${styles.project} ${styles[size]}`}
      data-aspect-ratio={aspectRatio}
    >
      <figure>
        <div className={styles.grid}>{children}</div>
        <figcaption>
          <div>
            <Text as="h4" type="caption" color="secondary">
              {title}
            </Text>
            <Text type="caption">{desc}</Text>
          </div>
          <CustomLink path={path}>Read more</CustomLink>
        </figcaption>
      </figure>
    </article>
  );
}

export default Project;

function Corner({ flip, style }) {
  const styles = {
    transform: flip && "scaleX(-1)",
    position: "absolute",
    top: "0",
    left: flip && "0",
    right: "0",
    translate: "0 -100%",
    ...style,
  };
  return (
    <svg
      style={styles}
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 6C3.31371 6 6 3.31371 6 0V6H0Z"
        fill="black"
      />
    </svg>
  );
}

function ProjectImage({ width, height, alt, src, size = "medium" }) {
  return (
    <div className={`${styles["img-wrapper"]} ${styles[size]}`}>
      <Image width={width} height={height} src={src} alt={alt} />
      <div className={styles["corner-wrapper"]}>
        <Corner flip />
        <Corner />
      </div>
    </div>
  );
}

Project.Image = ProjectImage;

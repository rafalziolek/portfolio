import styles from "./Text.module.scss";
import clsx from "clsx";

const styleMap = {
  body: styles.body,
  "body-emphasis": styles.bodyEmphasis,
  "body-article": styles.bodyArticle,
  heading: styles.heading,
  caption: styles.caption,
  "caption-emphasis": styles.captionEmphasis,
  display: styles.display,
};

export default function Text({
  type = "body",
  tag = "span",
  className,
  children,
  ...rest
}) {
  const Component = tag;
  const textClass = styleMap[type];

  return (
    <Component className={clsx(textClass, className)} {...rest}>
      {children}
    </Component>
  );
}

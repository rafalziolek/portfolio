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
  color,
  children,
  font,
  uppercase,
  ...rest
}) {
  const Component = tag;
  const textClass = styleMap[type];

  return (
    <Component
      className={clsx(
        textClass,
        className,
        styles.text,
        color && styles[`text-${color}`],
        font && styles[`text-${font}`],
        uppercase && styles.uppercase
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

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
  superscript: styles.superscript,
};

export default function Text({
  type = "body",
  tag = "span",
  className,
  color,
  children,
  font,
  uppercase,
  overflow,
  nowrap,
  ...rest
}) {
  const Component = tag;
  const textClass = styleMap[type];

  return (
    <Component
      className={clsx(
        "text",
        textClass,
        className,
        styles.text,
        color && styles[`text-${color}`],
        font && styles[`text-${font}`],
        uppercase && styles.uppercase,
        overflow === "ellipsis" && styles["overflow-ellipsis"],
        nowrap && styles.nowrap
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

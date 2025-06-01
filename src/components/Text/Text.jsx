import styles from "./Text.module.scss";
import clsx from "clsx";
import { forwardRef } from "react";

const styleMap = {
  body: styles.body,
  "body-emphasis": styles.bodyEmphasis,
  "body-article": styles.bodyArticle,
  heading: styles.heading,
  caption: styles.caption,
  "caption-emphasis": styles.captionEmphasis,
  display: styles.display,
  superscript: styles.superscript,
  "superscript-small": styles["superscript-small"],
};

const Text = forwardRef(function Text(
  {
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
  },
  ref
) {
  const Component = tag;
  const textClass = styleMap[type];

  return (
    <Component
      ref={ref}
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
});

export default Text;

import React from "react";
import ShuffleText from "./shuffleText";
import { motion } from "framer-motion";
import styles from "./navItem.module.scss";

export default function NavItem({ text, href, isActive, onClick }) {
  const ref = React.useRef(null);
  const [width, setWidth] = React.useState(null);

  React.useLayoutEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    }
  }, []);

  return (
    <a
      href={href}
      ref={ref}
      className={styles.navLink}
      onClick={onClick}
      style={{ width: width ? `${width}px` : "auto" }}
    >
      {isActive && (
        <motion.span
          layoutId="active-nav-item"
          className={styles.activeIndicator}
        ></motion.span>
      )}
      <ShuffleText text={text} className={styles.shuffleText} />
    </a>
  );
}

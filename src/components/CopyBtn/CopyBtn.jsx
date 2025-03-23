import styles from "./CopyBtn.module.css";
import { AnimatePresence, motion, LayoutGroup } from "motion/react";
import React from "react";

export function CopyBtn({ children }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isCopied, setIsCopied] = React.useState(false);
  const underline = {
    hover: {
      height: "100%",
      width: "100%",
      top: "-2px",
      left: "-4px",
      padding: "2px 4px",
    },
  };

  const copyText = {
    initial: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const timeoutRef = React.useRef(null);
  const handleClick = async () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    await navigator.clipboard.writeText(children.props.value);
    setIsCopied(true);
    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <>
      <motion.button
        layout="position"
        className={styles.button}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {children}
        <motion.span
          style={{ width: "100%" }}
          className={styles.underline}
        />{" "}
        {(isHovered || isCopied) && (
          <motion.span className={styles.tooltip}>
            {isCopied ? "[Copied!]" : "[Click to copy]"}
          </motion.span>
        )}
      </motion.button>
    </>
  );
}

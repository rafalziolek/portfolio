"use client";
import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Tooltip.module.scss";

const TooltipContent = React.memo(
  ({ content, targetRef, isVisible, hasBeenShown, variant }) => {
    const tooltipRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const updatePosition = useCallback(() => {
      if (targetRef.current && tooltipRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current.getBoundingClientRect();
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        setPosition({
          x: targetRect.right + scrollX + 16,
          y:
            targetRect.top +
            scrollY -
            tooltipRect.height / 2 +
            targetRect.height / 2,
        });
      }
    }, [targetRef]);

    useLayoutEffect(() => {
      if (isVisible) {
        updatePosition();

        const resizeObserver = new ResizeObserver(updatePosition);

        if (targetRef.current) {
          resizeObserver.observe(targetRef.current);
        }
        if (tooltipRef.current) {
          resizeObserver.observe(tooltipRef.current);
        }

        let scrollTimeout;
        const handleScroll = () => {
          if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
          }
          scrollTimeout = window.requestAnimationFrame(updatePosition);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });

        return () => {
          resizeObserver.disconnect();
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", handleScroll);
          if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
          }
        };
      }
    }, [isVisible, updatePosition, targetRef]);

    return typeof window !== "undefined"
      ? createPortal(
          <AnimatePresence mode="wait">
            {isVisible && (
              <motion.div
                key={content}
                ref={tooltipRef}
                className={styles.tooltip}
                initial={{ opacity: 0, translateY: 4 }}
                animate={{
                  opacity: 0.5,
                  translateY: 0,
                  transition: { duration: 0.1 },
                }}
                exit={{
                  opacity: 0,
                  translateY: 4,
                  transition: { duration: 0.1 },
                }}
                style={{
                  position: "absolute",
                  left: position.x,
                  top: position.y,
                }}
              >
                {content}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )
      : null;
  }
);

TooltipContent.displayName = "TooltipContent";

export default function Tooltip({
  children,
  content,
  delay = 0,
  variant = "info", // "info" | "feedback"
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const targetRef = useRef(null);
  const timeoutRef = useRef(null);
  const resetTimeoutRef = useRef(null);
  const previousContentRef = useRef(content);

  const showTooltip = useCallback(() => {
    setIsVisible(true);
    setHasBeenShown(true);
  }, []);

  // Detect content changes to show feedback immediately
  useLayoutEffect(() => {
    if (
      variant === "feedback" &&
      previousContentRef.current !== content &&
      previousContentRef.current !== undefined
    ) {
      showTooltip();
    }
    previousContentRef.current = content;
  }, [content, variant, showTooltip]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const shouldDelay = delay > 0 && !hasBeenShown && variant === "info";

    if (shouldDelay) {
      timeoutRef.current = setTimeout(showTooltip, delay);
    } else {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }
    setIsVisible(false);

    // Reset hasBeenShown after 800ms
    resetTimeoutRef.current = setTimeout(() => {
      setHasBeenShown(false);
      resetTimeoutRef.current = null;
    }, 800);
  };

  useLayoutEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {React.cloneElement(children, {
        ref: targetRef,
        onMouseEnter: (e) => {
          handleMouseEnter();
          children.props.onMouseEnter?.(e);
        },
        onMouseLeave: (e) => {
          handleMouseLeave();
          children.props.onMouseLeave?.(e);
        },
      })}
      <TooltipContent
        content={content}
        targetRef={targetRef}
        isVisible={isVisible}
        hasBeenShown={hasBeenShown}
        variant={variant}
      />
    </>
  );
}

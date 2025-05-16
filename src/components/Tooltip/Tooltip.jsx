"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Text from "@/components/Text/Text";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Tooltip.module.scss";

const TooltipContent = React.memo(({ content, triggerRef, isVisible }) => {
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const updatePosition = useCallback(() => {
    if (triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      setPosition({
        x: triggerRect.right + scrollX + 16,
        y:
          triggerRect.top +
          scrollY -
          tooltipRect.height / 2 +
          triggerRect.height / 2,
      });
    }
  }, [triggerRef]);

  useEffect(() => {
    if (isVisible) {
      updatePosition();

      const resizeObserver = new ResizeObserver(updatePosition);

      if (triggerRef.current) {
        resizeObserver.observe(triggerRef.current);
      }
      if (tooltipRef.current) {
        resizeObserver.observe(tooltipRef.current);
      }

      let positionUpdateFrameId; // Better: shows it's an animation frame ID
      const handleViewportChange = () => {
        if (positionUpdateFrameId) {
          window.cancelAnimationFrame(positionUpdateFrameId);
        }
        positionUpdateFrameId = window.requestAnimationFrame(updatePosition);
      };

      window.addEventListener("scroll", handleViewportChange, {
        passive: true,
      });
      window.addEventListener("resize", handleViewportChange, {
        passive: true,
      });

      return () => {
        resizeObserver.disconnect();
        window.removeEventListener("scroll", handleViewportChange);
        window.removeEventListener("resize", handleViewportChange);
        if (positionUpdateFrameId) {
          window.cancelAnimationFrame(positionUpdateFrameId);
        }
      };
    }
  }, [isVisible, updatePosition, triggerRef]);

  return typeof document !== "undefined"
    ? createPortal(
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={content}
              ref={tooltipRef}
              className={styles.tooltip}
              initial={{ opacity: 0, translateY: 4 }}
              animate={{
                opacity: 1,
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
              <Text type="caption" font="serif">
                {content}
              </Text>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )
    : null;
});

TooltipContent.displayName = "TooltipContent";

export default function Tooltip({ children, content, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenShown, setHasBeenShown] = useState(false);
  const triggerRef = useRef(null);
  const delayTimeoutRef = useRef(null);
  const hasBeenShownResetTimeoutRef = useRef(null);

  const showTooltip = () => {
    setIsVisible(true);
    setHasBeenShown(true);
  };

  const handleMouseEnter = () => {
    const shouldDelay = delay > 0 && !hasBeenShown;

    if (shouldDelay) {
      delayTimeoutRef.current = setTimeout(showTooltip, delay);
    } else {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
    if (hasBeenShownResetTimeoutRef.current) {
      clearTimeout(hasBeenShownResetTimeoutRef.current);
    }
    setIsVisible(false);

    // Reset hasBeenShown after 3000ms
    hasBeenShownResetTimeoutRef.current = setTimeout(() => {
      setHasBeenShown(false);
      hasBeenShownResetTimeoutRef.current = null;
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
      if (hasBeenShownResetTimeoutRef.current) {
        clearTimeout(hasBeenShownResetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {React.cloneElement(children, {
        ref: triggerRef,
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
        triggerRef={triggerRef}
        isVisible={isVisible}
        hasBeenShown={hasBeenShown}
      />
    </>
  );
}

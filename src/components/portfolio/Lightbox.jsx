"use client";

import Icon from "@/components/Icon/Icon";
import { Button } from "@base-ui/react/button";
import { Dialog } from "@base-ui/react/dialog";
import { motion, useReducedMotion } from "framer-motion";
import { forwardRef, useRef, useState } from "react";

const buttonClass =
  "flex size-8 cursor-pointer items-center justify-center border bg-white/94 p-0 text-black backdrop-blur-[4.3px] transition-colors hover:bg-[#f3f3f3] focus-visible:z-1 focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[#0092e7]";

export default function Lightbox({
  children,
  className = "",
  ariaLabel,
  ariaLabelledBy,
  onClose,
  onPrevious,
  onNext,
  controls,
  closeOnOutsideClick = false,
}) {
  const reduceMotion = useReducedMotion();
  const popupRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const requestClose = () => {
    setIsClosing(true);
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      onPrevious();
    }

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      onNext();
    }
  };

  return (
    <Dialog.Root
      open
      modal={!isClosing}
      disablePointerDismissal
      onOpenChange={(open) => {
        if (!open) requestClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop
          className={`fixed inset-0 z-150 bg-white/70 backdrop-blur-[16px] ${isClosing ? "pointer-events-none" : ""}`}
          render={
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      duration: 0.24,
                      ease: [0.215, 0.61, 0.355, 1],
                    }
              }
            />
          }
        />
        <Dialog.Popup
          ref={popupRef}
          className={`fixed inset-0 z-151 outline-none ${isClosing ? "pointer-events-none" : ""} ${className}`}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          initialFocus={popupRef}
          onKeyDown={handleKeyDown}
          onPointerDown={(event) => {
            if (closeOnOutsideClick && event.target === event.currentTarget) {
              requestClose();
            }
          }}
        >
          {children}
          {!isClosing && (
            <LightboxControls
              {...controls}
              onPrevious={onPrevious}
              onNext={onNext}
            />
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function LightboxControls({
  className = "",
  borderClassName = "border-[var(--ui-border-color)]",
  onPrevious,
  onNext,
  previousLabel,
  nextLabel,
  closeLabel,
}) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <div className="flex">
        <IconButton
          className="-mr-px"
          borderClassName={borderClassName}
          icon="chevron-left"
          label={previousLabel}
          onClick={onPrevious}
        />
        <IconButton
          borderClassName={borderClassName}
          icon="chevron-right"
          label={nextLabel}
          onClick={onNext}
        />
      </div>
      <Dialog.Close
        render={
          <IconButton
            borderClassName={borderClassName}
            icon="close"
            label={closeLabel}
          />
        }
      />
    </div>
  );
}

export const IconButton = forwardRef(function IconButton(
  {
    icon,
    label,
    onClick,
    className = "",
    borderClassName = "border-[var(--ui-border-color)]",
    ...props
  },
  ref,
) {
  return (
    <Button
      ref={ref}
      className={`${buttonClass} ${borderClassName} ${className}`}
      type="button"
      onClick={onClick}
      aria-label={label}
      {...props}
    >
      <Icon name={icon} size={16} />
    </Button>
  );
});

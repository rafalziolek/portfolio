"use client";

import { homepageSocialLinks } from "@/data/homepage.mjs";
import { Tooltip } from "@base-ui/react/tooltip";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const socialLinksByLabel = Object.fromEntries(
  homepageSocialLinks.map((link) => [link.label, link]),
);

const linkClassName =
  "w-max text-[24px] leading-[110%] no-underline text-white hover:animate-[link-blink_500ms_steps(1,end)_infinite] motion-reduce:hover:animate-none motion-reduce:hover:bg-white motion-reduce:hover:text-black focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white";
const compactLinkClassName =
  "flex items-center justify-center rounded-[3px] bg-[#303030] px-[10px] py-[6px] text-[15px] leading-[1.33] text-white no-underline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function SocialNavLinks({
  visible = true,
  fadeTransition,
  variant = "inline",
  inDialog = false,
}) {
  const copyMessageTimeoutRef = useRef(null);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(
    () => () => {
      window.clearTimeout(copyMessageTimeoutRef.current);
    },
    [],
  );

  async function copyEmail() {
    const emailAddress = socialLinksByLabel.Email.href.replace(/^mailto:/, "");
    await navigator.clipboard.writeText(emailAddress);
    setEmailCopied(true);
    window.clearTimeout(copyMessageTimeoutRef.current);
    copyMessageTimeoutRef.current = window.setTimeout(() => {
      setEmailCopied(false);
    }, 2000);
  }

  if (variant === "compact") {
    return (
      <motion.footer
        className="fixed right-3 bottom-3 z-100 flex gap-[5px] font-[Arial] font-bold"
        data-compact-footer
        data-project-footer={inDialog ? "" : undefined}
        aria-label="Social links"
        aria-hidden={visible ? undefined : true}
        initial={false}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={fadeTransition ?? { duration: 0.2, ease: [0.645, 0.045, 0.355, 1] }}
      >
        <a
          className={compactLinkClassName}
          href={socialLinksByLabel["Are.na"].href}
          rel="noreferrer"
          target="_blank"
          tabIndex={visible ? undefined : -1}
        >
          Are.na
        </a>
        <a
          className={compactLinkClassName}
          href={socialLinksByLabel["x.com"].href}
          rel="noreferrer"
          target="_blank"
          tabIndex={visible ? undefined : -1}
        >
          x.com
        </a>
        <Tooltip.Root open={emailCopied}>
          <Tooltip.Trigger
            className={`cursor-pointer border-0 ${compactLinkClassName}`}
            closeOnClick={false}
            onClick={copyEmail}
            aria-label="Copy email address"
            tabIndex={visible ? undefined : -1}
          >
            Email
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner className="z-100" side="top" sideOffset={8}>
              <Tooltip.Popup className="whitespace-nowrap bg-black text-[16px] leading-6 text-[#737373]">
                Copied to clipboard
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
      </motion.footer>
    );
  }

  return (
    <motion.div
      className="flex h-[26px] shrink-0 items-center gap-1"
      aria-label="Social links"
      aria-hidden={visible ? undefined : true}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={fadeTransition ?? { duration: 0.2, ease: [0.645, 0.045, 0.355, 1] }}
    >
      <span className="flex items-center">
        <Tooltip.Root open={emailCopied}>
          <Tooltip.Trigger
            className={`cursor-pointer border-0 bg-transparent p-0 font-[Arial] font-normal ${linkClassName}`}
            closeOnClick={false}
            onClick={copyEmail}
            aria-label="Copy email address"
            tabIndex={visible ? undefined : -1}
          >
            Email
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Positioner className="z-100" side="right" sideOffset={16}>
              <Tooltip.Popup className="whitespace-nowrap bg-black text-[16px] leading-6 text-[#737373]">
                Copied to clipboard
              </Tooltip.Popup>
            </Tooltip.Positioner>
          </Tooltip.Portal>
        </Tooltip.Root>
        <span aria-hidden="true">,</span>
      </span>

      <span className="flex items-center">
        <a
          className={linkClassName}
          href={socialLinksByLabel["x.com"].href}
          rel="noreferrer"
          target="_blank"
          tabIndex={visible ? undefined : -1}
        >
          X
        </a>
        <span aria-hidden="true">,</span>
      </span>

      <a
        className={linkClassName}
        href={socialLinksByLabel["Are.na"].href}
        rel="noreferrer"
        target="_blank"
        tabIndex={visible ? undefined : -1}
      >
        Are.na
      </a>
    </motion.div>
  );
}

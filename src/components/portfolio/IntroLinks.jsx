"use client";

import { homepageSocialLinks } from "@/data/homepage.mjs";
import { Tooltip } from "@base-ui/react/tooltip";
import { useEffect, useRef, useState } from "react";

const socialLinks = Object.fromEntries(
  homepageSocialLinks.map((link) => [link.label, link]),
);

export default function IntroLinks() {
  const copyMessageTimeoutRef = useRef(null);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(
    () => () => {
      window.clearTimeout(copyMessageTimeoutRef.current);
    },
    [],
  );

  async function copyEmail() {
    const emailAddress = socialLinks.Email.href.replace(/^mailto:/, "");
    await navigator.clipboard.writeText(emailAddress);
    setEmailCopied(true);
    window.clearTimeout(copyMessageTimeoutRef.current);
    copyMessageTimeoutRef.current = window.setTimeout(() => {
      setEmailCopied(false);
    }, 2000);
  }

  return (
    <nav
      className="flex items-center gap-4 text-[16px] leading-6 tracking-normal text-white"
      aria-label="Contact and social links"
    >
      <Tooltip.Root open={emailCopied}>
        <Tooltip.Trigger
          className="cursor-pointer border-0 bg-transparent p-0 text-current underline decoration-from-font [text-underline-position:from-font] hover:animate-[link-blink_500ms_steps(1,end)_infinite] motion-reduce:hover:animate-none motion-reduce:hover:bg-white motion-reduce:hover:text-black focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
          closeOnClick={false}
          onClick={copyEmail}
          aria-label="Copy email address"
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

      <SocialLink link={socialLinks["x.com"]} />
      <SocialLink link={socialLinks.Instagram} />
      <SocialLink link={socialLinks["Are.na"]} iconOnly />
    </nav>
  );
}

function SocialLink({ link, iconOnly = false }) {
  return (
    <a
      className={`flex items-center text-current underline decoration-from-font [text-underline-position:from-font] hover:animate-[link-blink_500ms_steps(1,end)_infinite] motion-reduce:hover:animate-none motion-reduce:hover:bg-white motion-reduce:hover:text-black focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white ${iconOnly ? "h-[1lh] no-underline" : ""}`}
      href={link.href}
      aria-label={iconOnly ? link.label : undefined}
    >
      {iconOnly ? <ArenaMark /> : link.label}
    </a>
  );
}

function ArenaMark() {
  return (
    <span
      className="block h-[13.807px] w-[23.333px] bg-current [mask-image:url('/home/arena-mark.svg')] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
      aria-hidden="true"
    />
  );
}

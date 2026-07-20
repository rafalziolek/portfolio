"use client";

import MouseCoordinates from "./MouseCoordinates";
import { homepageSocialLinks } from "@/data/homepage.mjs";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { id: "projects", label: "Projects", href: "/" },
  { id: "bits", label: "Bits", href: "/work" },
  { id: "about", label: "Who?", href: "/about" },
];

export default function SiteChrome() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const active = navigationItems.find((item) => item.href === pathname)?.id;
  const activeIndex = navigationItems.findIndex((item) => item.id === active);

  if (!active) return null;

  return (
    <>
      <header className="fixed top-[15px] left-1/2 z-100 w-[570px] -translate-x-1/2 overflow-hidden border border-[#c4c4c4] bg-white/94 font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[14px] leading-[1.3] text-black shadow-[0_11px_0_-6px_rgba(0,0,0,0.05)] backdrop-blur-[20px] max-[620px]:top-[10px] max-[620px]:w-[calc(100%-20px)]">
        <Link className="block min-h-[63px] box-border border-b border-[#c4c4c4] px-4 pt-3 pb-4 text-inherit no-underline focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-[#0092e7] max-[620px]:min-h-0" href="/">
          Rafał is a software designer. Currently working at Docplanner. He works
          across design and engineering. Building websites, apps and design systems
        </Link>

        <nav className="relative flex h-10 items-stretch" aria-label="Main navigation">
          <motion.span
            className="pointer-events-none absolute inset-y-0 left-0 z-0 box-border w-1/3 p-[5px]"
            animate={{ x: `${activeIndex * 100}%` }}
            initial={false}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", bounce: 0, duration: 0.4 }
            }
            aria-hidden="true"
          >
            <span className="block size-full border border-[#c4c4c4] bg-[#f0f0f0]" />
          </motion.span>

          {navigationItems.map((item) => {
            const isActive = item.id === active;

            return (
              <Link
                className={`relative z-1 flex flex-1 items-center justify-center gap-[5px] px-3 py-2 text-inherit no-underline focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-[#0092e7] ${isActive ? "font-bold" : ""}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                key={item.id}
              >
                {isActive && (
                  <span
                    className={`size-[5px] rounded-full ${active === "about" ? "bg-[#ff6347]" : "bg-[#0092e7]"}`}
                    aria-hidden="true"
                  />
                )}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      <MouseCoordinates />

      <nav className="fixed right-8 bottom-6 z-100 flex items-center gap-3 whitespace-nowrap font-['Helvetica_Neue',Helvetica,Arial,sans-serif] text-[14px] text-black max-[620px]:right-4 max-[620px]:bottom-[18px]" aria-label="Social links">
        {homepageSocialLinks.map((link) => (
          <a className="text-inherit underline [text-underline-position:from-font] focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-[#0092e7]" href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}

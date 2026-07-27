"use client";

import MouseCoordinates from "./MouseCoordinates";
import { homepageSocialLinks } from "@/data/homepage.mjs";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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
      <style>{`
        @keyframes link-blink {
          0%, 49.999% {
            background-color: transparent;
            color: black;
          }
          50%, 100% {
            background-color: black;
            color: white;
          }
        }
      `}</style>
      <header className="fixed top-1 left-1/2 z-100 w-[37.5rem] -translate-x-1/2 overflow-hidden border border-[#b7b7b7] bg-white leading-[1.3] text-black shadow-[0_12px_0_-7px_rgba(0,0,0,0.05)] backdrop-blur-[4.3px] max-[620px]:w-[calc(100%-20px)]">
        <p className="block box-border border-b border-[#b7b7b7] px-4 py-3 text-inherit">
          Rafa is a software designer. Currently working at Docplanner. He works
          across design and engineering. Building websites, apps and design systems
        </p>

        <nav className="relative flex h-10 items-stretch" aria-label="Main navigation">
          <motion.span
            className="pointer-events-none absolute inset-y-0 left-0 z-0 box-border w-1/3 p-[5px]"
            animate={{ x: `${activeIndex * 100}%` }}
            initial={false}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: "spring", bounce: 0, duration: 0.3 }
            }
            aria-hidden="true"
          >
            <span className="block size-full bg-[#ededed]" />
          </motion.span>

          {navigationItems.map((item) => {
            const isActive = item.id === active;

            return (
              <Link
                className={`relative z-1 flex flex-1 items-center justify-center px-3 py-2 text-inherit no-underline focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-[#0092e7] ${isActive ? "font-bold" : ""}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                key={item.id}
              >
                <span className="relative">
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        className={`absolute top-1/2 right-full mr-[5px] size-[5px] -translate-y-1/2 rounded-full ${item.id === "about" ? "bg-[#ff6347]" : "bg-[#0092e7]"}`}
                        initial={reduceMotion ? false : { opacity: 0, x: 2 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 2 }}
                        transition={{ duration: reduceMotion ? 0 : 0.15, ease: "easeOut" }}
                        aria-hidden="true"
                      />
                    )}
                  </AnimatePresence>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </header>

      <MouseCoordinates />

      <nav className="fixed right-2 bottom-2 z-100 flex items-center gap-3 whitespace-nowrap text-black" aria-label="Social links">
        {homepageSocialLinks.map((link) => (
          <a className="font-normal text-black no-underline hover:animate-[link-blink_500ms_steps(1,end)_infinite] motion-reduce:hover:animate-none motion-reduce:hover:bg-black motion-reduce:hover:text-white focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-[#0092e7]" href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}

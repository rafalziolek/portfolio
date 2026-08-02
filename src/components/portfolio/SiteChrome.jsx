"use client";

import MouseCoordinates from "./MouseCoordinates";
import { homepageSocialLinks } from "@/data/homepage.mjs";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigationItems = [
  { id: "projects", label: "Projects", href: "/" },
  { id: "bits", label: "Bits", href: "/work" },
  { id: "about", label: "Who?", href: "/about" },
];

export default function SiteChrome() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [mobileChromeVisible, setMobileChromeVisible] = useState(true);
  const active = navigationItems.find((item) => item.href === pathname)?.id;
  const activeIndex = navigationItems.findIndex((item) => item.id === active);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 620px)");
    let previousY = window.scrollY;
    let frame;

    const updateVisibility = () => {
      if (!mobile.matches) {
        setMobileChromeVisible(true);
        previousY = window.scrollY;
        return;
      }

      const currentY = window.scrollY;
      const delta = currentY - previousY;

      if (currentY <= 8) {
        setMobileChromeVisible(true);
      } else if (Math.abs(delta) >= 4) {
        setMobileChromeVisible(delta < 0);
        previousY = currentY;
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateVisibility);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    mobile.addEventListener("change", updateVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      mobile.removeEventListener("change", updateVisibility);
    };
  }, []);

  if (!active) return null;

  const mobileTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring", bounce: 0, duration: 0.28 };

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
      <div className="relative z-100 mx-auto mt-1 w-[32.5rem] border border-[var(--ui-border-color)] bg-white leading-[1.3] text-black backdrop-blur-[4.3px] max-[620px]:hidden">
        <Description />
      </div>

      <header className="sticky top-[-1px] z-100 mx-auto -mt-px w-[32.5rem] overflow-hidden border border-[var(--ui-border-color)] bg-white leading-[1.3] text-black backdrop-blur-[4.3px] max-[620px]:hidden">
        <MainNavigation
          active={active}
          activeIndex={activeIndex}
          reduceMotion={reduceMotion}
        />
      </header>

      <motion.div
        className="fixed top-1 right-[10px] left-[10px] z-100 border border-[var(--ui-border-color)] bg-white leading-[1.3] text-black backdrop-blur-[4.3px] min-[621px]:hidden"
        initial={false}
        animate={{
          opacity: mobileChromeVisible ? 1 : 0,
          y: mobileChromeVisible ? 0 : "-120%",
        }}
        transition={mobileTransition}
      >
        <Description />
      </motion.div>

      <motion.div
        className="fixed right-[10px] bottom-1 left-[10px] z-100 overflow-hidden border border-[var(--ui-border-color)] bg-white leading-[1.3] text-black backdrop-blur-[4.3px] min-[621px]:hidden"
        initial={false}
        animate={{
          opacity: mobileChromeVisible ? 1 : 0,
          y: mobileChromeVisible ? 0 : "120%",
        }}
        transition={mobileTransition}
      >
        <MainNavigation
          active={active}
          activeIndex={activeIndex}
          reduceMotion={reduceMotion}
        />
      </motion.div>

      <MouseCoordinates />

      <nav className="fixed right-2 bottom-2 z-100 flex items-center gap-3 whitespace-nowrap text-black max-[620px]:hidden" aria-label="Social links">
        {homepageSocialLinks.map((link) => (
          <a className="font-normal text-black no-underline hover:animate-[link-blink_500ms_steps(1,end)_infinite] motion-reduce:hover:animate-none motion-reduce:hover:bg-black motion-reduce:hover:text-white focus-visible:outline-1 focus-visible:-outline-offset-3 focus-visible:outline-black" href={link.href} key={link.label}>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}

function Description({ className = "" }) {
  return (
    <p className={`block box-border px-4 py-3 text-inherit ${className}`}>
      Rafa is a software designer. Currently working at Docplanner. He works
      across design and engineering. Building websites, apps and design systems
    </p>
  );
}

function MainNavigation({ active, activeIndex, reduceMotion }) {
  return (
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
        <span className="block size-full rounded-[3px] bg-[#ededed]" />
      </motion.span>

      {navigationItems.map((item) => {
        const isActive = item.id === active;

        return (
          <Link
            className={`relative z-1 flex flex-1 items-center justify-center px-3 py-2 text-inherit no-underline focus-visible:outline-1 focus-visible:-outline-offset-3 focus-visible:outline-black ${isActive ? "font-bold" : ""}`}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            key={item.id}
          >
            <span className="relative">
              <AnimatePresence initial={false}>
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
  );
}

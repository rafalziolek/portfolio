"use client";

import {
  getScrollDistance,
  portfolioHeaderPaddingX,
  portfolioMenuItemStep,
  portfolioNavTop,
} from "@/helpers/portfolio-layout.mjs";
import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import SocialNavLinks from "./SocialNavLinks";

const navigationItems = [
  { id: "projects", label: "Works", href: "/" },
  { id: "bits", label: "Bits", href: "/work" },
];

const headerPaddingX = portfolioHeaderPaddingX;
const menuItemStep = portfolioMenuItemStep;
const navTop = portfolioNavTop;
const scrollFadeThreshold = 200;
const scrollRevealDelay = 500;
const menuProximity = 32;

const getScrollPosition = () => ({
  x: window.scrollX,
  y: window.scrollY,
});

function isPointerNearMenu(nav, clientX, clientY) {
  const rect = nav.getBoundingClientRect();

  return (
    clientX >= rect.left - menuProximity &&
    clientX <= rect.right + menuProximity &&
    clientY >= rect.top - menuProximity &&
    clientY <= rect.bottom + menuProximity
  );
}

export default function SiteChrome() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [menuIdle, setMenuIdle] = useState(true);
  const [menuEngaged, setMenuEngaged] = useState(false);
  const navRef = useRef(null);
  const scrollRevealTimeoutRef = useRef(null);
  const scrollAnchorRef = useRef({ x: 0, y: 0 });
  const hasPassedThresholdRef = useRef(false);
  const navigationLockRef = useRef(false);
  const active =
    navigationItems.find((item) => item.href === pathname)?.id ??
    (pathname === "/about" ? "about" : null);

  const menuActiveIndex = navigationItems.findIndex(
    (item) => item.id === active,
  );

  useEffect(() => {
    setMenuIdle(true);
    hasPassedThresholdRef.current = false;
    scrollAnchorRef.current = getScrollPosition();
    window.clearTimeout(scrollRevealTimeoutRef.current);
    navigationLockRef.current = true;

    const unlockTimer = window.setTimeout(() => {
      navigationLockRef.current = false;
      scrollAnchorRef.current = getScrollPosition();
    }, scrollRevealDelay);

    return () => {
      window.clearTimeout(unlockTimer);
    };
  }, [pathname]);

  useEffect(() => {
    scrollAnchorRef.current = getScrollPosition();

    if (reduceMotion) return;

    const handleScroll = () => {
      if (navigationLockRef.current) return;

      if (!hasPassedThresholdRef.current) {
        const distance = getScrollDistance(
          scrollAnchorRef.current,
          getScrollPosition(),
        );

        if (distance < scrollFadeThreshold) return;

        hasPassedThresholdRef.current = true;
      }

      setMenuIdle(false);
      window.clearTimeout(scrollRevealTimeoutRef.current);
      scrollRevealTimeoutRef.current = window.setTimeout(() => {
        hasPassedThresholdRef.current = false;
        scrollAnchorRef.current = getScrollPosition();
        setMenuIdle(true);
      }, scrollRevealDelay);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(scrollRevealTimeoutRef.current);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;

    const updateMenuEngagement = (event) => {
      const nav = navRef.current;

      if (!nav) return;

      setMenuEngaged(isPointerNearMenu(nav, event.clientX, event.clientY));
    };

    window.addEventListener("pointermove", updateMenuEngagement, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", updateMenuEngagement);
    };
  }, [reduceMotion]);

  if (!active) return null;

  const showMenuExtras = menuIdle || menuEngaged || reduceMotion;
  const showSlash = active !== "about" || showMenuExtras;

  const fadeTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: [0.645, 0.045, 0.355, 1] };

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 z-100 flex items-start gap-3 overflow-visible font-[Arial] font-bold text-white"
      data-site-chrome
      style={{
        top: navTop,
        marginTop: -menuItemStep,
        paddingTop: menuItemStep,
        paddingLeft: headerPaddingX,
        paddingRight: headerPaddingX,
      }}
      aria-label="Main navigation"
      onPointerEnter={() => setMenuEngaged(true)}
      onPointerLeave={(event) => {
        const nav = navRef.current;

        if (!nav) {
          setMenuEngaged(false);
          return;
        }

        setMenuEngaged(
          isPointerNearMenu(nav, event.clientX, event.clientY),
        );
      }}
    >
      <span className="flex h-[26px] items-center">
        <span
          className={`inline-flex size-[24px] rounded-full ${
            active === "about"
              ? "shadow-[0_0_0_1px_#000000,0_0_0_4px_#024DF4]"
              : ""
          }`}
        >
          <Link
            className="size-[24px] overflow-hidden rounded-full focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
            href="/about"
            aria-label="About"
            aria-current={active === "about" ? "page" : undefined}
          >
            <Image
              className="block size-full object-cover"
              src="/home/avatar.png"
              alt=""
              width={64}
              height={64}
              priority
            />
          </Link>
        </span>
      </span>

      <motion.span
        className="text-[21px] leading-[125%] text-[#5a5a5a]"
        initial={false}
        animate={{ opacity: showSlash ? 1 : 0 }}
        transition={fadeTransition}
        aria-hidden="true"
      >
        /
      </motion.span>

      <motion.div
        className="flex min-w-0 flex-1 flex-col gap-0 overflow-visible"
        initial={false}
        animate={{
          y: menuActiveIndex >= 0 ? menuActiveIndex * -menuItemStep : 0,
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.2, ease: [0.645, 0.045, 0.355, 1] }
        }
      >
        {navigationItems.map((item) => {
          const isActive = item.id === active;
          const showInactiveLink = isActive || showMenuExtras;
          const shouldAnimateOpacity = !isActive && !reduceMotion;

          return (
            <motion.div
              className="h-[27px] last:h-[26px]"
              initial={false}
              animate={{ opacity: showInactiveLink ? 1 : 0 }}
              transition={shouldAnimateOpacity ? fadeTransition : { duration: 0 }}
              key={item.id}
            >
              <Link
                className={`w-max text-[24px] leading-[110%] no-underline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white ${isActive ? "text-white" : "text-[#5a5a5a]"}`}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                tabIndex={showInactiveLink ? undefined : -1}
                aria-hidden={showInactiveLink ? undefined : true}
              >
                {item.label}
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      <SocialNavLinks
        visible={showMenuExtras}
        fadeTransition={fadeTransition}
      />
    </nav>
  );
}

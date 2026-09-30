"use client";

import {
  getScrollDistance,
  portfolioHeaderPaddingX,
  portfolioMenuItemStep,
  portfolioNavTop,
} from "@/helpers/portfolio-layout.mjs";
import { homepageSocialLinks } from "@/data/homepage.mjs";
import { useDialKit } from "dialkit";
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

const socialLinksByLabel = Object.fromEntries(
  homepageSocialLinks.map((link) => [link.label, link]),
);

const aboutNavigationItems = [
  { label: "Are.na", href: socialLinksByLabel["Are.na"].href, marked: true },
  { label: "Instagram", href: socialLinksByLabel.Instagram.href },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/rafal-ziolek/" },
  { label: "Twitter", href: socialLinksByLabel["x.com"].href },
  { label: "Email", href: socialLinksByLabel.Email.href },
];

const headerPaddingX = portfolioHeaderPaddingX;
const menuItemStep = portfolioMenuItemStep;
const navTop = portfolioNavTop;
const scrollFadeThreshold = 200;
const scrollRevealDelay = 500;
const menuProximity = 32;

const getScrollPosition = (event) =>
  event?.type === "portfolio:virtual-scroll"
    ? event.detail.position
    : { x: window.scrollX, y: window.scrollY };

function isPointerNearMenu(nav, clientX, clientY) {
  const rect = nav.getBoundingClientRect();

  return (
    clientX >= rect.left - menuProximity &&
    clientX <= rect.right + menuProximity &&
    clientY >= rect.top - menuProximity &&
    clientY <= rect.bottom + menuProximity
  );
}

const pillClassName =
  "flex h-[36px] items-center rounded-[99px] px-[14px] py-1 text-[24px] leading-[17px] tracking-[-0.48px] no-underline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white";

export function PillMenu({
  active,
  projectName,
  onWorksClick,
  inDialog = false,
  showMenuExtras = true,
  fadeTransition = { duration: 0.2, ease: [0.645, 0.045, 0.355, 1] },
}) {
  const worksLabel = projectName ? `Works / ${projectName}` : "Works";
  const showName = active === "about" || showMenuExtras;
  const showWorks = active === "projects" || Boolean(projectName) || showMenuExtras;
  const showBits = active === "bits" || showMenuExtras;

  return (
    <nav
      className="fixed left-0 top-0 z-100 flex items-center gap-[6px] p-4 font-[450]"
      data-site-chrome
      data-menu-style="Pills"
      data-project-menu={inDialog ? "" : undefined}
      aria-label="Main navigation"
    >
      <motion.div
        initial={false}
        animate={{ opacity: showName ? 1 : 0 }}
        transition={fadeTransition}
        aria-hidden={showName ? undefined : true}
      >
        <Link
          className={`${pillClassName} ${active === "about" ? "bg-white text-black" : "bg-[#1d1d1d] text-white"}`}
          href="/about"
          aria-current={active === "about" ? "page" : undefined}
          tabIndex={showName ? undefined : -1}
        >
          Rafał Ziółek
        </Link>
      </motion.div>

      {projectName ? (
        <motion.div
          initial={false}
          animate={{ opacity: showWorks ? 1 : 0 }}
          transition={fadeTransition}
        >
          <div
            className={`${pillClassName} gap-2 bg-white text-black`}
            aria-label={worksLabel}
          >
            <Link
              className="text-inherit no-underline"
              href="/"
              onClick={(event) => {
                if (!onWorksClick) return;

                event.preventDefault();
                onWorksClick();
              }}
            >
              Works
            </Link>
            <span aria-hidden="true">/</span>
            <span>{projectName}</span>
          </div>
        </motion.div>
      ) : (
        <>
          <motion.div
            initial={false}
            animate={{ opacity: showWorks ? 1 : 0 }}
            transition={fadeTransition}
            aria-hidden={showWorks ? undefined : true}
          >
            <Link
              className={`${pillClassName} ${active === "projects" ? "bg-white text-black" : "bg-[#1d1d1d] text-white"}`}
              href="/"
              aria-current={active === "projects" ? "page" : undefined}
              tabIndex={showWorks ? undefined : -1}
            >
              Works
            </Link>
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: showBits ? 1 : 0 }}
            transition={fadeTransition}
            aria-hidden={showBits ? undefined : true}
          >
            <Link
              className={`${pillClassName} ${active === "bits" ? "bg-white text-black" : "bg-[#1d1d1d] text-white"}`}
              href="/work"
              aria-current={active === "bits" ? "page" : undefined}
              tabIndex={showBits ? undefined : -1}
            >
              Bits
            </Link>
          </motion.div>
        </>
      )}
    </nav>
  );
}

const compactItemClassName =
  "flex items-start rounded-[1px] px-[8px] py-[5px] text-[16px] leading-[1.33] no-underline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white";
const compactActiveItemClassName = "bg-[#c8cac9] text-black";
const compactInactiveItemClassName = "bg-[#191919] text-[#c8cac9]";

function CompactStaggerItem({
  children,
  delayOffsetMs = 0,
  enabled = true,
  index,
  reduceMotion,
  staggerMs,
}) {
  const shouldStagger = useRef(enabled).current;
  const delayMs = useRef(delayOffsetMs + index * staggerMs).current;
  const [visible, setVisible] = useState(
    !shouldStagger || reduceMotion || delayMs === 0,
  );

  useEffect(() => {
    if (!shouldStagger || visible || reduceMotion || delayMs === 0) {
      setVisible(true);
      return undefined;
    }

    const revealTimeout = window.setTimeout(() => setVisible(true), delayMs);

    return () => window.clearTimeout(revealTimeout);
  }, [delayMs, reduceMotion, shouldStagger, visible]);

  return (
    <div style={{ visibility: visible ? "visible" : "hidden" }}>
      {children}
    </div>
  );
}

export function CompactMenu({
  active,
  listeningHistory = false,
  projectName,
  onWorksClick,
  inDialog = false,
  initialDelayMs = 80,
  revealInitialMenu = false,
  showMenuExtras = true,
  staggerMs = 80,
  fadeTransition = { duration: 0.2, ease: [0.645, 0.045, 0.355, 1] },
}) {
  const reduceMotion = useReducedMotion();
  const revealInitialItems = useRef(revealInitialMenu).current;
  const contextStartIndex = revealInitialMenu ? 4 : 0;
  const showWork = active === "projects" || Boolean(projectName) || showMenuExtras;
  const showBits = active === "bits" || showMenuExtras;
  const showAbout = active === "about" || showMenuExtras;

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-100 flex flex-col items-start gap-[5px] px-[12px] pt-[12px] pb-[16px] font-[450]"
        data-site-chrome
        data-menu-style="Compact"
        data-project-menu={inDialog ? "" : undefined}
        aria-label="Main navigation"
      >
        <CompactStaggerItem
          delayOffsetMs={initialDelayMs}
          enabled={revealInitialItems}
          index={0}
          reduceMotion={reduceMotion}
          staggerMs={staggerMs}
        >
          <Link
            className={`${compactItemClassName} ${compactActiveItemClassName}`}
            href="/about"
          >
            Rafal Ziolek
          </Link>
        </CompactStaggerItem>

        <div className="flex items-end gap-[5px]">
          <CompactStaggerItem
            delayOffsetMs={initialDelayMs}
            enabled={revealInitialItems}
            index={1}
            reduceMotion={reduceMotion}
            staggerMs={staggerMs}
          >
            <motion.div
              initial={false}
              animate={{ opacity: showWork ? 1 : 0 }}
              transition={fadeTransition}
              aria-hidden={showWork ? undefined : true}
            >
              <Link
                className={`${compactItemClassName} ${active === "projects" ? compactActiveItemClassName : compactInactiveItemClassName}`}
                href="/"
                aria-current={active === "projects" && !projectName ? "page" : undefined}
                tabIndex={showWork ? undefined : -1}
                onClick={(event) => {
                  if (!onWorksClick) return;

                  event.preventDefault();
                  onWorksClick();
                }}
              >
                Work
              </Link>
            </motion.div>
          </CompactStaggerItem>

          <CompactStaggerItem
            delayOffsetMs={initialDelayMs}
            enabled={revealInitialItems}
            index={2}
            reduceMotion={reduceMotion}
            staggerMs={staggerMs}
          >
            <motion.div
              initial={false}
              animate={{ opacity: showBits ? 1 : 0 }}
              transition={fadeTransition}
              aria-hidden={showBits ? undefined : true}
            >
              <Link
                className={`${compactItemClassName} ${active === "bits" ? compactActiveItemClassName : compactInactiveItemClassName}`}
                href="/work"
                aria-current={active === "bits" ? "page" : undefined}
                tabIndex={showBits ? undefined : -1}
              >
                Explorations
              </Link>
            </motion.div>
          </CompactStaggerItem>

          <CompactStaggerItem
            delayOffsetMs={initialDelayMs}
            enabled={revealInitialItems}
            index={3}
            reduceMotion={reduceMotion}
            staggerMs={staggerMs}
          >
            <motion.div
              initial={false}
              animate={{ opacity: showAbout ? 1 : 0 }}
              transition={fadeTransition}
              aria-hidden={showAbout ? undefined : true}
            >
              <Link
                className={`${compactItemClassName} ${active === "about" ? compactActiveItemClassName : compactInactiveItemClassName}`}
                href="/about"
                aria-current={active === "about" ? "page" : undefined}
                tabIndex={showAbout ? undefined : -1}
              >
                About
              </Link>
            </motion.div>
          </CompactStaggerItem>
        </div>

        {active === "about" && !listeningHistory && (
          <motion.div
            className="flex items-center gap-[5px]"
            initial={false}
            animate={{ opacity: showMenuExtras ? 1 : 0 }}
            transition={fadeTransition}
            aria-hidden={showMenuExtras ? undefined : true}
          >
            {aboutNavigationItems.map((item, index) => (
              <CompactStaggerItem
                delayOffsetMs={revealInitialItems ? initialDelayMs : 0}
                index={contextStartIndex + index}
                key={item.label}
                reduceMotion={reduceMotion}
                staggerMs={staggerMs}
              >
                <a
                  className={`${compactItemClassName} ${compactInactiveItemClassName}`}
                  href={item.href}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  tabIndex={showMenuExtras ? undefined : -1}
                >
                  {item.marked && <span aria-hidden="true">&nbsp;</span>}
                  {item.label}
                </a>
              </CompactStaggerItem>
            ))}
          </motion.div>
        )}

        {listeningHistory && (
          <div className="flex items-end">
            <CompactStaggerItem
              delayOffsetMs={revealInitialItems ? initialDelayMs : 0}
              index={contextStartIndex}
              reduceMotion={reduceMotion}
              staggerMs={staggerMs}
            >
              <span className={`${compactItemClassName} ${compactActiveItemClassName}`}>
                Listening history
              </span>
            </CompactStaggerItem>
          </div>
        )}

        {projectName && (
          <div className="flex items-end">
            <CompactStaggerItem
              index={contextStartIndex}
              reduceMotion={reduceMotion}
              staggerMs={staggerMs}
            >
              <span className={`${compactItemClassName} ${compactActiveItemClassName}`}>
                {projectName}
              </span>
            </CompactStaggerItem>
          </div>
        )}
      </nav>

      {!inDialog && !projectName && active !== "about" && (
        <SocialNavLinks
          variant="compact"
          visible={showMenuExtras}
          fadeTransition={fadeTransition}
        />
      )}
    </>
  );
}

export default function SiteChrome() {
  const pathname = usePathname();
  const params = useDialKit(
    "Site menu",
    {
      menuStyle: {
        type: "select",
        options: ["Pills", "Compact", "Vertical"],
        default: "Compact",
      },
    },
    { id: "site-menu", persist: true },
  );
  const reduceMotion = useReducedMotion();
  const [projectName, setProjectName] = useState(null);
  const [menuIdle, setMenuIdle] = useState(true);
  const [menuEngaged, setMenuEngaged] = useState(false);
  const navRef = useRef(null);
  const scrollRevealTimeoutRef = useRef(null);
  const scrollAnchorRef = useRef({ x: 0, y: 0 });
  const latestScrollPositionRef = useRef({ x: 0, y: 0 });
  const hasPassedThresholdRef = useRef(false);
  const navigationLockRef = useRef(false);
  const initialCompactRevealRef = useRef(true);
  const isListeningHistory = pathname === "/listening-history";
  const active =
    navigationItems.find((item) => item.href === pathname)?.id ??
    (pathname === "/about" || isListeningHistory ? "about" : null);

  const menuActiveIndex = navigationItems.findIndex(
    (item) => item.id === active,
  );

  useEffect(() => {
    initialCompactRevealRef.current = false;
  }, []);

  useEffect(() => {
    document.body.dataset.menuStyle = params.menuStyle;

    return () => {
      delete document.body.dataset.menuStyle;
    };
  }, [params.menuStyle]);

  useEffect(() => {
    setProjectName(document.body.dataset.projectName ?? null);

    const updateProjectName = (event) => {
      setProjectName(event.detail?.name ?? null);
    };

    window.addEventListener("portfolio:project-change", updateProjectName);

    return () => {
      window.removeEventListener("portfolio:project-change", updateProjectName);
    };
  }, []);

  useEffect(() => {
    setMenuIdle(true);
    hasPassedThresholdRef.current = false;
    scrollAnchorRef.current = getScrollPosition();
    latestScrollPositionRef.current = scrollAnchorRef.current;
    window.clearTimeout(scrollRevealTimeoutRef.current);
    navigationLockRef.current = true;

    const unlockTimer = window.setTimeout(() => {
      navigationLockRef.current = false;
      scrollAnchorRef.current = latestScrollPositionRef.current;
    }, scrollRevealDelay);

    return () => {
      window.clearTimeout(unlockTimer);
    };
  }, [pathname]);

  useEffect(() => {
    scrollAnchorRef.current = getScrollPosition();

    if (reduceMotion) return;

    const handleScroll = (event) => {
      const currentPosition = getScrollPosition(event);
      latestScrollPositionRef.current = currentPosition;

      if (navigationLockRef.current) {
        scrollAnchorRef.current = currentPosition;
        return;
      }

      if (!hasPassedThresholdRef.current) {
        const distance = getScrollDistance(
          scrollAnchorRef.current,
          currentPosition,
        );

        if (distance < scrollFadeThreshold) return;

        hasPassedThresholdRef.current = true;
      }

      setMenuIdle(false);
      window.clearTimeout(scrollRevealTimeoutRef.current);
      scrollRevealTimeoutRef.current = window.setTimeout(() => {
        hasPassedThresholdRef.current = false;
        scrollAnchorRef.current = latestScrollPositionRef.current;
        setMenuIdle(true);
      }, scrollRevealDelay);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("portfolio:virtual-scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("portfolio:virtual-scroll", handleScroll);
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

  if (params.menuStyle === "Pills") {
    return (
      <PillMenu
        active={active}
        projectName={projectName}
        showMenuExtras={showMenuExtras}
        fadeTransition={fadeTransition}
      />
    );
  }

  if (params.menuStyle === "Compact") {
    return (
      <CompactMenu
        active={active}
        listeningHistory={isListeningHistory}
        projectName={projectName}
        revealInitialMenu={initialCompactRevealRef.current}
        showMenuExtras={showMenuExtras}
        fadeTransition={fadeTransition}
      />
    );
  }

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 z-100 flex items-start gap-3 overflow-visible font-[450] text-white"
      data-site-chrome
      data-menu-style="Vertical"
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

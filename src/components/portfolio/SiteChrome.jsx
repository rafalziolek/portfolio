"use client";

import {
  getScrollDistance,
  portfolioHeaderPaddingX,
  portfolioMenuItemStep,
  portfolioNavTop,
} from "@/helpers/portfolio-layout.mjs";
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
      className="fixed left-0 top-0 z-100 flex items-center gap-[6px] p-4 font-[Arial] font-normal"
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
  "flex items-center justify-center rounded-[3px] px-[10px] py-[5px] text-[15px] leading-[1.33] no-underline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white";

export function CompactMenu({
  active,
  projectName,
  onWorksClick,
  inDialog = false,
  showMenuExtras = true,
  fadeTransition = { duration: 0.2, ease: [0.645, 0.045, 0.355, 1] },
}) {
  const workLabel = projectName ? `Work / ${projectName}` : "Work";
  const showWork = active === "projects" || Boolean(projectName) || showMenuExtras;
  const showBits = active === "bits" || showMenuExtras;
  const showAbout = active === "about" || showMenuExtras;

  return (
    <>
      <nav
        className="fixed left-0 top-0 z-100 flex flex-col items-start gap-[5px] p-3 font-[Arial] font-bold"
        data-site-chrome
        data-menu-style="Compact"
        data-project-menu={inDialog ? "" : undefined}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-center rounded-[3px] bg-[#303030] px-[10px] py-[5px] text-[15px] leading-[1.33] text-white">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <span>Rafal Ziolek</span>
            <span aria-hidden="true">/</span>
            <span>Designer at Netflix</span>
          </span>
        </div>

        <div className="flex items-center gap-[5px]">
          {projectName ? (
            <div
              className={`${compactItemClassName} gap-1 bg-white text-black`}
              aria-label={workLabel}
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
                Work
              </Link>
              <span aria-hidden="true">/</span>
              <span>{projectName}</span>
            </div>
          ) : (
            <>
              <motion.div
                initial={false}
                animate={{ opacity: showWork ? 1 : 0 }}
                transition={fadeTransition}
                aria-hidden={showWork ? undefined : true}
              >
                <Link
                  className={`${compactItemClassName} ${active === "projects" ? "bg-white text-black" : "bg-[#303030] text-white"}`}
                  href="/"
                  aria-current={active === "projects" ? "page" : undefined}
                  tabIndex={showWork ? undefined : -1}
                >
                  Work
                </Link>
              </motion.div>
              <motion.div
                initial={false}
                animate={{ opacity: showBits ? 1 : 0 }}
                transition={fadeTransition}
                aria-hidden={showBits ? undefined : true}
              >
                <Link
                  className={`${compactItemClassName} ${active === "bits" ? "bg-white text-black" : "bg-[#303030] text-white"}`}
                  href="/work"
                  aria-current={active === "bits" ? "page" : undefined}
                  tabIndex={showBits ? undefined : -1}
                >
                  Bits
                </Link>
              </motion.div>
              <motion.div
                initial={false}
                animate={{ opacity: showAbout ? 1 : 0 }}
                transition={fadeTransition}
                aria-hidden={showAbout ? undefined : true}
              >
                <Link
                  className={`${compactItemClassName} ${active === "about" ? "bg-white text-black" : "bg-[#303030] text-white"}`}
                  href="/about"
                  aria-current={active === "about" ? "page" : undefined}
                  tabIndex={showAbout ? undefined : -1}
                >
                  About
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </nav>

      <SocialNavLinks
        variant="compact"
        visible={showMenuExtras}
        fadeTransition={fadeTransition}
        inDialog={inDialog}
      />
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
  const hasPassedThresholdRef = useRef(false);
  const navigationLockRef = useRef(false);
  const active =
    navigationItems.find((item) => item.href === pathname)?.id ??
    (pathname === "/about" ? "about" : null);

  const menuActiveIndex = navigationItems.findIndex(
    (item) => item.id === active,
  );

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
        projectName={projectName}
        showMenuExtras={showMenuExtras}
        fadeTransition={fadeTransition}
      />
    );
  }

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 z-100 flex items-start gap-3 overflow-visible font-[Arial] font-normal text-white"
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

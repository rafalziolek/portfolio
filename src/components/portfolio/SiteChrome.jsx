"use client";

import { arc, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

const navigationItems = [
  { id: "projects", label: "Works", href: "/" },
  { id: "bits", label: "Bits", href: "/work" },
];

const avatarIndicatorX = 10.5;

function getWrapTransition(path) {
  return {
    duration: 0.1,
    ease: [0.215, 0.61, 0.355, 1],
    path,
  };
}

export default function SiteChrome() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const navigationRef = useRef(null);
  const navigationItemRefs = useRef({});
  const avatarRef = useRef(null);
  const previousActiveRef = useRef(null);
  const lastMenuXRef = useRef(null);
  const transitionSequenceRef = useRef(0);
  const [indicatorX, setIndicatorX] = useState(null);
  const [wrapAnimation, setWrapAnimation] = useState(null);
  const active =
    navigationItems.find((item) => item.href === pathname)?.id ??
    (pathname === "/about" ? "about" : null);
  const indicatorPath = useMemo(
    () =>
      arc({
        strength: 0.3,
        direction: active === "bits" ? "ccw" : "cw",
      }),
    [active],
  );
  const clockwiseWrapPath = useMemo(
    () => arc({ strength: 0.3, direction: "cw" }),
    [],
  );
  const counterClockwiseWrapPath = useMemo(
    () => arc({ strength: 0.3, direction: "ccw" }),
    [],
  );

  useLayoutEffect(() => {
    const navigation = navigationRef.current;
    const avatar = avatarRef.current;
    const previousActive = previousActiveRef.current;
    const animationId = ++transitionSequenceRef.current;

    if (!active || !navigation || !avatar) {
      setWrapAnimation(null);
      previousActiveRef.current = active;
      return;
    }

    const navigationBounds = navigation.getBoundingClientRect();
    const avatarBounds = avatar.getBoundingClientRect();
    const menuEdgeX = -navigationBounds.left - 6;
    const avatarEdgeX =
      document.documentElement.clientWidth - avatarBounds.left + 1;
    let nextIndicatorX = lastMenuXRef.current;

    if (active !== "about") {
      const activeItem = navigationItemRefs.current[active];

      if (!activeItem) {
        setWrapAnimation(null);
        previousActiveRef.current = active;
        return;
      }

      const activeItemBounds = activeItem.getBoundingClientRect();
      nextIndicatorX =
        activeItemBounds.left -
        navigationBounds.left +
        activeItemBounds.width / 2 -
        2.5;
      lastMenuXRef.current = nextIndicatorX;
      setIndicatorX(nextIndicatorX);
    }

    if (
      !reduceMotion &&
      active === "about" &&
      previousActive &&
      previousActive !== "about" &&
      nextIndicatorX !== null
    ) {
      setWrapAnimation({
        id: animationId,
        phase: "menu-exit",
        menuX: nextIndicatorX,
        menuEdgeX,
        avatarEdgeX,
      });
    } else if (
      !reduceMotion &&
      active !== "about" &&
      previousActive === "about"
    ) {
      setWrapAnimation({
        id: animationId,
        phase: "avatar-exit",
        menuX: nextIndicatorX,
        menuEdgeX,
        avatarEdgeX,
      });
    } else {
      setWrapAnimation(null);
    }

    previousActiveRef.current = active;
  }, [active, reduceMotion]);

  function advanceWrapAnimation(animationId) {
    setWrapAnimation((current) => {
      if (!current || current.id !== animationId) return current;
      if (current.phase === "menu-exit") {
        return { ...current, phase: "avatar-enter" };
      }
      if (current.phase === "avatar-exit") {
        return { ...current, phase: "menu-enter" };
      }
      return null;
    });
  }

  if (!active) return null;

  return (
    <>
      <nav
        ref={navigationRef}
        className="fixed top-4 left-4 z-100 flex items-center gap-1 leading-[1.3]"
        aria-label="Main navigation"
      >
        {navigationItems.map((item) => {
          const isActive = item.id === active;

          return (
            <Link
              className={`relative flex h-[26px] items-center justify-center rounded-[2px] bg-[#2a2a2a] px-2 text-[16px] leading-[15px] tracking-[-0.005em] no-underline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white ${isActive ? "text-white" : "text-[#a2a2a2]"}`}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              key={item.id}
              ref={(node) => {
                navigationItemRefs.current[item.id] = node;
              }}
            >
              {item.label}
            </Link>
          );
        })}

        {indicatorX !== null && active !== "about" && !wrapAnimation && (
          <ActiveIndicator
            key="menu"
            initial={false}
            animate={{ x: indicatorX, y: 0 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.2,
                    ease: [0.215, 0.61, 0.355, 1],
                    path: indicatorPath,
                  }
            }
          />
        )}
        {wrapAnimation?.phase === "menu-exit" && (
          <ActiveIndicator
            key={`menu-exit-${wrapAnimation.id}`}
            initial={{ x: wrapAnimation.menuX, y: 0 }}
            animate={{ x: wrapAnimation.menuEdgeX, y: 0 }}
            transition={getWrapTransition(clockwiseWrapPath)}
            onAnimationComplete={() =>
              advanceWrapAnimation(wrapAnimation.id)
            }
          />
        )}
        {wrapAnimation?.phase === "menu-enter" && (
          <ActiveIndicator
            key={`menu-enter-${wrapAnimation.id}`}
            initial={{ x: wrapAnimation.menuEdgeX, y: 0 }}
            animate={{ x: wrapAnimation.menuX, y: 0 }}
            transition={getWrapTransition(counterClockwiseWrapPath)}
            onAnimationComplete={() =>
              advanceWrapAnimation(wrapAnimation.id)
            }
          />
        )}
      </nav>

      <div ref={avatarRef} className="fixed top-4 right-4 z-100 size-[26px]">
        <Link
          className="relative block size-full overflow-hidden rounded-[1px] bg-black focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white"
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
        {active === "about" && !wrapAnimation && (
          <ActiveIndicator
            key="avatar"
            initial={false}
            animate={{ x: avatarIndicatorX, y: 0 }}
            transition={{ duration: 0 }}
          />
        )}
        {wrapAnimation?.phase === "avatar-enter" && (
          <ActiveIndicator
            key={`avatar-enter-${wrapAnimation.id}`}
            initial={{ x: wrapAnimation.avatarEdgeX, y: 0 }}
            animate={{ x: avatarIndicatorX, y: 0 }}
            transition={getWrapTransition(clockwiseWrapPath)}
            onAnimationComplete={() =>
              advanceWrapAnimation(wrapAnimation.id)
            }
          />
        )}
        {wrapAnimation?.phase === "avatar-exit" && (
          <ActiveIndicator
            key={`avatar-exit-${wrapAnimation.id}`}
            initial={{ x: avatarIndicatorX, y: 0 }}
            animate={{ x: wrapAnimation.avatarEdgeX, y: 0 }}
            transition={getWrapTransition(counterClockwiseWrapPath)}
            onAnimationComplete={() =>
              advanceWrapAnimation(wrapAnimation.id)
            }
          />
        )}
      </div>

    </>
  );
}

function ActiveIndicator({
  animate,
  initial,
  transition,
  onAnimationComplete,
}) {
  return (
    <motion.span
      className="pointer-events-none absolute top-[35px] left-0 size-[5px] rounded-full bg-[#e90801] will-change-transform"
      initial={initial}
      animate={animate}
      transition={transition}
      onAnimationComplete={onAnimationComplete}
      aria-hidden="true"
    />
  );
}

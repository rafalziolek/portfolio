"use client";
import React from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import ProjectCard from "./ProjectCard";

// Mobile detection will be handled in useEffect to avoid hydration issues

const projects = [
  {
    id: "docplanner-ia",
    imagePath: "/projects/docplanner-ia/ia-preview-01.png",
    backgroundColor: "#f5f5f5",
    imageWidth: 3200,
    imageHeight: 2400,
    alt: "Docplanner Information Architecture preview",
  },
  {
    id: "multitood",
    imagePath: "/projects/multitood/1.png",
    backgroundColor: "rgba(250,250,250,0.98)",
    imageWidth: 2880,
    imageHeight: 2046,
    alt: "Multitood dashboard interface",
  },
  {
    id: "runchise",
    imagePath: "/projects/runchise/image.png",
    backgroundColor: "rgba(250,250,250,0.98)",
    imageWidth: 2524,
    imageHeight: 2966,
    alt: "Runchise mobile app interface",
  },
  {
    id: "watson-design-system",
    imagePath: "/projects/watson/image.png",
    backgroundColor: "rgba(250,250,250,0.98)",
    imageWidth: 2800,
    imageHeight: 2048,
    alt: "Watson Design System overview",
  },
  {
    id: "nikola-chmiel",
    imagePath: "/projects/nikola/project-small.png",
    backgroundColor: "rgba(250,250,250,0.98)",
    imageWidth: 2800,
    imageHeight: 2048,
    alt: "Nikola project preview",
  },
];

// Runtime-calculated widths and positions based on container height
function calculateWidthsForHeight(containerHeightPx: number) {
  const gap = 8; // 2 * gap-2 = 8px
  const widths = projects.map((p) => {
    const aspect = p.imageWidth / p.imageHeight;
    return Math.round(containerHeightPx * aspect);
  });

  const positions = widths.reduce((acc, width, index) => {
    const prevPosition = index === 0 ? 0 : acc[index - 1];
    const prevWidth = index === 0 ? 0 : widths[index - 1];
    acc[index] = prevPosition + prevWidth + (index > 0 ? gap : 0);
    return acc;
  }, [] as number[]);

  const total = positions[positions.length - 1] + widths[widths.length - 1];
  return { widths, positions, total };
}

export default function ProjectList() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [cardWidths, setCardWidths] = React.useState<number[] | null>(null);
  const [positions, setPositions] = React.useState<number[] | null>(null);
  const [totalWidth, setTotalWidth] = React.useState<number>(0);

  const { scrollX, scrollY } = useScroll();
  const scrollAxis = React.useRef<"x" | "y" | null>(null);
  const translateX = useMotionValue(0);
  const capturedY = React.useRef(0);
  const carouselRef = React.useRef<HTMLDivElement>(null);

  // Handle client-side initialization to avoid hydration issues
  React.useEffect(() => {
    setIsClient(true);
    setIsMobile(window.innerWidth < 768);

    // Set initial translation to 0 - positioning handled by paddingLeft
    translateX.set(0);

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [translateX]);

  // Horizontal scroll handler
  useMotionValueEvent(scrollX, "change", (x) => {
    if (!scrollAxis.current) {
      document.body.style.overflowY = "hidden";
      scrollAxis.current = "x";
    }
    if (scrollAxis.current === "x") {
      scroll(x);
    }
  });

  // Vertical scroll handler
  useMotionValueEvent(scrollY, "change", (y) => {
    if (!scrollAxis.current) {
      document.body.style.overflowX = "hidden";
      scrollAxis.current = "y";
    }
    if (scrollAxis.current === "y") {
      scroll(y);
    }
  });

  function scroll(position: number) {
    if (capturedY.current === position) return;

    if (translateX.isAnimating()) {
      translateX.stop();
    } else {
      // Simple negative translation - scroll down moves list left
      translateX.jump(-position);
    }
    capturedY.current = position;
  }

  // Save scroll position before page unload
  React.useEffect(() => {
    if (!isClient) return;

    const handleBeforeUnload = () => {
      localStorage.setItem("scrollY", String(window.scrollY));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isClient]);

  // Calculate dimensions and extend page height
  React.useEffect(() => {
    if (!isClient) return;

    window.history.scrollRestoration = "manual";
    document.documentElement.scrollTo(0, 0);

    function calc() {
      if (!carouselRef.current) return;

      // Measure the actual container height so any h-[..] value works
      const containerEl = carouselRef.current;
      const measuredHeight = containerEl.clientHeight;
      const containerHeightPx =
        measuredHeight > 0
          ? measuredHeight
          : Math.round(parseFloat(getComputedStyle(containerEl).height));

      const { widths, positions, total } =
        calculateWidthsForHeight(containerHeightPx);
      setCardWidths(widths);
      setPositions(positions);
      setTotalWidth(total);

      // Compute how far we must translate to center the last card
      const lastCenterWithinContainer =
        positions[positions.length - 1] + widths[widths.length - 1] / 2;

      const containerLeftPx = containerEl.getBoundingClientRect().left;
      const viewportCenterPx = window.innerWidth / 2;
      const maxScrollDistance =
        containerLeftPx + lastCenterWithinContainer - viewportCenterPx;

      document.body.style.height = `calc(100vh + ${Math.max(
        0,
        Math.round(maxScrollDistance)
      )}px)`;
    }

    calc();

    if (!isMobile) {
      window.addEventListener("resize", calc);
      return () => window.removeEventListener("resize", calc);
    }
  }, [isClient, isMobile]);

  // Don't render until client has hydrated to prevent hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <motion.div
      ref={carouselRef}
      className="flex gap-2 h-[50vh] fixed top-1/2 -translate-y-1/2 overflow-hidden pointer-events-auto left-[90vw]"
      style={{
        x: translateX,
        width: `${totalWidth + window.innerWidth}px`,
      }}
    >
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          href={`/${project.id}`}
          imagePath={project.imagePath}
          backgroundColor={project.backgroundColor}
          imageWidth={project.imageWidth}
          imageHeight={project.imageHeight}
          alt={project.alt}
        />
      ))}
    </motion.div>
  );
}

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
    imageWidth: 600,
    imageHeight: 600,
    alt: "Docplanner Information Architecture preview",
  },
  {
    id: "multitood",
    imagePath: "/projects/multitood/1.png",
    backgroundColor: "rgba(250,250,250,0.98)",
    imageWidth: 768,
    imageHeight: 500,
    alt: "Multitood dashboard interface",
  },
  {
    id: "runchise",
    imagePath: "/projects/runchise/runchise-01.png",
    backgroundColor: "rgba(250,250,250,0.98)",
    imageWidth: 600,
    imageHeight: 545,
    alt: "Runchise mobile app interface",
  },
  {
    id: "watson",
    imagePath: "/projects/watson/image.png",
    backgroundColor: "rgba(250,250,250,0.98)",
    imageWidth: 600,
    imageHeight: 545,
    alt: "Watson Design System overview",
  },
  {
    id: "nikola",
    imagePath: "/projects/nikola/image.png",
    backgroundColor: "rgba(250,250,250,0.98)",
    imageWidth: 600,
    imageHeight: 600,
    alt: "Nikola project preview",
  },
];

// Helper function to calculate project width
function calculateProjectWidth(
  imageWidth: number,
  imageHeight: number
): number {
  const aspectRatio = imageWidth / imageHeight;
  const containerHeight = 700;
  return Math.min(imageWidth, containerHeight * aspectRatio);
}

// Calculate project widths and cumulative positions
const projectWidths = projects.map((project) =>
  calculateProjectWidth(project.imageWidth, project.imageHeight)
);

const projectPositions = projectWidths.reduce((acc, width, index) => {
  const gap = 8; // 2 * gap-2 = 8px
  const prevPosition = index === 0 ? 0 : acc[index - 1];
  const prevWidth = index === 0 ? 0 : projectWidths[index - 1];
  acc[index] = prevPosition + prevWidth + (index > 0 ? gap : 0);
  return acc;
}, [] as number[]);

const totalWidth =
  projectPositions[projectPositions.length - 1] +
  projectWidths[projectWidths.length - 1];

export default function ProjectList() {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);

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

      // Calculate max scroll distance to center the last project
      const lastProjectPosition = projectPositions[projectPositions.length - 1];
      const lastProjectWidth = projectWidths[projectWidths.length - 1];
      // To center the last project: move it from 90vw to 50vw (40vw difference)
      const viewportOffset = window.innerWidth * 0.4; // 40vw in pixels
      const maxScrollDistance =
        lastProjectPosition + lastProjectWidth / 2 + viewportOffset;

      document.body.style.height = `calc(100vh + ${maxScrollDistance}px)`;
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
    <div className="fixed inset-0 pointer-events-none z-10">
      <div className="absolute top-1/2 -translate-y-1/2 w-full h-[700px] overflow-hidden pointer-events-auto">
        <motion.div
          ref={carouselRef}
          className="flex gap-2 h-full"
          style={{
            x: translateX,
            width: `${totalWidth + window.innerWidth}px`,
            paddingLeft: "90vw",
          }}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              imagePath={project.imagePath}
              backgroundColor={project.backgroundColor}
              imageWidth={project.imageWidth}
              imageHeight={project.imageHeight}
              alt={project.alt}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

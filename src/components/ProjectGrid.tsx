"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    id: "docplanner-ia",
    imagePath: "/projects/docplanner-ia/ia-preview-01.png",
    alt: "Docplanner Information Architecture preview",
  },
  {
    id: "multitood",
    imagePath: "/projects/multitood/1.png",
    alt: "Multitood dashboard interface",
  },
  {
    id: "runchise",
    imagePath: "/projects/runchise/image.png",
    alt: "Runchise mobile app interface",
  },
  {
    id: "watson-design-system",
    imagePath: "/projects/watson/image.png",
    alt: "Watson Design System overview",
  },
  {
    id: "nikola-chmiel",
    imagePath: "/projects/nikola/project-small.png",
    alt: "Nikola project preview",
  },
];

interface ProjectGridProps {
  className?: string;
}

export default function ProjectGrid({ className = "" }: ProjectGridProps) {
  return (
    <div className={`w-full  pb-10 bg-black z-10 ${className}`}>
      <div className="flex flex-col  gap-4 items-start justify-center w-full">
        {/* Create rows of 3 projects */}
        {Array.from(
          { length: Math.ceil(projects.length / 3) },
          (_, rowIndex) => (
            <div
              key={rowIndex}
              className="flex gap-4 items-start justify-center w-full"
            >
              {projects
                .slice(rowIndex * 3, (rowIndex + 1) * 3)
                .map((project, index) => (
                  <div
                    key={project.id}
                    className="flex-1 min-w-0 cursor-pointer"
                  >
                    <Link href={`/${project.id}`} className="block">
                      <div className="relative aspect-[632/500] bg-center bg-cover bg-no-repeat shadow-[0_1px_0_0_rgba(0,0,0,0.05)]">
                        <Image
                          src={project.imagePath}
                          alt={project.alt}
                          fill
                          className="object-cover"
                          sizes="33vw"
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              {/* Fill empty slots if needed */}
              {Array.from(
                {
                  length:
                    3 - projects.slice(rowIndex * 3, (rowIndex + 1) * 3).length,
                },
                (_, emptyIndex) => (
                  <div key={`empty-${emptyIndex}`} className="flex-1 min-w-0" />
                )
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}

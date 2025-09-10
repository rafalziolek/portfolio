"use client";

import React from "react";
import AboutSection from "@/components/AboutSection";
import ProjectGrid from "@/components/ProjectGrid";
import TopNav from "@/components/TopNav";

export default function Home() {
  return (
    <div className="bg-black">
      <TopNav />

      {/* Main content that scrolls over the footer */}
      <div className="flex flex-col items-center justify-start gap-6 min-h-screen relative z-10 bg-black">
        {/* About Section - Centered */}

        <AboutSection />
        <ProjectGrid />

        {/* Project Grid - Full width below */}
      </div>

      {/* Fixed Footer behind content */}
    </div>
  );
}

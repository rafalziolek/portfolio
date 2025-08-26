"use client";

import React from "react";
import AboutSection from "@/components/AboutSection";
import ProjectGrid from "@/components/ProjectGrid";
import TopNav from "@/components/TopNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-black relative">
      <TopNav />

      <div className="flex flex-col items-center justify-start pt-[117px] gap-6">
        {/* About Section - Centered */}
        <AboutSection />

        {/* Project Grid - Full width below */}
        <ProjectGrid />
      </div>
    </div>
  );
}

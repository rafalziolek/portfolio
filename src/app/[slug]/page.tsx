"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Text from "@/components/Text";
import Link from "next/link";

export default function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();
  const [slug, setSlug] = React.useState<string>("");

  React.useEffect(() => {
    params.then(({ slug }) => setSlug(slug));
  }, [params]);

  const projectTitle = slug.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-black text-white">
      {/* CSS Grid Layout - Responsive */}
      <div className="grid grid-cols-[1fr_min(600px,90vw)_1fr] gap-0 min-h-screen ]">
        {/* Left sidebar */}

        {/* Main content area */}
        <main className="pt-20 pb-24 px-4 col-start-2 col-span-1">
          {/* Header Section */}
          {/* <Text
            variant="lead"
            font="sans"
            isUppercase
            className="text-center mb-8"
          >
            {projectTitle}
          </Text> */}
          {/* Description Section */}
          <div className="mb-6">
            <Text variant="paragraph" font="sans">
              I've worked on {projectTitle} to create beautiful and functional
              user experiences. This case study showcases the design process and
              final outcomes.
            </Text>
          </div>
          {/* Image Sections */}
          {/* Image 1 - Constrained to content area */}
          <Image
            src={`/projects/${slug}/image.png`}
            alt={`${projectTitle} preview 1`}
            className="object-contain w-full"
            width={660}
            height={700}
          />

          {/* Caption for first image */}
          <Text variant="heading-sm" font="mono" color="rgba(255,255,255,0.5)">
            Project interface and user experience design.
          </Text>
        </main>

        {/* Right sidebar */}
      </div>

      {/* Full-width image sections */}
      {/* <Image
        src={`/projects/${slug}/${slug}-01.png`}
        alt={`${projectTitle} desktop interface`}
        fill
        className="object-cover"
        sizes="100vw"
      /> */}

      {/* Add some bottom spacing */}
      <div className="h-24"></div>

      {/* Bottom Navigation */}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  href?: string;
  imagePath: string;
  backgroundColor: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
}

export default function ProjectCard({
  href,
  imagePath,
  backgroundColor,
  imageWidth,
  imageHeight,
  alt,
}: ProjectCardProps) {
  return (
    <Link
      href={href ?? "#"}
      className="h-full overflow-hidden relative shrink-0 flex items-center justify-center"
      style={{
        backgroundColor,
        aspectRatio: `${imageWidth} / ${imageHeight}`,
      }}
    >
      <Image
        src={imagePath}
        alt={alt}
        fill
        className="object-contain"
        // sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 40vw"
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyKKKY9VVFVVSkn//2Q=="
      />
    </Link>
  );
}

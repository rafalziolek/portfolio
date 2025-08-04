import Image from "next/image";

interface ProjectCardProps {
  imagePath: string;
  backgroundColor: string;
  imageWidth: number;
  imageHeight: number;
  alt: string;
}

export default function ProjectCard({
  imagePath,
  backgroundColor,
  imageWidth,
  imageHeight,
  alt,
}: ProjectCardProps) {
  return (
    <div
      className="h-full overflow-hidden relative shrink-0 flex items-center justify-center
                 w-[85vw] min-w-[300px] max-w-[600px]
                 sm:w-[60vw] sm:max-w-[500px]
                 lg:w-[40vw] lg:max-w-[600px]"
      style={{ backgroundColor }}
    >
      <Image
        src={imagePath}
        alt={alt}
        width={imageWidth}
        height={imageHeight}
        className="w-full h-full object-contain sm:object-cover"
        sizes="(max-width: 640px) 85vw, (max-width: 1024px) 60vw, 40vw"
        priority={false} // Set to true for above-the-fold images
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGBkbHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyKKKY9VVFVVSkn//2Q=="
      />
    </div>
  );
}

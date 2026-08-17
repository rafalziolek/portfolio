import Icon from "@/components/Icon/Icon";
import Image from "next/image";

export default function ProjectPreview({
  project,
  onOpen,
  priority = false,
}) {
  return (
    <article className="w-full">
      <button
        className="group relative block w-full cursor-pointer bg-black p-0 text-left text-[#d5d5d5] shadow-[0_0_0_1px_transparent] outline-none hover:shadow-[0_0_0_1px_#333] focus-visible:shadow-[0_0_0_1px_#333]"
        type="button"
        onClick={onOpen}
        aria-label={project.label}
      >
        <span className="block px-5 pt-5 pb-4">
          <span className="relative block aspect-[573/680] w-full overflow-hidden bg-[#f7f7f7]">
            <Image
              className={`block size-full ${project.previewFit === "contain" ? "object-contain" : "object-cover"}`}
              src={project.image}
              alt={project.alt}
              width={project.width}
              height={project.height}
              sizes="(max-width: 682px) calc(100vw - 72px), 610px"
              priority={priority}
            />
          </span>
        </span>

        <span className="flex h-[34px] items-start gap-3 overflow-hidden px-5 pb-4 text-[12.5px] leading-[14px]">
          <span className="flex min-w-0 flex-1 items-center gap-[6px] whitespace-nowrap">
            <span className="truncate">{project.name}</span>
            <span className="truncate opacity-50">{project.subtitle}</span>
          </span>

          <span className="relative size-[18px] shrink-0 overflow-hidden rounded-[4px] group-hover:hidden group-focus-visible:hidden">
            <Image
              className="block size-full object-cover"
              src={project.logo}
              alt=""
              width={18}
              height={18}
            />
          </span>
          <span className="hidden h-[18px] w-[18px] shrink-0 items-center justify-center opacity-50 group-hover:flex group-focus-visible:flex">
            <Icon name="chevron-right" size={13} />
          </span>
        </span>
      </button>
    </article>
  );
}

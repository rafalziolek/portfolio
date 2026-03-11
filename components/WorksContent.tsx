import Image from 'next/image';
import { PROJECTS } from '@/lib/data';

export default function WorksContent() {
  return (
    <div className="h-full w-full overflow-y-auto px-2 pt-2 pb-24">
      <div className="mx-auto">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="relative w-full overflow-hidden rounded-[8px]"
              style={{ aspectRatio: '339 / 225' }}
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                className="object-cover"
              />

              {project.id === 'ninja-app-3' && (
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="size-6 rounded-[6px] bg-[#56986a]" />
                  <span className="text-[14px] tracking-[-0.02em] text-black">Docplanner App</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

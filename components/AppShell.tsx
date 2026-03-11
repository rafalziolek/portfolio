import Image from 'next/image';
import TabBar from './TabBar';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-[#f1f1f1] dark:bg-black">
      <main className="h-full w-full overflow-hidden">{children}</main>

      <div className="fixed right-4 bottom-4 left-4 z-50 flex items-center justify-between">
        <div className="flex size-[52px] items-center justify-center rounded-full bg-[rgba(227,227,227,0.8)] p-1 backdrop-blur-[5px]">
          <div className="relative size-[42px] overflow-hidden rounded-full">
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/3/36/Prayers_for_paris.jpg"
              alt="Prayers for Paris album cover"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <TabBar />

        <button
          type="button"
          className="flex size-[52px] items-center justify-center rounded-full bg-[rgba(227,227,227,0.8)] text-[18px] text-black backdrop-blur-[5px]"
        >
          􀅍
        </button>
      </div>
    </div>
  );
}

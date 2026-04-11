'use client';

export default function BottomToolbar() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between px-6 py-5">
      {/* Left group: grid/list toggle + filters */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="flex size-[54px] items-center justify-center rounded-full bg-[rgba(227,227,227,0.9)] backdrop-blur-[10px] dark:bg-[rgba(40,40,40,0.9)]"
        >
          <span className="text-xl text-black dark:text-white">􀏟</span>
          <span className="text-xl text-black/50 dark:text-white/50">􀏞</span>
        </button>
        <button
          type="button"
          className="flex size-[54px] items-center justify-center rounded-full bg-[rgba(227,227,227,0.9)] backdrop-blur-[10px] dark:bg-[rgba(40,40,40,0.9)]"
        >
          <span className="text-xl text-black dark:text-white">􁙁</span>
        </button>
      </div>

      {/* Right: help */}
      <button
        type="button"
        className="flex size-[54px] items-center justify-center rounded-full bg-[rgba(227,227,227,0.9)] backdrop-blur-[10px] dark:bg-[rgba(40,40,40,0.9)]"
      >
        <span className="text-xl text-black dark:text-white">􀅍</span>
      </button>
    </div>
  );
}

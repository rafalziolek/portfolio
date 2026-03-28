import TabBar from './TabBar';
import CdDisc from './CdDisc';

interface AppShellProps {
  children: React.ReactNode;
  spinning?: boolean;
}

export default function AppShell({ children, spinning = false }: AppShellProps) {
  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-[#f1f1f1] dark:bg-black">
      <main className="h-full w-full overflow-hidden">{children}</main>

      <div className="fixed right-4 bottom-4 left-4 z-50 flex items-center justify-between">
        <div
          className="flex size-[52px] items-center justify-center rounded-full bg-[rgba(227,227,227,0.8)] p-1 backdrop-blur-[5px] dark:bg-[rgba(38,38,38,0.78)]"
          style={{
            maskImage: 'radial-gradient(circle, transparent 18%, black 19%)',
            WebkitMaskImage: 'radial-gradient(circle, transparent 18%, black 19%)',
          }}
        >
          <CdDisc
            src="https://upload.wikimedia.org/wikipedia/en/3/36/Prayers_for_paris.jpg"
            alt="Prayers for Paris album cover"
            size={42}
            spinning={true}
          />
        </div>

        <TabBar />

        <button
          type="button"
          className="flex size-[52px] items-center justify-center rounded-full bg-[rgba(227,227,227,0.8)] text-[18px] text-black backdrop-blur-[5px] dark:bg-[rgba(38,38,38,0.78)] dark:text-white"
        >
          􀅍
        </button>
      </div>
    </div>
  );
}

import TopNav from './TopNav';
import BottomToolbar from './BottomToolbar';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-[var(--background)]">
      <TopNav />
      <main className="h-full w-full overflow-hidden">{children}</main>
      <BottomToolbar />
    </div>
  );
}

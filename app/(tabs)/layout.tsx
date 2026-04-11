import AppShell from '@/components/AppShell';
import WorksContent from '@/components/WorksContent';

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell>
      <WorksContent />
      {children}
    </AppShell>
  );
}

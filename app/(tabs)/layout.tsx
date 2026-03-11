import AppShell from '@/components/AppShell';

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AppShell>{children}</AppShell>;
}

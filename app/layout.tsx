import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const texGyreHeros = localFont({
  src: '../assets/texgyreheroscn-bold.otf',
  variable: '--font-gyre-heros',
  weight: '700',
});

export const metadata: Metadata = {
  title: 'Rafal Ziolek',
  description: 'Rafal Ziolek - Full Stack Developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${texGyreHeros.variable} antialiased`}>{children}</body>
    </html>
  );
}

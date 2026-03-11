import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { EffectsProvider } from '@/context/EffectsContext';
import { Agentation } from 'agentation';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const texGyreHeros = localFont({
  src: [
    {
      path: '../assets/texgyreheroscn-regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/texgyreheroscn-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-gyre-heros',
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
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/mtj8ilt.css" />
      </head>
      <body className={`font-normal antialiased`}>
        <EffectsProvider>{children}</EffectsProvider>
      </body>
      {process.env.NODE_ENV === 'development' && <Agentation />}
    </html>
  );
}

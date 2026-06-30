import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Rafal J. Ziolek — Software Designer",
  description:
    "Software designer creating product interfaces, apps, websites, and design systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}

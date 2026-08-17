import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import SiteChrome from "@/components/portfolio/SiteChrome";

export const metadata = {
  title: "Rafal J. Ziolek — Software Designer",
  description:
    "Software designer creating product interfaces, apps, websites, and design systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="portfolio-font">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-white text-[16px] antialiased">
        <SiteChrome />
        {children}
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}

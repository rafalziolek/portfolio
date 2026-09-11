import "@/app/globals.css";
import "dialkit/styles.css";
import { Analytics } from "@vercel/analytics/react";
import { DialRoot } from "dialkit";
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
        {process.env.NODE_ENV !== "production" && <DialRoot position="bottom-right" theme="dark" />}
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}

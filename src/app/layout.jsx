import "@/app/globals.scss";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Rafał Ziółek — Product Designer & Photographer",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body style={{ fontFamily: "var(--font-geist-sans)" }}>
        <div style={{ padding: "var(--space-24)" }}>
          {children}

          <Analytics />
        </div>
      </body>
    </html>
  );
}

import "@/app/globals.scss";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { Analytics } from "@vercel/analytics/react";
import { OverlayProvider } from "@/contexts/OverlayContext";
import styles from "./layout.module.scss";
import Footer from "@/components/Footer/Footer";
import { ProjectProvider } from "@/contexts/ProjectContext";

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
        <div className={styles.page}>
          <ProjectProvider>
            <OverlayProvider>{children}</OverlayProvider>
          </ProjectProvider>
          <Footer />
          <Analytics />
        </div>
      </body>
    </html>
  );
}

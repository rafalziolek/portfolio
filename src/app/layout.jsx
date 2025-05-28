import "@/app/globals.scss";
import { Shippori_Mincho_B1 } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/react";
import styles from "./layout.module.scss";
import Intro from "@/components/Intro/Intro";
import { ProjectProvider } from "@/contexts/ProjectContext";
import ProjectThumbnail from "@/components/ProjectThumbnail/ProjectThumbnail";
import Footer from "@/components/Footer/Footer";
import Text from "@/components/Text/Text";
import ProjectCarousel from "@/components/ProjectThumbnail/ProjectCarousel";
import Navigation from "@/components/Navigation/Navigation";

export const metadata = {
  title: "Rafał Ziółek — Product Designer & Photographer",
  description: "",
};

export default function RootLayout({ children }) {
  const currentDate = new Date()
    .toLocaleString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(" at ", ", ");
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={styles.rootLayout}>
        {/* <h1 className={styles.title}>Rafał Ziółek</h1> */}
        <Navigation />
        <div className={styles.homeLayout}>
          {/* <div className={styles.content}> */}
          <ProjectProvider>
            {children}
            {/* <ProjectThumbnail /> */}
          </ProjectProvider>
          <Footer />
          {/* </div> */}
        </div>

        <Analytics />
      </body>
    </html>
  );
}

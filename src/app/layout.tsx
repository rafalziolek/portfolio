import "@/app/globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";

export const metadata = {
  title: "Rafał Ziółek — Product Designer & Photographer",
  description: "",
};

const bdoGrotesk = localFont({
  src: [
    {
      path: "./fonts/BDOGrotesk-VF.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-bdo-grotesk",
  display: "swap",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={bdoGrotesk.variable}>
        <div className="h-[300vh]">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}

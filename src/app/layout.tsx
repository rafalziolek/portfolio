import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Rafał Ziółek — Product Designer & Photographer",
  description: "",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        {" "}
        <div className="{inter.className}">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  );
}

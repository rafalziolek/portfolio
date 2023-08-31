import "./globals.scss";
import MainNav from "@/components/main-nav/MainNav";
import Footer from "./footer";
import localFont from "next/font/local";

export const metadata = {
  title: "Rafał Ziółek * Digital Product Designer",
  description: "",
};

const neueMontreal = localFont({
  src: [
    {
      path: "../../fonts/PPNeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/PPNeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={neueMontreal.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <div style={{ maxWidth: "1920px", margin: "0 auto" }}>
          <MainNav></MainNav>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

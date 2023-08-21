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
      path: "../fonts/PPNeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PPNeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});

const NAV_ITEMS = [
  {
    label: "Bio",
    href: "/Bio",
    id: Math.random(),
  },
  {
    label: "Work",
    href: "/Work",
    id: Math.random(),
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={neueMontreal.className}>
      <body>
        <MainNav navItems={NAV_ITEMS} />
        {children}
        <Footer />
      </body>
    </html>
  );
}

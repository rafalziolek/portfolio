import "@/app/globals.scss";
import Footer from "@/app/footer";
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
        {children}
        <Footer />
      </body>
    </html>
  );
}

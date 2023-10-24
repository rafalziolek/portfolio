import "@/app/globals.scss";
import Footer from "@/components/footer/footer";
import localFont from "next/font/local";

export const metadata = {
  title: "Rafał Ziółek * Digital Product Designer",
  description: "",
};

const Suisse = localFont({
  src: [
    {
      path: "../fonts/SuisseIntl-Book.ttf",
      weight: "400",
      style: "normal",
    },
    // {
    //   path: "../../fonts/PPNeueMontreal-Medium.woff2",
    //   weight: "500",
    //   style: "normal",
    // },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={Suisse.className}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <div>
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

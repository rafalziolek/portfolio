import "@/app/globals.scss";
import Footer from "@/components/footer/footer";
import localFont from "next/font/local";

export const metadata = {
  title: "Rafał Ziółek * Digital Product Designer",
  description: "",
};

const NeueMontreal = localFont({
  src: [
    {
      path: "./fonts/PPNeueMontreal-Medium.woff",
      weight: "500",
      style: "medium",
    },
  ],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={NeueMontreal.className}>
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

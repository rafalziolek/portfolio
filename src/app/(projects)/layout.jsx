import Link from "next/link";
import Text from "@/components/Text/text";
import localFont from "next/font/local";
import "../globals.scss";
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

function ProjectLayout({ children }) {
  return (
    <html lang="en" className={neueMontreal.className}>
      <body>
        <div style={{ maxWidth: "1920px", margin: "0 auto" }}>
          <div
            style={{
              marginBlock: "var(--space-xs)",
              marginInline: "var(--space-s)",
            }}
          >
            <Link href="/" aria-label="Go Back">
              <Text
                as="span"
                style={{
                  padding: "var(--space-s)",
                  marginLeft: "calc(-1 * var(--space-s))",
                }}
              >
                ←
              </Text>
            </Link>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}

export default ProjectLayout;

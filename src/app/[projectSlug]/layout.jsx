import Link from "next/link";
import Text from "@/components/Text/text";
// import localFont from "next/font/local";
// import "../globals.scss";

function ProjectLayout({ children }) {
  return (
    <>
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
    </>
  );
}

export default ProjectLayout;

import Link from "next/link";
import Text from "@/components/Text/text";

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
      <div style={{ margin: "var(--space-s)" }}>{children}</div>
    </>
  );
}

export default ProjectLayout;

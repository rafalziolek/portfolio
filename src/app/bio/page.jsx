import Text from "@/components/Text/text";
function Bio() {
  return (
    <div
      style={{
        marginInline: "var(--space-s)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-xxl)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "var(--space-l)",
          flexDirection: "column",
          marginBlockStart: "var(--space-xl)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "var(--space-xxs)",
            flexDirection: "column",
          }}
        >
          <Text as="h1" type="mainHeading" color="secondary">
            Hi I&apos;m Rafał
          </Text>
          <Text>
            I&apos;m a designer and photographer living in Warsaw, Poland.
            Currently I&apos;m building design systems at Docplanner. Before
            transitioning to design systems I&apos;ve worked on
            Docplanner&apos;s SaaS software for doctors and clinics.
          </Text>
        </div>
        <Text>
          Previously I&apos;ve worked in Absolvent to help build a place to find
          a job for fresh graduates, and at INVO where I was working on design
          solutions for small and medium clients.
        </Text>
      </div>
      {/* in my work */}
      <div
        style={{
          display: "flex",
          gap: "var(--space-l)",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "var(--space-xxs)",
            flexDirection: "column",
          }}
        >
          <Text as="h2" type="mainHeading" color="secondary">
            In my work
          </Text>
          <Text>
            I work at the intersection of design and development. Wether
            it&apos;s a design tool or code I aim to strike a balance between
            usability and aesthetics, resulting in a product that is easy to
            use, but also playful and aesthetically pleasing.
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Bio;

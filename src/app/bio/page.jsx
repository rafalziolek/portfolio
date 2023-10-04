import Text from "@/components/Text/text";
import styles from "./page.module.scss";
import CustomLink from "@/components/custom-link/CustomLink";
import BioHeader from "./Components/BioHeader";
import PhotoGrid from "./Components/PhotoGrid/PhotoGrid";
import List from "@/components/List/List";
import { Stack, StackItem } from "@/components/Stack/Stack";
function Bio() {
  return (
    <>
      <BioHeader />
      <PhotoGrid />
      <section style={{ margin: "var(--space-xxl) var(--space-s)" }}>
        <div
          style={{
            flexGrow: "2",
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
              marginBottom: "var(--space-xl)",
            }}
          >
            <Text as="h2" type="mainHeading" color="secondary">
              In my work
            </Text>
            <Text>
              Although I am first and foremost a designer, I do experiment with
              code to give my designs an extra layer of polish. <br /> <br />
              This hands-on approach helps me understand the possibilities and
              limitations, ensuring that my design ideas are not just visually
              appealing but also practically implementable.
            </Text>
          </div>

          <Stack wrap="wrap" gap="m">
            <StackItem flex="2">
              <List
                title="Things I'm learning now"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  paddingTop: "var(--space-m)",
                }}
              >
                <li>Sewing clothes</li>
              </List>
            </StackItem>
            <StackItem>
              <List
                title="People who inspire me"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  paddingTop: "var(--space-m)",
                }}
              >
                <CustomLink href="https://www.youtube.com/@FaizalWestcott">
                  Faizal Westcott
                </CustomLink>
                <CustomLink href="https://twitter.com/rsms">
                  Rasmus Andersson
                </CustomLink>
                <CustomLink href="https://twitter.com/blankresident">
                  Blank resident
                </CustomLink>
              </List>
            </StackItem>
            <StackItem>
              <List
                title="Random things I love"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.2)",
                  paddingTop: "var(--space-m)",
                }}
              >
                <li>Star Wars</li>
                <li>Tteokbokki</li>
              </List>
            </StackItem>
          </Stack>
        </div>
      </section>
    </>
  );
}

export default Bio;

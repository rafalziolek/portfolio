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
              I work at the intersection of design and development. Wether
              it&apos;s a design tool or code I aim to strike a balance between
              usability and aesthetics, resulting in a product that is easy to
              use, but also playful and aesthetically pleasing.
            </Text>
          </div>

          <Stack wrap="wrap">
            <StackItem flex="2">
              <List title="Things I'm learning now">
                <li>Sewing clothes</li>
              </List>
            </StackItem>
            <StackItem>
              <List title="People who inspire me">
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
              <List title="Random things I love">
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

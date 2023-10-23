import Text from "@/components/Text/text";
import styles from "./page.module.scss";
import CustomLink from "@/components/custom-link/CustomLink";
import BioHeader from "./Components/BioHeader";
import PhotoGrid from "./Components/PhotoGrid/PhotoGrid";
import List from "@/components/List/List";
import { Stack, StackItem } from "@/components/Stack/Stack";
function Bio() {
  return (
    <div>
      <BioHeader />
      {/* <div className={styles.contact}>
        <List title="Connect with me">
          <li>
            <CustomLink href="mailto:rafal.ziolek@icloud.com">
              rafal.ziolek@icloud.com
            </CustomLink>
          </li>
          <li>
            <CustomLink href="https://www.linkedin.com/in/rafal-ziolek/">
              LinkedIn
            </CustomLink>
          </li>
          <li>
            <CustomLink href="https://www.instagram.com/notactualphotographer/">
              Instagram
            </CustomLink>
          </li>
          <li>
            <CustomLink href="https://twitter.com/rafal_ziolek/">
              Twitter
            </CustomLink>
          </li>
        </List>
      </div> */}
      {/* <PhotoGrid /> */}
      <section style={{ margin: "var(--space-xxl) var(--space-s)" }}>
        <div
          style={{
            flexGrow: "2",
            display: "flex",
            gap: "var(--space-l)",
            flexDirection: "column",
          }}
        >
          <Stack wrap="wrap" gap="xl">
            <StackItem flex="1">
              <List
                title="Things I'm learning now"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.4)",
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
                  borderTop: "1px solid rgba(255,255,255,0.4)",
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
                  borderTop: "1px solid rgba(255,255,255,0.4)",
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
    </div>
  );
}

export default Bio;

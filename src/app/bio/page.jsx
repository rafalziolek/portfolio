import Text from "@/components/Text/text";
import styles from "./page.module.scss";
import CustomLink from "@/components/custom-link/CustomLink";
import LinkList from "@/components/LinkList/LinkList";
function Bio() {
  return (
    <>
      <header
        style={{
          marginInline: "var(--space-s)",
          display: "flex",
          flexDirection: "row",
          gap: "var(--space-xxl)",
          marginBlock: "var(--space-l)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "var(--space-l)",
            flexDirection: "column",
            flexGrow: "4",
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
            Previously I&apos;ve worked in Absolvent to help build a place to
            find a job for fresh graduates, and at INVO where I was working on
            design solutions for small and medium clients.
          </Text>
        </div>
        <div className={styles.contact}>
          <div>
            <LinkList title="You can contact me via email">
              <li>
                <CustomLink href="mailto:rafal.ziolek@icloud.com">
                  rafal.ziolek@icloud.com
                </CustomLink>
              </li>
            </LinkList>
          </div>
          <div>
            <LinkList title="Or via social media">
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
            </LinkList>
          </div>
        </div>
      </header>

      {/* in my work */}
      <div className={`${styles["photo-grid"]}`}>
        <img src="#" alt="#" />
        <img src="#" alt="#" />
        <img src="#" alt="#" />
      </div>
      <section style={{ margin: "var(--space-xxl) var(--space-m)" }}>
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
          <div style={{ display: "flex", gap: "var(--space-m)" }}>
            <ul
              style={{
                listStyle: "none",
                fontSize: "var(--font-size-m)",
                flexGrow: "3",
                gap: "var(--space-xxs)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: "1px",
                  borderBottom: "1px solid #fff",
                  marginBlockEnd: "var(--space-s)",
                }}
              ></div>
              <Text color="secondary">What I'm learning now</Text>
              <li>Sewing clothes</li>
            </ul>
            <ul
              style={{
                listStyle: "none",
                fontSize: "var(--font-size-m)",
                flexGrow: "1",
                gap: "var(--space-xxs)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  height: "1px",
                  borderBottom: "1px solid #fff",
                  marginBlockEnd: "var(--space-s)",
                }}
              ></div>
              <Text color="secondary">People who inspire me</Text>
              <li>
                <CustomLink href="#">Faizal Westcott</CustomLink>
              </li>
              <li>
                <CustomLink href="#">Blank resident</CustomLink>
              </li>
            </ul>
            <ul
              style={{
                listStyle: "none",
                fontSize: "var(--font-size-m)",
                flexGrow: "1",
                gap: "var(--space-xxs)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  // height: "1px",
                  borderBottom: "1px solid #fff",
                  marginBlockEnd: "var(--space-s)",
                }}
              ></div>
              <Text color="secondary">Random things I love</Text>
              <li>Star Wars</li>
              <li>Tteokbokki</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Bio;

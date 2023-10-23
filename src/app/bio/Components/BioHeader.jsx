import styles from "./BioHeader.module.scss";
import Text from "@/components/Text/text";
import List from "@/components/List/List";
import CustomLink from "@/components/custom-link/CustomLink";
import { Stack, StackItem } from "@/components/Stack/Stack";

function BioHeader() {
  return (
    <>
      <header className={styles.header}>
        <div className={styles["about-me"]}>
          <div style={{ gridColumn: "span 8" }}>
            <Text as="h2" color="secondary" className={styles.caption}>
              Hi I&apos;m Rafał
            </Text>
            <Text type="body">
              Designer and photographer based in Warsaw, Poland. Currently, I am
              developing design systems at Docplanner. Prior to that, I worked
              on Docplanner's SaaS software for doctors and clinics.
            </Text>
          </div>
          <div style={{ gridColumn: "span 4", gridRow: "2/3" }}>
            <Text as="h2" color="secondary" className={styles.caption}>
              My approach
            </Text>
            <Text>
              I'm a designer who loves getting into both the nitty-gritty
              details and the big picture.
              <br />
              <br /> Design for me is not just about making things look good;
              it's about crafting an experience that's intuitive, user-friendly,
              and above all, honest. I aim for transparency, ensuring that
              what's good for the business also benefits the person using it.{" "}
              <br /> <br />
              Beyond the world of UI/UX, I draw inspiration from various
              disciplines and arts, from photography to design as an art form.
              All these feed into a design process that's as versatile as it is
              focused.
            </Text>
          </div>
          <div
            style={{
              gridColumn: "span 4",
              gridRow: "2/3",
              display: "flex",
              gap: "var(--space-xxs)",
              flexDirection: "column",
            }}
          >
            <Text as="h2" color="secondary">
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
        </div>
      </header>
    </>
  );
}

export default BioHeader;

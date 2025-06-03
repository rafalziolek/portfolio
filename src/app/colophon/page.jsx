import List from "@/components/List/List";
import styles from "./page.module.scss";
import Text from "@/components/Text/Text";
import StyledLink from "@/components/StyledLink/StyledLink";
import Image from "next/image";
function Colophon() {
  return (
    <div className={styles.colophon}>
      {/* <List heading="Typography">
        <List.Item>Helvetica Neue</List.Item>
      </List>
      <List heading="Built with">
        <List.Item>Next.js</List.Item>
        <List.Item>Motion</List.Item>
      </List> */}

      <Text tag="p" type="body">
        This website was built with Next.js and Motion, and the typeface used is
        Helvetica Neue.
      </Text>
      <List heading="Websites that I took inspiration from">
        <List.Item>
          <StyledLink
            href="https://taliacotton.com/"
            label="taliacotton.com"
          ></StyledLink>
        </List.Item>
        <List.Item>
          <StyledLink
            href="https://www.jipark.org/"
            label="jipark.org"
          ></StyledLink>
        </List.Item>
        <List.Item>
          <StyledLink
            href="https://morebymore.com/"
            label="morebymore.com"
          ></StyledLink>
        </List.Item>
        <List.Item>
          <StyledLink
            href="https://www.yihui.work/"
            label="yihui.work"
          ></StyledLink>
        </List.Item>
      </List>

      <Text tag="p" type="body">
        Special shout out to my cats &nbsp;
        <span style={{ whiteSpace: "nowrap" }}>
          <Image
            src="/tesla.jpg"
            height={128}
            width={128}
            alt="Tesla"
            className={styles.image}
          />
          Tesla
        </span>
        &nbsp;and&nbsp;
        <span style={{ whiteSpace: "nowrap" }}>
          <Image
            src="/newton.jpg"
            height={128}
            width={128}
            alt="Newton"
            className={styles.image}
          />
          Newton
        </span>{" "}
        for providing emotional support while I&nbsp;built this website.
      </Text>
    </div>
  );
}

export default Colophon;

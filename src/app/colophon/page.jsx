import List from "@/components/List/List";
import styles from "./page.module.scss";
import Text from "@/components/Text/Text";
import StyledLink from "@/components/StyledLink/StyledLink";
import Image from "next/image";
function Colophon() {
  return (
    <div className={styles.colophon}>
      <Text tag="p" type="body">
        Shout out to my cats &nbsp;
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
        for emotional support while I&nbsp;built this website.
      </Text>
      <List heading="Typography">
        <List.Item>Helvetica Neue</List.Item>
      </List>
      <List heading="Built with">
        <List.Item>Next.js</List.Item>
        <List.Item>Motion</List.Item>
      </List>

      <List heading="Websites that inspired this one">
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
    </div>
  );
}

export default Colophon;

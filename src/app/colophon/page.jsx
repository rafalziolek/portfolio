import List from "@/components/List/List";
import styles from "./page.module.scss";
import Text from "@/components/Text/Text";
import StyledLink from "@/components/StyledLink/StyledLink";
function Colophon() {
  return (
    <div className={styles.colophon}>
      <List heading="Typography" align="center">
        <List.Item>Helvetica Neue</List.Item>
        <List.Item>
          <Text type="heading" tag="span" font="serif">
            Times New Roman
          </Text>
        </List.Item>
      </List>
      <List heading="Built with" align="center">
        <List.Item>Next.js</List.Item>
        <List.Item>Motion</List.Item>
      </List>

      <List heading="Websites that inspired this one" align="center">
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

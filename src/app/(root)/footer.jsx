import styles from "./footer.module.scss";
import Text from "@/components/Text/text";
import Image from "next/image";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles["avatar-video"]}></div>
        <div className={styles["footer-text"]}>
          <Text as="h3" type="main-heading" color="secondary">
            Thanks for visiting
          </Text>
          <Text as="p" type="body">
            Special thanks to my cats,{" "}
            <span>
              <Image
                src="/tesla.jpg"
                height={128}
                width={128}
                alt=""
                className={styles["cat-avatar"]}
              />
              Tesla
            </span>{" "}
            and{" "}
            <span>
              <Image
                src="/newton.jpg"
                height={128}
                width={128}
                alt=""
                className={styles["cat-avatar"]}
              />
              Newton
            </span>
            , for providing emotional support while building this website.
          </Text>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

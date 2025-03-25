import styles from "./layout.module.scss";
export default function CaseStudyLayout({ children }) {
  return <div className={styles.container}>{children}</div>;
}

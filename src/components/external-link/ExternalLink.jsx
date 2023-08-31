import styles from "./externalLink.module.scss";

function ExternalLink({ href, hideIcon, route, children, ...delegated }) {
  return (
    <a className={styles.link} {...delegated} href={href} target="_blank">
      {children}
      {hideIcon ? undefined : (
        <span className={styles["trailing-icon"]}>↗</span>
      )}
    </a>
  );
}

export default ExternalLink;

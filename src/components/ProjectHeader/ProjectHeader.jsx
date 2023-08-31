import styles from "./ProjectHeader.module.scss";
import CustomLink from "@/components/custom-link/CustomLink";

function ProjectHeader({ title, abstract, details }) {
  return (
    <header className={styles.header}>
      <div className={`${styles["header-layout"]}`}>
        <div className={styles.title}>
          <h1>{title}</h1>
        </div>
        <div className={styles.details}>
          <p>{abstract}</p>
          {/* <div className={`${styles["details-list-wrapper"]}`}>
            {details.map((item, index) => {
              return (
                <ul key={index}>
                  <span className={`${styles["list-title"]}`}>
                    {item.title}
                  </span>
                  {item.items.map((item, index) => (
                    <li key={index}>
                      {typeof item.link === "string" ? (
                        <CustomLink href={item.link}>{item.text}</CustomLink>
                      ) : (
                        item.text
                      )}
                    </li>
                  ))}
                </ul>
              );
            })}
          </div> */}
        </div>
      </div>
    </header>
  );
}

export default ProjectHeader;

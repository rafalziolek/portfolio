import styles from "./ProjectList.module.scss";
import Project from "../Project/project";
import ProjectImage from "../Project/ProjectImage/ProjectImage";
function ProjectList() {
  return (
    <section className={styles.projects}>
      <Project
        title="Watson Design System"
        desc="Docplanner's design language for digital experiences"
        projectName="watson"
        path="/watson-design-system"
      >
        <ProjectImage
          size="large"
          width={1310}
          height={1024}
          src="/projects/watson/project-large.png"
        />
        <ProjectImage
          size="medium"
          width={900}
          height={700}
          src="/projects/watson/3.jpg"
        />
        <ProjectImage
          size="medium"
          width={900}
          height={700}
          src="/projects/watson/2.jpg"
        />
      </Project>

      <Project
        title="Nikola Chmiel"
        desc="Inspiring yoga for a beautiful You"
        projectName="nikola"
        path="/watson-design-system"
      >
        <ProjectImage
          size="large"
          width={1400}
          height={701}
          src="/projects/nikola/1.png"
        />
      </Project>
    </section>
  );
}

export default ProjectList;

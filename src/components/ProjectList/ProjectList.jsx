import styles from './ProjectList.module.scss';
import Project from '../Project/project';
import ProjectImage from '../Project/ProjectImage/ProjectImage';
import Grid from '../Grid/Grid';
import GridItem from '../Grid/GridItem';
import { Stack } from '../Stack/Stack';
import Text from '../Text/text';
function ProjectList() {
  return (
    <>
      <div id='work' className={styles.work}>
        <Grid className={styles.projects}>
          <GridItem startColumn={2} endColumn={7}>
            <Stack direction='column' gap='none'>
              <Project
                title='Watson Design System'
                badgeText='Docplanner'
                projectName='watson'
                path='/watson-design-system'
                imgWidth={2800}
                imgHeight={2048}
              ></Project>
              <Text type='caption' style={{ maxWidth: '50ch' }}>
                Watson is a Docplanner's design language for SaaS products and
                digital experiences. The system consists of working code, design
                tools and resources, and human interface guidelines.
              </Text>
            </Stack>
          </GridItem>
          <GridItem startColumn={8} endColumn={13}>
            <Stack direction='column' gap='none'>
              <Project
                title='Poza Matą Studio'
                badgeText='Freelance'
                projectName='nikola'
                path='/nikola-chmiel'
                imgWidth={2800}
                imgHeight={1402}
              ></Project>
              <Text type='caption' style={{ maxWidth: '50ch' }}>
                Poza Matą Studio, founded by Nikola Chmiel, is a boutique yoga
                studio emphasizing personalized experiences and wellness
                programs. It's dedicated to building an empowering community and
                catering to individual needs and goals.
              </Text>
            </Stack>
          </GridItem>
          <GridItem startColumn={1} endColumn={5}>
            <Project
              title='Runchise'
              badgeText='Semiflat'
              projectName='runchise'
              path='/runchise'
              imgWidth={3732}
              imgHeight={2108}
            ></Project>
          </GridItem>
          <GridItem startColumn={6} endColumn={11}>
            <Project
              title='Watson Design System'
              badgeText='Docplanner'
              projectName='watson'
              path='/watson-design-system'
              imgWidth={2800}
              imgHeight={2048}
            ></Project>
          </GridItem>
        </Grid>
      </div>
    </>
  );
}

export default ProjectList;

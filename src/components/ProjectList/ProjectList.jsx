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
          <GridItem startColumn={3} endColumn={8}>
            <Stack direction='row' gap='none'>
              <Project
                title='Watson Design System'
                badgeText='Docplanner'
                projectName='watson'
                path='/watson-design-system'
                imgWidth={3360}
                imgHeight={1544}
              >
                Docplanner's design language for SaaS products and digital
                experiences. The system consists of working code, design tools
                and resources, and human interface guidelines.
              </Project>
            </Stack>
          </GridItem>
          <GridItem startColumn={8} endColumn={13}>
            <Stack direction='column' gap='none'>
              <Project
                title='Runchise'
                badgeText='Semiflat'
                projectName='runchise'
                path='/runchise'
                imgWidth={3732}
                imgHeight={2108}
              >
                Runchise offers integrated solutions for restaurant and
                franchise management.
              </Project>
            </Stack>
          </GridItem>
          <GridItem startColumn={3} endColumn={8}>
            <Stack direction='column' gap='none'>
              <Project
                title='Poza Matą Studio'
                badgeText='Freelance'
                projectName='nikola'
                imgWidth={2800}
                imgHeight={1402}
              >
                {' '}
                Poza Matą Studio, founded by Nikola Chmiel, is a boutique yoga
                studio emphasizing personalized experiences and wellness
                programs.
              </Project>
            </Stack>
          </GridItem>
          <GridItem startColumn={8} endColumn={13}>
            <Stack direction='column' gap='none'>
              <Project
                title='Docplanner IA'
                badgeText='Docplanner'
                projectName='docplanner-ia'
                path='/docplanner-ia'
                imgWidth={3026}
                imgHeight={2090}
              ></Project>
              <Text type='body-support' style={{ maxWidth: '50ch' }}>
                Simplifying Docplanner's information architecture to ensure
                smooth and easy to understand experience for doctors.
              </Text>
            </Stack>
          </GridItem>
        </Grid>
      </div>
    </>
  );
}

export default ProjectList;

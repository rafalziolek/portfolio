import Image from 'next/image';
import styles from './project.module.scss';
import Text from '../Text/text';
import Link from 'next/link';

import { Stack } from '../Stack/Stack';
import Pill from '../Pill/Pill';
function Project({
  title,
  projectName,
  children,
  badgeText,
  path,
  imgWidth,
  imgHeight,
}) {
  return (
    <article className={`${styles.project}`}>
      {' '}
      <Link href='#'>
        <figure>
          <Image
            src={`/projects/${projectName}/image.png`}
            width={imgWidth}
            height={imgHeight}
          />
          <figcaption className={styles.description}>
            <Stack
              direction='row'
              gap='xs'
              alignItems='center'
              justifyContent='space-between'
            >
              <Stack
                direction='row'
                gap='xs'
                alignItems='center'
                style={{ width: '100%' }}
              >
                <Pill>{badgeText}</Pill>
                <Text as='h4' type='body'>
                  {title}
                </Text>
              </Stack>
              <span className={styles.arrow}>Case study in progress →</span>
            </Stack>
          </figcaption>
        </figure>{' '}
      </Link>
    </article>
  );
}

export default Project;

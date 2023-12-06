import Image from 'next/image';
import styles from './project.module.scss';
import Text from '../Text/text';
import Link from 'next/link';

import { Stack } from '../Stack/Stack';
import Pill from '../Pill/Pill';
function Project({
  title,
  projectName,

  badgeText,
  path,
  imgWidth,
  imgHeight,
  children,
}) {
  return (
    <article className={`${styles.project}`}>
      {' '}
      <Link href={path}>
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
                gap='2'
                // alignItems='center'
                style={{ width: '100%' }}
              >
                <Text as='h4' type='heading'>
                  {title}
                </Text>
                <Pill>{badgeText}</Pill>
              </Stack>
              <span className={styles.arrow}>→</span>
            </Stack>
            <Text type='body-support' style={{ maxWidth: '50ch' }}>
              {children}
            </Text>
          </figcaption>
        </figure>{' '}
      </Link>
    </article>
  );
}

export default Project;

import styles from './MainNav.module.scss';

import Link from 'next/link';
import { Stack } from '../Stack/Stack';
import Grid from '@/components/Grid/Grid';
import GridItem from '@/components/Grid/GridItem';
import MainNavItem from './MainNavItem';
import Text from '../Text/text';

function MainNav() {
  return (
    <nav className={styles['main-nav']}>
      <Grid align='center'>
        <GridItem columnSpan={2}>
          <Stack direction='column' gap='2' alignItems='start'>
            <Text
              type='caption'
              color='secondary-inverted'
              style={{ fontVariantPosition: 'super', lineHeight: '100%' }}
            >
              Name
            </Text>
            <Logo />
          </Stack>
        </GridItem>
        <GridItem
          columnSpan={{ xs: '8', s: '8', m: '8', l: '8', xl: '8', xxl: '8' }}
        >
          <Stack direction='column' gap='2' alignItems='start'>
            <Text
              type='caption'
              as='span'
              color='secondary-inverted'
              style={{ fontVariantPosition: 'super', lineHeight: '100%' }}
            >
              Menu
            </Text>
            <ul>
              <MainNavItem glyphLetter='W' href='/work' glyphColor='blue'>
                Work
              </MainNavItem>
              <MainNavItem glyphLetter='A' href='/about' glyphColor='orange'>
                About
              </MainNavItem>             
              <MainNavItem glyphLetter='A' href='https://experiments-git-hyperspace-button-rafalzioleks-projects.vercel.app/' glyphColor='orange'>
                Experiments ↗
              </MainNavItem>
            </ul>
          </Stack>
        </GridItem>
        <GridItem columnSpan={-3} justifySelf='end'>
          <Stack direction='column' gap='2'>
            {' '}
            <Text
              type='caption'
              color='secondary-inverted'
              style={{ fontVariantPosition: 'super', lineHeight: '100%' }}
            >
              Contact
            </Text>
            <a
              className={`${styles['main-nav-link']} ${styles.mail}`}
              href='mailto://rafal.ziolek@icloud.com'
            >
              rafal.ziolek@icloud.com
            </a>
          </Stack>
        </GridItem>
      </Grid>
    </nav>
  );
}

export function Logo() {
  return (
    <div className={styles['logo']}>
      <Link href='/'>Rafał Ziółek</Link>
    </div>
  );
}

export default MainNav;

import styles from './footer.module.scss';
import Text from '@/components/Text/text';
import Image from 'next/image';
import CustomLink from '../custom-link/CustomLink';
import { Stack } from '../Stack/Stack';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Stack gap='xxs' className={styles.circles} direction='column'>
        <Stack gap='xxs'>
          <span className={`${styles.circle} ${styles.blue}`}></span>
          <span className={`${styles.circle} ${styles.orange}`}></span>
        </Stack>
        <span className={`${styles.circle} ${styles.outline}`}></span>
      </Stack>
      <VerticalLines />
      <div className={styles.wrapper}>
        <Text type='display-heading' as='h3'>
          <a href='https://twitter.com/rafal_ziolek'>Twitter</a>,{' '}
          <a href='https://www.linkedin.com/in/rafal-ziolek/'>LinkedIn</a>,{' '}
          <a href='mailto://rafal.ziolek@icloud.com'>rafal.ziolek@icloud.com</a>
        </Text>
        <div className={styles['footer-text']}>
          <Text as='p' type='body'>
            Special thanks to my cats,{' '}
            <span>
              <Image
                src='/tesla.jpg'
                height={128}
                width={128}
                alt=''
                className={styles['cat-avatar']}
              />
              Tesla
            </span>{' '}
            and{' '}
            <span>
              <Image
                src='/newton.jpg'
                height={128}
                width={128}
                alt=''
                className={styles['cat-avatar']}
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

function VerticalLines() {
  const numOfLines = Array.from(Array(350).keys());

  return (
    <div className={styles['lines-wrapper']}>
      {numOfLines.map((num, index) => {
        return (
          <span
            key={index}
            // style={{ width: `${index / 10}px` }}
            className={styles.line}
          ></span>
        );
      })}
    </div>
  );
}

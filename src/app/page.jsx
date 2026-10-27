import localFont from 'next/font/local';
import WaveLink from '@/components/WaveLink/WaveLink';
import styles from './page.module.scss';

const areal = localFont({
  src: './fonts/ABCArealSuperfamilyVariable.woff2',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
  fallback: ['Arial', 'sans-serif'],
});

export const metadata = {
  title: 'Rafal J. Ziolek — Product Designer',
  description: 'Product designer working at Netflix on the Hawkins Pro design system. Previously at Docplanner.',
};

export default function Home() {
  return (
    <main className={`${styles.page} ${areal.className}`}>
      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>Rafal J. Ziolek</h1>
          <p>
            Currently working at <WaveLink href='https://www.netflix.com/' brand='netflix'>Netflix</WaveLink>{' '}
            on the Hawkins Pro design system. Previously, I spent time at{' '}
            <WaveLink href='https://www.docplanner.com/' brand='docplanner'>Docplanner</WaveLink>.
          </p>
        </header>
        <section aria-labelledby='connect-heading'>
          <h2 id='connect-heading' className={styles.sectionHeading}>Connect:</h2>
          <ol className={styles.links}>
            <li><WaveLink href='mailto:rafal.j.ziolek@gmail.com'>rafal.j.ziolek@gmail.com</WaveLink></li>
            <li><WaveLink href='https://x.com/rafal_ziolek'>x.com</WaveLink></li>
            <li><WaveLink href='https://www.are.na/rafal-ziolek'><span aria-hidden='true'>{'\uE000'} </span>Are.na</WaveLink></li>
          </ol>
        </section>
      </div>
    </main>
  );
}

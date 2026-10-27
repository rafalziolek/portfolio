import styles from './WaveLink.module.scss';

export default function WaveLink({ href, brand, children }) {
  return (
    <a href={href} className={styles.link} data-brand={brand}>
      {children}
    </a>
  );
}

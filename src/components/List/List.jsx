import Text from '../Text/text';
import styles from './List.module.scss';
function List({ children, title, ...delegated }) {
  return (
    <div className={styles['list-wrapper']} {...delegated}>
      <ul className={styles['list']}>{children}</ul>
    </div>
  );
}
export default List;

import styles from "./Button.module.css";
export function Button({
  children,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent) => void;
  [key: string]: any;
}) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
}

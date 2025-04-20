import Text from "@/components/Text/Text";
import styles from "./layout.module.scss";
import NavLegend from "@/app/playground/components/NavLegend/NavLegend";
import FadeOut from "@/components/FadeOut/FadeOut";
export default function PlaygroundLayout({ children }) {
  return (
    <div className={styles.container}>
      {children}
      <FadeOut fixed>
        <div className={styles.legend}>
          <NavLegend label="Navigate" kbKey="[↑↓]" />
          <NavLegend label="Toggle example" kbKey="[Enter or Space]" />
          <NavLegend label="Back" kbKey="[Esc]" />
        </div>
      </FadeOut>
    </div>
  );
}

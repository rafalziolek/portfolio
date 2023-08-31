"use client";
import react from "react";
import styles from "./asterisks.module.scss";
function AsteriskRow({ rows }) {
  const [asteriskArr, setAsteriskArr] = react.useState([]);
  const asteriskRef = react.useRef("");

  // const asteriskWidth = asteriskRef.current
  react.useEffect(() => {
    const updateAsteriskArr = () => {
      const asteriskNum = Math.floor((window.innerWidth - 48) / 16.5);
      console.log(asteriskNum);
      setAsteriskArr(Array.from(Array(asteriskNum).keys()));
    };

    updateAsteriskArr();
    window.addEventListener("resize", updateAsteriskArr);
    return () => window.removeEventListener("resize", updateAsteriskArr);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {asteriskArr.map((asterisk, index) => (
        <span ref={asteriskRef} key={index} className={styles.asterisk}>
          *
        </span>
      ))}
    </div>
  );
}
function Asterisks({ rows }) {
  const rowArr = Array.from(Array(rows).keys());
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBlockEnd: "var(--space-xs)",
      }}
    >
      {rowArr.map((row, index) => (
        <AsteriskRow key={index} />
      ))}
    </div>
  );
}
export default Asterisks;

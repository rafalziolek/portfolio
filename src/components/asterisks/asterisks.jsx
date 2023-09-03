// "use client";
import react from "react";
import styles from "./asterisks.module.scss";
function AsteriskRow({ rows }) {
  const asteriskNum = Math.floor(1900 / 16.5);
  const asteriskArr = Array.from(Array(asteriskNum).keys());

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {asteriskArr.map((asterisk, index) => (
        <span key={index} className={styles.asterisk}>
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

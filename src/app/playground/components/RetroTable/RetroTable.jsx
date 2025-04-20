// FancyTable.jsx
import React from "react";
import Text from "@/components/Text/Text";
import styles from "./RetroTable.module.scss";

export default function RetroTable({ header, children }) {
  return (
    <fieldset className={styles.table}>
      {header && (
        <legend className={styles.legend}>
          <Text font="mono" type="heading" className={styles.heading}>
            {header}
          </Text>
        </legend>
      )}

      {children}
    </fieldset>
  );
}

function RetroTableHeader({ children }) {
  return (
    <div className={styles.header}>
      <Text font="mono" type="caption" color="secondary">
        {children}
      </Text>
    </div>
  );
}

function RetroTableRow({ children }) {
  return <div className={styles.row}>{children}</div>;
}

function RetroTableCell({ children }) {
  return (
    <div className={styles.cell}>
      <Text font="mono" type="body-emphasis">
        {children}
      </Text>
    </div>
  );
}

RetroTable.Header = RetroTableHeader;
RetroTable.Row = RetroTableRow;
RetroTable.Cell = RetroTableCell;

"use client";
import React from "react";
import styles from "./ExperimentsTable.module.scss";
import RetroTable from "../RetroTable/RetroTable";
import ShuffleNavigationPage from "../../shuffle-navigation/page";
import clsx from "clsx";

export default function ExperimentsTable() {
  const [activeItem, setActiveItem] = React.useState(null);
  const items = [
    {
      title: "Shuffle text navigation",
      finished: true,
    },
    {
      title: "Hyperspace button",
      finished: false,
    },
    {
      title: "Feedback component",
      finished: false,
    },
  ];

  const handleClick = (item) => {
    if (activeItem === item.title) {
      setActiveItem(null);
    } else {
      setActiveItem(item.title);
    }
  };

  return (
    <>
      <div className={styles.projects}>
        <RetroTable header="Projects">
          <RetroTable.Header>Title</RetroTable.Header>
          <RetroTable.Header>Finished?</RetroTable.Header>
          {items.map((item) => (
            <button
              key={item.title}
              onClick={() => handleClick(item)}
              className={clsx(
                styles.button,
                activeItem === item.title && styles.active
              )}
            >
              <RetroTable.Row>
                <RetroTable.Cell>{item.title}</RetroTable.Cell>
                <RetroTable.Cell>
                  {item.finished ? " Yes" : "⨯ Nope"}
                </RetroTable.Cell>
              </RetroTable.Row>
            </button>
          ))}
        </RetroTable>
      </div>
      {activeItem && (
        <div className={styles.preview}>
          <ShuffleNavigationPage />
        </div>
      )}
    </>
  );
}

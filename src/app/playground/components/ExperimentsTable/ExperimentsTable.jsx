"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import styles from "./ExperimentsTable.module.scss";
import RetroTable from "../RetroTable/RetroTable";
import ShuffleNavigationPage from "../../shuffle-navigation/page";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function ExperimentsTable() {
  const [activeItem, setActiveItem] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const buttonRefs = useRef([]);
  const router = useRouter();
  const items = useMemo(
    () => [
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
    ],
    []
  );

  const handleClick = (item) => {
    if (activeItem === item.title) {
      setActiveItem(null);
    } else {
      setActiveItem(item.title);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        !["ArrowUp", "ArrowDown", "Enter", " ", "Escape"].includes(event.key)
      ) {
        return;
      }

      let nextIndex = focusedIndex;

      if (event.key === "ArrowDown") {
        nextIndex = (focusedIndex + 1) % items.length;
      } else if (event.key === "ArrowUp") {
        nextIndex = (focusedIndex - 1 + items.length) % items.length;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        if (nextIndex !== focusedIndex) {
          setFocusedIndex(nextIndex);
          buttonRefs.current[nextIndex]?.focus();
        }
      }

      if (event.key === "Escape") {
        router.push(`/`);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [focusedIndex, items]);

  useEffect(() => {
    buttonRefs.current = buttonRefs.current.slice(0, items.length);
  }, [items]);

  return (
    <>
      <div className={styles.projects}>
        <RetroTable header="Projects">
          <RetroTable.Header>Title</RetroTable.Header>
          <RetroTable.Header>Finished?</RetroTable.Header>
          {items.map((item, index) => (
            <button
              key={item.title}
              ref={(el) => (buttonRefs.current[index] = el)}
              onClick={() => {
                handleClick(item);
                setFocusedIndex(index);
              }}
              onFocus={() => setFocusedIndex(index)}
              className={clsx(
                styles.button,
                activeItem === item.title && styles.active
              )}
              autoFocus={index === 0}
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

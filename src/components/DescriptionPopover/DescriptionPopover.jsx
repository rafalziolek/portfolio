"use client";
import React from "react";
import styles from "./DescriptionPopover.module.scss";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import Text from "@/components/Text/Text";

export default function DescriptionPopover({ isOpen, onClose, frontmatter }) {
  console.log("DescriptionPopover render - isOpen:", isOpen);
  console.log("DescriptionPopover render - frontmatter:", frontmatter);

  if (!frontmatter) {
    console.log("No frontmatter, returning null");
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {console.log("Rendering popover content")}

          {/* Popover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className={styles.popover}
          >
            {/* Close button */}
            <button className={styles.closeButton} onClick={onClose}>
              <X size={16} />
            </button>

            {/* Content */}
            <div className={styles.content}>
              <Text
                tag="h3"
                type="superscript-small"
                uppercase
                className={styles.title}
              >
                Project Details
              </Text>

              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <Text
                    tag="h4"
                    type="superscript-small"
                    uppercase
                    className={styles.detailHeader}
                  >
                    Title
                  </Text>
                  <Text
                    tag="span"
                    type="body"
                    className={styles.detailDescription}
                  >
                    {frontmatter.title}
                  </Text>
                </div>

                <div className={styles.detailItem}>
                  <Text
                    tag="h4"
                    type="superscript-small"
                    uppercase
                    className={styles.detailHeader}
                  >
                    Abstract
                  </Text>
                  <Text
                    tag="span"
                    type="body"
                    className={styles.detailDescription}
                  >
                    {frontmatter.abstract}
                  </Text>
                </div>

                {frontmatter.details &&
                  frontmatter.details.map((detail, index) => (
                    <div key={index} className={styles.detailItem}>
                      <Text
                        tag="h4"
                        type="superscript-small"
                        uppercase
                        className={styles.detailHeader}
                      >
                        {detail.title}
                      </Text>
                      {detail.items.map((item, itemIndex) => (
                        <Text
                          key={itemIndex}
                          tag="span"
                          type="body"
                          className={styles.detailDescription}
                        >
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.text}
                            </a>
                          ) : (
                            item.text
                          )}
                        </Text>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

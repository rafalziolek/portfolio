import React from "react";
import styles from "./MDXComponents.module.scss";
import Text from "../Text/Text";
import PostImage from "./PostImage/PostImage";
import Image from "next/image";
function H1(props) {
  return <Text type="display" tag="h1" className={styles.h1} {...props} />;
}

function H2(props) {
  return (
    <div className={styles.h2Container}>
      <Text type="heading" tag="h2" className={styles.h2} {...props} />
      <svg
        className={styles.line}
        height="2"
        viewBox="0 0 100% 2"
        width="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0.5"
          y1="1.16675"
          x2="100%"
          y2="1.16675"
          // stroke="white"
          strokeLinecap="round"
          strokeDasharray="0.1 5"
        />
      </svg>
    </div>
  );
}

function H3(props) {
  return <Text type="heading" tag="h3" className={styles.h3} {...props} />;
}

function H4(props) {
  return <Text type="heading" tag="h4" className={styles.h4} {...props} />;
}

function H5(props) {
  return <Text type="heading" tag="h5" className={styles.h5} {...props} />;
}

function H6(props) {
  return <Text type="heading" tag="h6" className={styles.h6} {...props} />;
}

function P(props) {
  return <Text type="body-article" tag="p" {...props} className={styles.p} />;
}

export const components = {
  p: (props) => <P {...props} />,
  h1: (props) => <H1 {...props} />,
  h2: (props) => <H2 {...props} />,
  h3: (props) => <H3 {...props} />,
  h4: (props) => <H4 {...props} />,
  h5: (props) => <H5 {...props} />,
  h6: (props) => <H6 {...props} />,
  PostImage: (props) => <PostImage {...props} />,
  Image: (props) => <Image {...props} />,
};

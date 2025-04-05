import React from "react";
import styles from "./MDXComponents.module.scss";
import Text from "../Text/Text";
export const components = {
  p: Text,
  h1: (props) => <Text type="display" tag="h1" {...props} />,
  h2: (props) => <Text type="heading" tag="h2" {...props} />,
  h3: (props) => <Text type="heading" tag="h3" {...props} />,
  h4: (props) => <Text type="heading" tag="h4" {...props} />,
  h5: (props) => <Text type="heading" tag="h5" {...props} />,
  h6: (props) => <Text type="heading" tag="h6" {...props} />,
};

export function MDXComponents() {
  return <div>MDXComponents</div>;
}

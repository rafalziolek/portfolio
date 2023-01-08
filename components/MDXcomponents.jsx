import { styled } from "../stitches.confing";
import { Text } from "./Text";
import Image from "next/image";

const H1 = (props) => {
  return (
    <Text as="h1" type="heading" css={{ marginBottom: "$m" }}>
      {props.children}
    </Text>
  );
};

const H2 = (props) => {
  return (
    <Text as="h2" type="heading" css={{ marginBottom: "$m" }}>
      {props.children}
    </Text>
  );
};

const Paragraph = (props) => {
  return (
    <Text as="p" type="caption" css={{ marginBottom: "$m", maxWidth: "70ch" }}>
      {props.children}
    </Text>
  );
};

export const components = {
  h1: H1,
  h2: H2,
  p: Paragraph,
};

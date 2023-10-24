import Text from "../Text/text";
import WatsonHeading from "@/app/[projectSlug]/Components/WatsonHeading";
export const components = {
  WatsonHeading: () => <WatsonHeading />,
  h1: (props) => (
    <Text
      as="h1"
      type="mainHeading"
      style={{ marginBottom: "var(--space-m)", maxWidth: "100%" }}
    >
      {props.children}
    </Text>
  ),
  h2: (props) => (
    <Text
      as="h2"
      type="sectionHeading"
      style={{
        paddingTop: "var(--space-l)",
        marginBottom: "var(--space-m)",
        maxWidth: "100%",
      }}
    >
      {props.children}
    </Text>
  ),
  h3: (props) => (
    <Text
      as="h3"
      type="sectionHeading"
      color="secondary"
      style={{ marginBottom: "var(--space-xxs)", maxWidth: "100%" }}
    >
      {props.children}
    </Text>
  ),
  p: (props) => (
    <Text
      as="p"
      type="body"
      style={{ marginBottom: "var(--space-xxl)", maxWidth: "100%" }}
    >
      {props.children}
    </Text>
  ),
};

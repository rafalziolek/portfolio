import React from "react";
import styles from "./List.module.scss";
import Text from "@/components/Text/Text";
import StyledLink from "@/components/StyledLink/StyledLink";
import clsx from "clsx";

export default function List({ heading, children, align }) {
  return (
    <ul className={clsx(styles.list, align && styles[align])}>
      <Text
        tag="h4"
        type="caption"
        uppercase
        // font="serif"
        className={styles.listTitle}
      >
        {heading}
      </Text>
      {children}
    </ul>
  );
}

function ListItem({
  children,
  href,
  leadingVisual,
  trailingVisual,
  external,

  ...rest
}) {
  return (
    <li {...rest}>
      {href ? (
        <StyledLink
          label={children}
          href={href}
          leadingVisual={leadingVisual}
          trailingVisual={trailingVisual}
          external={external}
        />
      ) : (
        <Text tag="span">{children}</Text>
      )}
    </li>
  );
}

List.Item = ListItem;

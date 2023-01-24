import { styled } from "../stitches.confing";
import Link from "next/link";
import { useRouter } from "next/router";

const StyledNavigation = styled("nav", {
  "& ul": {
    display: "flex",
    listStyle: "none",
    gap: "$xs",
  },
});

const StyledNavItem = styled("a", {
  fontSize: "$captionMobile",
  lineHeight: "$compact",
  fontWeight: "$heading",
  color: "$primaryFg",
  textDecoration: "none",
  whiteSpace: "nowrap",
  height: "40px",
  padding: "11px $m 13px $m",
  display: "flex",
  alignItems: "center",
  gap: "$xs",
  borderRadius: "$radius$pill",
  background: "$transparentBg",
  backdropFilter: "$filters$backdropBlur",

  "@media (hover: hover)": {
    "&:hover": {
      color: "$primaryFg",
      background: "$primaryBg",
      boxShadow: "0 0 0 1px $colors$primaryFg",
      "&:before": {
        color: "$primaryFg",
      },
    },
  },

  variants: {
    active: {
      true: {
        background: "$primaryBgInverted",
        color: "$primaryFgInverted",
        paddingLeft: "$s",
        "&:before": {
          content: "→",
        },
      },
    },
  },
});

export function NavigationItem({ label, path, href }) {
  const router = useRouter();

  return (
    <li>
      <Link href={path} passHref legacyBehavior>
        <StyledNavItem
          href={href}
          active={router.pathname === path ? true : false}
        >
          {label}
        </StyledNavItem>
      </Link>
    </li>
  );
}

function Navigation({ children }) {
  return (
    <StyledNavigation>
      <ul>{children}</ul>
    </StyledNavigation>
  );
}

export default Navigation;

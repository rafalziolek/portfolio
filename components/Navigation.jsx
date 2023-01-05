import { styled } from "../stitches.confing";
import Link from "next/link";
import { useRouter } from "next/router";

const NavWrapper = styled("nav", {
  borderRadius: "$radius$pill",

  width: "fit-content",

  "& ul": {
    display: "flex",
    flexDirection: "row",
    listStyle: "none",
    gap: "$s",
  },
});

const NavLink = styled("a", {
  $$Background: "$gray00",
  $$Opacity: "0.8",

  // boxShadow: "0 0 0 1px rgba(107,107,107,$$Opacity)",
  fontSize: "$caption",
  lineHeight: "$compact",
  fontWeight: "$heading",
  color: "rgba(0,0,0,1)",
  padding: "11px $4 13px $4",
  display: "block",
  textDecoration: "none",
  borderRadius: "$radius$pill",
  background: "rgba(225,225,225,0.40)",
  backdropFilter: "blur(35px)",
  display: "flex",
  gap: "$xs",
  alignItems: "center",
  "&:hover": {
    color: "$black",
    background: "white",
    boxShadow: "0 0 0 1px black",
    "&:before": {
      color: "black",
    },
  },

  variants: {
    active: {
      true: {
        background: "rgba(0,0,0,1)",
        color: "white",
        position: "relative",
        paddingLeft: "$s",
        "&:before": {
          content: "→",
        },
      },
    },
  },
});

export function NavItem({ label, path, pathName, href }) {
  return (
    <li>
      <Link href={path} passHref legacyBehavior>
        <NavLink href={href} active={pathName === path ? true : false}>
          {label}
        </NavLink>
      </Link>
    </li>
  );
}

export const NavButton = styled("button", {
  background: "rgba(225,225,225,0.40)",
  borderRadius: "$radius$m",
  backdropFilter: "blur(40px)",
  width: "fit-content",
  padding: "$1",
  appearance: "none",
  border: "none",
  fontSize: "$body",
  lineHeight: "$body",
  fontWeight: "$body",
  color: "white",
  cursor: "pointer",
  height: "44px",
  width: "44px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "& svg": {
    fill: "black",
  },
  "&:hover": {
    color: "$black",
    background: "white",
    boxShadow: "0 0 0 1px black",
    "& svg": {
      fill: "black",
    },
  },
});

function Navigation({ children }) {
  return (
    <NavWrapper>
      <ul>{children}</ul>
    </NavWrapper>
  );
}

export default Navigation;

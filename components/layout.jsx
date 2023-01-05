import Navigation, { NavItem, NavButton } from "./Navigation";
import { styled, globalStyles } from "../stitches.confing";
import { useRouter } from "next/router";
import Box from "./Box";

const StickyBar = styled("div", {
  position: "sticky",
  top: "0",
  // background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, white 40%)",
  // background: "rgba(250,250,250,0.8)",
  // boxShadow: "-1px 0 0 1px rgba(0,0,0,0.1)",
  padding: "$m",
  // backdropFilter: "blur(20px)",
  right: "0",
  left: "0",
  display: "flex",
  justifyContent: "space-between",
  zIndex: "999",
});

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <StickyBar>
        {/* <Box></Box> */}
        <Navigation>
          <NavItem pathName={router.pathname} path="/" label="Work" />
          <NavItem pathName={router.pathname} path="/me" label="About" />
          <NavItem
            pathName={router.pathname}
            path="/outside-work"
            label="Outside work"
          />
        </Navigation>
        <NavButton icon>
          <svg
            width="24"
            height="24"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M54.0002 42.5059C52.5665 42.7652 51.0864 42.9009 49.5729 42.9009C36.6213 42.9009 26.1221 32.9628 26.1221 20.7034C26.1221 16.8224 27.1743 13.1741 29.0235 10C18.1887 11.9595 10 20.9758 10 31.8024C10 44.0618 20.4993 53.9999 33.4508 53.9999C42.3022 53.9999 50.0082 49.3581 54.0002 42.5059Z"
              // fill="white"
            />
          </svg>
        </NavButton>
      </StickyBar>
      {children}
    </>
  );
}

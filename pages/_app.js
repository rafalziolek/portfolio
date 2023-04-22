import { globalStyles } from "../stitches.confing";
import { styled } from "../stitches.confing";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  globalStyles();
  return <Component {...pageProps} />;
}

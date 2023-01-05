import Layout from "../components/layout";
import { globalStyles } from "../stitches.confing";
import { styled } from "../stitches.confing";

export default function App({ Component, pageProps }) {
  globalStyles();
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

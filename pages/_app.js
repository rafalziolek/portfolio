import Layout from "../components/layout";
import { globalStyles } from "../stitches.confing";
import { styled } from "../stitches.confing";

export default function App({ Component, pageProps }) {
  globalStyles();

  const renderWithLayout =
    Component.getLayout ||
    function (page) {
      return <Layout>{page}</Layout>;
    };
  return renderWithLayout(<Component {...pageProps} />);
}

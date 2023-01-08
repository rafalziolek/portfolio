import Layout from "../components/layout";
import { globalStyles } from "../stitches.confing";
import { styled } from "../stitches.confing";
import { useRouter } from "next/router";
import { MDXProvider } from "@mdx-js/react";
import { Text } from "../components/Text";
import { components } from "../components/MDXcomponents";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  globalStyles();
  if (router.pathname.startsWith("/projects")) {
    return (
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    );
  } else {
    const renderWithLayout =
      Component.getLayout ||
      function (page) {
        return <Layout>{page}</Layout>;
      };
    return renderWithLayout(<Component {...pageProps} />);
  }
}

//
//
// if (isProject) {
//   Component.getLayout ||
//     function (page) {
//       return { page };
//     };
// }

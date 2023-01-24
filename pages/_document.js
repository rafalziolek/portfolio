import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.confing";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssText() }}
          />
          <link
            rel="stylesheet"
            href="https://use.typekit.net/mtj8ilt.css"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

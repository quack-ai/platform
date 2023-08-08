import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Quack AI - Guideline management</title>
        <meta
          name="description"
          content="Management dashboard to curate the guidelines for your contributors."
        />
        <meta property="og:title" content="Quack AI - Guideline management" />
        <meta
          property="og:description"
          content="Management dashboard to curate the guidelines for your contributors."
        />
        <meta
          property="og:image"
          content="https://github.com/quack-ai/contribution-platform/releases/download/v0.0.1/quack-logo-enlarged.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

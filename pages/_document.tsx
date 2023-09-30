import { Head, Html, Main, NextScript } from "next/document";

const metaTitle = "Quack AI - Guideline management";
const metaDescription =
  "Management dashboard to curate the guidelines for your contributors.";
const metaUrl = "https://app.quack-ai.com/";
const metaBanner =
  "https://github.com/quack-ai/contribution-platform/releases/download/v0.0.1/quack-logo-enlarged.png";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={metaUrl} />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaBanner} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content={metaBanner} />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaBanner} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

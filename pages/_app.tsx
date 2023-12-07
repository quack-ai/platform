import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { posthog } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { ChatwootWidget } from "../components/ChatwootWidget.tsx";
import { Toaster } from "../components/ui/toaster";
import "../styles/globals.css";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (posthogKey) {
    posthog.init(posthogKey, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com",
      // Enable debug mode in development
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") posthog.debug();
      },
    });
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PostHogProvider client={posthog}>
      <Head>
        <title>Quack AI - Guideline management</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <ChatwootWidget />
      <Component {...pageProps} />
      <Analytics />
      <Toaster />
    </PostHogProvider>
  );
}

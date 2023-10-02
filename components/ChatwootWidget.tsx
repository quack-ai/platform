import React from "react";

export class ChatwootWidget extends React.Component {
  componentDidMount() {
    // Add Chatwoot Settings
    window.chatwootSettings = {
      hideMessageBubble: false,
      position: "right", // This can be left or right
      locale: "en", // Language to be set
      type: "standard", // [standard, expanded_bubble]
    };

    // Paste the script from inbox settings except the <script> tag
    (function (d, t) {
      if (process.env.NEXT_PUBLIC_CHATWOOT_TOKEN) {
        const chatwootToken: string = process.env.NEXT_PUBLIC_CHATWOOT_TOKEN;
        const BASE_URL =
          process.env.NEXT_PUBLIC_CHATWOOT_ENDPOINT ||
          "https://app.chatwoot.com";
        const g = d.createElement(t) as HTMLScriptElement,
          s = d.getElementsByTagName(t)[0];
        g.src = BASE_URL + "/packs/js/sdk.js";
        g.defer = true;
        g.async = true;
        s.parentNode?.insertBefore(g, s);
        g.onload = function () {
          window.chatwootSDK?.run({
            websiteToken: chatwootToken,
            baseUrl: BASE_URL,
          });
        };
      }
    })(document, "script");
  }

  render() {
    return null;
  }
}

export default ChatwootWidget;

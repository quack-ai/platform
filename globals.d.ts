interface ChatwootSettings {
  hideMessageBubble: boolean;
  position: string;
  locale: string;
  type: string;
}

interface ChatwootSDK {
  run: (config: { websiteToken: string; baseUrl: string }) => void;
}

interface Window {
  chatwootSettings?: ChatwootSettings;
  chatwootSDK?: ChatwootSDK;
}

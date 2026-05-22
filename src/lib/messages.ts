import { Anthropic } from "@anthropic-ai/sdk/client.js";
import type { NewsSettings } from '../NewsSettings';

const client = new Anthropic({
  // Put your Anthropic SDK key in a .env.local file,
  // which vite picks up automatically.
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});

export function stream(settings: NewsSettings, signal?: AbortSignal) {

    const positivePercent = settings.positive;
    const positiveInstructions =
        `When finding news, report ${positivePercent}% good news.`;

    const includeTopics = settings.topics
        .filter(x => x.selected)
        .map(x => x.label)
        .join(';');

    const excludeTopics = settings.topics
        .filter(x => !x.selected)
        .map(x => x.label)
        .join(';')
    
    const includeInstructions =
        `In addition to a general search, be sure to include news for the
        following topics: ${includeTopics}`;

    const excludeInstructions =
        `Do not include news stories for the following topics: ${excludeTopics}`;

  return client.messages.stream({
    max_tokens: 4096,
    tools: [
      {
        type: "web_search_20260209",
        name: "web_search",
        max_uses: 5, // how many searches per request,
        allowed_callers: ["direct"],
      },
    ],
    system:
      "Provide the news summary directly without preamble. Do not announce that you are searching or thinking.",
    messages: [
      {
        role: "user",
        content: `What's the news, today?
            ${positiveInstructions}
            ${includeInstructions}
            ${excludeInstructions}
            `
      },
    ],
    model: "claude-haiku-4-5",
  },
  { signal });
}

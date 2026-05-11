import { Anthropic } from "@anthropic-ai/sdk/client.js";

const client = new Anthropic({
  // Put your Anthropic SDK key in a .env.local file,
  // which vite picks up automatically.
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});

const message = await client.messages.create({
  max_tokens: 4096,
  tools: [{
    type: 'web_search_20250305',
    name: 'web_search',
    max_uses: 5, // how many searches per request
  }],
  messages: [{
    role: "user", 
    content: "What's the news, today?" 
  }],
  model: "claude-haiku-4-5"
});

function App() {

  const news = message.content
    .filter(x => x.type === 'text')
    .map(x => x.text)
    .join('');

  return (
    <>
      <div>{news}</div>
    </>
  )
}

export default App

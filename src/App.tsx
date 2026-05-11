import { Anthropic } from "@anthropic-ai/sdk/client.js";

const client = new Anthropic({
  // Put your Anthropic SDK key in a .env.local file,
  // which vite picks up automatically.
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});

const message = await client.messages.create({
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello, Claude" }],
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

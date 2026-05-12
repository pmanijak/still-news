import { Anthropic } from "@anthropic-ai/sdk/client.js";
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

const client = new Anthropic({
  // Put your Anthropic SDK key in a .env.local file,
  // which vite picks up automatically.
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});

function App() {
  const [news, setNews] = useState('');

  useEffect(() => {
    let cancelled = false;
    const stream = client.messages.stream({
      max_tokens: 4096,
      tools: [{
        type: 'web_search_20260209',
        name: 'web_search',
        max_uses: 5, // how many searches per request,
        allowed_callers: ['direct']
      }],
      system: 'Provide the news summary directly without preamble. Do not announce that you are searching or thinking.',
      messages: [{
        role: "user", 
        content: "What's the news, today?" 
      }],
      model: "claude-haiku-4-5"
    })
    
    stream.on('text', (chunk) => {
      if (cancelled)
        return;
      setNews(t => t + chunk)
    });
    
    return () => {
      cancelled = true;
      stream.abort();
    };
  }, [])

  return (
    <>
      <ReactMarkdown>{news}</ReactMarkdown>
    </>
  )
}

export default App

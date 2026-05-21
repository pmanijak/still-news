import { useState } from 'react'; 
import useNews from './lib/useNews';
import ReactMarkdown from 'react-markdown';
import NewsSettings from './NewsSettings';

function App() {
  const now = new Date().toLocaleDateString('en-US', { dateStyle: 'long' });
  
  const [newsSettings, setNewsSettings] = useState({ 
    positive: 100,
    topics: [
      { label: "U.S. News", selected: true },
      { label: "Politics", selected: false },
      { label: "Markets", selected: false },
      { label: "Sports", selected: false }
    ]
  });
  const news = useNews(newsSettings);

  return (
    <div className="min-h-screen flex">
      <main className="flex-1 px-8 py-10 max-w-4xl overflow-auto">
        <h1>still news</h1>
        <h2 className="text-gray-600 dark:text-gray-400 mb-8">{now}</h2>
        <div className="prose prose-lg dark:prose-invert">
          <ReactMarkdown>{news}</ReactMarkdown>
        </div>
      </main>
      
      <aside className="w-80 border-l border-gray-200 dark:border-gray-800 p-6 overflow-auto sticky top-0 h-screen">
        <NewsSettings
          value={newsSettings}
          onChange={setNewsSettings}
        />
      </aside>
    </div>
  );
}

export default App

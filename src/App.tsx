import { useState } from 'react'; 
import useNews from './lib/useNews';
import ReactMarkdown from 'react-markdown';
import Settings from './Settings';

function App() {
  const now = new Date().toLocaleDateString('en-US', { dateStyle: 'long' });
  
  const [settings, setSettings] = useState({ sentiment: 5 });
  const news = useNews(settings);

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
        <Settings
          value={settings}
          onChange={setSettings}
        />
      </aside>
    </div>
  );
}

export default App

import useNews from './lib/useNews';
import ReactMarkdown from 'react-markdown';

function App() {
  const now = new Date().toLocaleDateString('en-US', { dateStyle: 'long' });
  const news = useNews();

  return (
    <>
      <h1>still news</h1>
      <h2>{now}</h2>
      <ReactMarkdown>{news}</ReactMarkdown>
    </>
  )
}

export default App

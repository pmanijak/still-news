import SliderField from './components/SliderField';
import { useState } from 'react';

function Settings() {
  const [sentiment, setSentiment] = useState(2);

  return (
    <>
      <SliderField
        label="Sentiment"
        value={sentiment}
        onChange={setSentiment} />
    </>);
}

export default Settings;

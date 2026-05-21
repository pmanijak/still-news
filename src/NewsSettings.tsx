import SliderField from './components/SliderField';

export type NewsSettings = {
  sentiment: number
}

type NewsSettingsProps = {
  value: NewsSettings,
  onChange: (obj: NewsSettings) => void
}

function NewsSettings({ value, onChange }: NewsSettingsProps) {
  return (
    <>
      <SliderField
        label="Positive Sentiment"
        value={value.sentiment}
        onChange={(sentiment) => onChange({ ...value, sentiment })} />
    </>);
}

export default NewsSettings;

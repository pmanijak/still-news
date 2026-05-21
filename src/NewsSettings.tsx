import SliderField from './components/SliderField';

export type NewsSettings = {
  positive: number
}

type NewsSettingsProps = {
  value: NewsSettings,
  onChange: (obj: NewsSettings) => void
}

function NewsSettings({ value, onChange }: NewsSettingsProps) {
  return (
    <>
      <SliderField
        label="Positive sentiment"
        value={value.positive}
        onChange={(positive) => onChange({ ...value, positive })} />
    </>);
}

export default NewsSettings;

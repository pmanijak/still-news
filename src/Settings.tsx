import SliderField from './components/SliderField';

type SettingsValue = {
  sentiment: number
}

type SettingsProps = {
  value: SettingsValue,
  onChange: (obj: SettingsValue) => void
}

function Settings({ value, onChange }: SettingsProps) {
  return (
    <>
      <SliderField
        label="Sentiment"
        value={value.sentiment}
        onChange={(sentiment) => onChange({ ...value, sentiment })} />
    </>);
}

export default Settings;

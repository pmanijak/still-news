import SliderField from './components/SliderField';
import Checkbox from './components/Checkbox';
import { produce } from 'immer';

export type NewsSettings = {
  positive: number
  topics: {
    label: string
    selected: boolean
  }[]
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

      <div className="space-y-3 mt-5">
        {value.topics.map((topic, index) => (
            <Checkbox
              key={`settings-topic-${index}`}
              label={topic.label}
              value={topic.selected}
              onChange={(selected) =>
                onChange(produce(value, (x) => {
                  x.topics[index].selected = selected
                }))}
            />
        ))}
      </div>
    </>);
}

export default NewsSettings;

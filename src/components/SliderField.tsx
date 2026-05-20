import Slider from './Slider';

type SliderFieldProps = {
    label: string,
    value: number,
    onChange: (v: number) => void,
}

function SliderField({ label, value, onChange }: SliderFieldProps) {
    return (
        <div className="space-y-2">
            <label className="block text-center">{label}</label>
            <Slider
                label={label}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SliderField;
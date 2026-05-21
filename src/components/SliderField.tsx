import Slider from './Slider';
import { useId } from 'react';

type SliderFieldProps = {
    label: string,
    value: number,
    onChange: (v: number) => void,
}

function SliderField({ label, value, onChange }: SliderFieldProps) {
    const id = useId();

    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block">
                {label}
            </label>
            <Slider
                id={id}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default SliderField;
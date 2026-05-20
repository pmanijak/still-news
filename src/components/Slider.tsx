import * as SliderPrimitive from "@radix-ui/react-slider";

type SliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  max?: number;
  step?: number;
};

function Slider({ label, value, onChange, max = 5, step = 1 }: SliderProps) {
  return (
    <SliderPrimitive.Root
      value={[value]}
      onValueChange={([v]) => onChange(v)}
      max={max}
      step={step}
      className="relative flex h-5 items-center touch-none select-none"
    >
      <SliderPrimitive.Track className="relative h-[3px] grow rounded-full bg-track">
        <SliderPrimitive.Range className="absolute h-full rounded-full bg-white" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className="block size-5 rounded-full bg-white shadow-thumb hover:bg-thumb-hover focus:outline-none focus:shadow-thumb-focus"
        aria-label={label}
      />
    </SliderPrimitive.Root>
  );
}

export default Slider;
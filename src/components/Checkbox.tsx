import { useId } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

type CheckboxProps = {
    label: string
    value: boolean
    onChange: (value: boolean) => void
}

function Checkbox({ label, value, onChange }: CheckboxProps) {
  const id = useId();
  return (
    <div className="flex items-center">
      <CheckboxPrimitive.Root
        className="flex size-6 appearance-none items-center justify-center rounded bg-white shadow-[0_2px_10px] shadow-blackA4 outline-none hover:bg-violet3 focus:shadow-[0_0_0_2px_black]"
        checked={value}
        onCheckedChange={onChange}
        id={id}
      >
        <CheckboxPrimitive.Indicator className="text-violet11">
          <CheckIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label className="pl-2 leading-none" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

export default Checkbox;

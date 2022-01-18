import { useState, useCallback } from "react";

import { Input, InputProps, Text } from "@/common/components/atoms";

export type ICurrenceInputProps = Omit<InputProps, "onChange"> & {
  onChange?: (val: string) => void;
};

export default function CurrencyInput({
  onChange,
  ...rest
}: ICurrenceInputProps): JSX.Element {
  const [value, setValue] = useState("");

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const val = event.target.value;
      const valid = /\d/.test(val);
      if (valid || val === "") {
        setValue(val);

        if (onChange) {
          onChange(val);
        }
      }
    },
    [onChange]
  );

  return (
    <Input
      prefixElement={value && <Text>₹</Text>}
      value={value}
      {...rest}
      onChange={handleOnChange}
    />
  );
}

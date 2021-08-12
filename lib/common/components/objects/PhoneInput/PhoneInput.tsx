import { AnimatePresence } from "framer-motion";
import { CountryCode } from "libphonenumber-js";
import { useCallback, useState } from "react";

import { Text } from "@/common/components/atoms";

import { Input, InputProps } from "../../atoms/Input";

export type IPhoneInputProps = InputProps & {
  error?: string;
  defaultCountry?: CountryCode;
  initialValue?: string;
  onValueChanged?: (val: string) => void;
};

export const PhoneInput: React.FC<IPhoneInputProps> = ({
  error,
  initialValue,
  placeholder = "Enter Phone Number",
  onValueChanged,
  ...rest
}) => {
  const [state, setState] = useState(initialValue ?? "");

  const handleValueChange = useCallback(
    (event) => {
      const newValue = event.target.value;
      const exp = RegExp(/^[0-9]*$/);
      const valid = exp.test(newValue);
      if (valid) {
        setState(newValue);
        if (onValueChanged) {
          onValueChanged(newValue);
        }
      }
    },
    [onValueChanged]
  );

  return (
    <>
      <Input
        placeholder={placeholder}
        type="tel"
        // onFocus={() => setVisibility(true)}
        // onBlur={() => setVisibility(false)}
        onChange={handleValueChange}
        value={state}
        {...rest}
      />
      <AnimatePresence>
        {error && <Text textStyle="error">{error}</Text>}
      </AnimatePresence>
    </>
  );
};

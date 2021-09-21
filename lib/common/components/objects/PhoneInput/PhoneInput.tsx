import { AnimatePresence } from "framer-motion";
import { CountryCode } from "libphonenumber-js";
import { useCallback, useState } from "react";
import { useTheme } from "styled-components";

import { Icon, Text } from "@/common/components/atoms";

import { Input, InputProps } from "../../atoms/Input";

export type IPhoneInputProps = InputProps & {
  error?: string;
  defaultCountry?: CountryCode;
  initialValue?: string;
  onValueChanged?: (val: string) => void;
};

export function PhoneInput({
  error,
  initialValue,
  placeholder = "Enter Phone Number",
  onValueChanged,
  ...rest
}: IPhoneInputProps): JSX.Element {
  const { space, colors } = useTheme();
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
        prefixElement={
          <Icon icon="Phone" size={18} color={colors.slate} mr={space.xxxs} />
        }
        placeholder={placeholder}
        type="tel"
        // onFocus={() => setVisibility(true)}
        // onBlur={() => setVisibility(false)}
        onChange={handleValueChange}
        value={state}
        {...rest}
      />
      <AnimatePresence>
        {error && (
          <Text color={colors.error} textStyle="error">
            {error}
          </Text>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, ChangeEventHandler } from "react";

import {
  InputWrapper,
  InputField,
  ErrorLabel,
} from "@components/atoms/TextInput/styles";

interface IProps {
  intitalValue?: string;
  placeholder: string;
  error?: string;
  onChange?: (value: string) => void;
  value?: string;
}

const PhoneInput: React.FC<IProps> = ({
  placeholder,
  intitalValue,
  onChange,
  value,
  error,
}) => {
  const [state, setState] = useState(intitalValue ?? "");

  const onChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    const exp = RegExp(/^[0-9]*$/);
    const valid = exp.test(newValue);
    if (valid === true) {
      setState(newValue);
      if (onChange) {
        onChange(newValue);
      }
    }
  };

  return (
    <>
      <InputWrapper error={error}>
        <InputField
          autoComplete="tel"
          placeholder={placeholder}
          type="tel"
          value={value || state}
          maxLength={12}
          onChange={onChangeValue}
        />
      </InputWrapper>
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </>
  );
};

export default PhoneInput;

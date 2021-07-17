import { ChangeEventHandler } from "react";

import { ErrorLabel, InputField, InputWrapper } from "./styles";

interface IProps {
  type?: "text" | "email" | "number" | "password" | "tel";
  label: string;
  placeholder: string;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const TextInput: React.FC<IProps> = ({
  type = "text",
  placeholder,
  error,
  onChange,
  value,
}) => {
  const onChangeValue: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <>
      <InputWrapper error={error}>
        <InputField
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChangeValue}
        />
      </InputWrapper>
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </>
  );
};

export default TextInput;

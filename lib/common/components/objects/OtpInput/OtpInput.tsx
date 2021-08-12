import { useCallback, useState, useRef, memo, useLayoutEffect } from "react";

import usePrevious from "@/common/hooks/ui/usePrevious";

import { Grid, Text } from "../../atoms";
import { Input, InputProps } from "../../atoms/Input";

export type IDigitInputProps = InputProps & {
  focus?: boolean;
};

export const DigitInput: React.FC<IDigitInputProps> = ({
  focus,
  autoFocus,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);

  useLayoutEffect(() => {
    if (inputRef && inputRef.current) {
      if (focus && autoFocus) {
        inputRef.current.focus();
      }
      if (focus && autoFocus && focus !== prevFocus) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
  }, [autoFocus, focus, prevFocus]);
  return <Input textAlign="center" ref={inputRef} {...rest} />;
};

export type IOtpInputProps = {
  length?: number;
  onChange?: (val: string) => void;
  error?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  isNumberInput?: boolean;
};

const InputComponent: React.FC<IOtpInputProps> = ({
  length = 4,
  error,
  autoFocus,
  onChange,
  isNumberInput = true,
  disabled = false,
}) => {
  // Define state activeInput = 0
  const [activeInput, setActiveInput] = useState(0);
  const [otpValues, setOTPValues] = useState(new Array(length).fill(""));

  // Helper to return OTP from inputs
  const handleOtpChange = useCallback(
    (otp: string[]) => {
      const otpValue = otp.join("");
      if (onChange) {
        onChange(otpValue);
      }
    },
    [onChange]
  );

  // Helper to return value with the right type: 'text' or 'number'
  const getRightValue = useCallback(
    (str: string) => {
      const changedValue = str;
      if (!isNumberInput) {
        return changedValue;
      }
      return !changedValue || /\d/.test(changedValue) ? changedValue : "";
    },
    [isNumberInput]
  );

  // Change OTP value at focussing input
  const changeCodeAtFocus = useCallback(
    (str: string) => {
      const updatedOTPValues = [...otpValues];
      updatedOTPValues[activeInput] = str[0] || "";
      setOTPValues(updatedOTPValues);
      handleOtpChange(updatedOTPValues);
    },
    [activeInput, handleOtpChange, otpValues]
  );

  // Focus `inputIndex` input
  const focusInput = useCallback(
    (inputIndex: number) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveInput(selectedIndex);
    },
    [length]
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeInput - 1);
  }, [activeInput, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeInput + 1);
  }, [activeInput, focusInput]);

  // Handle onFocus input
  const handleOnFocus = useCallback(
    (index: number) => () => {
      focusInput(index);
    },
    [focusInput]
  );

  // Handle onChange value for each input
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = getRightValue(e.currentTarget.value);
      if (!val) {
        e.preventDefault();
        return;
      }
      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput, getRightValue]
  );

  // Hanlde onBlur input
  const onBlur = useCallback(() => {
    setActiveInput(-1);
  }, []);

  // Handle onKeyDown input
  const handleOnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Backspace":
        case "Delete": {
          e.preventDefault();
          if (otpValues[activeInput]) {
            changeCodeAtFocus("");
          } else {
            focusPrevInput();
          }
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          focusPrevInput();
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          focusNextInput();
          break;
        }
        case " ": {
          e.preventDefault();
          break;
        }
        default:
          break;
      }
    },
    [activeInput, changeCodeAtFocus, focusNextInput, focusPrevInput, otpValues]
  );

  const handleOnPaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text/plain")
        .trim()
        .slice(0, length - activeInput)
        .split("");
      if (pastedData) {
        let nextFocusIndex = 0;
        const updatedOTPValues = [...otpValues];
        updatedOTPValues.forEach((val, index) => {
          if (index >= activeInput) {
            const changedValue = getRightValue(pastedData.shift() || val);
            if (changedValue) {
              updatedOTPValues[index] = changedValue;
              nextFocusIndex = index;
            }
          }
        });
        setOTPValues(updatedOTPValues);
        setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
      }
    },
    [activeInput, getRightValue, length, otpValues]
  );

  return (
    <>
      <Grid gridTemplateColumns={`repeat(${length}, 56px)`} gridColumnGap={16}>
        {Array(length)
          .fill("")
          .map((_, index) => (
            <DigitInput
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              focus={activeInput === index}
              value={otpValues && otpValues[index]}
              autoFocus={autoFocus}
              onFocus={handleOnFocus(index)}
              onChange={handleOnChange}
              onKeyDown={handleOnKeyDown}
              onBlur={onBlur}
              onPaste={handleOnPaste}
              disabled={disabled}
            />
          ))}
      </Grid>
      {error && <Text>{error}</Text>}
    </>
  );
};

export const OtpInput = memo(InputComponent);

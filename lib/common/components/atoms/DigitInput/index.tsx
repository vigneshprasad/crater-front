import usePrevious from "lib/common/hooks/ui/usePrevious";

import { useLayoutEffect, useRef, memo } from "react";

import { InputDigit } from "../OtpInput/styles";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  focus?: boolean;
}

const DigitInput: React.FC<IProps> = (props) => {
  const { focus, autoFocus, ...rest } = props;
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
  return <InputDigit ref={inputRef} {...rest} />;
};

export default memo(DigitInput);

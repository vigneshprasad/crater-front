import { forwardRef, useMemo } from "react";
import styled, { useTheme } from "styled-components";

import {
  Box,
  InputContainer,
  StyledInput,
  InputProps,
  Text,
} from "../../atoms";

type IProps = InputProps;

const StyledPicker = styled(StyledInput)`
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;

function DateTimeInputWithRef({
  type = "date",
  prefixElement,
  inputRef,
  error,
  ...rest
}: IProps & {
  inputRef: React.ForwardedRef<HTMLInputElement>;
}): JSX.Element {
  const { space, colors } = useTheme();

  const border = useMemo(() => {
    return `2px solid ${error ? colors.error : "transparent"}`;
  }, [error, colors]);
  return (
    <Box>
      <InputContainer border={border}>
        {prefixElement && prefixElement}
        <StyledPicker ref={inputRef} type={type} {...rest} />
      </InputContainer>
      {error && (
        <Text
          py={space.xxxs}
          px={space.xxxs}
          color={colors.error}
          textStyle="error"
        >
          {error}
        </Text>
      )}
    </Box>
  );
}

const DateTimeInput = forwardRef<HTMLInputElement, IProps>((props, ref) => (
  <DateTimeInputWithRef {...props} inputRef={ref} />
));

DateTimeInput.displayName = "DateTimeInput";

export default DateTimeInput;

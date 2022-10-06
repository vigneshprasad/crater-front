import { forwardRef, useMemo } from "react";
import styled, { useTheme } from "styled-components";

import { Box, Text } from "../../atoms";
import { InputContainer, InputProps, StyledInput } from "../../atoms/v2";

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
  containerProps,
  ...rest
}: IProps & {
  inputRef: React.ForwardedRef<HTMLInputElement>;
}): JSX.Element {
  const { space, colors, radii } = useTheme();

  const border = useMemo(() => {
    return `1px solid ${error ? colors.error : colors.primaryLight}`;
  }, [error, colors]);
  return (
    <Box>
      <InputContainer
        px={space.xxxs}
        py={space.xxxxs}
        bg={colors.primaryBackground}
        borderRadius={radii.xxxxs}
        border={border}
        {...containerProps}
      >
        {prefixElement && prefixElement}
        <StyledPicker ref={inputRef} type={type} {...rest} />
      </InputContainer>
      {error && (
        <Text mt={space.xxxxxs} color={colors.error} textStyle="error">
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

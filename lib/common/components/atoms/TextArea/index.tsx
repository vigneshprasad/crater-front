import styled, { useTheme } from "styled-components";

import { BoxProps, GridProps } from "../System";
import { InputContainer, InputProps, StyledInput } from "../v2";

// import { StyledInput, InputContainer, InputProps } from "../Input";

export type TextAreaProps = InputProps &
  React.HTMLAttributes<HTMLTextAreaElement> & {
    inputProps?: (GridProps | BoxProps) & {
      focusBorderColor?: string;
    };
    rows?: number;
  };

const StyledTextArea = styled(StyledInput)<TextAreaProps>`
  resize: none;

  &::placeholder {
    font-size: 1.1rem;
    font-variation-settings: 700;
    text-transform: uppercase;
  }
`;

export function TextArea({
  inputProps,
  rows,
  ...rest
}: TextAreaProps): JSX.Element {
  const { space, radii } = useTheme();

  return (
    <InputContainer
      px={space.xxxxs}
      py={10}
      borderRadius={radii.xxxxs}
      {...inputProps}
    >
      <StyledTextArea as="textarea" rows={rows ?? 5} {...rest} />
    </InputContainer>
  );
}

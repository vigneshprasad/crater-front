import styled from "styled-components";

import { StyledInput, InputContainer, InputProps } from "../Input";

export type TextAreaProps = InputProps &
  React.HTMLAttributes<HTMLTextAreaElement> & {
    inputProps?: InputProps;
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
  return (
    <InputContainer {...inputProps}>
      <StyledTextArea as="textarea" rows={rows ?? 5} {...rest} />
    </InputContainer>
  );
}

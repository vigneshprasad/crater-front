import styled from "styled-components";

import { StyledInput, InputContainer, InputProps } from "../Input";

export type TextAreaProps = InputProps &
  React.HTMLAttributes<HTMLTextAreaElement> & {
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

export function TextArea({ ...rest }: TextAreaProps): JSX.Element {
  return (
    <InputContainer>
      <StyledTextArea as="textarea" rows={5} {...rest} />
    </InputContainer>
  );
}

import { HTMLAttributes } from "react";
import styled from "styled-components";

import { Input, InputProps } from "../Input";

export type TextAreaProps = InputProps & HTMLAttributes<HTMLTextAreaElement>;

const StyledTextArea = styled(Input)<TextAreaProps>`
  resize: none;
`;

export const TextArea: React.FC<TextAreaProps> = ({ ...rest }) => {
  return <StyledTextArea as="textarea" rows={5} {...rest} />;
};

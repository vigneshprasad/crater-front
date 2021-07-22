import styled, { css } from "styled-components";

import { MouseEventHandler } from "react";

interface IProps {
  label: string;
  type?: "button" | "submit";
  onClick?: MouseEventHandler<HTMLInputElement>;
}

// Styles
const StyledButton = styled.input`
  transition: all 200ms ease-in;
  min-height: 48px;
  cursor: pointer;
  ${(props) => {
    const { textThemes, pallete } = props.theme;
    return css`
      ${textThemes.button}
      background: ${pallete.primary};
      box-shadow: none;
      border: 2px solid ${pallete.primary};
      border-radius: 12px;
    `;
  }}

  &:hover {
    background: #466bff;
    box-shadow: 0px 0px 2px;
  }
`;

const Button: React.FC<IProps> = ({ label, type = "button", ...props }) => (
  <StyledButton value={label} type={type} {...props} />
);

export default Button;

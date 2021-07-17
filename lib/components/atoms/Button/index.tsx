import styled, { css } from "styled-components";

import { MouseEventHandler } from "react";

interface IProps {
  label: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

// Styles
const StyledButton = styled.button`
  min-height: 48px;
  transition: all 200ms ease-in;
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

const Button: React.FC<IProps> = ({ label, ...props }) => (
  <StyledButton type="submit" {...props}>
    {label}
  </StyledButton>
);

export default Button;

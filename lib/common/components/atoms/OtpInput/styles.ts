import styled, { css } from "styled-components";

export const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 48px);
  grid-gap: ${(props) => props.theme.margins.lg};
  min-height: 48px;
`;

export const InputDigit = styled.input<{ error?: string }>`
  outline: none;
  text-align: center;
  background: ${(props) => props.theme.pallete.darkCard};
  border-radius: 8px;
  box-shadow: none;
  border: 2px solid transparent;
  color: ${(props) => props.theme.pallete.textPrimary};
  ${(props) => props.theme.textThemes.headline6}

  ${(props) =>
    props.error &&
    css`
      border: 2px solid ${props.theme.pallete.error};
    `}

  &:focus {
    border: 2px solid ${(props) => props.theme.pallete.primary};
  }
`;

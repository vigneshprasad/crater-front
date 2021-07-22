import { motion } from "framer-motion";
import styled, { css } from "styled-components";

import {
  InputField,
  InputWrapper,
  ErrorLabel,
} from "../../../../../common/components/atoms/TextInput/styles";

export const RootContainer = styled(motion.div)`
  position: relative;
  z-index: 100;
`;

export const PhoneInputWrapper = styled(InputWrapper)`
  grid-template-columns: minmax(min-content, 42px) 1px 1fr;
  align-content: center;
`;

export const StyledInput = styled(InputField)`
  font-variation-settings: "wght" 600;

  &::placeholder {
    font-size: 1.1rem;
  }
`;

export const Divider = styled.div`
  background-color: rgba(228, 228, 228, 0.1);
`;

export const DropdownListWrapper = styled(motion.div)`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 12px;
  padding: 36px 0 8px 0;
  background: ${(props) => props.theme.pallete.dark};
  border: 2px inset rgba(228, 228, 228, 0.1);
  z-index: -1;
  max-height: 212px;
  overflow: scroll;
`;

export const DropdownItem = styled(motion.div)<{ selected: boolean }>`
  display: grid;
  grid-template-columns: 24px 1fr;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  align-items: center;
  background-color: ${(props) =>
    props.selected ? props.theme.pallete.primary : "transparent"};

  ${(props) => {
    const { textThemes, margins } = props.theme;
    return css`
      ${textThemes.menu}
      padding: ${margins.med} ${margins.lg};
      grid-column-gap: ${margins.med};
    `;
  }}

  &:hover {
    background-color: ${(props) => props.theme.pallete.primary};
  }

  & > p {
    ${(props) => props.theme.textThemes.menu};
  }
`;

export const Flag = styled.span`
  font-size: 2rem;
`;

export const Error = styled(ErrorLabel)``;

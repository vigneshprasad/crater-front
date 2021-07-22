import { motion } from "framer-motion";
import styled from "styled-components";

export const InputField = styled.input`
  width: 100%;
  background: none;
  outline: none;
  border: none;
  ${(props) => props.theme.textThemes.body}

  /* Change the white to any color */
  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active {
    box-shadow: 0 0 0 30px rgba(255, 255, 255, 0.8) inset !important;
    -webkit-box-shadow: 0 0 0 50px ${(props) => props.theme.pallete.primary}
      inset !important;
    border-radius: 4px;
    -webkit-text-fill-color: #fff;
  }

  &::placeholder {
    font-family: Inter;
    font-size: 1rem;
    font-variation-settings: "wght" 700;
    color: ${(props) => props.theme.pallete.textTertiary};
    text-transform: uppercase;
  }
`;

export const InputWrapper = styled(motion.div)<{ error?: string }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: ${(props) => props.theme.margins.sm};
  padding: 16px;
  background: ${(props) => props.theme.pallete.secondaryDark};
  border-radius: 12px;
  transition: background 200ms ease-in-out;
  border: 2px solid
    ${(props) => (props.error ? props.theme.pallete.error : "transparent")};
  height: min-content;

  &:focus-within {
    background: ${(props) => props.theme.pallete.darkCard};
    border: 2px solid ${(props) => props.theme.pallete.primary};
  }
`;

export const ErrorLabel = styled.p`
  ${(props) => props.theme.textThemes.bodySmall}
  color: ${(props) => props.theme.pallete.error};
`;

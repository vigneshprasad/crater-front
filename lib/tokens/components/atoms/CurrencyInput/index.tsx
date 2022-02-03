import {
  default as CurrencyInputComponent,
  CurrencyInputProps,
} from "react-currency-input-field";
import styled from "styled-components";

import { Box } from "@/common/components/atoms";

const Styles = styled(Box)`
  padding: 6px 8px;
  background: ${({ theme }) => theme.colors.black[2]};
  border-radius: ${({ theme }) => theme.radii.xxs}px;
  align-items: center;

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.colors.accent};
  }

  input {
    font-family: ${({ theme }) => theme.fonts.body};
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 2.4rem;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.white[0]};
    background: transparent;
    box-shadow: none;
    border: 2px solid transparent;
    outline: none;
    width: 100%;

    &::placeholder {
      font-size: 1.1rem;
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`;

export default function CurrencyInput({
  ...props
}: CurrencyInputProps): JSX.Element {
  return (
    <Styles>
      <CurrencyInputComponent
        allowNegativeValue={false}
        prefix="₹"
        {...props}
      />
    </Styles>
  );
}

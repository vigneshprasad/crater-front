import { FormEvent, useState } from "react";
import styled, { useTheme } from "styled-components";

import { Box, BoxProps } from "../System";

export type RangeInputProps = BoxProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    initialValue?: number;
  };

const StyledInput = styled(Box)`
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: #d5d5d5;
  border-radius: 4px;
  height: 4px;
  outline: none;

  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 4px;
  }

  &::-moz-range-track {
    -moz-appearance: none;
    height: 4px;
  }

  &::-ms-track {
    appearance: none;
    height: 4px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.accent};
    cursor: pointer;
    margin-top: -5px;
  }

  &::-moz-range-thumb {
    -moz-appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.accent};
    cursor: pointer;
    margin-top: -5px;
  }

  &::-ms-thumb {
    appearance: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.accent};
    cursor: pointer;
    margin-top: -5px;
  }
`;

export default function RangeInput({
  initialValue = 50,
  max = 100,
  ...rest
}: RangeInputProps): JSX.Element {
  const { colors } = useTheme();
  const [progressPercent, setProgressPercent] = useState(
    (initialValue / (max as number)) * 100
  );

  return (
    <Box>
      <StyledInput
        min={0}
        max={max}
        {...rest}
        as="input"
        type="range"
        background={`linear-gradient(to right, ${colors.accent}, ${progressPercent}%, #d5d5d5 ${progressPercent}%)`}
        onInput={(event: FormEvent<HTMLInputElement>) => {
          const max = parseInt(event.currentTarget.max);
          const value = parseInt(event.currentTarget.value);
          const valPercent = (value / max) * 100;
          setProgressPercent(valPercent);
        }}
      />
    </Box>
  );
}

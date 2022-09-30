import { useState } from "react";
import styled, { useTheme } from "styled-components";

import { Box } from "@/common/components/atoms";

const SeekBar = styled.input`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */
  position: relative;
  margin: 8px 0;

  &::-webkit-slider-thumb {
    cursor: pointer;
    -webkit-appearance: none;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    margin-top: 0px;
    transition: all 200ms ease-in-out;

    :hover {
      height: 12px;
      width: 12px;
      margin-top: 0px;
    }
  }

  /* All the same stuff for Firefox */
  &::-moz-range-thumb {
    cursor: pointer;
    -webkit-appearance: none;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    transition: all 200ms ease-in-out;

    :hover {
      height: 12px;
      width: 12px;
    }
  }

  /* All the same stuff for IE */
  &::-ms-thumb {
    cursor: pointer;
    -webkit-appearance: none;
    height: 8px;
    width: 8px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accent};
    transition: all 200ms ease-in-out;

    :hover {
      height: 12px;
      width: 12px;
    }
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    cursor: pointer;
  }

  &::-moz-range-track {
    width: 100%;
    cursor: pointer;
  }

  &::-ms-track {
    width: 100%;
    cursor: pointer;
  }
`;

export default function VideoSeekbar(): JSX.Element {
  const { colors } = useTheme();
  const [value, setValue] = useState(50);
  return (
    <Box position="relative">
      {/* Track */}
      <Box
        left={0}
        right={0}
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        h={2}
        bg={colors.textPrimary}
        pointerEvents="none"
      />

      {/* Track Progress */}
      <Box
        width={`${value}%`}
        position="absolute"
        top="50%"
        transform="translateY(-50%)"
        h={2}
        bg={colors.accent}
        pointerEvents="none"
      />

      <SeekBar
        type="range"
        value={value}
        onChange={(event) => {
          const updated = parseInt(event.target.value, 10);
          setValue(updated);
        }}
      />
    </Box>
  );
}

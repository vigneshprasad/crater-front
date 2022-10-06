import { ChangeEvent, useCallback, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { Box } from "@/common/components/atoms";

type IProps = React.InputHTMLAttributes<HTMLInputElement> & {
  buffered?: number;
};

const SeekBar = styled.input<IProps>`
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

  &:disabled {
    &::-webkit-slider-runnable-track {
      width: 100%;
      cursor: none;
    }

    &::-moz-range-track {
      width: 100%;
      cursor: none;
    }

    &::-ms-track {
      width: 100%;
      cursor: none;
    }

    &::-webkit-slider-thumb {
      cursor: none;
      -webkit-appearance: none;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.primaryDark};
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
      cursor: none;
      -webkit-appearance: none;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.primaryDark};
      transition: all 200ms ease-in-out;

      :hover {
        height: 12px;
        width: 12px;
      }
    }

    /* All the same stuff for IE */
    &::-ms-thumb {
      cursor: none;
      -webkit-appearance: none;
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.primaryDark};
      transition: all 200ms ease-in-out;

      :hover {
        height: 12px;
        width: 12px;
      }
    }
  }
`;

export default function VideoSeekbar({
  value: controlledValue,
  disabled,
  buffered,
  onChange,
  ...rest
}: IProps): JSX.Element {
  const { colors } = useTheme();
  const [value, setValue] = useState(controlledValue ?? 0);

  useEffect(() => {
    if (controlledValue) {
      setValue(controlledValue);
    }
  }, [controlledValue, setValue]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!controlledValue) {
        const updated = parseInt(event.target.value, 10);
        setValue(updated);
      }

      if (onChange) {
        onChange(event);
      }
    },
    [onChange, setValue, controlledValue]
  );

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
        bg={
          disabled
            ? colors.primaryLight
            : buffered
            ? "#575757"
            : colors.textPrimary
        }
        pointerEvents="none"
      />

      {buffered !== undefined && (
        <Box
          width={`${buffered}%`}
          position="absolute"
          top="50%"
          transform="translateY(-50%)"
          h={2}
          bg={colors.textPrimary}
          pointerEvents="none"
        />
      )}

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
        {...rest}
        disabled={disabled}
        type="range"
        value={value}
        onChange={handleOnChange}
      />
    </Box>
  );
}

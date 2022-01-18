import { useState, useCallback, useMemo } from "react";
import { useTheme } from "styled-components";

import { Grid, Box, Text } from "@/common/components/atoms";
import IconButton from "@/common/components/atoms/IconButton";

interface IProps {
  label?: string;
  step?: number;
  valueSuffix?: string | React.ReactNode;
  value?: number;
  onChange?: (val: number) => void;
}

export default function QuantityPicker({
  step = 1,
  label = "Quantity",
  valueSuffix,
  value: controlledValue,
  onChange,
}: IProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  const [value, setValue] = useState(1);

  const handleIncrement = useCallback(() => {
    setValue((val) => {
      if (onChange) {
        onChange(val + step);
      }
      return val + step;
    });
  }, [setValue, step, onChange]);

  const handleDecrement = useCallback(() => {
    if (value >= step) {
      setValue((val) => {
        if (onChange) {
          onChange(val - step);
        }
        return val - step;
      });
    }
  }, [setValue, step, value, onChange]);

  const displayValue = useMemo(() => {
    if (controlledValue) {
      return controlledValue;
    }
    return value;
  }, [controlledValue, value]);

  return (
    <Box>
      <Text
        mb={space.xxxs}
        px={space.xxxs}
        textStyle="label"
        fontSize="1.2rem"
        color={colors.white[0]}
      >
        {label}
      </Text>
      <Grid
        px={space.xxs}
        py={space.xxxs}
        bg={colors.black[2]}
        gridTemplateColumns="1fr max-content max-content"
        alignItems="center"
        borderRadius={radii.xs}
        gridGap={space.xxs}
      >
        <Box>
          <Text fontSize="1.8rem">
            {displayValue}
            {valueSuffix}
          </Text>
        </Box>

        <IconButton
          onClick={handleIncrement}
          variant="roundSmall"
          icon="Add"
          iconProps={{ color: colors.white[0], fill: true, size: 16 }}
        />

        <IconButton
          onClick={handleDecrement}
          variant="roundSmall"
          icon="Remove"
          iconProps={{ color: colors.white[0], fill: true, size: 16 }}
        />
      </Grid>
    </Box>
  );
}

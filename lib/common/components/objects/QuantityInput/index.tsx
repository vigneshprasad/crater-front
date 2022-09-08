import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { Flex, Box, Text } from "../../atoms";
import { IconButton, Input } from "../../atoms/v2";

interface IProps {
  label?: string;
  value?: number;
  initial?: number;
  onChange?: (val: number) => void;
}

export default function QuantityInput({
  value: controlledValue,
  initial,
  label,
  onChange,
}: IProps): JSX.Element {
  const [value, setValue] = useState(initial ?? 1);
  const { space } = useTheme();

  useEffect(() => {
    controlledValue && setValue(controlledValue);
  }, [controlledValue]);

  const incrementValue = (): void => {
    const newValue = value + 1;
    if (onChange) {
      onChange(newValue);
    } else {
      setValue(newValue);
    }
  };

  const decrementValue = (): void => {
    const newValue = value - 1;
    if (newValue > 1) {
      if (onChange) {
        onChange(newValue);
      } else {
        setValue(newValue);
      }
    }
  };

  return (
    <Box w="min-content">
      {label && (
        <Text pb={space.xxxxs} textStyle="inputLabel">
          {label}
        </Text>
      )}
      <Flex alignItems="center" justifyContent="center" gridGap={space.xxxxs}>
        <IconButton
          buttonStyle="rounded-sqaure-med"
          icon="Subtract"
          onClick={decrementValue}
        />
        <Input
          type="number"
          width={56}
          value={value}
          textAlign="center"
          onChange={(event) => {
            const newValue = event.target.value;

            const exp = RegExp(/^[0-9]*$/);
            const valid = exp.test(newValue);
            if (!onChange) {
              valid && setValue(parseInt(newValue, 10));
            } else {
              valid && onChange(parseInt(newValue, 10));
            }
          }}
        />
        <IconButton
          buttonStyle="rounded-sqaure-med"
          icon="Add"
          onClick={incrementValue}
        />
      </Flex>
    </Box>
  );
}

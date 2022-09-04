import { useState } from "react";
import { useTheme } from "styled-components";

import { Flex, Box, Text } from "../../atoms";
import { IconButton, Input } from "../../atoms/v2";

interface IProps {
  label?: string;
  value?: number;
  initial?: number;
}

export default function QuantityInput({ initial, label }: IProps): JSX.Element {
  const [value, setValue] = useState(initial ?? 1);
  const { space } = useTheme();

  return (
    <Box w="min-content">
      {label && (
        <Text pb={space.xxxxs} textStyle="inputLabel">
          {label}
        </Text>
      )}
      <Flex alignItems="center" justifyContent="center" gridGap={space.xxxxs}>
        <IconButton buttonStyle="rounded-sqaure-med" icon="Subtract" />
        <Input
          type="number"
          width={56}
          value={value}
          textAlign="center"
          onChange={(event) => {
            const newValue = event.target.value;

            const exp = RegExp(/^[0-9]*$/);
            const valid = exp.test(newValue);
            valid && setValue(parseInt(newValue, 10));
          }}
        />
        <IconButton buttonStyle="rounded-sqaure-med" icon="Add" />
      </Flex>
    </Box>
  );
}

import { useTheme } from "styled-components";

import { Box, BoxProps } from "../../atoms";

interface IProps extends BoxProps {
  percent: number;
  barProps?: BoxProps;
}

export default function ProgressBar({
  percent,
  barProps,
  ...rest
}: IProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <Box
      h={6}
      w="100%"
      margin="auto 0"
      backgroundColor={colors.black[4]}
      borderRadius={3}
      {...rest}
    >
      <Box
        h="100%"
        w={`${percent}%`}
        backgroundColor="#8884d8"
        left={0}
        top={0}
        borderRadius={3}
        {...barProps}
      />
    </Box>
  );
}

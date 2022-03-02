import { useTheme } from "styled-components";

import { Box } from "../../atoms";

type IProps = {
  percent: number;
};

export default function ProgressBar({ percent }: IProps): JSX.Element {
  const { colors } = useTheme();

  return (
    <Box
      h={6}
      w="100%"
      margin="auto 0"
      backgroundColor={colors.black[4]}
      borderRadius={3}
    >
      <Box
        h="100%"
        w={`${percent}%`}
        backgroundColor="#8884d8"
        left={0}
        top={0}
        borderRadius={3}
      />
    </Box>
  );
}

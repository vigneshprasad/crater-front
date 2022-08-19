import { useTheme } from "styled-components";

import { Box } from "@/common/components/atoms";

export default function StorePage(): JSX.Element {
  const { space } = useTheme();

  return (
    <Box pt={space.xxs} px={space.m} pb={36}>
      Store Page
    </Box>
  );
}

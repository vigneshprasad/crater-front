import { useTheme } from "styled-components";

import { Box, Text } from "@/common/components/atoms";
import { useCreator } from "@/creators/context/CreatorContext";

export default function AboutTab(): JSX.Element {
  const { creator } = useCreator();
  const { space } = useTheme();
  if (!creator) return <Box>Loading...</Box>;
  return (
    <Box px={[space.m]} py={[space.s]}>
      <Text textStyle="headline6">About Me</Text>
      <Text>{creator.profile_properties?.introduction}</Text>
    </Box>
  );
}

import { Box, Text } from "@/common/components/atoms";
import { theme } from "@/common/theme";
import { Creator } from "@/creators/types/creator";

const { space } = theme;

type IProps = {
  creator: Creator;
};

export default function AboutTab({ creator }: IProps): JSX.Element {
  return (
    <Box px={[space.m]} py={[space.s]}>
      <Text textStyle="headline6">About Me</Text>
      <Text>{creator.about}</Text>
    </Box>
  );
}

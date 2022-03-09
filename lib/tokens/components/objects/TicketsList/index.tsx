import { useTheme } from "styled-components";

import { Box, Flex, FlexProps, Shimmer } from "@/common/components/atoms";
import { Reward } from "@/tokens/types/token";

type IProps = FlexProps & {
  rewards?: Reward[];
  loading: boolean;
  renderList: (rewards: Reward[]) => JSX.Element[];
};

export default function TicketsList({
  rewards,
  renderList,
  ...rest
}: IProps): JSX.Element {
  const { space } = useTheme();
  if (!rewards) {
    return (
      <Box {...rest}>
        {Array(3)
          .fill("")
          .map((_, i) => {
            return <Shimmer h={44} key={i} />;
          })}
      </Box>
    );
  }
  return (
    <Box overflowY="auto" {...rest}>
      <Flex
        flexDirection="column"
        px={space.xxs}
        py={space.xxs}
        gridGap={space.xxs}
        {...rest}
      >
        {renderList(rewards)}
      </Flex>
    </Box>
  );
}

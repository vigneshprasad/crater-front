import { useTheme } from "styled-components";

import { Box, Text } from "@/common/components/atoms";
import useRewardsList from "@/tokens/context/RewardsListContext";

import RewardsList from "../../objects/RewardsList";

export default function RewardsTab(): JSX.Element {
  const { rewards, loading } = useRewardsList();
  const { space } = useTheme();

  return (
    <Box px={space.s} h="max-content">
      <Text my={space.xs} fontSize={["1.6rem"]}>
        Use tokens to claim tickets that provide access to exclusive
        content/time
      </Text>

      <RewardsList rewards={rewards} loading={loading} />
    </Box>
  );
}

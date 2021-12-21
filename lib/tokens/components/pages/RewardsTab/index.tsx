import { useTheme } from "styled-components";

import { Box } from "@/common/components/atoms";
import useRewardsList from "@/tokens/context/RewardsListContext";

import RewardsList from "../../objects/RewardsList";

export default function RewardsTab(): JSX.Element {
  const { rewards, loading } = useRewardsList();
  const { space } = useTheme();

  return (
    <Box py={space.xs} px={space.xs} h="max-content">
      <RewardsList rewards={rewards} loading={loading} />
    </Box>
  );
}

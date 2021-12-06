import { useTheme } from "styled-components";

import { Box } from "@/common/components/atoms";
import useRewardsList from "@/tokens/context/RewardsListContext";

import RewardCard from "../../../../creators/components/objects/RewardCard";
import RewardsList from "../../objects/RewardsList";

export default function RewardsTab(): JSX.Element {
  const { rewards, loading } = useRewardsList();
  const { space } = useTheme();

  return (
    <Box py={space.xxs} px={space.xxs} h="max-content">
      <RewardsList
        rewards={rewards}
        loading={loading}
        renderChild={(reward) => <RewardCard reward={reward} key={reward.id} />}
      />
    </Box>
  );
}

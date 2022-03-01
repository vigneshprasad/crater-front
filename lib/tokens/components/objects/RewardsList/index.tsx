import { useTheme } from "styled-components";

import { Grid } from "@/common/components/atoms";
import { Reward } from "@/tokens/types/token";

import RewardCard from "../RewardCard";

interface IProps {
  rewards?: Reward[];
  loading: boolean;
  onClickReward?: (reward: Reward) => void;
}

export default function RewardsList({
  rewards,
  onClickReward,
}: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <Grid
      gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
      py={space.s}
      gridGap={space.xxs}
      alignItems="start"
    >
      {rewards &&
        rewards.map((reward) => (
          <RewardCard
            cursor="pointer"
            key={reward.id}
            reward={reward}
            onClick={() => {
              onClickReward && onClickReward(reward);
            }}
          />
        ))}
    </Grid>
  );
}

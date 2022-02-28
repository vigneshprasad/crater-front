import { useTheme } from "styled-components";

import { Grid } from "@/common/components/atoms";
import { Reward } from "@/tokens/types/token";

import RewardCard from "../RewardCard";

interface IProps {
  rewards?: Reward[];
  loading: boolean;
}

export default function RewardsList({ rewards }: IProps): JSX.Element {
  const { space } = useTheme();

  return (
    <Grid
      gridTemplateColumns="repeat(auto-fill, minmax(320px, 1fr))"
      py={space.s}
      gridGap={space.xxs}
      alignItems="start"
    >
      {rewards &&
        rewards.map((reward) => <RewardCard key={reward.id} reward={reward} />)}
    </Grid>
  );
}

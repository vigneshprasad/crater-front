import { AnimatedBoxProps } from "@/common/components/atoms";
import { Reward } from "@/tokens/types/tokens";

import RewardCardLarge from "./RewardCardLarge";
import RewardCardSmall from "./RewardCardSmall";

export interface IRewardCardProps extends AnimatedBoxProps {
  type: "small" | "large";
  reward: Reward;
}

export function RewardCard({
  type,
  reward,
  ...rest
}: IRewardCardProps): JSX.Element {
  if (type === "large") {
    return <RewardCardLarge reward={reward} {...rest} />;
  }

  return <RewardCardSmall reward={reward} {...rest} />;
}

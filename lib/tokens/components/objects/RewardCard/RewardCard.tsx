import { AnimatedBoxProps } from "@/common/components/atoms";
import { Reward } from "@/tokens/types/token";

import RewardCardLarge from "./RewardCardLarge";
import RewardCardSmall from "./RewardCardSmall";

export interface IRewardCardProps extends AnimatedBoxProps {
  type: "small" | "large";
  reward: Reward;
  showAvatar?: boolean;
}

export function RewardCard({
  type,
  reward,
  showAvatar = true,
  ...rest
}: IRewardCardProps): JSX.Element {
  if (type === "large") {
    return (
      <RewardCardLarge showAvatar={showAvatar} reward={reward} {...rest} />
    );
  }

  return <RewardCardSmall reward={reward} {...rest} />;
}

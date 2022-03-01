import { GridProps } from "@/common/components/atoms";
import { Reward } from "@/tokens/types/token";

import JoinLiveStreamCard from "./JoinLiveStreamCard";
import OneOnOneRewardCard from "./OneOnOneRewardCard";

export interface RewardCardProps extends GridProps {
  reward: Reward;
  showCount?: JSX.Element;
}

export default function RewardCard({ ...props }: RewardCardProps): JSX.Element {
  const { reward } = props;
  if (reward.type_detail.name === "Join Livestream") {
    return <JoinLiveStreamCard {...props} />;
  }
  return <OneOnOneRewardCard {...props} />;
}

import { Reward } from "@/tokens/types/token";

import JoinLiveStreamCard from "./JoinLiveStreamCard";
import OneOnOneRewardCard from "./OneOnOneRewardCard";

interface IProps {
  reward: Reward;
}

export default function RewardCard({ reward }: IProps): JSX.Element {
  if (reward.type_detail.name === "Join Livestream") {
    return <JoinLiveStreamCard reward={reward} />;
  }
  return <OneOnOneRewardCard reward={reward} />;
}

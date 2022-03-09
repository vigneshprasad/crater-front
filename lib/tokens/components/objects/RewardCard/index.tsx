import { GridProps } from "@/common/components/atoms";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import { Reward } from "@/tokens/types/token";

import DiscordRewardCard from "./DiscordRewardCard";
import JoinLiveStreamCard from "./JoinLiveStreamCard";
import OneOnOneRewardCard from "./OneOnOneRewardCard";

export interface RewardCardProps extends GridProps {
  reward: Reward;
  showCount?: JSX.Element;
}

export default function RewardCard({ ...props }: RewardCardProps): JSX.Element {
  const { reward, onClick } = props;
  const { track } = useAnalytics();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    track(AnalyticsEvents.reward_card_clicked, { rewardId: reward.id });
    onClick && onClick(event);
  };

  if (reward.type_detail.name === "Join Livestream") {
    return <JoinLiveStreamCard {...props} onClick={handleClick} />;
  }
  if (reward.type_detail.name === "Join Exclusive Community") {
    return <DiscordRewardCard {...props} onClick={handleClick} />;
  }
  return <OneOnOneRewardCard {...props} onClick={handleClick} />;
}

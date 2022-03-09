import { Text } from "@/common/components/atoms";
import { UserReward } from "@/tokens/types/exchange";

import RewardCard from "../RewardCard";

type IProps = {
  userReward: UserReward;
};

export default function UserRewardItem({ userReward }: IProps): JSX.Element {
  const { reward_detail, quantity } = userReward;

  return (
    <RewardCard reward={reward_detail} showCount={<Text>{quantity}</Text>} />
  );
}

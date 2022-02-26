import { useTheme } from "styled-components";

import { Text, Flex } from "@/common/components/atoms";
import useBidsList from "@/tokens/context/BidListContext";
import useUserRewardList from "@/tokens/context/UserRewardListContext";

import TransactionDataTable from "../../objects/TransactionDataTable";
import UserRewardItem from "../../objects/UserRewardItem";
import UserRewardList from "../../objects/UserRewardList";

export default function HubPortfolioTab(): JSX.Element {
  const { space } = useTheme();
  const { bids } = useBidsList();
  const { userRewards } = useUserRewardList();
  console.log(userRewards);

  return (
    <Flex px={space.s} py={space.xs} gridGap={space.s} flexDirection="column">
      <Text textStyle="title">Your Tickets</Text>
      <UserRewardList
        userRewards={userRewards}
        renderList={(items) => {
          return items.map((userReward) => {
            return (
              <UserRewardItem userReward={userReward} key={userReward.id} />
            );
          });
        }}
      />
      <Text textStyle="title">Transaction Log</Text>
      <TransactionDataTable bids={bids} />
    </Flex>
  );
}

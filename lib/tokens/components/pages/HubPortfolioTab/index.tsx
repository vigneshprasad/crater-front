import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Text, Flex } from "@/common/components/atoms";
import BidPaymentSuccessCard from "@/payments/components/objects/BidPaymentSuccessCard";
import useBidsList from "@/tokens/context/BidListContext";
import useUserRewardList from "@/tokens/context/UserRewardListContext";

import TransactionDataTable from "../../objects/TransactionDataTable";
import UserRewardItem from "../../objects/UserRewardItem";
import UserRewardList from "../../objects/UserRewardList";

export default function HubPortfolioTab(): JSX.Element {
  const [showSuccess, setSuccess] = useState(false);
  const { space } = useTheme();
  const { bids } = useBidsList();
  const { userRewards, loading: loadingUserRewards } = useUserRewardList();
  const router = useRouter();

  useEffect(() => {
    if (router.query.bid_payment_success) {
      console.log(router.query.bid_payment_success);
      setSuccess(true);
    }
  }, [router]);

  return (
    <>
      {showSuccess && <BidPaymentSuccessCard />}
      <Flex px={space.s} py={space.xs} gridGap={space.s} flexDirection="column">
        <Text textStyle="title">Your Tickets</Text>
        <UserRewardList
          loading={loadingUserRewards}
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
    </>
  );
}

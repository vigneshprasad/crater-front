import STATIC_IMAGES from "public/images";
import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";
import { useRouter } from "next/router";

import { Text, Flex, Box } from "@/common/components/atoms";
import BidPaymentSuccessCard from "@/payments/components/objects/BidPaymentSuccessCard";
import useBidsList from "@/tokens/context/BidListContext";
import useUserRewardList from "@/tokens/context/UserRewardListContext";

import StaticAuctionInfo from "../../objects/StaticAuctionInfo";
import TransactionDataTable from "../../objects/TransactionDataTable";
import UserRewardItem from "../../objects/UserRewardItem";
import UserRewardList from "../../objects/UserRewardList";

// import HubMyReferrals from "../HubMyReferrals";

export default function HubPortfolioTab(): JSX.Element {
  const [showSuccess, setSuccess] = useState(false);
  const { space, radii } = useTheme();
  const { bids } = useBidsList();
  const { userRewards, loading: loadingUserRewards } = useUserRewardList();
  const router = useRouter();

  useEffect(() => {
    if (router.query.bid_payment_success) {
      setSuccess(true);
    }
  }, [router]);

  if (bids && userRewards) {
    if (bids.length == 0 && userRewards.length == 0) {
      return (
        <>
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gridGap={space.xxs}
          >
            <Box
              position="relative"
              w={240}
              borderRadius={radii.xs}
              overflow="hidden"
            >
              <Image src={STATIC_IMAGES.ImageAuctionInactive} alt="" />
            </Box>

            <Text textStyle="title">You haven&apos;t placed any bids yet!</Text>
            <Text fontSize="1.5rem">
              Auctions are where you bid on exclusive content, communities or
              time with your favourite creators
            </Text>
            <Text textStyle="title">How it works</Text>
            <StaticAuctionInfo />
          </Flex>

          {/* <HubMyReferrals /> */}
        </>
      );
    }
  }

  return (
    <>
      {showSuccess && <BidPaymentSuccessCard />}
      <Flex py={space.xxs} gridGap={space.s} flexDirection="column">
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
      {/* <HubMyReferrals /> */}
      <Box h={space.m} />
    </>
  );
}

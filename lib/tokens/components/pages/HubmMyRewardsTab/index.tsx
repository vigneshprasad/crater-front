import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import Image from "next/image";

import { Grid, Text, Flex, Box, Shimmer } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { AUCTION_LEARN_MORE_URL } from "@/common/constants/url.constants";
import { Creator } from "@/creators/types/creator";
import useBidsList from "@/tokens/context/BidListContext";
import useRewardsList from "@/tokens/context/RewardsListContext";

import BidsDataTable from "../../objects/BidsDataTable";
import BidsSummaryBox from "../../objects/BidsSummaryBox";
import RewardsList from "../../objects/RewardsList";
import StaticAuctionInfo from "../../objects/StaticAuctionInfo";

interface IProps {
  creator: Creator;
}

export default function HubmMyRewardsTab({ creator }: IProps): JSX.Element {
  const { space } = useTheme();

  const { rewards, loading } = useRewardsList();
  const { bids, mutateBids, loading: loadingBids } = useBidsList();

  if (!rewards || loading) {
    return <Shimmer />;
  }

  if (rewards.length === 0) {
    return (
      <Grid py={space.xxs} px={space.xxs}>
        <Flex
          gridGap={space.xxs}
          m="auto auto"
          flexDirection="column"
          alignItems="center"
        >
          <Box w={240}>
            <Image alt="" src={STATIC_IMAGES.ImageAuctionInactive} />
          </Box>
          <Text textStyle="title" textAlign="center">
            You haven&apos;t launched an auction yet{" "}
          </Text>
          <Text textAlign="center">
            Auctions are where you monetize access to exclusive content,
            communities, goods or time.
          </Text>
          <StaticAuctionInfo gridTemplateColumns={["1fr", "repeat(2, 1fr)"]} />

          <a target="_blank" href={AUCTION_LEARN_MORE_URL} rel="noreferrer">
            <Button variant="small" text="Learn More" />
          </a>
        </Flex>
      </Grid>
    );
  }

  return (
    <Grid
      gridTemplateColumns={["1fr", "3fr minmax(180px, 1fr)"]}
      px={space.s}
      py={space.xs}
      gridGap={space.s}
    >
      <Flex gridGap={space.s} flexDirection="column">
        <Text px={space.xxs} textStyle="title">
          Bids Placed
        </Text>
        <BidsDataTable bids={bids} mutate={mutateBids} loading={loadingBids} />
      </Flex>

      <BidsSummaryBox creator={creator.id} />

      {rewards && rewards.length > 0 && (
        <Box gridColumn={["1", "1 / span 2"]}>
          <Text px={space.xxs} py={space.s} textStyle="title">
            Tickets for sale
          </Text>
          <RewardsList rewards={rewards} loading={loading} />
        </Box>
      )}
    </Grid>
  );
}

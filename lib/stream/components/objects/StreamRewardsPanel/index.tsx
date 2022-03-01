import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import { Flex, Box, Text, Shimmer, Image } from "@/common/components/atoms";
import { Webinar } from "@/community/types/community";
import BidsListItem from "@/tokens/components/objects/BidListItem";
import BidsList from "@/tokens/components/objects/BidsList";
import StaticAuctionInfo from "@/tokens/components/objects/StaticAuctionInfo";
import TicketCard from "@/tokens/components/objects/TicketCard";
import TicketsList from "@/tokens/components/objects/TicketsList";
import useBidsList from "@/tokens/context/BidListContext";
import useRewardsList from "@/tokens/context/RewardsListContext";

import useLiveStreamPageContext from "../../page/LiveStreamPage/context";

interface IProps {
  stream: Webinar;
}

export default function StreamRewardsPanel({ stream }: IProps): JSX.Element {
  const { space, radii } = useTheme();
  const { bids, loading: loadingBids } = useBidsList();
  const { rewards, loading } = useRewardsList();
  const { setActiveReward, setTokenModalVisible } = useLiveStreamPageContext();

  const hasActiveReward = rewards?.reduce((acc, curr) => {
    if (!acc) {
      if (curr.active_auction) {
        return true;
      }
    }
    return acc;
  }, false);

  if (!rewards || loading) {
    return (
      <Flex py={space.xxs}>
        <Shimmer flex="1" />
        <Shimmer flex="1" />
      </Flex>
    );
  }

  if (rewards.length === 0 || !hasActiveReward) {
    return (
      <Flex
        px={space.s}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        gridGap={space.xxs}
      >
        <Box
          w={180}
          position="relative"
          overflow="hidden"
          borderRadius={radii.xxs}
        >
          <Image
            src={STATIC_IMAGES.ImageAuctionInactive}
            alt=""
            layout="fill"
          />
        </Box>

        <Text textStyle="title" textAlign="center">
          {stream.host_detail.name} has not launched an auction
        </Text>
        <Text textAlign="center">
          Auctions are where you monetize access to exclusive content,
          communities, goods or time.{" "}
        </Text>
        <StaticAuctionInfo gridTemplateColumns="1fr" />
      </Flex>
    );
  }

  return (
    <>
      <Flex position="relative">
        <TicketsList
          position="absolute"
          top={0}
          right={0}
          left={0}
          bottom="50%"
          rewards={rewards}
          loading={loading}
          renderList={(rewards) => {
            return rewards.map((reward) => {
              return (
                <TicketCard
                  reward={reward}
                  key={reward.id}
                  onClick={() => {
                    if (reward.active_auction) {
                      setActiveReward(reward);
                      setTokenModalVisible(true);
                    }
                  }}
                />
              );
            });
          }}
        />

        {bids && bids.length > 0 && (
          <Box
            position="absolute"
            top="52%"
            right={0}
            left={0}
            bottom={0}
            overflowY="auto"
          >
            <Text
              py={space.xxxs}
              px={space.xxs}
              fontSize="1.4rem"
              fontWeight="700"
            >
              Past Bids
            </Text>
            <BidsList
              bids={bids}
              loading={loadingBids}
              renderList={(bids) => {
                return bids.map((bid) => {
                  return <BidsListItem bid={bid} key={bid.id} />;
                });
              }}
            />
          </Box>
        )}
      </Flex>
    </>
  );
}

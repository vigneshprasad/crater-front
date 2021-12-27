import styled, { useTheme } from "styled-components";

import { Box, Grid, Text } from "@/common/components/atoms";
import { useCreator } from "@/creators/context/CreatorContext";
import AuctionDetailBox from "@/tokens/components/objects/AuctionDetailBox";
import RewardsList from "@/tokens/components/objects/RewardsList";
import useAuctionsList from "@/tokens/context/AuctionListContext";
import useRewardsList from "@/tokens/context/RewardsListContext";

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radii.xxs}px;
`;

export default function CreatorTokensTab(): JSX.Element {
  const { space } = useTheme();
  const { creator } = useCreator();
  const { auctions } = useAuctionsList();
  const { rewards, loading } = useRewardsList();
  return (
    <Box px={[space.xxs, space.s]} py={space.s}>
      <Grid gridTemplateColumns={["1fr", "1fr 1fr"]} gridGap={space.xxs}>
        <Box pt="56.25%" position="relative">
          {creator?.video && (
            <Video controls controlsList="nodownload" src={creator.video} />
          )}
        </Box>

        <AuctionDetailBox auction={auctions?.[0]} />
      </Grid>

      <Text my={space.xs} textStyle="title">
        Available Rewards
      </Text>
      <RewardsList rewards={rewards} loading={loading} split={false} />
    </Box>
  );
}

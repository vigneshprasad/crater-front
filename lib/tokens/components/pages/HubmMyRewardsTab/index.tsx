import PLACEHOLDER_GRAPH from "public/images/img_graph_coming_soon.png";
import { useTheme } from "styled-components";

import { Grid, Text, Flex, Box, Image } from "@/common/components/atoms";
import { Creator } from "@/creators/types/creator";
import useBidsList from "@/tokens/context/BidListContext";
import useRewardsList from "@/tokens/context/RewardsListContext";

import BidsDataTable from "../../objects/BidsDataTable";
import BidsSummaryBox from "../../objects/BidsSummaryBox";
import RewardsList from "../../objects/RewardsList";

interface IProps {
  creator: Creator;
}

export default function HubmMyRewardsTab({ creator }: IProps): JSX.Element {
  const { space } = useTheme();

  const { rewards, loading } = useRewardsList();
  const { bids, mutateBids, loading: loadingBids } = useBidsList();

  return (
    <Grid
      gridTemplateColumns="2fr 1fr"
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

      <Box gridColumn="1 / span 2">
        <Text px={space.xxs} py={space.s} textStyle="title">
          Price trend
        </Text>

        <Image src={PLACEHOLDER_GRAPH} alt="placeholder_graph" />
      </Box>

      {rewards && rewards.length > 0 && (
        <Box gridColumn="1 / span 2">
          <Text px={space.xxs} py={space.s} textStyle="title">
            Tickets for sale
          </Text>
          <RewardsList rewards={rewards} loading={loading} split={false} />
        </Box>
      )}
    </Grid>
  );
}

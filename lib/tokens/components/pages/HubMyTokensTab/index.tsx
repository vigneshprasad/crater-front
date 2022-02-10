import PLACEHOLDER_GRAPH from "public/images/img_graph_coming_soon.png";
import { useTheme } from "styled-components";
import useSWR from "swr";

import { Grid, Text, Flex, Box, Image } from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useActiveAuction from "@/tokens/context/ActiveAuctionContext";
import useRewardsList from "@/tokens/context/RewardsListContext";

import BidsDataTable from "../../objects/BidsDataTable";
import CoinLogGraph from "../../objects/CoinLogGraph";
import RewardsList from "../../objects/RewardsList";
import TokenSummaryBox from "../../objects/TokenSummaryBox";

export default function HubMyTokensTab(): JSX.Element {
  const { space } = useTheme();
  const { auction } = useActiveAuction();

  const { rewards, loading } = useRewardsList();

  const { data: logs, error } = useSWR(
    auction?.coin
      ? `${API_URL_CONSTANTS.auctions.getCoinPriceLogs}?coin=${auction.coin}`
      : null
  );

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
        <BidsDataTable auction={auction} />
      </Flex>
      <TokenSummaryBox coinId={auction?.coin} />

      <Box gridColumn="1 / span 2">
        <Text px={space.xxs} py={space.s} textStyle="title">
          Price trend
        </Text>
        {auction || logs?.length === 0 ? (
          <CoinLogGraph logs={logs} loading={!logs && !error} />
        ) : (
          <Image src={PLACEHOLDER_GRAPH} alt="placeholder_graph" />
        )}
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

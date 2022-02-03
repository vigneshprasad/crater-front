import { useTheme } from "styled-components";
import useSWR from "swr";

import { Grid, Text, Flex } from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useActiveAuction from "@/tokens/context/ActiveAuctionContext";

import BidsDataTable from "../../objects/BidsDataTable";
import CoinLogGraph from "../../objects/CoinLogGraph";
import TokenSummaryBox from "../../objects/TokenSummaryBox";

export default function HubMyTokensTab(): JSX.Element {
  const { space } = useTheme();
  const { auction } = useActiveAuction();

  const { data: logs, error } = useSWR(
    auction?.coin
      ? `${API_URL_CONSTANTS.auctions.getCoinPriceLogs}?coin=${auction.coin}`
      : null
  );

  return (
    <Grid
      gridTemplateColumns="2fr 1fr"
      px={space.xxs}
      py={space.xs}
      gridGap={space.s}
    >
      <Flex gridGap={space.s} flexDirection="column">
        <Text px={space.xxs} textStyle="title">
          Bids Placed
        </Text>
        <BidsDataTable auction={auction} />
        <Text px={space.xxs} textStyle="title">
          Price trend
        </Text>
        <CoinLogGraph logs={logs} loading={!logs && !error} />
      </Flex>

      <TokenSummaryBox coinId={auction?.coin} />
    </Grid>
  );
}

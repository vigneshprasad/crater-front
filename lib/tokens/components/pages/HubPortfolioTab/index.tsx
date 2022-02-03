import { useTheme } from "styled-components";

import { Text, Flex } from "@/common/components/atoms";
import useBidsList from "@/tokens/context/BidListContext";
import useCoinHoldingList from "@/tokens/context/CoinHoldingListContext";

import CoinHoldingsBox from "../../objects/CoinHoldingsBox";
import TransactionDataTable from "../../objects/TransactionDataTable";

export default function HubPortfolioTab(): JSX.Element {
  const { space } = useTheme();
  const { bids } = useBidsList();
  const { holdings, loading: holdingsLoading } = useCoinHoldingList();

  return (
    <Flex px={space.s} py={space.xs} gridGap={space.s} flexDirection="column">
      <CoinHoldingsBox holdings={holdings} loading={holdingsLoading} />
      <Text textStyle="title">Transaction Log</Text>
      <TransactionDataTable bids={bids} />
    </Flex>
  );
}

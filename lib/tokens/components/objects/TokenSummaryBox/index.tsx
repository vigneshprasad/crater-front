import { useMemo } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useTheme } from "styled-components";
import useSWR from "swr";

import { Box, Text, Flex, Hr } from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

interface IProps {
  coinId?: number;
}

export default function TokenSummaryBox({ coinId }: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const { data: bidSummary } = useSWR(
    coinId ? API_URL_CONSTANTS.auctions.bidSummaryForCoin(coinId) : null
  );

  const { data: auctionSummary } = useSWR(
    coinId ? API_URL_CONSTANTS.auctions.auctionSummaryForCoin(coinId) : null
  );

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  const pieData = useMemo(() => {
    if (!auctionSummary) {
      return [];
    }

    return [
      {
        key: "total_coins",
        value: auctionSummary["total_coins"],
        color: colors.amber,
      },
      {
        key: "tokens_circulation",
        value: auctionSummary["tokens_circulation"],
        color: colors.greenSuccess,
      },
    ];
  }, [auctionSummary, colors]);

  return (
    <Box>
      <Text py={space.xs} textStyle="title">
        Token Summary
      </Text>
      <Flex flexDirection="column" gridGap={space.xxs}>
        <Text color={colors.slate}>Total Worth</Text>
        <Text textStyle="headline4" fontWeight="400">
          {formatter.format(bidSummary?.total_recieved)}
        </Text>
        <Text color={colors.slate}>Net Worth</Text>
        <Text textStyle="headline4" fontWeight="400">
          {formatter.format(bidSummary?.net_worth)}
        </Text>
        <Hr px={space.xxs} />

        <Flex alignItems="center">
          <PieChart width={196} height={196}>
            <Pie
              data={pieData}
              outerRadius={72}
              innerRadius={64}
              stroke="transparent"
              dataKey="value"
            >
              {pieData.map((data) => (
                <Cell key="value" fill={data.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <Box>
            <Text color={colors.slate}>Total Coins:</Text>
            <Text textStyle="headline5" fontWeight="400">
              {auctionSummary?.total_coins}
            </Text>

            <Text color={colors.slate}>Coins in circulation:</Text>
            <Text textStyle="headline5" fontWeight="400">
              {auctionSummary?.tokens_circulation}
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

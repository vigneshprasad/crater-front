import { useMemo } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { useTheme } from "styled-components";
import useSWR from "swr";

import { Box, Text, Flex, Hr } from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";

interface IProps {
  creator?: number;
}

export default function BidsSummaryBox({ creator }: IProps): JSX.Element {
  const { space, colors, borders, radii } = useTheme();
  const { data: bidSummary } = useSWR(
    creator ? API_URL_CONSTANTS.auctions.bidSummaryForCoin(creator) : null
  );

  const { data: auctionSummary } = useSWR(
    creator ? API_URL_CONSTANTS.auctions.auctionSummaryForCoin(creator) : null
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

  if (!creator) {
    return (
      <Box>
        <Text mb={space.s} textStyle="title">
          Token Summary
        </Text>
        <Box
          border={`2px solid ${borders.main}`}
          p={space.xxs}
          borderRadius={radii.xxs}
        >
          <Text mb={space.xs} fontWeight="800">
            No Token Data
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Text mb={space.s} textStyle="title">
        Bids Summary
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

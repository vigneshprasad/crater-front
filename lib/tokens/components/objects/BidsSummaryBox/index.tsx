import { useTheme } from "styled-components";
import useSWR from "swr";

import { Box, Text, Flex, Card } from "@/common/components/atoms";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { BidCreatorSummary } from "@/tokens/types/auctions";

interface IProps {
  creator?: number;
}

export default function BidsSummaryBox({ creator }: IProps): JSX.Element {
  const { space, colors, borders, radii } = useTheme();
  const { data: bidSummary } = useSWR<BidCreatorSummary>(
    creator ? API_URL_CONSTANTS.auctions.bidSummaryForCoin(creator) : null
  );

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

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
    <Card>
      {bidSummary && (
        <Flex flexDirection="column" gridGap={space.xxs}>
          <Box>
            <Text color={colors.slate}>Potential Earnings</Text>
            <Text fontSize="2.4rem" lineHeight="3.2rem" fontWeight="400">
              {formatter.format(bidSummary.total_net_worth)}
            </Text>
          </Box>

          <Box>
            <Text color={colors.slate}>Actualised Earnings</Text>
            <Text fontSize="2.4rem" lineHeight="3.2rem" fontWeight="400">
              {formatter.format(bidSummary.accepted_net_worth)}
            </Text>
          </Box>

          <Box>
            <Text color={colors.slate}>Bids Received</Text>
            <Text fontSize="2.4rem" lineHeight="3.2rem" fontWeight="400">
              {bidSummary.total_bids}
            </Text>
          </Box>
          <Box>
            <Text color={colors.slate}>Bids Accepted</Text>
            <Text fontSize="2.4rem" lineHeight="3.2rem" fontWeight="400">
              {bidSummary.total_accepted}
            </Text>
          </Box>
        </Flex>
      )}
    </Card>
  );
}

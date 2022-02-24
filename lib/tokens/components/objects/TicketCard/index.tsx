import styled, { useTheme } from "styled-components";

import { Flex, Box, Text, Span, BoxProps } from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import { CurrencyFormatter } from "@/common/utils/formatters";
import { Reward } from "@/tokens/types/token";

import AuctionProgressBar from "../AuctionProgressBar";
import RewardImagePreview from "../RewardImagePreview";

interface IProps extends BoxProps {
  reward: Reward;
}

const HoverButton = styled(Box)`
  transition: background-color 300ms ease-in-out;
  background-color: transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.whiteAlpha[2]};
  }
`;

const Container = styled(Box)`
  cursor: pointer;

  &:hover ${HoverButton} {
    background-color: ${(props) => props.theme.colors.whiteAlpha[2]};
  }
`;

export default function TicketCard({ reward, ...rest }: IProps): JSX.Element {
  const { space, gradients, colors, radii } = useTheme();
  const { name, quantity, quantity_sold, active_auction } = reward;

  return (
    <Container
      px={space.xxs}
      py={space.xxxs}
      background={gradients.primary}
      borderRadius={radii.xxs}
      {...rest}
    >
      <Flex alignItems="center" gridGap={space.xxs}>
        {reward.photo && (
          <RewardImagePreview
            h={48}
            w={48}
            borderRadius={radii.xxxs}
            reward={reward}
            overflow="hidden"
          />
        )}

        <Box flex={1}>
          <Text fontSize="1.6rem" fontWeight="800">
            {name}
            <Span
              mx={space.xxxs}
              px={12}
              py={2}
              fontSize="1.2rem"
              bg={colors.blackAlpha[1]}
              borderRadius={18}
            >
              {quantity_sold}/{quantity}
            </Span>
          </Text>

          <Text>
            {!active_auction && `No active auction`}
            {active_auction &&
              `Auctions ends ${DateTime.parse_with_milliseconds(
                active_auction.end
              ).toRelative()}`}
          </Text>
        </Box>

        {active_auction && (
          <Text fontSize="1.6rem" fontWeight="800">
            {CurrencyFormatter.format(
              active_auction.last_bid?.bid_price
                ? active_auction.last_bid?.bid_price
                : active_auction.minimum_bid
            )}
          </Text>
        )}
      </Flex>
      {active_auction && <AuctionProgressBar auction={active_auction} />}
      {active_auction && (
        <Flex justifyContent="flex-end">
          <HoverButton px={8} py={space.xxxxs} borderRadius={radii.xxxs}>
            <Text textStyle="button">Place Bid</Text>
          </HoverButton>
        </Flex>
      )}
    </Container>
  );
}

import styled, { useTheme } from "styled-components";

import {
  Flex,
  Box,
  Text,
  Span,
  BoxProps,
  Grid,
} from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import { CurrencyFormatter } from "@/common/utils/formatters";
import { Reward } from "@/tokens/types/token";

import AuctionProgressBar from "../AuctionProgressBar";
import RewardDescriptionPreview from "../RewardDescriptionPreview";

interface IProps extends BoxProps {
  reward: Reward;
  withDetail?: boolean;
  withCTA?: boolean;
}

const HoverButton = styled(Box)`
  transition: background-color 300ms ease-in-out;
  background-color: transparent;

  &:hover {
    background-color: ${(props) => props.theme.colors.whiteAlpha[2]};
  }
`;

const Container = styled(Box)`
  &:hover ${HoverButton} {
    background-color: ${(props) => props.theme.colors.whiteAlpha[2]};
  }
`;

export default function TicketCard({
  reward,
  withCTA = true,
  withDetail = false,
  ...rest
}: IProps): JSX.Element {
  const { space, gradients, colors, radii } = useTheme();
  const { name, quantity, quantity_sold, active_auction, card_background } =
    reward;

  const background = card_background ?? gradients.primary;

  return (
    <Box cursor="pointer" {...rest}>
      <Container
        px={space.xxs}
        py={space.xxxs}
        background={background}
        borderRadius={radii.xxs}
      >
        <Flex alignItems="center" gridGap={space.xxxs}>
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

        <Grid gridTemplateColumns="1fr max-content" gridGap={space.xs}>
          {active_auction && withCTA && (
            <AuctionProgressBar auction={active_auction} />
          )}
          {active_auction && withCTA && (
            <Flex justifyContent="flex-end">
              <HoverButton px={8} py={space.xxxxs} borderRadius={radii.xxxs}>
                <Text textStyle="button">Place Bid</Text>
              </HoverButton>
            </Flex>
          )}
        </Grid>
      </Container>
      {withDetail && (
        <Box
          display={["none", "block"]}
          p={space.xxxs}
          w="calc(100% - 16px)"
          bg={colors.black[3]}
          m="0 auto"
        >
          {reward.description && (
            <RewardDescriptionPreview
              p={space.xxs}
              dangerouslySetInnerHTML={{ __html: reward.description }}
            />
          )}
        </Box>
      )}
    </Box>
  );
}

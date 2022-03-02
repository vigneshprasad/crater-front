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
  priceValue?: number;
  priceLabel?: string;
}

const HoverButton = styled(Box)``;

const Container = styled(Box)``;

export default function TicketCard({
  reward,
  withCTA = true,
  withDetail = false,
  priceValue,
  priceLabel = "Last bid",
  ...rest
}: IProps): JSX.Element {
  const { space, gradients, colors, radii } = useTheme();
  const {
    name,
    quantity,
    quantity_sold,
    active_auction,
    card_background,
    text_color,
  } = reward;

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
                {quantity - quantity_sold}/{quantity}
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

          <Box>
            {active_auction && (
              <>
                <Text textAlign="right" fontSize="1.2rem">
                  {priceLabel}
                </Text>
                <Text fontSize="1.6rem" fontWeight="800">
                  {priceValue && CurrencyFormatter.format(priceValue)}
                  {!priceValue &&
                    CurrencyFormatter.format(
                      active_auction.last_bid?.bid_price
                        ? active_auction.last_bid?.bid_price
                        : active_auction.minimum_bid
                    )}
                </Text>
              </>
            )}
          </Box>
        </Flex>

        <Grid gridTemplateColumns="1fr max-content" gridGap={space.xs}>
          {active_auction && withCTA && (
            <AuctionProgressBar color={text_color} auction={active_auction} />
          )}
          {active_auction && withCTA && (
            <Flex justifyContent="flex-end">
              <HoverButton py={space.xxxxs} borderRadius={radii.xxxs}>
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

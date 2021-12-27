import { PropsWithChildren } from "react";
import { useTheme } from "styled-components";

import { Flex, Text, Span, Box } from "@/common/components/atoms";
import DateTime from "@/common/utils/datetime/DateTime";
import { Auction } from "@/tokens/types/tokens";

type IProps = PropsWithChildren<{
  auction?: Auction;
}>;

export default function AuctionDetailBox({
  auction,
  children,
}: IProps): JSX.Element {
  const { space, radii, borders, colors } = useTheme();
  return (
    <Flex mx={[0, space.xs]} flexDirection="column">
      <Flex
        px={[space.xxs, space.xs]}
        py={space.xs}
        borderRadius={radii.xxs}
        flexDirection="column"
        gridGap={space.xs}
        border={`2px solid ${borders.main}`}
      >
        <Flex>
          {(() => {
            if (!auction) {
              return <Text>No active auctions</Text>;
            }

            const now = DateTime.now();
            const start = DateTime.parse(auction.start);
            const end = DateTime.parse(auction.end);

            if (now > start) {
              return (
                <Text fontSize="1.7rem" fontWeight="600">
                  Auction ends in{" "}
                  <Span>{end.diffNow().toFormat("d'd' h'h' m'm'")}</Span>
                </Text>
              );
            }

            return (
              <Text fontSize="1.7rem">
                Auction starts in{" "}
                <Span fontWeight="600">
                  {start.diffNow().toFormat("d'd' h'h' m'm'")}
                </Span>
              </Text>
            );
          })()}
        </Flex>
        <Flex gridGap={space.s} alignItems="center">
          <Flex w={[96, 124]} h={56} bg={colors.greenDeep} borderRadius={4}>
            <Text textStyle="buttonLarge" m="auto auto">
              Place Bid
            </Text>
          </Flex>

          <Box>
            <Text textStyle="label" color={colors.slate}>
              Last bid:
            </Text>
            <Text textStyle="headline5">--</Text>
          </Box>
        </Flex>

        <Flex gridGap={space.s} alignItems="center">
          <Flex w={[96, 124]} h={56} bg={colors.red[1]} borderRadius={4}>
            <Text textStyle="buttonLarge" m="auto auto">
              Buy
            </Text>
          </Flex>

          <Box>
            <Text textStyle="label" color={colors.slate}>
              Coming Soon
            </Text>
          </Box>
        </Flex>
      </Flex>

      {children}
    </Flex>
  );
}

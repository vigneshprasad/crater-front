import { PropsWithChildren, useState } from "react";
import { useTheme } from "styled-components";
import useSWR from "swr";

import { Flex, Text, Span, Box } from "@/common/components/atoms";
import { LEARN_MORE_URL } from "@/common/constants/url.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import { CreatorProvider } from "@/creators/context/CreatorContext";
import { Creator } from "@/creators/types/creator";
import { ActiveAuctionProvider } from "@/tokens/context/ActiveAuctionContext";
import { CreatorCoinProvider } from "@/tokens/context/CreatorCoinContext";
import { Auction } from "@/tokens/types/auctions";
import { Coin } from "@/tokens/types/token";

import TokenBidModal from "../TokenBidModal";

type IProps = PropsWithChildren<{
  auction?: Auction;

  creator?: Creator;
}>;

export default function AuctionDetailBox({
  auction,
  creator,
  children,
}: IProps): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const { space, radii, borders, colors } = useTheme();

  const { data: coin } = useSWR<Coin>(
    creator ? API_URL_CONSTANTS.coins.getCointForCreator(creator.id) : null
  );

  return (
    <>
      {creator && (
        <ActiveAuctionProvider creator={creator.id}>
          <CreatorProvider slug={creator.slug}>
            <CreatorCoinProvider creatorId={creator.id}>
              <TokenBidModal
                visible={showModal}
                onClose={() => setShowModal(false)}
              />
            </CreatorCoinProvider>
          </CreatorProvider>
        </ActiveAuctionProvider>
      )}

      <Flex mx={[0, space.xs]} flexDirection="column">
        <Flex
          px={[space.xxs, space.xs]}
          py={space.xs}
          borderRadius={radii.xxs}
          flexDirection="column"
          gridGap={space.xs}
          border={`2px solid ${borders.main}`}
        >
          <Box>
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
                      Auction of{" "}
                      <Span color={colors.accent}>{coin?.display.symbol}</Span>{" "}
                      ends in{" "}
                      <Span>{end.diffNow().toFormat("d'd' h'h' m'm'")}</Span>
                    </Text>
                  );
                }

                return (
                  <Text fontSize="1.7rem">
                    Auction of{" "}
                    <Span color={colors.accent}>{coin?.display.symbol}</Span>{" "}
                    starts in{" "}
                    <Span fontWeight="600">
                      {start.diffNow().toFormat("d'd' h'h' m'm'")}
                    </Span>
                  </Text>
                );
              })()}
            </Flex>
            <Flex>
              <Box
                as="a"
                textAlign="center"
                target="_blank"
                href={LEARN_MORE_URL}
              >
                <Text textStyle="button" color={colors.accent}>
                  Learn More
                </Text>
              </Box>
            </Flex>
          </Box>
          <Flex gridGap={space.s} alignItems="center">
            <Flex
              cursor="pointer"
              w={[124]}
              h={56}
              bg={colors.greenDeep}
              borderRadius={4}
              onClick={() => setShowModal(true)}
            >
              <Text textStyle="buttonLarge" m="auto auto">
                Place a Bid
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
            <Flex w={[124]} h={56} bg={colors.red[1]} borderRadius={4}>
              <Text textStyle="buttonLarge" m="auto auto">
                Sell Tokens
              </Text>
            </Flex>

            <Box>
              <Text textStyle="label" color={colors.slate}>
                Coming Soon (April 2022)
              </Text>
            </Box>
          </Flex>
        </Flex>

        {children}
      </Flex>
    </>
  );
}

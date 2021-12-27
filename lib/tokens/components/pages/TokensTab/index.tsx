import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import styled, { useTheme } from "styled-components";
import useSWR from "swr";

import { useRouter } from "next/router";

import { Flex, Text, Box, Grid, Span } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import useCreatorWithCoin from "@/creators/context/CreatorWithCoinContext";
import { Creator } from "@/creators/types/creator";
import useRewardsList from "@/tokens/context/RewardsListContext";
import { Auction, Coin } from "@/tokens/types/tokens";

import { CreatorTokenSlider } from "../../objects/CreatorTokenSlider";
import { RewardCard } from "../../objects/RewardCard";

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radii.xxs}px;
`;

export default function TokensTab(): JSX.Element {
  const rewardsListRef = useRef<HTMLDivElement>(null);
  const { creators, loading } = useCreatorWithCoin();
  const [activeCreator, setActiveCreator] = useState<Creator | undefined>(
    undefined
  );
  const router = useRouter();
  const { space, colors, radii, borders } = useTheme();
  const { rewards } = useRewardsList();

  const scrollToRewards = useCallback(() => {
    if (rewardsListRef.current) {
      rewardsListRef.current.scrollIntoView();
    }
  }, [rewardsListRef]);

  useEffect(() => {
    if (creators && router) {
      const slug = router.query.slug;
      if (slug) {
        const creator = creators.filter((obj) => obj.slug === slug)[0];
        if (creator) {
          setActiveCreator(creator);
          return;
        }
      }
      setActiveCreator(creators[0]);
    }
  }, [router, creators, setActiveCreator]);

  const { data: coin } = useSWR<Coin>(
    activeCreator
      ? API_URL_CONSTANTS.coins.getCointForCreator(activeCreator.id)
      : null
  );
  const { data: auctions } = useSWR<Auction[]>(
    activeCreator
      ? `${API_URL_CONSTANTS.coins.getAuctions}?coin__creator=${activeCreator.id}`
      : null
  );

  const activeAuction = useMemo(() => {
    if (!auctions || !auctions.length) return undefined;
    return auctions[0];
  }, [auctions]);

  return (
    <Box px={[space.xxs, space.s]}>
      <CreatorTokenSlider
        mt={space.s}
        creators={creators}
        loading={loading}
        activeCreator={activeCreator}
      />

      <Text my={space.xs} textStyle="headline4">
        {activeCreator?.profile_detail.name}{" "}
        <Span color={colors.accent}>{coin?.display.symbol}</Span>
      </Text>

      <Grid
        gridTemplateColumns={["1fr", "1fr 1fr"]}
        gridGap={space.xxs}
        alignItems="start"
      >
        <Box pt="56.25%" position="relative">
          {activeCreator?.video && (
            <Video
              controls
              controlsList="nodownload"
              src={activeCreator?.video}
            />
          )}
        </Box>

        <Flex mx={[space.xxs, space.xs]} flexDirection="column">
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
                if (!activeAuction) {
                  return <Text>No active auctions</Text>;
                }

                const now = DateTime.now();
                const start = DateTime.parse(activeAuction.start);
                const end = DateTime.parse(activeAuction.end);

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

          <Grid
            px={[space.xxxs, space.xxs]}
            py={space.s}
            gridGap={space.xxs}
            gridTemplateColumns="max-content max-content"
            alignItems="end"
            justifyContent="end"
          >
            <Button
              variant="outline-small"
              text="View Rewards"
              onClick={() => scrollToRewards()}
            />

            <Button
              variant="outline-small"
              text={`About ${coin?.display.symbol}`}
            />
          </Grid>
        </Flex>
      </Grid>

      <Text my={space.xs} textStyle="title">
        Recent Drops
      </Text>

      <Grid
        ref={rewardsListRef}
        gridTemplateColumns="repeat(auto-fill, minmax(180px, 1fr))"
        gridGap={space.xxs}
      >
        {rewards?.map((reward) => (
          <RewardCard
            showAvatar={false}
            type="large"
            reward={reward}
            key={reward.id}
          />
        ))}
      </Grid>
    </Box>
  );
}

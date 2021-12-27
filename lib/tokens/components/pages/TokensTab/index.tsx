import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import styled, { useTheme } from "styled-components";
import useSWR from "swr";

import { useRouter } from "next/router";

import { Text, Box, Grid, Span } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useCreatorWithCoin from "@/creators/context/CreatorWithCoinContext";
import { Creator } from "@/creators/types/creator";
import useRewardsList from "@/tokens/context/RewardsListContext";
import { Auction, Coin } from "@/tokens/types/tokens";

import AuctionDetailBox from "../../objects/AuctionDetailBox";
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
  const { space, colors } = useTheme();
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

        <AuctionDetailBox auction={activeAuction}>
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
        </AuctionDetailBox>
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

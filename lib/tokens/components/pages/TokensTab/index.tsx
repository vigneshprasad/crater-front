import { Variants } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "styled-components";
import useSWR from "swr";

import { useRouter } from "next/router";

import {
  Box,
  AnimatedBox,
  Text,
  Link,
  Span,
  Flex,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import DateTime from "@/common/utils/datetime/DateTime";
import AnimatedCreatorCard from "@/creators/components/objects/AnimatedCreatorCard";
import useCreatorWithCoin from "@/creators/context/CreatorWithCoinContext";
import { Creator } from "@/creators/types/creator";
import useRewardsList from "@/tokens/context/RewardsListContext";
import { Auction, Coin, Bid } from "@/tokens/types/tokens";

import RewardsList from "../../objects/RewardsList";

const AnimList: Variants = {
  hidden: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AnimCard: Variants = {
  hidden: { opacity: 0, x: -50, y: 0, background: "transparent" },
  enter: { opacity: 1, x: 0, y: 0, background: "transparent" },
  exit: { opacity: 0, x: -50, y: 0, background: "transparent" },
  selected: { opacity: 1, x: 0, y: 0, background: "#9146FF" },
};

export default function TokensTab(): JSX.Element {
  const [activeCreator, setActiveCreator] = useState<Creator | undefined>(
    undefined
  );
  const { creators } = useCreatorWithCoin();
  const { space, colors } = useTheme();
  const router = useRouter();
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

  const { rewards, loading: loadingRewards } = useRewardsList();

  const activeAuction = useMemo(() => {
    if (!auctions || !auctions.length) return undefined;
    return auctions[0];
  }, [auctions]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: bids } = useSWR<Bid[]>(
    activeAuction
      ? `${API_URL_CONSTANTS.coins.getBids}?auction=${activeAuction.id}`
      : null
  );

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

  if (!creators) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box py={space.s}>
      <AnimatedBox
        px={space.s}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={AnimList}
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(164px, 1fr))"
        gridGap={space.xxxs}
      >
        {creators.map((creator) => (
          <Link href={PageRoutes.tokens(creator.slug)} key={creator.id}>
            <AnimatedCreatorCard
              whileHover="selected"
              creator={creator}
              animate={creator.id === activeCreator?.id ? "selected" : "enter"}
              variants={AnimCard}
              transition={{ type: "linear" }}
            />
          </Link>
        ))}
      </AnimatedBox>

      <Flex
        py={space.s}
        px={space.s}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Text textStyle="headline5">
            {activeCreator?.profile_detail.name}{" "}
            <Span color={colors.accent}>{coin?.display.symbol}</Span>
          </Text>
          <Text my={space.xxxs} textStyle="title">
            {activeAuction
              ? `Auction ends: ${DateTime.parse(activeAuction.end).toFormat(
                  "ff"
                )}`
              : "No active auctions"}
          </Text>
        </Box>

        <Button text="Place Bid" />
      </Flex>

      <img src="/images/img_graph_placeholder.png" alt="Placeholder graph" />

      {coin && (
        <Text my={space.xs} textStyle="headline5" px={space.s}>
          Avalilable with {coin.display.symbol}
        </Text>
      )}

      <Box px={space.s}>
        <RewardsList rewards={rewards} loading={loadingRewards} split={false} />
      </Box>
    </Box>
  );
}

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
  Grid,
  Card,
  Hr,
  Flex,
  Input,
  Image,
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
  hidden: {
    opacity: 0,
    x: -50,
    y: 0,
    border: "2px solid rgba(255, 255, 255, 0)",
  },
  enter: { opacity: 1, x: 0, y: 0, border: "2px solid rgba(255, 255, 255, 0)" },
  exit: {
    opacity: 0,
    x: -50,
    y: 0,
    border: "2px solid rgba(255, 255, 255, 0)",
  },
  selected: { opacity: 1, x: 0, y: 0, border: "2px solid #9146FF" },
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
    <>
      <AnimatedBox
        mt={space.xs}
        px={[space.xxs, space.s]}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={AnimList}
        display="grid"
        gridTemplateColumns={[
          "repeat(auto-fill, minmax(144px, 1fr))",
          "repeat(auto-fill, minmax(196px, 1fr))",
        ]}
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

      <Text px={[space.xxs, space.s]} py={space.xs} textStyle="headline5">
        {activeCreator?.profile_detail.name}{" "}
        <Span color={colors.accent}>{coin?.display.symbol}</Span>
      </Text>

      <Grid
        gridTemplateColumns={["1fr", "2fr minmax(max-content, 240px)"]}
        gridGap={space.xs}
        px={[space.xxs, space.s]}
        alignItems="start"
      >
        <Box position="relative">
          <Image src="/images/img_graph_placeholder.png" alt="placeholder" />
          <Box
            position="absolute"
            top={0}
            right={0}
            left={0}
            bottom={0}
            bg="rgba(0,0,0,0.4)"
          >
            <Text p={space.xs} textStyle="bodyLarge" fontSize={["1.6rem"]}>
              Token price will reflect when the <br />
              <Span color={colors.accent}>bidding starts</Span>
            </Text>
          </Box>
        </Box>

        <Card>
          {(() => {
            if (!activeAuction) {
              return <Text>No active Auctions</Text>;
            }
            const now = DateTime.now();
            const start = DateTime.parse(activeAuction.start);
            const end = DateTime.parse(activeAuction.end);

            let heading;

            if (now > start) {
              heading = (
                <Text textStyle="headline5" fontWeight="400">
                  Auction ends {end.toRelative()}
                </Text>
              );
            } else {
              heading = (
                <Text textStyle="title">
                  Auction starts {start.toRelative()}
                </Text>
              );
            }

            return (
              <>
                {heading}
                <Hr my={space.xxs} />

                <Grid gridTemplateColumns="2fr 1fr">
                  <Text>Being sold:</Text>
                  <Text>{activeAuction.number_of_coins}</Text>
                </Grid>

                <Grid gridTemplateColumns="2fr 1fr">
                  <Text>Floor Price:</Text>
                  <Text>{activeAuction.base_price}</Text>
                </Grid>

                <Grid gridTemplateColumns="2fr 1fr">
                  <Text>Coins Sold:</Text>
                  <Text>{activeAuction.coins_sold}</Text>
                </Grid>

                <Hr my={space.xxs} />

                <Flex flexDirection="row" gridGap={space.xxs} mt={space.xxs}>
                  <Input placeholder="Enter amount" boxProps={{ flex: 1 }} />
                  <Button text="Place Bid" />
                </Flex>
              </>
            );
          })()}
        </Card>
      </Grid>

      {coin && (
        <Text my={space.xs} textStyle="headline5" px={[space.xxs, space.s]}>
          Avalilable with {coin.display.symbol}
        </Text>
      )}

      <Box px={[space.xxs, space.s]}>
        <RewardsList rewards={rewards} loading={loadingRewards} split={false} />
      </Box>
    </>
  );
}

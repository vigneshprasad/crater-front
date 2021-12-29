import { Variants } from "framer-motion";
import { useMemo, useState } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import {
  Box,
  Grid,
  Text,
  Span,
  Flex,
  Avatar,
  Link,
  Shimmer,
  AnimatedBox,
  Icon,
  BackgroundVideo,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import { useCreator } from "@/creators/context/CreatorContext";
import useCreatorCoin from "@/tokens/context/CreatorCoinContext";
import useRewardItem from "@/tokens/context/RewardItemContext";
import useRewardsList from "@/tokens/context/RewardsListContext";

import RewardsList from "../../objects/RewardsList";
import TokenBidModal from "../../objects/TokenBidModal";

const AnimLoading: Variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: {
    opacity: 0,
    x: 0,
    y: 20,
  },
};

const BreadCrumb = styled(Text)`
  color: ${({ theme }) => theme.colors.slate};
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export default function RewardItemPage(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const { reward, loading } = useRewardItem();
  const { space, colors, borders, radii } = useTheme();
  const { rewards, loading: rewardsLoading } = useRewardsList();
  const { coin } = useCreatorCoin();
  const { creator } = useCreator();

  const { breakpoints } = useTheme();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const preview = useMemo(() => {
    if (!reward || !reward.photo || !reward.photo_mime_type) {
      return <Box w="100" pt="100%" bg={colors.accent} />;
    }

    const type = reward.photo_mime_type.split("/")[0];

    if (type === "image") {
      return (
        <Box position="relative" w="100%" pt="100%">
          <Image
            src={reward.photo}
            layout="fill"
            objectFit="cover"
            alt={reward.name}
          />
        </Box>
      );
    }

    if (type === "video") {
      return <BackgroundVideo w="100%" src={reward.photo} />;
    }

    return (
      <Box position="relative" w="100%" pt="100%">
        <Image
          src={reward.photo}
          layout="fill"
          objectFit="cover"
          alt={reward.name}
        />
      </Box>
    );
  }, [reward, colors]);

  if (!reward || loading || !coin) {
    return (
      <Grid
        px={space.s}
        py={space.m}
        gridTemplateColumns="1.2fr 1fr"
        gridGap={space.xs}
      >
        <Shimmer gridColumn="1 / span 2" w={360} h={20} />
        <Shimmer gridColumn="1 / span 2" w={240} h={24} />

        <Shimmer h={340} />

        <Grid
          px={space.m}
          gridGap={space.xxs}
          gridAutoFlow="row"
          gridAutoRows="max-content"
        >
          <Shimmer w={360} h={20} />
          <Shimmer w={240} h={24} />

          <Grid
            my={space.xs}
            gridTemplateColumns="max-content 1fr"
            gridGap={space.xs}
            alignItems="center"
          >
            <Shimmer size={72} borderRadius="50%" />

            <Box>
              <Shimmer my={space.xxxs} h={18} />
              <Shimmer h={18} />
            </Box>
          </Grid>

          <Shimmer borderRadius={radii.xs} mt={space.l} h={48} />
        </Grid>
      </Grid>
    );
  }

  const filteredRewards = rewards?.filter((obj) => obj.id !== reward.id);

  return (
    <>
      {creator && (
        <TokenBidModal
          creatorId={creator.id}
          visible={showModal}
          onClose={() => setShowModal(false)}
        />
      )}

      <AnimatedBox
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={AnimLoading}
        px={[space.xs, space.s]}
        py={[space.xs, space.s]}
        transition={{ type: "linear" }}
      >
        {!isMobile && (
          <Grid
            gridColumn="1 / span 2"
            gridAutoFlow="column"
            gridAutoColumns="max-content"
            alignItems="center"
            py={space.xs}
          >
            <Link href={PageRoutes.tickets}>
              <BreadCrumb textStyle="breadCrumb">Rewards</BreadCrumb>
            </Link>

            <Icon icon="ChevronRight" color={colors.accent} />

            <Link
              href={PageRoutes.creatorProfile(
                reward.creator_coin_detail.creator_detail.slug,
                "rewards"
              )}
            >
              <BreadCrumb textStyle="breadCrumb">
                {reward.creator_coin_detail.creator_detail.profile_detail.name}
              </BreadCrumb>
            </Link>

            <Icon icon="ChevronRight" color={colors.accent} />

            <BreadCrumb textStyle="breadCrumb">{reward.name}</BreadCrumb>
          </Grid>
        )}

        <Text py={space.xs} gridColumn="1 / span 2" textStyle="headline4">
          {reward.name}
        </Text>

        <Grid
          gridTemplateColumns={["1fr", "0.75fr 1fr"]}
          gridGap={[space.s, space.xs]}
        >
          {preview}

          <Box px={[0, space.s]}>
            <Flex
              pb={space.xs}
              alignItems="center"
              justifyContent="space-between"
            >
              <Text textStyle="headline5">
                {reward.number_of_coins}{" "}
                <Span color={colors.accent}>
                  {reward.creator_coin_detail.display.symbol}
                </Span>
              </Text>

              <Text textStyle="headline6" color={colors.slate}>
                {reward.remaining_quantity} / {reward.quantity} remaining
              </Text>
            </Flex>

            <Text textStyle="headline6" fontWeight="400">
              {reward.description}
            </Text>

            <Box my={space.xs} h={2} bg={borders.main} />

            <Text my={space.xxs} textStyle="title">
              About{" "}
              {reward.creator_coin_detail.creator_detail.profile_detail.name}
            </Text>

            <Link
              href={PageRoutes.creatorProfile(
                reward.creator_coin_detail.creator_detail.slug
              )}
            >
              <Grid
                alignItems="center"
                gridTemplateColumns="max-content 1fr"
                gridGap={space.xxs}
              >
                <Avatar
                  image={
                    reward.creator_coin_detail.creator_detail.profile_detail
                      .photo
                  }
                />
                <Text maxLines={3}>
                  {
                    reward.creator_coin_detail.creator_detail.profile_detail
                      .introduction
                  }
                </Text>
              </Grid>
            </Link>

            <Box my={space.xs} h={2} bg={borders.main} />

            <Button
              variant="full-width"
              text="Buy Now"
              onClick={() => setShowModal(true)}
            />

            <Text my={space.xxs} color={colors.slate}>
              You don&#39;t have any {coin.display.symbol}. To claim this reward
              bid for {creator?.profile_detail.name}&#39;s token.
            </Text>
          </Box>
        </Grid>

        {filteredRewards && filteredRewards.length > 0 && (
          <Box gridColumn="1 / span 2">
            <Text my={space.xs} textStyle="headline6">
              Explore more
            </Text>

            <RewardsList
              rewards={filteredRewards}
              loading={rewardsLoading}
              split={false}
            />
          </Box>
        )}
      </AnimatedBox>
    </>
  );
}

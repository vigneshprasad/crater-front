import { Variants } from "framer-motion";
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
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import useRewardItem from "@/tokens/context/RewardItemContext";
import useRewardsList from "@/tokens/context/RewardsListContext";

import RewardsList from "../../objects/RewardsList";

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
  const { reward, loading } = useRewardItem();
  const { space, colors, borders, radii } = useTheme();
  const { rewards, loading: rewardsLoading } = useRewardsList();

  if (!reward || loading) {
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
    <AnimatedBox
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={AnimLoading}
      display="grid"
      px={space.s}
      py={space.m}
      gridTemplateColumns="1.2fr 1fr"
      gridGap={space.xs}
      transition={{ type: "linear" }}
    >
      <Grid
        gridColumn="1 / span 2"
        gridAutoFlow="column"
        gridAutoColumns="max-content"
        alignItems="center"
      >
        <Link href={PageRoutes.rewards}>
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

      <Text gridColumn="1 / span 2" textStyle="headline4">
        {reward.name}
      </Text>

      <Box position="relative" pt="56.25%">
        <Image
          objectFit="cover"
          src={reward.photo}
          alt={reward.name}
          layout="fill"
        />
      </Box>

      <Box px={space.s}>
        <Flex pb={space.xs} alignItems="center" justifyContent="space-between">
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
          About {reward.creator_coin_detail.creator_detail.profile_detail.name}
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
                reward.creator_coin_detail.creator_detail.profile_detail.photo
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

        <Button variant="full-width" text="Buy Now" />

        <Text my={space.xxs} color={colors.slate}>
          You don’t have any SRBH. To claim this reward bid for Sourabh’s token.
          Auction ends in 3 days 5 hours 17 mins.
        </Text>
      </Box>

      <Box gridColumn="1 / span 2">
        <Text my={space.xs} textStyle="headline6">
          More Rewards
        </Text>

        <RewardsList
          rewards={filteredRewards}
          loading={rewardsLoading}
          split={false}
        />
      </Box>
    </AnimatedBox>
  );
}

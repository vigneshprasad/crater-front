import { Variants } from "framer-motion";
import COIN_ICON from "public/images/coin.png";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import {
  Text,
  Box,
  AnimatedBox,
  AnimatedBoxProps,
  Avatar,
  Link,
  Flex,
} from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import { Reward } from "@/tokens/types/tokens";

interface IProps extends AnimatedBoxProps {
  reward: Reward;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 0, y: 50 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 50 },
};

const Container = styled(AnimatedBox)``;

export default function RewardCardLarge({
  reward,
  ...rest
}: IProps): JSX.Element {
  const {
    name,
    photo,
    number_of_coins,
    creator_coin_detail,
    quantity,
    remaining_quantity,
    id,
  } = reward;
  const { borders, radii, space, colors } = useTheme();
  return (
    <Link
      href={PageRoutes.rewardListing(
        creator_coin_detail.creator_detail.slug,
        id
      )}
    >
      <Container
        display="grid"
        borderRadius={radii.xxs}
        border={`2px solid ${borders.main}`}
        px={space.xxs}
        py={space.xxs}
        gridGap={space.xxxs}
        variants={cardVariants}
        whileHover={{
          border: `2px solid ${colors.accent}`,
        }}
        {...rest}
      >
        <Avatar
          size={32}
          image={creator_coin_detail.creator_detail.profile_detail.photo}
        />
        <Box
          position="relative"
          h={200}
          marginRight={space.xxxs}
          marginLeft={space.xxxs}
        >
          <Image
            src={photo}
            paddingTop="100%"
            layout="fill"
            objectFit="cover"
            alt={name}
          />
        </Box>
        <Text marginTop={space.xxs} textStyle="title">
          {name}
        </Text>
        <Flex justifyContent="space-between">
          <Box>
            <Text textStyle="caption" color={colors.lightGrey}>
              {remaining_quantity}
              {" / "}
              {quantity}
              {" remaining"}
            </Text>
            <Text textStyle="captionLarge" color={colors.accent}>
              {"Buy Now with "}
              {number_of_coins} {creator_coin_detail.display.symbol}
            </Text>
          </Box>
          <Avatar
            marginLeft="auto"
            marginTop="auto"
            size={24}
            image={COIN_ICON}
          />
        </Flex>
      </Container>
    </Link>
  );
}

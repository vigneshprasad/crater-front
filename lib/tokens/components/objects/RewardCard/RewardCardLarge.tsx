import { Variants } from "framer-motion";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import {
  Text,
  Box,
  AnimatedBox,
  AnimatedBoxProps,
  Span,
  Flex,
  Avatar,
  Link,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
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
  const { name, photo, number_of_coins, creator_coin_detail, id } = reward;
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
        px={space.xs}
        py={space.xs}
        gridGap={space.xxs}
        variants={cardVariants}
        whileHover={{
          border: `2px solid ${colors.accent}`,
        }}
        {...rest}
      >
        <Box position="relative" h={240}>
          <Image src={photo} layout="fill" objectFit="cover" alt={name} />
        </Box>
        <Text textStyle="headline6">{name}</Text>

        <Flex justifyContent="space-between" alignItems="center">
          <Text textStyle="title">
            {number_of_coins}{" "}
            <Span fontWeight="600" color={colors.accent}>
              {creator_coin_detail.display.symbol}
            </Span>
          </Text>

          <Avatar
            size={24}
            image={creator_coin_detail.creator_detail.profile_detail.photo}
          />
        </Flex>

        <Button w="100% !important" variant="outline-small" text="Buy Now" />
      </Container>
    </Link>
  );
}

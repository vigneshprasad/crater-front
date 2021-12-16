import { Variants } from "framer-motion";
import { useTheme } from "styled-components";

import Image from "next/image";

import {
  AnimatedBoxProps,
  Link,
  AnimatedBox,
  Text,
  Box,
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

export default function RewardCardSmall({
  reward,
  ...rest
}: IProps): JSX.Element {
  const { name, photo, creator_coin_detail, id } = reward;
  const { radii, space } = useTheme();

  return (
    <AnimatedBox
      position="relative"
      variants={cardVariants}
      borderRadius={radii.xxs}
      overflow="hidden"
      {...rest}
    >
      <Link
        href={PageRoutes.rewardListing(
          creator_coin_detail.creator_detail.slug,
          id
        )}
      >
        <Image src={photo} layout="fill" alt={name} objectFit="cover" />
        <Box position="relative" p={space.xxs}>
          <Text textStyle="headline5">{name}</Text>
        </Box>
      </Link>
    </AnimatedBox>
  );
}

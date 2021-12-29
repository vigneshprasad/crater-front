import { Variants } from "framer-motion";
import { useMemo } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import {
  AnimatedBoxProps,
  Link,
  AnimatedBox,
  Text,
  Box,
  BackgroundVideo,
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
  const {
    name,
    photo,
    creator_coin_detail,
    id,
    photo_mime_type,
    title,
    text_color,
  } = reward;
  const { radii, space, colors } = useTheme();

  const preview = useMemo(() => {
    if (!photo || !photo_mime_type) {
      return <Box w="100" pt="100%" bg={colors.accent} />;
    }

    const type = photo_mime_type.split("/")[0];

    if (type === "image") {
      return <Image src={photo} layout="fill" objectFit="cover" alt={name} />;
    }

    if (type === "video") {
      return (
        <BackgroundVideo
          position="absolute"
          top={0}
          right={0}
          left={0}
          bottom={0}
          w="100%"
          src={photo}
        />
      );
    }

    return <Image src={photo} layout="fill" objectFit="cover" alt={name} />;
  }, [photo, colors, name, photo_mime_type]);

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
        {preview}
        <Box position="relative" p={space.xxs}>
          <Text textStyle="headline5" color={text_color}>
            {title ?? name}
          </Text>
        </Box>
      </Link>
    </AnimatedBox>
  );
}

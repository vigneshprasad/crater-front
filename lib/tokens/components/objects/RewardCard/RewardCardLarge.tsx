import { Variants } from "framer-motion";
import COIN_ICON from "public/images/coin.png";
import { useMemo } from "react";
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
  BackgroundVideo,
} from "@/common/components/atoms";
import { PageRoutes } from "@/common/constants/route.constants";
import { Reward } from "@/tokens/types/token";

interface IProps extends AnimatedBoxProps {
  reward: Reward;
  showAvatar?: boolean;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 0, y: 50 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 50 },
};

const Container = styled(AnimatedBox)``;

export default function RewardCardLarge({
  reward,
  showAvatar = true,
  ...rest
}: IProps): JSX.Element {
  const {
    name,
    photo,
    quantity,
    id,
    photo_mime_type,
    title,
    creator_detail,
    quantity_sold,
  } = reward;
  const { borders, radii, space, colors } = useTheme();

  const preview = useMemo(() => {
    if (!photo || !photo_mime_type) {
      return <Box w="100" pt="100%" bg={colors.accent} />;
    }

    const type = photo_mime_type.split("/")[0];

    if (type === "image") {
      return (
        <Box position="relative" w="100%" pt="100%">
          <Image src={photo} layout="fill" objectFit="cover" alt={name} />
        </Box>
      );
    }

    if (type === "video") {
      return <BackgroundVideo w="100%" src={photo} />;
    }

    return (
      <Box position="relative" w="100%" pt="100%">
        <Image src={photo} layout="fill" objectFit="cover" alt={name} />
      </Box>
    );
  }, [photo, colors, name, photo_mime_type]);

  return (
    <Link href={PageRoutes.rewardListing(creator_detail.slug, id)}>
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
        {showAvatar && (
          <Avatar size={32} image={creator_detail.profile_detail.photo} />
        )}

        {preview}

        <Text marginTop={space.xxs} textStyle="title">
          {title ?? name}
        </Text>
        <Flex justifyContent="space-between">
          <Box>
            <Text textStyle="caption" color={colors.lightGrey}>
              {quantity_sold}
              {" / "}
              {quantity}
              {" remaining"}
            </Text>
            <Text textStyle="captionLarge" color={colors.accent}>
              {"Buy Now with "}
              {quantity_sold} {name}
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

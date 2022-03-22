import STATIC_IMAGES from "public/images";
import { useTheme } from "styled-components";

import { Image, Box, Text, Span } from "@/common/components/atoms";
import { Logo } from "@/common/components/objects/Logo";

import { RewardCardProps } from ".";
import { Container, Card } from "./common";

export default function DiscordRewardCard({
  reward,
  showCount,
  ...rest
}: RewardCardProps): JSX.Element {
  const { creator_detail, quantity, quantity_sold, photo } = reward;
  const { space, colors, radii } = useTheme();

  return (
    <Container blobImage="/images/img_blob_blue.png" {...rest}>
      <Card
        gradient="linear-gradient(
    170deg,
    rgba(9, 34, 255, 0.5),
    rgba(96, 153, 240, 0.1)
  )"
        px={space.xs}
        py={space.xxxxs}
      >
        <Logo mb={space.xxxs} />
        <Box position="relative" mb={space.xxxs}>
          {photo && <Image src={photo} alt="" layout="fill" />}
          <Box right={-16} top={-16} position="absolute">
            <Box h={56} w={56} position="relative">
              <Image
                src={STATIC_IMAGES.ImageDiscordIcon}
                alt=""
                layout="fill"
              />
            </Box>
          </Box>
          <Text
            fontSize="1.6rem"
            lineHeight="2.0rem"
            position="absolute"
            top={36}
            left={48}
            w="50%"
          >
            Join{" "}
            <Span fontWeight="700">
              {creator_detail.profile_detail.name}&apos;s{" "}
            </Span>
            Community
          </Text>
          <Text
            position="absolute"
            bottom={32}
            left={48}
            w="max-content"
            bg={colors.whiteAlpha[1]}
            p={space.xxxxs}
            borderRadius={radii.xxs}
            mt={space.xxs}
          >
            {showCount && showCount}
            {!showCount && `${quantity - quantity_sold} / ${quantity}`}
          </Text>
        </Box>
      </Card>
    </Container>
  );
}

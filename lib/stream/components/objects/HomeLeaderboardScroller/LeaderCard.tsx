import STATIC_IMAGES from "public/images";
import IMAGE from "public/images/img_default_avatar.png";
import { useMemo } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Text } from "@/common/components/atoms";

interface IProps {
  rank: number;
}

const Container = styled(Box)`
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 0px 16px 0px #000000;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 16px 0px rgba(213, 187, 255, 0.5);
  }
`;

export function LeaderCard({ rank }: IProps): JSX.Element {
  const { space, colors, radii, fonts } = useTheme();

  const rankLabel = useMemo(() => {
    if (rank === 1) {
      return (
        <Box position="relative" w={56} h={62}>
          <Image
            layout="fill"
            src={STATIC_IMAGES.ImageRank1}
            alt=""
            objectFit="contain"
          />
        </Box>
      );
    }
  }, [rank]);
  return (
    <Container
      zIndex={2}
      h={172}
      bg={colors.primaryBackground}
      borderRadius={radii.xxxxs}
      position="relative"
    >
      <Box position="absolute" top={-12} left={-12}>
        {rankLabel}
      </Box>

      <Box
        position="relative"
        overflow="hidden"
        h="100%"
        w="100%"
        p={space.xxs}
      >
        <Box position="absolute" top={-12} right={-12}>
          <Box
            position="relative"
            borderRadius="50%"
            size={72}
            overflow="hidden"
          >
            <Image layout="fill" src={IMAGE} alt="image" />
          </Box>
        </Box>

        <Box mt={52}>
          <Text
            color={colors.green[0]}
            fontSize="1.2rem"
            fontFamily={fonts.heading}
          >
            Fig Nelson
          </Text>

          <Text mt={space.xxs} fontSize="1rem">
            WATCH TIME
          </Text>

          <Text fontFamily={fonts.heading} color={colors.accentLight}>
            112.32 mins
          </Text>
        </Box>
      </Box>
    </Container>
  );
}

import STATIC_IMAGES from "public/images";
import { useMemo } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import { Box, Text, Grid, Flex, Icon } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import CreatorApiClient from "@/creators/api";
import { CreatorRank } from "@/creators/types/creator";

interface IProps {
  rank: number;
  creator: CreatorRank;
  updatedList: () => void;
}

const Container = styled(Box)`
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 0px 16px 0px #000000;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 4px 16px 0px rgba(213, 187, 255, 0.5);
  }
`;

export function LeaderCard({
  rank,
  creator,
  updatedList,
}: IProps): JSX.Element {
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

    if (rank === 2) {
      return (
        <Box position="relative" w={56} h={62}>
          <Image
            layout="fill"
            src={STATIC_IMAGES.ImageRank2}
            alt=""
            objectFit="contain"
          />
        </Box>
      );
    }

    if (rank === 3) {
      return (
        <Box position="relative" w={56} h={62}>
          <Image
            layout="fill"
            src={STATIC_IMAGES.ImageRank3}
            alt=""
            objectFit="contain"
          />
        </Box>
      );
    }

    return (
      <Grid
        size={36}
        border={`2px solid ${colors.accentLight}`}
        borderRadius="50%"
      >
        <Text
          color={colors.accentLight}
          fontSize="2rem"
          fontFamily={fonts.heading}
          m="auto auto"
        >
          {rank}
        </Text>
      </Grid>
    );
  }, [rank, colors, fonts]);

  const border = useMemo(() => {
    if (rank === 1) {
      return `2px solid ${colors.yellow[0]}`;
    }

    if (rank === 2) {
      return `2px solid ${colors.muted.silver}`;
    }

    if (rank === 3) {
      return `2px solid ${colors.muted.bronze}`;
    }
    return `2px solid ${colors.accentHover}`;
  }, [rank, colors]);

  const followCreator = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, err] = await CreatorApiClient().subscribeCreator(creator.id);
    if (err) {
      console.log(err);
      return;
    }
    updatedList();
  };

  return (
    <Container
      zIndex={2}
      h={172}
      bg={colors.primaryBackground}
      borderRadius={radii.xxxxs}
      position="relative"
    >
      <Box position="absolute" top={-8} left={-8}>
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
            border={border}
          >
            <Image
              layout="fill"
              src={creator.profile_detail.photo}
              alt="image"
            />
          </Box>
        </Box>

        <Box mt={52}>
          <Text
            color={colors.green[0]}
            fontSize="1.2rem"
            fontFamily={fonts.heading}
          >
            {creator.profile_detail.name}
          </Text>

          <Box mt={space.xxs}>
            {(() => {
              if (creator.watch_time < 5000) {
                if (creator.is_follower) {
                  return (
                    <Flex
                      position="absolute"
                      bottom={16}
                      left={12}
                      alignItems="center"
                      gridGap={space.xxxxs}
                    >
                      <Icon
                        icon="CheckCircle"
                        color={colors.green[0]}
                        size={16}
                      />
                      <Text
                        textStyle="caption"
                        fontWeight="600"
                        color={colors.accentLight}
                      >
                        FOLLOWED
                      </Text>
                    </Flex>
                  );
                }
                return (
                  <Button
                    position="absolute"
                    bottom={16}
                    left={12}
                    variant="text"
                    label="FOLLOW"
                    disabled={creator.is_follower}
                    onClick={followCreator}
                  />
                );
              }

              return (
                <>
                  <Text mt={space.xxs} fontSize="1rem">
                    WATCH TIME
                  </Text>

                  <Text fontFamily={fonts.heading} color={colors.accentLight}>
                    {creator.watch_time}
                  </Text>
                </>
              );
            })()}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

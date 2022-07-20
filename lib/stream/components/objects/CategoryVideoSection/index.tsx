import { useCallback, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import { useRouter } from "next/router";

import {
  AnimatedBox,
  Box,
  Flex,
  Grid,
  Icon,
  Shimmer,
  Spinner,
  Text,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import { PastStreamListItemWithRecording } from "@/community/types/community";
import { StreamCategory } from "@/creators/types/stream";

import HorizontalVideoSwitch from "../HorizontalVideoSwitch";

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    max-height: 100%;
  }
`;

type IProps = {
  streamCategory: StreamCategory;
  pastStreams?: PastStreamListItemWithRecording[];
  loading: boolean;
  followCategory: () => void;
  unfollowCategory: () => void;
};

export default function CategoryVideoSection({
  streamCategory,
  pastStreams,
  loading,
  followCategory,
  unfollowCategory,
}: IProps): JSX.Element | null {
  const router = useRouter();
  const { space, colors, radii, breakpoints } = useTheme();
  const [activePastStreamIndex, setActivePastStreamIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const switchPastStreamVideo = useCallback(() => {
    if (pastStreams) {
      let index = activePastStreamIndex + 1;
      if (index === pastStreams.length) {
        index = 0;
      }

      setActivePastStreamIndex(index);
    }
  }, [pastStreams, activePastStreamIndex]);

  if (isMobile === undefined) return null;

  return (
    <Box px={[0, space.xs]} py={[0, 28]}>
      <Grid
        gridTemplateColumns={["1fr", "1fr 1fr"]}
        gridTemplateAreas={[
          `
          "video"
          "pageTitle"
        `,
          `
          "pageTitle video"
        `,
        ]}
        gridGap={[space.xxs, space.s]}
      >
        <Box px={[space.xxxs, 0]} py={[0, space.xs]} gridArea="pageTitle">
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              fontSize={["2.8rem", "5.6rem"]}
              fontWeight={500}
              lineHeight={["3.2rem", "6.8rem"]}
            >
              {streamCategory.name}
            </Text>

            {isMobile && (
              <Flex flexDirection="row" gridGap={space.xxxxxs}>
                {Array(pastStreams?.length)
                  .fill("")
                  .map((_, index) => (
                    <Box
                      w={6}
                      h={6}
                      borderRadius="50%"
                      bg={
                        index === activePastStreamIndex
                          ? colors.white[0]
                          : colors.secondaryLight
                      }
                      key={index}
                    />
                  ))}
              </Flex>
            )}
          </Flex>
          <Text
            py={space.xxxxxs}
            textStyle={isMobile ? "captionLarge" : "bodyLarge"}
            fontWeight={[500, 600]}
            color={colors.textTertiary}
          >
            {`Watch and learn ${streamCategory.name.toLowerCase()} from experts streaming on Crater`}
          </Text>

          {!isMobile && (
            <HorizontalVideoSwitch
              pastStreams={pastStreams}
              activePastStreamIndex={activePastStreamIndex}
            />
          )}

          {streamCategory.is_follower ? (
            <Button
              w={["100%", "auto"]}
              variant="dark-flat"
              mt={[space.xxxs, 40]}
              h={44}
              label="Following"
              borderRadius={radii.xxxxs}
              display={["flex", "block"]}
              alignItems="center"
              justifyContent="center"
              prefixElement={
                loading ? (
                  <Spinner size={24} />
                ) : (
                  <Icon
                    size={20}
                    icon="CheckCircle"
                    color={colors.greenSuccess}
                  />
                )
              }
              textProps={{
                fontSize: "1.6rem",
                fontWeight: 600,
                lineHeight: "2.0rem",
              }}
              disabled={loading}
              onClick={unfollowCategory}
            />
          ) : (
            <Button
              w={["100%", "auto"]}
              mt={[space.xxxs, 40]}
              h={40}
              label="Follow"
              borderRadius={radii.xxxxs}
              display={["flex", "block"]}
              alignItems="center"
              justifyContent="center"
              prefixElement={
                loading ? (
                  <Spinner size={24} />
                ) : (
                  <Icon
                    icon="Add"
                    size={20}
                    color={colors.white[0]}
                    fill={true}
                  />
                )
              }
              textProps={{
                fontSize: "1.6rem",
                fontWeight: 600,
                lineHeight: "2.0rem",
              }}
              disabled={loading}
              onClick={followCategory}
            />
          )}
        </Box>

        <Box gridArea="video" justifySelf="end" position="relative">
          {!isMobile && (
            <Box
              position="absolute"
              background="linear-gradient(
                  0.14deg, #010101 43.73%, rgba(1, 1, 1, 0.88) 56.67%, rgba(18, 18, 18, 0) 81.86%
                )"
              transform="rotate(90deg)"
              w={530}
              h={298}
              right={250}
            />
          )}
          {!pastStreams ? (
            <Shimmer w={["100%", 530]} h={["auto", 298]} />
          ) : (
            <Box
              w={["100%", 530]}
              h={["auto", 298]}
              cursor="pointer"
              onClick={() =>
                router.push(
                  PageRoutes.streamVideo(pastStreams[activePastStreamIndex].id)
                )
              }
            >
              <Video
                src={`${pastStreams[activePastStreamIndex].recording_details.recording}#t=600`}
                autoPlay
                muted
                loop
                ref={videoRef}
                onTimeUpdate={() => {
                  if (videoRef.current && videoRef.current.currentTime >= 625) {
                    switchPastStreamVideo();
                  }
                }}
              />
            </Box>
          )}
        </Box>
      </Grid>
    </Box>
  );
}

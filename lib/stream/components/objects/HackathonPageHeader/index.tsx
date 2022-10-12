import STATIC_IMAGES from "public/images";
import { useCallback, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";
import { useRouter } from "next/router";

import { Box, Flex, Grid, Shimmer, Text } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import { PastStreamListItemWithRecording } from "@/community/types/community";

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    max-height: 100%;
  }
`;

type IProps = {
  pastStreams?: PastStreamListItemWithRecording[];
  scrollTo: () => void;
};

export default function HackathonPageHeader({
  pastStreams,
  scrollTo,
}: IProps): JSX.Element | null {
  const { space, colors, fonts, breakpoints } = useTheme();
  const router = useRouter();
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

  const videoGradient = isMobile ? (
    <Box
      position="absolute"
      background="linear-gradient(0.14deg, #010101 25.26%, rgba(1, 1, 1, 0.88) 29.64%, rgba(1, 1, 1, 0) 43.2%, rgba(18, 18, 18, 0) 81.86%)"
      w="100%"
      h="100%"
      left={0}
      top={50}
    />
  ) : (
    <Box
      position="absolute"
      background="linear-gradient(0.14deg, #010101 43.73%, rgba(1, 1, 1, 0.88) 56.67%, rgba(18, 18, 18, 0) 81.86%)"
      transform="rotate(90deg)"
      w={530}
      h={298}
      right={250}
    />
  );

  console.log(pastStreams);

  return (
    <Grid
      px={[0, space.xxs]}
      py={[0, 28]}
      gridTemplateColumns={["minmax(0, 1fr)", "1fr 1fr"]}
      gridTemplateAreas={[
        `
          "video"
          "pageTitle"
        `,
        `
          "pageTitle video"
        `,
      ]}
      gridGap={[0, space.s]}
    >
      <Flex
        gridArea="pageTitle"
        px={space.xxxs}
        py={[0, space.xxs]}
        gridGap={[space.xxxs, space.xs]}
      >
        <Box>
          <Box position="relative" h={[64, 170]} w={[140, 315]}>
            <Image
              src={STATIC_IMAGES.Encrypt2022Logo}
              alt="Encrypt logo"
              layout="fill"
            />
          </Box>
          <Text
            pt={space.xxxs}
            fontSize={["1.4rem", "2.0rem"]}
            lineHeight={["2.0rem", "2.8rem"]}
            fontFamily={fonts.heading}
            style={{ textShadow: "0px 0px 24px #FFFFFF" }}
          >
            2022
          </Text>
          <Button
            display={["none", "block"]}
            mt={24}
            w={148}
            h={40}
            label="Let's Go!"
            onClick={scrollTo}
          />
        </Box>
        {/* <Box>
          <Box position="relative" h={[118, 278]} w={[100, 235]}>
            <Image
              src={STATIC_IMAGES.EncryptHeaderGraphic}
              alt="Encrypt graphic"
              layout="fill"
            />
          </Box>
        </Box> */}
      </Flex>

      <Box gridArea="video" justifySelf={["start", "end"]} position="relative">
        {(() => {
          if (pastStreams === undefined) {
            return <Shimmer w={["100%", 530]} h={["auto", 298]} />;
          }

          if (pastStreams.length === 0) {
            return <Box />;
          }

          return (
            <Box
              position="relative"
              w={["100%", 530]}
              h={["auto", 298]}
              cursor="pointer"
              zIndex={-1}
              onClick={() =>
                router.push(
                  PageRoutes.streamVideo(pastStreams[activePastStreamIndex].id)
                )
              }
            >
              {videoGradient}
              {pastStreams.length > 0 && (
                <Video
                  src={`${pastStreams[activePastStreamIndex].recording_details?.recording}#t=600`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  ref={videoRef}
                  onTimeUpdate={() => {
                    if (
                      videoRef.current &&
                      videoRef.current.currentTime >= 625
                    ) {
                      switchPastStreamVideo();
                    }
                  }}
                />
              )}
            </Box>
          );
        })()}

        {pastStreams && pastStreams?.length !== 0 && (
          <Flex
            flexDirection="row"
            gridGap={space.xxxxxs}
            position="absolute"
            bottom={-20}
            right={[20, "40%"]}
          >
            {Array(pastStreams.length)
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
      </Box>
    </Grid>
  );
}

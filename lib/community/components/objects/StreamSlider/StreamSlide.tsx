import { AnimationControls, Variant } from "framer-motion";
import { useRef } from "react";
import styled, { useTheme } from "styled-components";

import Image from "next/image";

import {
  AnimatedBox,
  Grid,
  Box,
  Text,
  Avatar,
  Link,
  Flex,
  Icon,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2/Button";
import ExpandingText from "@/common/components/objects/ExpandingText";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

const SLIDE_WIDTH = 711;

type SlideVariants = "main" | "previous" | "next" | "hidden";

export interface IStreamSlideProps {
  stream: Webinar;
  initial: SlideVariants;
  animate?: AnimationControls | string;
}

const mobileVariant: Record<"main", Variant> = {
  main: {
    scale: 1.0,
    zIndex: 1,
    opacity: 1,
    display: "block",
  },
};

const desktopVariants: Record<SlideVariants, Variant> = {
  main: {
    top: "50%",
    right: "50%",
    x: "50%",
    y: "-50%",
    scale: 1.0,
    zIndex: 1,
    opacity: 1,
    display: "block",
  },
  previous: {
    top: "50%",
    right: "50%",
    x: "15%",
    y: "-50%",
    scale: 0.6,
    zIndex: 0,
    opacity: 1,
    display: "block",
  },
  next: {
    top: "50%",
    right: "50%",
    x: "85%",
    y: "-50%",
    scale: 0.6,
    zIndex: 0,
    display: "block",
  },
  hidden: {
    zIndex: -1,
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
};

const Span = styled.span`
  color: ${({ theme }) => theme.colors.accent};
`;

const Video = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radii.xxs}px;
`;

export function StreamSlide({
  stream,
  initial,
  animate,
}: IStreamSlideProps): JSX.Element | null {
  const { space, colors } = useTheme();
  const startTime = DateTime.parse(stream.start);

  const { breakpoints } = useTheme();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);
  const videoRef = useRef<HTMLVideoElement>(null);

  if (isMobile === undefined) return null;

  return (
    <AnimatedBox
      position={["static", "absolute"]}
      animate={isMobile ? "main" : animate}
      overflow="hidden"
      bg={colors.black[2]}
      h="100%"
      w={["100%", "calc(100% - 48px)"]}
      maxWidth={SLIDE_WIDTH}
      initial={initial}
      variants={isMobile ? mobileVariant : desktopVariants}
      transition={{
        duration: 0.2,
      }}
    >
      <Grid
        gridTemplateColumns={["1fr", "1fr min-content"]}
        h="100%"
        position="relative"
      >
        <Link
          href={
            stream.is_live
              ? `/livestream/${stream.id}`
              : stream.is_past
              ? `/video/${stream.id}`
              : `/session/${stream.id}`
          }
        >
          <Box
            position="relative"
            w={["100%", 0]}
            h={[0, "100%"]}
            pl={[0, "100%"]}
            pt={["56.25%"]}
          >
            {stream.is_past && stream.recording_details?.is_published ? (
              <Video
                autoPlay
                muted
                controls
                controlsList="nodownload"
                src={`${stream.recording_details.recording}#t=600`}
                ref={videoRef}
                onEnded={() => {
                  if (videoRef.current) {
                    videoRef.current.play();
                    videoRef.current.currentTime += 600;
                  }
                }}
              />
            ) : (
              stream.topic_detail?.image && (
                <Image
                  objectFit="cover"
                  src={stream.topic_detail?.image}
                  layout="fill"
                  alt={stream.topic_detail.name}
                />
              )
            )}
          </Box>
        </Link>

        <AnimatedBox
          display="grid"
          variants={{
            main: {
              width: 181,
            },
            next: {
              width: 0,
              opacity: 1,
            },
            previous: {
              width: 0,
              opacity: 1,
            },
          }}
          overflowY={["auto"]}
          alignItems="start"
          bg={colors.primaryDark}
          p={space.xxs}
          gridAutoFlow="row"
          gridGap={space.xxxs}
          gridAutoRows="min-content 1fr"
        >
          <Grid
            gridGap={space.xxs}
            gridTemplateColumns="min-content 1fr"
            alignItems="center"
          >
            {stream.host_detail?.slug && (
              <Link href={PageRoutes.creatorProfile(stream.host_detail?.slug)}>
                <Avatar
                  size={40}
                  alt={stream.host_detail?.name || ""}
                  image={stream.host_detail?.photo}
                />
              </Link>
            )}
            <Box>
              <Text textStyle="body" fontWeight={600}>
                {stream.host_detail?.name}
              </Text>
              <Text textStyle="small" pt={4}>
                20 streams
              </Text>
            </Box>
          </Grid>
          {stream.host_detail?.introduction ? (
            <ExpandingText textStyle="small" color={colors.slate} maxLines={3}>
              {stream.host_detail?.introduction}
            </ExpandingText>
          ) : (
            <Box />
          )}
        </AnimatedBox>

        <Box
          px={space.xxs}
          py={space.xxxxs}
          gridColumn="1 / span 2"
          backgroundColor={colors.primaryLight}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Text>{stream.topic_detail.name}</Text>
              <Flex
                color={colors.textSecondary}
                alignItems="center"
                gridGap={space.xxxxxs}
              >
                <Icon size={16} color="inherit" icon="Calendar" />
                <Text textStyle="small" color="inherit">
                  {startTime.toFormat(DateTime.DEFAULT_FORMAT)}
                </Text>
              </Flex>
            </Box>

            <Button
              label="JOIN STREAM"
              variant="dark-flat-no-bg"
              color={colors.accentLight}
              justifySelf="end"
            />
          </Flex>
        </Box>

        <Box
          borderRadius={4}
          py={2}
          px={space.xxxs}
          bg={stream.is_live ? colors.red[0] : colors.black[0]}
          position="absolute"
          top={space.xxs}
          left={space.xxs}
        >
          {stream.is_live ? (
            <Text textStyle="caption">LIVE</Text>
          ) : stream.is_past ? (
            <Text textStyle="caption" color={colors.accent}>
              Previously LIVE
            </Text>
          ) : (
            <Text textStyle="caption">
              <Span>Live On</Span> {startTime.toFormat(DateTime.DEFAULT_FORMAT)}
            </Text>
          )}
        </Box>
      </Grid>
    </AnimatedBox>
  );
}

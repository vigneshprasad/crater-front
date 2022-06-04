import { useMemo } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import {
  AnimatedBox,
  AnimatedBoxProps,
  Grid,
  Box,
  Avatar,
  Flex,
  Text,
  Icon,
  Link,
  LinkProps,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import ExpandingText from "@/common/components/objects/ExpandingText";
import VideoPlayer from "@/common/components/objects/VideoPlayer";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/community/types/community";

interface IProps extends AnimatedBoxProps {
  stream: Webinar;
  linkProps?: Partial<LinkProps>;
}

const ACTIVE_SLIDE_IMAGE_WIDTH = 540;

export function StreamSlide({
  stream,
  animate,
  linkProps,
  ...rest
}: IProps): JSX.Element | null {
  const { breakpoints, space, colors, radii } = useTheme();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);
  const HEIGHT = ACTIVE_SLIDE_IMAGE_WIDTH * (9 / 16);

  const startTime = DateTime.parse_with_milliseconds(stream.start).toFormat(
    DateTime.DEFAULT_FORMAT
  );

  const variants = useMemo(() => {
    if (isMobile) {
      return undefined;
    }
    return {
      next: {
        display: "block",
        top: "50%",
        right: "50%",
        x: "85%",
        y: "-50%",
        scale: 0.7,
        zIndex: 10,
        opacity: 0.6,
        boxShadow: "none",
      },
      prev: {
        display: "block",
        top: "50%",
        right: "50%",
        x: "15%",
        y: "-50%",
        scale: 0.7,
        zIndex: 10,
        opacity: 0.6,
        boxShadow: "none",
      },
      active: {
        opacity: 1,
        display: "block",
        top: "50%",
        right: "50%",
        x: "50%",
        y: "-50%",
        scale: 1.0,
        zIndex: 50,
        boxShadow: "0px 0px 16px 0px #000000",
      },
      hidden: {
        top: "50%",
        right: "50%",
        x: "50%",
        y: "-50%",
        opacity: 0,
        zIndex: -1,
        transitionEnd: {
          display: "none",
        },
      },
    };
  }, [isMobile]);

  const link = useMemo(() => {
    if (stream.is_past && stream.recording_details?.recording)
      return PageRoutes.streamVideo(stream.id);
    if (stream.is_live) return PageRoutes.stream(stream.id);
    return PageRoutes.session(stream.id);
  }, [stream]);

  if (isMobile === undefined) return null;

  if (isMobile) {
    return (
      <Link href={link}>
        <Box
          bg={colors.primaryDark}
          overflow="hidden"
          borderRadius={radii.xxxxs}
        >
          <Box position="relative" pt="56.25%">
            <Image
              layout="fill"
              src={stream.topic_detail.image}
              alt={stream.topic_detail.name}
            />

            {stream.is_live && (
              <Text
                textStyle="caption"
                bg={colors.red[0]}
                px={8}
                py={2}
                borderRadius={4}
                position="absolute"
                top={16}
                left={16}
                fontWeight="600"
              >
                LIVE
              </Text>
            )}
          </Box>
          <Box px={space.xxxs} pt={space.xxxxs}>
            <Text maxLines={2} overflow="hidden">
              {stream.topic_detail.name}
            </Text>
            <Box py={space.xxxxs}>
              {stream.is_live && (
                <Text textStyle="caption" color={colors.accentLight}>
                  Streaming Now
                </Text>
              )}
              {!stream.is_live && (
                <Flex gridGap={4} alignItems="center">
                  <Icon
                    color={colors.textSecondary}
                    icon="Calendar"
                    size={16}
                  />
                  <Text color={colors.textSecondary} textStyle="caption">
                    {startTime}
                  </Text>
                </Flex>
              )}
            </Box>
          </Box>
          <Flex pb={space.xxxxs} px={space.xxxxs} justifyContent="flex-end">
            <Button
              variant="transparent-slider"
              label={stream.is_past ? "WATCH STREAM" : "JOIN STREAM"}
            />
          </Flex>
        </Box>
      </Link>
    );
  }

  return (
    <Link href={link} {...linkProps}>
      <AnimatedBox
        transition={{
          default: {
            type: "sprint",
            stiffness: 80,
          },
        }}
        bg={colors.primaryDark}
        position="absolute"
        variants={variants}
        borderRadius={radii.xxxxs}
        overflow="hidden"
        animate={animate}
        {...rest}
      >
        <Grid gridTemplateColumns={["max-content 180px"]}>
          <Box h={HEIGHT} position="relative" w={ACTIVE_SLIDE_IMAGE_WIDTH}>
            {(() => {
              if (stream.is_past && stream.recording_details?.recording) {
                return (
                  <VideoPlayer
                    position="absolute"
                    top={0}
                    right={0}
                    left={0}
                    bottom={0}
                    autoPlay
                    muted
                    loop
                    src={`${stream.recording_details?.recording}#t=600`}
                  />
                );
              }
              return (
                <Image
                  layout="fill"
                  src={stream.topic_detail.image}
                  alt={stream.topic_detail.name}
                />
              );
            })()}

            {stream.is_live && (
              <Text
                textStyle="caption"
                bg={colors.red[0]}
                px={8}
                py={2}
                borderRadius={4}
                position="absolute"
                top={16}
                left={16}
                fontWeight="600"
              >
                LIVE
              </Text>
            )}
          </Box>
          <Grid
            h={HEIGHT}
            overflowY="auto"
            gridTemplateColumns={["1fr"]}
            px={space.xxs}
            pt={space.xxs}
            gridAutoFlow="row"
            gridAutoRows="max-content"
            gridGap={space.xxxxs}
          >
            <Flex alignItems="center" gridGap={space.xxs}>
              <Avatar size={40} image={stream.host_detail.photo} />
              <Text fontWeight="500" textStyle="body">
                {stream.host_detail.name}
              </Text>
            </Flex>

            <ExpandingText
              textStyle="caption"
              color={colors.textSecondary}
              maxLines={4}
              showMore={animate === "active"}
            >
              {stream.host_detail.introduction}
            </ExpandingText>
          </Grid>

          <Grid
            bg={colors.primaryLight}
            gridColumn="1 / span 2"
            py={10}
            px={space.xxs}
            gridTemplateColumns="1fr 180px"
          >
            <Box>
              <Text>{stream.topic_detail.name}</Text>
              {(() => {
                if (stream.is_live) {
                  return (
                    <Text textStyle="caption" color={colors.accentLight}>
                      Streaming Now
                    </Text>
                  );
                }

                if (stream.is_past) {
                  return (
                    <Flex gridGap={4} alignItems="center">
                      <Text textStyle="caption" color={colors.accentLight}>
                        Streamed
                      </Text>
                      <Icon
                        color={colors.textSecondary}
                        icon="Calendar"
                        size={16}
                      />
                      <Text color={colors.textSecondary} textStyle="caption">
                        {startTime}
                      </Text>
                    </Flex>
                  );
                }

                return (
                  <Flex gridGap={4} alignItems="center">
                    <Text textStyle="caption" color={colors.accentLight}>
                      Streaming
                    </Text>
                    <Icon
                      color={colors.textSecondary}
                      icon="Calendar"
                      size={16}
                    />
                    <Text color={colors.textSecondary} textStyle="caption">
                      {startTime}
                    </Text>
                  </Flex>
                );
              })()}
            </Box>

            <Grid p={space.xxxxs} justifyContent="end" alignItems="center">
              <Button
                variant="transparent-slider"
                label={stream.is_past ? "WATCH STREAM" : "JOIN STREAM"}
              />
            </Grid>
          </Grid>
        </Grid>
      </AnimatedBox>
    </Link>
  );
}

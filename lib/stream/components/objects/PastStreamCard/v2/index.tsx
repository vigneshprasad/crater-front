import { forwardRef, useMemo } from "react";
import { useTheme } from "styled-components";

import Image from "next/image";

import {
  AnimatedBox,
  Text,
  Box,
  Link,
  Flex,
  Avatar,
  Icon,
  Grid,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import DateTime from "@/common/utils/datetime/DateTime";
import { PastStreamListItem } from "@/community/types/community";

export enum CardPosition {
  right,
  left,
  center,
}

interface IProps {
  stream: PastStreamListItem;
  link?: string;
  cardPosition?: CardPosition;
}

const PastStreamCard = forwardRef<HTMLDivElement, IProps>(
  ({ stream, link, cardPosition }, ref) => {
    const { space, radii, colors, breakpoints } = useTheme();
    const startTime = DateTime.parse(stream.start).toFormat(
      DateTime.DEFAULT_FORMAT
    );

    const { matches: isMobile } = useMediaQuery(
      `(max-width: ${breakpoints[0]})`
    );

    const image = (
      <Box
        w="100%"
        position="relative"
        pt="56.25%"
        borderRadius={radii.xxxxs}
        overflow="hidden"
      >
        <Image
          src={stream.topic_detail.image}
          layout="fill"
          alt={stream.topic_detail.name}
        />
      </Box>
    );

    const streamDetails = (
      <>
        <Flex
          pt={space.xxxxs}
          pb={space.xxxxxs}
          gridGap={space.xxxxs}
          alignItems="center"
        >
          <Avatar size={28} image={stream.host_detail.photo} />
          <Text textStyle="body">{stream.host_detail.name}</Text>
        </Flex>
        <Text pb={space.xxxxs} textStyle="title" minHeight={52}>
          {stream.topic_detail.name}
        </Text>
        <Flex opacity={0.8} alignItems="center" gridGap={space.xxxxs}>
          <Icon icon="Calendar" size={16} color={colors.textSecondary} />
          <Text color={colors.textSecondary} textStyle="caption">
            {startTime}
          </Text>
        </Flex>
      </>
    );

    const hoverCardAnim = useMemo(() => {
      const base = {
        initial: {
          opacity: 0,
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          transitionEnd: {
            display: "none",
          },
        },
        hovered: {
          display: "block",
          opacity: 1,
          boxShadow: "0px 0px 16px 0px #000000",
        },
      };
      switch (cardPosition) {
        case CardPosition.center:
          return {
            ...base,
            hovered: {
              ...base.hovered,
              top: -36,
              bottom: -36,
              right: -36,
              left: -36,
            },
          };
        case CardPosition.right:
          return {
            ...base,
            hovered: {
              ...base.hovered,
              top: -36,
              bottom: -36,
              right: 0,
              left: -72,
            },
          };
        case CardPosition.left:
          return {
            ...base,
            hovered: {
              ...base.hovered,
              top: -36,
              bottom: -36,
              right: -72,
              left: 0,
            },
          };
      }
    }, [cardPosition]);

    if (isMobile === undefined) return null;

    if (isMobile) {
      return (
        <Link
          href={link ?? PageRoutes.streamVideo(stream.id)}
          boxProps={{ target: "_blank" }}
        >
          <Grid
            gridGap={space.xxxxs}
            gridTemplateColumns="1fr 2fr"
            borderBottom="1px solid #333333"
          >
            <Box
              position="relative"
              pt="56.25%"
              borderRadius={radii.xxxxs}
              overflow="hidden"
            >
              <Image
                src={stream.topic_detail.image}
                layout="fill"
                alt={stream.topic_detail.name}
              />
            </Box>
            <Box>
              <Text maxLines={2}>{stream.topic_detail.name}</Text>
              <Flex alignItems="center" gridGap={space.xxxxs}>
                <Avatar size={16} image={stream.host_detail.photo} />
                <Text fontSize="1rem">{stream.host_detail.name}</Text>
              </Flex>
            </Box>

            <Flex
              gridColumn="1 / span 2"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex alignItems="center">
                <Icon color={colors.textSecondary} size={16} icon="Calendar" />
                <Text textStyle="caption" color={colors.textSecondary}>
                  {startTime}
                </Text>
              </Flex>

              <Text
                px={space.xxxxs}
                py={space.xxxxs}
                cursor="pointer"
                color={colors.accentLight}
              >
                WATCH
              </Text>
            </Flex>
          </Grid>
        </Link>
      );
    }

    return (
      <Link
        href={link ?? PageRoutes.streamVideo(stream.id)}
        boxProps={{ target: "_blank" }}
      >
        <AnimatedBox
          cursor="pointer"
          ref={ref}
          initial="initial"
          position="relative"
          whileHover="hovered"
          variants={{
            initial: {
              zIndex: 1,
            },
            hovered: {
              zIndex: 25,
            },
          }}
        >
          <AnimatedBox
            variants={{
              initial: {
                display: "block",
                opacity: 1,
                visibility: "visible",
              },
              hovered: {
                opacity: 0,
                transitionEnd: {
                  visibility: "hidden",
                },
              },
            }}
          >
            {image}
            {streamDetails}
          </AnimatedBox>

          <AnimatedBox
            position="absolute"
            borderRadius={radii.xxxxs}
            variants={hoverCardAnim}
          >
            {image}
            <Box bg={colors.primaryDark} p={space.xxxs}>
              {streamDetails}
              <Button
                my={space.xxxxs}
                display="block"
                w="100%"
                label="WATCH STREAM"
              />
            </Box>
          </AnimatedBox>
        </AnimatedBox>
      </Link>
    );
  }
);

PastStreamCard.displayName = "PastStreamCard";

PastStreamCard.defaultProps = {
  link: undefined,
  cardPosition: CardPosition.center,
};

export default PastStreamCard;

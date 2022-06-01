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
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { PageRoutes } from "@/common/constants/route.constants";
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
    const { space, radii, colors } = useTheme();
    const startTime = DateTime.parse(stream.start).toFormat(
      DateTime.DEFAULT_FORMAT
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

    return (
      <Link
        href={link ?? PageRoutes.session(stream.id)}
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

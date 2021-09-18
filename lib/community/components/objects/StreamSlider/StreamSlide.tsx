import { AnimationControls, Variant } from "framer-motion";
import { useTheme } from "styled-components";

import Image from "next/image";

import {
  AnimatedBox,
  Grid,
  Box,
  Text,
  Avatar,
  Link,
} from "@/common/components/atoms";
import ExpandingText from "@/common/components/objects/ExpandingText";
import { Webinar } from "@/creators/types/community";

const SLIDE_WIDTH = 840;

type SlideVariants = "main" | "previous" | "next" | "hidden";

export interface IStreamSlideProps {
  stream: Webinar;
  initial: SlideVariants;
  animate?: AnimationControls | string;
}

const slideVariants: Record<SlideVariants, Variant> = {
  main: {
    top: "50%",
    right: "50%",
    x: "50%",
    y: "-50%",
    width: SLIDE_WIDTH,
    scale: 1.0,
    zIndex: 1,
    opacity: 1,
    display: "block",
  },
  previous: {
    width: SLIDE_WIDTH,
    top: "50%",
    right: "50%",
    x: "25%",
    y: "-50%",
    scale: 0.8,
    zIndex: 0,
    opacity: 1,
    display: "block",
  },
  next: {
    width: SLIDE_WIDTH,
    top: "50%",
    right: "50%",
    x: "75%",
    y: "-50%",
    scale: 0.8,
    zIndex: 0,
    opacity: 1,
    display: "block",
  },
  hidden: {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  },
};

export function StreamSlide({
  stream,
  initial,
  animate,
}: IStreamSlideProps): JSX.Element {
  const { space, colors, radii } = useTheme();
  return (
    <AnimatedBox
      position="absolute"
      animate={animate}
      overflow="hidden"
      borderRadius={radii.xxs}
      bg={colors.black[2]}
      h="100%"
      initial={initial}
      variants={slideVariants}
      transition={{
        duration: 0.4,
      }}
    >
      <Grid gridTemplateColumns="1fr min-content" h="100%" position="relative">
        <Link href={`/session/${stream.id}`}>
          <Box position="relative" w="100%" h="100%">
            {stream.topic_detail?.image && (
              <Image
                objectFit="cover"
                src={stream.topic_detail?.image}
                layout="fill"
                alt={stream.topic_detail.name}
              />
            )}
          </Box>
        </Link>

        <AnimatedBox
          display="grid"
          variants={{
            main: {
              width: 240,
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
          bg={colors.black[2]}
          px={space.xxs}
          py={space.xs}
          gridAutoFlow="row"
          gridGap={space.xxxs}
          gridAutoRows="min-content"
        >
          <Text singleLine textStyle="headline6">
            {stream.topic_detail?.name}
          </Text>
          <Grid
            gridGap={space.xxs}
            gridTemplateColumns="min-content 1fr"
            alignItems="center"
          >
            <Avatar
              size={32}
              image={stream.host_detail?.photo}
              alt={stream.host_detail?.name ?? ""}
            />
            <Text textStyle="title">{stream.host_detail?.name}</Text>
          </Grid>
          <ExpandingText textStyle="body" color={colors.slate} maxLines={3}>
            {stream.topic_detail?.description}
          </ExpandingText>
        </AnimatedBox>
        {stream.is_live && (
          <Box
            borderRadius={4}
            py={2}
            px={space.xxxs}
            bg={colors.red[0]}
            position="absolute"
            top={space.xxs}
            left={space.xxs}
          >
            <Text textStyle="caption">LIVE</Text>
          </Box>
        )}
      </Grid>
    </AnimatedBox>
  );
}

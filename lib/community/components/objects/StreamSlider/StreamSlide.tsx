import { AnimationControls, Variant } from "framer-motion";
import styled, { useTheme } from "styled-components";

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
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import DateTime from "@/common/utils/datetime/DateTime";
import { Webinar } from "@/creators/types/community";

const SLIDE_WIDTH = 840;

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

export function StreamSlide({
  stream,
  initial,
  animate,
}: IStreamSlideProps): JSX.Element | null {
  const { space, colors, radii } = useTheme();
  const startTime = DateTime.parse(stream.start);

  const { breakpoints } = useTheme();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  return (
    <AnimatedBox
      position={["static", "absolute"]}
      animate={isMobile ? "main" : animate}
      overflow="hidden"
      borderRadius={radii.xxs}
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
        <Link href={`/session/${stream.id}`}>
          <Box
            position="relative"
            w={["100%", 0]}
            h={[0, "100%"]}
            pl={[0, "100%"]}
            pt={["56.25%"]}
          >
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
              width: 280,
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
          bg={colors.black[2]}
          px={space.xxs}
          py={space.xs}
          gridAutoFlow="row"
          gridGap={space.xxxs}
          gridAutoRows="min-content"
        >
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
            {stream.host_detail?.introduction}
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
        {!stream.is_live && (
          <Box
            borderRadius={4}
            py={2}
            px={space.xxxs}
            bg={colors.black[0]}
            position="absolute"
            top={space.xxs}
            left={space.xxs}
          >
            <Text textStyle="caption">
              <Span>Live On</Span> {startTime.toFormat(DateTime.DEFAULT_FORMAT)}
            </Text>
          </Box>
        )}
      </Grid>
    </AnimatedBox>
  );
}

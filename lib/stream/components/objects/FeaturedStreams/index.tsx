import STATIC_IMAGES from "public/images";
import { useMemo, useRef } from "react";
import styled, { useTheme } from "styled-components";
import { Pagination, Navigation } from "swiper";
import SwiperCore from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import { useRouter } from "next/router";

import {
  Box,
  Grid,
  Text,
  Icon,
  Flex,
  Link,
  Shimmer,
  AnimatedBox,
  Span,
} from "@/common/components/atoms";
import { Button, IconButton } from "@/common/components/atoms/v2";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll";
import { PageRoutes } from "@/common/constants/route.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import { Webinar } from "@/community/types/community";

const StyledFlex = styled(Flex)`
  &:hover {
    text-decoration: underline;
  }
`;

interface IProps {
  livestreams?: Webinar[];
}

export default function FeaturedStreams({
  livestreams,
}: IProps): JSX.Element | null {
  const { space, colors, radii, breakpoints } = useTheme();
  const router = useRouter();
  const swiperRef = useRef<SwiperCore>();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const [featuredStreams, featuredUpcomingStreams] = useMemo<
    [Webinar[] | null, Webinar[] | null]
  >(() => {
    if (!livestreams) return [null, null];

    const featuredUpcoming: Webinar[] = [];
    const featuredStreams: Webinar[] = [];

    livestreams.map((stream) =>
      stream.is_live === false && stream.is_past === false
        ? featuredUpcoming.push(stream)
        : featuredStreams.push(stream)
    );

    return [featuredStreams, featuredUpcoming];
  }, [livestreams]);

  const sliderButtons = (
    <Flex
      w="inherit"
      px={[space.xxxxs, space.xxxs]}
      position="absolute"
      justifyContent="space-between"
      alignItems="center"
      top="50%"
      zIndex={1}
    >
      <IconButton
        buttonStyle="slider-round"
        icon="ChevronLeft"
        iconProps={{ h: [16, 20], size: [16, 20] }}
        onClick={() => swiperRef.current?.slidePrev()}
      />
      <IconButton
        buttonStyle="slider-round"
        icon="ChevronRight"
        iconProps={{ h: [16, 20], size: [16, 20] }}
        onClick={() => swiperRef.current?.slideNext()}
      />
    </Flex>
  );

  const infoCard = (
    <Box
      gridArea="info"
      px={space.xs}
      py={[space.xxs, 32]}
      bg={colors.primaryDark}
      borderRadius={radii.xxs}
    >
      <Text
        fontSize={["1.8rem", "2.0rem"]}
        fontWeight={500}
        lineHeight={["2.4rem", "3.0rem"]}
      >
        Start streaming on Crater and grow your audience.
      </Text>
      <Link href={PageRoutes.hub()}>
        <StyledFlex pt={[24, 32]} alignItems="center" gridGap={space.xxxxxs}>
          <Text textStyle="captionLarge" fontWeight={600}>
            Know more
          </Text>
          <Icon icon="ShowMore" size={10} transform="rotate(-90deg)" />
        </StyledFlex>
      </Link>
    </Box>
  );

  const featureUpcomingSection = useMemo<JSX.Element[]>(() => {
    if (!featuredUpcomingStreams) {
      return Array(3)
        .fill("")
        .map((_, index) => (
          <Shimmer
            gridArea={`upcoming-${index + 1}`}
            w="100%"
            h="100%"
            borderRadius={radii.xxs}
            key={index}
          />
        ));
    }

    return featuredUpcomingStreams.slice(0, 3).map((stream, index) => (
      <Link href={PageRoutes.session(stream.id)} key={stream.id}>
        <Box
          gridArea={`upcoming-${index + 1}`}
          position="relative"
          pt="56.25%"
          borderRadius={radii.xxs}
          overflow="hidden"
        >
          <Image
            src={stream.topic_detail.image}
            alt={stream.topic_detail.name}
            layout="fill"
          />
        </Box>
      </Link>
    ));
  }, [radii, featuredUpcomingStreams]);

  if (isMobile === undefined) return null;

  return (
    <Box>
      <Grid
        gridTemplateColumns={["minmax(0, 1fr)", "2fr 1fr 1fr"]}
        gridTemplateRows="1fr"
        gridTemplateAreas={[
          `
          "livestreams"
        `,
          `
          "livestreams upcoming-1 upcoming-2"
          "livestreams upcoming-3 info"
        `,
        ]}
        gridGap={space.xxxs}
      >
        {(() => {
          if (!featuredStreams) {
            return (
              <Shimmer
                w="100%"
                h="100%"
                gridArea="livestreams"
                borderRadius={radii.xxs}
              />
            );
          }

          return (
            <>
              <Swiper
                onBeforeInit={(swiper) => {
                  swiperRef.current = swiper;
                }}
                slidesPerView={1}
                loop={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                style={{
                  width: "100%",
                  height: "100%",
                  gridArea: "livestreams",
                  position: "relative",
                  borderRadius: radii.xxs,
                }}
              >
                {featuredStreams.map((stream) => (
                  <SwiperSlide key={stream.id}>
                    <AnimatedBox
                      h="100%"
                      w="100%"
                      initial="rest"
                      whileHover="hover"
                    >
                      <Box
                        h="inherit"
                        position="relative"
                        pt="56.25%"
                        borderRadius={radii.xxs}
                        overflow="hidden"
                      >
                        <Image
                          src={
                            stream.topic_detail.image ??
                            STATIC_IMAGES.ImageStreamDefault
                          }
                          alt={stream.topic_detail.name}
                          layout="fill"
                        />
                      </Box>

                      {stream.is_live && (
                        <Box
                          px={[space.xxxxs, space.xxs]}
                          py={[2, space.xxxxxs]}
                          bg="#E53834"
                          position="absolute"
                          top={12}
                          left={12}
                          borderRadius={radii.xxs}
                        >
                          <Text textStyle="caption" fontWeight={[600, 700]}>
                            LIVE
                          </Text>
                        </Box>
                      )}

                      <AnimatedBox
                        w="inherit"
                        p={space.xxxs}
                        justifyContent="space-between"
                        alignItems="center"
                        position="absolute"
                        background="rgba(0, 0, 0, 0.72)"
                        borderRadius="0px 0px 8px 8px"
                        bottom={0}
                        display={["none", "flex"]}
                        gridGap={space.s}
                        zIndex={1}
                        variants={{
                          rest: {
                            opacity: 0,
                          },
                          hover: {
                            opacity: 1,
                            y: 0,
                          },
                        }}
                      >
                        <Text textStyle="title" fontWeight={600} maxLines={1}>
                          {stream.topic_detail.name}
                        </Text>
                        <Button
                          variant="dark-flat"
                          label={
                            stream.is_live ? "Join Live Stream" : "Watch Stream"
                          }
                          h={40}
                          textProps={{
                            fontSize: "1.6rem",
                            fontWeight: 600,
                          }}
                          onClick={() => {
                            if (stream.is_live) {
                              router.push(PageRoutes.stream(stream.id));
                            } else {
                              router.push(PageRoutes.streamVideo(stream.id));
                            }
                          }}
                        />
                      </AnimatedBox>

                      {sliderButtons}
                    </AnimatedBox>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          );
        })()}

        {!isMobile && (
          <>
            {featureUpcomingSection}
            {infoCard}
          </>
        )}
      </Grid>
      {isMobile && (
        <HorizontalScroll
          gridAutoFlow="column"
          gridAutoColumns="256px"
          gridGap={space.xxs}
        >
          {featureUpcomingSection}

          <Span>{infoCard}</Span>
        </HorizontalScroll>
      )}
    </Box>
  );
}

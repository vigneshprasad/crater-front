import STATIC_IMAGES from "public/images";
import { useCallback, useMemo, useRef } from "react";
import styled, { useTheme } from "styled-components";
import useSWR from "swr";

import Image from "next/image";

import { Box, Grid, Marquee, Text } from "@/common/components/atoms";
import BaseLayout from "@/common/components/layouts/BaseLayout/v2";
import { AsideNav } from "@/common/components/objects/AsideNav/v2";
import Footer from "@/common/components/objects/Footer";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import { StreamCategory } from "@/creators/types/stream";
import usePastStreamsWithRecording from "@/stream/context/PastStreamsWithRecordingContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";

import HackathonPageHeader from "../../objects/HackathonPageHeader";
import UpcomingStreamsList from "../../objects/UpcomingStreamsList";

const StyledBaseLayout = styled(BaseLayout)`
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default function EncryptHackathonPage(): JSX.Element {
  const { space, colors, fonts, breakpoints } = useTheme();
  const { streams: pastStreams } = usePastStreamsWithRecording();
  const streamsRef = useRef<HTMLDivElement>(null);

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const { data: category } = useSWR<StreamCategory>(
    API_URL_CONSTANTS.stream.retrieveCategory("hackers")
  );

  const scrollToStreams = useCallback(() => {
    if (streamsRef.current) {
      streamsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [streamsRef]);

  const sponsors = useMemo<
    {
      name: string;
      image: StaticImageData;
      width: number;
      height: number;
    }[]
  >(() => {
    return [
      {
        name: "OG Club DAO",
        image: STATIC_IMAGES.ImageOgClubDao,
        width: 28,
        height: 50,
      },
      {
        name: "Builders Tribe",
        image: STATIC_IMAGES.ImageBuildersTribe,
        width: 82,
        height: 42,
      },
      {
        name: "Solgirls",
        image: STATIC_IMAGES.ImageSolgirls,
        width: 38,
        height: 60,
      },
      {
        name: "Metaschool",
        image: STATIC_IMAGES.ImageMetaschool,
        width: 165,
        height: 28,
      },
      {
        name: "Fueler",
        image: STATIC_IMAGES.ImageFuelers,
        width: 134,
        height: 36,
      },
      {
        name: "Hack2Skill",
        image: STATIC_IMAGES.ImageHack2Skill,
        width: 92,
        height: 34,
      },
      {
        name: "Blockchain Bulls",
        image: STATIC_IMAGES.ImageBlockchainBulls,
        width: 124,
        height: 46,
      },
      {
        name: "Emissary",
        image: STATIC_IMAGES.ImageEmissary,
        width: 88,
        height: 55,
      },
      {
        name: "Xenon Labs",
        image: STATIC_IMAGES.ImageXenonLabs,
        width: 110,
        height: 34,
      },
    ];
  }, []);

  const sponsorsLine1 = (
    <Grid
      py={[0, space.xxs]}
      gridAutoFlow="column"
      gridTemplateColumns="repeat(auto-fit, 1fr)"
      placeItems="center"
      gridGap={isMobile ? space.s : space.xxxxxs}
    >
      {sponsors
        .slice(0, isMobile ? sponsors.length : 6)
        .map(({ name, image, width, height }, index) => (
          <Box w={width} h={height} position="relative" key={index}>
            <Image src={image} alt={name} layout="fill" />
          </Box>
        ))}
    </Grid>
  );

  return (
    <StyledBaseLayout aside={<AsideNav />} overflowY="scroll">
      <Grid
        pb={space.m}
        gridTemplateColumns="minmax(0, 1fr)"
        gridGap={space.xxs}
      >
        <HackathonPageHeader
          pastStreams={pastStreams}
          scrollTo={scrollToStreams}
        />

        <Box mx="auto" w={1000} pb={[0, space.s]}>
          {isMobile ? (
            <Marquee py={0} bg={colors.primaryBackground}>
              {sponsorsLine1}
            </Marquee>
          ) : (
            <>
              {sponsorsLine1}
              <Grid
                mx="auto"
                w={500}
                py={space.xxs}
                gridAutoFlow="column"
                gridTemplateColumns="repeat(auto-fit, 1fr)"
                placeItems="center"
                gridGap={space.xxxxxs}
              >
                {sponsors
                  .slice(6)
                  .map(({ name, image, width, height }, index) => (
                    <Box w={width} h={height} position="relative" key={index}>
                      <Image src={image} alt={name} layout="fill" />
                    </Box>
                  ))}
              </Grid>
            </>
          )}
        </Box>

        <Box justifySelf="center">
          <Text
            textStyle={isMobile ? "title" : "headline5"}
            fontFamily={fonts.heading}
            lineHeight="3.4rem"
            textAlign="center"
          >
            Let the hacking begin!
          </Text>
          <Text
            pt={[space.xxxxs, space.xxxs]}
            textStyle={isMobile ? "caption" : "title"}
            fontWeight={600}
            lineHeight={["1.8rem", "2.0rem"]}
            color={colors.textQuartenary}
            textAlign="center"
          >
            Stream, Chat, learn & stand to win Rs. 100,000 for building a
            solution that leads us to a better world
          </Text>
        </Box>

        <Box ref={streamsRef}>
          <StyledHeadingDivider label="Streams" />
          <UpcomingStreamsList />
        </Box>

        <Box>
          <StyledHeadingDivider label="Competing Hackers" />
          <UpcomingStreamsProvider category={category?.pk} pageSize={8}>
            <UpcomingStreamsList />
          </UpcomingStreamsProvider>
        </Box>
      </Grid>
      <Box
        px={[space.xxs, space.s]}
        py={[space.xxs, space.s]}
        backgroundColor={colors.primaryDark}
      >
        <Footer />
      </Box>
    </StyledBaseLayout>
  );
}

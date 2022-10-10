import styled, { useTheme } from "styled-components";
import useSWR from "swr";

import { Box, Grid, Text } from "@/common/components/atoms";
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

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  const { data: category } = useSWR<StreamCategory>(
    API_URL_CONSTANTS.stream.retrieveCategory("hackers")
  );

  return (
    <StyledBaseLayout aside={<AsideNav />} overflowY="scroll">
      <Grid
        pb={space.m}
        gridTemplateColumns="minmax(0, 1fr)"
        gridGap={space.xxs}
      >
        <HackathonPageHeader pastStreams={pastStreams} />

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

        <Box>
          <StyledHeadingDivider label="Streams" />
          <UpcomingStreamsList />
        </Box>

        <Box>
          <StyledHeadingDivider label="Competing Hackers" />
          <UpcomingStreamsProvider category={category?.pk}>
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

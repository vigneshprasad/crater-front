import { useTheme } from "styled-components";

import { Box, Text, Icon, Flex, Link } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spinner";
import Footer from "@/common/components/objects/Footer";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";
import { PageRoutes } from "@/common/constants/route.constants";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import HomePageCreatorStaticContent from "@/creators/components/objects/HomePageCreatorStaticContent";
import CategoryFilteredPastList from "@/stream/components/objects/CategoryFilteredPastList";
import CategoryFilteredUpcomingList from "@/stream/components/objects/CategoryFilteredUpcomingList";
import HomeLeaderboardScroller from "@/stream/components/objects/HomeLeaderboardScroller";
import { StreamSlider } from "@/stream/components/objects/StreamSlider";
import HomePageAuctions from "@/tokens/components/objects/HomePageAuctions";

export default function StreamsPage(): JSX.Element {
  const { liveStreams, loading: liveStreamsLoading } = useLiveStreams();
  const { space, colors, fonts } = useTheme();

  if (liveStreamsLoading || !liveStreams) return <Spinner />;

  return (
    <>
      <Box px={[space.xxs, space.xs]}>
        <StreamSlider streams={liveStreams} />
      </Box>

      <Link href={PageRoutes.leaderboard}>
        <Flex my={space.xxs} px={[space.xxs, space.xs]} alignItems="center">
          <Text fontFamily={fonts.heading}>Trending</Text>
          <Icon mx={space.xxxxs} icon="Trophy" color="#FFAA00" />
          <Icon icon="ChevronRight" />
        </Flex>
      </Link>

      <HomeLeaderboardScroller />

      <StyledHeadingDivider label="Upcoming Streams" />
      <CategoryFilteredUpcomingList />

      <HomePageAuctions />

      <StyledHeadingDivider label="Previously Live" />

      <CategoryFilteredPastList />

      <Box
        mt={space.xs}
        px={[space.xxs, space.s]}
        py={[space.xxs, space.s]}
        backgroundColor={colors.primaryDark}
      >
        <HomePageCreatorStaticContent />
        <Footer />
      </Box>
    </>
  );
}

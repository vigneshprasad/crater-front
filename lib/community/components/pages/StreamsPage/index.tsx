import { useTheme } from "styled-components";
import useSWR from "swr";

import { RewardSale } from "@/auction/types/sales";
import { Box, Text } from "@/common/components/atoms";
import Footer from "@/common/components/objects/Footer";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import HomePageCreatorStaticContent from "@/creators/components/objects/HomePageCreatorStaticContent";
import CategoryFilteredPastList from "@/stream/components/objects/CategoryFilteredPastList";
import CategoryFilteredUpcomingList from "@/stream/components/objects/CategoryFilteredUpcomingList";
import FeaturedStreams from "@/stream/components/objects/FeaturedStreams";
import HomeLeaderboardScroller from "@/stream/components/objects/HomeLeaderboardScroller";
import HomePageStoreSection from "@/tokens/components/objects/HomePageStoreSection";

export default function StreamsPage(): JSX.Element {
  const { space, colors } = useTheme();
  const { liveStreams } = useLiveStreams();

  const { data: sales } = useSWR<RewardSale[]>(
    API_URL_CONSTANTS.sales.getRecentSalesList
  );

  return (
    <Box pl={[space.xxxs, space.xxs]}>
      <Box pr={[space.xxxs, space.xs]} py={[space.xs, 28]}>
        <FeaturedStreams livestreams={liveStreams} />
      </Box>

      <Box
        mt={space.xs}
        pl={space.xxxs}
        borderLeft={`2px solid ${colors.accentLight}`}
      >
        <Text textStyle="headline5Small">Top Creators</Text>
      </Box>

      <HomeLeaderboardScroller />

      <Box
        mt={space.xs}
        mb={space.xxxxs}
        pl={space.xxxs}
        borderLeft={`2px solid ${colors.accentLight}`}
      >
        <Text textStyle="headline5Small">Upcoming Streams</Text>
      </Box>

      <CategoryFilteredUpcomingList />

      <HomePageStoreSection sales={sales} />

      <Box
        mt={space.xs}
        mb={space.xxxxs}
        pl={space.xxxs}
        borderLeft={`2px solid ${colors.accentLight}`}
      >
        <Text textStyle="headline5Small">Previously Live</Text>
      </Box>

      <CategoryFilteredPastList />

      <Box pr={[space.xxxs, space.xs]}>
        <HomePageCreatorStaticContent />
      </Box>

      <Box px={[space.xxs, space.xs]} py={36}>
        <Footer />
      </Box>
    </Box>
  );
}

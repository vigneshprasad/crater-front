import { useTheme } from "styled-components";
import useSWR from "swr";

import { RewardSale } from "@/auction/types/sales";
import { Box, Text } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spinner";
import Footer from "@/common/components/objects/Footer";
import { API_URL_CONSTANTS } from "@/common/constants/url.constants";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import HomePageCreatorStaticContent from "@/creators/components/objects/HomePageCreatorStaticContent";
import CategoryFilteredPastList from "@/stream/components/objects/CategoryFilteredPastList";
import CategoryFilteredUpcomingList from "@/stream/components/objects/CategoryFilteredUpcomingList";
import HomeLeaderboardScroller from "@/stream/components/objects/HomeLeaderboardScroller";
import { StreamSlider } from "@/stream/components/objects/StreamSlider";
import HomePageStoreSection from "@/tokens/components/objects/HomePageStoreSection";

export default function StreamsPage(): JSX.Element {
  const { liveStreams, loading: liveStreamsLoading } = useLiveStreams();
  const { space, colors } = useTheme();

  const { data: sales } = useSWR<RewardSale[]>(
    API_URL_CONSTANTS.sales.getRecentSalesList
  );

  if (liveStreamsLoading || !liveStreams) return <Spinner />;

  return (
    <Box pl={space.xxs}>
      <Box px={[space.xxs, space.xs]}>
        <StreamSlider streams={liveStreams} />
      </Box>

      <Box
        my={space.xs}
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

      <HomePageCreatorStaticContent />

      <Box px={[space.xxs, space.xs]} py={36}>
        <Footer />
      </Box>
    </Box>
  );
}

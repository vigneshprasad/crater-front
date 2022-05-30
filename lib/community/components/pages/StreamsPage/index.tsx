import { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import { Box } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spinner";
import Footer from "@/common/components/objects/Footer";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import HomePageCreatorStaticContent from "@/creators/components/objects/HomePageCreatorStaticContent";
import CategoryFilteredPastList from "@/stream/components/objects/CategoryFilteredPastList";
import CategoryFilteredUpcomingList from "@/stream/components/objects/CategoryFilteredUpcomingList";
import HomePageAuctions from "@/tokens/components/objects/HomePageAuctions";

import { IStreamSliderProps } from "../../objects/StreamSlider";

const StreamSlider = dynamic<IStreamSliderProps>(() =>
  import("../../objects/StreamSlider").then(({ StreamSlider }) => StreamSlider)
);

export default function StreamsPage(): JSX.Element {
  const { liveStreams, loading: liveStreamsLoading } = useLiveStreams();
  const { space, colors } = useTheme();

  if (liveStreamsLoading || !liveStreams) return <Spinner />;

  return (
    <>
      <Box mx={[space.xxs, space.xs]}>
        <StreamSlider liveStreams={liveStreams} />
      </Box>

      <StyledHeadingDivider label="Upcoming Streams" />
      <CategoryFilteredUpcomingList />

      <HomePageAuctions />

      <StyledHeadingDivider label="Streams you may like" />

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

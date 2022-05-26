import { useState } from "react";
import { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import { Box } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spinner";
import Footer from "@/common/components/objects/Footer";
import StyledHeadingDivider from "@/common/components/objects/StyledHeadingDivider";
import { useLiveStreams } from "@/community/context/LiveStreamsContext";
import HomePageCreatorStaticContent from "@/creators/components/objects/HomePageCreatorStaticContent";
import CategoriesList from "@/stream/components/objects/CategoriesList";
import HomePagePastStreams from "@/stream/components/objects/HomePagePastStreams";
import HomePageUpcomingStreams from "@/stream/components/objects/HomePageUpcomingStreams";
import useStreamCategories from "@/stream/context/StreamCategoryContext";
import HomePageAuctions from "@/tokens/components/objects/HomePageAuctions";

import { IStreamSliderProps } from "../../objects/StreamSlider";

const StreamSlider = dynamic<IStreamSliderProps>(() =>
  import("../../objects/StreamSlider").then(({ StreamSlider }) => StreamSlider)
);

export default function StreamsPage(): JSX.Element {
  const { liveStreams, loading: liveStreamsLoading } = useLiveStreams();
  const { space, colors } = useTheme();
  const { streamCategories } = useStreamCategories();
  const [upcomingStreamFilter, setUpcomingStreamFilter] = useState<
    number | undefined
  >(undefined);
  const [pastStreamFilter, setPastStreamFilter] = useState<number | undefined>(
    undefined
  );

  if (liveStreamsLoading || !liveStreams) return <Spinner />;

  return (
    <>
      <Box mx={[space.xxs, space.xs]}>
        <StreamSlider liveStreams={liveStreams} />
      </Box>

      <StyledHeadingDivider label="Upcoming Streams" />
      <Box mx={space.xxs} pb={space.s}>
        <CategoriesList
          categories={streamCategories}
          selectedCategory={upcomingStreamFilter}
          setCategory={setUpcomingStreamFilter}
        />
      </Box>
      <HomePageUpcomingStreams category={upcomingStreamFilter} />

      <HomePageAuctions />

      <StyledHeadingDivider label="Streams you may like" />
      <Box mx={space.xxs} pb={space.s}>
        <CategoriesList
          categories={streamCategories}
          selectedCategory={pastStreamFilter}
          setCategory={setPastStreamFilter}
        />
      </Box>
      <HomePagePastStreams category={pastStreamFilter} />

      <Box
        mt={space.xs}
        px={[space.xxs, space.s]}
        py={[space.xxs, space.s]}
        backgroundColor={colors.primaryDark}
        position="relative"
      >
        <HomePageCreatorStaticContent />
        <Footer />
      </Box>
    </>
  );
}

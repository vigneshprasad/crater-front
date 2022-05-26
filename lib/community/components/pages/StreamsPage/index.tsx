import { useState } from "react";
import { useTheme } from "styled-components";

import dynamic from "next/dynamic";

import { Box } from "@/common/components/atoms";
import Spinner from "@/common/components/atoms/Spiner";
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

// const Span = styled.span`
//   color: ${({ theme }) => theme.colors.accent};
// `;

// const StyledBox = styled(Box)<BoxProps>`
//   margin: 0 auto;
//   width: 943px;
//   height: 25px;
//   background: linear-gradient(
//     104.66deg,
//     rgba(136, 46, 232, 0.6) 21.6%,
//     rgba(89, 174, 211, 0.6) 81.04%
//   );
//   filter: blur(60px);
//   transform: matrix(1, 0, 0, -1, 0, 0);
// `;

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
        {/* <StyledBox /> */}
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
        px={space.s}
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

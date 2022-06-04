import { useTheme } from "styled-components";

import { Box, Shimmer } from "@/common/components/atoms";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll";
import useCreatorRankList from "@/creators/context/CreatorRankListContext";

import { LeaderCard } from "./LeaderCard";

export default function HomeLeaderboardScroller(): JSX.Element {
  const { space, colors, radii } = useTheme();
  const { creators, revalidate } = useCreatorRankList();
  return (
    <HorizontalScroll
      pt={space.xxs}
      gridAutoColumns="144px"
      gridAutoFlow="column"
      px={space.xs}
      mb={space.s}
      pb={space.xs}
      gridGap={space.xs}
    >
      <Box
        position="absolute"
        bg={colors.primaryDark}
        top="40%"
        right={0}
        left={0}
        bottom={0}
        zIndex={0}
      />

      {(() => {
        if (!creators) {
          return Array(4)
            .fill("")
            .map((_, index) => (
              <Shimmer
                h={172}
                zIndex={2}
                key={index}
                borderRadius={radii.xxxxs}
              />
            ));
        }
        return creators.map((creator, index) => {
          return (
            <LeaderCard
              rank={index + 1}
              key={creator.id}
              creator={creator}
              updatedList={() => revalidate()}
            />
          );
        });
      })()}
    </HorizontalScroll>
  );
}

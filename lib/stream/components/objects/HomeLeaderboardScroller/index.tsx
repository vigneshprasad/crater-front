import { useTheme } from "styled-components";

import { Box, Shimmer } from "@/common/components/atoms";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll";
import useCreatorRankList from "@/creators/context/CreatorRankListContext";

import { LeaderCard } from "./LeaderCard";

export default function HomeLeaderboardScroller(): JSX.Element {
  const { space, radii } = useTheme();
  const { creators, revalidate } = useCreatorRankList();
  return (
    <HorizontalScroll
      pl={[30, space.s]}
      py={[space.xs, space.s]}
      gridAutoFlow="column"
      gridAutoColumns="250px"
      gridGap={[space.s, space.m]}
      actionContainerProps={{ h: 196 }}
      zIndex={100}
    >
      <Box
        w="100%"
        h={[160, 196]}
        position="absolute"
        background="linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, #0E0E0E 100%)"
        left={0}
        top={0}
        zIndex={-1}
        borderRadius={radii.xxs}
      />
      {(() => {
        if (!creators) {
          return Array(4)
            .fill("")
            .map((_, index) => (
              <Shimmer
                w={235}
                h={145}
                zIndex={2}
                key={index}
                borderRadius={radii.s}
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

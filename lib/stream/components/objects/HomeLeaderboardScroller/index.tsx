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
      pt={[space.xxxxs, space.xs]}
      pb={[space.s, space.m]}
      mt={[0, space.xs]}
      px={[space.xs, space.s]}
      gridAutoFlow="column"
      gridAutoColumns="250px"
      gridGap={[space.s, space.m]}
    >
      <Box
        h={[142, 220]}
        position="absolute"
        background="linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, #0E0E0E 100%)"
        top={["4%", "-24%"]}
        right={0}
        left={0}
        bottom={0}
        zIndex={0}
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

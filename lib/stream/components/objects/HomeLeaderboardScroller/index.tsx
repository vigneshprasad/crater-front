import { useTheme } from "styled-components";

import { Box } from "@/common/components/atoms";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll";

import { LeaderCard } from "./LeaderCard";

export default function HomeLeaderboardScroller(): JSX.Element {
  const { space, colors } = useTheme();
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
      {Array(10)
        .fill("")
        .map((_, index) => (
          <LeaderCard rank={index + 1} key={index} />
        ))}
    </HorizontalScroll>
  );
}

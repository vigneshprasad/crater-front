import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTheme } from "styled-components";

import { Box, Flex, Grid, Icon, Shimmer } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import HorizontalScroll from "@/common/components/objects/HorizontalScroll";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import useCreatorRankList from "@/creators/context/CreatorRankListContext";

import CreatorCard from "../CreatorCard";

export default function TopCreatorsList(): JSX.Element | null {
  const { space, colors, breakpoints } = useTheme();
  const [initialClick, setInitialClick] = useState(true);
  const { creators, nextPage, setCreatorsPage } = useCreatorRankList();

  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);

  if (isMobile === undefined) return null;

  const creatorCard = (
    <AnimatePresence>
      {(() => {
        if (!creators) {
          return Array(4)
            .fill("")
            .map((_, index) => <Shimmer h={[200, 220]} key={index} />);
        }

        return creators?.map((creator) => (
          <CreatorCard
            slug={creator.slug}
            name={creator.profile_detail?.name}
            key={creator.user}
            image={creator.profile_detail?.photo}
            followers={creator.subscriber_count}
          />
        ));
      })()}
    </AnimatePresence>
  );

  if (isMobile) {
    return (
      <HorizontalScroll
        px={space.xxxs}
        gridAutoFlow="column"
        gridAutoColumns="140px"
        gridGap={space.xxxs}
      >
        {creatorCard}
      </HorizontalScroll>
    );
  }

  return (
    <Box>
      <Grid
        px={[space.xxs, space.xxs]}
        py={[space.xxs]}
        gridGap={[space.xxs]}
        gridTemplateColumns={[
          "repeat(auto-fill, minmax(106px, 1fr))",
          "repeat(auto-fill, minmax(160px, 1fr))",
        ]}
      >
        {creatorCard}
      </Grid>
      {nextPage && (
        <Flex
          mx={space.xxs}
          gridGap={space.xxs}
          alignItems="center"
          display={["none", "flex"]}
        >
          <Flex flex="1" h={1} bg={colors.black[0]} />
          <Button
            suffixElement={<Icon icon="ChevronDown" size={20} />}
            variant="dark-flat"
            label="Show More"
            onClick={() => {
              if (initialClick) {
                setCreatorsPage((page) => page + 1);
                setInitialClick(false);
                return;
              }

              setCreatorsPage((page) => page + 2);
            }}
          />
          <Flex flex="1" h={1} bg={colors.black[0]} />
        </Flex>
      )}
    </Box>
  );
}

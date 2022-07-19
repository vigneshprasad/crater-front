import { AnimatePresence } from "framer-motion";
import { useTheme } from "styled-components";

import { Box, Grid, Shimmer } from "@/common/components/atoms";
import { CreatorRank } from "@/creators/types/creator";

import CreatorCard from "../CreatorCard";

interface IProps {
  creators?: CreatorRank[];
}

export default function TopCreatorsList({ creators }: IProps): JSX.Element {
  const { space } = useTheme();

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
      </Grid>
    </Box>
  );
}

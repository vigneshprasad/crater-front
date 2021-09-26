import { AnimatePresence } from "framer-motion";
import { useTheme } from "styled-components";

import { Grid } from "@/common/components/atoms";
import { Creator } from "@/creators/types/creator";

import CreatorCard from "../CreatorCard";

interface IProps {
  creators?: Creator[];
  loading: boolean;
}

export default function CreatorsList({
  creators,
  loading,
}: IProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Grid
      px={[space.xs, space.s]}
      py={[space.xxs]}
      overflowX="scroll"
      gridAutoFlow="column"
      gridGap={[space.xxs]}
      gridAutoColumns={[160, 180]}
    >
      <AnimatePresence>
        {(() => {
          if (loading) {
            return Array(4)
              .fill("")
              .map((_, index) => <CreatorCard.Loader key={index} />);
          }

          return creators?.map((creator) => (
            <CreatorCard
              id={creator.id}
              name={creator.profile_detail?.name}
              key={creator.user}
              image={creator.profile_detail?.photo}
              followers={creator.follower_count}
            />
          ));
        })()}
      </AnimatePresence>
    </Grid>
  );
}

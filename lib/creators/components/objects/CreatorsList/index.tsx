import { Grid } from "@/common/components/atoms";
import { theme } from "@/common/theme";
import { useCreatorList } from "@/creators/hooks";

import CreatorCard from "../CreatorCard";

const CreatorsList = () => {
  const { creators } = useCreatorList({});

  return (
    <Grid
      px={[32]}
      py={[72]}
      overflowX="scroll"
      gridAutoFlow="column"
      gridGap={[theme.space.s]}
      gridAutoColumns={[280]}
      gridTemplateRows="minmax(360px, 1fr)"
    >
      {creators?.results.map((creator) => (
        <CreatorCard
          id={creator.id}
          name={creator.name}
          key={creator.user}
          image={creator.photo}
        />
      ))}
    </Grid>
  );
};

export default CreatorsList;

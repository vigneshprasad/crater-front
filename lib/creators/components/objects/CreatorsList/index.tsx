import { Grid } from "@/common/components/atoms";
import { theme } from "@/common/theme";
import { Creator } from "@/creators/types/creator";

import CreatorCard from "../CreatorCard";

interface IProps {
  creators: Creator[];
}

export default function CreatorsList({ creators }: IProps): JSX.Element {
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
      {creators.map((creator) => (
        <CreatorCard
          id={creator.id}
          name={creator.profile_properties?.name}
          key={creator.user}
          image={creator.profile_properties?.photo}
        />
      ))}
    </Grid>
  );
}

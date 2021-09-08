import { Grid } from "@/common/components/atoms";
import { theme } from "@/common/theme";
import { useCreatorList } from "@/creators/hooks";

import { MemberItem } from "./MemberItem";

export type IMembersListProps = {
  intialData?: unknown;
};

const { space } = theme;

export function MembersList(): JSX.Element {
  const { creators } = useCreatorList({ certified: false });

  return (
    <Grid px={[space.s]} gridTemplateColumns="repeat(6, minmax(180px, 1fr))">
      {creators?.results.map((creator) => (
        <MemberItem
          key={creator.user}
          name={creator.name}
          image={creator.photo}
        />
      ))}
    </Grid>
  );
}

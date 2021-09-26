import { useTheme } from "styled-components";

import { Grid } from "@/common/components/atoms";
import { Creator } from "@/creators/types/creator";

import { MemberItem } from "./MemberItem";

export type IMembersListProps = {
  members: Creator[];
};

export function MembersList({ members }: IMembersListProps): JSX.Element {
  const { space } = useTheme();
  return (
    <Grid px={[space.s]} gridTemplateColumns="repeat(6, minmax(180px, 1fr))">
      {members.map((creator) => (
        <MemberItem
          key={creator.user}
          name={creator.profile_detail?.name}
          image={creator.profile_detail?.photo}
          tagLine={creator.tag_list?.[0].name}
        />
      ))}
    </Grid>
  );
}

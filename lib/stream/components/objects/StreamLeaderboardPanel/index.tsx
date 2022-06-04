import { useTheme } from "styled-components";

import { Grid } from "@/common/components/atoms";
import LeaderboardTable from "@/leaderboard/components/objects/LeaderboardTable";

export default function StreamLeaderboardPanel(): JSX.Element {
  const { space } = useTheme();
  return (
    <Grid position="relative">
      <LeaderboardTable
        position="absolute"
        top={0}
        right={0}
        left={0}
        bottom={0}
        overflowY="auto"
        showBelowDropdown={true}
        heading="Stream to win"
        px={space.xxxs}
        py={space.xxxs}
      />
    </Grid>
  );
}

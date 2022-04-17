import { useTheme } from "styled-components";

import { Grid } from "@/common/components/atoms";
import LeaderboardTable from "@/leaderboard/components/objects/LeaderboardTable";

export default function StreamLeaderboardPanel(): JSX.Element {
  const { space } = useTheme();
  return (
    <Grid>
      <LeaderboardTable
        showBelowDropdown={true}
        heading="Stream to win"
        px={space.xxxs}
        py={space.xxxs}
      />
    </Grid>
  );
}

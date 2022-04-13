import { useTheme } from "styled-components";

import { Box } from "@/common/components/atoms";
import LeaderboardTable from "@/leaderboard/components/objects/LeaderboardTable";

export default function StreamLeaderboardPanel(): JSX.Element {
  const { space } = useTheme();
  return (
    <Box>
      <LeaderboardTable px={space.xxxs} />
    </Box>
  );
}

import { useRouter } from "next/router";

import LeaderboardPageLayout from "@/leaderboard/components/layouts/LeaderboardPageLayout";
import LeaderboardPage from "@/leaderboard/components/pages/LeaderboardPage";
import { ChallengeListProvider } from "@/leaderboard/context/ChallegeListContext";
import { LeaderboardListProvider } from "@/leaderboard/context/LeaderboardListContext";
import { UserLeaderboardListProvider } from "@/leaderboard/context/UserLeaderboardListContext";

export default function Leaderboard(): JSX.Element {
  const router = useRouter();

  return (
    <LeaderboardPageLayout
      seo={{
        title: "Leaderboard",
      }}
    >
      <ChallengeListProvider>
        <LeaderboardListProvider
          filterChallenge={router.query.challenge as string}
        >
          <UserLeaderboardListProvider
            filterLeaderboard={router.query.leaderboard as string}
          >
            <LeaderboardPage />
          </UserLeaderboardListProvider>
        </LeaderboardListProvider>
      </ChallengeListProvider>
    </LeaderboardPageLayout>
  );
}

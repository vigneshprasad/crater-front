import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Grid, Link } from "@/common/components/atoms";
import { BaseTabBar } from "@/common/components/objects/BaseTabBar";
import { PageRoutes } from "@/common/constants/route.constants";
import { useWebinar } from "@/community/context/WebinarContext";
import { ChallengeListProvider } from "@/leaderboard/context/ChallegeListContext";
import { LeaderboardListProvider } from "@/leaderboard/context/LeaderboardListContext";
import { UserLeaderboardListProvider } from "@/leaderboard/context/UserLeaderboardListContext";
import { ChatColorModeProvider } from "@/stream/providers/ChatColorModeProvider";

import LiveStreamPanelTabItem from "../LiveStreamPanelTabItem";
import StreamChat from "../StreamChat";
import StreamLeaderboardPanel from "../StreamLeaderboardPanel";
import StreamRewardsPanel from "../StreamRewardsPanel";

type TabKeys = "chat" | "auction" | "leaderboard";

const TABS = (id: string | number): Record<TabKeys, JSX.Element> => ({
  chat: (
    <Link href={PageRoutes.stream(id, "chat")} shallow>
      <LiveStreamPanelTabItem icon="Chat" label="Chat" />
    </Link>
  ),
  auction: (
    <Link href={PageRoutes.stream(id, "auction")} shallow>
      <LiveStreamPanelTabItem icon="Auction" label="Auction" />
    </Link>
  ),
  leaderboard: (
    <Link href={PageRoutes.stream(id, "leaderboard")} shallow>
      <LiveStreamPanelTabItem icon="Leaderboard" label="Leaderboard" />
    </Link>
  ),
});

interface IProps {
  initial?: TabKeys;
}

export default function LiveStreamPanel({ initial }: IProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(initial);
  const { space, borders, colors } = useTheme();
  const { webinar } = useWebinar();
  const router = useRouter();

  useEffect(() => {
    if (router) {
      const { query } = router;

      const tab = query.tab;
      if (tab) {
        setActiveTab(tab as TabKeys);
      }
    }
  }, [router, setActiveTab]);

  return (
    <Grid gridTemplateRows={["min-content 1fr"]} bg={["black.5", "black.5"]}>
      {webinar ? (
        <BaseTabBar
          bg={colors.primaryLight}
          px={space.xxxs}
          activeTab={activeTab}
          tabs={TABS(webinar.id)}
          borderLeft={`1px solid ${colors.black[0]}`}
        />
      ) : (
        <Box />
      )}

      {activeTab === "chat" && webinar && !webinar.closed && (
        <ChatColorModeProvider host={webinar.host}>
          <StreamChat stream={webinar} />
        </ChatColorModeProvider>
      )}
      {activeTab === "auction" && webinar && (
        <StreamRewardsPanel stream={webinar} />
      )}
      {activeTab === "leaderboard" && (
        <ChallengeListProvider>
          <LeaderboardListProvider
            filterChallenge={router.query.challenge as string}
          >
            <UserLeaderboardListProvider
              filterLeaderboard={router.query.leaderboard as string}
            >
              <StreamLeaderboardPanel />
            </UserLeaderboardListProvider>
          </LeaderboardListProvider>
        </ChallengeListProvider>
      )}
    </Grid>
  );
}

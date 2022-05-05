import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Grid, Link, Icon } from "@/common/components/atoms";
import {
  BaseTabBar,
  BaseTabItem,
} from "@/common/components/objects/BaseTabBar";
import { PageRoutes } from "@/common/constants/route.constants";
import { theme } from "@/common/theme";
import { useWebinar } from "@/community/context/WebinarContext";
import { ChallengeListProvider } from "@/leaderboard/context/ChallegeListContext";
import { LeaderboardListProvider } from "@/leaderboard/context/LeaderboardListContext";
import { UserLeaderboardListProvider } from "@/leaderboard/context/UserLeaderboardListContext";
import { ChatColorModeProvider } from "@/stream/providers/ChatColorModeProvider";

import StreamChat from "../StreamChat";
import StreamLeaderboardPanel from "../StreamLeaderboardPanel";
import StreamRewardsPanel from "../StreamRewardsPanel";

type TabKeys = "chat" | "auction" | "leaderboard";

const TABS = (id: string | number): Record<TabKeys, JSX.Element> => ({
  chat: (
    <Link href={PageRoutes.stream(id, "chat")} shallow>
      <BaseTabItem label="Chat" />
    </Link>
  ),
  auction: (
    <Link href={PageRoutes.stream(id, "auction")} shallow>
      <BaseTabItem
        title="Exclusive time, content, goods or communities that you can bid on to access."
        label="Auction"
        suffixElement={
          <Icon size={12} color={theme.colors.slate} fill icon="Info" />
        }
      />
    </Link>
  ),
  leaderboard: (
    <Link href={PageRoutes.stream(id, "leaderboard")} shallow>
      <BaseTabItem label="Leaderboard" />
    </Link>
  ),
});

interface IProps {
  initial?: TabKeys;
}

export default function LiveStreamPanel({ initial }: IProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(initial);
  const { borders } = useTheme();
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
    <Grid
      gridTemplateRows={["max-content 1fr"]}
      bg={["black.5", "black.5"]}
      borderLeft={["none", `2px solid ${borders.main}`]}
    >
      {webinar ? (
        <BaseTabBar activeTab={activeTab} tabs={TABS(webinar.id)} />
      ) : (
        <Box />
      )}

      {activeTab === "chat" && webinar && !webinar.closed && (
        <ChatColorModeProvider>
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

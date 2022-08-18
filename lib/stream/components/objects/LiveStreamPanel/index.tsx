import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import LiveStreamAuctions from "@/auction/components/objects/LiveStreamAuctions";
import { Grid, Link, Shimmer } from "@/common/components/atoms";
import { BaseTabBar } from "@/common/components/objects/BaseTabBar";
import { PageRoutes } from "@/common/constants/route.constants";
import { useWebinar } from "@/community/context/WebinarContext";
import { ChallengeListProvider } from "@/leaderboard/context/ChallegeListContext";
import { LeaderboardListProvider } from "@/leaderboard/context/LeaderboardListContext";
import { UserLeaderboardListProvider } from "@/leaderboard/context/UserLeaderboardListContext";

import LiveStreamPanelTabItem from "../LiveStreamPanelTabItem";
import StreamChat from "../StreamChat";
import StreamLeaderboardPanel from "../StreamLeaderboardPanel";

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
  const { space, colors } = useTheme();
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

  if (!webinar) {
    return <Shimmer h="100%" w="100%" />;
  }

  return (
    <Grid gridTemplateRows={["max-content 1fr"]} bg={colors.primaryBackground}>
      <BaseTabBar
        bg={colors.primaryLight}
        px={space.xxxs}
        activeTab={activeTab}
        tabs={TABS(webinar.id)}
        borderLeft={`1px solid ${colors.black[0]}`}
        gridAutoColumns="1fr"
      />

      {activeTab === "chat" && webinar && !webinar.closed && (
        <StreamChat stream={webinar} />
      )}
      {activeTab === "auction" && webinar && <LiveStreamAuctions />}
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

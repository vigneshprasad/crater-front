import { useEffect, useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import { Box, Grid, Link } from "@/common/components/atoms";
import {
  BaseTabBar,
  BaseTabItem,
} from "@/common/components/objects/BaseTabBar";
import { PageRoutes } from "@/common/constants/route.constants";
import { useWebinar } from "@/community/context/WebinarContext";

import StreamChat from "../StreamChat";
import StreamRewardsPanel from "../StreamRewardsPanel";

type TabKeys = "chat" | "rewards";

const TABS = (id: string | number): Record<TabKeys, JSX.Element> => ({
  chat: (
    <Link href={PageRoutes.stream(id, "chat")} shallow>
      <BaseTabItem label="Chat" />
    </Link>
  ),
  rewards: (
    <Link href={PageRoutes.stream(id, "rewards")} shallow>
      <BaseTabItem label="Rewards" />
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
      gridTemplateRows="max-content 1fr"
      bg={["black.5", "black.5"]}
      borderLeft={["none", `2px solid ${borders.main}`]}
    >
      {webinar ? (
        <BaseTabBar activeTab={activeTab} tabs={TABS(webinar.id)} />
      ) : (
        <Box />
      )}

      {activeTab === "chat" && webinar && <StreamChat stream={webinar} />}
      {activeTab === "rewards" && webinar && (
        <StreamRewardsPanel stream={webinar} />
      )}
    </Grid>
  );
}

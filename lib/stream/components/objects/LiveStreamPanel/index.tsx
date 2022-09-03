import { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";

import { useRouter } from "next/router";

import SaleApiClient from "@/auction/api/SaleApiClient";
import LiveStreamAuctions from "@/auction/components/objects/LiveStreamAuctions";
import { RewardSaleLog } from "@/auction/types/sales";
import useSystemSocket from "@/auth/context/SystemSocketContext";
import {
  Flex,
  Grid,
  Link,
  Shimmer,
  Text,
  Box,
  Span,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { BaseTabBar } from "@/common/components/objects/BaseTabBar";
import ContainerModal from "@/common/components/objects/ContainerModal";
import { INotificationData } from "@/common/components/objects/NotificationStack/types";
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

const GradientBorder = styled(Box)`
  position: relative;
  padding: 0.5em 0.8em;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 4px;
    border: 1px solid transparent;
    background: linear-gradient(65.32deg, #f1616a, #9146ff, #9db3ff, #0d849e)
      border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`;

export default function LiveStreamPanel({ initial }: IProps): JSX.Element {
  const [visibleModal, setVisbleModal] = useState(false);
  const [purchaseRequest, setPurchaseRequest] = useState<
    RewardSaleLog | undefined
  >(undefined);
  const [activeTab, setActiveTab] = useState(initial);
  const { space, colors } = useTheme();
  const { webinar } = useWebinar();
  const router = useRouter();
  const { socket } = useSystemSocket();

  const acceptSale = async (): Promise<void> => {
    if (purchaseRequest) {
      await SaleApiClient().postSaleLogAccept(purchaseRequest.id);
      setVisbleModal(false);
      setPurchaseRequest(undefined);
    }
  };

  const declineSale = async (): Promise<void> => {
    if (purchaseRequest) {
      await SaleApiClient().postSaleLogDecline(purchaseRequest.id);
      setVisbleModal(false);
      setPurchaseRequest(undefined);
    }
  };

  useEffect(() => {
    if (router) {
      const { query } = router;

      const tab = query.tab;
      if (tab) {
        setActiveTab(tab as TabKeys);
      }
    }
  }, [router, setActiveTab]);

  useEffect(() => {
    if (socket != null) {
      socket.on("user:notification", (data: INotificationData) => {
        if (data.type === "creator-sale-request") {
          setPurchaseRequest(data.data);
          setVisbleModal(true);
        }
      });
    }
  }, [socket]);

  if (!webinar) {
    return <Shimmer h="100%" w="100%" />;
  }

  return (
    <Grid
      gridTemplateRows={["max-content 1fr"]}
      bg={colors.primaryBackground}
      position="relative"
    >
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
      {activeTab === "auction" && webinar && (
        <LiveStreamAuctions webinar={webinar} />
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
      <ContainerModal visible={visibleModal} heading="PURCHASE REQUEST">
        {purchaseRequest && (
          <Flex gridGap={space.xxs} flexDirection="column" alignItems="center">
            <Text m={space.xs}>Payment Confirmation</Text>

            <GradientBorder>
              <Text>
                {purchaseRequest.reward_sale_detail.reward_detail.title}
              </Text>
            </GradientBorder>
            <Text>
              <Span fontWeight="600">₹${purchaseRequest.price}</Span> paid by{" "}
              <Span fontWeight="600">{purchaseRequest.user_detail.name}</Span>.
              Please confirm.
            </Text>
            <Flex gridGap={space.xxs} p={space.xxxs}>
              <Button
                flex="1"
                variant="success"
                label="Received"
                onClick={() => acceptSale()}
              />
              <Button
                flex="1"
                variant="failure"
                label="Not Received"
                onClick={() => declineSale()}
              />
            </Flex>
          </Flex>
        )}
      </ContainerModal>
    </Grid>
  );
}

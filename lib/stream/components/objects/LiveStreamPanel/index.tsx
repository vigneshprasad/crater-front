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
  Shimmer,
  Text,
  Box,
  Span,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/v2";
import { BaseTabBar } from "@/common/components/objects/BaseTabBar";
import ContainerModal from "@/common/components/objects/ContainerModal";
import { INotificationData } from "@/common/components/objects/NotificationStack/types";
import { useWebinar } from "@/community/context/WebinarContext";
import { ChallengeListProvider } from "@/leaderboard/context/ChallegeListContext";
import { LeaderboardListProvider } from "@/leaderboard/context/LeaderboardListContext";
import { UserLeaderboardListProvider } from "@/leaderboard/context/UserLeaderboardListContext";

import StreamChat from "../StreamChat";
import StreamLeaderboardPanel from "../StreamLeaderboardPanel";

export type TabKeys = "chat" | "store" | "leaderboard";

interface IProps {
  initial?: TabKeys;
  streamId: number;
  tabs: (id: string | number) => Record<TabKeys, JSX.Element>;
}

const GradientBorder = styled(Box)`
  position: relative;
  padding: 12px 16px;
  width: 100%;

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

export default function LiveStreamPanel({
  initial,
  streamId,
  tabs,
}: IProps): JSX.Element {
  const [visibleModal, setVisibleModal] = useState(false);
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
      setVisibleModal(false);
      setPurchaseRequest(undefined);
    }
  };

  const declineSale = async (): Promise<void> => {
    if (purchaseRequest) {
      await SaleApiClient().postSaleLogDecline(purchaseRequest.id);
      setVisibleModal(false);
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
    const eventHandler = (data: INotificationData): void => {
      console.log(data);
      if (data.type === "creator-sale-request") {
        setPurchaseRequest(data.data);
        setVisibleModal(true);
      }
    };

    if (socket !== null) {
      socket.on("user:notification", eventHandler);
    }

    return () => {
      socket?.off("user:notification", eventHandler);
    };
  }, [socket]);

  if (!webinar) {
    return <Shimmer h="100%" w="100%" />;
  }

  return (
    <Grid
      gridTemplateRows={["max-content 1fr"]}
      bg={["transparent", colors.primaryBackground]}
      position="relative"
      borderLeft={`1px solid ${colors.primaryLight}`}
    >
      <BaseTabBar
        bg={colors.primaryLight}
        px={space.xxxs}
        activeTab={activeTab}
        tabs={tabs(webinar.id)}
        borderLeft={`1px solid ${colors.black[0]}`}
        gridAutoColumns="1fr"
      />

      {activeTab === "chat" && webinar && !webinar.closed && (
        <StreamChat stream={webinar} streamId={streamId} />
      )}
      {activeTab === "store" && webinar && (
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
          <Flex
            gridGap={space.xxs}
            flexDirection="column"
            px={space.xxxxs}
            py={space.xxs}
            w="100%"
          >
            <Text
              w="max-content"
              p={4}
              textAlign="center"
              borderRadius={4}
              bg={colors.primaryLight}
              m="0 auto"
            >
              Payment Confirmation
            </Text>

            <GradientBorder>
              <Text>
                {purchaseRequest.reward_sale_detail.reward_detail.title}
              </Text>
            </GradientBorder>
            <Text
              fontSize="1.4rem"
              color={colors.textTertiary}
              textAlign="center"
            >
              <Span
                color={colors.textPrimary}
                fontSize="1.6rem"
                fontWeight="600"
              >
                ₹{purchaseRequest.price}
              </Span>{" "}
              paid by{" "}
              <Span
                color={colors.textPrimary}
                fontSize="1.6rem"
                fontWeight="600"
              >
                {purchaseRequest.user_detail.name}
              </Span>
              . Please confirm.
            </Text>
            <Grid gridGap={space.xxs} gridTemplateColumns="1fr 1fr">
              <Button
                w="100%"
                variant="success"
                label="Received"
                onClick={() => acceptSale()}
              />
              <Button
                w="100%"
                variant="failure"
                label="Not Received"
                onClick={() => declineSale()}
              />
            </Grid>
          </Flex>
        )}
      </ContainerModal>
    </Grid>
  );
}

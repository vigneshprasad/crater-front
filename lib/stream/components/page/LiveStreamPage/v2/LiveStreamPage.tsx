import { getSession } from "next-auth/client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { mergeRefs } from "react-merge-refs";
import styled, { useTheme } from "styled-components";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import {
  Shimmer,
  Box,
  Link,
  Flex,
  Span,
  Icon,
} from "@/common/components/atoms";
import MobileBottomSheet from "@/common/components/objects/MobileBottomSheet";
import { PageRoutes } from "@/common/constants/route.constants";
import { useMeasure } from "@/common/hooks/ui/useMeasure";
import useMediaQuery from "@/common/hooks/ui/useMediaQuery";
import { useWebinar } from "@/community/context/WebinarContext";
import { MultiStream } from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
import { DyteWebinarProvider } from "@/dyte/context/DyteWebinarContext";
import UpcomingStreamsList from "@/stream/components//objects/UpcomingStreamsList";
import MultiLiveStreamPageLayout from "@/stream/components/layouts/MultiLiveStreamPageLayout";
import LiveStreamPanel, {
  TabKeys,
} from "@/stream/components/objects/LiveStreamPanel";
import LiveStreamPanelTabItem from "@/stream/components/objects/LiveStreamPanelTabItem";
import MultiStreamControlBar from "@/stream/components/objects/MultiStreamControlBar";
import MultiStreamPlayer from "@/stream/components/objects/MultiStreamPlayer";
import PastStreamsList from "@/stream/components/objects/PastStreamsList/v2";
import StreamAboutSection from "@/stream/components/objects/StreamAboutSection";
import StreamDytePlayer from "@/stream/components/objects/StreamDytePlayer";
import StreamHLSPlayer from "@/stream/components/objects/StreamHLSPlayer";
import StreamShareSection from "@/stream/components/objects/StreamShareSection";
import { ChatColorModeProvider } from "@/stream/providers/ChatColorModeProvider";
import useFirebaseChat from "@/stream/providers/FirebaseChatProvider";

import { ContainerProps } from "./container";

export interface PageProps extends ContainerProps {
  multiStreamMode: boolean;
  multistream?: MultiStream;
  onClickMultiStreamToggle: (val: boolean) => void;
  orgId: string;
}

const HLSContainer = styled(Box)`
  width: 100%;
  aspect-ratio: 16 / 9;
`;

export function LiveStreamPage({
  stream,
  streamId,
  multiStreamMode,
  multistream,
  orgId,
  onClickMultiStreamToggle,
}: PageProps): JSX.Element {
  const { ref, bounds } = useMeasure();
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const panelSheetRef = useRef<HTMLDialogElement>(null);
  const [panelHeight, setPanelHeight] = useState<string | number>("100%");
  const { user, profile } = useAuth();
  const router = useRouter();
  const { webinar: cachedWebinar, mutateWebinar } = useWebinar();
  const [loading, setLoading] = useState(false);
  const { openModal } = useAuthModal();
  const { breakpoints } = useTheme();
  const {
    followers,
    loading: followersLoading,
    subscribeCreator,
  } = useFollower();
  const { postMessage } = useFirebaseChat();
  const { matches: isMobile } = useMediaQuery(`(max-width: ${breakpoints[0]})`);
  const creator = cachedWebinar?.host_detail.creator_detail;
  const isHost = cachedWebinar?.host_detail.pk === user?.pk;
  const isSpeaker = user && cachedWebinar?.speakers.includes(user.pk);

  const followCreator = async (): Promise<void> => {
    if (creator) {
      await subscribeCreator(creator.id);
      await mutateWebinar();
      setLoading(false);

      const message = {
        message: `${user?.name} just followed ${cachedWebinar?.host_detail.name}'s channel.`,
        display_name: "Follow Update",
      };
      postMessage(message);
    }
  };

  useEffect(() => {
    async function checkAuth(): Promise<void> {
      const session = await getSession();
      if (session === null) {
        openModal();
      }
    }

    if (router) {
      checkAuth();
    }
  }, [router, openModal, user]);

  useEffect(() => {
    if (isMobile && panelSheetRef.current) {
      setTimeout(() => {
        if (!panelSheetRef.current?.open) {
          panelSheetRef.current?.showModal();
        }
      }, 5000);
    }
  }, [isMobile, panelSheetRef]);

  useLayoutEffect(() => {
    const player = playerContainerRef.current;

    if (player) {
      console.log(player);
      const panelRect = player.getBoundingClientRect();
      const height = window.innerHeight - panelRect.bottom - 8;
      setPanelHeight(height);
    }
  }, [playerContainerRef, bounds]);

  const TABS = (id: string | number): Record<TabKeys, JSX.Element> => ({
    chat: (
      <Link
        href={
          multiStreamMode
            ? PageRoutes.multistream(id, "chat")
            : PageRoutes.stream(id, "chat")
        }
        shallow
      >
        <LiveStreamPanelTabItem icon="Chat" label="Chat" />
      </Link>
    ),
    store: (
      <Link
        href={
          multiStreamMode
            ? PageRoutes.multistream(id, "store")
            : PageRoutes.stream(id, "store")
        }
        shallow
      >
        <LiveStreamPanelTabItem
          icon="Store"
          label={
            <Flex alignItems="center">
              Store
              <Span m={4}>
                <Icon color="#F2B25C" icon="New" size={14} />
              </Span>
            </Flex>
          }
        />
      </Link>
    ),
    leaderboard: (
      <Link
        href={
          multiStreamMode
            ? PageRoutes.multistream(id, "leaderboard")
            : PageRoutes.stream(id, "leaderboard")
        }
        shallow
      >
        <LiveStreamPanelTabItem icon="Leaderboard" label="Leaderboard" />
      </Link>
    ),
  });

  return (
    <MultiLiveStreamPageLayout
      playerContainerRef={mergeRefs<HTMLDivElement>([playerContainerRef, ref])}
    >
      {{
        streamPlayer: (
          <>
            {(() => {
              if (!user || user === undefined || !profile) {
                return <Shimmer pt="56.25%" w="100%" />;
              }

              const isSpeaker = stream.speakers.includes(user.pk);
              const isCreator = user.pk === stream.host;
              const isHack2Skill = profile.groups.filter(
                (group) => group.name === "hack2skill-user"
              )[0];

              if (isCreator || isSpeaker) {
                return (
                  <DyteWebinarProvider id={streamId.toString()}>
                    <StreamDytePlayer stream={cachedWebinar} orgId={orgId} />
                  </DyteWebinarProvider>
                );
              }

              if (multiStreamMode && multistream) {
                return (
                  <MultiStreamPlayer
                    multistream={multistream}
                    active={streamId}
                    onClickStream={(id) => {
                      router.push(`/livestream/${id}/multi`, undefined, {
                        shallow: true,
                      });
                    }}
                  />
                );
              }

              if (isHack2Skill) {
                return (
                  <HLSContainer p={[0, 8]} position="relative">
                    <StreamHLSPlayer
                      containerProps={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                      }}
                      streamId={streamId}
                      autoPlay
                      controls
                    />
                  </HLSContainer>
                );
              }

              return (
                <DyteWebinarProvider id={streamId.toString()}>
                  <StreamDytePlayer stream={cachedWebinar} orgId={orgId} />
                </DyteWebinarProvider>
              );
            })()}
          </>
        ),
        controlBar:
          multistream && !isHost && !isSpeaker ? (
            <MultiStreamControlBar
              multistream={multistream}
              active={multiStreamMode}
              onChange={onClickMultiStreamToggle}
            />
          ) : null,
        streamDetail: (
          <StreamAboutSection
            multiStreamMode={multiStreamMode}
            multistream={multistream}
            followers={followers}
            stream={cachedWebinar ?? stream}
            followersLoading={followersLoading || loading}
            onFollow={() => followCreator()}
            onClickChatPanelMobile={() => {
              panelSheetRef.current?.showModal();
            }}
          />
        ),
        shareSection: <StreamShareSection stream={cachedWebinar} />,
        upcomingStreams: <UpcomingStreamsList />,
        pastStreams: <PastStreamsList />,
        panel: (
          <MobileBottomSheet
            ref={panelSheetRef}
            visible={true}
            bg="primaryDark"
            heading="LIVE CHAT"
            h={panelHeight}
          >
            <ChatColorModeProvider>
              <LiveStreamPanel tabs={TABS} streamId={streamId} />
            </ChatColorModeProvider>
          </MobileBottomSheet>
        ),
      }}
    </MultiLiveStreamPageLayout>
  );
}

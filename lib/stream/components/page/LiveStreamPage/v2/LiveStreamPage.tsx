import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
import useAuthModal from "@/auth/context/AuthModalContext";
import { Shimmer } from "@/common/components/atoms";
import { useWebinar } from "@/community/context/WebinarContext";
import { MultiStream, Webinar } from "@/community/types/community";
import { useFollower } from "@/creators/context/FollowerContext";
import { DyteWebinarProvider } from "@/dyte/context/DyteWebinarContext";
import UpcomingStreamsList from "@/stream/components//objects/UpcomingStreamsList";
import MultiLiveStreamPageLayout from "@/stream/components/layouts/MultiLiveStreamPageLayout";
import MultiStreamControlBar from "@/stream/components/objects/MultiStreamControlBar";
import MultiStreamPlayer from "@/stream/components/objects/MultiStreamPlayer";
import PastStreamsList from "@/stream/components/objects/PastStreamsList/v2";
import StreamAboutSection from "@/stream/components/objects/StreamAboutSection";
import StreamDytePlayer from "@/stream/components/objects/StreamDytePlayer";
import StreamHLSPlayer from "@/stream/components/objects/StreamHLSPlayer";
import StreamShareSection from "@/stream/components/objects/StreamShareSection";
import useFirebaseChat from "@/stream/providers/FirebaseChatProvider";

import { ContainerProps } from "./container";

export interface PageProps extends ContainerProps {
  multiStreamMode: boolean;
  multistream?: MultiStream;
  onClickMultiStreamToggle: (val: boolean) => void;
  orgId: string;
}

export function LiveStreamPage({
  stream,
  streamId,
  multiStreamMode,
  multistream,
  orgId,
  onClickMultiStreamToggle,
}: PageProps): JSX.Element {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [visiblePanelMobile, setVisiblePanelMobile] = useState(false);
  const { webinar: cachedWebinar, mutateWebinar, upvoteWebinar } = useWebinar();
  const [loading, setLoading] = useState(false);
  const { openModal } = useAuthModal();
  const {
    followers,
    loading: followersLoading,
    subscribeCreator,
  } = useFollower();
  const { postMessage } = useFirebaseChat();

  const creator = cachedWebinar?.host_detail.creator_detail;

  const isHost = cachedWebinar?.host_detail.pk === user?.pk;

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

  const upvoteStream = async (webinar: Webinar): Promise<void> => {
    if (user) {
      const streamUpvote = await upvoteWebinar(webinar);

      if (streamUpvote && streamUpvote.upvote) {
        const message = {
          message: `${user?.name} just upvoted ${cachedWebinar?.host_detail.name}'s channel.`,
          display_name: "Upvote Update",
        };
        postMessage(message);
      }
    }
  };

  return (
    <MultiLiveStreamPageLayout
      visibleMobileChatPanel={visiblePanelMobile}
      onCloseMobileChatPabel={() => {
        setVisiblePanelMobile(false);
      }}
      streamId={streamId}
      stream={stream}
      multiStreamMode={multiStreamMode}
    >
      {{
        streamPlayer: (
          <>
            {(() => {
              if (!user || user === undefined || !profile) {
                return <Shimmer pt="56.25%" w="100%" />;
              }

              const isCreator = user.pk === stream.host;
              const isHack2Skill = profile.groups.filter(
                (group) => group.name === "hack2skill-user"
              )[0];

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

              if (!isCreator && isHack2Skill) {
                return (
                  <StreamHLSPlayer streamId={streamId} autoPlay controls />
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
          multistream && !isHost ? (
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
              setVisiblePanelMobile(true);
            }}
            onUpvote={upvoteStream}
          />
        ),
        shareSection: <StreamShareSection stream={cachedWebinar} />,
        upcomingStreams: <UpcomingStreamsList />,
        pastStreams: <PastStreamsList />,
      }}
    </MultiLiveStreamPageLayout>
  );
}

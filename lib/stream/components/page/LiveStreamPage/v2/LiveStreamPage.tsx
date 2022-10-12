import { useState } from "react";

import { useRouter } from "next/router";

import useAuth from "@/auth/context/AuthContext";
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
  const { user } = useAuth();
  const router = useRouter();
  const { webinar: cachedWebinar, mutateWebinar, upvoteWebinar } = useWebinar();
  const [loading, setLoading] = useState(false);
  const {
    followers,
    loading: followersLoading,
    subscribeCreator,
  } = useFollower();
  const { postMessage } = useFirebaseChat();

  const creator = cachedWebinar?.host_detail.creator_detail;

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
      streamId={streamId}
      stream={stream}
      multiStreamMode={multiStreamMode}
    >
      {{
        streamPlayer: (
          <>
            {multiStreamMode === true && multistream && (
              <MultiStreamPlayer
                multistream={multistream}
                active={streamId}
                onClickStream={(id) => {
                  router.push(`/livestream/${id}/multi`, undefined, {
                    shallow: true,
                  });
                }}
              />
            )}
            {multiStreamMode === false && (
              <DyteWebinarProvider id={streamId.toString()}>
                <StreamDytePlayer stream={cachedWebinar} orgId={orgId} />
              </DyteWebinarProvider>
            )}
          </>
        ),
        controlBar: multistream ? (
          <MultiStreamControlBar
            multistream={multistream}
            active={multiStreamMode}
            onChange={onClickMultiStreamToggle}
          />
        ) : null,
        streamDetail: (
          <StreamAboutSection
            followers={followers}
            stream={cachedWebinar ?? stream}
            followersLoading={followersLoading || loading}
            onFollow={() => followCreator()}
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

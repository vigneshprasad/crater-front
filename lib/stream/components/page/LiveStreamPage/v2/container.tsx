import useAuth from "@/auth/context/AuthContext";
import { WebinarProvider } from "@/community/context/WebinarContext";
import { Webinar } from "@/community/types/community";
import { FollowerProvider } from "@/creators/context/FollowerContext";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";
import { FirebaseChatProvider } from "@/stream/providers/FirebaseChatProvider";
import StreamChatProvider from "@/stream/providers/StreamChatProvider";
import { ReferralSummaryProvider } from "@/tokens/context/ReferralSummaryContext";

import { LiveStreamPageProvider } from "../context";

export interface ContainerProps {
  streamId: number;
  stream: Webinar;
  children?: React.ReactNode | null;
}

export function Container({
  streamId,
  stream,
  children,
}: ContainerProps): JSX.Element {
  const { user } = useAuth();
  return (
    <WebinarProvider id={streamId.toString()} initial={stream}>
      <FollowerProvider
        creator={stream.host_detail?.creator_detail?.id}
        user={user?.pk}
      >
        <UpcomingStreamsProvider pageSize={4}>
          <PastStreamProvider pageSize={8}>
            <ReferralSummaryProvider>
              <LiveStreamPageProvider>
                <FirebaseChatProvider groupId={streamId}>
                  <StreamChatProvider id={streamId.toString()}>
                    {children}
                  </StreamChatProvider>
                </FirebaseChatProvider>
              </LiveStreamPageProvider>
            </ReferralSummaryProvider>
          </PastStreamProvider>
        </UpcomingStreamsProvider>
      </FollowerProvider>
    </WebinarProvider>
  );
}

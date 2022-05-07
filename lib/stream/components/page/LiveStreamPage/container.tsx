import { User } from "next-auth";

import { WebinarProvider } from "@/community/context/WebinarContext";
import { Webinar } from "@/community/types/community";
import { FollowerProvider } from "@/creators/context/FollowerContext";
import { DyteWebinarProvider } from "@/dyte/context/DyteWebinarContext";
import { StreamsToRsvpProvider } from "@/stream/context/StreamsToRsvpContext";
import { BidListProvider } from "@/tokens/context/BidListContext";
import { ReferralSummaryProvider } from "@/tokens/context/ReferralSummaryContext";
import { RewardsListProvider } from "@/tokens/context/RewardsListContext";
import { Reward } from "@/tokens/types/token";

import { LiveStreamPageProvider } from "./context";

export interface IContainerProps {
  webinar: Webinar;
  id: string;
  rewards: Reward[];
  children: React.ReactNode | React.ReactNode[];
  user?: User;
}

export default function Container({
  webinar,
  id,
  rewards,
  user,
  children,
}: IContainerProps): JSX.Element {
  return (
    <WebinarProvider id={id} initial={webinar}>
      <FollowerProvider
        creator={webinar.host_detail?.creator_detail?.id}
        user={user?.pk}
      >
        <DyteWebinarProvider id={id}>
          <BidListProvider
            filterCreator={webinar.host_detail?.creator_detail?.id}
          >
            <RewardsListProvider
              initial={rewards}
              filterCreatorSlug={webinar.host_detail.creator_detail?.slug}
            >
              <StreamsToRsvpProvider>
                <ReferralSummaryProvider>
                  <LiveStreamPageProvider>{children}</LiveStreamPageProvider>
                </ReferralSummaryProvider>
              </StreamsToRsvpProvider>
            </RewardsListProvider>
          </BidListProvider>
        </DyteWebinarProvider>
      </FollowerProvider>
    </WebinarProvider>
  );
}

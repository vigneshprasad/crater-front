import { PageResponse } from "@/common/types/api";
import { PastStreamListItem, Webinar } from "@/community/types/community";
import { CreatorRankListProvider } from "@/creators/context/CreatorRankListContext";
import { CreatorRank } from "@/creators/types/creator";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";
import { PastStreamsWithRecordingProvider } from "@/stream/context/PastStreamsWithRecordingContext";
import { StreamCategoryProvider } from "@/stream/context/StreamCategoryContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";

export interface IContainerProps {
  id: number;
  upcomingStreams?: PageResponse<Webinar>;
  pastStreams?: PageResponse<PastStreamListItem>;
  creators?: PageResponse<CreatorRank>;
  children: React.ReactNode | React.ReactNode[];
}

export default function Container({
  id,
  upcomingStreams,
  pastStreams,
  creators,
  children,
}: IContainerProps): JSX.Element {
  return (
    <UpcomingStreamsProvider
      initial={upcomingStreams}
      pageSize={4}
      category={id}
    >
      <PastStreamProvider
        initial={pastStreams}
        pageSize={4}
        categoryFilter={id}
      >
        <PastStreamsWithRecordingProvider pageSize={4} category={id}>
          <CreatorRankListProvider initial={creators} category={id}>
            <StreamCategoryProvider>{children}</StreamCategoryProvider>
          </CreatorRankListProvider>
        </PastStreamsWithRecordingProvider>
      </PastStreamProvider>
    </UpcomingStreamsProvider>
  );
}

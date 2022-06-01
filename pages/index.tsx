import { GetStaticProps, InferGetStaticPropsType } from "next";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import HomePageLayout from "@/common/components/layouts/v2/HomePageLayout";
import { PageResponse } from "@/common/types/api";
import WebinarApiClient from "@/community/api";
import { LiveStreamsProvider } from "@/community/context/LiveStreamsContext";
import { Webinar, PastStreamListItem } from "@/community/types/community";
import StreamApiClient from "@/stream/api";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";
import { StreamCategoryProvider } from "@/stream/context/StreamCategoryContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";
import { AuctionListProvider } from "@/tokens/context/AuctionListContext";

const StreamsPage = dynamic(
  () => import("@/community/components/pages/StreamsPage")
);

interface ServerProps {
  liveStreams: Webinar[];
  pastStreams: PageResponse<PastStreamListItem>;
}

export const getStaticProps: GetStaticProps<ServerProps> = async () => {
  const [liveStreams] = await WebinarApiClient().getAllLiveWebinars();

  const [pastStreams] = await StreamApiClient().getPastStreams();

  return {
    props: {
      liveStreams: liveStreams ?? [],
      pastStreams: pastStreams ?? ({} as PageResponse<PastStreamListItem>),
    },
    revalidate: 10,
  };
};

export type IProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({
  liveStreams,
  pastStreams,
}: IProps): JSX.Element {
  const router = useRouter();
  const upcomingCategory = router.query.upcomigCategory as string | undefined;
  const pastCategory = router.query.pastCategory as string | undefined;
  return (
    <HomePageLayout
      seo={{
        title: "Crater Club: Streams",
        description:
          "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
      }}
      activeTab="streams"
      heading="Livestream and Monetise with Crater"
      subHeading="Go live with Crater and host a private auction to monetise your content"
    >
      <LiveStreamsProvider initial={liveStreams}>
        <UpcomingStreamsProvider
          pageSize={8}
          category={upcomingCategory ? parseInt(upcomingCategory) : undefined}
        >
          <PastStreamProvider
            initial={pastStreams}
            categoryFilter={pastCategory ? parseInt(pastCategory) : undefined}
          >
            <AuctionListProvider rewardDetail={true}>
              <StreamCategoryProvider>
                <StreamsPage />
              </StreamCategoryProvider>
            </AuctionListProvider>
          </PastStreamProvider>
        </UpcomingStreamsProvider>
      </LiveStreamsProvider>
    </HomePageLayout>
  );
}

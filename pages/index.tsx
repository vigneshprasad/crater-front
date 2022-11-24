import { GetStaticProps, InferGetStaticPropsType } from "next";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import HomePageLayout from "@/common/components/layouts/v2/HomePageLayout";
import { PageResponse } from "@/common/types/api";
import WebinarApiClient from "@/community/api";
import { LiveStreamsProvider } from "@/community/context/LiveStreamsContext";
import { Webinar, PastStreamListItem } from "@/community/types/community";
import { CreatorRankListProvider } from "@/creators/context/CreatorRankListContext";
import StreamApiClient from "@/stream/api";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";
import { StreamCategoryProvider } from "@/stream/context/StreamCategoryContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";

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
  const upcomingCategory = router.query.upcoming as string | undefined;
  const pastCategory = router.query.past as string | undefined;
  return (
    <HomePageLayout
      seo={{
        title: "Livestream and Monetise with Crater",
        description:
          "Go live with Crater and host a private auction to monetise your content",
      }}
      activeTab="streams"
      heading="Livestream and Monetise with Crater"
      subHeading="Go live with Crater and host a private auction to monetise your content"
    >
      <LiveStreamsProvider initial={liveStreams}>
        <UpcomingStreamsProvider pageSize={8} categorySlug={upcomingCategory}>
          <PastStreamProvider
            pageSize={8}
            initial={pastStreams}
            categorySlug={pastCategory}
          >
            <StreamCategoryProvider>
              <CreatorRankListProvider>
                <StreamsPage />
              </CreatorRankListProvider>
            </StreamCategoryProvider>
          </PastStreamProvider>
        </UpcomingStreamsProvider>
      </LiveStreamsProvider>
    </HomePageLayout>
  );
}

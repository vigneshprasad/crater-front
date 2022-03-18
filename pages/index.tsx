import { GetStaticProps, InferGetStaticPropsType } from "next";

import dynamic from "next/dynamic";

import HomePageLayout from "@/common/components/layouts/HomePageLayout";
import { PageResponse } from "@/common/types/api";
import WebinarApiClient from "@/community/api";
import { LiveStreamsProvider } from "@/community/context/LiveStreamsContext";
import { SeriesListProvider } from "@/community/context/SeriesListContext";
import { Series, Webinar } from "@/community/types/community";
import { StreamCategoryProvider } from "@/stream/context/StreamCategoryContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";

const StreamsPage = dynamic(
  () => import("@/community/components/pages/StreamsPage")
);

interface ServerProps {
  liveStreams: Webinar[];
  upcoming: PageResponse<Webinar>;
  series: Series[];
}

export const getStaticProps: GetStaticProps<ServerProps> = async () => {
  const [liveStreams] = await WebinarApiClient().getAllLiveWebinars();
  const [upcoming] = await WebinarApiClient().getAllUpcominWebinars();
  const [series] = await WebinarApiClient().getAllSeries();

  return {
    props: {
      liveStreams: liveStreams ?? [],
      upcoming: upcoming ?? ({} as PageResponse<Webinar>),
      series: series ?? [],
    },
    revalidate: 10,
  };
};

export type IProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({
  liveStreams,
  upcoming,
  series,
}: IProps): JSX.Element {
  return (
    <HomePageLayout
      seo={{
        title: "Crater Club: Streams",
        description:
          "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
      }}
      heading="Livestreams"
      activeTab="streams"
    >
      <LiveStreamsProvider initial={liveStreams}>
        <UpcomingStreamsProvider initial={upcoming}>
          <SeriesListProvider initial={series}>
            <StreamCategoryProvider>
              <StreamsPage />
            </StreamCategoryProvider>
          </SeriesListProvider>
        </UpcomingStreamsProvider>
      </LiveStreamsProvider>
    </HomePageLayout>
  );
}

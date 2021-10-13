import { GetStaticProps, InferGetStaticPropsType } from "next";

import dynamic from "next/dynamic";

import HomePageLayout from "@/common/components/layouts/HomePageLayout";
import WebinarApiClient from "@/community/api";
import { LiveStreamsProvider } from "@/community/context/LiveStreamsContext";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import { Webinar } from "@/community/types/community";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";

const StreamsPage = dynamic(
  () => import("@/community/components/pages/StreamsPage")
);

interface ServerProps {
  liveStreams: Webinar[];
  upcoming: Webinar[];
}

export const getStaticProps: GetStaticProps<ServerProps> = async () => {
  const [liveStreams] = await WebinarApiClient().getAllLiveWebinars();
  const [upcoming] = await WebinarApiClient().getAllUpcominWebinars();

  return {
    props: {
      liveStreams: liveStreams ?? [],
      upcoming: upcoming ?? [],
    },
    revalidate: 10,
  };
};

export type IProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({ liveStreams, upcoming }: IProps): JSX.Element {
  return (
    <HomePageLayout
      seo={{
        title: "Crater Club: Streams",
        description:
          "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
      }}
      heading="Featured"
      activeTab="streams"
    >
      <LiveStreamsProvider initial={liveStreams}>
        <UpcomingStreamsProvider initial={upcoming}>
          <PastStreamProvider>
            <StreamsPage />
          </PastStreamProvider>
        </UpcomingStreamsProvider>
      </LiveStreamsProvider>
    </HomePageLayout>
  );
}

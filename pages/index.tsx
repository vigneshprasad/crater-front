import { GetStaticProps, InferGetStaticPropsType } from "next";

import dynamic from "next/dynamic";

import HomePageLayout from "@/common/components/layouts/HomePageLayout";
import WebinarApiClient from "@/community/api";
import { LiveStreamsProvider } from "@/community/context/LiveStreamsContext";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import { Webinar } from "@/creators/types/community";

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
          "Crater Club is the world’s leading live streaming platform for gamers and the things we love. Watch and chat now with millions of other fans from around the world",
      }}
      heading="Featured"
      activeTab="streams"
    >
      <LiveStreamsProvider initial={liveStreams}>
        <UpcomingStreamsProvider initial={upcoming}>
          <StreamsPage />
        </UpcomingStreamsProvider>
      </LiveStreamsProvider>
    </HomePageLayout>
  );
}

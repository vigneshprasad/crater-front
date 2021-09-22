import { GetStaticProps, InferGetStaticPropsType } from "next";

import HomePageLayout from "@/common/components/layouts/HomePageLayout";
import WebinarApiClient from "@/community/api";
import StreamsPage from "@/community/components/pages/StreamsPage";
import { LiveStreamsProvider } from "@/community/context/LiveStreamsContext";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import { Webinar } from "@/creators/types/community";

interface ServerProps {
  liveStreams: Webinar[];
  upcoming: Webinar[];
}

export const getStaticProps: GetStaticProps<ServerProps> = async () => {
  const [liveStreams] = await WebinarApiClient().getAllLiveWebinars();
  const [upcoming] = await WebinarApiClient().getAllUpcominWebinars();

  return {
    props: {
      liveStreams: liveStreams || [],
      upcoming: upcoming || [],
    },
    revalidate: 60 * 5,
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

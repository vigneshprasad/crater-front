import { GetStaticProps, InferGetStaticPropsType } from "next";

import dynamic from "next/dynamic";

import HomePageLayout from "@/common/components/layouts/v2/HomePageLayout";
import { PageResponse } from "@/common/types/api";
import WebinarApiClient from "@/community/api";
import { LiveStreamsProvider } from "@/community/context/LiveStreamsContext";
import { Webinar } from "@/community/types/community";
import StreamApiClient from "@/stream/api";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";
import { StreamCategoryProvider } from "@/stream/context/StreamCategoryContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";

const StreamsPage = dynamic(
  () => import("@/community/components/pages/StreamsPage")
);

interface ServerProps {
  liveStreams: Webinar[];
  upcomingStreams: PageResponse<Webinar>;
  pastStreams: PageResponse<Webinar>;
}

export const getStaticProps: GetStaticProps<ServerProps> = async () => {
  const [liveStreams] = await WebinarApiClient().getAllLiveWebinars();
  const [upcomingStreams] = await WebinarApiClient().getAllUpcominWebinars();
  const [pastStreams] = await StreamApiClient().getPastStreams();

  return {
    props: {
      liveStreams: liveStreams ?? [],
      upcomingStreams: upcomingStreams ?? ({} as PageResponse<Webinar>),
      pastStreams: pastStreams ?? ({} as PageResponse<Webinar>),
    },
    revalidate: 10,
  };
};

export type IProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Home({
  liveStreams,
  upcomingStreams,
  pastStreams,
}: IProps): JSX.Element {
  return (
    <HomePageLayout
      seo={{
        title: "Crater Club: Streams",
        description:
          "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
      }}
      activeTab="streams"
      heading="Livestream and Monetise with Crater"
      subHeading="Go live with Crater and host a private auction to monetise your
      content"
    >
      <LiveStreamsProvider initial={liveStreams}>
        <UpcomingStreamsProvider initial={upcomingStreams}>
          <PastStreamProvider initial={pastStreams}>
            <StreamCategoryProvider>
              <StreamsPage />
            </StreamCategoryProvider>
          </PastStreamProvider>
        </UpcomingStreamsProvider>
      </LiveStreamsProvider>
    </HomePageLayout>
  );
}

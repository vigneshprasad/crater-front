import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";

import HomePageLayout from "@/common/components/layouts/HomePageLayout";
import WebinarApiClient from "@/community/api";
import StreamsPage from "@/community/components/pages/StreamsPage";
import { LiveStreamsProvider } from "@/community/context/LiveStreamsContext";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import { Webinar } from "@/creators/types/community";

interface ServerProps {
  session: Session;
  liveStreams: Webinar[];
  upcoming: Webinar[];
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  req,
}) => {
  const session = await getSession({ req });
  const [liveStreams] = await WebinarApiClient({ req }).getAllLiveWebinars();
  const [upcoming] = await WebinarApiClient({ req }).getAllUpcominWebinars();

  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/auth/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      liveStreams: liveStreams || [],
      upcoming: upcoming || [],
    },
  };
};

export type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Home({ liveStreams, upcoming }: IProps): JSX.Element {
  return (
    <HomePageLayout
      seo={{
        title: "Crater Club: Streams",
        description:
          "Crater Club is the world’s leading live streaming platform for gamers and the things we love. Watch and chat now with millions of other fans from around the world",
      }}
      heading="Streams"
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

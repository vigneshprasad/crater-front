import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import useAuth from "@/auth/context/AuthContext";
import Spinner from "@/common/components/atoms/Spiner";
import { UpcomingStreamsProvider } from "@/community/context/UpcomingStreamsContext";
import CreatorApiClient from "@/creators/api";
import CreatorHubPage from "@/creators/components/page/CreatorHubPage";
import StaticCreatorHub from "@/creators/components/page/StaticCreatorHub";
import { CreatorStreamProvider } from "@/creators/context/CreatorStreamsContext";
import { PastStreamProvider } from "@/stream/context/PastStreamContext";

const CreatorHubStreamTab = dynamic(
  () => import("@/creators/components/objects/CreatorHubStreamTab")
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [creator] = await CreatorApiClient(context).getMyCreator();

  return {
    props: {
      creator,
    },
  };
};

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function CreatorHubStream({ creator }: IProps): JSX.Element {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user || !profile) {
    return <StaticCreatorHub />;
  }

  return (
    <CreatorHubPage selectedTab="stream" creator={creator}>
      <CreatorStreamProvider creatorId={user.pk}>
        <UpcomingStreamsProvider host={user.pk}>
          <PastStreamProvider host={user.pk}>
            <CreatorHubStreamTab />
          </PastStreamProvider>
        </UpcomingStreamsProvider>
      </CreatorStreamProvider>
    </CreatorHubPage>
  );
}

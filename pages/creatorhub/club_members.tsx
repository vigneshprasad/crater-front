import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import useAuth from "@/auth/context/AuthContext";
import Spinner from "@/common/components/atoms/Spiner";
import CreatorApiClient from "@/creators/api";
import CreatorHubPage from "@/creators/components/page/CreatorHubPage";
import StaticCreatorHub from "@/creators/components/page/StaticCreatorHub";
import { CreatorFollowerProvider } from "@/creators/context/CreatorFollowerContext";

const CreatorFollowersTab = dynamic(
  () => import("@/creators/components/objects/CreatorFollowersTab")
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const [creator] = await CreatorApiClient(context).getMyCreator();

  if (!creator || !creator?.show_club_members) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      creator: creator || null,
    },
  };
};

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function CreatorHubFaq({ creator }: IProps): JSX.Element {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user || !profile) {
    return <StaticCreatorHub />;
  }

  return (
    <CreatorHubPage selectedTab="club_members" creator={creator}>
      <CreatorFollowerProvider userId={user.pk}>
        <CreatorFollowersTab />
      </CreatorFollowerProvider>
    </CreatorHubPage>
  );
}

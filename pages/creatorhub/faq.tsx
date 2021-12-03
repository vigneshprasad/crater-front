import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import useAuth from "@/auth/context/AuthContext";
import Spinner from "@/common/components/atoms/Spiner";
import CreatorApiClient from "@/creators/api";
import CreatorHubPage from "@/creators/components/page/CreatorHubPage";
import StaticCreatorHub from "@/creators/components/page/StaticCreatorHub";

const CreatorHubFaqTab = dynamic(
  () => import("@/creators/components/objects/CreatorHubFaqTab")
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

export default function CreatorHubFaq({ creator }: IProps): JSX.Element {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!user || !profile) {
    return <StaticCreatorHub />;
  }

  return (
    <CreatorHubPage selectedTab="faq" creator={creator}>
      <CreatorHubFaqTab />
    </CreatorHubPage>
  );
}

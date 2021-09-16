import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/client";
import { NextSeoProps } from "next-seo";

import HomePageLayout from "@/common/components/layouts/HomePageLayout";
import CreatorApiClient from "@/creators/api";
import CommunityPage from "@/creators/components/page/CommunityPage";
import { CreatorListProvider } from "@/creators/context/CreatorsListContext";
import { MembersListProvider } from "@/creators/context/MembersListContext";
import { Creator } from "@/creators/types/creator";

interface ServerProps {
  creators: Creator[];
  members: Creator[];
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async ({
  req,
}) => {
  const session = await getSession({ req });
  const [creatorsData] = await CreatorApiClient({ req }).getCreatorsList();
  const [membersData] = await CreatorApiClient({ req }).getCreatorsList(false);

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
      creators: creatorsData?.results ?? [],
      members: membersData?.results ?? [],
    },
  };
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function ClubsTabPage({
  creators,
  members,
}: PageProps): JSX.Element {
  const seo: NextSeoProps = {
    title: "Community",
    description: "",
  };

  return (
    <HomePageLayout seo={seo} activeTab="community" heading="Community">
      <CreatorListProvider initial={creators}>
        <MembersListProvider initial={members}>
          <CommunityPage />
        </MembersListProvider>
      </CreatorListProvider>
    </HomePageLayout>
  );
}

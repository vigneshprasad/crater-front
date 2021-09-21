import { GetStaticProps, InferGetStaticPropsType } from "next";
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

export const getStaticProps: GetStaticProps<ServerProps> = async () => {
  const [creatorsData] = await CreatorApiClient().getCreatorsList();
  const [membersData] = await CreatorApiClient().getCreatorsList(false);

  return {
    props: {
      creators: creatorsData?.results ?? [],
      members: membersData?.results ?? [],
    },
    revalidate: 60 * 5,
  };
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

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

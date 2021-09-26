import { GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeoProps } from "next-seo";

import HomePageLayout from "@/common/components/layouts/HomePageLayout";
import { MetaProvider } from "@/common/context/MetaContext";
import CreatorApiClient from "@/creators/api";
import CommunityPage from "@/creators/components/page/CommunityPage";
import { CreatorListProvider } from "@/creators/context/CreatorsListContext";
import { Creator } from "@/creators/types/creator";

interface ServerProps {
  creators: Creator[];
}

export const getStaticProps: GetStaticProps<ServerProps> = async () => {
  const [creatorsData] = await CreatorApiClient().getCreatorsList();

  return {
    props: {
      creators: creatorsData?.results ?? [],
    },
    revalidate: 60 * 5,
  };
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function ClubsTabPage({ creators }: PageProps): JSX.Element {
  const seo: NextSeoProps = {
    title: "Community",
    description: "",
  };

  return (
    <HomePageLayout seo={seo} activeTab="community" heading="Network">
      <CreatorListProvider initial={creators}>
        <MetaProvider fetchKeys={["user_tags"]}>
          <CommunityPage />
        </MetaProvider>
      </CreatorListProvider>
    </HomePageLayout>
  );
}

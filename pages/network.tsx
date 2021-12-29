import { GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeoProps } from "next-seo";

import HomePageLayout from "@/common/components/layouts/HomePageLayout";
import { MetaProvider } from "@/common/context/MetaContext";
import { PageResponse } from "@/common/types/api";
import CreatorApiClient from "@/creators/api";
import CommunityPage from "@/creators/components/page/CommunityPage";
import { CreatorListProvider } from "@/creators/context/CreatorsListContext";
import { Creator } from "@/creators/types/creator";

interface ServerProps {
  creators: PageResponse<Creator>;
}

export const getStaticProps: GetStaticProps<ServerProps> = async () => {
  const [creatorsData] = await CreatorApiClient().getCreatorsList();

  return {
    props: {
      creators: creatorsData ?? ({} as PageResponse<Creator>),
    },
    revalidate: 60 * 5,
  };
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function ClubsTabPage({ creators }: PageProps): JSX.Element {
  const seo: NextSeoProps = {
    title: "Crater Club: Network",
    description:
      "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
  };

  return (
    <HomePageLayout
      seo={seo}
      activeTab="community"
      heading="Creators & Educators"
    >
      <CreatorListProvider initial={creators}>
        <MetaProvider fetchKeys={["user_tags"]}>
          <CommunityPage />
        </MetaProvider>
      </CreatorListProvider>
    </HomePageLayout>
  );
}

import { NextSeoProps } from "next-seo";

import HomePageLayout from "@/common/components/layouts/HomePageLayout";
import CommunityPage from "@/creators/components/page/CommunityPage";

export default function ClubsTabPage(): JSX.Element {
  const seo: NextSeoProps = {
    title: "Community",
    description: "",
  };

  return (
    <HomePageLayout seo={seo} activeTab="community" heading="Community">
      <CommunityPage />
    </HomePageLayout>
  );
}

import { NextSeoProps } from "next-seo";

import dynamic from "next/dynamic";

import TokenPageLayout from "@/tokens/components/layout/TokenPageLayout";
import { RewardsListProvider } from "@/tokens/context/RewardsListContext";

const RewardsTab = dynamic(
  () => import("@/tokens/components/pages/RewardsTab")
);

export default function Tokens(): JSX.Element {
  const seo: NextSeoProps = {
    title: "Crater Club: Rewards",
    description:
      "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
  };

  return (
    <TokenPageLayout seo={seo}>
      <RewardsListProvider>
        <RewardsTab />
      </RewardsListProvider>
    </TokenPageLayout>
  );
}

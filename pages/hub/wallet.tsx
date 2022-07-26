import { GetServerSideProps } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout/v2";
import { Creator } from "@/creators/types/creator";
import { BidListProvider } from "@/tokens/context/BidListContext";
import { ReferralSummaryProvider } from "@/tokens/context/ReferralSummaryContext";
import { ReferralListProvider } from "@/tokens/context/ReferralsListContext";
import { UserRewardListProvider } from "@/tokens/context/UserRewardListContext";

interface PageProps {
  creator: Creator | null;
  userId?: string;
}

const HubPortfolioTab = dynamic(
  () => import("@/tokens/components/pages/HubPortfolioTab")
);

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  try {
    const data = await getHubServerSideProps(context);
    return {
      props: {
        ...data,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/join",
      },
      props: {} as PageProps,
    };
  }
};

export default function HubPortfolio({
  creator,
  userId,
}: PageProps): JSX.Element {
  return (
    <HubPageLayout creator={creator} activeTab="wallet">
      <BidListProvider filterBidder={userId}>
        <UserRewardListProvider filterUser={userId}>
          <ReferralListProvider>
            <ReferralSummaryProvider>
              <HubPortfolioTab />
            </ReferralSummaryProvider>
          </ReferralListProvider>
        </UserRewardListProvider>
      </BidListProvider>
    </HubPageLayout>
  );
}

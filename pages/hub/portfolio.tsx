import { GetServerSideProps } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout";
import { Creator } from "@/creators/types/creator";
import { BidListProvider } from "@/tokens/context/BidListContext";
import { CoinHoldingListProvider } from "@/tokens/context/CoinHoldingListContext";

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
    <HubPageLayout creator={creator} activeTab="portfolio">
      <BidListProvider filterBidder={userId}>
        <CoinHoldingListProvider filterUser={userId}>
          <HubPortfolioTab />
        </CoinHoldingListProvider>
      </BidListProvider>
    </HubPageLayout>
  );
}

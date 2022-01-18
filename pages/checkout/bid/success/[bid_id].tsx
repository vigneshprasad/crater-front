import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import dynamic from "next/dynamic";

import AuctionApiClient from "@/tokens/api/AuctionApiClient";
import BidSuccessPageLayout from "@/tokens/components/layout/BidSuccessPageLayout";
import { BidProvider } from "@/tokens/context/BidContext";
import { RewardsListProvider } from "@/tokens/context/RewardsListContext";
import { Bid } from "@/tokens/types/auctions";

const BidPaymentSuccessPage = dynamic(
  () => import("@/payments/components/pages/BidPaymentSuccessPage")
);

interface QueryProps extends ParsedUrlQuery {
  bid_id: string;
}

interface PageProps {
  bid: Bid;
  bid_id: number;
}

export const getServerSideProps: GetServerSideProps<PageProps, QueryProps> =
  async ({ req, params }) => {
    const { bid_id } = params as QueryProps;
    const [bid] = await AuctionApiClient({ req }).retrieveBid(bid_id);

    if (!bid) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        bid,
        bid_id: parseInt(bid_id),
      },
    };
  };

export default function BidCheckoutSuccess({
  bid,
  bid_id,
}: PageProps): JSX.Element {
  const creatorSlug = bid.coin_detail.creator_detail.slug;
  return (
    <BidSuccessPageLayout
      seo={{
        title: "Crater Club: Streams",
        description:
          "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
      }}
    >
      <BidProvider id={bid_id} initial={bid}>
        <RewardsListProvider filterCreatorSlug={creatorSlug}>
          <BidPaymentSuccessPage />
        </RewardsListProvider>
      </BidProvider>
    </BidSuccessPageLayout>
  );
}

import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

import dynamic from "next/dynamic";

import {
  STRIPE_PUBLISH_KEY,
  HOST_URL,
} from "@/common/constants/global.constants";
import PaymentApiClient from "@/payments/api";
import CheckoutPageLayout from "@/payments/components/layouts/CheckoutPageLayout";
import StripeElementsProvider from "@/payments/components/objects/StripeElementsProvider";
import { StripeIntentProvider } from "@/payments/context/StripeIntentContext";
import { StripePaymentIntent } from "@/payments/types/payments";
import AuctionApiClient from "@/tokens/api/AuctionApiClient";
import { BidProvider } from "@/tokens/context/BidContext";
import { Bid } from "@/tokens/types/auctions";

const BidCheckoutPage = dynamic(
  () => import("@/payments/components/pages/BidCheckoutPage"),
  { ssr: false }
);

interface QueryProps extends ParsedUrlQuery {
  bid_id: string;
  intent_id: string;
}

interface PageProps {
  bid: Bid;
  intent: StripePaymentIntent;
  intentSecret: string;
  bid_id: number;
  publishKey: string;
  hostUrl: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, QueryProps> =
  async ({ params, req }) => {
    const { bid_id, intent_id } = params as QueryProps;
    const [bid] = await AuctionApiClient({ req }).retrieveBid(bid_id);
    const [intent] = await PaymentApiClient({ req }).retrieveStripeIntent(
      intent_id
    );

    return {
      props: {
        bid: bid as Bid,
        intent: intent as StripePaymentIntent,
        intentSecret: intent?.client_secret as string,
        bid_id: bid?.id as number,
        publishKey: STRIPE_PUBLISH_KEY,
        hostUrl: HOST_URL,
      },
    };
  };

export default function Checkout({
  bid,
  bid_id,
  intent,
  intentSecret,
  publishKey,
  hostUrl,
}: PageProps): JSX.Element {
  return (
    <CheckoutPageLayout
      seo={{
        title: "Crater Club: Streams",
        description:
          "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
      }}
    >
      <BidProvider id={bid_id} initial={bid}>
        <StripeIntentProvider initial={intent} secret={intentSecret}>
          <StripeElementsProvider
            publishKey={publishKey}
            clientSecret={intentSecret}
          >
            <BidCheckoutPage hostUrl={hostUrl} />
          </StripeElementsProvider>
        </StripeIntentProvider>
      </BidProvider>
    </CheckoutPageLayout>
  );
}

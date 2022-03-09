import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { SyntheticEvent, useState } from "react";
import { useTheme } from "styled-components";

import { Flex, Card, Form, Grid, Text, Hr } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import Spinner from "@/common/components/atoms/Spiner";
import { PageRoutes } from "@/common/constants/route.constants";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import WatiWhatsappButton from "@/integrations/wati/components/WatiWhatsappButton";
import TicketCard from "@/tokens/components/objects/TicketCard";
import useBid from "@/tokens/context/BidContext";
import useRewardItem from "@/tokens/context/RewardItemContext";

interface IProps {
  hostUrl: string;
}

export default function BidCheckoutPage({ hostUrl }: IProps): JSX.Element {
  const stripe = useStripe();
  const { space, colors } = useTheme();
  const elements = useElements();
  const { bid } = useBid();
  const { reward } = useRewardItem();
  const [requestLoading, setRequestLoading] = useState(false);
  const { track } = useAnalytics();

  const handleFormSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setRequestLoading(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${hostUrl}${PageRoutes.hub(
          "wallet"
        )}?bid_payment_success=${bid?.id}`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      setRequestLoading(false);
      track(AnalyticsEvents.card_payment_error, {
        bid: bid?.id,
        reward: reward?.id,
      });
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      track(AnalyticsEvents.card_payment_sucess, { error: result.error });
      setRequestLoading(false);
    }
  };

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <Grid
      gridTemplateColumns={["1fr", "1fr minmax(320px, 600px)"]}
      py={space.s}
      px={[space.xxs, 0]}
      gridRowGap={[space.xxs, space.xs]}
      gridColumnGap={space.l}
      alignItems="start"
    >
      <WatiWhatsappButton />
      <Text
        gridRow={["1", "1"]}
        textStyle="headline4"
        gridColumn={["1", "1 / span 1"]}
      >
        Checkout
      </Text>

      <Form
        gridRow={["4", "3"]}
        px={4}
        display="flex"
        flexDirection="column"
        gridGap={space.xs}
        onSubmit={handleFormSubmit}
      >
        <Text>
          Enter your card details to place the bid. No card information is ever
          stored with us &amp; transactions are processed using Stripe.
        </Text>
        <PaymentElement />

        <Text color={colors.slate}>
          Note if a bid is accepted the money will not be refunded. By placing a
          bid you are accepting the terms and conditions. WhatsApp Help:
          +919930474469
        </Text>

        <Button
          type="submit"
          text="Place Order"
          disabled={requestLoading}
          suffixElement={requestLoading ? <Spinner size={32} /> : undefined}
        />
      </Form>

      <Card gridRow={["3", "3"]} justifySelf="center" minWidth={["100%", 420]}>
        <Text mb={space.xs} textStyle="title">
          Your Order
        </Text>
        {(() => {
          if (!reward || !bid) {
            return <Text>Loading</Text>;
          }

          return (
            <Flex flexDirection="column" gridGap={space.xxs}>
              <TicketCard
                cursor="default"
                reward={reward}
                withCTA={false}
                priceValue={bid.amount}
                priceLabel="Your Bid"
                withDetail
              />

              <Hr />

              <Flex py={space.xxs}>
                <Text fontSize="2.2rem" flex="1">
                  Total:
                </Text>
                <Text fontSize="2.2rem">{formatter.format(bid.amount)}</Text>
              </Flex>
            </Flex>
          );
        })()}
      </Card>
    </Grid>
  );
}

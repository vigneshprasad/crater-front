import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { SyntheticEvent } from "react";
import { useTheme } from "styled-components";

import { Flex, Card, Form, Grid, Text, Hr } from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
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

  const handleFormSubmit = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${hostUrl}${PageRoutes.hub(
          "portfolio"
        )}?bid_payment_success=${bid?.id}`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return (
    <Grid
      gridTemplateColumns="1fr minmax(320px, 640px)"
      py={space.s}
      gridRowGap={space.xs}
      gridColumnGap={space.l}
      alignItems="start"
    >
      <Text px={space.xxxs} textStyle="headline4" gridColumn="1 / span 2">
        Checkout
      </Text>

      <Form
        px={space.xxxs}
        display="flex"
        flexDirection="column"
        gridGap={space.xs}
        onSubmit={handleFormSubmit}
      >
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
        <PaymentElement />

        <Text color={colors.slate}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut.
        </Text>

        <Button type="submit" text="Place Order" />
      </Form>

      <Card justifySelf="center" minWidth={["100%", 420]}>
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
                withDetail
              />
              <Flex color={colors.slate}>
                <Text flex="1">Total Bid Price:</Text>
                <Text>{formatter.format(bid.bid_price)}</Text>
              </Flex>

              <Flex color={colors.slate}>
                <Text flex="1">Processing fees:</Text>
                <Text>{formatter.format(20)}</Text>
              </Flex>

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

import { useState } from "react";
import styled, { useTheme } from "styled-components";

import { useRouter } from "next/router";

import {
  AnimatedBox,
  Text,
  Grid,
  Box,
  Flex,
  Link,
  Icon,
  Spiner,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import DateTime from "@/common/utils/datetime/DateTime";
import { CurrencyFormatter } from "@/common/utils/formatters";
import { useCreator } from "@/creators/context/CreatorContext";
import PaymentApiClient from "@/payments/api";
import { Payment } from "@/payments/types/payments";
import { AuctionApiClient } from "@/tokens/api";
import useActiveAuction from "@/tokens/context/ActiveAuctionContext";
import useBidsList from "@/tokens/context/BidListContext";
import useRewardItem from "@/tokens/context/RewardItemContext";
import { BidStatus } from "@/tokens/types/auctions";

import CurrencyInput from "../../atoms/CurrencyInput";
import BidsDataTable from "../../objects/BidsDataTable";
import RewardCard from "../../objects/RewardCard";
import Container, { IContainerProps } from "./container";

const BreadCrumb = styled(Text)`
  color: ${({ theme }) => theme.colors.slate};
  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;

interface IFormProps {
  quantity: number;
  bid_price: number;
}

function Content(): JSX.Element {
  const { creator } = useCreator();
  const { reward, loading } = useRewardItem();
  const { space, colors } = useTheme();
  const { auction } = useActiveAuction();
  const [postBidLoading, setPostBidLoading] = useState(false);
  const router = useRouter();
  const { track } = useAnalytics();
  const { bids, mutateBids, loading: loadingBids } = useBidsList();

  const { fields, fieldValueSetter, getValidatedData, fieldErrorSetter } =
    useForm<IFormProps>({
      fields: {
        quantity: {
          intialValue: 1,
          validators: [
            {
              validator: Validators.required,
              message: "Please pick a valid token count.",
            },
          ],
        },
        bid_price: {
          intialValue: reward?.active_auction?.minimum_bid ?? 0,
          validators: [
            {
              validator: Validators.required,
              message: "Please set a bid price.",
            },
          ],
        },
      },
    });

  const submitBid = async (data: IFormProps): Promise<void> => {
    if (auction && data.bid_price < auction.minimum_bid) {
      fieldErrorSetter(
        "bid_price",
        "Bid price must be greater than the minimum bid."
      );
      return;
    }

    // setMinBidError(false);
    const amount = data.bid_price * data.quantity;
    const paymentData: Partial<Payment> = {
      amount,
    };

    setPostBidLoading(true);

    const [payment, paymentError] = await PaymentApiClient().postPayment(
      paymentData
    );

    if (paymentError || !payment) {
      setPostBidLoading(false);
      return;
    }

    const [bid, bidError] = await AuctionApiClient().postBid({
      creator: creator?.id,
      payment: payment.id,
      auction: auction?.id,
      bid_price: data.bid_price,
      quantity: data.quantity,
      status: BidStatus.PaymentPending,
    });

    if (bidError || !bid) {
      setPostBidLoading(false);
      return;
    }

    const [stripeIntent, stripeIntentError] =
      await PaymentApiClient().createStripePaymentIntent(
        payment.id,
        amount,
        bid.id
      );

    if (!stripeIntent || stripeIntentError) {
      setPostBidLoading(false);
      return;
    }

    track(AnalyticsEvents.modal_placed_bid, {
      bid: bid.id,
      reward: reward?.id,
      payment: payment.id,
    });

    router.push(PageRoutes.checkoutBid(bid.id, stripeIntent.client_secret));

    setPostBidLoading(false);
  };

  const handleSubmit = (): void => {
    const data = getValidatedData();

    if (data) {
      submitBid(data);
    }
  };

  if (!reward || !creator || loading) {
    return <Box>Loading</Box>;
  }

  return (
    <AnimatedBox px={[space.xs, space.m]} py={[space.xs, space.s]}>
      <Flex>
        <Link href={PageRoutes.auctions}>
          <BreadCrumb textStyle="breadCrumb">Auction</BreadCrumb>
        </Link>

        <Icon icon="ChevronRight" color={colors.accent} />

        <Link href={PageRoutes.creatorProfile(creator.slug)}>
          <BreadCrumb textStyle="breadCrumb">
            {creator.profile_detail.name}
          </BreadCrumb>
        </Link>

        <Icon icon="ChevronRight" color={colors.accent} />

        <BreadCrumb textStyle="breadCrumb">{reward.name}</BreadCrumb>
      </Flex>

      <Grid mt={space.s} gridTemplateColumns="1fr 1fr" gridGap={space.xs}>
        <Grid maxWidth={520}>
          <RewardCard reward={reward} />
        </Grid>
        <Box>
          <Text my={space.xxxs} textStyle="headline4">
            {reward.name}
          </Text>
          <Text fontSize="1.6rem" mb={space.s}>
            By {creator.profile_detail.name}
          </Text>
          {reward.active_auction ? (
            <Flex gridGap={space.xs} flexDirection="column">
              <Flex justifyContent="space-between">
                <Text fontSize="1.6rem">Quantity:</Text>
                <Text textStyle="title">
                  {reward.quantity - reward.quantity_sold} / {reward.quantity}
                </Text>
              </Flex>

              <Flex justifyContent="space-between">
                <Text fontSize="1.6rem">Auction ends:</Text>
                <Text textStyle="title">
                  {DateTime.parse_with_milliseconds(
                    reward.active_auction.end
                  ).toRelative()}
                </Text>
              </Flex>

              <Flex justifyContent="space-between">
                <Text fontSize="1.6rem">Last bid:</Text>
                <Text textStyle="title">
                  {CurrencyFormatter.format(reward.active_auction.minimum_bid)}
                </Text>
              </Flex>

              <Flex justifyContent="space-between" alignItems="center">
                <Box>
                  <CurrencyInput
                    disabled={postBidLoading}
                    value={fields.bid_price.value}
                    onValueChange={(value) =>
                      fieldValueSetter("bid_price", parseInt(value ?? "0", 10))
                    }
                  />
                  {fields.bid_price.errors.length > 0 && (
                    <Text my={space.xxs} color={colors.error} textStyle="error">
                      {fields.bid_price.errors[0]}
                    </Text>
                  )}
                </Box>

                <Button
                  onClick={handleSubmit}
                  disabled={postBidLoading}
                  text="Place bid"
                  suffixElement={
                    postBidLoading ? <Spiner size={32} /> : undefined
                  }
                />
              </Flex>
            </Flex>
          ) : (
            <Text>No active auction</Text>
          )}
        </Box>
      </Grid>

      <Text textStyle="title" my={space.s}>
        Recent Bids
      </Text>

      <BidsDataTable bids={bids} mutate={mutateBids} loading={loadingBids} />
    </AnimatedBox>
  );
}

export default function AuctionItemPage({
  reward,
  creator,
}: IContainerProps): JSX.Element {
  return (
    <Container reward={reward} creator={creator}>
      <Content />
    </Container>
  );
}

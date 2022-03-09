import { AnimatePresence } from "framer-motion";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTheme } from "styled-components";

import {
  Text,
  Box,
  Modal,
  Flex,
  Form,
  AnimatedBox,
  Span,
  Spiner,
  Shimmer,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import useAnalytics from "@/common/utils/analytics/AnalyticsContext";
import { AnalyticsEvents } from "@/common/utils/analytics/types";
import { CurrencyFormatter } from "@/common/utils/formatters";
import { useCreator } from "@/creators/context/CreatorContext";
import PaymentApiClient from "@/payments/api";
import { Payment } from "@/payments/types/payments";
import AuctionApiClient from "@/tokens/api/AuctionApiClient";
import useActiveAuction from "@/tokens/context/ActiveAuctionContext";
import useRewardItem from "@/tokens/context/RewardItemContext";
import { BidStatus } from "@/tokens/types/auctions";

import CurrencyInput from "../../atoms/CurrencyInput";
import AuctionProgressBar from "../AuctionProgressBar";
import RewardDescriptionPreview from "../RewardDescriptionPreview";
import RewardBidModalContainer, {
  IRewardBidModalContainerProps,
} from "./container";

interface IBidFormProps {
  quantity: number;
  bid_price: number;
}

interface IProps {
  visible: boolean;
  onClose: () => void;
}

export function Content({ visible, onClose }: IProps): JSX.Element {
  const [minBidError, setMinBidError] = useState(false);
  const { space, colors, radii, gradients } = useTheme();
  const { creator } = useCreator();
  const { auction, loading: auctionLoading } = useActiveAuction();
  const { reward } = useRewardItem();
  const [postBidLoading, setPostBidLoading] = useState(false);
  const { track } = useAnalytics();

  const { fields, fieldValueSetter, getValidatedData } = useForm<IBidFormProps>(
    {
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
          intialValue: 0,
          validators: [
            {
              validator: Validators.required,
              message: "Please set a bid price.",
            },
          ],
        },
      },
    }
  );

  useEffect(() => {
    if (auction) {
      const rounded = Math.ceil(auction.minimum_bid);
      fieldValueSetter("bid_price", rounded);
    }
  }, [auction, fieldValueSetter]);

  const submitBid = async (data: IBidFormProps): Promise<void> => {
    if (auction && data.bid_price < auction.minimum_bid) {
      setMinBidError(true);
      return;
    }

    setMinBidError(false);
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
    window.open(
      PageRoutes.checkoutBid(bid.id, stripeIntent.client_secret),
      "_blank"
    );

    onClose();

    setPostBidLoading(false);
  };

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    const data = getValidatedData();

    if (data) {
      submitBid(data);
    }
  };

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      overflow="hidden"
      maxWidth={560}
      iconButtonProps={{ top: 24 }}
      gridTemplateRows="min-content min-content 1fr min-content"
      display="grid"
    >
      {/* Reward Details */}
      {reward && (
        <>
          <Box px={space.s} py={space.xs}>
            <Text textStyle="headline5">Place a bid</Text>
          </Box>
          <Box
            mx={space.xs}
            px={space.xxs}
            py={space.xxs}
            borderRadius={radii.xxs}
            background={reward.card_background ?? gradients.primary}
          >
            <Flex flexDirection="row" gridGap={space.xxs} alignItems="center">
              <Box>
                <Text mb={4} fontSize="1.6rem" fontWeight="800">
                  {reward.name}
                  <Span
                    mx={space.xxxs}
                    px={12}
                    py={2}
                    fontSize="1.2rem"
                    bg={colors.blackAlpha[1]}
                    borderRadius={18}
                  >
                    {reward.quantity_sold}/{reward.quantity}
                  </Span>
                </Text>
                {reward.active_auction && (
                  <AuctionProgressBar
                    withLabel
                    auction={reward.active_auction}
                  />
                )}
              </Box>

              <Flex flex="1" />

              <Box>
                <Text textAlign="right">Last bid</Text>
                <Text textAlign="right" fontSize="1.8rem" fontWeight="700">
                  {(() => {
                    if (!reward.active_auction) {
                      return "No active auction";
                    }

                    if (reward.active_auction?.last_bid?.bid_price) {
                      return CurrencyFormatter.format(
                        reward.active_auction?.last_bid?.bid_price
                      );
                    }

                    return CurrencyFormatter.format(
                      reward.active_auction.minimum_bid
                    );
                  })()}
                </Text>
              </Box>
            </Flex>
          </Box>
        </>
      )}

      {(() => {
        if (!reward || !reward.description) {
          return <Box>Loading...</Box>;
        }

        return (
          <Box overflowY="auto">
            <RewardDescriptionPreview
              py={space.xs}
              px={space.s}
              dangerouslySetInnerHTML={{ __html: reward.description }}
            />
          </Box>
        );
      })()}

      {/* Auctiona and place bid */}
      {(() => {
        if (!auction) {
          if (auctionLoading) {
            return <Shimmer />;
          }
          return <Box />;
        }

        return (
          <Form
            bg={colors.black[2]}
            display="grid"
            px={space.xs}
            py={space.xxxs}
            gridTemplateRows="1fr max-content"
            gridGap={space.xxs}
            onSubmit={handleFormSubmit}
          >
            <AnimatePresence>
              {minBidError && (
                <AnimatedBox
                  initial={{
                    y: -40,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -40,
                    opacity: 0,
                  }}
                  border={`2px solid ${colors.red[2]}`}
                  bg={colors.redTranslucent}
                  p={space.xxxs}
                  borderRadius={radii.xxs}
                >
                  <Text textStyle="label">Incorrect Bid</Text>
                  <Text>
                    The minimum bid for this auction is{" "}
                    {CurrencyFormatter.format(auction.minimum_bid)}
                  </Text>
                </AnimatedBox>
              )}
            </AnimatePresence>

            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="end"
            >
              <Box>
                <Text
                  mb={space.xxxxs}
                  px={space.xxxs}
                  textStyle="label"
                  fontSize="1.4rem"
                  color={colors.white[0]}
                >
                  Enter bid amount
                </Text>
                <CurrencyInput
                  value={fields.bid_price.value}
                  onValueChange={(value) =>
                    fieldValueSetter("bid_price", parseInt(value ?? "0", 10))
                  }
                  placeholder="Bid amount per token"
                />
              </Box>

              <Button
                type="submit"
                text="Place bid"
                disabled={postBidLoading}
                suffixElement={
                  postBidLoading ? <Spiner size={32} /> : undefined
                }
              />
            </Flex>
          </Form>
        );
      })()}
    </Modal>
  );
}

export default function RewardBidModal({
  visible,
  onClose,
  ...props
}: IRewardBidModalContainerProps & IProps): JSX.Element {
  return (
    <RewardBidModalContainer {...props}>
      <Content visible={visible} onClose={onClose} />
    </RewardBidModalContainer>
  );
}

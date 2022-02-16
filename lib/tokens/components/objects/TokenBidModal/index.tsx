import { AnimatePresence } from "framer-motion";
import { SyntheticEvent, useEffect, useMemo, useState } from "react";
import { useTheme } from "styled-components";

import { useRouter } from "next/router";

import {
  Text,
  Box,
  Modal,
  Flex,
  Avatar,
  Span,
  Form,
  AnimatedBox,
} from "@/common/components/atoms";
import { Button } from "@/common/components/atoms/Button";
import { PageRoutes } from "@/common/constants/route.constants";
import useForm from "@/common/hooks/form/useForm";
import Validators from "@/common/hooks/form/validators";
import { useCreator } from "@/creators/context/CreatorContext";
import PaymentApiClient from "@/payments/api";
import { Payment } from "@/payments/types/payments";
import AuctionApiClient from "@/tokens/api/AuctionApiClient";
import useActiveAuction from "@/tokens/context/ActiveAuctionContext";
import useCreatorCoin from "@/tokens/context/CreatorCoinContext";
import { BidStatus } from "@/tokens/types/auctions";

import CurrencyInput from "../../atoms/CurrencyInput";
import QuantityPicker from "../../atoms/QuantityPicker";
import TokenBidModalContainer, {
  ITokenBidModalContainerProps,
} from "./container";

interface IBidFormProps {
  number_of_coins: number;
  bid_price: number;
}

interface IProps {
  coins?: number;
  visible: boolean;
  onClose: () => void;
}

export function Content({ coins, visible, onClose }: IProps): JSX.Element {
  const [minBidError, setMinBidError] = useState(false);
  const { space, colors, borders, radii } = useTheme();
  const { auction } = useActiveAuction();
  const { coin } = useCreatorCoin();
  const { creator } = useCreator();
  const router = useRouter();

  const { fields, fieldValueSetter, getValidatedData } = useForm<IBidFormProps>(
    {
      fields: {
        number_of_coins: {
          intialValue: coins ?? 1,
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

  const formatter = useMemo(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    });
  }, []);

  useEffect(() => {
    if (auction) {
      fieldValueSetter("bid_price", auction.minimum_bid);
    }
  }, [auction, fieldValueSetter]);

  const totalAmount = useMemo(() => {
    const amount = fields.number_of_coins.value * fields.bid_price.value;
    return formatter.format(amount);
  }, [fields, formatter]);

  const submitBid = async (data: IBidFormProps): Promise<void> => {
    if (auction && data.bid_price < auction.minimum_bid) {
      setMinBidError(true);
      return;
    }

    setMinBidError(false);
    const amount = data.bid_price * data.number_of_coins;
    const paymentData: Partial<Payment> = {
      amount,
    };

    const [payment] = await PaymentApiClient().postPayment(paymentData);

    if (payment) {
      const [bid] = await AuctionApiClient().postBid({
        payment: payment.id,
        auction: auction?.id,
        bid_price: data.bid_price,
        number_of_coins: data.number_of_coins,
        status: BidStatus.PaymentPending,
      });
      if (bid) {
        const [stripeIntent] =
          await PaymentApiClient().createStripePaymentIntent(
            payment.id,
            amount,
            bid.id
          );
        if (stripeIntent) {
          router.push(
            PageRoutes.checkoutBid(bid.id, stripeIntent.client_secret)
          );
        }
      }
    }
  };

  const handleFormSubmit = (event: SyntheticEvent): void => {
    event.preventDefault();
    const data = getValidatedData();

    if (data) {
      submitBid(data);
    }
  };

  console.log(fields.bid_price);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      overflow="hidden"
      maxWidth={560}
      iconButtonProps={{ top: 24 }}
      gridTemplateRows="max-content min-content 1fr"
      display="grid"
    >
      <Box px={space.s} py={space.xs}>
        <Text textStyle="headline5">Place a bid</Text>
      </Box>
      <Box
        mx={space.xs}
        px={space.xxs}
        py={space.xxs}
        borderTop={`2px solid ${borders.main}`}
        borderBottom={`2px solid ${borders.main}`}
      >
        <Flex flexDirection="row" gridGap={space.xxs} alignItems="center">
          <Avatar image={creator?.profile_detail.photo} size={56} />
          <Box>
            <Text mb={4} fontSize="1.6rem">
              {creator?.profile_detail.name}
            </Text>
            <Text color={colors.accent} textStyle="caption">
              {coin?.display.symbol}
            </Text>
          </Box>
          <Flex flex="1" />

          <Box>
            <Text
              textAlign="right"
              mb={4}
              textStyle="label"
              color={colors.slate}
            >
              Last bid
            </Text>
            <Text textAlign="right" fontSize="2.2rem">
              {auction && auction.last_bid
                ? formatter.format(auction.last_bid.bid_price)
                : "No previous bids"}
            </Text>
          </Box>
        </Flex>
      </Box>
      {(() => {
        if (!auction) {
          return <Box>No active auctions</Box>;
        }

        return (
          <Form
            display="grid"
            px={space.xs}
            py={space.xs}
            gridTemplateRows="1fr max-content"
            gridGap={space.xxs}
            onSubmit={handleFormSubmit}
          >
            <Flex
              gridGap={space.xs}
              flexDirection="column"
              borderBottom={`2px solid ${borders.main}`}
            >
              <QuantityPicker
                value={fields.number_of_coins.value}
                onChange={(val) => fieldValueSetter("number_of_coins", val)}
                label="Number of Tokens"
                valueSuffix={
                  <Span
                    fontSize="1.6rem"
                    fontWeight="600"
                    mx={space.xxxs}
                    color={colors.accent}
                  >
                    {coin?.display.symbol}
                  </Span>
                }
              />
              <Box>
                <Text
                  mb={space.xxxs}
                  px={space.xxxs}
                  textStyle="label"
                  fontSize="1.2rem"
                  color={colors.white[0]}
                >
                  Your bid price:
                </Text>
                <CurrencyInput
                  value={fields.bid_price.value}
                  onValueChange={(value) =>
                    fieldValueSetter("bid_price", parseInt(value ?? "0", 10))
                  }
                  placeholder="Bid amount per token"
                />
              </Box>
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
                      {formatter.format(auction.minimum_bid)}
                    </Text>
                  </AnimatedBox>
                )}
              </AnimatePresence>
            </Flex>

            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Text textStyle="label" color={colors.slate}>
                  Total amount
                </Text>
                <Text textStyle="headline4" fontWeight="300">
                  {totalAmount}
                </Text>
              </Box>

              <Button type="submit" text="Place bid" />
            </Flex>
          </Form>
        );
      })()}
    </Modal>
  );
}

export default function TokenBidModal({
  visible,
  onClose,
  coins,
  ...props
}: ITokenBidModalContainerProps & IProps): JSX.Element {
  return (
    <TokenBidModalContainer {...props}>
      <Content visible={visible} onClose={onClose} coins={coins} />
    </TokenBidModalContainer>
  );
}

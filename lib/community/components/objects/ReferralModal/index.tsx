import { useMemo } from "react";
import { useTheme } from "styled-components";

import {
  Avatar,
  Box,
  Modal,
  Text,
  Flex,
  Grid,
  Image,
} from "@/common/components/atoms";
import { useReferralSummary } from "@/tokens/context/ReferralSummaryContext";
import { ReferralSummary } from "@/tokens/types/referrals";

interface IProps {
  visible: boolean;
  onClose: () => void;
}

type ValueKeys = keyof ReferralSummary;

export default function ReferralModal({
  visible,
  onClose,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
  const { referralSummary } = useReferralSummary();

  const referralSummaryData = useMemo<
    {
      title: string;
      key: ValueKeys;
      display: string;
    }[]
  >(() => {
    return [
      {
        title: "Referrals who watched streams",
        key: "total_referrals",
        display: `${referralSummary?.total_referrals}`,
      },
      {
        title: "Total Payable",
        key: "total_payable",
        display: `${referralSummary?.total_payable}`,
      },
      {
        title: "Total Paid Out",
        key: "paid_out",
        display: `${referralSummary?.paid_out}`,
      },
      {
        title: "Outstanding Payment",
        key: "outstanding_payment",
        display: `${referralSummary?.outstanding_payment}`,
      },
    ];
  }, [referralSummary]);

  const steps = [
    {
      text: "Share the referral link with your friends",
      image: "/images/img_journey_planet_1.png",
    },
    {
      text: "Your friend uses the link to sign up & watch their first stream",
      image: "/images/img_journey_planet_2.png",
    },
    {
      text: "You get ₹100 when they watch their first 20 minutes of live content",
      image: "/images/img_journey_planet_3.png",
    },
    {
      text: "Withdraw the money or use it at the auctions",
      image: "/images/img_journey_planet_4.png",
    },
  ];

  return (
    <Modal
      maxWidth={800}
      maxHeight={400}
      visible={visible}
      onClose={onClose}
      display="grid"
      gridTemplateColumns={["1fr", "1fr 300px"]}
      gridTemplateRows={["1fr 300px", "1fr"]}
      p={space.xs}
      gridGap={space.xxs}
      overflowY={["auto", "hidden"]}
    >
      <Box>
        <Text textStyle="headline4" pb={space.xs}>
          How it works?
        </Text>

        <Grid gridAutoFlow="row" gridGap={[space.xs, space.xxs]}>
          {steps.map((step, index) => (
            <Grid
              gridAutoFlow="column"
              gridTemplateColumns="max-content 1fr"
              gridGap={space.xxs}
              alignItems="center"
              key={index}
            >
              <Image
                src={step.image}
                alt={`${index + 1}`}
                boxProps={{ w: 50 }}
              />
              <Text>{step.text}</Text>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box
        p={space.xxs}
        border={`1px solid ${colors.accent}`}
        alignSelf={["start", "center"]}
      >
        <Text textStyle="headline6" pb={space.xs}>
          Track your referrals
        </Text>

        {referralSummaryData.map(({ title, key, display }) => {
          return (
            <Grid
              pb={space.xxs}
              gridAutoFlow="column"
              gridGap={space.xxxs}
              gridTemplateColumns="1fr auto"
              key={key}
            >
              <Text>{title}</Text>
              <Text>{display}</Text>
            </Grid>
          );
        })}
      </Box>
    </Modal>
  );
}

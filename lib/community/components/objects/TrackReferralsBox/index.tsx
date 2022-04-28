import { useMemo } from "react";
import { useTheme } from "styled-components";

import { Box, Grid, Text } from "@/common/components/atoms";
import { ReferralSummary } from "@/tokens/types/referrals";

interface IProps {
  referralSummary?: ReferralSummary;
}

type ValueKeys = keyof ReferralSummary;

export default function TrackReferralsBox({
  referralSummary,
}: IProps): JSX.Element {
  const { space, colors } = useTheme();
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
        display: `${referralSummary?.total_referrals ?? 0}`,
      },
      {
        title: "Total Payable",
        key: "total_payable",
        display: `${referralSummary?.total_payable ?? 0}`,
      },
      {
        title: "Total Paid Out",
        key: "paid_out",
        display: `${referralSummary?.paid_out ?? 0}`,
      },
      {
        title: "Outstanding Payment",
        key: "outstanding_payment",
        display: `${referralSummary?.outstanding_payment ?? 0}`,
      },
    ];
  }, [referralSummary]);

  return (
    <Box alignSelf={["start", "center"]}>
      <Box p={space.xxs} border={`1px solid ${colors.accent}`}>
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

      <Text
        py={space.xxxs}
        textStyle="captionLarge"
        fontStyle="italic"
        fontWeight={600}
      >
        * Payout happens every ₹250.
      </Text>
    </Box>
  );
}

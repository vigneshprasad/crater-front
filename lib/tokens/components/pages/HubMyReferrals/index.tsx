import { useTheme } from "styled-components";

import { Box, Text } from "@/common/components/atoms";
import { useReferralSummary } from "@/tokens/context/ReferralSummaryContext";
import { useReferralsList } from "@/tokens/context/ReferralsListContext";

import ReferralDataTable from "../../objects/ReferralDataTable";
import ReferralSummaryBox from "../../objects/ReferralSummaryBox";

export default function HubMyReferrals(): JSX.Element | null {
  const { space } = useTheme();
  const { referrals, loading } = useReferralsList();
  const { referralSummary } = useReferralSummary();

  if (loading || !referrals) {
    return null;
  }

  return (
    <Box px={space.s} py={space.xs}>
      <Text pb={space.xs} textStyle="headline5">
        Referrals
      </Text>

      <ReferralSummaryBox
        referralCount={referralSummary?.total_referrals}
        totalPayable={referralSummary?.total_payable}
        totalPaidOut={referralSummary?.paid_out}
        outstandingPayment={referralSummary?.outstanding_payment}
      />

      <Box py={space.s}>
        <ReferralDataTable referrals={referrals} />
      </Box>
    </Box>
  );
}

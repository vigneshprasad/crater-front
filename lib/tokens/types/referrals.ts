export interface Referral {
  id: string;
  username: string;
  referrer_name: string;
  amount: number;
  status: string;
  stream_topic?: string;
  stream_start?: string;
}

export interface ReferralSummary {
  total_referrals: number;
  total_payable: number;
  paid_out: number;
  outstanding_payment: number;
}

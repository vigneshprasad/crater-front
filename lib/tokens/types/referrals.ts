export interface Referral {
  id: string;
  user: string;
  referrer: string;
  amount: number;
  status: string;
  stream_detail?: {
    id: number;
    topic: string;
    start: string;
  };
}

export interface ReferralSummary {
  total_referrals: number;
  total_payable: number;
  paid_out: number;
  outstanding_payment: number;
}

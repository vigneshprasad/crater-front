export enum PaymentStatus {
  Pending = 1,
  Success = 2,
  Failed = 3,
}

export enum PaymentGateways {
  Stripe = 1,
}

export interface Payment {
  id: number;
  user: string;
  amount: number;
  status: PaymentStatus;
  gateway: PaymentGateways;
}

export interface StripePaymentIntent {
  id: number;
  payment: number;
  customer: string;
  amount: number;
  product_id: number;
  data: unknown;
  client_secret: string;
}

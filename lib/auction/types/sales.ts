export interface RewardBase {
  id: number;
  creator: number;
  title: string;
  name: string;
  description?: string;
  photo: string;
  is_active: boolean;
  creator_detail: {
    id: number;
    name: string;
    photo: string | null;
  };
}

export enum RewarSaleLogStatus {
  Pending = 1,
  Confirmed = 2,
}

export enum SalePaymentType {
  UPI = 1,
  LEARN = 2,
}

export interface RewardSale {
  id: number;
  price: number;
  quantity: number;
  quantity_sold: number;
  is_active: boolean;
  reward: number;
  reward_detail: RewardBase;
  payment_type: SalePaymentType;
}

export interface RewardSaleLog {
  id: number;
  user: string;
  reward_sale: number;
  quantity: number;
  price: number;
  status: RewarSaleLogStatus;
  payment: number;
  payment_type: SalePaymentType;
  reward_sale_detail: RewardSale;
  user_detail: {
    pk: string;
    photo: string;
    email: string;
    name: string;
    phone_number: string;
    linkedin_url?: string;
  };
}

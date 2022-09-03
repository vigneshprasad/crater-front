import { RewardSaleLog } from "@/auction/types/sales";

export type INotificationData =
  | {
      user: string;
      type: "creator-sale-request";
      data: RewardSaleLog;
    }
  | {
      user: string;
      type: "creator-sale-accepted";
      data: RewardSaleLog;
    }
  | {
      user: string;
      type: "creator-sale-declined";
      data: RewardSaleLog;
    };

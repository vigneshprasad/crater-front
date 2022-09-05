import AuctionCard from "./AuctionCard";
import SaleCard from "./SaleCard";
import { IBaseRewardCardProps, RewardCardTypes } from "./types";

export default function RewardCard({
  cardType = RewardCardTypes.Sale,
  ...props
}: IBaseRewardCardProps): JSX.Element | null {
  if (cardType === RewardCardTypes.Sale) {
    return <SaleCard {...props} />;
  }

  if (cardType === RewardCardTypes.Auction) {
    return <AuctionCard {...props} />;
  }

  return null;
}

export * from "./types";

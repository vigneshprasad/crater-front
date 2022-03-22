import { CreatorProvider } from "@/creators/context/CreatorContext";
import { Creator } from "@/creators/types/creator";
import { ActiveAuctionProvider } from "@/tokens/context/ActiveAuctionContext";
import { BidListProvider } from "@/tokens/context/BidListContext";
import { RewardItemProvider } from "@/tokens/context/RewardItemContext";
import { Reward } from "@/tokens/types/token";

export interface IContainerProps {
  reward: Reward;
  creator: Creator;
  children?: React.ReactNode | React.ReactNode[];
}

export default function Container({
  reward,
  creator,
  children,
}: IContainerProps): JSX.Element {
  return (
    <RewardItemProvider id={reward.id} initial={reward}>
      <CreatorProvider slug={creator.slug} initial={creator}>
        <ActiveAuctionProvider reward={reward.id}>
          <BidListProvider filterReward={reward.id}>{children}</BidListProvider>
        </ActiveAuctionProvider>
      </CreatorProvider>
    </RewardItemProvider>
  );
}

import { PropsWithChildren } from "react";

import { CreatorProvider } from "@/creators/context/CreatorContext";
import { Creator } from "@/creators/types/creator";
import { ActiveAuctionProvider } from "@/tokens/context/ActiveAuctionContext";
import { BidListProvider } from "@/tokens/context/BidListContext";
import { CreatorCoinProvider } from "@/tokens/context/CreatorCoinContext";
import { RewardItemProvider } from "@/tokens/context/RewardItemContext";
import { Reward } from "@/tokens/types/token";

export type IRewardBidModalContainerProps = PropsWithChildren<{
  creator: Creator;
  reward: Reward;
}>;

export default function RewardBidModalContainer({
  creator,
  reward,
  children,
}: IRewardBidModalContainerProps): JSX.Element {
  return (
    <ActiveAuctionProvider reward={reward.id}>
      <CreatorProvider slug={creator.slug}>
        <RewardItemProvider id={reward.id} initial={reward}>
          <CreatorCoinProvider creatorId={creator.id}>
            <BidListProvider filterReward={reward.id}>
              {children}
            </BidListProvider>
          </CreatorCoinProvider>
        </RewardItemProvider>
      </CreatorProvider>
    </ActiveAuctionProvider>
  );
}

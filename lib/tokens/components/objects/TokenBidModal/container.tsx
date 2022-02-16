import { PropsWithChildren } from "react";

import { CreatorProvider } from "@/creators/context/CreatorContext";
import { Creator } from "@/creators/types/creator";
import { ActiveAuctionProvider } from "@/tokens/context/ActiveAuctionContext";
import { CreatorCoinProvider } from "@/tokens/context/CreatorCoinContext";

export type ITokenBidModalContainerProps = PropsWithChildren<{
  creator: Creator;
}>;

export default function TokenBidModalContainer({
  creator,
  children,
}: ITokenBidModalContainerProps): JSX.Element {
  return (
    <ActiveAuctionProvider creator={creator.id}>
      <CreatorProvider slug={creator.slug}>
        <CreatorCoinProvider creatorId={creator.id}>
          {children}
        </CreatorCoinProvider>
      </CreatorProvider>
    </ActiveAuctionProvider>
  );
}

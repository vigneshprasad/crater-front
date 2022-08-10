import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout/v2";
import { Creator } from "@/creators/types/creator";
import { ActiveAuctionProvider } from "@/tokens/context/ActiveAuctionContext";
import { BidListProvider } from "@/tokens/context/BidListContext";
import { RewardsListProvider } from "@/tokens/context/RewardsListContext";

const HubmMyRewardsTab = dynamic(
  () => import("@/tokens/components/pages/HubmMyRewardsTab")
);

interface PageProps {
  creator: Creator | null;
  userId?: string;
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  try {
    const data = await getHubServerSideProps(context);

    return {
      props: {
        ...data,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/join",
      },
      props: {} as PageProps,
    };
  }
};

type IProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function HubMyTokens({ creator }: IProps): JSX.Element | null {
  if (creator == null) {
    return null;
  }

  return (
    <HubPageLayout activeTab="auction" creator={creator}>
      <ActiveAuctionProvider reward={1}>
        <RewardsListProvider filterCreatorSlug={creator.slug}>
          <BidListProvider filterCreator={creator.id}>
            <HubmMyRewardsTab creator={creator} />
          </BidListProvider>
        </RewardsListProvider>
      </ActiveAuctionProvider>
    </HubPageLayout>
  );
}

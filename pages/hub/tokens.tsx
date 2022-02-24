import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import dynamic from "next/dynamic";

import HubPageLayout, {
  getHubServerSideProps,
} from "@/common/components/layouts/HubPageLayout";
import { Creator } from "@/creators/types/creator";
import { ActiveAuctionProvider } from "@/tokens/context/ActiveAuctionContext";
import { RewardsListProvider } from "@/tokens/context/RewardsListContext";

const HubMyTokensTab = dynamic(
  () => import("@/tokens/components/pages/HubMyTokensTab")
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
    <HubPageLayout activeTab="tokens" creator={creator}>
      <ActiveAuctionProvider reward={1}>
        <RewardsListProvider filterCreatorSlug={creator.slug}>
          <HubMyTokensTab />
        </RewardsListProvider>
      </ActiveAuctionProvider>
    </HubPageLayout>
  );
}

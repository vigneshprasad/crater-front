import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

import CreatorApiClient from "@/creators/api";
import { Creator } from "@/creators/types/creator";
import { RewardApiClient } from "@/tokens/api";
import RewardPageLayout from "@/tokens/components/layout/RewardPageLayout";
import AuctionItemPage from "@/tokens/components/pages/AuctionItemPage";
import { Reward } from "@/tokens/types/token";

interface IParams extends ParsedUrlQuery {
  creatorSlug: string;
  rewardId: string;
}

interface PageProps {
  creator: Creator;
  reward: Reward;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const [response] = await RewardApiClient().getRewardsList();
  if (!response) return { paths: [], fallback: "blocking" };

  const paths = response.map(({ creator_detail, id }) => ({
    params: {
      creatorSlug: creator_detail.slug,
      rewardId: id.toString(),
    },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<PageProps, IParams> = async ({
  params,
}) => {
  const { creatorSlug, rewardId } = params as IParams;
  const [reward] = await RewardApiClient().retrieveReward(rewardId);
  const [creator] = await CreatorApiClient().getCreatorBySlug(creatorSlug);

  if (!reward || !creator) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  return {
    props: {
      reward,
      creator,
    },
    revalidate: 10,
  };
};

export default function AuctionItem({
  creator,
  reward,
}: PageProps): JSX.Element {
  return (
    <RewardPageLayout
      seo={{
        title: `Auction: ${reward.name}`,
        description:
          "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
      }}
    >
      <AuctionItemPage reward={reward} creator={creator} />
    </RewardPageLayout>
  );
}

import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeoProps } from "next-seo";
import { ParsedUrlQuery } from "querystring";

import CreatorApiClient from "@/creators/api";
import { CreatorProvider } from "@/creators/context/CreatorContext";
import { Creator } from "@/creators/types/creator";
import { CoinApiClient } from "@/tokens/api";
import RewardPageLayout from "@/tokens/components/layout/RewardPageLayout";
import RewardItemPage from "@/tokens/components/pages/RewardItemPage";
import { CreatorCoinProvider } from "@/tokens/context/CreatorCoinContext";
import { RewardItemProvider } from "@/tokens/context/RewardItemContext";
import { RewardsListProvider } from "@/tokens/context/RewardsListContext";
import { Coin, Reward } from "@/tokens/types/token";

interface IParams extends ParsedUrlQuery {
  creatorSlug: string;
  rewardId: string;
}

interface PageProps {
  creator: Creator;
  rewardId: string;
  reward: Reward;
  rewards: Reward[];
  coin: Coin | null;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const [rewards] = await CreatorApiClient().getAllRewards();

  if (!rewards) return { paths: [], fallback: "blocking" };

  const paths = rewards.map(({ creator_detail, id }) => ({
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
  const [reward, error] = await CreatorApiClient().retrieveReward(rewardId);
  const [rewards] = await CreatorApiClient().getAllRewards(creatorSlug);
  const [creator] = await CreatorApiClient().getCreatorBySlug(creatorSlug);

  if (error || !reward || !rewards || !creator) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  const [coin] = await CoinApiClient().getCointforCreator(creator.id);

  return {
    props: {
      creator,
      rewardId,
      reward,
      rewards: rewards.filter((obj) => obj.id !== reward.id),
      coin: coin ?? null,
    },
    revalidate: 10,
  };
};

export default function RewardListing({
  creator,
  reward,
  rewards,
  rewardId,
  coin,
}: PageProps): JSX.Element {
  const seo: NextSeoProps = {
    title: `Crater.Club: ${reward.name}`,
    description: "Description",
  };

  return (
    <RewardPageLayout seo={seo}>
      <RewardItemProvider id={rewardId} initial={reward}>
        <RewardsListProvider initial={rewards} filterCreatorSlug={creator.slug}>
          <CreatorCoinProvider
            initial={coin ?? undefined}
            creatorId={creator.id}
          >
            <CreatorProvider initial={creator} slug={creator.slug}>
              <RewardItemPage />
            </CreatorProvider>
          </CreatorCoinProvider>
        </RewardsListProvider>
      </RewardItemProvider>
    </RewardPageLayout>
  );
}

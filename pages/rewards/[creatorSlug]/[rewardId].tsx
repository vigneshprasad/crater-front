import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeoProps } from "next-seo";
import { ParsedUrlQuery } from "querystring";

import CreatorApiClient from "@/creators/api";
import RewardPageLayout from "@/tokens/components/layout/RewardPageLayout";
import RewardItemPage from "@/tokens/components/pages/RewardItemPage";
import { RewardItemProvider } from "@/tokens/context/RewardItemContext";
import { Reward } from "@/tokens/types/tokens";

interface IParams extends ParsedUrlQuery {
  creatorSlug: string;
  rewardId: string;
}

interface PageProps {
  creatorSlug: string;
  rewardId: string;
  reward: Reward;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const [rewards] = await CreatorApiClient().getAllRewards();

  if (!rewards) return { paths: [], fallback: "blocking" };

  const paths = rewards.map(({ creator_coin_detail, id }) => ({
    params: {
      creatorSlug: creator_coin_detail.creator_detail.slug,
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

  if (error || !reward) {
    return {
      notFound: true,
      revalidate: 10,
    };
  }

  return {
    props: {
      creatorSlug,
      rewardId,
      reward,
    },
    revalidate: 10,
  };
};

export default function RewardListing({
  reward,
  rewardId,
}: PageProps): JSX.Element {
  const seo: NextSeoProps = {
    title: `Crater.Club: ${reward.name}`,
    description: "Description",
  };

  console.log(reward);
  return (
    <RewardPageLayout seo={seo}>
      <RewardItemProvider id={rewardId} initial={reward}>
        <RewardItemPage />
      </RewardItemProvider>
    </RewardPageLayout>
  );
}

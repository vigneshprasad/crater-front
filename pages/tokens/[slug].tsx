import { GetStaticPaths, GetStaticProps } from "next";
import { NextSeoProps } from "next-seo";
import { ParsedUrlQuery } from "querystring";

import dynamic from "next/dynamic";

import CreatorApiClient from "@/creators/api";
import { CreatorWithCoinProvider } from "@/creators/context/CreatorWithCoinContext";
import { Creator } from "@/creators/types/creator";
import { CoinApiClient } from "@/tokens/api";
import TokenPageLayout from "@/tokens/components/layout/TokenPageLayout";
import { RewardsListProvider } from "@/tokens/context/RewardsListContext";
import { Coin } from "@/tokens/types/tokens";

const TokensTab = dynamic(() => import("@/tokens/components/pages/TokensTab"));

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface PageProps {
  activeCreator: Creator;
  creators: Creator[];
  coin: Coin;
}

export const getStaticPaths: GetStaticPaths<IParams> = async () => {
  const [creators] = await CreatorApiClient().getCreatorsWithCoins();

  if (!creators) return { paths: [], fallback: "blocking" };

  const paths = creators.map(({ slug }) => ({ params: { slug } }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<PageProps, IParams> = async ({
  params,
}) => {
  const { slug } = params as IParams;
  const [creators] = await CreatorApiClient().getCreatorsWithCoins();

  const creator = creators?.filter((obj) => obj.slug === slug)[0];

  if (!creators || !creator) {
    return { notFound: true, revalidate: 10 };
  }

  const [coin] = await CoinApiClient().getCointforCreator(creator?.id);

  if (!coin) {
    return { notFound: true, revalidate: 10 };
  }

  return {
    props: {
      activeCreator: creator,
      creators,
      coin,
    },
    revalidate: 10,
  };
};

export default function TokenPage({
  activeCreator,
  creators,
}: PageProps): JSX.Element {
  const seo: NextSeoProps = {
    title: "Crater Club: Account",
    description:
      "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
  };
  return (
    <TokenPageLayout seo={seo} activeTab="tokens">
      <CreatorWithCoinProvider initial={creators}>
        <RewardsListProvider filterCreator={activeCreator.id}>
          <TokensTab />
        </RewardsListProvider>
      </CreatorWithCoinProvider>
    </TokenPageLayout>
  );
}

import { GetStaticProps, InferGetStaticPropsType } from "next";
import { NextSeoProps } from "next-seo";

import dynamic from "next/dynamic";

import CreatorApiClient from "@/creators/api";
import { CreatorWithCoinProvider } from "@/creators/context/CreatorWithCoinContext";
import TokenPageLayout from "@/tokens/components/layout/TokenPageLayout";

const TokensTab = dynamic(() => import("@/tokens/components/pages/TokensTab"));

export const getStaticProps: GetStaticProps = async () => {
  const [creators] = await CreatorApiClient().getCreatorsWithCoins();

  if (!creators) {
    return {
      notFound: true,
      revalidate: 10,
      shallow: true,
    };
  }

  return {
    redirect: {
      destination: `/tokens/${creators[0].slug}`,
      permanent: false,
    },
    revalidate: 10,
  };
};

type IPageProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Tokens({ creators }: IPageProps): JSX.Element {
  const seo: NextSeoProps = {
    title: "Crater Club: Tokens",
    description:
      "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
  };

  return (
    <TokenPageLayout seo={seo} activeTab="tokens">
      <CreatorWithCoinProvider initial={creators}>
        <TokensTab />
      </CreatorWithCoinProvider>
    </TokenPageLayout>
  );
}

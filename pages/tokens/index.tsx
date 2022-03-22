import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextSeoProps } from "next-seo";

import dynamic from "next/dynamic";

import CreatorApiClient from "@/creators/api";
import { CreatorWithCoinProvider } from "@/creators/context/CreatorWithCoinContext";
import { UpcomingStreamsProvider } from "@/stream/context/UpcomingStreamsContext";
import TokenPageLayout from "@/tokens/components/layout/TokenPageLayout";

const TokensTab = dynamic(() => import("@/tokens/components/pages/TokensTab"));

export const getServerSideProps: GetServerSideProps = async () => {
  const [creators] = await CreatorApiClient().getCreatorsWithCoins();

  if (!creators) {
    return {
      notFound: true,
      props: {},
    };
  }

  return {
    redirect: {
      destination: `/tokens/${creators[0].slug}`,
      permanent: false,
    },
    props: {},
  };
};

type IPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Tokens({ creators }: IPageProps): JSX.Element {
  const seo: NextSeoProps = {
    title: "Crater Club: Tokens",
    description:
      "Crater is where you join live streams with the mentors & creators you follow, get to network with like-minds, and can claim exclusive access to mentors & creator by buying their tokens at the live auction",
  };

  return (
    <UpcomingStreamsProvider>
      <TokenPageLayout seo={seo} activeTab="tokens">
        <CreatorWithCoinProvider initial={creators}>
          <TokensTab />
        </CreatorWithCoinProvider>
      </TokenPageLayout>
    </UpcomingStreamsProvider>
  );
}

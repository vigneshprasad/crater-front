import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

import CreatorPageLayout from "@/creators/components/layouts/CreatorPageLayout";
import CreatorPage, {
  CreatorPageParams,
  CreatorPageProps,
  getCreatorStaticPaths,
  getCreatorStaticProps,
} from "@/creators/components/page/CreatorPage";
import CreatorTokensTab from "@/creators/components/page/CreatorTokensTab";
import { AuctionListProvider } from "@/tokens/context/AuctionListContext";
import { RewardsListProvider } from "@/tokens/context/RewardsListContext";

export const getStaticPaths: GetStaticPaths<CreatorPageParams> =
  getCreatorStaticPaths;

export const getStaticProps: GetStaticProps<
  CreatorPageProps,
  CreatorPageParams
> = getCreatorStaticProps;

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function CreatorAbout({ slug, creator }: IProps): JSX.Element {
  return (
    <CreatorPageLayout
      creator={creator}
      slug={slug}
      baseContainerProps={{ pb: 0 }}
    >
      <CreatorPage selectedTab="token">
        <AuctionListProvider filterCreator={creator.id}>
          <RewardsListProvider filterCreatorSlug={creator.slug}>
            <CreatorTokensTab />
          </RewardsListProvider>
        </AuctionListProvider>
      </CreatorPage>
    </CreatorPageLayout>
  );
}
